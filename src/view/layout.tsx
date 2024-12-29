import { html } from "hono/html";
import { menu } from "../helpers";

interface SiteData {
  title: string;
  siteName: string;
  children?: any;
}

export const Layout = (props: SiteData) => {
  const currentPath = "/";

  return html`
  <!DOCTYPE html>
    <html>
    <head>
    <title>${props.title} | ${props.siteName}</title>
    <link rel="stylesheet" href="/public/style.css" />
    <link
    rel="shortcut icon"
    type="image/png"
    href="/public/icons/doughnut.png"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
    <header>
    <nav>
    <a href="/">Home</a>
    ${menu
      .map(
        (item: any) => `
            <li class="nav__item">
            <a href="${item.slug}" 
            class="nav__link ${
              currentPath.startsWith(item.slug) ? "nav__link--active" : ""
            }">
            <span>${item.title}</span>
            </a>
            </li>
            `
      )
      .join("")}
        </nav>
        ${props.children}
        </body>
        </html>`;
};
