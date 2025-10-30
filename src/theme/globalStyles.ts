// Global CSS styles for the Zombie Board Game theme
import { tokens } from './tokens';

// Global CSS string that can be injected into the page
export const globalStylesCSS = `
  /* Import Google Fonts for futuristic look */
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500&display=swap');

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: ${tokens.fontFamily};
    background: ${tokens.backgroundColorBase};
    color: ${tokens.textColorPrimary};
    line-height: 1.6;
    overflow-x: hidden;
    
    /* Subtle background pattern for texture */
    background-image: 
      radial-gradient(circle at 1px 1px, ${tokens.colorPrimary}15 1px, transparent 0);
    background-size: 20px 20px;
  }

  html {
    scroll-behavior: smooth;
  }

  /* Custom scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${tokens.backgroundColorContainer};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${tokens.colorPrimary};
    border-radius: 4px;
    box-shadow: ${tokens.shadowColorPrimary};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${tokens.colorPrimaryHover};
  }

  /* Selection styling */
  ::selection {
    background: ${tokens.colorPrimary};
    color: ${tokens.textColorInverse};
  }

  /* Focus outline for accessibility */
  *:focus-visible {
    outline: 2px solid ${tokens.colorPrimary};
    outline-offset: 2px;
    border-radius: 2px;
  }

  /* Game-specific utility classes */
  .glow-primary {
    box-shadow: ${tokens.shadowColorPrimary};
    transition: box-shadow 0.3s ease;
  }

  .glow-secondary {
    box-shadow: ${tokens.shadowColorSecondary};
    transition: box-shadow 0.3s ease;
  }

  .glow-danger {
    box-shadow: ${tokens.shadowColorDanger};
    transition: box-shadow 0.3s ease;
  }

  /* Game card animations */
  .game-card {
    background: ${tokens.cardBackground};
    border: 1px solid ${tokens.cardBorder};
    border-radius: ${tokens.borderRadius}px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .game-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(0, 255, 136, 0.1),
      transparent
    );
    transition: left 0.5s ease;
  }

  .game-card:hover {
    background: ${tokens.cardHover};
    border-color: ${tokens.colorPrimary};
    box-shadow: ${tokens.shadowColorPrimary};
    transform: translateY(-2px);
  }

  .game-card:hover::before {
    left: 100%;
  }

  /* Zombie-themed text effects */
  .zombie-title {
    font-family: ${tokens.fontFamily};
    font-weight: 700;
    color: ${tokens.colorPrimary};
    text-shadow: ${tokens.shadowColorPrimary};
    letter-spacing: 1px;
  }

  .infection-text {
    color: ${tokens.infectionPurple};
    text-shadow: ${tokens.shadowColorSecondary};
  }

  .danger-text {
    color: ${tokens.bloodRed};
    text-shadow: ${tokens.shadowColorDanger};
  }

  /* Button enhancements */
  .ant-btn-primary {
    background: linear-gradient(135deg, ${tokens.colorPrimary}, ${tokens.colorPrimaryHover});
    border: none;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
  }

  .ant-btn-primary:hover {
    background: linear-gradient(135deg, ${tokens.colorPrimaryHover}, ${tokens.colorPrimary});
    box-shadow: ${tokens.shadowColorPrimary};
    transform: translateY(-1px);
  }

  /* Loading animations */
  @keyframes pulse-glow {
    0% {
      box-shadow: 0 0 5px ${tokens.colorPrimary};
    }
    50% {
      box-shadow: 0 0 20px ${tokens.colorPrimary}, 0 0 30px ${tokens.colorPrimary};
    }
    100% {
      box-shadow: 0 0 5px ${tokens.colorPrimary};
    }
  }

  .pulse-animation {
    animation: pulse-glow 2s infinite;
  }

  /* Modal and overlay styling */
  .ant-modal-content {
    background: ${tokens.backgroundColorContainer} !important;
    border: 1px solid ${tokens.borderColorBase};
    box-shadow: ${tokens.shadowColorPrimary}, 0 4px 20px rgba(0, 0, 0, 0.5);
  }

  .ant-modal-header {
    background: ${tokens.backgroundColorSecondary} !important;
    border-bottom: 1px solid ${tokens.borderColorBase};
  }

  .ant-modal-title {
    color: ${tokens.textColorPrimary} !important;
    font-weight: 600;
  }

  /* Table enhancements for game stats */
  .ant-table {
    background: ${tokens.backgroundColorContainer};
  }

  .ant-table-thead > tr > th {
    background: ${tokens.backgroundColorSecondary} !important;
    color: ${tokens.textColorPrimary} !important;
    font-weight: 600;
    border-bottom: 1px solid ${tokens.borderColorBase};
  }

  .ant-table-tbody > tr:hover > td {
    background: rgba(0, 255, 136, 0.05) !important;
  }

  /* Form styling */
  .ant-form-item-label > label {
    color: ${tokens.textColorPrimary} !important;
    font-weight: 500;
  }

  .ant-input,
  .ant-input-affix-wrapper {
    background: ${tokens.backgroundColorContainer} !important;
    border-color: ${tokens.borderColorBase} !important;
    color: ${tokens.textColorPrimary} !important;
  }

  .ant-input:focus,
  .ant-input-affix-wrapper:focus,
  .ant-input-focused,
  .ant-input-affix-wrapper-focused {
    border-color: ${tokens.colorPrimary} !important;
    box-shadow: 0 0 0 2px rgba(0, 255, 136, 0.2) !important;
  }

  /* Menu styling */
  .ant-menu {
    background: ${tokens.backgroundColorContainer} !important;
    border-right: 1px solid ${tokens.borderColorBase} !important;
  }

  .ant-menu-item:hover {
    background: rgba(0, 255, 136, 0.1) !important;
  }

  .ant-menu-item-selected {
    background: rgba(0, 255, 136, 0.15) !important;
    color: ${tokens.colorPrimary} !important;
  }

  /* Responsive design */
  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
    
    .game-card {
      margin: 8px 0;
    }
  }

  /* Print styles */
  @media print {
    .glow-primary,
    .glow-secondary,
    .glow-danger {
      box-shadow: none !important;
    }
    
    body {
      background: white !important;
      color: black !important;
    }
  }
`;

// CSS custom properties for dynamic theming
export const cssVariables = `
  :root {
    --color-primary: ${tokens.colorPrimary};
    --color-secondary: ${tokens.colorSecondary};
    --color-success: ${tokens.colorSuccess};
    --color-warning: ${tokens.colorWarning};
    --color-error: ${tokens.colorError};
    --color-info: ${tokens.colorInfo};
    
    --bg-base: ${tokens.backgroundColorBase};
    --bg-container: ${tokens.backgroundColorContainer};
    --bg-secondary: ${tokens.backgroundColorSecondary};
    --bg-tertiary: ${tokens.backgroundColorTertiary};
    
    --text-primary: ${tokens.textColorPrimary};
    --text-secondary: ${tokens.textColorSecondary};
    --text-tertiary: ${tokens.textColorTertiary};
    --text-disabled: ${tokens.textColorDisabled};
    
    --border-base: ${tokens.borderColorBase};
    --border-secondary: ${tokens.borderColorSecondary};
    --border-tertiary: ${tokens.borderColorTertiary};
    
    --shadow-primary: ${tokens.shadowColorPrimary};
    --shadow-secondary: ${tokens.shadowColorSecondary};
    --shadow-danger: ${tokens.shadowColorDanger};
    
    --zombie-green: ${tokens.zombieGreen};
    --infection-purple: ${tokens.infectionPurple};
    --blood-red: ${tokens.bloodRed};
    
    --font-family: ${tokens.fontFamily};
    --font-family-code: ${tokens.fontFamilyCode};
    
    --border-radius: ${tokens.borderRadius}px;
    --border-radius-lg: ${tokens.borderRadiusLG}px;
    --border-radius-sm: ${tokens.borderRadiusSM}px;
  }
`;
