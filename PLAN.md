# План: рекламный сайт с портфолио

**Репозиторий:** https://github.com/zeuszcz/site
**VPS:** `170.168.72.200` (innertalk.ru, Debian 12, 4 CPU / 7.2 GB RAM / 258 GB диск — 57 GB свободно)
**Поддомен (рекомендуемый):** один из — `studio.innertalk.ru`, `works.innertalk.ru`, `services.innertalk.ru`, `agency.innertalk.ru` — требует DNS A-record → `170.168.72.200` (TTL 300)
**Не трогать:** root innertalk.ru (там CorporateMessenger за nginx) и его компоненты на портах 7880/7881/8000.

---

## 0. Цели

- **Маркетинговый сайт услуг** — быстрый, SEO-friendly, красивый
- **Портфолио работ** — примеры, которые можно заливать через админку (drag-drop, метаданные)
- **Крутые переходы** — page transitions, scroll-driven reveal, parallax, smooth scroll
- **Автономность от CorporateMessenger** — отдельный процесс, отдельная БД, отдельный vhost

---

## 1. Стек

### Frontend
| Слой | Выбор | Зачем |
|---|---|---|
| Framework | **Next.js 15 (App Router) + React 19 + TypeScript** | SSR/SSG для SEO, Server Actions для upload, встроенный image-opt |
| Стили | **TailwindCSS v4** | utility-first, быстрое прототипирование |
| Анимации | **Framer Motion** + **GSAP ScrollTrigger** + **Lenis** (smooth scroll) | page-transitions + scroll-driven reveal |
| UI kit | **shadcn/ui** (Radix + Tailwind) | diy-компоненты без зависимости, полная кастомизация |
| 3D / хиро (опционально) | **three.js + React Three Fiber** | эффектный hero-сцен |
| Иконки | **lucide-react** | единый стиль |
| Формы | **react-hook-form + zod** | типобезопасная валидация |

### Backend
| Слой | Выбор | Зачем |
|---|---|---|
| API | **Next.js API routes + Server Actions** | монолит, без отдельного бэка |
| ORM | **Prisma** | type-safe, миграции |
| БД | **PostgreSQL 15** (отдельный инстанс) | reliable, поддержка массивов для тегов |
| Auth | **Auth.js (NextAuth v5)**, credentials provider | один админ, hashed password |
| Загрузка файлов | **formidable / multipart** + **sharp** (thumb + blurhash) | оптимизация на лету |
| Storage | **локальная FS** (`~/site/storage/works/`) для MVP; MinIO позже | просто, быстро, без S3-затрат |

### Инфраструктура
| Компонент | Решение |
|---|---|
| Процесс-менеджер | **PM2** (или systemd unit) |
| Reverse proxy | существующий **nginx** (добавляем vhost на поддомен) |
| TLS | **Let's Encrypt / certbot** |
| CI/CD | **GitHub Actions** → SSH deploy on push to `main` |

---

## 2. Sitemap

```
/                     Hero + services + отобранные works + CTA
/services             Полный список услуг (cards с hover-эффектами)
/works                Галерея портфолио (masonry, фильтры)
/works/[slug]         Одна работа (cover, описание, before/after, gallery)
/about                О команде, подход, ценности
/contact              Форма + контакты + карта

/admin                защищённая зона
/admin/login
/admin/works                список + фильтры
/admin/works/new            upload (drag-drop, multi, progress)
/admin/works/[id]/edit      редактирование
/admin/services             CRUD услуг
/admin/settings             контент landing-страницы
```

---

## 3. Ключевые фичи

### Маркетинг
- Hero с parallax/video/particles фоном
- Scroll-triggered reveals (fade, slide, scale, stagger)
- Карточки услуг с 3D-tilt
- Testimonials carousel (Embla или swiper)
- Animated counters (лет/проектов/клиентов)
- Контакт-форма → email (Resend или SMTP)

### Портфолио
- Masonry grid с фильтром по категории/тегу
- Smooth zoom-in lightbox (yet-another-react-lightbox)
- Lazy loading + blurhash placeholder
- Related works (по тегам)
- OG-tags + share на каждую работу
- sitemap.xml + robots.txt

### Админка-загрузка
- Drag-drop multi-upload (файлы + метаданные в одной форме)
- Авто-генерация thumbnail + blurhash через sharp
- Кроп/ресайз/реордер изображений
- Markdown-редактор описания
- Preview → Publish flow (draft/published)
- Сортировка works вручную

### UX-полиш
- View Transitions API + Framer AnimatePresence для page-переходов
- Cursor effects (ненавязчивые)
- Loading skeletons
- Error boundaries
- Тёмная/светлая тема

---

## 4. Data model (Prisma schema)

```prisma
model Work {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  excerpt     String?
  description String   @db.Text
  coverUrl    String
  category    String
  tags        String[]
  published   Boolean  @default(false)
  order       Int      @default(0)
  images      Image[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Image {
  id       String @id @default(cuid())
  workId   String
  url      String
  thumbUrl String
  blurHash String?
  width    Int?
  height   Int?
  alt      String?
  order    Int    @default(0)
  work     Work   @relation(fields: [workId], references: [id], onDelete: Cascade)
}

model Service {
  id          String @id @default(cuid())
  slug        String @unique
  title       String
  subtitle    String?
  description String @db.Text
  icon        String?
  order       Int    @default(0)
  published   Boolean @default(true)
}

model Admin {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String
  name         String?
  createdAt    DateTime @default(now())
}

model ContactMessage {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String?
  message   String   @db.Text
  handled   Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

---

## 5. Структура проекта

```
site/
├─ .env.example
├─ .gitignore
├─ README.md
├─ PLAN.md                        # этот файл
├─ package.json
├─ next.config.ts
├─ tailwind.config.ts
├─ tsconfig.json
├─ prisma/
│  ├─ schema.prisma
│  └─ migrations/
├─ public/
│  ├─ favicon.ico
│  └─ og/
├─ src/
│  ├─ app/
│  │  ├─ (marketing)/             # публичные страницы
│  │  │  ├─ layout.tsx
│  │  │  ├─ page.tsx              # /
│  │  │  ├─ services/page.tsx
│  │  │  ├─ works/page.tsx
│  │  │  ├─ works/[slug]/page.tsx
│  │  │  ├─ about/page.tsx
│  │  │  └─ contact/page.tsx
│  │  ├─ admin/
│  │  │  ├─ layout.tsx
│  │  │  ├─ login/page.tsx
│  │  │  ├─ works/page.tsx
│  │  │  ├─ works/new/page.tsx
│  │  │  ├─ works/[id]/edit/page.tsx
│  │  │  └─ services/page.tsx
│  │  ├─ api/
│  │  │  ├─ auth/[...nextauth]/route.ts
│  │  │  ├─ upload/route.ts
│  │  │  └─ contact/route.ts
│  │  ├─ layout.tsx               # root
│  │  ├─ globals.css
│  │  ├─ sitemap.ts
│  │  ├─ robots.ts
│  │  └─ not-found.tsx
│  ├─ components/
│  │  ├─ ui/                       # shadcn primitives
│  │  ├─ marketing/                # hero, services-grid, cta
│  │  ├─ portfolio/                # grid, lightbox, filters
│  │  ├─ admin/                    # upload-form, data-table
│  │  └─ motion/                   # reusable motion wrappers (Reveal, Stagger)
│  ├─ lib/
│  │  ├─ db.ts                     # prisma client (singleton)
│  │  ├─ auth.ts                   # authjs config
│  │  ├─ upload.ts                 # sharp + blurhash
│  │  ├─ email.ts                  # resend/nodemailer wrapper
│  │  └─ validation.ts             # zod schemas
│  ├─ hooks/
│  └─ styles/
├─ storage/                         # runtime uploads (в .gitignore)
│  └─ works/
├─ scripts/
│  ├─ deploy.sh                    # git pull + build + pm2 restart
│  └─ seed.ts                      # первый admin + примеры
└─ ecosystem.config.js              # PM2
```

---

## 6. Deployment flow

### One-time (требует sudo — запрашиваем у владельца)
1. **DNS**: добавить A-record `studio.innertalk.ru` → `170.168.72.200` (TTL 300) на панели DNS
2. **PostgreSQL**:
   ```bash
   sudo apt install postgresql-15
   sudo -u postgres createuser site --pwprompt
   sudo -u postgres createdb site_db -O site
   ```
3. **PM2**:
   ```bash
   sudo npm i -g pm2      # либо локально в ~/site/node_modules/.bin/pm2
   pm2 startup systemd     # autorestart on reboot
   ```
4. **nginx vhost** (`/etc/nginx/sites-available/studio.innertalk.ru`):
   ```nginx
   server {
       listen 80;
       server_name studio.innertalk.ru;

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

       location /_next/static/ {
           proxy_pass http://127.0.0.1:3000;
           proxy_cache_valid 200 1y;
           add_header Cache-Control "public, max-age=31536000, immutable";
       }

       client_max_body_size 25M;     # upload cap
   }
   ```
   ```bash
   sudo ln -s /etc/nginx/sites-available/studio.innertalk.ru /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   sudo certbot --nginx -d studio.innertalk.ru
   ```

### Regular deploy
1. `git pull` в `~/site`
2. `npm ci`
3. `npx prisma migrate deploy`
4. `npm run build`
5. `pm2 reload site` (zero-downtime)

### GitHub Actions (позже)
- `on: push: branches: [main]` → SSH-deploy через `appleboy/ssh-action` с секретом `DEPLOY_KEY`

---

## 7. Security checklist

- [ ] Пароль админа хэшируется **argon2id** (не bcrypt)
- [ ] CSRF защита через next-auth
- [ ] Upload: allowlist MIME (image/jpeg, image/png, image/webp, video/mp4), max size 25MB, magic-byte проверка, не из публичного пути
- [ ] Files отдаются через Next.js route `/api/files/[id]` — не статически из `storage/`
- [ ] Rate limit на `/api/upload`, `/api/auth`, `/api/contact` (upstash или in-memory)
- [ ] Cookies: `HttpOnly + Secure + SameSite=Lax`
- [ ] CSP headers через `next.config.ts` (script-src 'self', img-src 'self' data: blob:)
- [ ] Отдельный Postgres user — права ограничены `site_db`
- [ ] `.env` никогда не коммитится (в `.gitignore`)
- [ ] Backup: pg_dump раз в сутки на диск + в будущем на S3

---

## 8. Performance budget

- **LCP** < 2.5s (mobile)
- **INP** < 200ms
- **CLS** < 0.1
- Lighthouse ≥ 95 mobile / ≥ 98 desktop
- Images: AVIF/WebP через `next/image`
- Fonts: self-hosted, `display: swap`, только нужные веса
- Bundle: code-split по route; `framer-motion`/`gsap`/`r3f` — lazy-load
- Prefetch важных роутов

---

## 9. Phased roadmap

| Фаза | Задача | Время |
|---|---|---|
| **0. Scaffolding** | Init repo, Next.js + TS + Tailwind + Prisma + Auth.js, deploy hello-world на поддомен | 0.5 дня |
| **1. Marketing shell** | Layout, header, footer, themes, hero + services (статика), page-transitions | 2 дня |
| **2. Portfolio public** | `/works`, `/works/[slug]`, lightbox, smooth scroll, reveal-animations, SEO | 2 дня |
| **3. Admin + upload** | Auth flow, CRUD works/services, drag-drop upload, sharp+blurhash | 2 дня |
| **4. Polish** | Contact form, email-send, QA pass, accessibility, perf tuning | 1 день |
| **5. Deploy** | nginx vhost, TLS, PM2, GH Actions | 0.5 дня |
| | **MVP итого** | **~8 дней** |

---

## 10. Открытые вопросы (нужны ответы перед Phase 0)

1. **Направление услуг?** (студия дизайна, агентство, разработка, фото/видео, маркетинг — определяет тональность hero/services)
2. **Стилистика:** минимализм, брутализм, glassmorphism, "премиум-тёмная", bento-grid, editorial?
3. **Поддомен:** `studio` / `works` / `services` / `agency` / свой вариант?
4. **Нужен блог/статьи** или только портфолио?
5. **Мультиязычность** (ru/en) — сразу или фаза 6?
6. **Брендбук/логотип/палитра** — есть?
7. **Форма контактов куда шлёт?** (email — какой SMTP/Resend; CRM — какой?)
8. **Sudo на VPS:** есть ли у пользователя `i48ptgvnis` sudo? Иначе нужен root-доступ от владельца для nginx/certbot/postgres.
9. **БД:** Postgres (рекомендую) или SQLite (проще, для MVP достаточно)?
10. **Referral/аналитика:** Plausible (self-hosted), Umami, Yandex.Metrika?

---

## 11. Рабочие точки на VPS (справка)

- Проект-директория: `~/site/` (создана)
- Runtime uploads: `~/site/storage/` (gitignored)
- Postgres data: `/var/lib/postgresql/` (стандарт)
- nginx config: `/etc/nginx/sites-available/studio.innertalk.ru`
- TLS cert: `/etc/letsencrypt/live/studio.innertalk.ru/`
- PM2 app name: `site`
- Next.js port: `3000` (loopback only)

---

## 12. SSH-доступ (настроено)

- Ключ `~/.ssh/id_ed25519` добавлен в `authorized_keys` на VPS
- Alias: `ssh site-vps` (см. `~/.ssh/config`)
- **Рекомендация:** после того как key-auth работает, **отключить password-auth** на VPS (`PasswordAuthentication no` в `/etc/ssh/sshd_config`) и **ротировать пароль** пользователя — он был передан в чате и в истории команд.
