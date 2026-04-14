# 📂 Что загружать на GitHub

## ✅ ЧТО ЗАГРУЖАТЬ (безопасно)

### Исходный код
```
✅ app/                    # Все страницы Next.js
✅ components/             # React компоненты
✅ lib/                    # Утилиты и библиотеки
✅ types/                  # TypeScript типы
✅ data/rules/             # JSON файлы с правилами
✅ public/                 # Статические файлы (логотип)
```

### Конфигурационные файлы
```
✅ package.json            # Зависимости проекта
✅ package-lock.json       # Точные версии зависимостей
✅ tsconfig.json           # Настройки TypeScript
✅ tailwind.config.ts      # Настройки Tailwind CSS
✅ postcss.config.js       # Настройки PostCSS
✅ next.config.js          # Настройки Next.js
✅ middleware.ts           # Middleware для аутентификации
```

### Документация и инструкции
```
✅ README.md               # Описание проекта
✅ VERCEL_DEPLOY.md        # Инструкции по деплою
✅ QUICK_DEPLOY.md         # Быстрый деплой
✅ PRODUCTION_NOTES.md     # Заметки для продакшена
✅ GITHUB_GUIDE.md         # Эта инструкция
```

### Служебные файлы
```
✅ .gitignore              # Список игнорируемых файлов
✅ .env.example            # Пример переменных окружения
```

## ❌ ЧТО НЕ ЗАГРУЖАТЬ (опасно!)

### Секретные данные
```
❌ .env.local              # СЕКРЕТЫ! Никогда не загружать!
❌ .env                    # Любые файлы с секретами
❌ .env.production         # Продакшен секреты
```

### Автогенерируемые файлы
```
❌ .next/                  # Сборка Next.js
❌ node_modules/           # Зависимости (очень большие)
❌ .vercel/                # Настройки Vercel
❌ out/                    # Статическая сборка
❌ build/                  # Сборка проекта
```

### Временные и системные файлы
```
❌ .DS_Store               # macOS системные файлы
❌ Thumbs.db               # Windows системные файлы
❌ *.log                   # Лог файлы
❌ *.tmp                   # Временные файлы
❌ coverage/               # Отчеты о покрытии тестов
```

### Резервные копии
```
❌ data/backups/           # Бэкапы правил (могут содержать чувствительные данные)
❌ *.backup                # Любые бэкап файлы
❌ *.bak                   # Резервные копии
```

## 🔒 ПОЧЕМУ .env.local ОПАСЕН?

Ваш `.env.local` содержит:
```env
DISCORD_CLIENT_SECRET=W2G_Jx7voSExN-it9XK8L4KwZ9UxYsuG  # ⚠️ СЕКРЕТ!
NEXTAUTH_SECRET=M8IVaitWGPRby4+NU5UOS9Ep1ViBHe6PHC71JdUyCto=  # ⚠️ СЕКРЕТ!
```

Если эти данные попадут в публичный репозиторий:
- ❌ Злоумышленники смогут войти в ваше Discord приложение
- ❌ Смогут подделать сессии пользователей
- ❌ Получат доступ к вашему серверу Discord

## 📋 Проверка перед загрузкой

### 1. Проверьте .gitignore
```bash
# Убедитесь, что .gitignore содержит:
.env*.local
.env
node_modules/
.next/
.vercel/
```

### 2. Проверьте статус Git
```bash
git status
# Убедитесь, что .env.local НЕ в списке для коммита
```

### 3. Если случайно добавили секреты
```bash
# Удалите из индекса:
git rm --cached .env.local

# Добавьте в .gitignore:
echo ".env.local" >> .gitignore

# Закоммитьте изменения:
git add .gitignore
git commit -m "Add .env.local to .gitignore"
```

## 🚀 Безопасная загрузка

### Команды для загрузки:
```bash
# 1. Инициализация
git init

# 2. Добавление файлов (Git автоматически исключит файлы из .gitignore)
git add .

# 3. Проверка что добавляется
git status
# Убедитесь что .env.local НЕ в списке!

# 4. Коммит
git commit -m "Initial commit: Fear Community Rules Website"

# 5. Подключение к GitHub
git branch -M main
git remote add origin https://github.com/ВАШ_USERNAME/fear-community-rules.git

# 6. Загрузка
git push -u origin main
```

## 📁 Итоговая структура на GitHub

```
fear-community-rules/
├── app/                     ✅ Загружается
├── components/              ✅ Загружается  
├── lib/                     ✅ Загружается
├── types/                   ✅ Загружается
├── data/rules/              ✅ Загружается
├── public/                  ✅ Загружается
├── .gitignore               ✅ Загружается
├── .env.example             ✅ Загружается (без секретов)
├── package.json             ✅ Загружается
├── README.md                ✅ Загружается
├── VERCEL_DEPLOY.md         ✅ Загружается
└── [другие .md файлы]       ✅ Загружается

НЕ на GitHub:
├── .env.local               ❌ Секреты!
├── node_modules/            ❌ Слишком большие
├── .next/                   ❌ Автогенерируемые
└── data/backups/            ❌ Могут содержать чувствительные данные
```

## ⚠️ ВАЖНЫЕ ПРАВИЛА

1. **НИКОГДА не загружайте файлы с секретами**
2. **Всегда проверяйте `git status` перед коммитом**
3. **Используйте приватный репозиторий для дополнительной безопасности**
4. **Регулярно проверяйте .gitignore**

## 🆘 Если загрузили секреты случайно

1. **Немедленно смените все секреты:**
   - Создайте новое Discord приложение
   - Сгенерируйте новый NEXTAUTH_SECRET
   
2. **Удалите репозиторий и создайте новый**

3. **Или используйте git filter-branch (сложно)**

## ✅ Проверка безопасности

После загрузки на GitHub:
- Откройте репозиторий в браузере
- Убедитесь что .env.local НЕ видно
- Проверьте что секреты нигде не светятся
- Если всё ОК - можно деплоить на Vercel!