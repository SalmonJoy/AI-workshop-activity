# syntax=docker/dockerfile:1

FROM node:20-alpine AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --include=dev

FROM dependencies AS build
WORKDIR /app
COPY . .
RUN test -f public/presentation/workshop-presentation.pdf || \
  (echo "Missing public/presentation/workshop-presentation.pdf. Download it from Google Drive before building the Docker image." && exit 1)
RUN npm run build

FROM nginx:1.27-alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html/workshop
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz >/dev/null || exit 1
CMD ["nginx", "-g", "daemon off;"]
