# Font Configuration - Bebas Neue & Inter

This document describes the font setup for the Zombie Board Game project.

## Fonts Used

### 1. Bebas Neue
- **Purpose**: Headlines and titles (หัวข้อ)
- **Character**: Bold, uppercase display font
- **Usage**: All headings (h1-h6), game titles, navigation titles

### 2. Inter
- **Purpose**: Body text and readable content (ตัวอ่านง่าย)
- **Character**: Clean, readable sans-serif
- **Usage**: Body text, descriptions, buttons, general content

## Implementation

### Next.js Font Configuration (`app/layout.tsx`)
```tsx
import { Bebas_Neue, Inter } from "next/font/google";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
```

### CSS Variables (`app/globals.css`)
```css
:root {
  --font-heading: "Bebas Neue", sans-serif;
  --font-body: "Inter", sans-serif;
  --font-bebas: var(--font-heading);
  --font-inter: var(--font-body);
}
```

### Typography Classes
```css
/* Headings use Bebas Neue */
h1, h2, h3, h4, h5, h6, .heading {
  font-family: var(--font-bebas) !important;
  font-weight: 400;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* Body text uses Inter */
p, span, div, a, li, td, th, .text {
  font-family: var(--font-inter) !important;
}
```

### Utility Classes
- `.font-heading` - Apply Bebas Neue font
- `.font-body` - Apply Inter font
- `.font-bebas` - Direct Bebas Neue reference
- `.font-inter` - Direct Inter reference

## Tailwind Configuration

The fonts are also configured in `tailwind.config.ts` for use with Tailwind utilities:

```typescript
fontFamily: {
  'heading': ['var(--font-bebas)', 'sans-serif'],
  'body': ['var(--font-inter)', 'sans-serif'],
  'bebas': ['var(--font-bebas)', 'sans-serif'],
  'inter': ['var(--font-inter)', 'sans-serif'],
}
```

## Usage Examples

### In Components
```tsx
// Heading with Bebas Neue
<h1 className="font-heading">ZOMBIE OUTBREAK</h1>

// Body text with Inter
<p className="font-body">The undead are rising...</p>

// Ant Design Title with custom styling
<Title 
  level={2} 
  className="font-heading"
  style={{ 
    fontFamily: 'var(--font-bebas)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  }}
>
  Game Title
</Title>
```

### Tailwind Classes
```tsx
<h1 className="font-heading text-4xl">Main Title</h1>
<p className="font-body text-base">Body content</p>
```

## Font Loading

Fonts are loaded automatically via Next.js Google Fonts integration:
- Bebas Neue: `https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap`
- Inter: `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap`

The fonts are preloaded for optimal performance and use `display=swap` for better loading experience.