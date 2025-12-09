"use client";

import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Avatar, Space, Row, Col, Typography, Modal, message } from 'antd';
import { HeartOutlined, ThunderboltOutlined, EyeOutlined } from '@ant-design/icons';
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

interface PlacedCard {
    id: string;
    card: GameCard;
    isRevealed: boolean;
    playerId: string;
}

interface GameState {
    currentPlayer: string;
    players: Player[];
    deckCount: number;
    discardCount: number;
    playerHand: GameCard[];
    isAnimating: boolean;
    gameStarted: boolean;
    selectedOpponent: string | null;
    myPlacedCards: PlacedCard[];
    opponentPlacedCards: PlacedCard[];
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
        isAnimating: false,
        gameStarted: false,
        selectedOpponent: null,
        myPlacedCards: [],
        opponentPlacedCards: []
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
        
        // TODO: Socket.IO connection setup
        // const socket = io('your-socket-server-url');
        // socket.emit('joinRoom', { roomId, playerId: 'current-player-id' });
        // socket.on('cardPlaced', handleOpponentCardPlaced);
        // socket.on('cardRevealed', handleOpponentCardRevealed);
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

    // Handle opponent selection
    const handleSelectOpponent = (opponentId: string) => {
        setGameState(prev => ({
            ...prev,
            selectedOpponent: opponentId,
            gameStarted: true
        }));
        message.success('Game started! Select cards and place them on the table.');
    };

    // Handle placing cards on table (face down)
    const handlePlaceCards = () => {
        if (selectedCards.length === 0) {
            message.warning('Please select at least one card to place.');
            return;
        }

        const cardsToPlace = gameState.playerHand.filter(card => 
            selectedCards.includes(card.id)
        );

        const placedCards: PlacedCard[] = cardsToPlace.map(card => ({
            id: `placed-${Date.now()}-${card.id}`,
            card,
            isRevealed: false,
            playerId: 'me'
        }));

        setGameState(prev => ({
            ...prev,
            myPlacedCards: [...prev.myPlacedCards, ...placedCards],
            playerHand: prev.playerHand.filter(card => !selectedCards.includes(card.id)),
            isAnimating: true
        }));

        setSelectedCards([]);

        // Simulate animation completion
        setTimeout(() => {
            setGameState(prev => ({ ...prev, isAnimating: false }));
            message.success('Cards placed on the table (face down)');
            
            // TODO: Socket.IO emit
            // socket.emit('placeCards', { roomId, cards: placedCards });
        }, 500);

        // Simulate opponent placing cards (for demo)
        setTimeout(() => {
            simulateOpponentPlaceCards();
        }, 2000);
    };

    // Simulate opponent placing cards (will be replaced by Socket.IO)
    const simulateOpponentPlaceCards = () => {
        const mockOpponentCards: PlacedCard[] = [
            {
                id: `opp-placed-${Date.now()}-1`,
                card: { id: 'opp-1', type: 'number', value: '5', suit: '♠' },
                isRevealed: false,
                playerId: gameState.selectedOpponent || '1'
            },
            {
                id: `opp-placed-${Date.now()}-2`,
                card: { id: 'opp-2', type: 'zombie' },
                isRevealed: false,
                playerId: gameState.selectedOpponent || '1'
            }
        ];

        setGameState(prev => ({
            ...prev,
            opponentPlacedCards: [...prev.opponentPlacedCards, ...mockOpponentCards]
        }));

        message.info('Opponent placed cards on the table!');
        
        // TODO: This will be handled by Socket.IO listener
        // socket.on('cardPlaced', (data) => { ... });
    };

    // Handle revealing a card (flip it)
    const handleRevealCard = (placedCardId: string, isMyCard: boolean) => {
        if (isMyCard) {
            setGameState(prev => ({
                ...prev,
                myPlacedCards: prev.myPlacedCards.map(pc =>
                    pc.id === placedCardId ? { ...pc, isRevealed: true } : pc
                )
            }));
            message.success('Card revealed!');
            
            // TODO: Socket.IO emit
            // socket.emit('revealCard', { roomId, cardId: placedCardId });
        } else {
            setGameState(prev => ({
                ...prev,
                opponentPlacedCards: prev.opponentPlacedCards.map(pc =>
                    pc.id === placedCardId ? { ...pc, isRevealed: true } : pc
                )
            }));
            message.info('Opponent card revealed!');
        }
    };

    // Render placed card (face down or face up)
    const renderPlacedCard = (placedCard: PlacedCard, isMyCard: boolean) => {
        if (!placedCard.isRevealed) {
            // Face down card
            return (
                <Card
                    key={placedCard.id}
                    size="small"
                    onClick={() => handleRevealCard(placedCard.id, isMyCard)}
                    className="card-item card-face-down animate-place cursor-pointer hover:shadow-lg transition-all"
                    style={{
                        width: isMobile ? 50 : 70,
                        height: isMobile ? 70 : 100,
                        minWidth: isMobile ? 50 : 70,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderColor: '#667eea'
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
                    <div style={{ color: 'white', fontSize: isMobile ? '20px' : '30px' }}>
                        🂠
                    </div>
                    <div style={{ color: 'white', fontSize: '10px', marginTop: '4px' }}>
                        <EyeOutlined />
                    </div>
                </Card>
            );
        } else {
            // Face up card (revealed) - with flip animation
            return (
                <div key={placedCard.id} className="animate-flip">
                    {renderCard(placedCard.card, false)}
                </div>
            );
        }
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
                {/* Opponent Selection Modal */}
                <Modal
                    title="Select Your Opponent"
                    open={!gameState.gameStarted && !gameState.selectedOpponent}
                    footer={null}
                    closable={false}
                    centered
                >
                    <div className="space-y-3">
                        <Text>Choose who you want to play against:</Text>
                        {gameState.players.map((player) => {
                            const { color, icon } = getStatusBadge(player.status, player.hasGun);
                            return (
                                <Button
                                    key={player.id}
                                    block
                                    size="large"
                                    onClick={() => handleSelectOpponent(player.id)}
                                    className="flex items-center justify-start gap-2"
                                >
                                    <span style={{ fontSize: '24px' }}>{player.avatar}</span>
                                    <span>{player.name}</span>
                                    <Badge count={icon} style={{ backgroundColor: color }} />
                                </Button>
                            );
                        })}
                    </div>
                </Modal>

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
                    <Title level={5} className="text-white mb-3">
                        Opponent: {gameState.selectedOpponent && gameState.players.find(p => p.id === gameState.selectedOpponent)?.name}
                    </Title>
                    <Space direction="vertical" className="w-full">
                        {gameState.players
                            .filter(p => p.id === gameState.selectedOpponent)
                            .map((player) => {
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

                {/* Table Area with Placed Cards */}
                <Card className="mb-4 bg-gray-800 border-gray-600">
                    <Title level={5} className="text-white mb-3 text-center">TABLE AREA</Title>
                    
                    {/* Opponent's Placed Cards */}
                    <div className="mb-4 p-3 bg-gray-700 rounded">
                        <Text className="text-white mb-2 block">Opponent&apos;s Cards:</Text>
                        <div className="flex flex-wrap gap-2 justify-center min-h-[80px]">
                            {gameState.opponentPlacedCards.length === 0 ? (
                                <Text className="text-gray-400 italic">No cards placed yet</Text>
                            ) : (
                                gameState.opponentPlacedCards.map(placedCard => 
                                    renderPlacedCard(placedCard, false)
                                )
                            )}
                        </div>
                    </div>

                    {/* Deck and Discard */}
                    <div className="flex justify-center gap-8 py-3 border-y border-gray-600">
                        <div className="text-center">
                            <div className="text-2xl mb-1">🧠</div>
                            <Text className="text-white">Deck [{gameState.deckCount}]</Text>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl mb-1">🧟‍♂️</div>
                            <Text className="text-white">Discard [{gameState.discardCount}]</Text>
                        </div>
                    </div>

                    {/* My Placed Cards */}
                    <div className="mt-4 p-3 bg-blue-900 bg-opacity-30 rounded">
                        <Text className="text-white mb-2 block">Your Placed Cards:</Text>
                        <div className="flex flex-wrap gap-2 justify-center min-h-[80px]">
                            {gameState.myPlacedCards.length === 0 ? (
                                <Text className="text-gray-400 italic">No cards placed yet</Text>
                            ) : (
                                gameState.myPlacedCards.map(placedCard => 
                                    renderPlacedCard(placedCard, true)
                                )
                            )}
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
                        onClick={handlePlaceCards}
                        disabled={selectedCards.length === 0 || gameState.isAnimating || !gameState.gameStarted}
                        loading={gameState.isAnimating}
                    >
                        Place Selected Cards on Table ({selectedCards.length})
                    </Button>

                    <Button
                        size="large"
                        block
                        onClick={handlePlayCards}
                        disabled={selectedCards.length === 0 || gameState.isAnimating}
                        loading={gameState.isAnimating}
                    >
                        Play to Discard ({selectedCards.length})
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
                {/* Opponent Selection Modal */}
                <Modal
                    title="Select Your Opponent"
                    open={!gameState.gameStarted && !gameState.selectedOpponent}
                    footer={null}
                    closable={false}
                    centered
                    width={600}
                >
                    <div className="space-y-3">
                        <Text className="text-lg">Choose who you want to play against:</Text>
                        <Row gutter={[16, 16]}>
                            {gameState.players.map((player) => {
                                const { color, icon } = getStatusBadge(player.status, player.hasGun);
                                return (
                                    <Col span={12} key={player.id}>
                                        <Button
                                            block
                                            size="large"
                                            onClick={() => handleSelectOpponent(player.id)}
                                            className="h-24 flex flex-col items-center justify-center gap-2"
                                        >
                                            <span style={{ fontSize: '32px' }}>{player.avatar}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold">{player.name}</span>
                                                <Badge count={icon} style={{ backgroundColor: color }} />
                                            </div>
                                        </Button>
                                    </Col>
                                );
                            })}
                        </Row>
                    </div>
                </Modal>

                {/* Game Header */}
                <Card className="mb-4 bg-gray-800 border-gray-600">
                    <Row justify="space-between" align="middle">
                        <Col flex="auto">
                            <Title level={3} className="text-white text-center mb-1">
                                Room #{roomId} - 🧟 Zombie Game
                            </Title>
                            <Title level={4} className="text-white text-center mb-0">
                                Turn: {gameState.currentPlayer} 🧑 (Human)
                                {gameState.selectedOpponent && ` vs ${gameState.players.find(p => p.id === gameState.selectedOpponent)?.name}`}
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
                {gameState.selectedOpponent && (
                    <Card className="mb-4 bg-gray-800 border-gray-600">
                        <Title level={4} className="text-white mb-4">Playing Against:</Title>
                        <Row gutter={16}>
                            {gameState.players
                                .filter(p => p.id === gameState.selectedOpponent)
                                .map((player) => {
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
                )}

                {/* Table Area with Placed Cards */}
                <Card className="mb-4 bg-gray-800 border-gray-600">
                    <Title level={4} className="text-white text-center mb-6">TABLE AREA</Title>
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 min-h-[400px]">
                        
                        {/* Opponent's Placed Cards */}
                        <div className="mb-6 p-4 bg-gray-700 rounded-lg">
                            <Title level={5} className="text-white mb-3">Opponent&apos;s Cards:</Title>
                            <div className="flex flex-wrap gap-3 justify-center min-h-[120px] items-center">
                                {gameState.opponentPlacedCards.length === 0 ? (
                                    <Text className="text-gray-400 italic">Waiting for opponent to place cards...</Text>
                                ) : (
                                    gameState.opponentPlacedCards.map(placedCard => 
                                        renderPlacedCard(placedCard, false)
                                    )
                                )}
                            </div>
                        </div>

                        {/* Deck and Discard */}
                        <Row gutter={32} className="mb-6 py-4 border-y border-gray-600">
                            <Col span={12} className="text-center">
                                <div className="text-6xl mb-2">🧠</div>
                                <Title level={4} className="text-white">Deck [{gameState.deckCount}]</Title>
                            </Col>
                            <Col span={12} className="text-center">
                                <div className="text-6xl mb-2">🧟‍♂️</div>
                                <Title level={4} className="text-white">Discard [{gameState.discardCount}]</Title>
                            </Col>
                        </Row>

                        {/* My Placed Cards */}
                        <div className="mt-6 p-4 bg-blue-900 bg-opacity-30 rounded-lg">
                            <Title level={5} className="text-white mb-3">Your Placed Cards:</Title>
                            <div className="flex flex-wrap gap-3 justify-center min-h-[120px] items-center">
                                {gameState.myPlacedCards.length === 0 ? (
                                    <Text className="text-gray-400 italic">Select cards and place them on the table</Text>
                                ) : (
                                    gameState.myPlacedCards.map(placedCard => 
                                        renderPlacedCard(placedCard, true)
                                    )
                                )}
                            </div>
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
                        <Col xs={24} md={6}>
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
                        <Col xs={24} md={6}>
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
                        <Col xs={24} md={6}>
                            <Button
                                type="primary"
                                size="large"
                                onClick={handlePlaceCards}
                                disabled={selectedCards.length === 0 || gameState.isAnimating || !gameState.gameStarted}
                                loading={gameState.isAnimating}
                                block
                            >
                                Place on Table ({selectedCards.length})
                            </Button>
                        </Col>
                        <Col xs={24} md={6}>
                            <Button
                                size="large"
                                onClick={handlePlayCards}
                                disabled={selectedCards.length === 0 || gameState.isAnimating}
                                loading={gameState.isAnimating}
                                block
                            >
                                Play to Discard ({selectedCards.length})
                            </Button>
                        </Col>
                    </Row>
                </Card>

            </div>
        </div>
    );
}
