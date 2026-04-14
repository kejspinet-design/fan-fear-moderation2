# 🚀 Деплой Fear Community Rules на Vercel через GitHub

## Пошаговая инструкция

### Шаг 1: Подготовка GitHub репозитория

1. **Создайте новый репозиторий на GitHub:**
   - Перейдите на https://github.com
   - Нажмите зеленую кнопку "New" или "+"
   - Название: `fear-community-rules`
   - Сделайте репозиторий **приватным** (важно для безопасности)
   - НЕ добавляйте README, .gitignore или лицензию

2. **Загрузите код в репозиторий:**
   ```bash
   # В папке с проектом выполните:
   git init
   git add .
   git commit -m "Initial commit: Fear Community Rules Website"
   git branch -M main
   git remote add origin https://github.com/ВАШ_USERNAME/fear-community-rules.git
   git push -u origin main
   ```

### Шаг 2: Настройка Vercel

1. **Зарегистрируйтесь на Vercel:**
   - Перейдите на https://vercel.com
   - Нажмите "Sign Up"
   - Выберите "Continue with GitHub"
   - Авторизуйтесь через GitHub

2. **Импортируйте проект:**
   - На главной странице Vercel нажмите "New Project"
   - Найдите репозиторий `fear-community-rules`
   - Нажмите "Import"

3. **Настройте проект:**
   - **Project Name:** `fear-community-rules`
   - **Framework Preset:** Next.js (должно определиться автоматически)
   - **Root Directory:** `.` (оставьте по умолчанию)
   - **Build Command:** `npm run build` (по умолчанию)
   - **Output Directory:** `.next` (по умолчанию)

### Шаг 3: Настройка переменных окружения

**ВАЖНО:** НЕ деплойте пока! Сначала настройте переменные окружения.

1. **В настройках проекта Vercel:**
   - Перейдите в раздел "Environment Variables"
   - Добавьте следующие переменные:

   ```env
   DISCORD_CLIENT_ID
   Значение: 1493219614052581396

   DISCORD_CLIENT_SECRET
   Значение: W2G_Jx7voSExN-it9XK8L4KwZ9UxYsuG

   NEXTAUTH_URL
   Значение: https://ваш-домен.vercel.app (получите после деплоя)

   NEXTAUTH_SECRET
   Значение: M8IVaitWGPRby4+NU5UOS9Ep1ViBHe6PHC71JdUyCto=

   DISCORD_GUILD_ID
   Значение: 1488195649093767363
   ```

2. **Для всех переменных выберите:**
   - Environment: Production, Preview, Development
   - Нажмите "Add" для каждой переменной

### Шаг 4: Первый деплой

1. **Запустите деплой:**
   - Нажмите "Deploy" в Vercel
   - Дождитесь завершения сборки (2-3 минуты)

2. **Получите URL:**
   - После успешного деплоя вы получите URL вида:
   - `https://fear-community-rules-xxx.vercel.app`

### Шаг 5: Обновление Discord приложения

1. **Перейдите в Discord Developer Portal:**
   - https://discord.com/developers/applications
   - Выберите ваше приложение

2. **Обновите Redirect URLs:**
   - OAuth2 → General
   - В "Redirects" добавьте:
   ```
   https://ваш-домен.vercel.app/api/auth/callback/discord
   ```
   - Сохраните изменения

### Шаг 6: Обновление NEXTAUTH_URL

1. **В Vercel:**
   - Перейдите в Settings → Environment Variables
   - Найдите `NEXTAUTH_URL`
   - Измените значение на ваш реальный домен:
   ```
   https://ваш-домен.vercel.app
   ```

2. **Перезапустите деплой:**
   - Перейдите в Deployments
   - Нажмите "Redeploy" на последнем деплое

### Шаг 7: Настройка кастомного домена (опционально)

1. **Если у вас есть свой домен:**
   - Settings → Domains
   - Добавьте ваш домен
   - Настройте DNS записи согласно инструкциям Vercel

2. **Обновите переменные окружения:**
   - Измените `NEXTAUTH_URL` на ваш кастомный домен
   - Обновите Redirect URL в Discord

## 🎉 Готово!

Ваш сайт теперь доступен по адресу и готов к использованию!

## Автоматические обновления

- Каждый push в ветку `main` автоматически запускает новый деплой
- Vercel автоматически создает preview для pull requests
- Все изменения применяются мгновенно

## Мониторинг

- Логи доступны в разделе "Functions" в Vercel
- Аналитика доступна в разделе "Analytics"
- Уведомления о деплоях приходят на email

## Безопасность

✅ Все переменные окружения зашифрованы  
✅ HTTPS включен автоматически  
✅ Репозиторий приватный  
✅ Discord секреты защищены  

## Поддержка

Если что-то не работает:
1. Проверьте логи в Vercel
2. Убедитесь, что все переменные окружения настроены
3. Проверьте Discord Redirect URLs