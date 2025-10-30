# Zombie Board Game Theme Usage Guide

## 🧟‍♂️ Dark + Neon Glow Theme

ธีมนี้ออกแบบมาสำหรับเกม Board Game ธีม Zombie โดยใช้โทนสี Dark + Neon Glow (เขียว/ม่วง) เพื่อสร้างความรู้สึกลึกลับและน่าตื่นเต้น

## 🎨 Color Palette

### Primary Colors
- **Zombie Green**: `#00ff88` - สีหลักสำหรับการติดเชื้อ
- **Infection Purple**: `#ff00ff` - สีรองสำหรับการแพร่เชื้อ
- **Blood Red**: `#ff0066` - สีสำหรับอันตราย/ความตาย

### Background Colors
- **Base**: `#0a0a0f` - พื้นหลังหลักสีเข้มมาก
- **Container**: `#1a1a2e` - พื้นหลังการ์ดและคอนเทนเนอร์
- **Secondary**: `#16213e` - พื้นหลังรอง
- **Tertiary**: `#0f3460` - พื้นหลังสำหรับเน้น

## 📁 Files Structure

```
src/theme/
├── tokens.ts          # Color tokens และ design system
├── darkTheme.ts       # Ant Design dark theme configuration
├── antdTheme.ts       # Main Ant Design theme
├── globalStyles.ts    # Global CSS styles (TypeScript)
├── zombieTheme.css    # Pure CSS styles
└── index.ts           # Theme exports
```

## 🚀 Quick Start

### 1. Import Theme in Your App

```typescript
// In your main layout or app file
import { ConfigProvider } from 'antd';
import { theme } from '@/src/theme';

function App() {
  return (
    <ConfigProvider theme={theme}>
      {/* Your app content */}
    </ConfigProvider>
  );
}
```

### 2. Using CSS Classes

```tsx
// Game cards with zombie theme
<div className="game-card glow-primary">
  <h3 className="zombie-title">Zombie Hunter</h3>
  <p className="infection-text">Infection Level: High</p>
  <p className="danger-text">Health: Critical</p>
</div>

// Utility classes
<div className="bg-zombie-container text-zombie-primary border-zombie">
  Game Board
</div>
```

### 3. Using CSS Variables

```css
.custom-component {
  background: var(--bg-container);
  color: var(--text-primary);
  border: 1px solid var(--border-secondary);
  box-shadow: var(--shadow-primary);
}
```

## 🎮 Game Components Examples

### Zombie Counter
```tsx
<div className="zombie-counter">
  <div>Zombies Remaining</div>
  <div style={{ fontSize: '2rem' }}>12</div>
</div>
```

### Infection Meter
```tsx
<div className="infection-meter">
  <div 
    className="infection-meter-fill" 
    style={{ width: '60%' }}
  />
</div>
```

### Health Bar
```tsx
<div className="health-bar">
  <div 
    className="health-bar-fill" 
    style={{ width: '40%' }}
  />
</div>
```

## 🛠️ Ant Design Components

ธีมนี้จะปรับแต่ง Ant Design components ต่อไปนี้:

- **Button**: เพิ่ม glow effect และ gradient
- **Card**: พื้นหลังเข้มพร้อม border glow
- **Modal**: ธีมเข้มพร้อม neon accent
- **Table**: แถบสีเขียว neon เมื่อ hover
- **Input**: Border เปลี่ยนเป็นสีเขียวเมื่อ focus
- **Menu**: เน้นด้วยสีเขียว neon

## 🌟 Special Effects

### Glow Classes
```css
.glow-primary    /* เขียว neon glow */
.glow-secondary  /* ม่วง neon glow */
.glow-danger     /* แดง neon glow */
```

### Animation Classes
```css
.pulse-animation  /* กระพริบแสง */
.flicker-animation /* แสงกระพริบแบบหลอดไฟเสีย */
```

### Text Effects
```css
.zombie-title     /* ข้อความหัวข้อแบบ zombie */
.infection-text   /* ข้อความแสดงการติดเชื้อ */
.danger-text      /* ข้อความแสดงอันตราย */
```

## 📱 Responsive Design

ธีมรองรับ responsive design:

- **Desktop**: แสดงเอฟเฟกต์เต็มรูปแบบ
- **Tablet**: ลดขนาด font และ spacing
- **Mobile**: ปรับแต่งสำหรับหน้าจอเล็ก

## ♿ Accessibility

- รองรับ `prefers-contrast: high`
- รองรับ `prefers-reduced-motion`
- Focus indicators ชัดเจน
- Color contrast ratio ผ่านมาตรฐาน WCAG

## 🎯 Usage Tips

1. **Game Cards**: ใช้ `.game-card` class สำหรับการ์ดเกม
2. **Status Indicators**: ใช้สี zombie-green, infection-purple, blood-red
3. **Interactive Elements**: เพิ่ม glow effects เมื่อ hover
4. **Typography**: ใช้ Orbitron font สำหรับหัวข้อ
5. **Animations**: ใช้อย่างพอประมาณเพื่อไม่ให้รกตา

## 🐛 Troubleshooting

### CSS ไม่ทำงาน
ตรวจสอบว่าได้ import `zombieTheme.css` ใน `globals.css` แล้ว

### Font ไม่แสดง
ตรวจสอบการ import Google Fonts ใน CSS

### Ant Design components ไม่เป็นไปตามธีม
ตรวจสอบว่า ConfigProvider ถูกใช้งานถูกต้อง

## 🎉 Ready to Use!

ธีมนี้พร้อมใช้งานแล้ว! เพียงแค่ import และใช้งานตาม examples ข้างต้น จะได้เกม board game zombie ที่มีลุคสวยงามและน่าตื่นเต้น