"use client";

import React from 'react';
import { ConfigProvider, Layout } from 'antd';
import { ZombieThemeDemo } from '@/src/components';
import { theme } from '@/src/theme';

const { Content } = Layout;

export default function ThemeDemoPage() {
  return (
    <ConfigProvider theme={theme}>
      <Layout className="bg-zombie-dark" style={{ minHeight: '100vh' }}>
        <Content>
          <ZombieThemeDemo />
        </Content>
      </Layout>
    </ConfigProvider>
  );
}