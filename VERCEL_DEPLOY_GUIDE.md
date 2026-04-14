# 🚀 Инструкция по деплою на Vercel

## 📋 Что загружать на GitHub

### ✅ ЗАГРУЖАТЬ:
```
✓ app/
✓ components/
✓ data/
✓ lib/
✓ public/
✓ types/
✓ .gitignore
✓ middleware.ts
✓ next.config.js
✓ package.json
✓ package-lock.json
✓ postcss.config.js
✓ tailwind.config.ts
✓ tsconfig.json
✓ .env.example (без секретов!)
```

### ❌ НЕ ЗАГРУЖАТЬ:
```
✗ .env.local (содержит секреты!)
✗ .env.production
✗ .env.vercel
✗ node_modules/
✗ .next/
✗ .vercel/
✗ vercel-env-variables.txt
✗ любые файлы с секретами
```

---

## 🔐 Переменные окружения для Vercel

Скопируйте эти переменные в настройки Vercel:

### 1. DISCORD_CLIENT_ID
```
1493219614052581396
```

### 2. DISCORD_CLIENT_SECRET
```
W2G_Jx7voSExN-it9XK8L4KwZ9UxYsuG
```

### 3. NEXTAUTH_SECRET
```
M8IVaitWGPRby4+NU5UOS9Ep1ViBHe6PHC71JdUyCto=
```

### 4. DISCORD_GUILD_ID
```
1488195649093767363
```

### 5. NEXTAUTH_URL
```
https://ваш-домен.vercel.app
```
**⚠️ ВАЖНО:** Замените `ваш-домен` на реальный домен после деплоя!

---

## 📝 Пошаговая инструкция деплоя

### Шаг 1: Подготовка GitHub

1. **Создайте новый репозиторий** на GitHub
2. **Загрузите файлы** (используйте список выше)
3. **НЕ загружайте** `.env.local` и другие файлы с секретами

### Шаг 2: Обновите Discord OAuth Redirect URL

1. Перейдите на https://discord.com/developers/applications
2. Выберите ваше приложение
3. Перейдите в **OAuth2 → General**
4. Добавьте новый Redirect URL:
   ```
   https://ваш-домен.vercel.app/api/auth/callback/discord
   ```
5. Нажмите **Save Changes**

### Шаг 3: Деплой на Vercel

1. Перейдите на https://vercel.com
2. Нажмите **Add New... → Project**
3. Выберите ваш GitHub репозиторий
4. В разделе **Environment Variables** добавьте все 5 переменных:
   - `DISCORD_CLIENT_ID`
   - `DISCORD_CLIENT_SECRET`
   - `NEXTAUTH_SECRET`
   - `DISCORD_GUILD_ID`
   - `NEXTAUTH_URL` (используйте временный URL, обновите после деплоя)
5. Нажмите **Deploy**

### Шаг 4: Обновите NEXTAUTH_URL

1. После деплоя скопируйте URL вашего сайта (например: `https://fear-rules.vercel.app`)
2. В Vercel перейдите в **Settings → Environment Variables**
3. Найдите `NEXTAUTH_URL` и обновите значение на реальный URL
4. Нажмите **Save**
5. Перейдите в **Deployments** и нажмите **Redeploy**

### Шаг 5: Обновите Discord Redirect URL (финальный)

1. Вернитесь на https://discord.com/developers/applications
2. Обновите Redirect URL на финальный:
   ```
   https://ваш-реальный-домен.vercel.app/api/auth/callback/discord
   ```
3. Нажмите **Save Changes**

---

## ✅ Проверка работы

1. Откройте ваш сайт: `https://ваш-домен.vercel.app`
2. Нажмите **Войти через Discord**
3. Авторизуйтесь
4. Проверьте, что правила отображаются корректно

---

## 🔧 Настройка ролей модераторов

После деплоя вам нужно настроить роли в коде:

### Файл: `lib/auth/role-utils.ts`

Обновите ID ролей Discord:

```typescript
const ROLE_MAPPINGS: Record<string, AccessLevel> = {
  'YOUR_RULE_EDITOR_ROLE_ID': AccessLevel.RULE_EDITOR,
  'YOUR_DISCORD_MOD_ROLE_ID': AccessLevel.DISCORD_MODERATOR,
  'YOUR_TWITCH_MOD_ROLE_ID': AccessLevel.TWITCH_MODERATOR,
};
```

**Как получить ID роли:**
1. Включите режим разработчика в Discord
2. ПКМ на роль → Копировать ID роли
3. Замените `YOUR_ROLE_ID` на реальный ID

---

## 🆘 Решение проблем

### Ошибка: "Invalid redirect_uri"
- Проверьте, что Redirect URL в Discord совпадает с URL в Vercel
- Формат: `https://домен.vercel.app/api/auth/callback/discord`

### Ошибка: "Unauthorized"
- Проверьте, что все переменные окружения установлены в Vercel
- Проверьте, что `NEXTAUTH_URL` совпадает с реальным доменом

### Ошибка: "Access Denied"
- Проверьте, что ваш Discord ID добавлен в список модераторов
- Проверьте ID ролей в `role-utils.ts`

---

## 📞 Поддержка

Если возникли проблемы:
1. Проверьте логи в Vercel Dashboard
2. Проверьте переменные окружения
3. Проверьте Discord OAuth настройки
4. Убедитесь, что все файлы загружены на GitHub

---

**Готово! Ваш сайт должен работать на Vercel! 🎉**
