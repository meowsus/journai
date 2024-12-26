# Journai

## Getting Started

Download and install SQLite: https://www.sqlite.org/download.html

Download and install Ollama: https://ollama.com/download

Create a `.env` file in the root directory containing:

```
DATABASE_URL="file:./dev.db"
```

In one terminal, run:

```bash
ollama run llama3.2
```

And in another terminal, run:

```bash
pnpm install
pnpm prisma:migrate:dev
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
