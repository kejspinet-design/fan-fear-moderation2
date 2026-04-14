# План реализации: Fear Community Rules Website

## Обзор

Реализация веб-приложения на Next.js 14 с Discord OAuth аутентификацией, role-based контролем доступа и возможностью редактирования правил модерации. Приложение использует TypeScript, Tailwind CSS для стилизации с dark purple glassmorphism темой, и Framer Motion для анимаций.

## Задачи

- [x] 1. Настройка проекта и базовой структуры
  - Инициализировать Next.js 14 проект с TypeScript и App Router
  - Установить зависимости: NextAuth.js, Tailwind CSS, Framer Motion, fast-check
  - Создать структуру директорий согласно дизайну
  - Настроить Tailwind с dark purple цветовой схемой и glassmorphism utilities
  - Создать .env.local с переменными окружения для Discord OAuth
  - _Требования: 5.1, 5.2_

- [x] 2. Реализация типов и констант
  - [x] 2.1 Создать TypeScript типы и интерфейсы
    - Создать src/types/auth.ts с User, Session, AccessLevel типами
    - Создать src/types/rules.ts с RuleContent, WarningContent типами
    - Создать src/types/api.ts с API response типами
    - _Требования: 1.2, 2.1, 2.2, 2.3, 6.1, 6.2_
  
  - [x] 2.2 Создать файл констант с role IDs
    - Создать src/lib/utils/constants.ts с ROLE_CONFIG и ROLE_HIERARCHY
    - Определить все Discord role IDs согласно требованиям
    - _Требования: 11.1, 11.2, 11.3, 11.4_

- [x] 3. Реализация утилит для работы с ролями
  - [x] 3.1 Создать функцию извлечения role IDs из Discord ответа
    - Реализовать extractRoleIds() в src/lib/auth/role-utils.ts
    - Обработать различные форматы Discord ответов
    - _Требования: 1.2, 11.5_
  
  - [ ]* 3.2 Написать property test для извлечения role IDs
    - **Property 1: Role ID Extraction from Discord Response**
    - **Проверяет: Требования 1.2**
  
  - [x] 3.3 Создать функцию определения уровня доступа
    - Реализовать determineAccessLevel() в src/lib/auth/role-utils.ts
    - Применить иерархию ролей согласно ROLE_HIERARCHY
    - _Требования: 2.5, 11.5_
  
  - [ ]* 3.4 Написать property test для выбора наивысшего уровня доступа
    - **Property 2: Highest Access Level Selection**
    - **Проверяет: Требования 2.5**
  
  - [x] 3.5 Создать функцию валидации role IDs
    - Реализовать validateRoleIds() в src/lib/auth/role-utils.ts
    - Проверять соответствие role IDs конфигурации
    - _Требования: 11.5_
  
  - [ ]* 3.6 Написать property test для валидации role IDs
    - **Property 5: Role ID Validation Against Configuration**
    - **Проверяет: Требования 11.5**

- [x] 4. Checkpoint - Проверка базовых утилит
  - Убедиться, что все тесты проходят, задать вопросы пользователю при необходимости.

- [x] 5. Настройка Discord OAuth и NextAuth
  - [x] 5.1 Создать Discord OAuth provider конфигурацию
    - Создать src/lib/auth/discord-provider.ts
    - Настроить scopes: identify, email, guilds.members.read
    - _Требования: 1.1, 1.2_
  
  - [x] 5.2 Настроить NextAuth с Discord provider
    - Создать src/lib/auth/nextauth.config.ts с authOptions
    - Реализовать jwt и session callbacks для извлечения ролей
    - Интегрировать extractRoleIds и determineAccessLevel
    - _Требования: 1.1, 1.2, 1.3, 1.4_
  
  - [x] 5.3 Создать API route для NextAuth
    - Создать src/app/api/auth/[...nextauth]/route.ts
    - Экспортировать GET и POST handlers с authOptions
    - _Требования: 1.1, 1.4_
  
  - [ ]* 5.4 Написать unit тесты для аутентификации
    - Тестировать успешную аутентификацию
    - Тестировать извлечение ролей из Discord profile
    - Тестировать создание сессии
    - _Требования: 1.1, 1.2, 1.3_

- [x] 6. Реализация middleware для защиты маршрутов
  - Создать src/middleware.ts с withAuth
  - Проверять accessLevel для защищенных маршрутов
  - Редиректить restricted users на /access-denied
  - Блокировать PUT/POST запросы к /api/rules для non-editors
  - _Требования: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [x] 7. Реализация слоя хранения данных
  - [x] 7.1 Создать FileStorage сервис
    - Реализовать src/lib/data/file-storage.ts с методами read, write
    - Обработать ошибки файловой системы
    - _Требования: 10.1, 10.2, 10.3_
  
  - [x] 7.2 Создать BackupManager
    - Реализовать src/lib/data/backup-manager.ts с createBackup, restoreBackup
    - Генерировать timestamped backup файлы
    - _Требования: 10.4_
  
  - [ ]* 7.3 Написать property test для backup creation
    - **Property 4: Backup Creation Before Updates**
    - **Проверяет: Требования 10.4**
  
  - [x] 7.4 Создать RuleRepository
    - Реализовать src/lib/data/rule-repository.ts с CRUD операциями
    - Интегрировать FileStorage и BackupManager
    - Обеспечить создание backup перед каждым обновлением
    - _Требования: 3.2, 10.1, 10.2, 10.3, 10.4, 10.5_
  
  - [ ]* 7.5 Написать property test для сериализации RuleContent
    - **Property 3: Rule Content Serialization Round-Trip with Structure Preservation**
    - **Проверяет: Требования 3.2, 3.4, 10.1, 10.3**
  
  - [ ]* 7.6 Написать unit тесты для FileStorage
    - Тестировать чтение/запись JSON файлов
    - Тестировать обработку ошибок (permissions, file not found)
    - _Требования: 10.1, 10.2, 10.3, 10.5_

- [x] 8. Создание начальных данных
  - Создать data/rules/discord-rules.json с 9 категориями правил Discord модерации
  - Создать data/rules/twitch-rules.json с правилами Twitch модерации
  - Создать data/warnings/discord-warnings.json с предупреждениями
  - Создать data/warnings/twitch-warnings.json с предупреждениями
  - Создать пустую директорию data/backups/
  - _Требования: 6.4, 6.5, 7.1, 7.2, 8.1, 8.2, 8.3, 8.4_

- [x] 9. Checkpoint - Проверка слоя данных
  - Убедиться, что все тесты проходят, задать вопросы пользователю при необходимости.

- [x] 10. Реализация API endpoints для правил
  - [x] 10.1 Создать GET /api/rules/discord endpoint
    - Создать src/app/api/rules/discord/route.ts
    - Проверять роль Discord_Moderator или Rule_Editor
    - Возвращать Discord правила из RuleRepository
    - _Требования: 2.2, 2.3, 7.1, 7.2_
  
  - [x] 10.2 Создать PUT /api/rules/discord endpoint
    - Добавить PUT handler в src/app/api/rules/discord/route.ts
    - Проверять роль Rule_Editor
    - Создавать backup перед обновлением
    - Валидировать структуру RuleContent
    - _Требования: 3.1, 3.2, 3.3, 3.4, 10.4_
  
  - [x] 10.3 Создать GET /api/rules/twitch endpoint
    - Создать src/app/api/rules/twitch/route.ts
    - Проверять роль Twitch_Moderator или Rule_Editor
    - Возвращать Twitch правила из RuleRepository
    - _Требования: 2.1, 2.3, 8.1, 8.2, 8.3, 8.4_
  
  - [x] 10.4 Создать PUT /api/rules/twitch endpoint
    - Добавить PUT handler в src/app/api/rules/twitch/route.ts
    - Проверять роль Rule_Editor
    - Создавать backup перед обновлением
    - Валидировать структуру RuleContent
    - _Требования: 3.1, 3.2, 3.3, 3.4, 10.4_
  
  - [ ]* 10.5 Написать integration тесты для API endpoints
    - Тестировать GET запросы с различными ролями
    - Тестировать PUT запросы с валидными и невалидными данными
    - Тестировать authorization checks
    - Тестировать создание backups
    - _Требования: 2.1, 2.2, 2.3, 3.1, 3.2, 10.4_

- [x] 11. Реализация API endpoints для warnings
  - [x] 11.1 Создать GET /api/warnings/discord endpoint
    - Создать src/app/api/warnings/discord/route.ts
    - Проверять роль Discord_Moderator или Rule_Editor
    - Возвращать Discord warnings
    - _Требования: 2.2, 2.3, 6.2_
  
  - [x] 11.2 Создать GET /api/warnings/twitch endpoint
    - Создать src/app/api/warnings/twitch/route.ts
    - Проверять роль Twitch_Moderator или Rule_Editor
    - Возвращать Twitch warnings
    - _Требования: 2.1, 2.3, 6.2_

- [x] 12. Реализация компонентов аутентификации
  - [x] 12.1 Создать AuthProvider компонент
    - Создать src/components/auth/AuthProvider.tsx
    - Обернуть SessionProvider из NextAuth
    - _Требования: 1.4_
  
  - [x] 12.2 Создать LoginButton компонент
    - Создать src/components/auth/LoginButton.tsx
    - Использовать signIn() из NextAuth для Discord OAuth
    - Применить dark purple стилизацию
    - _Требования: 1.1, 5.1, 5.2_
  
  - [x] 12.3 Создать ProfileDisplay компонент
    - Создать src/components/auth/ProfileDisplay.tsx
    - Отображать Discord username и avatar в правом верхнем углу
    - Показывать дополнительную информацию при hover
    - Добавить кнопку logout
    - _Требования: 4.1, 4.2, 4.3, 4.4, 1.5_
  
  - [ ]* 12.4 Написать unit тесты для auth компонентов
    - Тестировать рендеринг ProfileDisplay
    - Тестировать hover behavior
    - Тестировать logout функциональность
    - _Требования: 4.1, 4.2, 4.3, 4.4, 1.5_

- [x] 13. Реализация компонентов анимаций
  - [x] 13.1 Создать WelcomeAnimation компонент
    - Создать src/components/animations/WelcomeAnimation.tsx
    - Использовать Framer Motion для fade-in и scale анимации
    - Отображать приветствие с username
    - _Требования: 1.3, 9.1, 9.4, 9.5_
  
  - [x] 13.2 Создать FadeInText компонент
    - Создать src/components/animations/FadeInText.tsx
    - Реализовать плавное появление текста с настраиваемой задержкой
    - _Требования: 9.2, 9.4, 9.5_
  
  - [x] 13.3 Создать AccessDeniedAnimation компонент
    - Создать src/components/animations/AccessDeniedAnimation.tsx
    - Анимировать сообщение "Доступ запрещён руководством сообщества ! Чтобы получить доступ напишите ему '@santa2555555'"
    - _Требования: 2.4, 9.3, 9.4, 9.5_
  
  - [ ]* 13.4 Написать unit тесты для animation компонентов
    - Тестировать наличие анимаций
    - Тестировать onComplete callbacks
    - _Требования: 9.1, 9.2, 9.3, 9.4_

- [x] 14. Реализация компонентов контента
  - [x] 14.1 Создать ContentContainer компонент
    - Создать src/components/content/ContentContainer.tsx
    - Применить glassmorphism эффект (backdrop-blur, bg-white/10, border)
    - Добавить опциональную анимацию появления
    - _Требования: 5.2, 5.3, 6.1, 6.2_
  
  - [x] 14.2 Создать RuleSection компонент
    - Создать src/components/content/RuleSection.tsx
    - Отображать секцию правил с заголовком
    - Поддерживать иерархическую структуру с subsections
    - Отображать penalties в формате "Выговор -> Снятие -> Бан"
    - Условно показывать edit controls для Rule_Editor
    - _Требования: 6.1, 6.3, 7.2, 7.3_
  
  - [x] 14.3 Создать RuleEditor компонент
    - Создать src/components/content/RuleEditor.tsx
    - Реализовать inline редактирование правил
    - Добавить кнопки save и cancel
    - Вызывать PUT API endpoint при сохранении
    - Отображать confirmation message после успешного сохранения
    - _Требования: 3.1, 3.2, 3.3, 3.4_
  
  - [x] 14.4 Создать WarningSection компонент
    - Создать src/components/content/WarningSection.tsx
    - Отображать warnings с severity indicators
    - _Требования: 6.2, 6.3_
  
  - [ ]* 14.5 Написать unit тесты для content компонентов
    - Тестировать рендеринг RuleSection с различными данными
    - Тестировать edit mode в RuleEditor
    - Тестировать сохранение изменений
    - _Требования: 3.1, 3.2, 3.3, 6.1, 6.2, 7.2_

- [x] 15. Checkpoint - Проверка компонентов
  - Убедиться, что все тесты проходят, задать вопросы пользователю при необходимости.

- [x] 16. Реализация layout компонентов
  - [x] 16.1 Создать Header компонент
    - Создать src/components/layout/Header.tsx
    - Разместить ProfileDisplay в правом верхнем углу
    - Применить dark purple тему
    - _Требования: 4.3, 5.1, 5.2_
  
  - [x] 16.2 Создать ResponsiveContainer компонент
    - Создать src/components/layout/ResponsiveContainer.tsx
    - Поддерживать breakpoints: mobile (<768px), tablet (768-1024px), desktop (>1024px)
    - _Требования: 12.1, 12.2, 12.3, 12.4, 12.5_
  
  - [x] 16.3 Создать MainLayout компонент
    - Создать src/components/layout/MainLayout.tsx
    - Интегрировать Header и content area
    - Применить dark purple background
    - _Требования: 5.1, 5.2, 5.5_

- [x] 17. Создание страниц приложения
  - [x] 17.1 Создать root layout
    - Создать src/app/layout.tsx
    - Обернуть приложение в AuthProvider
    - Подключить globals.css с Tailwind
    - Настроить metadata
    - _Требования: 5.1, 5.5_
  
  - [x] 17.2 Создать landing page
    - Создать src/app/page.tsx
    - Отображать LoginButton для неаутентифицированных пользователей
    - Редиректить аутентифицированных на /dashboard
    - _Требования: 1.1_
  
  - [x] 17.3 Создать dashboard page
    - Создать src/app/dashboard/page.tsx
    - Проверять сессию и accessLevel
    - Показывать WelcomeAnimation при первом входе
    - Отображать соответствующий контент на основе роли:
      - Twitch_Moderator: Twitch rules и warnings
      - Discord_Moderator: Discord rules и warnings
      - Rule_Editor: все rules с edit controls
      - Restricted_User: AccessDeniedAnimation
    - _Требования: 1.3, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 9.1_
  
  - [x] 17.4 Создать access-denied page
    - Создать src/app/access-denied/page.tsx
    - Отображать AccessDeniedAnimation с сообщением
    - _Требования: 2.4, 2.6, 9.3_

- [x] 18. Стилизация и визуальные эффекты
  - [x] 18.1 Настроить globals.css
    - Создать src/app/globals.css
    - Импортировать Tailwind directives
    - Добавить custom CSS для glassmorphism
    - Настроить dark purple background для body
    - _Требования: 5.1, 5.2, 5.3, 5.5_
  
  - [x] 18.2 Применить transitions ко всем интерактивным элементам
    - Добавить smooth transitions к кнопкам, ссылкам, hover states
    - Использовать Tailwind transition utilities
    - _Требования: 5.3, 9.4_
  
  - [ ]* 18.3 Написать visual regression тесты
    - Snapshot тесты для glassmorphism styling
    - Тесты для dark purple theme
    - Тесты для responsive layouts
    - _Требования: 5.1, 5.2, 5.5, 12.1, 12.2, 12.3_

- [x] 19. Обработка ошибок
  - [x] 19.1 Добавить error handling в API routes
    - Обрабатывать Discord OAuth failures
    - Обрабатывать file system errors
    - Обрабатывать JSON parsing errors
    - Возвращать appropriate HTTP status codes и error messages
    - _Требования: 10.5_
  
  - [x] 19.2 Создать error boundary компоненты
    - Создать src/app/error.tsx для глобальных ошибок
    - Отображать user-friendly error messages
    - Логировать ошибки
    - _Требования: 10.5_
  
  - [x] 19.3 Добавить client-side error handling
    - Обрабатывать network errors в API calls
    - Отображать error toasts/notifications
    - Реализовать retry logic
    - _Требования: 10.5_

- [x] 20. Финальная интеграция и тестирование
  - [x] 20.1 Интегрировать все компоненты
    - Убедиться, что все компоненты корректно взаимодействуют
    - Проверить flow от login до dashboard
    - Проверить редактирование правил end-to-end
    - _Требования: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 3.1, 3.2_
  
  - [ ]* 20.2 Написать E2E тесты для критических user flows
    - Тест: Authentication flow (login → welcome → dashboard)
    - Тест: Twitch Moderator flow (видит только Twitch контент)
    - Тест: Discord Moderator flow (видит только Discord контент)
    - Тест: Rule Editor flow (видит все + может редактировать)
    - Тест: Restricted User flow (видит access denied)
    - Тест: Logout flow
    - _Требования: 1.1, 1.3, 1.5, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3_
  
  - [ ]* 20.3 Запустить все property-based тесты
    - Выполнить все 5 property tests с 100 iterations
    - Проверить, что все properties проходят
    - _Требования: 1.2, 2.5, 3.2, 3.4, 10.1, 10.3, 10.4, 11.5_

- [x] 21. Финальный checkpoint
  - Убедиться, что все тесты проходят, задать вопросы пользователю при необходимости.

## Примечания

- Задачи, отмеченные `*`, являются опциональными и могут быть пропущены для более быстрого MVP
- Каждая задача ссылается на конкретные требования для отслеживаемости
- Checkpoints обеспечивают инкрементальную валидацию
- Property tests валидируют универсальные свойства корректности
- Unit tests валидируют конкретные примеры и edge cases
- E2E tests валидируют критические user flows
