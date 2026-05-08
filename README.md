# Practical AI Workshop Site

React + Vite workshop website for the 8 activity sheets, reading material section, and presentation deck. Participant answers are saved in browser local storage. No backend or AI API is required.

## Local Development

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:5173/workshop/activity`.

## Presentation

The workshop presentation is available at:

- `http://127.0.0.1:5173/workshop/presentation`
- PDF download: `http://127.0.0.1:5173/workshop/presentation/workshop-presentation.pdf`

The PDF is not committed to GitHub. Before running a local or production build, download it from Google Drive into `public/presentation/workshop-presentation.pdf`:

```bash
mkdir -p public/presentation
curl -L "https://drive.google.com/uc?export=download&id=1EJsByDY2UgFAoXRnM6GzlfRb3su-GRKM" -o public/presentation/workshop-presentation.pdf
test "$(head -c 4 public/presentation/workshop-presentation.pdf)" = "%PDF"
```

If the final check fails, confirm the Google Drive file is shared as "Anyone with the link can view", then download the file manually to the same path.

## Reading Material

Reading material is available under the same activity app:

- `http://127.0.0.1:5173/workshop/activity/reading`
- `http://127.0.0.1:5173/workshop/activity/reading/1` - AI Basics for Corporate IT Teams
- `http://127.0.0.1:5173/workshop/activity/reading/2` - AI Use Cases in Manufacturing and IT Operations
- `http://127.0.0.1:5173/workshop/activity/reading/3` - Prompt Engineering Cheat Sheet
- `http://127.0.0.1:5173/workshop/activity/reading/4` - Post-Session Reading List and 30-Day AI Action Plan

Reading pages 1-3 are reference pages. Reading page 4 includes saved action-plan fields and checklists.

## Response Import / Export

Participant answers are saved in the browser, not on the server. Users can export a JSON backup from the sidebar or overview page, then import it later to restore their activity sheet responses and Reading 4 action-plan responses.

Exported files use this shape:

```json
{
  "app": "practical-ai-workshop",
  "version": "ai-workshop-v1",
  "exportedAt": "2026-05-08T00:00:00.000Z",
  "answers": {
    "s1.scenario.0.category": "Automation",
    "r4.week1.task0": true
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

Before building, make sure `public/presentation/workshop-presentation.pdf` has been downloaded from Google Drive as shown above.

Build the production image:

```bash
docker build -t workshop-site:latest .
```

Run it on port `8080`:

```bash
docker run --rm -p 8080:80 workshop-site:latest
```

Open `http://127.0.0.1:8080/workshop/activity` or `http://127.0.0.1:8080/workshop/presentation`.

## Docker Compose

Before starting Compose with `--build`, make sure `public/presentation/workshop-presentation.pdf` has been downloaded from Google Drive as shown above.

```bash
docker compose up --build -d
```

Open `http://127.0.0.1:8080/workshop/activity` or `http://127.0.0.1:8080/workshop/presentation`.

Stop the container:

```bash
docker compose down
```

## Production Notes

- The container uses a multi-stage build: Node builds the Vite app, nginx serves only the compiled static files.
- React routes such as `/workshop/activity/sheet/1`, `/workshop/activity/sheet/8`, and `/workshop/presentation` are handled by nginx using an SPA fallback to `index.html`.
- Reading routes such as `/workshop/activity/reading`, `/workshop/activity/reading/1`, and `/workshop/activity/reading/4` use the same SPA fallback.
- Static hashed assets under `/workshop/assets/` are cached for one year.
- The downloadable presentation PDF is served from `/workshop/presentation/workshop-presentation.pdf`.
- `index.html` is served with `no-cache` so users receive updated builds after redeployment.
- Health check endpoint: `/healthz`.
- `/` and `/workshop` intentionally return `404` in this container so those paths can be used by future pages.
