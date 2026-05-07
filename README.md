# Practical AI Workshop Site

React + Vite workshop website for the 8 activity sheets. Participant answers are saved in browser local storage. No backend or AI API is required.

## Local Development

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:5173/workshop/activity`.

## Response Import / Export

Participant answers are saved in the browser, not on the server. Users can export a JSON backup from the sidebar or overview page, then import it later to restore their responses.

Exported files use this shape:

```json
{
  "app": "practical-ai-workshop",
  "version": "ai-workshop-v1",
  "exportedAt": "2026-05-08T00:00:00.000Z",
  "answers": {
    "s1.scenario.0.category": "Automation"
  }
}
```

Importing a file replaces all current browser answers after confirmation.

## Navigation

The left navigation is collapsed by default on desktop and tablet screens. Participants can use the icons directly or expand the sidebar with the toggle button to show full sheet labels and action text. On mobile, the sidebar is hidden and the compact top bar is shown.

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

Open `http://127.0.0.1:8080/workshop/activity`.

## Docker Compose

```bash
docker compose up --build -d
```

Open `http://127.0.0.1:8080/workshop/activity`.

Stop the container:

```bash
docker compose down
```

## Production Notes

- The container uses a multi-stage build: Node builds the Vite app, nginx serves only the compiled static files.
- React routes such as `/workshop/activity/sheet/1` and `/workshop/activity/sheet/8` are handled by nginx using an SPA fallback to `index.html`.
- Static hashed assets under `/workshop/activity/assets/` are cached for one year.
- `index.html` is served with `no-cache` so users receive updated builds after redeployment.
- Health check endpoint: `/healthz`.
- `/` and `/workshop` intentionally return `404` in this container so those paths can be used by future pages.
