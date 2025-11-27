
import { ThemeStyle, ThemeConfig } from './types';

export const DEFAULT_TEXT = `# 欢迎使用灵感卡片

只需简单几步，将您的灵感文字转化为精美的视觉知识卡片。

## 核心功能
我们为您提供极致的排版体验：

*   **Markdown 支持**：完美渲染列表、引用、代码块与强调文本。
*   **智能分页**：使用 \`##\` 二级标题即可自动将长文拆分为多张卡片。
*   **AI 辅助**：点击底部按钮，AI 自动为您生成封面副标题与核心标签。

## 风格画廊
左侧提供多种设计美学供您选择：

1.  **极光流体**：梦幻的玻璃拟态与流体光效。
2.  **赛博流体**：暗黑科技风，数据流与霓虹光晕。
3.  **复古牛皮**：经典纸质质感，还原手账书写体验。
4.  **先锋杂志**：高对比度排版，时尚的视觉冲击。

## 开始创作
> 灵感稍纵即逝，而好的工具能让它永存。

现在，清除这段文字，开始输入您的第一个想法吧！`;

export const THEMES: Record<ThemeStyle, ThemeConfig> = {
  [ThemeStyle.LIQUID_AURORA]: {
    id: ThemeStyle.LIQUID_AURORA,
    name: '极光流体 (Aurora)',
    bgGradient: 'from-[#FFDEE9] via-[#B5FFFC] to-[#E0C3FC]',
    cardBg: 'bg-white/30 backdrop-blur-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]',
    textColor: 'text-slate-800',
    accentColor: 'text-purple-600',
    fontDisplay: 'font-display',
    fontBody: 'font-sans',
  },
  [ThemeStyle.NEON_NIGHTS]: {
    id: ThemeStyle.NEON_NIGHTS,
    name: '赛博流体 (Cyber)',
    bgGradient: 'from-[#000000] via-[#1a0b2e] to-[#000000]',
    cardBg: 'bg-[#050505] border border-white/10 shadow-[0_0_50px_rgba(139,92,246,0.3)]',
    textColor: 'text-white',
    accentColor: 'text-fuchsia-400',
    fontDisplay: 'font-display font-bold tracking-tight',
    fontBody: 'font-sans leading-relaxed',
  },
  [ThemeStyle.MINIMAL_CLEAN]: {
    id: ThemeStyle.MINIMAL_CLEAN,
    name: '陶瓷白 (Ceramic)',
    bgGradient: 'from-[#eef2f3] to-[#8e9eab]',
    cardBg: 'bg-[#fafafa] shadow-2xl',
    textColor: 'text-gray-800',
    accentColor: 'text-black font-bold',
    fontDisplay: 'font-sans font-black tracking-tight',
    fontBody: 'font-serif',
  },
  [ThemeStyle.NOTE_KRAFT]: {
    id: ThemeStyle.NOTE_KRAFT,
    name: '复古牛皮 (Kraft)',
    bgGradient: 'from-[#4a3b2a] to-[#2c231b]',
    cardBg: 'bg-[#e8dcca] shadow-[2px_5px_15px_rgba(0,0,0,0.25)]', 
    textColor: 'text-[#3e2723]',
    accentColor: 'text-[#6d4c41]', 
    fontDisplay: 'font-serif-sc font-bold',
    fontBody: 'font-serif leading-loose',
    borderColor: 'border-[#8d6e63]/30'
  },
  [ThemeStyle.NOTE_GRID]: {
    id: ThemeStyle.NOTE_GRID,
    name: '数字方格 (Grid)',
    bgGradient: 'from-[#eef2f3] to-[#8e9eab]',
    cardBg: 'bg-white shadow-2xl',
    textColor: 'text-slate-800',
    accentColor: 'text-blue-600',
    fontDisplay: 'font-sans-sc font-semibold',
    fontBody: 'font-mono text-sm leading-relaxed',
    borderColor: 'border-slate-200'
  },
  [ThemeStyle.NOTE_DOT]: {
    id: ThemeStyle.NOTE_DOT,
    name: '点阵手账 (Dot)',
    bgGradient: 'from-[#fdfbf7] to-[#e6e2d3]',
    cardBg: 'bg-[#fbfaf5] shadow-xl',
    textColor: 'text-slate-700',
    accentColor: 'text-slate-900',
    fontDisplay: 'font-sans-sc font-semibold',
    fontBody: 'font-serif leading-relaxed',
    borderColor: 'border-slate-300'
  },
  [ThemeStyle.MODERN_MAGAZINE]: {
    id: ThemeStyle.MODERN_MAGAZINE,
    name: '先锋杂志 (Mag)',
    bgGradient: 'from-[#ffffff] to-[#dcdcdc]',
    cardBg: 'bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]',
    textColor: 'text-black',
    accentColor: 'text-black',
    fontDisplay: 'font-serif-sc font-bold',
    fontBody: 'font-serif font-medium',
    borderColor: 'border-black'
  },
  [ThemeStyle.TECH_BLUEPRINT]: {
    id: ThemeStyle.TECH_BLUEPRINT,
    name: '极客蓝图 (Tech)',
    bgGradient: 'from-[#000000] to-[#0f172a]',
    cardBg: 'bg-[#0f172a]/90 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)]',
    textColor: 'text-cyan-50',
    accentColor: 'text-cyan-400 font-mono',
    fontDisplay: 'font-sans-sc',
    fontBody: 'font-mono text-sm tracking-tight text-slate-300',
    borderColor: 'border-cyan-500/50'
  },
};