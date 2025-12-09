# Socket.IO Integration Guide

## 📡 Real-time Game Communication

เอกสารนี้อธิบายวิธีการเพิ่ม Socket.IO เพื่อทำให้เกมเป็น real-time

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Client-side (Next.js)
npm install socket.io-client

# Server-side (if creating separate server)
npm install socket.io express cors
```

### 2. Setup Server

#### Option A: Standalone Server

สร้างไฟล์ `server/socket-server.js`:

```javascript
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Store game rooms
const gameRooms = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join room
  socket.on('joinRoom', ({ roomId, playerId, playerName }) => {
    socket.join(roomId);
    
    if (!gameRooms.has(roomId)) {
      gameRooms.set(roomId, {
        players: [],
        placedCards: []
      });
    }
    
    const room = gameRooms.get(roomId);
    room.players.push({ id: playerId, name: playerName, socketId: socket.id });
    
    // Notify others
    socket.to(roomId).emit('playerJoined', { playerId, playerName });
    
    // Send current game state to new player
    socket.emit('gameStateUpdate', room);
    
    console.log(`${playerName} joined room ${roomId}`);
  });

  // Leave room
  socket.on('leaveRoom', ({ roomId, playerId }) => {
    socket.leave(roomId);
    
    const room = gameRooms.get(roomId);
    if (room) {
      room.players = room.players.filter(p => p.id !== playerId);
      socket.to(roomId).emit('playerLeft', { playerId });
    }
  });

  // Place cards
  socket.on('placeCards', ({ roomId, cards, playerId }) => {
    const room = gameRooms.get(roomId);
    if (room) {
      room.placedCards.push(...cards);
      
      // Broadcast to all in room except sender
      socket.to(roomId).emit('cardPlaced', { cards, playerId });
    }
  });

  // Reveal card
  socket.on('revealCard', ({ roomId, cardId, playerId }) => {
    const room = gameRooms.get(roomId);
    if (room) {
      const card = room.placedCards.find(c => c.id === cardId);
      if (card) {
        card.isRevealed = true;
        
        // Broadcast to all in room
        io.to(roomId).emit('cardRevealed', { cardId, card, playerId });
      }
    }
  });

  // Select opponent
  socket.on('selectOpponent', ({ roomId, opponentId, playerId }) => {
    socket.to(roomId).emit('opponentSelected', { opponentId, playerId });
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    // Clean up player from all rooms
    gameRooms.forEach((room, roomId) => {
      const player = room.players.find(p => p.socketId === socket.id);
      if (player) {
        room.players = room.players.filter(p => p.socketId !== socket.id);
        io.to(roomId).emit('playerLeft', { playerId: player.id });
      }
    });
  });
});

const PORT = process.env.SOCKET_PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`✅ Socket.IO server running on port ${PORT}`);
});
```

#### Run the server:

```bash
node server/socket-server.js
```

### 3. Update Client Code

#### Enable Socket.IO in `src/lib/socket.ts`

ลบ comment ออกและ enable โค้ดจริง:

```typescript
import { io, Socket } from 'socket.io-client';

// ... (uncomment all the code in the file)

export const initSocket = (serverUrl: string = 'http://localhost:3001'): Socket => {
  if (!socket) {
    socket = io(serverUrl, {
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    });
    // ... rest of the code
  }
  return socket;
};
```

#### Update `app/game/[id]/page.tsx`

1. **Import Socket utilities**:
```typescript
import { initSocket, disconnectSocket, getSocket } from '@/lib/socket';
```

2. **Initialize Socket in useEffect**:
```typescript
useEffect(() => {
  console.log('Game started for Room ID:', roomId);
  
  // Initialize Socket.IO
  const socket = initSocket('http://localhost:3001');
  
  if (socket) {
    // Join room
    socket.emit('joinRoom', { 
      roomId, 
      playerId: 'current-player-id', // Replace with actual player ID
      playerName: 'Player Name' // Replace with actual player name
    });
    
    // Listen for opponent card placement
    socket.on('cardPlaced', (data) => {
      setGameState(prev => ({
        ...prev,
        opponentPlacedCards: [...prev.opponentPlacedCards, ...data.cards]
      }));
      message.info('Opponent placed cards on the table!');
    });
    
    // Listen for card reveal
    socket.on('cardRevealed', (data) => {
      if (data.playerId !== 'current-player-id') {
        setGameState(prev => ({
          ...prev,
          opponentPlacedCards: prev.opponentPlacedCards.map(pc =>
            pc.id === data.cardId ? { ...pc, isRevealed: true, card: data.card } : pc
          )
        }));
        message.info('Opponent revealed a card!');
      }
    });
    
    // Listen for game state updates
    socket.on('gameStateUpdate', (data) => {
      console.log('Game state updated:', data);
    });
  }
  
  // Cleanup
  return () => {
    if (socket) {
      socket.emit('leaveRoom', { roomId, playerId: 'current-player-id' });
      disconnectSocket();
    }
  };
}, [roomId]);
```

3. **Update handlePlaceCards**:
```typescript
const handlePlaceCards = () => {
  // ... existing code ...
  
  // Remove simulation
  // setTimeout(() => simulateOpponentPlaceCards(), 2000);
  
  // Emit to Socket.IO
  const socket = getSocket();
  if (socket) {
    socket.emit('placeCards', { 
      roomId, 
      cards: placedCards,
      playerId: 'current-player-id'
    });
  }
};
```

4. **Update handleRevealCard**:
```typescript
const handleRevealCard = (placedCardId: string, isMyCard: boolean) => {
  if (isMyCard) {
    setGameState(prev => ({
      ...prev,
      myPlacedCards: prev.myPlacedCards.map(pc =>
        pc.id === placedCardId ? { ...pc, isRevealed: true } : pc
      )
    }));
    
    // Emit to Socket.IO
    const socket = getSocket();
    if (socket) {
      socket.emit('revealCard', { 
        roomId, 
        cardId: placedCardId,
        playerId: 'current-player-id'
      });
    }
    
    message.success('Card revealed!');
  }
};
```

5. **Remove simulateOpponentPlaceCards**:
ลบฟังก์ชันนี้ออกทั้งหมด เพราะจะใช้ Socket.IO events แทน

### 4. Environment Variables

สร้างไฟล์ `.env.local`:

```env
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

Update socket initialization:

```typescript
const socket = initSocket(process.env.NEXT_PUBLIC_SOCKET_URL);
```

## 🧪 Testing

### Test Scenarios

1. **Multi-tab Testing**
   - เปิด 2 tabs ในเบราว์เซอร์
   - เข้าห้องเดียวกัน
   - ทดสอบวางการ์ดและเปิดการ์ด

2. **Cross-browser Testing**
   - เปิดคนละเบราว์เซอร์
   - ทดสอบ real-time sync

3. **Network Testing**
   - ทดสอบขาดการเชื่อมต่อ
   - ทดสอบ reconnection

### Debug Mode

เปิด debug logs:

```typescript
const socket = io(serverUrl, {
  // ... other options
  debug: true,
  autoConnect: true
});

socket.onAny((event, ...args) => {
  console.log('📡 Socket Event:', event, args);
});
```

## 🔒 Security Considerations

### Authentication

เพิ่ม authentication:

```typescript
const socket = io(serverUrl, {
  auth: {
    token: 'user-jwt-token'
  }
});

// Server-side
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  // Verify token
  if (isValidToken(token)) {
    next();
  } else {
    next(new Error('Authentication error'));
  }
});
```

### Room Validation

```javascript
socket.on('joinRoom', ({ roomId, playerId }) => {
  // Validate room exists
  // Check player permissions
  // Verify game state
});
```

## 📊 Performance Optimization

### 1. Event Throttling

```typescript
import { throttle } from 'lodash';

const emitCardMove = throttle((data) => {
  socket.emit('cardMoved', data);
}, 100);
```

### 2. Connection Pooling

```typescript
const maxConnections = 1000;
io.setMaxListeners(maxConnections);
```

### 3. Room Cleanup

```javascript
// Cleanup empty rooms
setInterval(() => {
  gameRooms.forEach((room, roomId) => {
    if (room.players.length === 0) {
      gameRooms.delete(roomId);
      console.log(`Cleaned up empty room: ${roomId}`);
    }
  });
}, 60000); // Every minute
```

## 🐛 Troubleshooting

### Common Issues

#### 1. CORS Error

```javascript
// Server
const io = new Server(httpServer, {
  cors: {
    origin: "*", // or specific domain
    methods: ["GET", "POST"]
  }
});
```

#### 2. Connection Timeout

```typescript
// Client
const socket = io(serverUrl, {
  timeout: 10000,
  reconnectionAttempts: 5
});
```

#### 3. Events Not Received

- ตรวจสอบว่า emit และ on ใช้ event name เดียวกัน
- ตรวจสอบว่าอยู่ใน room เดียวกัน
- ตรวจสอบ server logs

## 📚 Additional Resources

- [Socket.IO Documentation](https://socket.io/docs/)
- [Socket.IO Client API](https://socket.io/docs/v4/client-api/)
- [Socket.IO Server API](https://socket.io/docs/v4/server-api/)

## 🎯 Next Steps

After implementing Socket.IO:

1. ✅ Real-time card placement
2. ✅ Real-time card reveal
3. 📋 Add turn-based system
4. 📋 Add game state validation
5. 📋 Add reconnection handling
6. 📋 Add spectator mode
7. 📋 Add chat feature
