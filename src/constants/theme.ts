import Constants from "expo-constants";

// ─── API ──────────────────────────────────────────────────────────────────────
export const API_URL =
  Constants.expoConfig?.extra?.apiUrl ?? "http://localhost:3000/api/v1";

// ─── Colors ───────────────────────────────────────────────────────────────────
export const Colors = {
  primary: "#4F46E5", // indigo-600
  primaryLight: "#EEF2FF", // indigo-50
  primaryDark: "#3730A3", // indigo-800
  secondary: "#F59E0B", // amber-500
  secondaryLight: "#FFFBEB", // amber-50
  success: "#10B981", // emerald-500
  successLight: "#ECFDF5",
  danger: "#EF4444", // red-500
  dangerLight: "#FEF2F2",
  warning: "#F59E0B",
  warningLight: "#FFFBEB",
  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray600: "#4B5563",
  gray700: "#374151",
  gray800: "#1F2937",
  gray900: "#111827",
  white: "#FFFFFF",
  black: "#000000",
  background: "#F9FAFB",
  surface: "#FFFFFF",
  border: "#E5E7EB",
  text: "#111827",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",
};

// ─── Spacing ──────────────────────────────────────────────────────────────────
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// ─── Border radius ────────────────────────────────────────────────────────────
export const Radius = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  full: 9999,
};

// ─── Font sizes ───────────────────────────────────────────────────────────────
export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  display: 30,
};

// ─── Shadows ──────────────────────────────────────────────────────────────────
export const Shadow = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
};

// ─── Misc ─────────────────────────────────────────────────────────────────────
export const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER: "user",
};

export const PRODUCT_TYPES = [
  "All",
  "Electronics",
  "Audio",
  "Footwear",
  "Clothing",
  "Books",
  "Home",
  "Sports",
];
