import { ThemeConfig } from 'antd';
import { tokens } from './tokens';
import { darkTheme } from './darkTheme';

// Main theme configuration for the zombie board game
export const antdTheme: ThemeConfig = {
    ...darkTheme,
    
    // Override or add specific customizations
    token: {
        ...darkTheme.token,
        
        // Ensure consistent theme application
        colorPrimary: tokens.colorPrimary,
        colorTextBase: tokens.textColorPrimary,
        fontFamily: tokens.fontFamily,
        borderRadius: tokens.borderRadius,
        
        // Animation and motion
        motionDurationFast: '0.1s',
        motionDurationMid: '0.2s',
        motionDurationSlow: '0.3s',
        
        // Z-index values for game overlays
        zIndexBase: 0,
        zIndexPopupBase: 1000,
        
        // Screen size breakpoints
        screenXS: 480,
        screenSM: 576,
        screenMD: 768,
        screenLG: 992,
        screenXL: 1200,
        screenXXL: 1600,
    },
    
    components: {
        ...darkTheme.components,
        
        // Enhanced button styling for game UI
        Button: {
            ...darkTheme.components?.Button,
            colorPrimaryHover: tokens.colorPrimaryHover,
            borderColorDisabled: tokens.borderColorBase,
            colorTextDisabled: tokens.textColorDisabled,
            // Add subtle glow animation on hover
            boxShadow: 'none',
            primaryShadow: `0 2px 8px rgba(0, 255, 136, 0.15)`,
        },
        
        // Game card styling
        Card: {
            ...darkTheme.components?.Card,
            paddingLG: 24,
            borderRadiusLG: tokens.borderRadiusLG,
            // Subtle border glow for interactive cards
            boxShadow: `0 1px 3px rgba(0, 0, 0, 0.3), 0 0 0 1px ${tokens.borderColorBase}`,
        },
        
        // Enhanced typography for game text
        Typography: {
            titleMarginTop: '1.2em',
            titleMarginBottom: '0.5em',
            fontFamilyCode: tokens.fontFamilyCode,
        },
        
        // Tooltip styling for game help
        Tooltip: {
            colorBgSpotlight: tokens.backgroundColorSecondary,
            colorTextLightSolid: tokens.textColorPrimary,
            borderRadius: tokens.borderRadiusSM,
        },
        
        // Divider for section separation
        Divider: {
            colorSplit: tokens.borderColorBase,
            orientationMargin: 0.05,
        },
        
        // Spin loader for game loading states
        Spin: {
            colorPrimary: tokens.colorPrimary,
            contentHeight: 400,
        },
        
        // Alert styling for game notifications
        Alert: {
            colorInfoBg: `rgba(0, 170, 255, 0.1)`,
            colorSuccessBg: `rgba(0, 255, 136, 0.1)`,
            colorWarningBg: `rgba(255, 170, 0, 0.1)`,
            colorErrorBg: `rgba(255, 0, 102, 0.1)`,
        },
    },
};
