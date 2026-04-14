# 📁 Загрузка через веб-панель GitHub

## 🎯 ЧТО ВКЛЮЧИТЬ В ZIP АРХИВ:

### ✅ Обязательные папки:
```
app/                    # Все страницы Next.js
components/             # React компоненты
lib/                    # Утилиты и библиотеки
types/                  # TypeScript типы
data/rules/             # JSON файлы с правилами
public/                 # Статические файлы (логотип)
```

### ✅ Обязательные файлы:
```
package.json            # Зависимости проекта
tsconfig.json           # Настройки TypeScript
tailwind.config.ts      # Настройки Tailwind CSS
postcss.config.js       # Настройки PostCSS
next.config.js          # Настройки Next.js
middleware.ts           # Middleware для аутентификации
.gitignore              # Список игнорируемых файлов
.env.example            # Пример переменных окружения
README.md               # Описание проекта
```

### ✅ Документация (опционально):
```
VERCEL_DEPLOY.md
QUICK_DEPLOY.md
PRODUCTION_NOTES.md
GITHUB_GUIDE.md
ENV_UPLOAD_GUIDE.md
```

## ❌ ЧТО НЕ ВКЛЮЧАТЬ:

### Большие папки:
```
❌ node_modules/        # Слишком много файлов (тысячи!)
❌ .next/               # Автогенерируемые файлы
❌ .vercel/             # Настройки Vercel
❌ coverage/            # Отчеты тестов
```

### Секретные файлы:
```
❌ .env.local           # ВАШИ СЕКРЕТЫ!
❌ .env.production      # Секреты для продакшена
❌ .env.vercel          # Vercel секреты
❌ vercel-env-variables.txt  # Файл с секретами
❌ vercel-env.json      # JSON с секретами
```

### Временные файлы:
```
❌ *.log                # Лог файлы
❌ .DS_Store            # macOS файлы
❌ Thumbs.db            # Windows файлы
❌ data/backups/        # Бэкапы
```

## 🗂️ ПОШАГОВАЯ ИНСТРУКЦИЯ:

### Шаг 1: Создайте новую папку
Создайте папку `fear-community-rules-clean`

### Шаг 2: Скопируйте ТОЛЬКО нужные файлы/папки:
```
fear-community-rules-clean/
├── app/                 ✅ Скопировать
├── components/          ✅ Скопировать
├── lib/                 ✅ Скопировать
├── types/               ✅ Скопировать
├── data/rules/          ✅ Скопировать (только .json файлы)
├── public/              ✅ Скопировать
├── package.json         ✅ Скопировать
├── tsconfig.json        ✅ Скопировать
├── tailwind.config.ts   ✅ Скопировать
├── postcss.config.js    ✅ Скопировать
├── next.config.js       ✅ Скопировать
├── middleware.ts        ✅ Скопировать
├── .gitignore           ✅ Скопировать
├── .env.example         ✅ Скопировать
└── README.md            ✅ Скопировать
```

### Шаг 3: НЕ копируйте:
```
❌ node_modules/         # НЕ КОПИРОВАТЬ!
❌ .next/                # НЕ КОПИРОВАТЬ!
❌ .env.local            # НЕ КОПИРОВАТЬ!
❌ .vercel/              # НЕ КОПИРОВАТЬ!
❌ vercel-env-*          # НЕ КОПИРОВАТЬ!
```

### Шаг 4: Создайте ZIP архив
- Выделите все файлы в папке `fear-community-rules-clean`
- Создайте ZIP архив
- Размер должен быть ~1-5 MB (не больше!)

### Шаг 5: Загрузите на GitHub
1. Создайте новый репозиторий на GitHub
2. Drag & Drop ZIP файл в веб-интерфейс
3. Или используйте "Upload files"

## 🚨 ВАЖНЫЕ МОМЕНТЫ:

### Размер архива:
- ✅ Должен быть меньше 25 MB
- ✅ Без node_modules размер ~1-5 MB

### Количество файлов:
- ✅ Должно быть меньше 100 файлов
- ✅ Без node_modules ~50-80 файлов

### Проверка перед загрузкой:
1. Откройте ZIP архив
2. Убедитесь что НЕТ папки `node_modules/`
3. Убедитесь что НЕТ файла `.env.local`
4. Проверьте размер архива

## ✅ ПОСЛЕ ЗАГРУЗКИ:

1. Проверьте что все файлы загрузились
2. Убедитесь что `.env.local` НЕ видно в репозитории
3. Переходите к деплою на Vercel

## 🆘 ЕСЛИ ВСЕ ЕЩЕ НЕ РАБОТАЕТ:

### Альтернатива 1: GitHub Desktop
- Скачайте GitHub Desktop
- Клонируйте репозиторий
- Скопируйте файлы
- Сделайте commit и push

### Альтернатива 2: Git через командную строку
```bash
git clone https://github.com/username/repo.git
# Скопируйте файлы
git add .
git commit -m "Initial commit"
git push
```

## 📋 ЧЕКЛИСТ ПЕРЕД ЗАГРУЗКОЙ:

- ✅ Размер ZIP < 25 MB
- ✅ Количество файлов < 100
- ✅ НЕТ node_modules/
- ✅ НЕТ .env.local
- ✅ НЕТ .next/
- ✅ ЕСТЬ все исходные файлы
- ✅ ЕСТЬ package.json
- ✅ ЕСТЬ .gitignore