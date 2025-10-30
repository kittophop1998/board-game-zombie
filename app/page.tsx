"use client";

import { useI18n } from "@/src/hooks/useI18n";
import { Header } from "@/src/components";
import { Layout, Button, Card, Typography, Space, Row, Col, ConfigProvider } from 'antd';
import { PlayCircleOutlined, LoginOutlined, UserAddOutlined, SettingOutlined } from '@ant-design/icons';
import { theme } from '@/src/theme';
import { useRouter } from 'next/navigation';

const { Content, Footer } = Layout;
const { Text } = Typography;

export default function Home() {
  const { t } = useI18n();
  const router = useRouter();

  const handleStartGame = () => {
    router.push('/lobby');
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
          alignItems: 'center',
          padding: 'clamp(16px, 4vw, 24px)',
          minHeight: 'calc(100vh - 200px)'
        }}>
          <Row justify="center" style={{ width: '100%' }}>
            <Col xs={23} sm={20} md={16} lg={12} xl={8} xxl={6}>
              <Card
                className="game-card"
                style={{
                  padding: 'clamp(16px, 3vw, 24px)',
                  margin: '0 auto'
                }}
              >
                {/* Zombie Game Logo */}
                <div style={{
                  textAlign: 'center',
                  marginBottom: 'clamp(16px, 4vw, 24px)',
                  fontSize: 'clamp(40px, 12vw, 64px)',
                  lineHeight: '1.2'
                }}>
                  🧟‍♂️⚰️🧟‍♀️
                </div>

                {/* Game Title */}
                <h1 className="font-heading" style={{
                  textAlign: 'center',
                  marginBottom: 'clamp(8px, 2vw, 12px)',
                  fontSize: 'clamp(32px, 8vw, 48px)',
                  color: 'var(--color-primary)'
                }}>
                  ZOMBIE OUTBREAK
                </h1>

                {/* Tagline */}
                <div style={{ textAlign: 'center', marginBottom: 'clamp(24px, 6vw, 32px)' }}>
                  <h2 className="font-heading infection-text" style={{
                    fontSize: 'clamp(16px, 4vw, 20px)',
                    display: 'block',
                    lineHeight: '1.3',
                    margin: '0'
                  }}>
                    🦠 Survive the Infection! 🦠
                  </h2>
                  <p className="font-body danger-text" style={{
                    fontSize: 'clamp(12px, 3vw, 14px)',
                    marginTop: 'clamp(6px, 2vw, 8px)',
                    display: 'block',
                    lineHeight: '1.4',
                    margin: 'clamp(6px, 2vw, 8px) 0 0 0'
                  }}>
                    The undead are rising... Choose your path wisely.
                  </p>
                </div>

                {/* Game Stats */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 'clamp(8px, 2vw, 16px)',
                  marginBottom: 'clamp(16px, 4vw, 24px)',
                  padding: 'clamp(12px, 3vw, 16px)',
                  background: 'var(--bg-secondary)',
                  borderRadius: 'var(--border-radius)',
                  border: '1px solid var(--border-secondary)'
                }}>
                  <div className="zombie-counter" style={{
                    textAlign: 'center',
                    fontSize: 'clamp(10px, 2.5vw, 12px)'
                  }}>
                    <div style={{ fontSize: 'clamp(16px, 4vw, 20px)' }}>🧟‍♂️</div>
                    <div>SURVIVORS</div>
                    <div style={{ fontSize: 'clamp(14px, 3vw, 18px)', fontWeight: 'bold' }}>0</div>
                  </div>
                  <div className="zombie-counter infection-text" style={{
                    textAlign: 'center',
                    fontSize: 'clamp(10px, 2.5vw, 12px)'
                  }}>
                    <div style={{ fontSize: 'clamp(16px, 4vw, 20px)' }}>🦠</div>
                    <div>INFECTED</div>
                    <div style={{ fontSize: 'clamp(14px, 3vw, 18px)', fontWeight: 'bold' }}>0</div>
                  </div>
                  <div className="zombie-counter danger-text" style={{
                    textAlign: 'center',
                    fontSize: 'clamp(10px, 2.5vw, 12px)'
                  }}>
                    <div style={{ fontSize: 'clamp(16px, 4vw, 20px)' }}>💀</div>
                    <div>DEAD</div>
                    <div style={{ fontSize: 'clamp(14px, 3vw, 18px)', fontWeight: 'bold' }}>0</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <Button
                    type="primary"
                    size="large"
                    icon={<PlayCircleOutlined />}
                    onClick={handleStartGame}
                    style={{
                      width: '100%',
                      height: 'clamp(48px, 12vw, 56px)',
                      fontSize: 'clamp(14px, 3.5vw, 16px)',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}
                  >
                    <span>🎮 {t('game.startGame')}</span>
                  </Button>

                  <Button
                    size="large"
                    icon={<LoginOutlined />}
                    style={{
                      width: '100%',
                      height: 'clamp(40px, 10vw, 48px)',
                      fontSize: 'clamp(12px, 3vw, 14px)',
                      background: 'linear-gradient(135deg, var(--infection-purple), #cc00cc)',
                      borderColor: 'var(--infection-purple)',
                      color: 'white',
                      fontWeight: '600'
                    }}
                  >
                    <span>🔑 {t('auth.login')}</span>
                  </Button>

                  <Button
                    size="large"
                    icon={<UserAddOutlined />}
                    style={{
                      width: '100%',
                      height: 'clamp(40px, 10vw, 48px)',
                      fontSize: 'clamp(12px, 3vw, 14px)',
                      background: 'linear-gradient(135deg, var(--blood-red), #cc0055)',
                      borderColor: 'var(--blood-red)',
                      color: 'white',
                      fontWeight: '600'
                    }}
                  >
                    <span>⚰️ {t('auth.register')}</span>
                  </Button>

                  {/* Infection Status Bar */}
                  <div style={{ marginTop: 'clamp(12px, 3vw, 16px)' }}>
                    <Text className="infection-text" style={{
                      fontSize: 'clamp(10px, 2.5vw, 12px)',
                      display: 'block',
                      marginBottom: 'clamp(6px, 1.5vw, 8px)'
                    }}>
                      🦠 Infection Spread: 0%
                    </Text>
                    <div className="infection-meter" style={{
                      minHeight: 'clamp(8px, 2vw, 12px)'
                    }}>
                      <div style={{
                        width: '0%',
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--color-success), var(--color-warning), var(--color-error))',
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>
        </Content>

        {/* Footer */}
        <Footer className="game-card" style={{
          borderTop: '2px solid var(--color-secondary)',
          padding: 'clamp(12px, 3vw, 16px) clamp(16px, 4vw, 24px)',
          textAlign: 'center'
        }}>
          <Row justify="space-between" align="middle" gutter={[8, 8]}>
            <Col xs={24} sm={12} md={8} style={{ textAlign: 'center' }}>
              <Space direction="vertical" size="small">
                <span style={{ fontSize: 'clamp(14px, 3vw, 16px)' }}>
                  💀⚰️🧟‍♂️
                </span>
                <Text className="danger-text" style={{
                  fontSize: 'clamp(11px, 2.5vw, 14px)',
                  display: 'block'
                }}>
                  Zombie Apocalypse v0.1
                </Text>
              </Space>
            </Col>
            <Col xs={24} sm={12} md={8} style={{ textAlign: 'center' }}>
              <Space style={{ cursor: 'pointer' }} size="small">
                <SettingOutlined style={{
                  color: 'var(--color-secondary)',
                  fontSize: 'clamp(14px, 3vw, 16px)'
                }} />
                <Text
                  className="infection-text"
                  style={{
                    fontSize: 'clamp(11px, 2.5vw, 14px)'
                  }}
                >
                  ⚙️ {t('settings.settings')}
                </Text>
              </Space>
            </Col>
          </Row>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
}
