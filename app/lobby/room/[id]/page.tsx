"use client";

import { Header } from "@/src/components";
import {
  Layout,
  Button,
  Card,
  Typography,
  Row,
  Col,
  ConfigProvider,
  Avatar,
  Badge,
  Divider,
  List,
  Input
} from 'antd';
import {
  CrownOutlined,
  UserOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  MessageOutlined
} from '@ant-design/icons';
import { theme } from '@/src/theme';
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';

const { Content } = Layout;
const { Title, Text } = Typography;

interface Player {
  id: string;
  name: string;
  avatar?: string;
  isHost: boolean;
  isReady: boolean;
  status: 'online' | 'offline' | 'away';
}

interface ChatMessage {
  id: string;
  playerId: string;
  playerName: string;
  message: string;
  timestamp: Date;
  type: 'chat' | 'system';
}

export default function RoomPage() {
  const router = useRouter();
  const params = useParams();
  const roomId = params.id as string;

  const [isHost] = useState(true); // Mock: current user is host
  const [gameStarted, setGameStarted] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      playerId: 'system',
      playerName: 'System',
      message: `Welcome to Room #${roomId}! Waiting for more players to join.`,
      timestamp: new Date(),
      type: 'system'
    }
  ]);

  // Mock players data
  const [players] = useState<Player[]>([
    {
      id: '1',
      name: 'Player A',
      isHost: true,
      isReady: true,
      status: 'online'
    },
    {
      id: '2',
      name: 'Player B',
      isReady: false,
      isHost: false,
      status: 'online'
    },
    {
      id: '3',
      name: 'Player C',
      isReady: true,
      isHost: false,
      status: 'online'
    },
    {
      id: '4',
      name: 'Player D',
      isReady: false,
      isHost: false,
      status: 'away'
    }
  ]);

  const canStartGame = players.length >= 2 && players.every(p => p.isReady || p.isHost);

  const handleStartGame = () => {
    console.log('Start Game clicked');
    if (canStartGame) {
      setGameStarted(true);
      // Navigate to game screen with roomId
      router.push(`/game/${roomId}`);
    } else {
      console.log('Cannot start game. Not all players are ready or insufficient players.');
    }
  };

  const handleToggleReady = () => {
    // TODO: Toggle current player's ready status
    console.log('Toggle ready status');
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        playerId: '1', // Current user
        playerName: 'You',
        message: chatMessage,
        timestamp: new Date(),
        type: 'chat'
      };
      setChatMessages([...chatMessages, newMessage]);
      setChatMessage('');
    }
  };

  const handleLeaveRoom = () => {
    router.push('/lobby');
  };

  const getPlayerStatusColor = (player: Player) => {
    if (player.status === 'offline') return '#8c8c8c';
    if (player.status === 'away') return '#faad14';
    if (player.isReady || player.isHost) return '#52c41a';
    return '#1890ff';
  };

  const getStatusText = () => {
    const readyCount = players.filter(p => p.isReady || p.isHost).length;
    if (gameStarted) return 'Game in progress...';
    if (canStartGame) return 'Ready to start!';
    return `Waiting for players... (${readyCount}/${players.length} ready)`;
  };

  return (
    <ConfigProvider theme={theme}>
      <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
        <Header />

        <Content style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          {/* Room Header */}
          <Card
            style={{
              marginBottom: '24px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Row justify="space-between" align="middle">
              <Col>
                <Title level={2} style={{ color: '#fff', margin: 0 }}>
                  Room: #{roomId}
                  <span style={{ marginLeft: '16px', fontSize: '16px', color: '#b37feb' }}>
                    🧟 Zombie Board Game
                  </span>
                </Title>
              </Col>
              <Col>
                <Button
                  onClick={handleLeaveRoom}
                  style={{
                    background: 'rgba(255, 77, 79, 0.2)',
                    borderColor: '#ff4d4f',
                    color: '#fff'
                  }}
                >
                  Leave Room
                </Button>
              </Col>
            </Row>
          </Card>

          {/* Players Section */}
          <Card
            title={
              <span style={{ color: '#fff', fontSize: '18px' }}>
                Players ({players.length}/4)
              </span>
            }
            style={{
              marginBottom: '24px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
            headStyle={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Players Circle */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px',
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                gap: '20px',
                justifyContent: 'center',
                width: '100%',
                maxWidth: '400px',
              }}>
                {players.map(player => (
                  <div
                    key={player.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Badge
                      dot={player.status === 'online'}
                      status={player.status === 'online' ? 'success' : player.status === 'away' ? 'warning' : 'default'}
                      offset={[-8, 8]}
                    >
                      <Avatar
                        size={64}
                        icon={<UserOutlined />}
                        style={{
                          backgroundColor: getPlayerStatusColor(player),
                          border: `3px solid ${player.isHost ? '#faad14' : player.isReady ? '#52c41a' : '#1890ff'}`,
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                        }}
                      />
                    </Badge>

                    <Text style={{ color: '#fff', fontSize: '12px' }}>
                      {player.name}
                      {player.isHost && (
                        <CrownOutlined style={{ marginLeft: '4px', color: '#faad14' }} />
                      )}
                    </Text>

                    {!player.isHost && (
                      <Badge
                        status={player.isReady ? 'success' : 'processing'}
                        text={
                          <span style={{ color: player.isReady ? '#52c41a' : '#faad14', fontSize: '11px' }}>
                            {player.isReady ? 'Ready' : 'Not Ready'}
                          </span>
                        }
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>


            {/* Status and Actions */}
            <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />

            <Row justify="center" align="middle" style={{ marginBottom: '16px' }}>
              <Text style={{
                color: '#fff',
                fontSize: '16px',
                textAlign: 'center'
              }}>
                Status: {getStatusText()}
              </Text>
            </Row>

            <Row justify="center" gutter={16}>
              {isHost ? (
                <Col>
                  <Button
                    type="primary"
                    size="large"
                    icon={<PlayCircleOutlined />}
                    onClick={handleStartGame}
                    disabled={!canStartGame}
                    style={{
                      background: canStartGame ? '#52c41a' : '#8c8c8c',
                      borderColor: canStartGame ? '#52c41a' : '#8c8c8c',
                      height: '48px',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}
                  >
                    Start Game
                  </Button>
                </Col>
              ) : (
                <Col>
                  <Button
                    type="primary"
                    size="large"
                    icon={<CheckCircleOutlined />}
                    onClick={handleToggleReady}
                    style={{
                      height: '48px',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}
                  >
                    Toggle Ready
                  </Button>
                </Col>
              )}
            </Row>
          </Card>

          {/* Chat Section */}
          <Card
            title={
              <span style={{ color: '#fff', fontSize: '18px' }}>
                <MessageOutlined style={{ marginRight: '8px' }} />
                Room Chat
              </span>
            }
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
            headStyle={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Chat Messages */}
            <div style={{
              height: '200px',
              overflowY: 'auto',
              marginBottom: '16px',
              padding: '8px',
              background: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '6px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <List
                dataSource={chatMessages}
                renderItem={(item) => (
                  <List.Item style={{ border: 'none', padding: '4px 0' }}>
                    <Text style={{ color: '#fff', fontSize: '14px' }}>
                      <span style={{
                        color: item.type === 'system' ? '#faad14' : '#1890ff',
                        fontWeight: 'bold'
                      }}>
                        [{item.timestamp.toLocaleTimeString()}] {item.playerName}:
                      </span>
                      <span style={{ marginLeft: '8px' }}>
                        {item.message}
                      </span>
                    </Text>
                  </List.Item>
                )}
              />
            </div>

            {/* Chat Input */}
            <Row gutter={8}>
              <Col flex={1}>
                <Input
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onPressEnter={handleSendMessage}
                  placeholder="Type your message..."
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    color: '#fff'
                  }}
                />
              </Col>
              <Col>
                <Button
                  type="primary"
                  onClick={handleSendMessage}
                  disabled={!chatMessage.trim()}
                >
                  Send
                </Button>
              </Col>
            </Row>
          </Card>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}