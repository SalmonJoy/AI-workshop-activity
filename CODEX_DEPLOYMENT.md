# Codex Deployment Guide: Practical AI Workshop Site

This file is written for a Codex agent or engineer deploying the workshop website on a production server.

## Project Summary

- App type: React + TypeScript + Vite static website
- Production runtime: nginx inside Docker
- Backend/API: none
- Database: none
- Environment variables: none required
- Participant answers: saved in each user's browser `localStorage`
- Response portability: users can export/import a JSON file from the UI
- Production port from Compose: host `8080` -> container `80`
- Health endpoint: `/healthz`
- React routes: `/workshop/activity`, `/workshop/activity/sheet/1` through `/workshop/activity/sheet/8`
- Reserved routes: `/` and `/workshop` intentionally return `404` from this container

The deployment root is the `workshop-site` directory. Run all commands in that directory unless stated otherwise.

## Important Files

- `Dockerfile`: multi-stage production image
  - `node:20-alpine` installs dependencies and builds the Vite app
  - `nginx:1.27-alpine` serves the compiled `dist` output
- `nginx.conf`: nginx config with SPA fallback and static asset caching
- `docker-compose.yml`: production container definition
- `.dockerignore`: keeps `node_modules`, `dist`, logs, and git metadata out of the Docker build context
- `package.json` / `package-lock.json`: npm dependency lockfiles

Do not deploy the Vite dev server (`npm run dev`) in production.

## Response Import / Export

The app has no server-side storage. Responses are saved per browser in `localStorage` under `ai-workshop-v1`.

Users can export a JSON backup from the sidebar or overview page. The file shape is:

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

Importing a JSON file replaces the current browser answers after confirmation. The import is fully client-side and does not require Docker volumes, backend services, uploads, or API keys.

## Navigation Behavior

The left navigation is collapsed by default on desktop and tablet screens. Users can click the icons directly or expand the sidebar with the toggle button to show full labels, progress text, import/export labels, and reset text. On mobile widths, the sidebar remains hidden and the compact top bar is used.

## Server Prerequisites

Required:

```bash
docker --version
docker compose version
```

Docker must be running and able to use Linux containers. On Linux servers, ensure the deployment user can run Docker commands.

Optional pre-check:

```bash
docker info
```

If this fails, fix Docker before attempting deployment.

## First-Time Deployment

From the parent folder that contains `workshop-site`:

```bash
cd workshop-site
```

Build the production image:

```bash
docker build -t workshop-site:latest .
```

Start the container:

```bash
docker compose up -d
```

Verify the container:

```bash
docker compose ps
```

Expected result:

- Service is `Up`
- Health is `healthy`
- Port mapping includes `0.0.0.0:8080->80/tcp`

Verify HTTP routes:

```bash
curl -i http://127.0.0.1:8080/healthz
curl -I http://127.0.0.1:8080/workshop/activity
curl -I http://127.0.0.1:8080/workshop/activity/
curl -I http://127.0.0.1:8080/workshop/activity/sheet/1
curl -I http://127.0.0.1:8080/workshop/activity/sheet/8
curl -I http://127.0.0.1:8080/
curl -I http://127.0.0.1:8080/workshop
```

Expected:

- `/healthz` returns `204`
- `/workshop/activity`, `/workshop/activity/`, `/workshop/activity/sheet/1`, and `/workshop/activity/sheet/8` return `200`
- `/` and `/workshop` return `404`

Open in browser:

```text
http://SERVER_IP_OR_DOMAIN:8080/workshop/activity
```

## Updating an Existing Deployment

From `workshop-site`:

```bash
docker compose down
docker build -t workshop-site:latest .
docker compose up -d
docker compose ps
```

Then verify:

```bash
curl -i http://127.0.0.1:8080/healthz
curl -I http://127.0.0.1:8080/workshop/activity/sheet/8
```

Because the app stores participant answers in browser `localStorage`, redeploying the container does not erase saved answers in users' browsers. If the browser cache is stale, ask users to refresh the page.

## Running Behind a Reverse Proxy

Recommended public setup:

```text
Internet -> public nginx/Caddy/Apache/Load Balancer -> http://127.0.0.1:8080
```

If using a reverse proxy on the same server, change `docker-compose.yml` to bind only to localhost:

```yaml
ports:
  - "127.0.0.1:8080:80"
```

Then configure the public reverse proxy to forward to:

```text
http://127.0.0.1:8080
```

The app is intentionally served from this subpath:

```text
https://example.com/workshop/activity
```

Keep `/` and `/workshop` available for future pages. If a parent reverse proxy handles those pages, route only `/workshop/activity` and `/workshop/activity/*` to this container.

## Changing the Public Port

Edit `docker-compose.yml`:

```yaml
ports:
  - "NEW_HOST_PORT:80"
```

Example:

```yaml
ports:
  - "80:80"
```

Then redeploy:

```bash
docker compose down
docker compose up -d
```

If binding to port `80` on Linux fails, check whether another service already uses port `80` or whether elevated permissions are required.

## Production Validation Checklist

Run these after every deployment:

```bash
docker compose ps
curl -i http://127.0.0.1:8080/healthz
curl -I http://127.0.0.1:8080/workshop/activity
curl -I http://127.0.0.1:8080/workshop/activity/
curl -I http://127.0.0.1:8080/workshop/activity/sheet/1
curl -I http://127.0.0.1:8080/workshop/activity/sheet/8
curl -I http://127.0.0.1:8080/
curl -I http://127.0.0.1:8080/workshop
```

Also verify in a browser:

- Sidebar navigation works
- Sidebar is collapsed by default, icon navigation works, and expanded/collapsed preference persists after refresh
- Direct page refresh works on `/workshop/activity/sheet/1` and `/workshop/activity/sheet/8`
- Form entries persist after refresh
- Export JSON downloads a file with metadata and answers
- Import JSON restores answers and progress after confirmation
- Print button opens browser print dialog
- Reset sheet/all controls require confirmation

## Troubleshooting

### Docker daemon not running

Symptom:

```text
Cannot connect to the Docker daemon
```

Fix:

```bash
sudo systemctl start docker
docker info
```

On Docker Desktop, start Docker Desktop and wait until the engine is running.

### Port 8080 already in use

Find the process:

```bash
sudo lsof -i :8080
```

Fix by stopping the conflicting process or changing the host port in `docker-compose.yml`.

### Direct route returns 404

Example broken route:

```text
/workshop/activity/sheet/8
```

Cause: nginx SPA fallback missing or wrong reverse proxy behavior.

Confirm `nginx.conf` contains:

```nginx
location / {
  return 404;
}

location /workshop/activity/ {
  try_files $uri $uri/ /workshop/activity/index.html;
}
```

Rebuild after nginx config changes:

```bash
docker build -t workshop-site:latest .
docker compose up -d
```

### Container is unhealthy

Inspect:

```bash
docker compose ps
docker compose logs --tail=100 workshop-site
docker inspect --format='{{json .State.Health}}' workshop-site-workshop-site-1
```

The health check calls:

```text
http://127.0.0.1/healthz
```

inside the container.

### Build fails during npm install

Use the lockfile-based install. The Dockerfile already runs:

```bash
npm ci
```

If dependency resolution fails, check that `package-lock.json` is present and matches `package.json`.

## Safe Cleanup

Stop the running deployment:

```bash
docker compose down
```

Remove unused Docker build cache/images only if disk cleanup is needed:

```bash
docker system prune
```

Do not run broad prune commands on a shared production server without confirming they will not remove images/containers used by other applications.

## Notes for Codex

- Keep source changes inside `workshop-site`.
- Do not modify the original DOCX files in the parent folder for deployment.
- Do not add backend services unless explicitly requested.
- Do not add API keys or AI service calls; this site intentionally has no AI API integration.
- Preserve nginx SPA fallback under `/workshop/activity` so direct sheet routes continue to work.
- Preserve `404` behavior for `/` and `/workshop` until future pages are implemented.
- Preserve the `localStorage` behavior; no Docker volume is needed for participant answers.
