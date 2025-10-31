import { useState, useEffect, useCallback } from 'react';
import GameService, { Game, GameRoom, CreateGameRequest, JoinGameRequest } from '../features/lobby/services/gameService';
import { ApiError, ApiResponse } from '../lib/api';

// Hook for managing game list
export const useGames = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchGames = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await GameService.getGames();
            setGames(response.data);
        } catch (err) {
            const apiError = err as ApiError;
            setError(apiError.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchGames();
    }, [fetchGames]);

    const createGame = useCallback(async (gameData: CreateGameRequest) => {
        try {
            setError(null);
            const response = await GameService.createGame(gameData);
            setGames(prevGames => [...prevGames, response.data]);
            return response.data;
        } catch (err) {
            const apiError = err as ApiError;
            setError(apiError.message);
            throw err;
        }
    }, []);

    const deleteGame = useCallback(async (gameId: string) => {
        try {
            setError(null);
            await GameService.deleteGame(gameId);
            setGames(prevGames => prevGames.filter(game => game.id !== gameId));
        } catch (err) {
            const apiError = err as ApiError;
            setError(apiError.message);
            throw err;
        }
    }, []);

    return {
        games,
        loading,
        error,
        fetchGames,
        createGame,
        deleteGame,
    };
};

// Hook for managing game rooms
export const useGameRooms = (gameId?: string) => {
    const [rooms, setRooms] = useState<GameRoom[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRooms = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await GameService.getGameRooms(gameId);
            setRooms(response.data);
        } catch (err) {
            const apiError = err as ApiError;
            setError(apiError.message);
        } finally {
            setLoading(false);
        }
    }, [gameId]);

    useEffect(() => {
        fetchRooms();
    }, [fetchRooms]);

    const joinRoom = useCallback(async (roomId: string, playerData: JoinGameRequest) => {
        try {
            setError(null);
            const response = await GameService.joinRoom(roomId, playerData);
            // Update the specific room in the list
            setRooms(prevRooms =>
                prevRooms.map(room =>
                    room.id === roomId ? response.data : room
                )
            );
            return response.data;
        } catch (err) {
            const apiError = err as ApiError;
            setError(apiError.message);
            throw err;
        }
    }, []);

    const leaveRoom = useCallback(async (roomId: string, playerId: string) => {
        try {
            setError(null);
            await GameService.leaveRoom(roomId, playerId);
            // Refresh rooms after leaving
            await fetchRooms();
        } catch (err) {
            const apiError = err as ApiError;
            setError(apiError.message);
            throw err;
        }
    }, [fetchRooms]);

    return {
        rooms,
        loading,
        error,
        fetchRooms,
        joinRoom,
        leaveRoom,
    };
};

// Hook for file upload with progress
export const useFileUpload = () => {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const uploadFile = useCallback(async (file: File) => {
        try {
            setUploading(true);
            setProgress(0);
            setError(null);

            const response = await GameService.uploadPlayerAvatar(
                'player-id', // This should be dynamic
                file,
                (progressValue) => setProgress(progressValue)
            );

            return response.data;
        } catch (err) {
            const apiError = err as ApiError;
            setError(apiError.message);
            throw err;
        } finally {
            setUploading(false);
            setProgress(0);
        }
    }, []);

    return {
        uploading,
        progress,
        error,
        uploadFile,
    };
};

// Generic API hook for any API call
export const useApiCall = <T>() => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async (apiCall: () => Promise<ApiResponse<T>>) => {
        try {
            setLoading(true);
            setError(null);
            const response = await apiCall();
            setData(response.data);
            return response.data;
        } catch (err) {
            const apiError = err as ApiError;
            setError(apiError.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setData(null);
        setError(null);
        setLoading(false);
    }, []);

    return {
        data,
        loading,
        error,
        execute,
        reset,
    };
};