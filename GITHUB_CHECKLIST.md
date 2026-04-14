# ✅ Чеклист перед загрузкой на GitHub

## Быстрая проверка (30 секунд)

### 1. Проверьте .gitignore
```bash
cat .gitignore | grep -E "(\.env|node_modules|\.next)"
```
Должно показать:
```
.env*.local
/node_modules
/.next/
```

### 2. Проверьте что будет загружено
```bash
git add .
git status
```

### ✅ ДОЛЖНО быть в списке:
- `app/`
- `components/`
- `lib/`
- `types/`
- `data/rules/`
- `public/`
- `package.json`
- `*.md` файлы
- `*.config.*` файлы

### ❌ НЕ ДОЛЖНО быть в списке:
- `.env.local` ⚠️ ОПАСНО!
- `node_modules/` 
- `.next/`
- `data/backups/`

### 3. Если .env.local в списке - СТОП!
```bash
git rm --cached .env.local
echo ".env*.local" >> .gitignore
git add .gitignore
```

### 4. Безопасная загрузка
```bash
git commit -m "Fear Community Rules Website"
git branch -M main
git remote add origin https://github.com/USERNAME/fear-community-rules.git
git push -u origin main
```

## 🔒 После загрузки

1. Откройте GitHub репозиторий в браузере
2. Убедитесь что `.env.local` НЕ видно
3. Если видно - удалите репозиторий и создайте новый!

## ✅ Всё готово для Vercel!