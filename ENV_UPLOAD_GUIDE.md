# 📁 Загрузка .env файла в Vercel

## 📂 Созданные файлы:
- `.env.production` - для продакшена
- `.env.vercel` - для Vercel (тот же контент)

## 🚀 Способы загрузки:

### Способ 1: Через Vercel CLI (рекомендуется)

1. **Установите Vercel CLI:**
```bash
npm i -g vercel
```

2. **Войдите в аккаунт:**
```bash
vercel login
```

3. **Перейдите в папку проекта и загрузите переменные:**
```bash
vercel env pull .env.local
vercel env add DISCORD_CLIENT_ID
# Введите значение: 1493219614052581396
# Выберите окружения: Production, Preview, Development

vercel env add DISCORD_CLIENT_SECRET  
# Введите значение: W2G_Jx7voSExN-it9XK8L4KwZ9UxYsuG

vercel env add NEXTAUTH_URL
# Введите значение: https://ваш-домен.vercel.app

vercel env add NEXTAUTH_SECRET
# Введите значение: M8IVaitWGPRby4+NU5UOS9Ep1ViBHe6PHC71JdUyCto=

vercel env add DISCORD_GUILD_ID
# Введите значение: 1488195649093767363
```

### Способ 2: Импорт через веб-интерфейс

1. **Откройте `.env.production` в блокноте**
2. **Скопируйте содержимое**
3. **В Vercel Dashboard:**
   - Settings → Environment Variables
   - Нажмите "Import from .env"
   - Вставьте содержимое файла
   - Выберите окружения: Production, Preview, Development

### Способ 3: Ручное копирование

Откройте `.env.production` и добавьте каждую переменную вручную в Vercel:

```
Name: DISCORD_CLIENT_ID
Value: 1493219614052581396

Name: DISCORD_CLIENT_SECRET  
Value: W2G_Jx7voSExN-it9XK8L4KwZ9UxYsuG

Name: NEXTAUTH_URL
Value: https://ваш-домен.vercel.app

Name: NEXTAUTH_SECRET
Value: M8IVaitWGPRby4+NU5UOS9Ep1ViBHe6PHC71JdUyCto=

Name: DISCORD_GUILD_ID
Value: 1488195649093767363
```

## ⚠️ ВАЖНО:

### 1. Измените NEXTAUTH_URL
После получения домена Vercel замените:
```
NEXTAUTH_URL=https://fear-community-rules-abc123.vercel.app
```

### 2. НЕ загружайте .env файлы на GitHub!
Убедитесь что в `.gitignore` есть:
```
.env*
.env.production
.env.vercel
```

### 3. Удалите .env файлы после загрузки
```bash
rm .env.production .env.vercel
```

## 🔄 После загрузки переменных:

1. **Сделайте Redeploy в Vercel**
2. **Проверьте что все переменные добавлены**
3. **Обновите NEXTAUTH_URL на реальный домен**

## ✅ Проверка успешной загрузки:

В Vercel Dashboard → Settings → Environment Variables должно быть 5 переменных:
- ✅ DISCORD_CLIENT_ID
- ✅ DISCORD_CLIENT_SECRET
- ✅ NEXTAUTH_URL  
- ✅ NEXTAUTH_SECRET
- ✅ DISCORD_GUILD_ID

## 🚨 Безопасность:

После загрузки переменных в Vercel:
1. **Удалите .env файлы с диска**
2. **НЕ коммитьте их в Git**
3. **Используйте только через Vercel Dashboard**