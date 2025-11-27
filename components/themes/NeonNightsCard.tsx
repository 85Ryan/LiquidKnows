
import React from 'react';
import { CardProps } from '../../types';
import { MarkdownRenderer } from '../MarkdownRenderer';

export const NeonNightsCard: React.FC<CardProps> = ({ 
  data, 
  theme, 
  customHeader, 
  customFooter, 
  customSubtitle,
  customTags,
  customGradientIndex = 0,
  showFrame = false 
}) => {
  const isCover = data.type === 'cover';
  const index = data.index || 0;
  
  // 该主题始终渲染背景以保持美学风格
  const shouldRenderBackground = true;

  // 定义 4 种背景变体
  const VARIANTS = [
    {
        // 0: Classic Cyber (Blue/Purple/Cyan)
        bg: 'bg-[#030305]',
        radial: 'bg-[radial-gradient(circle_at_50%_50%,#0f172a_0%,#000000_100%)]',
        blob1: 'bg-[#3b82f6]', // Blue
        blob2: 'bg-[#d946ef]', // Fuchsia
        blob3: 'bg-[#2dd4bf]', // Teal
        accentMain: 'text-cyan-300',
        accentSec: 'text-fuchsia-300',
        borderGradient: 'from-cyan-400 to-transparent',
        tagBg: 'bg-[#0f172a]/60',
        tagBorder: 'border-cyan-500/30 hover:border-cyan-400/60',
        // List styling
        ulBullet: 'before:text-fuchsia-400',
        olMarker: 'marker:text-cyan-400',
        h3Decoration: 'border-fuchsia-500 from-fuchsia-500/10',
        // Markdown styles
        blockquoteBorder: 'border-cyan-400',
        blockquoteBg: 'bg-cyan-950/30',
        codeBg: 'bg-cyan-900/40',
        codeText: 'text-cyan-300',
        codeBorder: 'border-cyan-500/30'
    },
    {
        // 1: Matrix (Green/Emerald/Lime)
        bg: 'bg-[#020602]',
        radial: 'bg-[radial-gradient(circle_at_50%_50%,#064e3b_0%,#000000_100%)]',
        blob1: 'bg-[#22c55e]', // Green
        blob2: 'bg-[#10b981]', // Emerald
        blob3: 'bg-[#4ade80]', // Light Green
        accentMain: 'text-green-300',
        accentSec: 'text-emerald-300',
        borderGradient: 'from-green-400 to-transparent',
        tagBg: 'bg-[#022c22]/60',
        tagBorder: 'border-green-500/30 hover:border-green-400/60',
        // List styling
        ulBullet: 'before:text-green-400',
        olMarker: 'marker:text-emerald-400',
        h3Decoration: 'border-green-500 from-green-500/10',
        // Markdown styles
        blockquoteBorder: 'border-green-400',
        blockquoteBg: 'bg-green-950/30',
        codeBg: 'bg-green-900/40',
        codeText: 'text-green-300',
        codeBorder: 'border-green-500/30'
    },
    {
        // 2: Crimson (Red/Orange/Rose)
        bg: 'bg-[#0f0202]',
        radial: 'bg-[radial-gradient(circle_at_50%_50%,#450a0a_0%,#000000_100%)]',
        blob1: 'bg-[#ef4444]', // Red
        blob2: 'bg-[#f97316]', // Orange
        blob3: 'bg-[#dc2626]', // Dark Red
        accentMain: 'text-red-300',
        accentSec: 'text-orange-300',
        borderGradient: 'from-red-400 to-transparent',
        tagBg: 'bg-[#450a0a]/60',
        tagBorder: 'border-red-500/30 hover:border-red-400/60',
        // List styling
        ulBullet: 'before:text-red-400',
        olMarker: 'marker:text-orange-400',
        h3Decoration: 'border-red-500 from-red-500/10',
        // Markdown styles
        blockquoteBorder: 'border-red-400',
        blockquoteBg: 'bg-red-950/30',
        codeBg: 'bg-red-900/40',
        codeText: 'text-red-300',
        codeBorder: 'border-red-500/30'
    },
    {
        // 3: Golden (Amber/Yellow/Gold)
        bg: 'bg-[#0c0a00]',
        radial: 'bg-[radial-gradient(circle_at_50%_50%,#451a03_0%,#000000_100%)]',
        blob1: 'bg-[#eab308]', // Yellow
        blob2: 'bg-[#d97706]', // Amber
        blob3: 'bg-[#fcd34d]', // Gold
        accentMain: 'text-amber-300',
        accentSec: 'text-yellow-300',
        borderGradient: 'from-amber-400 to-transparent',
        tagBg: 'bg-[#451a03]/60',
        tagBorder: 'border-amber-500/30 hover:border-amber-400/60',
        // List styling
        ulBullet: 'before:text-amber-400',
        olMarker: 'marker:text-yellow-400',
        h3Decoration: 'border-amber-500 from-amber-500/10',
        // Markdown styles
        blockquoteBorder: 'border-amber-400',
        blockquoteBg: 'bg-amber-950/30',
        codeBg: 'bg-amber-900/40',
        codeText: 'text-amber-300',
        codeBorder: 'border-amber-500/30'
    }
  ];

  const variant = VARIANTS[customGradientIndex] || VARIANTS[0];

  // -- 背景层 --
  const renderFrameBackground = () => (
    <div className={`absolute inset-0 ${variant.bg} overflow-hidden`}>
       {/* 深空基底 */}
       <div className={`absolute inset-0 ${variant.radial}`} />
       
       {/* 动态流体光球 */}
       <div className={`absolute top-[-10%] left-[-10%] w-[80%] h-[60%] rounded-full ${variant.blob1} blur-[150px] opacity-20 animate-blob mix-blend-screen`} />
       <div className={`absolute bottom-[-10%] right-[-10%] w-[80%] h-[60%] rounded-full ${variant.blob2} blur-[150px] opacity-20 animate-blob animation-delay-4000 mix-blend-screen`} />
       <div className={`absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full ${variant.blob3} blur-[120px] opacity-10 animate-blob animation-delay-2000 mix-blend-screen`} />

       {/* 网格与纹理 */}
       <div className="absolute inset-0 opacity-[0.15]" 
            style={{ 
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} 
       />
       {/* 扫描线 */}
       <div className="absolute inset-0 pointer-events-none opacity-20" style={{
          background: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.8) 50%)',
          backgroundSize: '100% 4px',
       }} />
       {/* 噪点纹理 */}
       <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
    </div>
  );

  // -- 装饰元素层（卡片内部） --
  const renderDecorations = () => (
    <>
      {/* 光泽 */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none z-0" />
      
      {/* 角落支架 - 颜色跟随变体主色 */}
      <div className={`absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 opacity-50 ${variant.accentMain.replace('text-', 'border-')}`} />
      <div className={`absolute top-6 right-6 w-4 h-4 border-t-2 border-r-2 opacity-50 ${variant.accentSec.replace('text-', 'border-')}`} />
      <div className={`absolute bottom-6 left-6 w-4 h-4 border-b-2 border-l-2 opacity-50 ${variant.accentMain.replace('text-', 'border-')}`} />
      <div className={`absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 opacity-50 ${variant.accentSec.replace('text-', 'border-')}`} />

      {/* 侧边装饰线 */}
      <div className={`absolute top-1/2 left-0 -translate-y-1/2 w-0.5 h-24 bg-gradient-to-b from-transparent via-current to-transparent opacity-50 ${variant.accentMain}`} />
      <div className={`absolute top-1/2 right-0 -translate-y-1/2 w-0.5 h-24 bg-gradient-to-b from-transparent via-current to-transparent opacity-50 ${variant.accentSec}`} />
    </>
  );

  const radiusClass = showFrame ? "rounded-[2rem]" : "rounded-none";
  // 高级玻璃拟态容器
  const containerClass = `relative w-full h-full overflow-hidden transition-all duration-300 bg-[#0a0a0c]/60 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] ${radiusClass} border border-white/10`;

  return (
    <div className={`relative w-[800px] h-[1200px] flex-shrink-0 overflow-hidden transition-all duration-500 ${!shouldRenderBackground ? theme.bgGradient : ''} shadow-2xl text-left`}>
      {shouldRenderBackground && renderFrameBackground()}
      
      <div className={`absolute inset-0 ${showFrame ? 'p-16' : 'p-0'} transition-all duration-300 flex items-center justify-center z-30`}>
        <div className={containerClass}>
            {/* 卡片边框后的发光 */}
            <div className="absolute inset-0 rounded-[2rem] opacity-50 pointer-events-none mix-blend-overlay"
                 style={{ boxShadow: 'inset 0 0 60px rgba(255,255,255,0.05)' }} 
            />

            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              {renderDecorations()}
            </div>

            <div className="relative z-10 h-full flex flex-col p-10">
                
                {/* --- 头部 --- */}
                <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6 relative">
                     {/* Logo / 品牌区域 */}
                     <div className="flex items-center gap-4">
                         <div className={`relative w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]`}>
                             <div className={`absolute inset-0 blur-md rounded-lg animate-pulse opacity-40 ${variant.blob1}`} />
                             <svg className={`w-5 h-5 relative z-10 ${variant.accentMain}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                         </div>
                         <div className="flex flex-col">
                             <span className="font-display font-bold text-lg tracking-wider text-white leading-none">
                                 {customHeader?.toUpperCase() || "GEMINI"}
                             </span>
                             <span className={`font-mono text-[9px] tracking-[0.3em] mt-1 ${variant.accentMain}`}>
                                 SYSTEM.VER.2.5
                             </span>
                         </div>
                     </div>

                     {/* 右上角科技数据 */}
                     <div className="text-right flex flex-col items-end">
                         <div className="flex items-center gap-2 mb-1">
                             <span className={`w-1.5 h-1.5 rounded-full animate-ping ${variant.blob2.replace('bg-', 'bg-')}`} />
                             <span className={`font-mono text-xs font-bold ${variant.accentSec}`}>LIVE</span>
                         </div>
                         <div className="font-mono text-[8px] text-slate-400 tracking-widest uppercase">
                             ID: {Math.random().toString(36).substring(2, 8).toUpperCase()}
                         </div>
                     </div>
                </div>

                {/* --- 主要内容区域 --- */}
                <div className="flex-1 flex flex-col justify-center relative z-20">
                    {isCover ? (
                      <div className="flex flex-col h-full justify-center relative px-2">
                        {/* 封面背景装饰数字 */}
                        <div className="absolute right-[-20px] top-[-40px] text-[200px] font-black text-white/5 font-display select-none pointer-events-none z-0 leading-none">
                            00
                        </div>

                        <div className="relative z-10">
                            {/* 顶部装饰标签 */}
                            <div className={`inline-flex items-center gap-2 px-3 py-1 mb-6 border border-white/10 rounded-sm bg-black/40 backdrop-blur-sm shadow-[0_0_10px_rgba(0,0,0,0.5)]`}>
                                <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${variant.blob1}`} />
                                <span className={`text-xs font-bold tracking-wider font-sans-sc ${variant.accentMain}`}>FEATURED REPORT</span>
                            </div>
                            
                            {/* 大标题 */}
                            <h1 className="text-[60px] leading-[1.6] mb-6 font-semibold text-white font-sans-sc drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                              {data.title}
                            </h1>

                            {/* 副标题 */}
                            <div className={`relative pl-6 border-l-[3px] border-gradient-to-b ${variant.borderGradient} border-white/20 mb-12`}>
                                <div className={`absolute left-[-3px] top-0 w-[3px] h-8 ${variant.blob1}`} />
                                <p className="text-[32px] leading-[1.6] text-white/90 font-medium font-sans-sc opacity-95 drop-shadow-sm">
                                  {customSubtitle || data.body}
                                </p>
                            </div>

                            {/* 标签 */}
                            {customTags && customTags.length > 0 && (
                                <div className="flex flex-wrap gap-4 mt-4">
                                    {customTags.map((tag, i) => (
                                        <div key={i} className="group relative">
                                            <div className={`absolute inset-0 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${variant.blob1}`} />
                                            <div className={`relative px-5 py-2.5 backdrop-blur-md rounded-sm flex items-center gap-3 transition-all duration-300 hover:-translate-y-1 ${variant.tagBg} ${variant.tagBorder} border`}>
                                                <div className="flex flex-col gap-[2px]">
                                                    <div className={`w-1 h-1 rounded-full opacity-50 ${variant.blob1}`} />
                                                    <div className={`w-1 h-1 rounded-full ${variant.blob1}`} />
                                                    <div className={`w-1 h-1 rounded-full opacity-50 ${variant.blob1}`} />
                                                </div>
                                                <span className="text-[20px] text-white/90 font-sans-sc tracking-wider">
                                                    {tag}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col h-full pt-4 relative">
                         <div className="mb-8 relative z-10">
                           <div className="flex items-baseline gap-4 mb-4">
                               <span className="font-mono text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent">
                                   {String(index).padStart(2, '0')}
                               </span>
                               <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                           </div>
                           
                           <h2 className={`text-[40px] leading-[1.5] font-semibold text-white drop-shadow-lg ${theme.fontDisplay}`}>
                             {data.title}
                           </h2>
                         </div>

                         {/* 内容卡片 */}
                         <div className="flex-1 relative rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-10 shadow-2xl backdrop-blur-md overflow-hidden flex flex-col">
                            {/* 内部发光效果 - 跟随变体颜色 */}
                            <div className={`absolute top-0 right-0 w-[300px] h-[300px] blur-[80px] rounded-full pointer-events-none opacity-20 ${variant.blob1}`} />
                            <div className={`absolute bottom-0 left-0 w-[200px] h-[200px] blur-[80px] rounded-full pointer-events-none opacity-20 ${variant.blob2}`} />
                            
                            {/* 内容卡片内的科技装饰线 */}
                            <div className="absolute top-6 right-6 w-12 h-12">
                                <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none">
                                    <path d="M0 0 H 40 V 40" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
                                    <circle cx="35" cy="5" r="2" className={`fill-current ${variant.accentMain}`} />
                                </svg>
                            </div>

                            <div className="relative z-10">
                                {/* Pass styling colors to MarkdownRenderer */}
                                <MarkdownRenderer 
                                    content={data.body} 
                                    theme={theme} 
                                    customColors={{
                                        ulBullet: variant.ulBullet,
                                        olMarker: variant.olMarker,
                                        h3Decoration: variant.h3Decoration,
                                        // Pass new Markdown color props
                                        blockquoteBorder: variant.blockquoteBorder,
                                        blockquoteBg: variant.blockquoteBg,
                                        codeBg: variant.codeBg,
                                        codeText: variant.codeText,
                                        codeBorder: variant.codeBorder
                                    }}
                                />
                            </div>
                         </div>
                      </div>
                    )}
                </div>

                {/* --- 底部 --- */}
                <div className="relative z-20 pt-8 mt-auto flex justify-between items-end">
                     <div className="flex flex-col gap-1">
                         <div className={`h-[2px] w-12 mb-2 ${variant.blob1} opacity-50`} />
                         <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                             Visualized By
                         </span>
                         <span className="text-sm font-bold text-white tracking-wide">{customFooter || "LIQUID_KNOWS"}</span>
                     </div>

                     {/* 条形码 / 数据可视化 */}
                     <div className="flex items-end gap-4 opacity-70">
                         <div className="flex gap-[2px] h-6 items-end">
                             {[...Array(12)].map((_, i) => (
                                 <div key={i} className={`w-[2px] bg-white ${Math.random() > 0.5 ? 'h-full opacity-80' : 'h-1/2 opacity-40'}`} />
                             ))}
                         </div>
                         <div className="font-mono text-[9px] text-slate-500 writing-vertical-rl transform rotate-180">
                             SEC.09
                         </div>
                     </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
