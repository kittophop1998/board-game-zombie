"use client";

import { Header } from "@/src/components";
import { Layout, Button, Card, Typography, Row, Col, ConfigProvider, List, Badge } from 'antd';
import { PlusOutlined, TeamOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { theme } from '@/src/theme';
import { useRouter } from 'next/navigation';

const { Content } = Layout;
const { Title, Text } = Typography;

interface Room {
  id: string;
  name: string;
  currentPlayers: number;
  maxPlayers: number;
  status: 'waiting' | 'playing' | 'full';
}

export default function LobbyPage() {
  const router = useRouter();

  // Mock data for active rooms
  const activeRooms: Room[] = [
    {
      id: '124',
      name: 'Room #124',
      currentPlayers: 3,
      maxPlayers: 4,
      status: 'waiting'
    },
    {
      id: '125',
      name: 'Room #125',
      currentPlayers: 2,
      maxPlayers: 4,
      status: 'waiting'
    },
    {
      id: '126',
      name: 'Room #126',
      currentPlayers: 4,
      maxPlayers: 4,
      status: 'full'
    }
  ];

  const handleCreateRoom = () => {
    // TODO: Implement create room functionality
    console.log('Creating new room...');
  };

  const handleJoinRoom = (roomId: string) => {
    // TODO: Implement join room functionality
    console.log(`Joining room ${roomId}...`);
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <ConfigProvider theme={theme}>
      <Layout className="bg-zombie-dark" style={{ minHeight: '100vh' }}>
        {/* Header */}
        <Header />

        {/* Main Content */}
        <Content style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: 'clamp(16px, 4vw, 24px)',
          minHeight: 'calc(100vh - 200px)'
        }}>
          <Row justify="center" style={{ width: '100%', maxWidth: '1200px' }}>
            <Col xs={24} sm={22} md={20} lg={18} xl={16}>
              <Card
                className="game-card"
                style={{
                  padding: 'clamp(16px, 3vw, 24px)',
                  margin: '0 auto'
                }}
              >
                {/* Header Section */}
                <div style={{
                  textAlign: 'center',
                  marginBottom: 'clamp(24px, 6vw, 32px)',
                  paddingBottom: 'clamp(16px, 4vw, 24px)',
                  borderBottom: '2px solid var(--border-secondary)'
                }}>
                  <div style={{
                    fontSize: 'clamp(32px, 8vw, 48px)',
                    marginBottom: 'clamp(8px, 2vw, 12px)',
                    lineHeight: '1.2'
                  }}>
                    🧟‍♂️
                  </div>
                  <Title 
                    level={2} 
                    className="font-heading" 
                    style={{
                      margin: 0,
                      fontSize: 'clamp(24px, 6vw, 32px)',
                      color: 'var(--color-primary)'
                    }}
                  >
                    Zombie Board Game
                  </Title>
                </div>

                {/* Action Buttons */}
                <Row gutter={[16, 16]} style={{ marginBottom: 'clamp(24px, 6vw, 32px)' }}>
                  <Col xs={24} sm={12}>
                    <Button
                      type="primary"
                      size="large"
                      icon={<PlusOutlined />}
                      onClick={handleCreateRoom}
                      style={{
                        width: '100%',
                        height: 'clamp(48px, 12vw, 56px)',
                        fontSize: 'clamp(14px, 3.5vw, 16px)',
                        fontWeight: 'bold',
                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                        borderColor: 'var(--color-primary)'
                      }}
                    >
                      Create Room
                    </Button>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Button
                      size="large"
                      icon={<TeamOutlined />}
                      style={{
                        width: '100%',
                        height: 'clamp(48px, 12vw, 56px)',
                        fontSize: 'clamp(14px, 3.5vw, 16px)',
                        fontWeight: 'bold',
                        background: 'linear-gradient(135deg, var(--infection-purple), #cc00cc)',
                        borderColor: 'var(--infection-purple)',
                        color: 'white'
                      }}
                    >
                      Join Room
                    </Button>
                  </Col>
                </Row>

                {/* Active Rooms Section */}
                <div style={{ marginBottom: 'clamp(16px, 4vw, 24px)' }}>
                  <Title 
                    level={3} 
                    className="font-heading" 
                    style={{
                      fontSize: 'clamp(18px, 4.5vw, 24px)',
                      marginBottom: 'clamp(12px, 3vw, 16px)',
                      color: 'var(--color-text-primary)'
                    }}
                  >
                    Active Rooms
                  </Title>

                  <div style={{
                    border: '2px solid var(--border-secondary)',
                    borderRadius: 'var(--border-radius)',
                    background: 'var(--bg-secondary)',
                    minHeight: '200px'
                  }}>
                    <List
                      dataSource={activeRooms}
                      renderItem={(room) => (
                        <List.Item
                          style={{
                            padding: 'clamp(12px, 3vw, 16px)',
                            borderBottom: '1px solid var(--border-tertiary)',
                            background: room.status === 'full' ? 'var(--bg-tertiary)' : 'transparent'
                          }}
                          actions={[
                            <Button
                              key="join"
                              type="text"
                              icon={<PlayCircleOutlined />}
                              disabled={room.status === 'full'}
                              onClick={() => handleJoinRoom(room.id)}
                              style={{
                                color: room.status === 'full' ? 'var(--color-text-disabled)' : 'var(--color-primary)',
                                fontSize: 'clamp(16px, 4vw, 20px)'
                              }}
                            />
                          ]}
                        >
                          <List.Item.Meta
                            title={
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'clamp(8px, 2vw, 12px)'
                              }}>
                                <Text 
                                  strong 
                                  style={{ 
                                    fontSize: 'clamp(14px, 3.5vw, 16px)',
                                    color: room.status === 'full' ? 'var(--color-text-disabled)' : 'var(--color-text-primary)'
                                  }}
                                >
                                  {room.name}
                                </Text>
                                <Badge
                                  count={`${room.currentPlayers}/${room.maxPlayers} Players`}
                                  style={{
                                    backgroundColor: room.status === 'full' 
                                      ? 'var(--color-error)' 
                                      : room.currentPlayers === room.maxPlayers - 1 
                                        ? 'var(--color-warning)' 
                                        : 'var(--color-success)',
                                    fontSize: 'clamp(10px, 2.5vw, 12px)'
                                  }}
                                />
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                      locale={{
                        emptyText: (
                          <div style={{
                            padding: 'clamp(32px, 8vw, 48px)',
                            textAlign: 'center'
                          }}>
                            <div style={{
                              fontSize: 'clamp(32px, 8vw, 48px)',
                              marginBottom: 'clamp(8px, 2vw, 12px)'
                            }}>
                              🧟‍♂️
                            </div>
                            <Text style={{
                              fontSize: 'clamp(14px, 3.5vw, 16px)',
                              color: 'var(--color-text-secondary)'
                            }}>
                              No active rooms... The zombies got them all! 💀
                            </Text>
                          </div>
                        )
                      }}
                    />
                  </div>
                </div>

                {/* Back Button */}
                <div style={{ textAlign: 'center', marginTop: 'clamp(16px, 4vw, 24px)' }}>
                  <Button
                    onClick={handleBackToHome}
                    style={{
                      fontSize: 'clamp(12px, 3vw, 14px)',
                      background: 'linear-gradient(135deg, var(--blood-red), #cc0055)',
                      borderColor: 'var(--blood-red)',
                      color: 'white',
                      fontWeight: '600'
                    }}
                  >
                    ← Back to Main Menu
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}