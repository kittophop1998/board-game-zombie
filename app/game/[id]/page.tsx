"use client";

import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Avatar, Space, Row, Col, Typography } from 'antd';
import { HeartOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useParams, useRouter } from 'next/navigation';
import '../game.css';

const { Title, Text } = Typography;

// Game state interfaces
interface Player {
    id: string;
    name: string;
    avatar: string;
    cardCount: number;
    status: 'human' | 'infected' | 'immune';
    hasGun: boolean;
}

interface GameCard {
    id: string;
    type: 'number' | 'zombie' | 'gun' | 'vaccine';
    value?: string;
    suit?: '♠' | '♥' | '♦' | '♣';
}

interface GameState {
    currentPlayer: string;
    players: Player[];
    deckCount: number;
    discardCount: number;
    playerHand: GameCard[];
    isAnimating: boolean;
}

export default function GamePage() {
    const params = useParams();
    const router = useRouter();
    const roomId = params.id as string;

    // Mock game state - in real app this would come from WebSocket/API
    const [gameState, setGameState] = useState<GameState>({
        currentPlayer: 'Alice',
        players: [
            {
                id: '1',
                name: 'Bob',
                avatar: '👩',
                cardCount: 7,
                status: 'infected',
                hasGun: false
            },
            {
                id: '2',
                name: 'Carol',
                avatar: '🧔',
                cardCount: 5,
                status: 'human',
                hasGun: true
            }
        ],
        deckCount: 17,
        discardCount: 4,
        playerHand: [
            { id: '1', type: 'number', value: '7', suit: '♥' },
            { id: '2', type: 'number', value: 'K', suit: '♠' },
            { id: '3', type: 'zombie' },
            { id: '4', type: 'gun' },
            { id: '5', type: 'number', value: '4', suit: '♦' },
            { id: '6', type: 'number', value: '3', suit: '♥' },
            { id: '7', type: 'vaccine' },
            { id: '8', type: 'number', value: 'A', suit: '♠' },
            { id: '9', type: 'number', value: '9', suit: '♣' },
            { id: '10', type: 'number', value: 'Q', suit: '♦' }
        ],
        isAnimating: false
    });

    const [selectedCards, setSelectedCards] = useState<string[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Log roomId when component mounts
    useEffect(() => {
        console.log('Game started for Room ID:', roomId);
        // Here you can add logic to:
        // 1. Connect to WebSocket for this specific room
        // 2. Load game state from API using roomId
        // 3. Initialize game data based on room settings
    }, [roomId]);

    // Get status badge color and icon
    const getStatusBadge = (status: Player['status'], hasGun: boolean) => {
        let color = '';
        let icon = '';

        switch (status) {
            case 'infected':
                color = 'red';
                icon = '🧟';
                break;
            case 'immune':
                color = 'blue';
                icon = '💉';
                break;
            default:
                color = 'green';
                icon = hasGun ? '🔫' : '💚';
        }

        return { color, icon };
    };

    // Render card component
    const renderCard = (card: GameCard, isSelected: boolean = false, onClick?: () => void) => {
        const getCardDisplay = () => {
            switch (card.type) {
                case 'zombie':
                    return { text: 'ZOMBIE', emoji: '🧟', color: '#ff4d4f' };
                case 'gun':
                    return { text: 'GUN', emoji: '🔫', color: '#fa8c16' };
                case 'vaccine':
                    return { text: 'VACCINE', emoji: '💉', color: '#1890ff' };
                default:
                    return {
                        text: `${card.suit}${card.value}`,
                        emoji: '',
                        color: card.suit === '♥' || card.suit === '♦' ? '#ff4d4f' : '#000000'
                    };
            }
        };

        const cardDisplay = getCardDisplay();

        return (
            <Card
                key={card.id}
                size="small"
                onClick={onClick}
                className={`
          card-item cursor-pointer transition-all duration-200 
          ${isSelected ? 'ring-2 ring-blue-500 transform -translate-y-2' : 'hover:transform hover:-translate-y-1'}
          ${gameState.isAnimating ? 'animate-pulse' : ''}
        `}
                style={{
                    width: isMobile ? 50 : 70,
                    height: isMobile ? 70 : 100,
                    minWidth: isMobile ? 50 : 70,
                    borderColor: isSelected ? '#1890ff' : undefined,
                    backgroundColor: isSelected ? '#f0f8ff' : undefined
                }}
                bodyStyle={{
                    padding: isMobile ? '4px' : '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%'
                }}
            >
                <div style={{ color: cardDisplay.color, fontSize: isMobile ? '10px' : '12px', fontWeight: 'bold', textAlign: 'center' }}>
                    {cardDisplay.emoji && <div style={{ fontSize: isMobile ? '16px' : '20px' }}>{cardDisplay.emoji}</div>}
                    <div>{cardDisplay.text}</div>
                </div>
            </Card>
        );
    };

    // Handle card selection
    const handleCardSelect = (cardId: string) => {
        if (gameState.isAnimating) return;

        setSelectedCards(prev => {
            if (prev.includes(cardId)) {
                return prev.filter(id => id !== cardId);
            } else {
                return [...prev, cardId];
            }
        });
    };

    // Handle playing cards
    const handlePlayCards = async () => {
        if (selectedCards.length === 0) return;

        setGameState(prev => ({ ...prev, isAnimating: true }));

        // Simulate card animation and game logic
        setTimeout(() => {
            setGameState(prev => ({
                ...prev,
                playerHand: prev.playerHand.filter(card => !selectedCards.includes(card.id)),
                discardCount: prev.discardCount + selectedCards.length,
                isAnimating: false
            }));
            setSelectedCards([]);
        }, 1000);
    };

    // Handle special actions
    const handleUseVaccine = () => {
        const vaccineCard = gameState.playerHand.find(card => card.type === 'vaccine');
        if (vaccineCard) {
            handleCardSelect(vaccineCard.id);
        }
    };

    const handleUseGun = () => {
        const gunCard = gameState.playerHand.find(card => card.type === 'gun');
        if (gunCard) {
            handleCardSelect(gunCard.id);
        }
    };

    if (isMobile) {
        // Mobile Layout (Portrait)
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4">
                {/* Game Header */}
                <Card className="mb-4 bg-gray-800 border-gray-600">
                    <div className="flex justify-between items-center">
                        <div className="text-center flex-1">
                            <Title level={4} className="text-white mb-1">
                                Room #{roomId} - 🧟 Zombie Game
                            </Title>
                            <Title level={5} className="text-white mb-0">
                                Turn: {gameState.currentPlayer} 🧑 (Human)
                            </Title>
                        </div>
                        <Button 
                            onClick={() => router.push(`/lobby/room/${roomId}`)}
                            style={{
                                background: 'rgba(255, 77, 79, 0.2)',
                                borderColor: '#ff4d4f',
                                color: '#fff'
                            }}
                        >
                            Leave Game
                        </Button>
                    </div>
                </Card>

                {/* Opponents */}
                <Card className="mb-4 bg-gray-800 border-gray-600">
                    <Title level={5} className="text-white mb-3">Opponents:</Title>
                    <Space direction="vertical" className="w-full">
                        {gameState.players.map((player) => {
                            const { color, icon } = getStatusBadge(player.status, player.hasGun);
                            return (
                                <div key={player.id} className="flex items-center justify-between">
                                    <Space>
                                        <span style={{ fontSize: '20px' }}>{player.avatar}</span>
                                        <Text className="text-white">{player.name}</Text>
                                        <Badge count={icon} style={{ backgroundColor: color }} />
                                    </Space>
                                    <Text className="text-gray-300">{player.cardCount} cards</Text>
                                </div>
                            );
                        })}
                    </Space>
                </Card>

                {/* Table Area */}
                <Card className="mb-4 bg-gray-800 border-gray-600">
                    <Title level={5} className="text-white mb-3 text-center">TABLE AREA</Title>
                    <div className="flex justify-center gap-8 py-4">
                        <div className="text-center">
                            <div className="text-2xl mb-1">🧠</div>
                            <Text className="text-white">Deck [{gameState.deckCount}]</Text>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl mb-1">🧟‍♂️</div>
                            <Text className="text-white">Discard [{gameState.discardCount}]</Text>
                        </div>
                    </div>
                </Card>

                {/* Player Hand */}
                <Card className="mb-4 bg-gray-800 border-gray-600">
                    <Title level={5} className="text-white mb-3">Your Hand:</Title>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {gameState.playerHand.map((card) =>
                            renderCard(
                                card,
                                selectedCards.includes(card.id),
                                () => handleCardSelect(card.id)
                            )
                        )}
                    </div>
                </Card>

                {/* Action Buttons */}
                <Space direction="vertical" className="w-full gap-2">
                    <Button
                        type="primary"
                        size="large"
                        block
                        onClick={handlePlayCards}
                        disabled={selectedCards.length === 0 || gameState.isAnimating}
                        loading={gameState.isAnimating}
                    >
                        Play Selected Cards ({selectedCards.length})
                    </Button>

                    <div className="flex gap-2">
                        <Button
                            size="large"
                            onClick={handleUseVaccine}
                            disabled={!gameState.playerHand.some(card => card.type === 'vaccine') || gameState.isAnimating}
                            className="flex-1"
                        >
                            💉 Use Vaccine
                        </Button>
                        <Button
                            size="large"
                            onClick={handleUseGun}
                            disabled={!gameState.playerHand.some(card => card.type === 'gun') || gameState.isAnimating}
                            className="flex-1"
                        >
                            🔫 Use Gun
                        </Button>
                    </div>
                </Space>
            </div>
        );
    }

    // Desktop Layout (Wide)
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
            <div className="max-w-7xl mx-auto">

                {/* Game Header */}
                <Card className="mb-4 bg-gray-800 border-gray-600">
                    <Row justify="space-between" align="middle">
                        <Col flex="auto">
                            <Title level={3} className="text-white text-center mb-1">
                                Room #{roomId} - 🧟 Zombie Game
                            </Title>
                            <Title level={4} className="text-white text-center mb-0">
                                Turn: {gameState.currentPlayer} 🧑 (Human)
                            </Title>
                        </Col>
                        <Col>
                            <Button 
                                onClick={() => router.push(`/lobby/room/${roomId}`)}
                                style={{
                                    background: 'rgba(255, 77, 79, 0.2)',
                                    borderColor: '#ff4d4f',
                                    color: '#fff'
                                }}
                            >
                                Leave Game
                            </Button>
                        </Col>
                    </Row>
                </Card>

                {/* Opponents Section */}
                <Card className="mb-4 bg-gray-800 border-gray-600">
                    <Title level={4} className="text-white mb-4">Opponents:</Title>
                    <Row gutter={16}>
                        {gameState.players.map((player) => {
                            const { color, icon } = getStatusBadge(player.status, player.hasGun);
                            return (
                                <Col key={player.id} xs={24} md={12} lg={8} className="mb-3">
                                    <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                                        <Avatar size={48} style={{ backgroundColor: color }}>
                                            {player.avatar}
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <Text strong className="text-white">{player.name}</Text>
                                                <Badge count={icon} style={{ backgroundColor: color }} />
                                            </div>
                                            <Text className="text-gray-300">{player.cardCount} cards</Text>
                                        </div>
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>
                </Card>

                {/* Table Area */}
                <Card className="mb-4 bg-gray-800 border-gray-600">
                    <Title level={4} className="text-white text-center mb-6">TABLE AREA</Title>
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 min-h-[200px]">
                        <Row gutter={32} className="mb-6">
                            <Col span={12} className="text-center">
                                <div className="text-6xl mb-2">🧠</div>
                                <Title level={4} className="text-white">Deck [{gameState.deckCount}]</Title>
                            </Col>
                            <Col span={12} className="text-center">
                                <div className="text-6xl mb-2">🧟‍♂️</div>
                                <Title level={4} className="text-white">Discard [{gameState.discardCount}]</Title>
                            </Col>
                        </Row>

                        <div className="text-center">
                            <Text className="text-gray-400 italic">
                                {gameState.isAnimating ? '🔄 Cards are being played...' : 'Card animations happen here'}
                            </Text>
                        </div>
                    </div>
                </Card>

                {/* Player Hand */}
                <Card className="mb-4 bg-gray-800 border-gray-600">
                    <Title level={4} className="text-white mb-4">
                        Your Hand ({gameState.playerHand.length} cards):
                    </Title>
                    <div className="flex flex-wrap gap-3 justify-center">
                        {gameState.playerHand.map((card) =>
                            renderCard(
                                card,
                                selectedCards.includes(card.id),
                                () => handleCardSelect(card.id)
                            )
                        )}
                    </div>
                </Card>

                {/* Action Buttons */}
                <Card className="bg-gray-800 border-gray-600">
                    <Row gutter={16} align="middle">
                        <Col xs={24} md={8}>
                            <Button
                                size="large"
                                onClick={handleUseVaccine}
                                disabled={!gameState.playerHand.some(card => card.type === 'vaccine') || gameState.isAnimating}
                                block
                                icon={<HeartOutlined />}
                            >
                                💉 Use Vaccine
                            </Button>
                        </Col>
                        <Col xs={24} md={8}>
                            <Button
                                size="large"
                                onClick={handleUseGun}
                                disabled={!gameState.playerHand.some(card => card.type === 'gun') || gameState.isAnimating}
                                block
                                icon={<ThunderboltOutlined />}
                            >
                                🔫 Use Gun
                            </Button>
                        </Col>
                        <Col xs={24} md={8}>
                            <Button
                                type="primary"
                                size="large"
                                onClick={handlePlayCards}
                                disabled={selectedCards.length === 0 || gameState.isAnimating}
                                loading={gameState.isAnimating}
                                block
                            >
                                Play Selected Cards ({selectedCards.length})
                            </Button>
                        </Col>
                    </Row>
                </Card>

            </div>
        </div>
    );
}
