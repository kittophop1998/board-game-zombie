import ApiService, { ApiResponse } from '../../../lib/api';
import { AxiosProgressEvent } from 'axios';

// Types for game-related API responses
export interface Game {
    id: string;
    name: string;
    description: string;
    maxPlayers: number;
    currentPlayers: number;
    status: 'waiting' | 'in-progress' | 'completed';
    createdAt: string;
    createdBy: string;
}

export interface GameRoom {
    id: string;
    gameId: string;
    players: Player[];
    settings: GameSettings;
    status: 'open' | 'full' | 'in-progress';
}

export interface Player {
    id: string;
    name: string;
    avatar?: string;
    isReady: boolean;
    isHost: boolean;
}

export interface GameSettings {
    maxPlayers: number;
    difficulty: 'easy' | 'normal' | 'hard';
    timeLimit?: number;
}

export interface CreateGameRequest {
    name: string;
    description?: string;
    maxPlayers: number;
    settings: GameSettings;
}

export interface JoinGameRequest {
    playerId: string;
    playerName: string;
}

// Game Service Class
class GameService {
    // Get all available games
    static async getGames(): Promise<ApiResponse<Game[]>> {
        return ApiService.get<Game[]>('/games');
    }

    // Get specific game by ID
    static async getGameById(gameId: string): Promise<ApiResponse<Game>> {
        return ApiService.get<Game>(`/games/${gameId}`);
    }

    // Create new game
    static async createGame(gameData: CreateGameRequest): Promise<ApiResponse<Game>> {
        return ApiService.post<Game>('/games', gameData);
    }

    // Update game
    static async updateGame(gameId: string, gameData: Partial<CreateGameRequest>): Promise<ApiResponse<Game>> {
        return ApiService.put<Game>(`/games/${gameId}`, gameData);
    }

    // Delete game
    static async deleteGame(gameId: string): Promise<ApiResponse<void>> {
        return ApiService.delete<void>(`/games/${gameId}`);
    }

    // Get game rooms
    static async getGameRooms(gameId?: string): Promise<ApiResponse<GameRoom[]>> {
        const url = gameId ? `/rooms?gameId=${gameId}` : '/rooms';
        return ApiService.get<GameRoom[]>(url);
    }

    // Get specific room by ID
    static async getRoomById(roomId: string): Promise<ApiResponse<GameRoom>> {
        return ApiService.get<GameRoom>(`/rooms/${roomId}`);
    }

    // Create new game room
    static async createGameRoom(gameId: string, settings: GameSettings): Promise<ApiResponse<GameRoom>> {
        return ApiService.post<GameRoom>('/rooms', { gameId, settings });
    }

    // Join game room
    static async joinRoom(roomId: string, playerData: JoinGameRequest): Promise<ApiResponse<GameRoom>> {
        return ApiService.post<GameRoom>(`/rooms/${roomId}/join`, playerData);
    }

    // Leave game room
    static async leaveRoom(roomId: string, playerId: string): Promise<ApiResponse<void>> {
        return ApiService.post<void>(`/rooms/${roomId}/leave`, { playerId });
    }

    // Update player ready status
    static async updatePlayerReady(roomId: string, playerId: string, isReady: boolean): Promise<ApiResponse<GameRoom>> {
        return ApiService.patch<GameRoom>(`/rooms/${roomId}/players/${playerId}`, { isReady });
    }

    // Start game
    static async startGame(roomId: string): Promise<ApiResponse<void>> {
        return ApiService.post<void>(`/rooms/${roomId}/start`);
    }

    // Get player statistics
    static async getPlayerStats(playerId: string): Promise<ApiResponse<PlayerStats>> {
        return ApiService.get<PlayerStats>(`/players/${playerId}/stats`);
    }

    // Upload player avatar
    static async uploadPlayerAvatar(
        playerId: string,
        avatarFile: File,
        onProgress?: (progress: number) => void
    ): Promise<ApiResponse<{ avatarUrl: string }>> {
        return ApiService.uploadFile<{ avatarUrl: string }>(
            `/players/${playerId}/avatar`,
            avatarFile,
            (progressEvent: AxiosProgressEvent) => {
                const progress = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
                onProgress?.(progress);
            }
        );
    }
}

// Additional types
export interface PlayerStats {
    gamesPlayed: number;
    gamesWon: number;
    winRate: number;
    averageScore: number;
    achievements: Achievement[];
}

export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    unlockedAt: string;
}

export default GameService;