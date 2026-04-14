# ⚡ Быстрый деплой на Vercel

## 1. GitHub (2 минуты)
```bash
git init
git add .
git commit -m "Fear Community Rules Website"
git branch -M main
git remote add origin https://github.com/ВАШ_USERNAME/fear-community-rules.git
git push -u origin main
```

## 2. Vercel (3 минуты)
1. https://vercel.com → Sign Up → Continue with GitHub
2. New Project → Import `fear-community-rules`
3. **НЕ ДЕПЛОЙТЕ ЕЩЕ!**

## 3. Environment Variables
Добавьте в Vercel Settings → Environment Variables:

```
DISCORD_CLIENT_ID = 1493219614052581396
DISCORD_CLIENT_SECRET = W2G_Jx7voSExN-it9XK8L4KwZ9UxYsuG
NEXTAUTH_URL = https://ваш-домен.vercel.app
NEXTAUTH_SECRET = M8IVaitWGPRby4+NU5UOS9Ep1ViBHe6PHC71JdUyCto=
DISCORD_GUILD_ID = 1488195649093767363
```

## 4. Deploy
Нажмите "Deploy" в Vercel

## 5. Discord Settings
1. https://discord.com/developers/applications
2. OAuth2 → Redirects → Добавить:
   `https://ваш-домен.vercel.app/api/auth/callback/discord`

## 6. Обновить NEXTAUTH_URL
В Vercel измените `NEXTAUTH_URL` на реальный домен и Redeploy

## ✅ Готово!
Сайт работает на https://ваш-домен.vercel.app