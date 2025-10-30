# i18n (Internationalization) Setup

This project uses `react-i18next` for internationalization support with Thai and English languages.

## 🚀 Features

- ✅ Support for Thai (th) and English (en) languages
- ✅ Language switcher component with flag icons
- ✅ LocalStorage persistence for language preference
- ✅ TypeScript support with type-safe translation keys
- ✅ Custom hook for easy usage
- ✅ Loading state during initialization

## 📁 Structure

```
public/locales/
├── en/
│   └── common.json     # English translations
└── th/
    └── common.json     # Thai translations

src/
├── components/
│   └── LanguageSwitcher.tsx    # Language switcher component
├── hooks/
│   └── useI18n.ts             # Custom i18n hook
└── lib/
    └── i18n.ts                # i18n configuration

app/
└── providers/
    └── I18nProvider.tsx       # i18n provider component
```

## 🔧 Usage

### 1. Basic Usage with Hook

```tsx
import { useI18n } from '@/src/hooks/useI18n';

function MyComponent() {
  const { t, changeLanguage, currentLanguage } = useI18n();
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('navigation.home')}</p>
      <button onClick={() => changeLanguage('en')}>
        Switch to English
      </button>
    </div>
  );
}
```

### 2. Using Helper Functions

```tsx
import { useI18n } from '@/src/hooks/useI18n';

function GameComponent() {
  const { tGame, tCommon, tAuth } = useI18n();
  
  return (
    <div>
      <h2>{tGame('startGame')}</h2>
      <button>{tCommon('confirm')}</button>
      <a href="/login">{tAuth('login')}</a>
    </div>
  );
}
```

### 3. Language Switcher

```tsx
import { LanguageSwitcher } from '@/src/components';

function Header() {
  return (
    <header>
      <h1>My App</h1>
      <LanguageSwitcher className="ml-auto" />
    </header>
  );
}
```

### 4. Using react-i18next Directly

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation('common');
  
  return (
    <div>
      <p>{t('common.loading')}</p>
      <p>Current language: {i18n.language}</p>
    </div>
  );
}
```

## 📝 Translation Keys Structure

```json
{
  "title": "App Title",
  "navigation": {
    "home": "Home",
    "game": "Game",
    "settings": "Settings"
  },
  "auth": {
    "login": "Login",
    "register": "Register",
    "logout": "Logout"
  },
  "game": {
    "startGame": "Start Game",
    "joinGame": "Join Game",
    "gameOver": "Game Over"
  },
  "settings": {
    "language": "Language",
    "save": "Save"
  },
  "common": {
    "loading": "Loading...",
    "error": "Error",
    "success": "Success"
  }
}
```

## 🎨 Language Switcher Customization

The LanguageSwitcher component accepts a `className` prop for styling:

```tsx
<LanguageSwitcher className="custom-class" />
```

Default supported languages:
- 🇹🇭 Thai (`th`)
- 🇺🇸 English (`en`)

## 🔄 Adding New Languages

1. Create new translation file: `public/locales/{lang-code}/common.json`
2. Update the languages array in `LanguageSwitcher.tsx`:

```tsx
const languages = [
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' }, // New language
];
```

3. Update resources in `i18n.ts`:

```tsx
import jaCommon from '../../public/locales/ja/common.json';

const resources = {
  en: { common: enCommon },
  th: { common: thCommon },
  ja: { common: jaCommon }, // New language
};
```

## 📱 Features

- **Auto-detection**: Detects browser language preference
- **Persistence**: Saves language choice to localStorage
- **SSR Support**: Works with Next.js server-side rendering
- **Loading States**: Shows loading indicator during initialization
- **Error Handling**: Graceful fallback if translations fail to load

## 🔧 Configuration

### Default Language
Change the default language in `I18nProvider.tsx`:

```tsx
<I18nProvider initialLanguage="en"> // Default to English
```

### Fallback Language
Change the fallback language in `i18n.ts`:

```tsx
i18n.init({
  // ...other config
  fallbackLng: 'th', // Fallback to Thai
});
```