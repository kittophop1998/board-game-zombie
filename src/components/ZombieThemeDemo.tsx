import React from 'react';
import { Card, Button, Progress, Badge, Tag, Alert, Space, Typography } from 'antd';
import { 
  PlayCircleOutlined, 
  UserOutlined, 
  HeartOutlined, 
  ThunderboltOutlined,
  ExclamationCircleOutlined 
} from '@ant-design/icons';

const { Title, Text } = Typography;

interface ZombieThemeDemoProps {
  className?: string;
}

export const ZombieThemeDemo: React.FC<ZombieThemeDemoProps> = ({ className }) => {
  return (
    <div className={`zombie-theme-demo ${className || ''}`} style={{ padding: '24px' }}>
      <Title level={2} className="zombie-title font-heading" style={{ 
        textAlign: 'center', 
        marginBottom: '32px',
        fontFamily: 'var(--font-bebas)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        🧟‍♂️ Zombie Theme Components Demo 🧟‍♀️
      </Title>

      {/* Color Palette Demo */}
      <Card className="game-card glow-primary" style={{ marginBottom: '24px' }}>
        <Title level={4} className="zombie-title font-heading" style={{ 
          fontFamily: 'var(--font-bebas)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>Color Palette</Title>
        <Space wrap size="large">
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: 'var(--zombie-green)',
              borderRadius: '50%',
              margin: '0 auto 8px',
              boxShadow: 'var(--shadow-primary)'
            }} />
            <Text className="text-zombie-primary">Zombie Green</Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: 'var(--infection-purple)',
              borderRadius: '50%',
              margin: '0 auto 8px',
              boxShadow: 'var(--shadow-secondary)'
            }} />
            <Text className="infection-text">Infection Purple</Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: 'var(--blood-red)',
              borderRadius: '50%',
              margin: '0 auto 8px',
              boxShadow: 'var(--shadow-danger)'
            }} />
            <Text className="danger-text">Blood Red</Text>
          </div>
        </Space>
      </Card>

      {/* Buttons Demo */}
      <Card className="game-card" style={{ marginBottom: '24px' }}>
        <Title level={4} className="zombie-title font-heading" style={{ 
          fontFamily: 'var(--font-bebas)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>Interactive Buttons</Title>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Button type="primary" size="large" icon={<PlayCircleOutlined />} className="glow-primary">
            🎮 Start Zombie Hunt
          </Button>
          <Button size="large" icon={<UserOutlined />} className="glow-secondary" style={{
            background: 'linear-gradient(135deg, var(--infection-purple), #cc00cc)',
            borderColor: 'var(--infection-purple)',
            color: 'white'
          }}>
            🦠 Join Infected
          </Button>
          <Button size="large" icon={<ExclamationCircleOutlined />} className="glow-danger" style={{
            background: 'linear-gradient(135deg, var(--blood-red), #cc0055)',
            borderColor: 'var(--blood-red)',
            color: 'white'
          }}>
            💀 Emergency Exit
          </Button>
        </Space>
      </Card>

      {/* Game Stats Demo */}
      <Card className="game-card" style={{ marginBottom: '24px' }}>
        <Title level={4} className="zombie-title font-heading" style={{ 
          fontFamily: 'var(--font-bebas)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>Game Statistics</Title>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '16px',
          marginTop: '16px'
        }}>
          <div className="zombie-counter">
            <div>🧟‍♂️</div>
            <div>SURVIVORS</div>
            <div style={{ fontSize: '1.5rem', color: 'var(--zombie-green)' }}>127</div>
          </div>
          <div className="zombie-counter infection-text">
            <div>🦠</div>
            <div>INFECTED</div>
            <div style={{ fontSize: '1.5rem' }}>23</div>
          </div>
          <div className="zombie-counter danger-text">
            <div>💀</div>
            <div>ELIMINATED</div>
            <div style={{ fontSize: '1.5rem' }}>89</div>
          </div>
          <div className="zombie-counter" style={{ color: 'var(--color-info)' }}>
            <div>⚡</div>
            <div>ENERGY</div>
            <div style={{ fontSize: '1.5rem' }}>75%</div>
          </div>
        </div>
      </Card>

      {/* Progress Bars Demo */}
      <Card className="game-card" style={{ marginBottom: '24px' }}>
        <Title level={4} className="zombie-title font-heading" style={{ 
          fontFamily: 'var(--font-bebas)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>Health & Status Bars</Title>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Text className="text-zombie-primary">Health: </Text>
            <div className="health-bar" style={{ marginTop: '8px' }}>
              <div className="health-bar-fill" style={{ width: '65%' }} />
            </div>
          </div>
          <div>
            <Text className="infection-text">Infection Level: </Text>
            <div className="infection-meter" style={{ marginTop: '8px' }}>
              <div style={{ 
                width: '40%', 
                height: '100%', 
                background: 'linear-gradient(90deg, var(--color-warning), var(--infection-purple))',
                transition: 'width 0.3s ease',
                borderRadius: 'var(--border-radius)'
              }} />
            </div>
          </div>
          <div>
            <Text style={{ color: 'var(--color-info)' }}>Energy: </Text>
            <Progress 
              percent={75} 
              strokeColor={{
                from: 'var(--color-info)',
                to: 'var(--zombie-green)',
              }}
              trailColor="var(--bg-secondary)"
              style={{ marginTop: '8px' }}
            />
          </div>
        </Space>
      </Card>

      {/* Tags and Badges Demo */}
      <Card className="game-card" style={{ marginBottom: '24px' }}>
        <Title level={4} className="zombie-title font-heading" style={{ 
          fontFamily: 'var(--font-bebas)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>Game Tags & Status</Title>
        <Space wrap size="middle">
          <Tag color="var(--zombie-green)" style={{ 
            border: '1px solid var(--zombie-green)',
            boxShadow: 'var(--shadow-primary)'
          }}>
            🛡️ SURVIVOR
          </Tag>
          <Tag color="var(--infection-purple)" style={{ 
            border: '1px solid var(--infection-purple)',
            boxShadow: 'var(--shadow-secondary)'
          }}>
            🦠 INFECTED
          </Tag>
          <Tag color="var(--blood-red)" style={{ 
            border: '1px solid var(--blood-red)',
            boxShadow: 'var(--shadow-danger)'
          }}>
            💀 ZOMBIE
          </Tag>
          <Badge count={5} style={{ backgroundColor: 'var(--zombie-green)' }}>
            <div className="game-card" style={{ 
              padding: '8px 16px',
              minWidth: '80px',
              textAlign: 'center'
            }}>
              <HeartOutlined style={{ color: 'var(--zombie-green)', fontSize: '20px' }} />
            </div>
          </Badge>
          <Badge count={3} style={{ backgroundColor: 'var(--blood-red)' }}>
            <div className="game-card" style={{ 
              padding: '8px 16px',
              minWidth: '80px',
              textAlign: 'center'
            }}>
              <ThunderboltOutlined style={{ color: 'var(--color-warning)', fontSize: '20px' }} />
            </div>
          </Badge>
        </Space>
      </Card>

      {/* Alerts Demo */}
      <Card className="game-card">
        <Title level={4} className="zombie-title font-heading" style={{ 
          fontFamily: 'var(--font-bebas)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>Game Alerts</Title>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Alert
            message="🧟‍♂️ Zombie Detected!"
            description="A zombie has been spotted in your vicinity. Proceed with caution!"
            type="success"
            showIcon
            style={{ backgroundColor: 'rgba(0, 255, 136, 0.1)' }}
          />
          <Alert
            message="🦠 Infection Warning"
            description="Your infection level is rising. Find medical supplies immediately!"
            type="warning"
            showIcon
            style={{ backgroundColor: 'rgba(255, 170, 0, 0.1)' }}
          />
          <Alert
            message="💀 Critical Health"
            description="Your health is critically low. Seek shelter or healing items!"
            type="error"
            showIcon
            style={{ backgroundColor: 'rgba(255, 0, 102, 0.1)' }}
          />
          <Alert
            message="⚡ Power-up Available"
            description="A special zombie-hunting power-up is ready to be activated!"
            type="info"
            showIcon
            style={{ backgroundColor: 'rgba(0, 170, 255, 0.1)' }}
          />
        </Space>
      </Card>

      {/* Animation Demo */}
      <div style={{ 
        textAlign: 'center',
        marginTop: '32px',
        padding: '24px'
      }}>
        <Title level={3} className="zombie-title pulse-animation">
          🧟‍♂️ WELCOME TO THE APOCALYPSE 🧟‍♀️
        </Title>
        <Text className="infection-text flicker-animation" style={{ fontSize: '16px' }}>
          Where survival is not guaranteed...
        </Text>
      </div>
    </div>
  );
};