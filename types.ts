
export interface CardContent {
  id: string;
  type: 'cover' | 'content';
  title: string;
  body: string; // 封面为摘要，内容页为详情
  index?: number;
  total?: number;
  subtitle?: string;
  tags?: string[];
}

export interface GeneratedData {
  mainTitle: string;
  subtitle: string;
  tags: string[];
  points: {
    title: string;
    content: string;
  }[];
}

export enum ThemeStyle {
  LIQUID_AURORA = 'LIQUID_AURORA',
  MINIMAL_CLEAN = 'MINIMAL_CLEAN',
  NOTE_KRAFT = 'NOTE_KRAFT',
  NOTE_GRID = 'NOTE_GRID',
  NOTE_DOT = 'NOTE_DOT',
  MODERN_MAGAZINE = 'MODERN_MAGAZINE',
  TECH_BLUEPRINT = 'TECH_BLUEPRINT',
  NEON_NIGHTS = 'NEON_NIGHTS',
}

export interface ThemeConfig {
  id: ThemeStyle;
  name: string;
  bgGradient: string; // 整个视图/导出的背景
  cardBg: string; // 卡片容器的特定背景
  textColor: string;
  accentColor: string;
  fontDisplay: string;
  fontBody: string;
  borderColor?: string;
}

export interface CardProps {
  data: CardContent;
  theme: ThemeConfig;
  customHeader?: string;
  customFooter?: string;
  customSubtitle?: string;
  customTags?: string[];
  customIssue?: string;
  customGradientIndex?: number;
  showFrame?: boolean;
}
