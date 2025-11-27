import React, { useState, useEffect } from 'react';
import { toPng } from 'html-to-image';
import JSZip from 'jszip';
import { generateMetadata } from './services/geminiService';
import { CardContent, ThemeStyle } from './types';
import { THEMES, DEFAULT_TEXT } from './constants';
import { Card } from './components/Card';

// 图标
const MagicWandIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 00-1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>;
const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>;
const ChevronLeft = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>;
const ChevronRight = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>;

// 卡片设置图标 (file-sliders)
const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/>
    <path d="M14 2v5a1 1 0 0 0 1 1h5"/>
    <path d="M8 12h8"/>
    <path d="M10 11v2"/>
    <path d="M8 17h8"/>
    <path d="M14 16v2"/>
  </svg>
);

// 单张下载图标 (image-down)
const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21"/>
    <path d="m14 19 3 3v-5.5"/>
    <path d="m17 22 3-3"/>
    <circle cx="9" cy="9" r="2"/>
  </svg>
);

// 打包下载图标 (package)
const ArchiveBoxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/>
    <path d="M12 22V12"/>
    <polyline points="3.29 7 12 12 20.71 7"/>
    <path d="m7.5 4.27 9 5.15"/>
  </svg>
);

const LogoIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className}>
        <defs>
            <linearGradient id="logo-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#f59e0b" /> {/* Amber-500 */}
                <stop offset="100%" stopColor="#d97706" /> {/* Amber-600 */}
            </linearGradient>
            <filter id="logo-shadow" x="-4" y="-4" width="32" height="32" filterUnits="userSpaceOnUse">
                 <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#d97706" floodOpacity="0.2"/>
            </filter>
        </defs>
        <g filter="url(#logo-shadow)">
            {/* Main Circle */}
            <circle cx="12" cy="12" r="10" fill="url(#logo-gradient)" />
            {/* Inner Ring for depth */}
            <circle cx="12" cy="12" r="10" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
            
            {/* Spark Icon in Center (White) */}
            <path d="M12 6L13.5 10.5L18 12L13.5 13.5L12 18L10.5 13.5L6 12L10.5 10.5L12 6Z" fill="white" />
        </g>
    </svg>
);

// 本地存储 Key 定义
const STORAGE_KEYS = {
  INPUT_TEXT: 'lk_input_text',
  CUSTOM_HEADER: 'lk_custom_header',
  CUSTOM_FOOTER: 'lk_custom_footer',
  COVER_SUBTITLE: 'lk_cover_subtitle',
  COVER_TAGS: 'lk_cover_tags',
  CUSTOM_ISSUE: 'lk_custom_issue',
  THEME: 'lk_theme',
  AURORA_GRADIENT: 'lk_aurora_gradient',
  NEON_BG_INDEX: 'lk_neon_bg_index', // 新增：赛博流体背景 Key
  THEME_MODE: 'lk_theme_mode'
};

// 极光流体专属渐变选项 (与 LiquidAuroraCard.tsx 中定义的顺序对应)
const AURORA_GRADIENTS = [
  'bg-gradient-to-tr from-[#e0f2fe] via-[#f3e8ff] to-[#fae8ff]', // 0: 梦幻紫蓝 (Default)
  'bg-gradient-to-br from-[#ff9a9e] via-[#fecfef] to-[#ff9a9e]', // 1: 甜蜜桃粉 (Peach)
  'bg-gradient-to-bl from-[#89f7fe] via-[#66a6ff] to-[#89f7fe]', // 2: 清透海洋 (Ocean)
  'bg-gradient-to-tl from-[#d4fc79] via-[#96e6a1] to-[#d4fc79]', // 3: 清新薄荷 (Mint)
];

// 赛博流体专属背景选项 (预览用)
const NEON_PRESETS = [
    'bg-gradient-to-br from-[#0f172a] to-[#3b82f6]', // 0: 经典蓝紫 (Classic)
    'bg-gradient-to-br from-[#020617] to-[#10b981]', // 1: 矩阵黑绿 (Matrix)
    'bg-gradient-to-br from-[#180404] to-[#ef4444]', // 2: 猩红警告 (Crimson)
    'bg-gradient-to-br from-[#1c1917] to-[#f59e0b]', // 3: 黄金故障 (Golden)
];

// 本地 Markdown 解析函数
const parseMarkdownToCards = (text: string, subtitle: string, tags: string[]): CardContent[] => {
  const lines = text.split('\n');
  let mainTitle = "未命名标题";
  const sections: { title: string; content: string[] }[] = [];
  let currentSection = { title: "", content: [] as string[] };
  
  // 遍历行
  lines.forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('# ')) {
      mainTitle = trimmedLine.replace('# ', '').trim();
    } else if (trimmedLine.startsWith('## ')) {
      // 遇到新的二级标题，归档上一个部分
      if (currentSection.title) {
        sections.push(currentSection);
      }
      // 开始新部分
      currentSection = {
        title: trimmedLine.replace('## ', '').trim(),
        content: []
      };
    } else {
      // 如果已经有章节标题，内容归入该章节
      if (currentSection.title) {
        currentSection.content.push(line);
      }
    }
  });
  
  // 归档最后一个部分
  if (currentSection.title) {
    sections.push(currentSection);
  }

  // 容错处理：如果没有二级标题，尝试将非 H1 内容作为正文
  if (sections.length === 0 && text.trim()) {
      const bodyLines = lines.filter(l => !l.trim().startsWith('# '));
      if (bodyLines.length > 0) {
          sections.push({
              title: "正文内容",
              content: bodyLines
          });
      }
  }
  
  // 构建卡片数据
  const cards: CardContent[] = [];
  
  // 1. 封面卡片
  cards.push({
    id: 'cover',
    type: 'cover',
    title: mainTitle,
    body: subtitle,
    index: 0,
    total: sections.length,
    tags: tags
  });
  
  // 2. 内容卡片
  sections.forEach((sec, i) => {
    cards.push({
      id: `card-${i}`,
      type: 'content',
      title: sec.title,
      body: sec.content.join('\n').trim(),
      index: i + 1,
      total: sections.length
    });
  });
  
  return cards;
};

// 辅助函数：根据主题 ID 渲染圆形预览样式
const renderThemePreview = (themeId: ThemeStyle) => {
    // 通用外框样式：使用 ring-inset 避免溢出锯齿，使用 transform-gpu 提升渲染平滑度
    // 重要：添加 rounded-full 确保边框和背景严格遵循圆形，不出现方形边角
    const commonClasses = "w-full h-full relative overflow-hidden rounded-full ring-1 ring-inset ring-black/5 dark:ring-white/10 transform-gpu";

    switch(themeId) {
        case ThemeStyle.LIQUID_AURORA:
            return (
                <div className={`${commonClasses} bg-gradient-to-tr from-[#e0f2fe] via-[#f3e8ff] to-[#fae8ff]`}>
                    <div className="absolute top-1 left-[-4px] w-6 h-6 bg-purple-300 rounded-full blur-md opacity-70"></div>
                    <div className="absolute bottom-1 right-[-4px] w-6 h-6 bg-blue-300 rounded-full blur-md opacity-70"></div>
                    {/* 添加高光反射，增强玻璃球质感 */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent opacity-80 pointer-events-none"></div>
                </div>
            );
        case ThemeStyle.NEON_NIGHTS:
            return (
                <div className={`${commonClasses} bg-[#050505] border-0`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e293b_0%,#000000_100%)]"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                         {/* 优化光晕边缘，使其更自然 */}
                         <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_2px_rgba(34,211,238,0.5)]"></div>
                    </div>
                </div>
            );
        case ThemeStyle.MINIMAL_CLEAN:
            return (
                <div className={`${commonClasses} bg-[#fafafa]`}>
                    <div className="absolute inset-0 bg-white opacity-50"></div>
                    {/* 简单的几何中心点，代表极简 */}
                    <div className="absolute inset-0 flex items-center justify-center">
                         <div className="w-2.5 h-2.5 bg-gray-200 rounded-sm shadow-inner"></div>
                    </div>
                </div>
            );
        case ThemeStyle.NOTE_KRAFT:
            return (
                <div className={`${commonClasses} bg-[#e8dcca]`}>
                    {/* 使用虚线圆环模拟缝线效果，比单纯的线条更自然 */}
                    <div className="absolute inset-1 rounded-full border border-dashed border-[#8d6e63]/40"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#3e2723] shadow-sm opacity-80"></div>
                    </div>
                </div>
            );
        case ThemeStyle.NOTE_GRID:
            return (
                <div className={`${commonClasses} bg-white`}>
                    {/* 使用 mask-image 实现边缘渐隐 (Vignette)，避免网格硬切 */}
                    <div className="absolute inset-0 opacity-80" style={{ 
                        backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)',
                        backgroundSize: '8px 8px',
                        maskImage: 'radial-gradient(circle, black 40%, transparent 100%)'
                    }}></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-blue-600 rounded-[1px] shadow-sm"></div>
                </div>
            );
        case ThemeStyle.NOTE_DOT:
            return (
                <div className={`${commonClasses} bg-[#fbfaf5]`}>
                     <div className="absolute inset-0 opacity-80" style={{ 
                        backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
                        backgroundSize: '6px 6px',
                        maskImage: 'radial-gradient(circle, black 40%, transparent 100%)'
                    }}></div>
                    {/* 模拟高亮笔触 */}
                    <div className="absolute bottom-2.5 right-2.5 w-4 h-1.5 bg-yellow-300/80 -rotate-12 rounded-full mix-blend-multiply"></div>
                </div>
            );
        case ThemeStyle.MODERN_MAGAZINE:
            return (
                <div className={`${commonClasses} bg-white flex flex-col`}>
                    {/* 优化黑白分割，增加对比度 */}
                    <div className="h-[45%] bg-slate-900 w-full"></div>
                    <div className="flex-1 bg-white relative w-full flex items-center justify-center">
                        <div className="w-4 h-0.5 bg-black"></div>
                    </div>
                </div>
            );
        case ThemeStyle.TECH_BLUEPRINT:
            return (
                <div className={`${commonClasses} bg-[#0f172a]`}>
                    {/* 优化线条精细度 */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-60">
                         <div className="w-full h-[1px] bg-cyan-500/50"></div>
                         <div className="absolute h-full w-[1px] bg-cyan-500/50"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full border border-cyan-400/60"></div>
                    </div>
                </div>
            );
        default:
            return <div className={`${commonClasses} bg-gray-100`}></div>;
    }
}

// Helper to safely get item from localStorage
const safeGetItem = (key: string, defaultValue: string | null = null): string | null => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const storage = window.localStorage;
    return storage.getItem(key) || defaultValue;
  } catch (e) {
    console.warn(`Failed to access localStorage for key ${key} - using default`, e);
    return defaultValue;
  }
};

// Helper to safely set item to localStorage
const safeSetItem = (key: string, value: string) => {
  if (typeof window === 'undefined') return;
  try {
    const storage = window.localStorage;
    storage.setItem(key, value);
  } catch (e) {
    // Cannot write to storage (e.g. quota exceeded or access denied)
    // Silently fail or log warning
    console.warn(`Failed to set localStorage for key ${key}`, e);
  }
};

export default function App() {
  // --- 状态初始化 (带本地存储持久化) ---

  const [inputText, setInputText] = useState(() => 
    safeGetItem(STORAGE_KEYS.INPUT_TEXT, DEFAULT_TEXT)!
  );

  const [customHeader, setCustomHeader] = useState(() => 
    safeGetItem(STORAGE_KEYS.CUSTOM_HEADER, "灵感卡片")!
  );

  const [customFooter, setCustomFooter] = useState(() => 
    safeGetItem(STORAGE_KEYS.CUSTOM_FOOTER, "@LiquidKnows")!
  );

  const [coverSubtitle, setCoverSubtitle] = useState(() => 
    safeGetItem(STORAGE_KEYS.COVER_SUBTITLE, "让灵感触手可及")!
  );

  const [coverTags, setCoverTags] = useState<string[]>(() => {
    const saved = safeGetItem(STORAGE_KEYS.COVER_TAGS);
    try {
      return saved ? JSON.parse(saved) : ["Markdown", "美学设计", "智能排版"];
    } catch {
      return ["Markdown", "美学设计", "智能排版"];
    }
  });

  const [customIssue, setCustomIssue] = useState(() => 
    safeGetItem(STORAGE_KEYS.CUSTOM_ISSUE, "Vol. 25 / Issue 04")!
  );

  const [currentTheme, setCurrentTheme] = useState<ThemeStyle>(() => {
    const saved = safeGetItem(STORAGE_KEYS.THEME);
    // 简单的校验，确保保存的主题在枚举中
    return (saved && Object.values(ThemeStyle).includes(saved as ThemeStyle)) 
      ? (saved as ThemeStyle) 
      : ThemeStyle.LIQUID_AURORA;
  });

  const [auroraGradient, setAuroraGradient] = useState<number>(() => {
    const saved = safeGetItem(STORAGE_KEYS.AURORA_GRADIENT);
    return saved ? parseInt(saved, 10) : 0;
  });

  // 新增：赛博流体背景索引状态
  const [neonBgIndex, setNeonBgIndex] = useState<number>(() => {
    const saved = safeGetItem(STORAGE_KEYS.NEON_BG_INDEX);
    return saved ? parseInt(saved, 10) : 0;
  });

  // --- 暗黑模式逻辑重构 ---
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // 1. 优先检查本地存储
    const savedMode = safeGetItem(STORAGE_KEYS.THEME_MODE);
    if (savedMode) {
      return savedMode === 'dark';
    }
    // 2. 其次检查系统偏好
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    // 3. 默认值 (浅色)
    return false;
  });

  // --- 其他 UI 状态 ---
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false); // 下载状态
  const [cards, setCards] = useState<CardContent[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(0.65); 
  const [showFrame, setShowFrame] = useState(true);

  // --- 持久化 Effects (当状态改变时保存到本地存储) ---

  useEffect(() => {
    safeSetItem(STORAGE_KEYS.INPUT_TEXT, inputText);
  }, [inputText]);

  useEffect(() => {
    safeSetItem(STORAGE_KEYS.CUSTOM_HEADER, customHeader);
  }, [customHeader]);

  useEffect(() => {
    safeSetItem(STORAGE_KEYS.CUSTOM_FOOTER, customFooter);
  }, [customFooter]);

  useEffect(() => {
    safeSetItem(STORAGE_KEYS.COVER_SUBTITLE, coverSubtitle);
  }, [coverSubtitle]);

  useEffect(() => {
    safeSetItem(STORAGE_KEYS.COVER_TAGS, JSON.stringify(coverTags));
  }, [coverTags]);

  useEffect(() => {
    safeSetItem(STORAGE_KEYS.CUSTOM_ISSUE, customIssue);
  }, [customIssue]);

  useEffect(() => {
    safeSetItem(STORAGE_KEYS.THEME, currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    safeSetItem(STORAGE_KEYS.AURORA_GRADIENT, auroraGradient.toString());
  }, [auroraGradient]);

  useEffect(() => {
    safeSetItem(STORAGE_KEYS.NEON_BG_INDEX, neonBgIndex.toString());
  }, [neonBgIndex]);


  // 处理全局暗黑模式样式
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // 处理主题切换并保存
  const toggleThemeMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    safeSetItem(STORAGE_KEYS.THEME_MODE, newMode ? 'dark' : 'light');
  };

  // 核心逻辑：实时根据输入内容更新卡片
  // 只有当 inputText, coverSubtitle, 或 coverTags 变化时，重新解析生成卡片
  useEffect(() => {
    const newCards = parseMarkdownToCards(inputText, coverSubtitle, coverTags);
    setCards(newCards);
    // 确保当前页索引不越界
    setActiveIndex(prev => Math.min(prev, Math.max(0, newCards.length - 1)));
  }, [inputText, coverSubtitle, coverTags]);

  // 点击生成按钮：仅请求 AI 生成 Metadata (Subtitle & Tags)
  const handleGenerateClick = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    
    try {
        const metadata = await generateMetadata(inputText);
        setCoverSubtitle(metadata.subtitle);
        setCoverTags(metadata.tags);
        // 注意：cards 的更新由 useEffect 自动处理
        setActiveIndex(0);
    } catch (e) {
      console.error(e);
      alert("生成元数据失败，请检查 API Key");
    } finally {
      setIsLoading(false);
    }
  };

  // --- 下载逻辑 (Updated to use html-to-image) ---
  const downloadElementAsImage = async (elementId: string, fileName: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    // 确保字体已加载
    await document.fonts.ready;

    try {
      const dataUrl = await toPng(element, {
        cacheBust: false, // Changed to false to avoid CORS issues with cached fonts
        pixelRatio: 2, // 2x 缩放以获得更高清晰度 (Retina ready)
        backgroundColor: null, // 保持透明度
      });
      const link = document.createElement('a');
      link.download = fileName;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Image capture failed", error);
    }
  };

  const handleDownloadCurrent = async () => {
    setIsDownloading(true);
    // 使用 requestAnimationFrame 给 UI 一点时间更新状态
    requestAnimationFrame(async () => {
        const cardId = `export-card-${activeIndex}`;
        const fileName = `liquid-card-${activeIndex + 1}.png`;
        await downloadElementAsImage(cardId, fileName);
        setIsDownloading(false);
    });
  };

  const handleDownloadAll = async () => {
    setIsDownloading(true);
    requestAnimationFrame(async () => {
        const zip = new JSZip();
        
        // 确保字体已加载
        await document.fonts.ready;

        for (let i = 0; i < cards.length; i++) {
            const cardId = `export-card-${i}`;
            const element = document.getElementById(cardId);
            if (element) {
                try {
                    const dataUrl = await toPng(element, {
                        cacheBust: false, // Changed to false here as well
                        pixelRatio: 2,
                        backgroundColor: null,
                    });
                    
                    // 去掉 data:image/png;base64, 前缀
                    const base64Data = dataUrl.split(',')[1];
                    zip.file(`card-${i + 1}.png`, base64Data, { base64: true });
                } catch (err) {
                    console.error(`Failed to capture card ${i}`, err);
                }
            }
        }
        
        try {
            const content = await zip.generateAsync({ type: 'blob' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = 'liquid-cards-pack.zip';
            link.click();
        } catch (err) {
             console.error("Zip generation failed", err);
        } finally {
            setIsDownloading(false);
        }
    });
  };

  const handlePrev = () => {
    setActiveIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveIndex(prev => Math.min(cards.length - 1, prev + 1));
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row overflow-hidden font-sans bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      
      {/* 隐藏的导出容器：渲染所有卡片，用于下载截图 */}
      {/* 
          修复：使用 fixed 定位 + top 0 + left 0 + z-index -9999
          html-to-image 也需要元素在 DOM 中并且渲染正确。Fixed 定位可以避免布局偏移。
      */}
      <div 
        id="export-container" 
        style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            zIndex: -9999,
            width: '800px', // 这里的宽度必须固定，对应卡片原始尺寸
            pointerEvents: 'none',
            visibility: 'visible' // 必须可见
        }}
      >
        {cards.map((card, i) => (
            <div key={`export-${i}`} id={`export-card-${i}`} className="w-[800px] h-[1200px] mb-10">
                <Card 
                  data={card} 
                  theme={THEMES[currentTheme]} 
                  customHeader={customHeader}
                  customFooter={customFooter}
                  customSubtitle={coverSubtitle}
                  customTags={coverTags}
                  customIssue={customIssue}
                  // 动态传递背景索引：根据当前主题判断传哪个索引
                  customGradientIndex={currentTheme === ThemeStyle.LIQUID_AURORA ? auroraGradient : (currentTheme === ThemeStyle.NEON_NIGHTS ? neonBgIndex : 0)}
                  showFrame={showFrame}
                />
            </div>
        ))}
      </div>

      {/* 左侧面板：输入、主题和生成 - 赛博玻璃风格 (使用黄色调) */}
      <div className="w-full lg:w-[400px] flex flex-col h-screen z-20 relative overflow-hidden
           bg-white/30 dark:bg-[#050505]/60 backdrop-blur-3xl
           border-r border-white/20 dark:border-white/10
           shadow-[20px_0_50px_rgba(0,0,0,0.15)]"
      >
        {/* 环境背景特效 - 调整为暖色系 */}
        <div className="absolute top-[-10%] left-[-50%] w-[400px] h-[400px] bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-50%] w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

        {/* 头部 */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center flex-shrink-0 relative z-10">
          <div className="flex items-center gap-3">
            {/* Logo: 无背景，直接使用优化后的 Icon */}
            <LogoIcon className="w-9 h-9 drop-shadow-md" />
            {/* 应用名称 */}
            <h1 className="text-2xl font-bold font-display tracking-tight text-slate-800 dark:text-white">灵感卡片</h1>
          </div>
          <button 
            onClick={toggleThemeMode}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-colors"
          >
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        {/* 主要内容 Flex 容器 */}
        <div className="flex-1 flex flex-col min-h-0 relative z-10">
          
          {/* 1. 内容输入 - 填充可用空间 */}
          <div className="flex-1 flex flex-col p-6 pb-4 min-h-[150px]">
            <label className="block text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                {/* 装饰点改为黄色 */}
                <div className="w-1 h-1 rounded-full bg-yellow-400" />
                内容输入 (Content)
            </label>
            <div className="flex-1 relative group">
               {/* 聚焦光晕改为黄色/橙色 */}
               <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
               <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="relative w-full h-full bg-white/40 dark:bg-black/40 border border-white/40 dark:border-white/10 rounded-xl p-4 text-sm leading-relaxed focus:ring-2 focus:ring-yellow-400/50 focus:outline-none resize-none transition-all placeholder-slate-400 font-mono backdrop-blur-sm"
                placeholder="# 标题&#10;简介...&#10;&#10;## 章节标题&#10;章节内容..."
              />
            </div>
          </div>
          
          {/* 2. 主题选择 - 底部对齐 */}
          <div className="flex-shrink-0 p-6 pt-2">
            <label className="block text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                {/* 装饰点改为琥珀色 */}
                <div className="w-1 h-1 rounded-full bg-amber-400" />
                设计风格 (Visual Style)
            </label>
            <div className="grid grid-cols-2 gap-3 overflow-y-auto max-h-[35vh] pr-1 scrollbar-thin scrollbar-thumb-slate-700/50">
              {Object.values(THEMES).map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setCurrentTheme(theme.id)}
                  className={`group relative flex flex-row items-center gap-3 p-3 rounded-xl border transition-all duration-200 overflow-hidden text-left h-full backdrop-blur-md shadow-sm
                    ${currentTheme === theme.id 
                      // 选中状态改为黄色/琥珀色系
                      ? 'border-yellow-400 bg-yellow-50/90 ring-1 ring-yellow-400 dark:border-yellow-500/50 dark:bg-yellow-500/10 dark:ring-yellow-500/50' 
                      : 'bg-white/80 border-slate-200/80 hover:bg-white hover:border-yellow-400/50 hover:shadow-md dark:bg-white/5 dark:border-white/10 dark:hover:border-white/30 dark:hover:bg-white/10'
                    }`}
                >
                  {/* 圆形预览展示 */}
                  <div className={`w-10 h-10 rounded-full flex-shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105 ring-1 ring-black/5 dark:ring-white/10`}>
                      {renderThemePreview(theme.id)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <span className={`block font-bold text-sm truncate ${currentTheme === theme.id ? 'text-amber-700 dark:text-amber-300' : 'text-slate-800 dark:text-slate-200'}`}>
                      {theme.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* 底部操作区 */}
        <div className="p-6 border-t border-white/10 bg-white/5 backdrop-blur-md flex-shrink-0 relative z-10">
          <button
            onClick={handleGenerateClick}
            disabled={isLoading || !inputText}
            // 按钮改为黄/橙色渐变，文字改为深色以保证在浅黄背景上的可读性
            className="w-full py-3.5 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-900 font-bold rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base tracking-wide ring-1 ring-white/20"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                正在生成元数据...
              </>
            ) : (
              <>
                <MagicWandIcon />
                更新卡片
              </>
            )}
          </button>
        </div>
      </div>

      {/* 中间面板：卡片预览 */}
      <div className="flex-1 relative h-screen bg-slate-200 dark:bg-[#050505] flex flex-col justify-center items-center overflow-hidden">
        
        {/* 背景氛围 - 调整为暖色系 */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-orange-500/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-yellow-500/10 rounded-full blur-[120px] animate-pulse delay-75" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </div>

        {/* 中央舞台 */}
        <div className="relative z-10 w-full h-full flex items-center justify-center lg:pr-[400px]">
          
          {/* 缩放工具栏 */}
          <div className="absolute top-8 left-0 w-full lg:pr-[400px] z-[1000] flex justify-center pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-xl">
                <span className="text-xs font-bold uppercase text-slate-500">缩放 (Zoom)</span>
                <input 
                  type="range" 
                  min="0.3" 
                  max="0.9" 
                  step="0.05" 
                  value={zoom} 
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  // 进度条颜色改为黄色/琥珀色
                  className="w-32 accent-amber-500 cursor-pointer"
                />
                <span className="text-xs font-mono w-8 text-right">{Math.round(zoom * 100)}%</span>
            </div>
          </div>

          {cards.length === 0 && !isLoading ? (
             <div className="text-slate-400 flex flex-col items-center animate-pulse">
               <div className="w-20 h-20 mb-6 border-2 border-dashed border-slate-600 rounded-2xl flex items-center justify-center bg-slate-800/20">
                  <span className="text-3xl text-slate-500">+</span>
               </div>
               <p className="text-2xl font-medium tracking-tight text-slate-500">输入内容以预览</p>
             </div>
          ) : (
            <>
              {/* 导航 - 左 */}
              <button 
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className="absolute left-8 z-50 p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white disabled:opacity-0 disabled:pointer-events-none transition-all shadow-lg"
              >
                <ChevronLeft />
              </button>

              {/* 卡片堆叠容器 */}
              <div className="relative flex items-center justify-center w-[800px] h-[1200px]">
                {cards.map((card, index) => {
                   // 计算可见范围
                   const offset = index - activeIndex;
                   if (offset < 0 || offset > 3) return null;

                   // 堆叠计算
                   const scale = zoom * (1 - (offset * 0.05));
                   const translateY = offset * 50; 
                   const opacity = 1 - (offset * 0.15);
                   const zIndex = 50 - offset;

                   return (
                     <div 
                        key={card.id} 
                        className="absolute top-0 left-0 transition-all duration-500 ease-out origin-center shadow-2xl will-change-transform"
                        style={{
                           transform: `scale(${scale}) translateY(${translateY}px)`, 
                           opacity: opacity,
                           zIndex: zIndex,
                           pointerEvents: offset === 0 ? 'auto' : 'none',
                           width: 800,
                           height: 1200
                        }}
                     >
                        <Card 
                          data={card} 
                          theme={THEMES[currentTheme]} 
                          customHeader={customHeader}
                          customFooter={customFooter}
                          customSubtitle={coverSubtitle}
                          customTags={coverTags}
                          customIssue={customIssue}
                          // 动态传递背景索引：根据当前主题判断传哪个索引
                          customGradientIndex={currentTheme === ThemeStyle.LIQUID_AURORA ? auroraGradient : (currentTheme === ThemeStyle.NEON_NIGHTS ? neonBgIndex : 0)}
                          showFrame={showFrame}
                        />
                     </div>
                   )
                })}
              </div>

              {/* 导航 - 右 */}
              <button 
                onClick={handleNext}
                disabled={activeIndex === cards.length - 1}
                className="absolute right-8 lg:right-[432px] z-50 p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white disabled:opacity-0 disabled:pointer-events-none transition-all shadow-lg"
              >
                <ChevronRight />
              </button>

              {/* 分页点 */}
              <div className="absolute bottom-12 flex gap-2 z-50">
                {cards.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all shadow-sm ${
                      idx === activeIndex 
                        ? 'bg-white w-6' 
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* 右侧面板：设置（悬浮玻璃组件） */}
          <div className="hidden lg:flex w-[360px] flex-col z-40 absolute right-10 top-10 bottom-10
              bg-white/10 dark:bg-black/20 backdrop-blur-3xl 
              border border-white/20 dark:border-white/10 
              shadow-[0_10px_20px_rgba(0,0,0,0.10)]
              rounded-[2.5rem] overflow-hidden"
          >
              {/* 环境背景特效 - 暖色 */}
              <div className="absolute top-[-20%] right-[-20%] w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen" />
              <div className="absolute bottom-[-20%] left-[-20%] w-[300px] h-[300px] bg-yellow-500/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen" />
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay pointer-events-none" />

              {/* 内容 - 可滚动 */}
              <div className="relative z-10 flex flex-col h-full overflow-y-auto scrollbar-hide p-8 pt-10">
                <h2 className="text-2xl font-bold mb-8 text-slate-800 dark:text-white flex items-center gap-4 tracking-tight">
                    <SettingsIcon />
                    卡片设置
                </h2>

                {/* 显示边框切换 */}
                <div className="mb-8 p-6 rounded-[1.5rem] bg-white/40 dark:bg-white/5 border border-white/40 dark:border-white/10 shadow-lg backdrop-blur-md group hover:bg-white/50 dark:hover:bg-white/10 transition-all">
                    <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">显示边框</label>
                        <button 
                        onClick={() => setShowFrame(!showFrame)}
                        // 切换开关颜色改为黄色/琥珀色
                        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all focus:outline-none border border-transparent ${showFrame ? 'bg-gradient-to-r from-yellow-400 to-amber-500 border-white/20 shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'bg-slate-300 dark:bg-slate-600'}`}
                        >
                        <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm ${showFrame ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 font-medium opacity-80">
                        为卡片添加风格化的纹理外框和装饰细节。
                    </p>
                </div>

                {/* 文本内容设置 */}
                <div className="mb-8 space-y-4 border-t border-white/40 dark:border-white/10 pt-6">                     
                    {/* 顶部标题文本 */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">顶部标题</label>
                        <input 
                            type="text" 
                            value={customHeader}
                            onChange={(e) => setCustomHeader(e.target.value)}
                            // 聚焦环改为黄色
                            className="w-full bg-white/40 dark:bg-black/20 border border-white/40 dark:border-white/10 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-yellow-400/50 focus:outline-none transition-all"
                            placeholder="输入标题..."
                        />
                    </div>

                    {/* 底部署名文本 */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">底部署名</label>
                        <input 
                            type="text" 
                            value={customFooter}
                            onChange={(e) => setCustomFooter(e.target.value)}
                            className="w-full bg-white/40 dark:bg-black/20 border border-white/40 dark:border-white/10 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-yellow-400/50 focus:outline-none transition-all"
                            placeholder="输入署名..."
                        />
                    </div>

                    {/* 封面副标题 */}
                    <div className="space-y-2 pt-4 border-t border-white/20">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">封面副标题</label>
                        <textarea 
                            rows={3}
                            value={coverSubtitle}
                            onChange={(e) => setCoverSubtitle(e.target.value)}
                            className="w-full bg-white/40 dark:bg-black/20 border border-white/40 dark:border-white/10 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-yellow-400/50 focus:outline-none transition-all resize-none"
                            placeholder="封面副标题..."
                        />
                    </div>

                     {/* 封面标签 */}
                     <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">封面标签 (逗号分隔)</label>
                        <input 
                            type="text" 
                            value={coverTags.join(", ")}
                            onChange={(e) => setCoverTags(e.target.value.split(",").map(t => t.trim()))}
                            className="w-full bg-white/40 dark:bg-black/20 border border-white/40 dark:border-white/10 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-yellow-400/50 focus:outline-none transition-all"
                            placeholder="标签1, 标签2, 标签3"
                        />
                    </div>

                    {/* 极光流体专属设置：边框渐变 */}
                    {currentTheme === ThemeStyle.LIQUID_AURORA && (
                         <div className="space-y-3 pt-4 border-t border-white/20">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">流体氛围 (Aura)</label>
                            <div className="flex flex-wrap gap-4">
                                {AURORA_GRADIENTS.map((gradient, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setAuroraGradient(idx)}
                                        className={`relative w-10 h-10 rounded-full transition-all duration-300 shadow-sm overflow-hidden group ${
                                            auroraGradient === idx 
                                            // 极光渐变的选中环保持与极光主题协调，但也可以微调为通用黄色，这里为了区分建议保持蓝色或者改为中性
                                            ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-white/10 scale-110' 
                                            : 'hover:scale-105 opacity-80 hover:opacity-100'
                                        }`}
                                    >
                                        <div className={`absolute inset-0 ${gradient}`} />
                                        {auroraGradient === idx && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-1.5 h-1.5 bg-white rounded-full shadow-md" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                         </div>
                    )}

                    {/* 赛博流体专属设置：背景风格 */}
                    {currentTheme === ThemeStyle.NEON_NIGHTS && (
                         <div className="space-y-3 pt-4 border-t border-white/20">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">霓虹基调 (Neon Base)</label>
                            <div className="flex flex-wrap gap-4">
                                {NEON_PRESETS.map((gradient, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setNeonBgIndex(idx)}
                                        className={`relative w-10 h-10 rounded-full transition-all duration-300 shadow-sm overflow-hidden group border border-white/10 ${
                                            neonBgIndex === idx 
                                            ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-black scale-110' 
                                            : 'hover:scale-105 opacity-80 hover:opacity-100'
                                        }`}
                                    >
                                        <div className={`absolute inset-0 ${gradient}`} />
                                        {neonBgIndex === idx && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-1.5 h-1.5 bg-white rounded-full shadow-md shadow-cyan-500/50" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                         </div>
                    )}

                    {/* 先锋杂志专属设置 */}
                    {currentTheme === ThemeStyle.MODERN_MAGAZINE && (
                        <div className="space-y-2 pt-4 border-t border-white/20">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">期刊编号 (Issue)</label>
                            <input 
                                type="text" 
                                value={customIssue}
                                onChange={(e) => setCustomIssue(e.target.value)}
                                className="w-full bg-white/40 dark:bg-black/20 border border-white/40 dark:border-white/10 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-black/50 focus:outline-none transition-all"
                                placeholder="Vol. 25 / Issue 04"
                            />
                        </div>
                    )}

                </div>
                
                {/* 底部下载与导出区域 */}
                <div className="mt-auto pt-6 border-t border-white/20 dark:border-white/10 space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">下载与导出 (Export)</label>
                    <div className="flex gap-3">
                        <button
                            onClick={handleDownloadCurrent}
                            disabled={isDownloading || cards.length === 0}
                            className="flex-1 flex items-center justify-center gap-2 bg-white/40 dark:bg-white/10 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 border border-white/40 dark:border-white/10 hover:border-yellow-400/50 py-3 rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
                            title="保存当前卡片"
                        >
                             <DownloadIcon />
                             <span className="text-xs font-bold text-slate-700 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400">保存当前卡片</span>
                        </button>
                        
                        <button
                            onClick={handleDownloadAll}
                            disabled={isDownloading || cards.length === 0}
                            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-br from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-white shadow-lg shadow-orange-500/20 py-3 rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="打包下载所有卡片"
                        >
                             <ArchiveBoxIcon />
                             <span className="text-xs font-bold">保存所有卡片</span>
                        </button>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 text-center relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    <p className="text-xs text-slate-400/50 uppercase tracking-[0.4em] font-bold cursor-default hover:text-slate-400 transition-colors">
                        灵感卡片
                    </p>
                </div>
              </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}