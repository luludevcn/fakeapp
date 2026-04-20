// 主题配置
export const theme = {
  // 颜色
  colors: {
    primary: '#FF6B00',
    secondary: '#4CAF50',
    danger: '#F44336',
    warning: '#FF9800',
    info: '#2196F3',
    success: '#4CAF50',
    
    // 背景色
    background: '#F5F5F5',
    surface: '#FFFFFF',
    
    // 文字颜色
    text: {
      primary: '#333333',
      secondary: '#666666',
      tertiary: '#999999',
      white: '#FFFFFF',
    },
    
    // 边框颜色
    border: '#E5E5EA',
    
    // 特殊颜色
    subsidy: '#FF9800',
    subsidyBg: '#FFF3E0',
    orderType: '#2196F3',
    orderTypeBg: '#E3F2FD',
  },
  
  // 字体大小
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
  },
  
  // 间距
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  
  // 圆角
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  
  // 阴影
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
  },
};

export default theme;
