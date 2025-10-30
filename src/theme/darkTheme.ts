import { ThemeConfig } from 'antd';
import { tokens } from './tokens';

export const darkTheme: ThemeConfig = {
    token: {
        // Base colors
        colorPrimary: tokens.colorPrimary,
        colorSuccess: tokens.colorSuccess,
        colorWarning: tokens.colorWarning,
        colorError: tokens.colorError,
        colorInfo: tokens.colorInfo,
        
        // Text colors
        colorTextBase: tokens.textColorPrimary,
        colorText: tokens.textColorPrimary,
        colorTextSecondary: tokens.textColorSecondary,
        colorTextTertiary: tokens.textColorTertiary,
        colorTextQuaternary: tokens.textColorDisabled,
        
        // Background colors
        colorBgBase: tokens.backgroundColorBase,
        colorBgContainer: tokens.backgroundColorContainer,
        colorBgElevated: tokens.backgroundColorSecondary,
        colorBgLayout: tokens.backgroundColorBase,
        colorBgSpotlight: tokens.backgroundColorTertiary,
        
        // Border colors
        colorBorder: tokens.borderColorBase,
        colorBorderSecondary: tokens.borderColorSecondary,
        
        // Typography
        fontFamily: tokens.fontFamily,
        fontFamilyCode: tokens.fontFamilyCode,
        
        // Layout
        borderRadius: tokens.borderRadius,
        borderRadiusLG: tokens.borderRadiusLG,
        borderRadiusSM: tokens.borderRadiusSM,
        
        // Control colors
        controlOutline: 'rgba(0, 255, 136, 0.2)',
        controlItemBgHover: 'rgba(0, 255, 136, 0.1)',
        controlItemBgActive: 'rgba(0, 255, 136, 0.15)',
        
        // Link colors
        colorLink: tokens.colorPrimary,
        colorLinkHover: tokens.colorPrimaryHover,
        colorLinkActive: tokens.colorPrimaryActive,
    },
    
    components: {
        // Button styling with glow effects
        Button: {
            colorPrimary: tokens.colorPrimary,
            colorPrimaryHover: tokens.colorPrimaryHover,
            colorPrimaryActive: tokens.colorPrimaryActive,
            primaryShadow: tokens.shadowColorPrimary,
            dangerShadow: tokens.shadowColorDanger,
            controlOutline: 'rgba(0, 255, 136, 0.3)',
        },
        
        // Card styling for game boards
        Card: {
            colorBgContainer: tokens.cardBackground,
            colorBorderSecondary: tokens.cardBorder,
            boxShadowTertiary: tokens.shadowColorPrimary,
        },
        
        // Input styling with neon accents
        Input: {
            colorBorder: tokens.borderColorBase,
            colorPrimaryHover: tokens.colorPrimary,
            controlOutline: 'rgba(0, 255, 136, 0.2)',
            activeBorderColor: tokens.colorPrimary,
            hoverBorderColor: tokens.colorPrimary,
        },
        
        // Menu styling
        Menu: {
            colorBgContainer: tokens.backgroundColorContainer,
            colorItemBg: 'transparent',
            colorItemBgSelected: 'rgba(0, 255, 136, 0.1)',
            colorItemBgHover: 'rgba(0, 255, 136, 0.05)',
            colorItemText: tokens.textColorPrimary,
            colorItemTextSelected: tokens.colorPrimary,
        },
        
        // Modal styling
        Modal: {
            contentBg: tokens.backgroundColorContainer,
            headerBg: tokens.backgroundColorSecondary,
            footerBg: tokens.backgroundColorContainer,
        },
        
        // Table styling for game stats
        Table: {
            colorBgContainer: tokens.backgroundColorContainer,
            colorBorderSecondary: tokens.borderColorBase,
            colorTextHeading: tokens.textColorPrimary,
        },
        
        // Tag styling for game elements
        Tag: {
            colorBorder: tokens.borderColorSecondary,
            colorText: tokens.textColorPrimary,
        },
        
        // Notification styling
        Notification: {
            colorBgElevated: tokens.backgroundColorSecondary,
            colorText: tokens.textColorPrimary,
            colorIcon: tokens.colorPrimary,
        },
        
        // Progress styling
        Progress: {
            colorSuccess: tokens.colorSuccess,
            remainingColor: tokens.borderColorBase,
        },
    },
    
    algorithm: undefined, // Use default algorithm for dark theme
};
