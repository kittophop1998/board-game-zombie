"use client";

import { useI18n } from "@/src/hooks/useI18n";
import { LanguageSwitcher } from "@/src/components";
import { Layout, Button, Card, Typography, Space, Row, Col, ConfigProvider } from 'antd';
import { PlayCircleOutlined, LoginOutlined, UserAddOutlined, SettingOutlined } from '@ant-design/icons';
import { theme } from '@/src/theme';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

export default function Home() {
  const { t } = useI18n();

  return (
    <ConfigProvider theme={theme}>
      <Layout className="bg-zombie-dark" style={{ minHeight: '100vh' }}>
        {/* Header */}
        <Header className="game-card" style={{
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2px solid var(--color-primary)',
          boxShadow: 'var(--shadow-primary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ 
              fontSize: '28px', 
              marginRight: '12px'
            }}>🧟‍♂️</span>
            <Title level={2} className="zombie-title" style={{ margin: 0 }}>
              {t('title')}
            </Title>
          </div>
          <LanguageSwitcher />
        </Header>

        {/* Main Content */}
        <Content style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '24px',
          minHeight: 'calc(100vh - 200px)'
        }}>
          <Row justify="center" style={{ width: '100%' }}>
            <Col xs={22} sm={16} md={12} lg={8} xl={6}>
              <Card className="game-card">
                {/* Zombie Game Logo */}
                <div style={{ 
                  textAlign: 'center', 
                  marginBottom: '24px',
                  fontSize: '64px'
                }}>
                  🧟‍♂️⚰️🧟‍♀️
                </div>
                
                {/* Tagline */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                  <Text className="infection-text" style={{
                    fontSize: '20px',
                    fontWeight: 'bold'
                  }}>
                    🦠 Survive the Infection! 🦠
                  </Text>
                  <br />
                  <Text className="danger-text" style={{
                    fontSize: '14px',
                    marginTop: '8px',
                    display: 'block'
                  }}>
                    The undead are rising... Choose your path wisely.
                  </Text>
                </div>

                {/* Game Stats */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginBottom: '24px',
                  padding: '16px',
                  background: 'var(--bg-secondary)',
                  borderRadius: 'var(--border-radius)',
                  border: '1px solid var(--border-secondary)'
                }}>
                  <div className="zombie-counter">
                    <div>🧟‍♂️</div>
                    <div>SURVIVORS</div>
                    <div style={{ fontSize: '1.2rem' }}>0</div>
                  </div>
                  <div className="zombie-counter infection-text">
                    <div>🦠</div>
                    <div>INFECTED</div>
                    <div style={{ fontSize: '1.2rem' }}>0</div>
                  </div>
                  <div className="zombie-counter danger-text">
                    <div>💀</div>
                    <div>DEAD</div>
                    <div style={{ fontSize: '1.2rem' }}>0</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <Button
                    type="primary"
                    size="large"
                    icon={<PlayCircleOutlined />}
                    style={{
                      width: '100%',
                      height: '56px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}
                  >
                    🎮 {t('game.startGame')}
                  </Button>

                  <Button
                    size="large"
                    icon={<LoginOutlined />}
                    style={{
                      width: '100%',
                      height: '48px',
                      background: 'linear-gradient(135deg, var(--infection-purple), #cc00cc)',
                      borderColor: 'var(--infection-purple)',
                      color: 'white',
                      fontWeight: '600'
                    }}
                  >
                    🔑 {t('auth.login')}
                  </Button>

                  <Button
                    size="large"
                    icon={<UserAddOutlined />}
                    style={{
                      width: '100%',
                      height: '48px',
                      background: 'linear-gradient(135deg, var(--blood-red), #cc0055)',
                      borderColor: 'var(--blood-red)',
                      color: 'white',
                      fontWeight: '600'
                    }}
                  >
                    ⚰️ {t('auth.register')}
                  </Button>

                  {/* Infection Status Bar */}
                  <div style={{ marginTop: '16px' }}>
                    <Text className="infection-text" style={{ 
                      fontSize: '12px', 
                      display: 'block', 
                      marginBottom: '8px' 
                    }}>
                      🦠 Infection Spread: 0%
                    </Text>
                    <div className="infection-meter">
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
          padding: '16px 24px',
          textAlign: 'center'
        }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Space>
                <span style={{ fontSize: '16px' }}>
                  💀⚰️🧟‍♂️
                </span>
                <Text className="danger-text" style={{ fontSize: '14px' }}>
                  Zombie Apocalypse v0.1 
                </Text>
              </Space>
            </Col>
            <Col>
              <Space style={{ cursor: 'pointer' }}>
                <SettingOutlined style={{ 
                  color: 'var(--color-secondary)',
                  fontSize: '16px'
                }} />
                <Text
                  className="infection-text"
                  style={{
                    fontSize: '14px'
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
