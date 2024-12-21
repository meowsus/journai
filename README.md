## Getting Started

Download and install SQLite: https://www.sqlite.org/download.html

Create a `.env` file in the root directory containing:

```
DATABASE_URL="file:./dev.db"
```

Then run:

```bash
pnpm prisma:migrate:dev
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
