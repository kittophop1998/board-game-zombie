# API Service Documentation

## ภาพรวม
ระบบ API Service นี้ถูกสร้างขึ้นเพื่อเป็น function กลางสำหรับการเรียกใช้ API ในโปรเจค Board Game Zombie โดยใช้ axios instance พร้อมกับ interceptors และ error handling

## ไฟล์ที่สำคัญ

### 1. `src/lib/api.ts`
ไฟล์หลักที่มี axios instance และ API service methods

**Features:**
- ✅ Axios instance configuration
- ✅ Request/Response interceptors 
- ✅ Authentication token management
- ✅ Error handling และ logging
- ✅ File upload support
- ✅ TypeScript types

**Methods:**
- `ApiService.get<T>(url, config)` - GET request
- `ApiService.post<T>(url, data, config)` - POST request  
- `ApiService.put<T>(url, data, config)` - PUT request
- `ApiService.patch<T>(url, data, config)` - PATCH request
- `ApiService.delete<T>(url, config)` - DELETE request
- `ApiService.uploadFile<T>(url, file, onProgress, additionalData)` - File upload
- `ApiService.setAuthToken(token)` - Set authentication token
- `ApiService.removeAuthToken()` - Remove authentication token

### 2. `src/features/lobby/services/gameService.ts`
ตัวอย่าง service สำหรับ game-related APIs

**Methods:**
- `GameService.getGames()` - ดึงรายการเกมทั้งหมด
- `GameService.createGame(data)` - สร้างเกมใหม่
- `GameService.joinRoom(roomId, playerData)` - เข้าร่วมห้องเกม
- `GameService.uploadPlayerAvatar(playerId, file)` - อัปโหลดอวตาร

### 3. `src/hooks/useApi.ts`
React Hooks สำหรับจัดการ state และการเรียก API

**Hooks:**
- `useGames()` - จัดการ games data และ loading state
- `useGameRooms()` - จัดการ rooms data
- `useFileUpload()` - จัดการการอัปโหลดไฟล์พร้อม progress
- `useApiCall<T>()` - Generic hook สำหรับ API call ใด ๆ

### 4. `src/components/GameLobbyExample.tsx`
ตัวอย่างการใช้งาน API ใน React component

## วิธีการใช้งาน

### 1. Basic API Call
```typescript
import ApiService from '@/lib/api';

// GET request
const response = await ApiService.get<Game[]>('/games');
console.log(response.data);

// POST request
const newGame = await ApiService.post<Game>('/games', {
  name: 'Zombie Survival',
  maxPlayers: 4
});
```

### 2. Using with React Hooks
```typescript
import { useGames } from '@/hooks/useApi';

const MyComponent = () => {
  const { games, loading, error, createGame } = useGames();
  
  const handleCreate = async () => {
    try {
      await createGame({
        name: 'New Game',
        maxPlayers: 4,
        settings: { difficulty: 'normal', maxPlayers: 4 }
      });
    } catch (error) {
      console.error('Failed to create game:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {games.map(game => (
        <div key={game.id}>{game.name}</div>
      ))}
    </div>
  );
};
```

### 3. File Upload
```typescript
import { useFileUpload } from '@/hooks/useApi';

const FileUploadComponent = () => {
  const { uploading, progress, uploadFile } = useFileUpload();
  
  const handleFileSelect = async (file: File) => {
    try {
      const result = await uploadFile(file);
      console.log('Upload successful:', result);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) handleFileSelect(file);
      }} />
      {uploading && <div>Progress: {progress}%</div>}
    </div>
  );
};
```

### 4. Authentication
```typescript
import ApiService from '@/lib/api';

// Set token after login
ApiService.setAuthToken('your-jwt-token');

// Remove token on logout
ApiService.removeAuthToken();

// Check current token
const token = ApiService.getAuthToken();
```

## การตั้งค่า Environment Variables

สร้างไฟล์ `.env.local` และเพิ่ม:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

## Error Handling

API service จะ return standardized error format:

```typescript
interface ApiError {
  message: string;
  status: number;
  code?: string;
}
```

Error types:
- **Network Error** (status: 0) - ปัญหาเครือข่าย
- **401 Unauthorized** - Token หมดอายุหรือไม่ถูกต้อง (จะลบ token อัตโนมัติ)
- **Server Error** (4xx, 5xx) - Error จาก server

## Interceptors

### Request Interceptor
- เพิ่ม Authorization header อัตโนมัติ
- Log API requests
- เพิ่ม timestamp สำหรับวัดเวลา

### Response Interceptor  
- Log API responses พร้อมเวลาที่ใช้
- Handle 401 errors (logout อัตโนมัติ)
- แปลง error format

## Types

ระบบใช้ TypeScript types อย่างเต็มรูปแบบ:

```typescript
interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  status: number;
}

interface Game {
  id: string;
  name: string;
  description: string;
  maxPlayers: number;
  currentPlayers: number;
  status: 'waiting' | 'in-progress' | 'completed';
}
```

## การขยายระบบ

### เพิ่ม Service ใหม่
1. สร้างไฟล์ service ใน `src/features/[feature]/services/`
2. Import `ApiService` และใช้ methods
3. กำหนด TypeScript interfaces
4. สร้าง custom hooks ใน `src/hooks/`

### เพิ่ม Hook ใหม่
```typescript
export const useCustomFeature = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await CustomService.getData();
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchData };
};
```

## Best Practices

1. **ใช้ TypeScript types เสมอ** - ระบุ generic type ใน API calls
2. **Handle errors properly** - ใช้ try-catch และแสดง error message
3. **Use loading states** - แสดง loading indicator เมื่อเรียก API
4. **Implement retry logic** - สำหรับ API calls ที่สำคัญ
5. **Cache data เมื่อเหมาะสม** - ใช้ React Query หรือ SWR สำหรับ advanced caching
6. **Log API calls** - เพื่อ debugging (อย่าลืมปิดใน production)

## การ Debug

1. เปิด Browser DevTools Console เพื่อดู API logs
2. Check Network tab สำหรับ request/response details  
3. ใช้ `console.log` ใน interceptors เพื่อ debug
4. ตรวจสอบ localStorage สำหรับ auth token

## ตัวอย่างการใช้งานจริง

ดูไฟล์ `src/components/GameLobbyExample.tsx` สำหรับตัวอย่างที่สมบูรณ์ของการใช้งาน API ใน React component