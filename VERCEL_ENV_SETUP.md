# 🔧 Настройка переменных окружения в Vercel

## 📁 Файлы с переменными:
- `vercel-env-variables.txt` - текстовый формат для копирования
- `vercel-env.json` - JSON формат
- Эта инструкция

## 🚀 Пошаговая настройка:

### Шаг 1: Откройте проект в Vercel
1. Перейдите на https://vercel.com/dashboard
2. Найдите проект `fear-community-rules`
3. Нажмите на него

### Шаг 2: Перейдите в настройки
1. Нажмите вкладку **Settings** (вверху)
2. В левом меню выберите **Environment Variables**

### Шаг 3: Добавьте переменные
Для каждой переменной повторите:

#### Переменная 1:
- **Name:** `DISCORD_CLIENT_ID`
- **Value:** `1493219614052581396`
- **Environment:** ✅ Production ✅ Preview ✅ Development
- Нажмите **Add**

#### Переменная 2:
- **Name:** `DISCORD_CLIENT_SECRET`
- **Value:** `W2G_Jx7voSExN-it9XK8L4KwZ9UxYsuG`
- **Environment:** ✅ Production ✅ Preview ✅ Development
- Нажмите **Add**

#### Переменная 3:
- **Name:** `NEXTAUTH_URL`
- **Value:** `https://ваш-домен.vercel.app` ⚠️ **ИЗМЕНИТЕ НА РЕАЛЬНЫЙ ДОМЕН!**
- **Environment:** ✅ Production ✅ Preview ✅ Development
- Нажмите **Add**

#### Переменная 4:
- **Name:** `NEXTAUTH_SECRET`
- **Value:** `M8IVaitWGPRby4+NU5UOS9Ep1ViBHe6PHC71JdUyCto=`
- **Environment:** ✅ Production ✅ Preview ✅ Development
- Нажмите **Add**

#### Переменная 5:
- **Name:** `DISCORD_GUILD_ID`
- **Value:** `1488195649093767363`
- **Environment:** ✅ Production ✅ Preview ✅ Development
- Нажмите **Add**

### Шаг 4: Получите домен Vercel
1. Перейдите на вкладку **Deployments**
2. Найдите ваш домен (например: `fear-community-rules-abc123.vercel.app`)
3. Скопируйте его

### Шаг 5: Обновите NEXTAUTH_URL
1. Вернитесь в **Settings → Environment Variables**
2. Найдите `NEXTAUTH_URL`
3. Нажмите на три точки → **Edit**
4. Измените значение на ваш реальный домен: `https://fear-community-rules-abc123.vercel.app`
5. Сохраните

### Шаг 6: Перезапустите деплой
1. Перейдите в **Deployments**
2. Найдите последний деплой
3. Нажмите три точки → **Redeploy**
4. Подтвердите

## ✅ Проверка

После добавления всех переменных у вас должно быть:
- ✅ DISCORD_CLIENT_ID
- ✅ DISCORD_CLIENT_SECRET  
- ✅ NEXTAUTH_URL (с вашим доменом!)
- ✅ NEXTAUTH_SECRET
- ✅ DISCORD_GUILD_ID

## 🚨 Важные моменты:

1. **NEXTAUTH_URL должен быть ТОЧНО как ваш домен Vercel**
2. **Все переменные должны быть для Production, Preview, Development**
3. **После изменений обязательно Redeploy**

## 🆘 Если не работает:

1. Проверьте что все переменные добавлены
2. Убедитесь что NEXTAUTH_URL правильный
3. Сделайте Redeploy
4. Проверьте логи деплоя на ошибки