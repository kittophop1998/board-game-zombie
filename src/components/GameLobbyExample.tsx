// Example usage in a React component
import React, { useState } from 'react';
import { useGames, useGameRooms, useFileUpload } from '../hooks/useApi';
import { CreateGameRequest, JoinGameRequest } from '../features/lobby/services/gameService';

const GameLobbyExample: React.FC = () => {
  const { games, loading: gamesLoading, error: gamesError, createGame } = useGames();
  const { rooms, loading: roomsLoading, error: roomsError, joinRoom } = useGameRooms();
  const { uploading, progress, uploadFile } = useFileUpload();

  const [newGameData, setNewGameData] = useState<CreateGameRequest>({
    name: '',
    description: '',
    maxPlayers: 4,
    settings: {
      maxPlayers: 4,
      difficulty: 'normal',
    }
  });

  const handleCreateGame = async () => {
    try {
      await createGame(newGameData);
      alert('เกมถูกสร้างเรียบร้อยแล้ว!');
      // Reset form
      setNewGameData({
        name: '',
        description: '',
        maxPlayers: 4,
        settings: {
          maxPlayers: 4,
          difficulty: 'normal',
        }
      });
    } catch {
      alert('เกิดข้อผิดพลาดในการสร้างเกม');
    }
  };

  const handleJoinRoom = async (roomId: string) => {
    const playerData: JoinGameRequest = {
      playerId: 'current-player-id', // ควรได้มาจาก auth context
      playerName: 'Player Name', // ควรได้มาจาก user profile
    };

    try {
      await joinRoom(roomId, playerData);
      alert('เข้าร่วมห้องเรียบร้อยแล้ว!');
    } catch {
      alert('ไม่สามารถเข้าร่วมห้องได้');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const result = await uploadFile(file);
        alert(`อัปโหลดไฟล์เรียบร้อย: ${result.avatarUrl}`);
      } catch {
        alert('เกิดข้อผิดพลาดในการอัปโหลดไฟล์');
      }
    }
  };

  if (gamesLoading || roomsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">กำลังโหลด...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">ห้องรอเกม Zombie</h1>

      {/* Create Game Form */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">สร้างเกมใหม่</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="ชื่อเกม"
            value={newGameData.name}
            onChange={(e) => setNewGameData(prev => ({ ...prev, name: e.target.value }))}
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="คำอธิบาย"
            value={newGameData.description || ''}
            onChange={(e) => setNewGameData(prev => ({ ...prev, description: e.target.value }))}
            className="border rounded px-3 py-2"
          />
          <select
            value={newGameData.maxPlayers}
            onChange={(e) => setNewGameData(prev => ({ 
              ...prev, 
              maxPlayers: Number(e.target.value),
              settings: { ...prev.settings, maxPlayers: Number(e.target.value) }
            }))}
            className="border rounded px-3 py-2"
          >
            <option value={2}>2 ผู้เล่น</option>
            <option value={4}>4 ผู้เล่น</option>
            <option value={6}>6 ผู้เล่น</option>
            <option value={8}>8 ผู้เล่น</option>
          </select>
          <select
            value={newGameData.settings.difficulty}
            onChange={(e) => setNewGameData(prev => ({ 
              ...prev, 
              settings: { ...prev.settings, difficulty: e.target.value as 'easy' | 'normal' | 'hard' }
            }))}
            className="border rounded px-3 py-2"
          >
            <option value="easy">ง่าย</option>
            <option value="normal">ปกติ</option>
            <option value="hard">ยาก</option>
          </select>
        </div>
        <button
          onClick={handleCreateGame}
          disabled={!newGameData.name}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          สร้างเกม
        </button>
        {gamesError && (
          <div className="mt-2 text-red-500 text-sm">{gamesError}</div>
        )}
      </div>

      {/* File Upload Example */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">อัปโหลดอวตาร</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
          className="border rounded px-3 py-2"
        />
        {uploading && (
          <div className="mt-2">
            <div className="text-sm text-gray-600">กำลังอัปโหลด... {progress}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Games List */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">เกมที่มีอยู่</h2>
        {games.length === 0 ? (
          <p className="text-gray-500">ไม่มีเกมในขณะนี้</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {games.map((game) => (
              <div key={game.id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-semibold text-lg">{game.name}</h3>
                <p className="text-gray-600 text-sm">{game.description}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    ผู้เล่น: {game.currentPlayers}/{game.maxPlayers}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    game.status === 'waiting' ? 'bg-yellow-200 text-yellow-800' :
                    game.status === 'in-progress' ? 'bg-green-200 text-green-800' :
                    'bg-gray-200 text-gray-800'
                  }`}>
                    {game.status === 'waiting' ? 'รอผู้เล่น' :
                     game.status === 'in-progress' ? 'กำลังเล่น' : 'เสร็จสิ้น'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rooms List */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">ห้องเกม</h2>
        {rooms.length === 0 ? (
          <p className="text-gray-500">ไม่มีห้องเกมในขณะนี้</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rooms.map((room) => (
              <div key={room.id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-semibold">ห้อง {room.id}</h3>
                <p className="text-sm text-gray-600">
                  ผู้เล่น: {room.players.length}/{room.settings.maxPlayers}
                </p>
                <p className="text-sm text-gray-600">
                  ระดับความยาก: {room.settings.difficulty}
                </p>
                <div className="mt-2 flex justify-between items-center">
                  <span className={`px-2 py-1 rounded text-xs ${
                    room.status === 'open' ? 'bg-green-200 text-green-800' :
                    room.status === 'full' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-red-200 text-red-800'
                  }`}>
                    {room.status === 'open' ? 'เปิด' :
                     room.status === 'full' ? 'เต็ม' : 'กำลังเล่น'}
                  </span>
                  <button
                    onClick={() => handleJoinRoom(room.id)}
                    disabled={room.status !== 'open'}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 disabled:bg-gray-300"
                  >
                    เข้าร่วม
                  </button>
                </div>
                {roomsError && (
                  <div className="mt-2 text-red-500 text-sm">{roomsError}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameLobbyExample;