import type { ThemeConfig } from "antd";

export const AppTheme = {
  primary: "#0191B4",
  primaryLight: "#afdeaa",
  primaryChat: "#0191B4",
  primaryChatLighter: "#45B7D2",
  highlight: "#f8fafc",
  secondary: "#F9AD6A",
  secondaryDark: "#4a707a",
  success: "#52c41a",
  bgColor: {
    primaryLight: "#ebf5ffc4",
  },
};

// antd theme
export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: AppTheme.primary,
    // colorPrimaryBg: "#fff",
    colorSuccess: AppTheme.success,
    colorError: "#ff4d4f",
    colorWarning: "#faad14",
    colorTextBase: "#000",
    colorTextSecondary: "#595959",
    // colorBgBase: "#fff",
  },
  components: {
    Card: {
      borderRadius: 8,
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    },
    Table: {
      borderRadius: 8,
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      padding: 6,
      headerBg: AppTheme.bgColor.primaryLight,
    },
    Button: {
      borderRadius: 8,
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      colorPrimary: AppTheme.primary,
      colorPrimaryBg: AppTheme.primaryLight,
      colorPrimaryBorderHover: AppTheme.primary,
    },
    Select: {
      borderRadius: 8,
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      padding: 0,
      margin: 0,
    },
  },
};
