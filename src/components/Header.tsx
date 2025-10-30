"use client";

import { Layout, Typography } from 'antd';
import { useI18n } from '@/src/hooks/useI18n';
import LanguageSwitcher from './LanguageSwitcher';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

export function Header() {
    const { t } = useI18n();

    return (
        <AntHeader
            className="game-card"
            style={{
                padding: '0 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '2px solid var(--color-primary)',
                boxShadow: 'var(--shadow-primary)'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
                <span style={{
                    fontSize: 'clamp(20px, 5vw, 28px)',
                    marginRight: 'clamp(8px, 2vw, 12px)'
                }}>
                    🧟‍♂️
                </span>
                <Title
                    level={2}
                    className="zombie-title font-heading"
                    style={{
                        margin: 0,
                        fontSize: 'clamp(16px, 4vw, 24px)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontFamily: 'var(--font-bebas)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}
                >
                    {t('title')}
                </Title>
            </div>
            <div style={{ marginLeft: '8px' }}>
                <LanguageSwitcher />
            </div>
        </AntHeader>
    );
}