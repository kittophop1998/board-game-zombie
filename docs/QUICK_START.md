# 🎮 Quick Start Guide - Card Game Features

## 🚀 Getting Started in 3 Steps

### 1. Start the Development Server
```bash
npm run dev
```

### 2. Navigate to Game Room
```
http://localhost:3000/game/room-123
```
*(Replace `room-123` with any room ID)*

### 3. Start Playing!
1. ✅ **Select Opponent** - Modal จะปรากฏให้เลือกฝ่ายตรขา้ม
2. ✅ **Select Cards** - คลิกการ์ดในมือของคุณ (เลือกได้หลายใบ)
3. ✅ **Place Cards** - กดปุ่ม "Place on Table" เพื่อวางการ์ดคว่ำ
4. ✅ **Reveal Cards** - คลิกที่การ์ดคว่ำ (🂠) เพื่อเปิด

---

## 📖 Complete Feature List

### ✨ Current Features (Working Now)

| Feature | Status | Description |
|---------|--------|-------------|
| 🎯 Opponent Selection | ✅ | เลือกฝ่ายตรงข้ามก่อนเริ่มเกม |
| 🃏 Card Selection | ✅ | เลือกการ์ดได้หลายใบ |
| 📥 Place Cards | ✅ | วางการ์ดคว่ำบนโต๊ะ |
| 👁️ Reveal Cards | ✅ | คลิกเพื่อเปิดการ์ด |
| 🎨 Animations | ✅ | Smooth animations ทุกที่ |
| 📱 Responsive | ✅ | ใช้งานได้บน mobile + desktop |
| 🎮 Game Table | ✅ | แยกพื้นที่เราและฝ่ายตรงข้าม |
| 🔔 Notifications | ✅ | แจ้งเตือนทุก action |

### 🔮 Coming Soon (Need Socket.IO)

| Feature | Status | Description |
|---------|--------|-------------|
| 🌐 Real-time Sync | 📋 Planned | เห็นการ์ดฝ่ายตรงข้ามแบบ real-time |
| 👥 Multiplayer | 📋 Planned | เล่นกับคนจริงผ่าน Socket.IO |
| 🔄 Turn System | 📋 Planned | ระบบการจัดการเทิร์น |
| 💬 Chat | 📋 Planned | แชทกับผู้เล่นอื่น |

---

## 🎯 How to Play

### Step 1: Enter Game Room
```
/game/[room-id]
```

### Step 2: Choose Opponent
![Opponent Selection Modal]
- Modal จะปรากฏอัตโนมัติ
- แสดงรายชื่อผู้เล่นทั้งหมด
- คลิกเลือกคู่แข่ง

### Step 3: Select Cards
- คลิกการ์ดในมือเพื่อเลือก
- การ์ดที่เลือกจะยกขึ้นและมี border สีน้ำเงิน
- สามารถเลือกได้หลายใบ

### Step 4: Place Cards on Table
- กดปุ่ม **"Place on Table (n)"**
- การ์ดจะวางบนโต๊ะแบบคว่ำ (🂠)
- ฝ่ายตรงข้ามจะวางการ์ดตอบกลับ (simulation)

### Step 5: Reveal Cards
- คลิกที่การ์ดคว่ำ (มีไอคอน 👁️)
- การ์ดจะเปิดพร้อม flip animation
- แสดงเนื้อหาการ์ด

### Other Actions
- 💉 **Use Vaccine** - ใช้การ์ดวัคซีน
- 🔫 **Use Gun** - ใช้การ์ดปืน
- **Play to Discard** - ทิ้งการ์ดลงกองทิ้ง

---

## 🎨 UI Overview

```
┌─────────────────────────────────────┐
│         OPPONENT'S CARDS            │
│         🂠 🂠 7♥ K♠               │
│         ↑ Face down/up               │
├─────────────────────────────────────┤
│    🧠 Deck [17]   🧟‍♂️ Discard [4] │
├─────────────────────────────────────┤
│         YOUR CARDS                  │
│         🂠 🂠 🔫 💉              │
│         ↑ Your placed cards          │
├─────────────────────────────────────┤
│         YOUR HAND                   │
│  7♥ K♠ 🧟 🔫 4♦ 3♥ 💉          │
│  ↑ Click to select                  │
└─────────────────────────────────────┘

[💉 Vaccine] [🔫 Gun] [Place (3)] [Discard (3)]
```

---

## 🎮 Game Flow Diagram

```
Enter Game → Select Opponent → Game Starts
                                    ↓
                            Select Cards from Hand
                                    ↓
                              ┌─────┴─────┐
                              ↓           ↓
                        Place Cards   OR  Other Actions
                        (Face Down)       (Vaccine/Gun/Discard)
                              ↓
                        Click to Reveal
                              ↓
                        Card Shows Content
                              ↓
                        Continue Playing
```

---

## 📁 Project Structure

```
/app/game/[id]/page.tsx       ← Main game component
/app/game/game.css            ← Game animations & styles
/src/lib/socket.ts            ← Socket.IO utility (prepared)
/docs/
  ├── GAME_FEATURES.md        ← Complete feature docs
  ├── SOCKET_SETUP.md         ← Socket.IO integration guide
  ├── UI_SHOWCASE.md          ← UI/UX documentation
  ├── FEATURE_SUMMARY.md      ← Full summary
  └── QUICK_START.md          ← This file
```

---

## 🔧 Key Functions

| Function | Purpose |
|----------|---------|
| `handleSelectOpponent()` | เลือกฝ่ายตรงข้าม |
| `handleCardSelect()` | เลือก/ยกเลิกเลือกการ์ด |
| `handlePlaceCards()` | วางการ์ดบนโต๊ะ (คว่ำ) |
| `handleRevealCard()` | เปิดการ์ดที่วางไว้ |
| `renderPlacedCard()` | แสดงการ์ดบนโต๊ะ |
| `renderCard()` | แสดงการ์ดทั่วไป |

---

## 💻 Code Examples

### Select and Place Cards
```typescript
// 1. User clicks cards → handleCardSelect()
// 2. Selected cards stored in state
// 3. User clicks "Place on Table" → handlePlaceCards()
// 4. Cards moved to myPlacedCards[] (face down)
// 5. Opponent simulates placement
```

### Reveal Cards
```typescript
// 1. User clicks face down card → handleRevealCard()
// 2. Card's isRevealed = true
// 3. Flip animation plays
// 4. Card content visible
```

---

## 🎨 Styling

### Card States
- **Normal**: Gray background
- **Selected**: Blue border, raised, shadow
- **Face Down**: Purple gradient, glow effect
- **Revealed**: Shows actual card content

### Animations
- **Place**: Slide and scale (0.5s)
- **Flip**: Rotate Y-axis (0.6s)
- **Glow**: Pulsing effect (2s loop)

---

## 📱 Responsive Breakpoints

| Device | Width | Card Size |
|--------|-------|-----------|
| Mobile | < 768px | 50x70px |
| Desktop | ≥ 768px | 70x100px |

---

## 🚀 Next: Enable Real-time

### To enable Socket.IO:

```bash
# 1. Install
npm install socket.io-client

# 2. Setup server (see SOCKET_SETUP.md)
node server/socket-server.js

# 3. Update socket.ts
# Uncomment Socket.IO code

# 4. Test with multiple tabs/browsers
```

**📖 Full guide:** See `/docs/SOCKET_SETUP.md`

---

## 🐛 Troubleshooting

### Problem: Modal doesn't appear
**Solution:** Check that `gameStarted` is `false` initially

### Problem: Cards don't place
**Solution:** Make sure you selected cards first (blue border)

### Problem: Reveal doesn't work
**Solution:** Only face down cards (🂠) can be revealed

### Problem: Animations look wrong
**Solution:** Clear browser cache and reload

---

## 🎯 Testing Checklist

Basic functionality test:
- [ ] Modal appears on load
- [ ] Can select opponent
- [ ] Can select cards (blue highlight)
- [ ] Can place cards (becomes 🂠)
- [ ] Can reveal cards (shows content)
- [ ] Opponent simulates actions
- [ ] Notifications appear
- [ ] Works on mobile size

---

## 📚 Learn More

- **Full Features**: `docs/GAME_FEATURES.md`
- **Socket.IO Setup**: `docs/SOCKET_SETUP.md`
- **UI Design**: `docs/UI_SHOWCASE.md`
- **Complete Summary**: `docs/FEATURE_SUMMARY.md`

---

## 🎉 You're Ready!

เริ่มเล่นได้เลย:
```bash
npm run dev
# Visit http://localhost:3000/game/test-room
```

**Have fun! 🎮🃏✨**
