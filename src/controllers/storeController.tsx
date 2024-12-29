import { html, Html } from "@elysiajs/html";
import Elysia from "elysia";

export const storeController = new Elysia().use(html()).get("/store", () => (
  <html lang='en'>
    <head>
      <title>Hello World</title>
    </head>
    <body>
      <h1>nothing here</h1>
    </body>
  </html>
));
