# 🧟 Board Game Zombie - Card Game

A real-time multiplayer zombie-themed card game built with Next.js, TypeScript, and Ant Design.

## 🎮 Features

### ✨ Current Features (v1.0)
- 🎯 **Opponent Selection** - เลือกฝ่ายตรงข้ามก่อนเริ่มเกม
- 🃏 **Card Placement** - วางการ์ดคว่ำบนโต๊ะ
- 👁️ **Card Reveal** - เปิดการ์ดทีละใบพร้อม animation
- 🎲 **Game Table** - แสดงการ์ดของทั้งสองฝ่าย
- 🎨 **Beautiful UI** - Responsive design สำหรับ mobile และ desktop
- 🔔 **Notifications** - แจ้งเตือนทุก action
- ✨ **Smooth Animations** - Card placement, flip, และ glow effects

### 🔮 Coming Soon
- 🌐 **Real-time Multiplayer** - เชื่อมต่อผ่าน Socket.IO
- 🔄 **Turn-based System** - ระบบจัดการเทิร์น
- 📊 **Score Tracking** - บันทึกคะแนน
- 💬 **Chat System** - แชทกับผู้เล่นอื่น

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Run development server
npm run dev
```

### Play the Game

```
# Navigate to:
http://localhost:3000/game/[room-id]

# Example:
http://localhost:3000/game/room-123
```

### Game Flow
1. **Select Opponent** → Modal จะปรากฏให้เลือกฝ่ายตรงข้าม
2. **Select Cards** → คลิกการ์ดในมือ (เลือกได้หลายใบ)
3. **Place Cards** → วางการ์ดคว่ำบนโต๊ะ
4. **Reveal Cards** → คลิกการ์ดคว่ำเพื่อเปิด

## 📁 Project Structure

```
board-game-zombie/
├── app/
│   ├── game/[id]/page.tsx      # Main game page
│   ├── lobby/                  # Lobby pages
│   └── providers/              # Context providers
├── src/
│   ├── components/             # Reusable components
│   ├── features/               # Feature-specific code
│   ├── hooks/                  # Custom hooks
│   ├── lib/                    # Utilities
│   │   ├── socket.ts          # Socket.IO utility (prepared)
│   │   └── api.ts             # API client
│   └── theme/                  # Theme configuration
├── docs/
│   ├── QUICK_START.md         # ⚡ Start here!
│   ├── GAME_FEATURES.md       # Complete feature docs
│   ├── SOCKET_SETUP.md        # Socket.IO integration
│   ├── UI_SHOWCASE.md         # UI/UX documentation
│   └── FEATURE_SUMMARY.md     # Full summary
└── public/
    └── locales/               # i18n translations
```

## 📚 Documentation

### Essential Guides
- **[Quick Start Guide](docs/QUICK_START.md)** - เริ่มต้นใช้งานเกม
- **[Game Features](docs/GAME_FEATURES.md)** - รายละเอียด features ทั้งหมด
- **[Socket.IO Setup](docs/SOCKET_SETUP.md)** - วิธีเพิ่ม real-time multiplayer
- **[UI Showcase](docs/UI_SHOWCASE.md)** - การออกแบบ UI/UX
- **[Feature Summary](docs/FEATURE_SUMMARY.md)** - สรุปทุกอย่างในที่เดียว

### Other Docs
- **[i18n Guide](docs/i18n-README.md)** - Multi-language support
- **[Fonts Guide](docs/FONTS.md)** - Typography system

## 🎯 Tech Stack

### Core
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Ant Design** - UI components
- **Tailwind CSS** - Styling

### Features
- **i18n** - Multi-language support (EN/TH)
- **Custom Theme** - Zombie-themed design
- **Responsive** - Mobile-first approach

### Future
- **Socket.IO** - Real-time communication
- **Prisma** - Database ORM
- **PostgreSQL** - Database

## 🎮 Game Mechanics

### Card Types
- **🂠 Number Cards** - A, 2-10, J, Q, K (♠♥♦♣)
- **🧟 Zombie Cards** - Infection cards
- **🔫 Gun Cards** - Weapon cards
- **💉 Vaccine Cards** - Cure cards

### Game Table Layout
```
┌─────────────────────────────────┐
│   Opponent's Placed Cards       │  ← ฝ่ายตรงข้าม
│   (Face down/Face up)           │
├─────────────────────────────────┤
│   Deck       Discard Pile       │  ← กลาง
├─────────────────────────────────┤
│   Your Placed Cards             │  ← ฝั่งของคุณ
│   (Face down/Face up)           │
└─────────────────────────────────┘
```

## 🛠️ Development

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Commands

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Lint
npm run lint
```

### Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
# Add other variables as needed
```

## 🧪 Testing

### Manual Testing
1. Open game in browser
2. Test opponent selection
3. Test card placement
4. Test card reveal
5. Test responsive design

### Multi-player Testing (with Socket.IO)
1. Open multiple browser tabs
2. Join same room
3. Test real-time sync

## 🔒 Security Notes

- Authentication not yet implemented
- Socket.IO security planned
- Input validation needed
- Rate limiting to be added

## 📊 Performance

### Optimizations
- CSS animations (GPU accelerated)
- Efficient state management
- Code splitting
- Image optimization

### Metrics
- Bundle size: ~500KB (gzipped)
- First load: < 3s
- Interaction ready: < 1s

## 🌐 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📝 License

[Add your license here]

## 🎯 Roadmap

### Phase 1: Core Game ✅
- [x] Opponent selection
- [x] Card placement system
- [x] Card reveal system
- [x] UI/UX design
- [x] Responsive layout
- [x] Documentation

### Phase 2: Real-time 🔄
- [ ] Socket.IO integration
- [ ] Multi-player support
- [ ] Room management
- [ ] Player authentication

### Phase 3: Game Rules 📋
- [ ] Turn-based system
- [ ] Card validation
- [ ] Win/lose conditions
- [ ] Score tracking

### Phase 4: Enhancement ✨
- [ ] Sound effects
- [ ] Advanced animations
- [ ] Chat system
- [ ] Leaderboards

## 🐛 Known Issues

- Opponent actions are simulated (need Socket.IO)
- No game rules validation yet
- No persistence (refresh loses state)
- Limited error handling

## 📞 Support

For questions or issues:
- Check [documentation](docs/)
- Review code comments
- Open GitHub issue

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

**Made with ❤️ and 🧟**
