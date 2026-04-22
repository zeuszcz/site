# innertalk site

Рекламно-портфолио сайт студии innertalk. Next.js 15 + TypeScript + TailwindCSS + Framer Motion.

**Prod:** https://site.innertalk.ru

## Стек

- **Next.js 15** (App Router, standalone output) + React 19 + TypeScript
- **TailwindCSS v3** — стили
- **Framer Motion** + **Lenis** — анимации и smooth-scroll
- **sharp** — обработка изображений (thumbnails, WebP)
- **Storage-as-filesystem** — `storage/works.json` + папки с изображениями (без БД, для простоты MVP)
- **PM2** — процесс-менеджер (устанавливается локально, без sudo)

## Разработка

```bash
npm ci
cp .env.example .env
# выставьте ADMIN_USER / ADMIN_PASS
npm run dev
# → http://localhost:3000
# → http://localhost:3000/admin (basic auth)
```

## Структура

```
src/
├─ app/
│  ├─ (public)        /            /services  /works  /works/[slug]  /about  /contact
│  ├─ admin/          /admin       /admin/works  /admin/works/new  /admin/works/[id]/edit
│  ├─ api/
│  │  ├─ contact/     POST — сохраняет сообщение в storage/messages.jsonl
│  │  ├─ admin/works  POST/PUT/DELETE — CRUD работ (basic auth)
│  │  └─ media/       GET — отдача загруженных файлов (через Next, не напрямую из FS)
│  ├─ sitemap.ts      robots.ts    layout.tsx    globals.css
├─ components/        Header, Footer, Hero, ServicesGrid, WorksGrid, Reveal, ContactForm, admin/*
├─ lib/               storage.ts (FS-based works DB), services.ts (каталог услуг)
└─ middleware.ts      basic auth для /admin и /api/admin

storage/              (в .gitignore, создаётся автоматически)
├─ works.json         список работ
├─ works/<id>/*.webp  изображения
└─ messages.jsonl     сообщения с формы контактов
```

## Деплой на VPS

**Один раз** (из локального ssh):
```bash
ssh site-vps
cd ~/site
git clone https://github.com/zeuszcz/site.git .
cp .env.example .env && nano .env    # выставить ADMIN_PASS
npm ci && npm run build
# standalone build:
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
npx pm2 start ecosystem.config.cjs
npx pm2 save
```

**Далее** — `bash scripts/deploy.sh` на VPS, или push → GitHub Actions (TODO).

## Nginx vhost (требует sudo владельца VPS)

```nginx
server {
    listen 80;
    server_name site.innertalk.ru;
    client_max_body_size 30M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

После — `sudo certbot --nginx -d site.innertalk.ru`.

## Админка

- URL: `/admin` (basic auth: `ADMIN_USER` / `ADMIN_PASS` из `.env`)
- Создание работы: drag-drop обложки + доп. изображения
- Картинки конвертируются в WebP, max-width 2400px
- Сообщения с формы контактов: `storage/messages.jsonl`

## Что можно улучшить (roadmap)

- [ ] Добавить Prisma + SQLite (взамен JSON-файлу)
- [ ] Email-нотификации (Resend) о сообщениях с формы
- [ ] Reorder работ drag-drop в админке
- [ ] GitHub Actions деплой по пушу
- [ ] i18n (en)
- [ ] Blog секция
