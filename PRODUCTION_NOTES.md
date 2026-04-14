# 📋 Заметки для продакшена

## Безопасность

### ⚠️ ВАЖНО: Смените секреты для продакшена!

Текущие секреты предназначены только для разработки. Для продакшена:

1. **Создайте новое Discord приложение:**
   - https://discord.com/developers/applications
   - New Application → "Fear Community Rules Production"
   - Получите новые CLIENT_ID и CLIENT_SECRET

2. **Сгенерируйте новый NEXTAUTH_SECRET:**
   ```bash
   # В терминале:
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

3. **Обновите переменные окружения в Vercel**

## Мониторинг

### Логи и ошибки
- Vercel Dashboard → Functions → View Logs
- Следите за ошибками аутентификации
- Проверяйте доступ к файлам правил

### Производительность
- Analytics в Vercel показывает время загрузки
- Core Web Vitals для SEO
- Bandwidth usage

## Резервное копирование

### Правила модерации
Файлы правил хранятся в:
- `/data/rules/discord-rules.json`
- `/data/rules/twitch-rules.json`

**Рекомендация:** Регулярно скачивайте эти файлы как бэкап.

## Обновления

### Автоматические деплои
- Каждый push в `main` → автоматический деплой
- Preview деплои для pull requests
- Rollback доступен в Vercel Dashboard

### Обновление зависимостей
```bash
npm update
npm audit fix
```

## Масштабирование

### Лимиты Vercel (бесплатный план)
- 100GB bandwidth/месяц
- 1000 serverless function executions/день
- 10 deployments/день

### При превышении лимитов
- Upgrade до Pro плана ($20/месяц)
- Или миграция на другую платформу

## Домены и SSL

### Кастомный домен
1. Vercel Settings → Domains
2. Добавить домен
3. Настроить DNS записи
4. Обновить NEXTAUTH_URL и Discord Redirects

### SSL сертификаты
- Автоматически от Let's Encrypt
- Обновляются автоматически
- HTTPS принудительно включен

## Поддержка пользователей

### Частые проблемы
1. **"Нет доступа"** → Проверить роли в Discord
2. **Ошибка входа** → Проверить Discord Redirect URLs
3. **Не загружаются правила** → Проверить файлы в `/data/rules/`

### Логи для отладки
- Vercel Functions logs
- Browser Developer Tools
- Discord Developer Portal logs

## Контакты для поддержки

- Vercel Support: https://vercel.com/help
- Discord Developer Support: https://discord.com/developers/docs
- Next.js Documentation: https://nextjs.org/docs