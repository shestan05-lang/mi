# CalKit — портфолио и демо-лендинги

Набор статичных сайтов на **HTML + Tailwind CSS (CDN) + JavaScript**, без сборки и без backend.
Все формы и кнопки ведут в Telegram/WhatsApp. Готово к публикации на **GitHub Pages** или **Cloudflare Pages**.

## Структура проекта

```
calkit/
├─ index.html              # сайт-портфолио CalKit (+ script.js, styles.css)
├─ script.js
├─ styles.css
├─ assets/                 # общие ресурсы (OG-обложки для превью ссылок)
│  ├─ og-auto.svg
│  ├─ og-furniture.svg
│  └─ og-ceilings.svg
├─ auto-service-demo/
│  └─ index.html           # Демо — Автосервис «Garage PRO» (тёмный, жёлто-оранжевый)
├─ furniture-demo/
│  └─ index.html           # Демо — Мебель «WoodLine Studio» (светлый, бежевый, квиз)
├─ ceilings-demo/
│  └─ index.html           # Демо — Натяжные потолки «Ceiling Expert» (сине-белый, до/после)
├─ beauty-demo/
│  └─ index.html           # Демо — Салон красоты (светлый премиум, фото-блоки)
├─ food-demo/
│  └─ index.html           # Демо — Кафе и доставка еды (тёмный «вкусный» дизайн)
└─ README.md
```

Все три демо — самостоятельные одностраничники с уникальным дизайном, текстами и оффером.

---

## Как открыть проект локально

Любой из вариантов:

1. **Просто двойным кликом** по `index.html` нужного демо — откроется в браузере.
2. **Через локальный сервер** (рекомендуется, чтобы корректно работали относительные пути и OG):
   ```bash
   # из папки calkit
   npx serve .
   # или
   python -m http.server 8000
   ```
   Затем откройте `http://localhost:8000/auto-service-demo/`.

> Tailwind подключён через CDN (`https://cdn.tailwindcss.com`), поэтому **нужен интернет** при открытии.
> Для прод-скорости можно перейти на собранный Tailwind (см. раздел «Оптимизация» ниже).

---

## Как заменить Telegram и WhatsApp

По умолчанию используются плейсхолдеры:

- Telegram → `https://t.me/your_username`
- WhatsApp → `https://wa.me/79990000000`

### Способ 1 — массовая замена (быстрее всего)
В каждом файле `*/index.html` сделайте «Найти и заменить»:

| Найти | Заменить на |
|---|---|
| `https://t.me/your_username` | ваша ссылка Telegram, напр. `https://t.me/garage_pro` |
| `https://wa.me/79990000000` | ваш номер, напр. `https://wa.me/79281234567` (без `+`, пробелов и дефисов) |

### Способ 2 — формы-калькуляторы
Формы (расчёт/квиз) открывают WhatsApp с уже заполненным текстом заявки.
Номер задаётся **один раз** в `<script>` внизу каждого файла:

```js
const WHATSAPP = 'https://wa.me/79990000000'; // ← впишите свой номер
```

---

## Как поменять название компании и тексты

1. **Название** встречается в шапке (логотип), подвале и теге `<title>`.
   Найдите комментарий `НАЗВАНИЕ КОМПАНИИ` в начале `<header>` и замените текст.
2. **SEO**: блок `<title>`, `<meta name="description">` и `og:title/og:description` — в `<head>`.
3. **Контент блоков** (услуги, цены, кейсы, FAQ) помечен комментариями вида
   `<!-- УСЛУГИ: ... -->`, `<!-- ЦЕНЫ: ... -->`, `<!-- КАТЕГОРИИ: ... -->` — меняйте текст прямо в разметке.
4. **Фирменные цвета** задаются в `tailwind.config` внутри `<head>` (объект `colors`).
   Например, для автосервиса — `amber`, для мебели — `wood`, для потолков — `brand`.
5. **Фото** (демо мебели и hero) — у тегов `<img>` есть комментарии; замените атрибут `src` на свои изображения.

---

## Публикация на GitHub Pages

1. Создайте репозиторий и загрузите содержимое папки `calkit` (или весь проект).
2. **Settings → Pages → Build and deployment → Source: Deploy from a branch.**
3. Branch: `main`, папка: `/ (root)`. Сохраните.
4. Через ~1 минуту сайты будут доступны по адресам:
   - `https://<username>.github.io/<repo>/auto-service-demo/`
   - `https://<username>.github.io/<repo>/furniture-demo/`
   - `https://<username>.github.io/<repo>/ceilings-demo/`

Через консоль:
```bash
git init
git add .
git commit -m "CalKit demos"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

> OG-обложки указаны относительными путями (`../assets/og-*.svg`). Для корректного превью
> в соцсетях/мессенджерах при необходимости замените их на абсолютные URL вашего домена.

## Публикация на Cloudflare Pages

1. **Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git** (или **Direct Upload**).
2. Подключите репозиторий или загрузите папку напрямую.
3. Сборка не требуется:
   - **Framework preset:** `None`
   - **Build command:** оставьте пустым
   - **Build output directory:** `/` (корень с папками демо)
4. Deploy. Демо откроются по путям `/<demo-folder>/`.

---

## Что внутри каждого демо

- Адаптивная вёрстка **mobile-first**
- Липкая кнопка «Написать» (Telegram)
- Якорное меню в шапке + плавная прокрутка
- Появление блоков при скролле (IntersectionObserver) + hover-эффекты на карточках
- Аккордеон FAQ, формы-калькуляторы → WhatsApp
- SEO `title`/`description` + Open Graph мета
- Поддержка `prefers-reduced-motion`
- Подпись в подвале: «Демо-сайт. Не является сайтом реальной компании.»

## Оптимизация для продакшена (опционально)

CDN-вариант Tailwind удобен, но компилирует стили в браузере. Для максимальной скорости:

1. Установите Tailwind CLI: `npm i -D tailwindcss`
2. Соберите минимизированный CSS: `npx tailwindcss -i in.css -o assets/tailwind.css --minify`
3. Замените `<script src="https://cdn.tailwindcss.com"></script>` и `tailwind.config`
   на `<link rel="stylesheet" href="../assets/tailwind.css">`.

---

> ⚠️ Все компании, тексты, цены и кейсы — **вымышленные**. Логотипы не используются.
> Материалы предназначены для демонстрации в портфолио и холодной рассылке.
