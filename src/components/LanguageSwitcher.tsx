"use client";

import { useTranslation } from 'react-i18next';
import { Dropdown, Button } from 'antd';
import type { MenuProps } from 'antd';
import { GlobalOutlined, CheckOutlined } from '@ant-design/icons';

const languages = [
    { code: 'th', name: 'ไทย', flag: '🇹🇭' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
];

interface LanguageSwitcherProps {
    className?: string;
}

export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
    const { i18n } = useTranslation();

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    const handleLanguageChange = (languageCode: string) => {
        i18n.changeLanguage(languageCode);
    };

    const menuItems: MenuProps['items'] = languages.map((language) => ({
        key: language.code,
        label: (
            <div
                onClick={() => handleLanguageChange(language.code)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '4px 8px',
                    cursor: 'pointer'
                }}
            >
                <span style={{ fontSize: '16px' }}>{language.flag}</span>
                <span>{language.name}</span>
                {i18n.language === language.code && (
                    <CheckOutlined style={{ marginLeft: 'auto', color: 'var(--color-primary)' }} />
                )}
            </div>
        ),
        style: {
            backgroundColor: i18n.language === language.code ? 'var(--bg-hover)' : 'transparent'
        }
    }));

    return (
        <Dropdown
            menu={{ items: menuItems }}
            placement="bottomRight"
            trigger={['click']}
            overlayClassName="language-switcher-dropdown"
        >
            <Button
                className={`game-card ${className}`}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: '1px solid var(--border-base)',
                    backgroundColor: 'var(--bg-container)',
                    color: 'var(--text-primary)',
                    borderRadius: '6px',
                    padding: '4px 12px',
                    height: 'auto',
                    minHeight: '32px'
                }}
                icon={<GlobalOutlined />}
            >
                <span style={{ fontSize: '14px' }}>{currentLanguage.flag}</span>
                <span style={{ fontSize: '14px' }}>{currentLanguage.name}</span>
            </Button>
        </Dropdown>
    );
}