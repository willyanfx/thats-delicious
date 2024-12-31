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
├── index.ts
├── 📁 middleware/
│ └── auth.ts
├── 📁 controllers/
│ └── authController.ts
│ └── userController.ts
│ └── storeController.ts
│ └── reviewController.ts
├── 📁 routes/
│ └── index.ts
├── 📁 lib/
│ ├── base.ts
│ ├── types.ts
│ └── helpers.ts
├── 📁 components/
│ └── navbar.ts
│ └── reviews.ts
│ └── inputs.ts
│ └── maps.ts
├── 📁 views/
│ ├── 📁 layouts/
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
└── 📁 db/
   ├── index.ts
   ├── schema.ts
   └── 📁 seeds/
     ├── reviews.ts
     ├── stores.ts
     └── users.ts
```
