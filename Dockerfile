FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY index.html ./
COPY .eslintrc ./
COPY .prettierrc ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./
COPY vite.config.ts ./
COPY public ./public
COPY src ./src

ENV VITE_APP_BASE_URL=APP_BASE_URL_PLACEHOLDER \
    VITE_APP_BASE_URL_API=APP_BASE_URL_API_PLACEHOLDER \
    VITE_APP_LINK_INFO_USE=APP_LINK_INFO_USE_PLACEHOLDER

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/templates/default.conf.template

COPY --from=builder /app/dist /usr/share/nginx/html
