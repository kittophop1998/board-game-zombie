'use client';
import React from 'react';
import { ConfigProvider, theme as antdThemeLib } from 'antd';
import { antdTheme } from '@/src/theme/antdTheme';
import { ThemeProvider as EmotionProvider } from '@emotion/react';
import { tokens } from '@/src/theme/tokens';

interface Props {
    children: React.ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
    return (
        <ConfigProvider
            theme={{
                ...antdTheme,
                algorithm: antdThemeLib.defaultAlgorithm,
            }}
        >
            <EmotionProvider theme={tokens}>
                {children}
            </EmotionProvider>
        </ConfigProvider>
    );
};
