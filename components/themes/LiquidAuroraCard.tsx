
import React from 'react';
import { CardProps } from '../../types';
import { MarkdownRenderer } from '../MarkdownRenderer';

export const LiquidAuroraCard: React.FC<CardProps> = ({ 
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
  
  // 极光流体主题始终强制显示背景以确保玻璃拟态效果生效
  const shouldRenderBackground = true;

  const GRADIENTS = [
    'bg-gradient-to-tr from-[#e0f2fe] via-[#f3e8ff] to-[#fae8ff]', // 0: 梦幻紫蓝 (Default)
    'bg-gradient-to-br from-[#ff9a9e] via-[#fecfef] to-[#ff9a9e]', // 1: 甜蜜桃粉 (Peach)
    'bg-gradient-to-bl from-[#89f7fe] via-[#66a6ff] to-[#89f7fe]', // 2: 清透海洋 (Ocean)
    'bg-gradient-to-tl from-[#d4fc79] via-[#96e6a1] to-[#d4fc79]', // 3: 清新薄荷 (Mint)
  ];

  // 定义每种渐变对应的详细配色方案
  const COLOR_VARIANTS = [
      { // 0: 紫蓝 (Purple/Blue)
          // List styling
          ulBullet: "before:bg-purple-400",
          olMarker: "marker:text-purple-500",
          h3Decoration: "before:from-blue-400 before:to-purple-400",
          // Cover accents
          coverBar: "from-purple-400 to-blue-300",
          coverSubtitleLine: "from-purple-400",
          headerMarker: "bg-purple-400",
          tagMarker: "bg-purple-500/60 group-hover:bg-purple-600",
          tagHoverGlow: "from-purple-200 to-blue-200",
          // Content accents
          h2Glow: "from-purple-300/50 to-pink-300/50",
          // Markdown styles
          blockquoteBorder: "border-purple-400",
          blockquoteBg: "bg-purple-50/50",
          codeBg: "bg-purple-100",
          codeText: "text-purple-700"
      },
      { // 1: 桃粉 (Rose/Orange)
          // List styling
          ulBullet: "before:bg-rose-400",
          olMarker: "marker:text-rose-500",
          h3Decoration: "before:from-orange-300 before:to-rose-400",
          // Cover accents
          coverBar: "from-rose-400 to-orange-300",
          coverSubtitleLine: "from-rose-400",
          headerMarker: "bg-rose-400",
          tagMarker: "bg-rose-500/60 group-hover:bg-rose-600",
          tagHoverGlow: "from-rose-200 to-orange-200",
          // Content accents
          h2Glow: "from-rose-300/50 to-orange-300/50",
          // Markdown styles
          blockquoteBorder: "border-rose-400",
          blockquoteBg: "bg-rose-50/50",
          codeBg: "bg-rose-100",
          codeText: "text-rose-700"
      },
      { // 2: 海洋 (Sky/Cyan)
          // List styling
          ulBullet: "before:bg-sky-400",
          olMarker: "marker:text-sky-500",
          h3Decoration: "before:from-cyan-300 before:to-blue-400",
          // Cover accents
          coverBar: "from-sky-400 to-cyan-300",
          coverSubtitleLine: "from-sky-400",
          headerMarker: "bg-sky-400",
          tagMarker: "bg-sky-500/60 group-hover:bg-sky-600",
          tagHoverGlow: "from-sky-200 to-cyan-200",
          // Content accents
          h2Glow: "from-sky-300/50 to-cyan-300/50",
          // Markdown styles
          blockquoteBorder: "border-sky-400",
          blockquoteBg: "bg-sky-50/50",
          codeBg: "bg-sky-100",
          codeText: "text-sky-700"
      },
      { // 3: 薄荷 (Emerald/Lime)
          // List styling
          ulBullet: "before:bg-emerald-400",
          olMarker: "marker:text-emerald-500",
          h3Decoration: "before:from-lime-300 before:to-emerald-400",
          // Cover accents
          coverBar: "from-emerald-400 to-lime-300",
          coverSubtitleLine: "from-emerald-400",
          headerMarker: "bg-emerald-400",
          tagMarker: "bg-emerald-500/60 group-hover:bg-emerald-600",
          tagHoverGlow: "from-emerald-200 to-lime-200",
          // Content accents
          h2Glow: "from-emerald-300/50 to-lime-300/50",
          // Markdown styles
          blockquoteBorder: "border-emerald-400",
          blockquoteBg: "bg-emerald-50/50",
          codeBg: "bg-emerald-100",
          codeText: "text-emerald-700"
      }
  ];

  const selectedGradient = GRADIENTS[customGradientIndex] || GRADIENTS[0];
  const selectedColors = COLOR_VARIANTS[customGradientIndex] || COLOR_VARIANTS[0];

  const renderFrameBackground = () => (
    <div className="absolute inset-0 bg-[#f0f0f0] overflow-hidden">
       {/* 1. 柔和的粉彩渐变基底 - 使用用户选择的渐变 */}
       <div className={`absolute inset-0 ${selectedGradient} opacity-80 transition-all duration-700`} />

       {/* 2. 动态流体光斑 - 优化“流体”质感 */}
       {/* 更大、更柔和的光斑，配合混合模式实现更好的色彩融合 */}
       <div className="absolute -top-[30%] -left-[10%] w-[90%] h-[90%] rounded-full bg-[#7dd3fc] blur-[130px] opacity-50 animate-blob mix-blend-multiply" />
       <div className="absolute top-[10%] -right-[30%] w-[90%] h-[90%] rounded-full bg-[#d8b4fe] blur-[130px] opacity-50 animate-blob animation-delay-2000 mix-blend-multiply" />
       <div className="absolute -bottom-[30%] left-[20%] w-[90%] h-[90%] rounded-full bg-[#f0abfc] blur-[130px] opacity-50 animate-blob animation-delay-4000 mix-blend-multiply" />
       
       {/* 3. 虹彩微光覆盖层 */}
       <div 
         className="absolute inset-0 opacity-40 mix-blend-overlay"
         style={{
            backgroundImage: 'conic-gradient(from 90deg at 50% 50%, #fff, #c4b5fd, #fff, #a5f3fc, #fff)',
            filter: 'blur(80px)',
            transform: 'scale(1.5)',
            animation: 'spin 20s linear infinite'
         }}
       />
       
       {/* 4. 玻璃反射光泽 */}
       <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/20 pointer-events-none" />

       {/* 5. 提升高级感的纹理覆盖层 */}
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-darken" />
    </div>
  );

  const renderDecorations = () => (
    <>
      {/* 卡片主体的微妙玻璃反射 */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent pointer-events-none" />
      
      {/* 背景大数字 */}
       {!isCover && (
          <div className="absolute top-[10%] right-[-5%] text-[400px] font-bold text-white/40 blur-[4px] select-none pointer-events-none font-display mix-blend-overlay rotate-[10deg]">
              {index}
          </div>
      )}
      
      {/* 装饰线条 */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
    </>
  );

  const radiusClass = showFrame ? "rounded-[3rem]" : "rounded-none";
  const containerClass = `relative w-full h-full overflow-hidden transition-all duration-300 bg-white/25 backdrop-blur-[50px] shadow-[0_20px_50px_rgba(31,38,135,0.1)] border border-white/60 ${radiusClass}`;

  return (
    <div className={`relative w-[800px] h-[1200px] flex-shrink-0 overflow-hidden transition-all duration-500 ${!shouldRenderBackground ? theme.bgGradient : ''} shadow-2xl text-left`}>
      {shouldRenderBackground && renderFrameBackground()}
      
      <div className={`absolute inset-0 ${showFrame ? 'p-16' : 'p-0'} transition-all duration-300 flex items-center justify-center z-30`}>
        <div className={containerClass}>
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              {renderDecorations()}
            </div>

            <div className="relative z-10 h-full flex flex-col p-0">
                 <div className="flex flex-col h-full p-12 relative">
                    <div className="flex justify-between items-center mb-12">
                        <div className="bg-white/40 backdrop-blur-md px-5 py-2 rounded-full border border-white/50 shadow-sm flex items-center gap-2">
                            {/* 动态 Header 标记颜色 */}
                            <div className={`w-2 h-2 rounded-full animate-pulse ${selectedColors.headerMarker}`} />
                            <span className="font-bold tracking-[0.2em] uppercase text-slate-700">
                                {customHeader || "AURORA"}
                            </span>
                        </div>
                        {isCover && (
                            <div className="bg-white/30 backdrop-blur-sm px-4 py-1 rounded-full border border-white/20">
                                <span className="font-bold tracking-widest uppercase text-slate-500">COVER</span>
                            </div>
                        )}
                    </div>

                    <div className="flex-1 flex flex-col justify-center relative">
                         {isCover ? (
                             <div className="relative z-10 flex flex-col h-full justify-center px-2">
                                 {/* 装饰性顶部光条 - 动态渐变 */}
                                 <div className={`w-24 h-4 bg-gradient-to-r ${selectedColors.coverBar} rounded-full mb-4 opacity-80`} />

                                 {/* 大标题 - 思源黑体风格 */}
                                 <h1 className="text-[64px] leading-[1.6] font-semibold text-slate-800 mb-4 font-sans-sc drop-shadow-sm">
                                    {data.title}
                                 </h1>
                                 
                                 {/* 副标题区域 - 优化：加粗，颜色加深，调整装饰线 */}
                                 <div className="relative flex items-stretch">
                                     {/* 动态副标题竖线 */}
                                     <div className={`w-2 rounded-full bg-gradient-to-b ${selectedColors.coverSubtitleLine} to-transparent mr-6`} />
                                     <p className="text-[32px] leading-[1.4] text-slate-700 font-bold font-sans-sc">
                                         {customSubtitle || data.body}
                                     </p>
                                 </div>

                                 {/* 标签 - 重新设计的悬浮玻璃样式 */}
                                 {customTags && customTags.length > 0 && (
                                    <div className="flex flex-wrap gap-4 mt-16">
                                        {customTags.map((tag, i) => (
                                            <div key={i} className="group relative">
                                                {/* 悬停时的光晕背景 - 动态颜色 */}
                                                <div className={`absolute inset-0 bg-gradient-to-r ${selectedColors.tagHoverGlow} rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                                
                                                {/* 标签主体 */}
                                                <div className="relative px-6 py-2.5 bg-white/40 backdrop-blur-md border border-white/50 rounded-full shadow-sm flex items-center gap-2.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:bg-white/60">
                                                    {/* 动态标签圆点 */}
                                                    <span className={`flex items-center justify-center w-1.5 h-1.5 rounded-full transition-colors ${selectedColors.tagMarker}`} />
                                                    <span className="text-[20px] text-slate-600 font-sans-sc tracking-wide group-hover:text-slate-800 transition-colors">
                                                        {tag}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                 )}
                             </div>
                         ) : (
                             <div className="relative z-10 h-full flex flex-col pt-4">
                                 <div className="mb-auto">
                                     <h2 className={`text-[40px] leading-[1.5] font-semibold text-slate-800 mb-6 relative ${theme.fontDisplay}`}>
                                         <span className="relative z-10">{data.title}</span>
                                         {/* 动态 H2 下方光晕 */}
                                         <div className={`absolute -bottom-3 left-0 w-32 h-4 bg-gradient-to-r ${selectedColors.h2Glow} rounded-full blur-md`} />
                                     </h2>
                                 </div>
                                 
                                 <div className="bg-white/40 backdrop-blur-2xl border border-white/60 p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden group hover:bg-white/50 transition-colors duration-500 flex-1">
                                     <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full pointer-events-none" />
                                     
                                     {/* 使用 MarkdownRenderer 渲染内容主体，传入自定义颜色 */}
                                     <div className="relative z-10 text-[24px] leading-relaxed mb-8">
                                        <MarkdownRenderer 
                                            content={data.body} 
                                            theme={theme} 
                                            customColors={{
                                                ulBullet: selectedColors.ulBullet,
                                                olMarker: selectedColors.olMarker,
                                                h3Decoration: selectedColors.h3Decoration,
                                                blockquoteBorder: selectedColors.blockquoteBorder,
                                                blockquoteBg: selectedColors.blockquoteBg,
                                                codeBg: selectedColors.codeBg,
                                                codeText: selectedColors.codeText
                                            }}
                                        />
                                     </div>
                                 </div>
                                 <div className="h-20"></div>
                             </div>
                         )}
                    </div>

                    <div className="absolute bottom-12 left-0 w-full flex justify-center">
                        <div className="bg-white/40 backdrop-blur-xl border border-white/60 px-8 py-3 rounded-full shadow-lg flex items-center gap-6 group hover:scale-105 transition-transform duration-300">
                             <span className="text-xs font-bold tracking-widest text-slate-600 group-hover:text-purple-600 transition-colors">{customFooter || "DESIGN"}</span>
                             <div className="w-[1px] h-4 bg-slate-400/30" />
                             <span className="text-xs font-mono text-slate-500">
                                 {isCover ? '00' : String(index).padStart(2, '0')} — {String(data.total || 5).padStart(2,'0')}
                             </span>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};
