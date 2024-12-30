To install dependencies:

```sh
bun install
```

To run:

```sh
bun run dev
```

open http://localhost:3000

## structure

Project structure:

```
src/
├── index.ts // Main application entry
├── 📁 middleware/ // Custom middleware
│ └── auth.ts
├── 📁 controllers/ // Custom middleware
│ └── authController.ts
│ └── userController.ts
│ └── storeController.ts
│ └── reviewController.ts
├── 📁 routes/ // Route handlers
│ └── index.ts // Routes
├── 📁 views/ // HTML templates
│ ├── 📁 components/ // Reusable HTML components
│ │ └── navbar.ts
│ │ └── reviews.ts
│ │ └── inputs.ts
│ │ └── maps.ts
│ ├── 📁 layouts/ // Page layouts
│ │ └── base.ts
│ │ └── admin.ts
│ ├── account.tsx
│ ├── editAccount.tsx
│ ├── editStore.tsx
│ ├── error.tsx
│ ├── 404.tsx
│ ├── map.tsx
│ ├── login.tsx
│ ├── register.tsx
│ ├── reset.tsx
│ ├── store.tsx
│ ├── stores.tsx
│ ├── tag.tsx
│ └── topStores.tsx
└── 📁 db/ // Database - Model
   ├── index.ts
   ├── schema.ts
   └── 📁 seeds/
     ├── reviews.ts
     ├── stores.ts
     └── users.ts
```
