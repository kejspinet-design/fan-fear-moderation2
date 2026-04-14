# Requirements Document

## Introduction

The Fear Community Rules Website is a role-based web application that displays moderation rules and warnings for the Fear fan community staff. The system authenticates users through Discord OAuth and provides different content access based on Discord role IDs. The website features a dark purple glassmorphism theme with high-quality animations and allows authorized users to edit rules with persistent storage.

## Glossary

- **System**: The Fear Community Rules Website application
- **Discord_OAuth_Provider**: Discord's OAuth 2.0 authentication service
- **User**: A staff member attempting to access the website
- **Role_ID**: A unique Discord role identifier used for access control
- **Twitch_Moderator**: User with Discord role ID 1489222060373708884
- **Discord_Moderator**: User with Discord role ID 1488499982565642260
- **Rule_Editor**: User with one of three Discord role IDs: 1488988144035561644, 1488262589199945808, or 1488262514881069156
- **Restricted_User**: User with Discord role ID 1488973483323953182
- **Rule_Content**: Text content describing moderation rules or warnings
- **Profile_Display**: Visual component showing Discord username and avatar
- **Glassmorphism_Effect**: Visual design style with frosted glass appearance
- **Content_Section**: Distinct area displaying either rules or warnings

## Requirements

### Requirement 1: Discord OAuth Authentication

**User Story:** As a staff member, I want to authenticate through Discord, so that I can access the community rules website securely.

#### Acceptance Criteria

1. WHEN a User visits the website without authentication, THE System SHALL redirect to Discord_OAuth_Provider
2. WHEN Discord_OAuth_Provider returns authentication data, THE System SHALL extract the User's Discord role IDs
3. WHEN authentication completes successfully, THE System SHALL display a welcome animation
4. THE System SHALL maintain the User's authenticated session
5. WHEN a User logs out, THE System SHALL clear the authentication session and redirect to the login page

### Requirement 2: Role-Based Content Access

**User Story:** As a staff member, I want to see content appropriate for my role, so that I can access the rules relevant to my responsibilities.

#### Acceptance Criteria

1. WHEN a Twitch_Moderator authenticates, THE System SHALL display Twitch moderation rules and warnings
2. WHEN a Discord_Moderator authenticates, THE System SHALL display Discord moderation rules and warnings
3. WHEN a Rule_Editor authenticates, THE System SHALL display all rules with editing capabilities
4. WHEN a Restricted_User authenticates, THE System SHALL display the access denied message "Доступ запрещён руководством сообщества ! Чтобы получить доступ напишите ему '@santa2555555'" with fade-in animation
5. WHEN a User has multiple qualifying roles, THE System SHALL grant the highest level of access
6. WHEN a User has no qualifying roles, THE System SHALL display an access denied message

### Requirement 3: Rule Editor Capabilities

**User Story:** As a rule editor, I want to edit rules directly on the website, so that I can keep moderation guidelines up to date.

#### Acceptance Criteria

1. WHEN a Rule_Editor views Rule_Content, THE System SHALL display edit controls for each rule
2. WHEN a Rule_Editor modifies Rule_Content, THE System SHALL save changes to persistent storage
3. WHEN a Rule_Editor saves changes, THE System SHALL display a confirmation message
4. WHEN Rule_Content is updated, THE System SHALL preserve the original formatting and structure
5. WHEN multiple Rule_Editors edit simultaneously, THE System SHALL prevent conflicting changes

### Requirement 4: Discord Profile Display

**User Story:** As a user, I want to see my Discord profile in the interface, so that I can confirm my identity.

#### Acceptance Criteria

1. WHEN a User authenticates successfully, THE System SHALL display the User's Discord username in the top-right corner
2. WHEN a User authenticates successfully, THE System SHALL display the User's Discord avatar in the top-right corner
3. THE Profile_Display SHALL remain visible while the User navigates the website
4. WHEN a User hovers over Profile_Display, THE System SHALL display additional profile information

### Requirement 5: Visual Theme and Styling

**User Story:** As a user, I want a visually appealing dark purple interface, so that I have an enjoyable browsing experience.

#### Acceptance Criteria

1. THE System SHALL apply a dark purple color scheme to all interface elements
2. THE System SHALL apply Glassmorphism_Effect to content containers
3. THE System SHALL use smooth transitions for all interactive elements
4. WHEN text content appears, THE System SHALL animate it with a fade-in effect
5. THE System SHALL maintain visual consistency across all pages

### Requirement 6: Content Structure and Organization

**User Story:** As a moderator, I want rules and warnings displayed in separate sections, so that I can easily find the information I need.

#### Acceptance Criteria

1. THE System SHALL display rules in a dedicated Content_Section
2. THE System SHALL display warnings in a separate Content_Section
3. WHEN a User navigates between sections, THE System SHALL maintain smooth transitions
4. THE System SHALL organize Discord moderation rules into nine numbered categories
5. THE System SHALL organize Twitch moderation rules by topic areas

### Requirement 7: Discord Moderation Rules Content

**User Story:** As a Discord moderator, I want to view comprehensive moderation rules, so that I can perform my duties correctly.

#### Acceptance Criteria

1. THE System SHALL display Discord moderation rules with the following categories: Основы, Обязанности, Субординация, Безопасность, Конфиденциальность, Действия, Конфликты, Активность, Ограничение
2. WHEN a Discord_Moderator or Rule_Editor views rules, THE System SHALL display all rule subsections with their corresponding penalties
3. THE System SHALL preserve the hierarchical numbering structure of rules
4. THE System SHALL display penalty progressions in the format "Выговор -> Снятие -> Бан"

### Requirement 8: Twitch Moderation Rules Content

**User Story:** As a Twitch moderator, I want to view Twitch-specific moderation guidelines, so that I can moderate the stream effectively.

#### Acceptance Criteria

1. THE System SHALL display Twitch moderation rules including punishment scale, timeout commands, ban commands, and prohibited actions
2. WHEN a Twitch_Moderator or Rule_Editor views rules, THE System SHALL display interaction guidelines with other moderators and the streamer
3. THE System SHALL display a technical commands quick reference section
4. THE System SHALL display emergency situations handling procedures

### Requirement 9: Animation and Visual Effects

**User Story:** As a user, I want smooth animations and high-quality visual effects, so that the interface feels polished and professional.

#### Acceptance Criteria

1. WHEN a User completes authentication, THE System SHALL display a welcome animation
2. WHEN text content loads, THE System SHALL animate it with a smooth fade-in effect
3. WHEN a Restricted_User sees the access denied message, THE System SHALL animate it with a smooth fade-in effect
4. THE System SHALL apply smooth transitions to all navigation actions
5. THE System SHALL maintain animation performance at 60 frames per second

### Requirement 10: Data Persistence

**User Story:** As a rule editor, I want my changes to be saved permanently, so that updates persist across sessions.

#### Acceptance Criteria

1. WHEN a Rule_Editor saves Rule_Content changes, THE System SHALL store the updated content in persistent storage
2. WHEN the System restarts, THE System SHALL load the most recent version of all Rule_Content
3. WHEN Rule_Content is retrieved, THE System SHALL return the latest saved version
4. THE System SHALL maintain a backup of Rule_Content before applying updates
5. WHEN storage operations fail, THE System SHALL display an error message to the Rule_Editor

### Requirement 11: Role ID Validation

**User Story:** As a system administrator, I want role IDs validated correctly, so that only authorized users access specific content.

#### Acceptance Criteria

1. THE System SHALL recognize Discord role ID 1489222060373708884 as Twitch_Moderator
2. THE System SHALL recognize Discord role ID 1488499982565642260 as Discord_Moderator
3. THE System SHALL recognize Discord role IDs 1488988144035561644, 1488262589199945808, and 1488262514881069156 as Rule_Editor
4. THE System SHALL recognize Discord role ID 1488973483323953182 as Restricted_User
5. WHEN a User's role IDs are retrieved from Discord_OAuth_Provider, THE System SHALL validate them against the configured role list

### Requirement 12: Responsive Layout

**User Story:** As a user, I want the website to work on different screen sizes, so that I can access it from various devices.

#### Acceptance Criteria

1. WHEN the viewport width is less than 768 pixels, THE System SHALL adjust the layout for mobile devices
2. WHEN the viewport width is between 768 and 1024 pixels, THE System SHALL adjust the layout for tablets
3. WHEN the viewport width exceeds 1024 pixels, THE System SHALL display the desktop layout
4. THE Profile_Display SHALL remain accessible on all screen sizes
5. THE System SHALL maintain readability of Rule_Content on all screen sizes
