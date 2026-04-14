# Fear Community Rules Website

Веб-приложение для отображения правил модерации и предупреждений для персонала фан-сообщества Fear.

## Технологический стек

- **Next.js 14** - React фреймворк с App Router
- **TypeScript** - Типобезопасность
- **Tailwind CSS** - Стилизация с dark purple glassmorphism темой
- **NextAuth.js** - Discord OAuth аутентификация
- **Framer Motion** - Анимации
- **fast-check** - Property-based тестирование

## Начало работы

### Установка зависимостей

```bash
npm install
```

### Настройка переменных окружения

Скопируйте `.env.example` в `.env.local` и заполните значения:

```bash
cp .env.example .env.local
```

Необходимые переменные:
- `DISCORD_CLIENT_ID` - ID приложения Discord
- `DISCORD_CLIENT_SECRET` - Secret приложения Discord
- `NEXTAUTH_SECRET` - Секрет для NextAuth (сгенерируйте: `openssl rand -base64 32`)
- `DISCORD_GUILD_ID` - ID сервера Discord

### Запуск в режиме разработки

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Структура проекта

```
├── app/                    # Next.js App Router страницы
├── components/             # React компоненты
│   ├── auth/              # Компоненты аутентификации
│   ├── content/           # Компоненты контента
│   ├── animations/        # Компоненты анимаций
│   └── layout/            # Компоненты layout
├── lib/                   # Утилиты и бизнес-логика
│   ├── auth/             # Утилиты аутентификации
│   ├── data/             # Слой доступа к данным
│   └── utils/            # Общие утилиты
├── types/                # TypeScript типы
├── data/                 # JSON файлы с данными
│   ├── rules/           # Правила модерации
│   ├── warnings/        # Предупреждения
│   └── backups/         # Backup файлы
└── public/              # Статические файлы

```

## Тестирование

```bash
# Запуск всех тестов
npm test

# Запуск в watch режиме
npm run test:watch
```

## Роли и доступ

- **Rule Editor** - Полный доступ с возможностью редактирования
- **Discord Moderator** - Доступ к Discord правилам и предупреждениям
- **Twitch Moderator** - Доступ к Twitch правилам и предупреждениям
- **Restricted User** - Доступ запрещен

## Лицензия

Частный проект для сообщества Fear.
