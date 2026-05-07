# Practical AI Workshop Site

React + Vite workshop website for the 8 activity sheets. Participant answers are saved in browser local storage. No backend or AI API is required.

## Local Development

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:5173/`.

## Production Build

```bash
npm run lint
npm run build
```

The static production output is written to `dist/`.

## Docker Production Run

Build the production image:

```bash
docker build -t workshop-site:latest .
```

Run it on port `8080`:

```bash
docker run --rm -p 8080:80 workshop-site:latest
```

Open `http://127.0.0.1:8080/`.

## Docker Compose

```bash
docker compose up --build -d
```

Open `http://127.0.0.1:8080/`.

Stop the container:

```bash
docker compose down
```

## Production Notes

- The container uses a multi-stage build: Node builds the Vite app, nginx serves only the compiled static files.
- React routes such as `/sheet/1` and `/sheet/8` are handled by nginx using an SPA fallback to `index.html`.
- Static hashed assets under `/assets/` are cached for one year.
- `index.html` is served with `no-cache` so users receive updated builds after redeployment.
- Health check endpoint: `/healthz`.
