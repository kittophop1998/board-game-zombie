"use client";

import { useI18n } from "@/src/hooks/useI18n";
import { LanguageSwitcher } from "@/src/components";
import { Layout, Button, Card, Typography, Space, Row, Col } from 'antd';
import { PlayCircleOutlined, LoginOutlined, UserAddOutlined, SettingOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

export default function Home() {
  const { t } = useI18n();

  return (
    <Layout style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1f2937 0%, #374151 50%, #000000 100%)'
    }}>
      {/* Header */}
      <Header style={{
        backgroundColor: '#1f2937',
        borderBottom: '1px solid #374151',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '24px', marginRight: '12px' }}>🧟</span>
          <Title level={3} style={{ color: 'white', margin: 0 }}>
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
        padding: '24px'
      }}>
        <Row justify="center" style={{ width: '100%' }}>
          <Col xs={22} sm={16} md={12} lg={8} xl={6}>
            <Card
              style={{
                backgroundColor: 'rgba(31, 41, 55, 0.8)',
                backdropFilter: 'blur(8px)',
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
              bodyStyle={{ padding: '32px' }}
            >
              {/* Tagline */}
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <Text style={{
                  fontSize: '18px',
                  color: '#D1D5DB',
                  fontStyle: 'italic'
                }}>
                  Survive the Infection!
                </Text>
              </div>

              {/* Action Buttons */}
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Button
                  type="primary"
                  size="large"
                  icon={<PlayCircleOutlined />}
                  style={{
                    width: '100%',
                    height: '48px',
                    backgroundColor: '#059669',
                    borderColor: '#059669'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#047857';
                    e.currentTarget.style.borderColor = '#047857';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#059669';
                    e.currentTarget.style.borderColor = '#059669';
                  }}
                >
                  {t('game.startGame')}
                </Button>

                <Button
                  type="primary"
                  size="large"
                  icon={<LoginOutlined />}
                  style={{
                    width: '100%',
                    height: '48px',
                    backgroundColor: '#2563EB',
                    borderColor: '#2563EB'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#1D4ED8';
                    e.currentTarget.style.borderColor = '#1D4ED8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#2563EB';
                    e.currentTarget.style.borderColor = '#2563EB';
                  }}
                >
                  {t('auth.login')}
                </Button>

                <Button
                  type="primary"
                  size="large"
                  icon={<UserAddOutlined />}
                  style={{
                    width: '100%',
                    height: '48px',
                    backgroundColor: '#7C3AED',
                    borderColor: '#7C3AED'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#6D28D9';
                    e.currentTarget.style.borderColor = '#6D28D9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#7C3AED';
                    e.currentTarget.style.borderColor = '#7C3AED';
                  }}
                >
                  {t('auth.register')}
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>
      </Content>

      {/* Footer */}
      <Footer style={{
        backgroundColor: '#1f2937',
        borderTop: '1px solid #374151',
        padding: '16px 24px'
      }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Space>
              <span style={{ fontSize: '16px' }}>💀</span>
              <Text style={{ color: '#9CA3AF', fontSize: '14px' }}>
                Version 0.1
              </Text>
            </Space>
          </Col>
          <Col>
            <Space style={{ cursor: 'pointer' }}>
              <SettingOutlined style={{ color: '#9CA3AF' }} />
              <Text
                style={{
                  color: '#9CA3AF',
                  fontSize: '14px',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#D1D5DB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#9CA3AF';
                }}
              >
                {t('settings.settings')}
              </Text>
            </Space>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
}
