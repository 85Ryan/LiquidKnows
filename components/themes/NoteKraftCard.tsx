
import React from 'react';
import { CardProps } from '../../types';
import { MarkdownRenderer } from '../MarkdownRenderer';

export const NoteKraftCard: React.FC<CardProps> = ({ 
  data, 
  theme, 
  customHeader, 
  customFooter, 
  customSubtitle,
  customTags,
  showFrame = false 
}) => {
  const isCover = data.type === 'cover';
  const index = data.index || 0;
  
  const shouldRenderBackground = showFrame;

  const renderFrameBackground = () => (
    <div className="absolute inset-0 bg-[#5D4037]">
       {/* 1. 纹理基底：深色皮革 */}
       <div className="absolute inset-0 bg-[#3E2723]" />
       <div className="absolute inset-0 opacity-50 mix-blend-overlay" 
            style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/leather.png")` }} />
       
       {/* 2. 光照：中心聚焦暗角 */}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,rgba(0,0,0,0.4)_100%)]" />

       {/* 3. 逼真的缝线 */}
       <div className="absolute inset-5 rounded-[18px] border-[4px] border-black/40 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5),0_1px_0_rgba(255,255,255,0.05)] opacity-90" />
       
       <svg className="absolute inset-5 z-10 pointer-events-none overflow-visible">
          <rect 
            x="2" y="2" 
            width="760px" 
            height="1160px" 
            rx="0" ry="0" 
            fill="none" 
            stroke="#E6D0B3" 
            strokeWidth="2.5" 
            strokeDasharray="14 9" 
            strokeLinecap="round"
            opacity="0.3"
            style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.6))' }}
          />
       </svg>

       {/* 4. 复古黄铜角 */}
       {/* 左上 */}
       <div className="absolute top-4 left-4 w-20 h-20 pointer-events-none z-50">
           <div className="absolute top-0 left-0 w-full h-full border-t-[8px] border-l-[8px] rounded-tl-md border-[#B8860B] shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
               <div className="absolute -top-[8px] -left-[8px] w-full h-full border-t-[1px] border-l-[1px] border-white/40 rounded-tl-md" />
               <div className="absolute top-0 left-0 w-full h-full border-t-[8px] border-l-[8px] border-black/10 rounded-tl-md" />
           </div>
           <div className="absolute top-5 left-5 w-4 h-4 rounded-full bg-[radial-gradient(circle_at_30%_30%,#F0E68C,#B8860B)] shadow-[1px_1px_2px_rgba(0,0,0,0.6)] border border-[#3E2723]/60 flex items-center justify-center">
                <div className="w-2 h-[1px] bg-[#3E2723]/50 rotate-45" />
           </div>
       </div>

       {/* 右上 */}
       <div className="absolute top-4 right-4 w-20 h-20 pointer-events-none z-50 rotate-90">
           <div className="absolute top-0 left-0 w-full h-full border-t-[8px] border-l-[8px] rounded-tl-md border-[#B8860B] shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
               <div className="absolute -top-[8px] -left-[8px] w-full h-full border-t-[1px] border-l-[1px] border-white/40 rounded-tl-md" />
               <div className="absolute top-0 left-0 w-full h-full border-t-[8px] border-l-[8px] border-black/10 rounded-tl-md" />
           </div>
           <div className="absolute top-5 left-5 w-4 h-4 rounded-full bg-[radial-gradient(circle_at_30%_30%,#F0E68C,#B8860B)] shadow-[1px_1px_2px_rgba(0,0,0,0.6)] border border-[#3E2723]/60 flex items-center justify-center">
                <div className="w-2 h-[1px] bg-[#3E2723]/50 rotate-45" />
           </div>
       </div>

       {/* 左下 */}
       <div className="absolute bottom-4 left-4 w-20 h-20 pointer-events-none z-50 -rotate-90">
           <div className="absolute top-0 left-0 w-full h-full border-t-[8px] border-l-[8px] rounded-tl-md border-[#B8860B] shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
               <div className="absolute -top-[8px] -left-[8px] w-full h-full border-t-[1px] border-l-[1px] border-white/40 rounded-tl-md" />
               <div className="absolute top-0 left-0 w-full h-full border-t-[8px] border-l-[8px] border-black/10 rounded-tl-md" />
           </div>
           <div className="absolute top-5 left-5 w-4 h-4 rounded-full bg-[radial-gradient(circle_at_30%_30%,#F0E68C,#B8860B)] shadow-[1px_1px_2px_rgba(0,0,0,0.6)] border border-[#3E2723]/60 flex items-center justify-center">
                <div className="w-2 h-[1px] bg-[#3E2723]/50 rotate-45" />
           </div>
       </div>

       {/* 右下 */}
       <div className="absolute bottom-4 right-4 w-20 h-20 pointer-events-none z-50 rotate-180">
           <div className="absolute top-0 left-0 w-full h-full border-t-[8px] border-l-[8px] rounded-tl-md border-[#B8860B] shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
               <div className="absolute -top-[8px] -left-[8px] w-full h-full border-t-[1px] border-l-[1px] border-white/40 rounded-tl-md" />
               <div className="absolute top-0 left-0 w-full h-full border-t-[8px] border-l-[8px] border-black/10 rounded-tl-md" />
           </div>
           <div className="absolute top-5 left-5 w-4 h-4 rounded-full bg-[radial-gradient(circle_at_30%_30%,#F0E68C,#B8860B)] shadow-[1px_1px_2px_rgba(0,0,0,0.6)] border border-[#3E2723]/60 flex items-center justify-center">
                <div className="w-2 h-[1px] bg-[#3E2723]/50 rotate-45" />
           </div>
       </div>
    </div>
  );

  const renderDecorations = () => (
    <>
      <div className="absolute inset-0 bg-[#e8dcca]" />
      <div className="absolute inset-0 opacity-30 mix-blend-multiply" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cardboard-flat.png")` }} />
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/paper-fibers.png")` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5" />
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-40 h-12 bg-[#d4c4a8] opacity-90 shadow-sm rotate-[-1.5deg] backdrop-blur-[1px] mix-blend-multiply" />
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-40 h-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50 rotate-[-1.5deg]" />
      <div className="absolute inset-6 border-2 border-[#8d6e63] opacity-20 rounded-sm" />
    </>
  );

  const containerClass = `relative w-full h-full overflow-hidden transition-all duration-300 bg-[#e8dcca] shadow-[0_2px_10px_rgba(0,0,0,0.15)] rounded-sm`;

  return (
    <div className={`relative w-[800px] h-[1200px] flex-shrink-0 overflow-hidden transition-all duration-500 ${!shouldRenderBackground ? theme.bgGradient : ''} shadow-2xl text-left`}>
      {shouldRenderBackground && renderFrameBackground()}
      
      <div className={`absolute inset-0 ${showFrame ? 'p-20' : 'p-0'} transition-all duration-300 flex items-center justify-center z-30`}>
        <div className={containerClass}>
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              {renderDecorations()}
            </div>

            <div className="relative z-10 h-full flex flex-col px-12 py-12">
                {/* 头部 */}
                <div className="flex justify-between items-start mb-10">
                    <div className="flex flex-col">
                        <span className={`font-bold tracking-[0.3em] uppercase opacity-60 ${theme.textColor}`}>
                            {customHeader || "LiquidKnows"}
                        </span>
                        <span className={`text-sm opacity-60 font-serif italic mt-1 ${theme.textColor}`}>Handcrafted Notes</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        {!isCover && (
                            <div className={`text-4xl ${theme.accentColor} font-serif italic opacity-60`}>
                              <span className="text-xl align-top opacity-50 mr-1">#</span>
                              {String(index).padStart(2, '0')}
                            </div>
                        )}
                        {isCover && (
                            <div className={`px-4 py-1 border rounded-full text-xs tracking-widest opacity-60 ${theme.textColor} border-current`}>
                                COVER
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="w-full h-[2px] bg-[#5d4037] opacity-10 mb-10" />

                {/* 主要内容 */}
                <div className="flex-1 flex flex-col relative z-20">
                    {isCover ? (
                      <div className="flex flex-col h-full">
                        {/* 上半部分：标题与副标题 */}
                        <div className="flex-1 flex flex-col justify-center">
                            {/* 大标题：使用思源宋体 (font-serif-sc)，极粗 */}
                            <h1 className="text-[64px] leading-[1.6] mb-12 font-serif-sc font-bold text-[#271c19] break-words drop-shadow-sm">
                              {data.title}
                            </h1>
                            
                            {/* 内容容器：左边框装饰 */}
                            <div className="relative pt-0 pl-6 border-l-4 border-[#5d4037]/40">
                              {/* 副标题：使用思源黑体 (font-sans-sc)，加粗 */}
                              <p className="text-[32px] leading-[1.5] font-bold font-sans-sc text-[#4e342e] opacity-95">
                                {customSubtitle || data.body}
                              </p>
                            </div>
                        </div>

                        {/* 底部：标签区域 - 移动至底部 */}
                        <div className="mt-auto pt-8 pb-8">
                          {/* 标签：复古深色皮革标签风格 (Dark Leather Patch Style) */}
                          {customTags && customTags.length > 0 && (
                             <div className="flex flex-wrap gap-4">
                                {customTags.map((tag, i) => (
                                    <div key={i} className="group relative">
                                        <div className="flex items-center px-4 py-2 bg-[#4E342E] border border-[#3E2723] shadow-[3px_3px_0_rgba(62,39,35,0.3)] hover:shadow-[1px_1px_0_rgba(62,39,35,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 cursor-default rounded-[2px]">
                                            {/* 装饰性金属铆钉 (古铜色) */}
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#8D6E63] mr-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_1px_1px_rgba(0,0,0,0.5)]"></div>
                                            
                                            {/* 标签文本 (浅牛皮纸色) */}
                                            <span className="text-xl font-sans-sc text-[#E8DCCA] tracking-wider opacity-90">
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
                      <div className="flex flex-col h-full pt-4">
                         <div className="mb-12 relative">
                           {/* H2 Title with Vintage Decoration */}
                           <div className="flex items-center gap-4 mb-6 relative">
                                <div className="w-12 h-12 rounded-full border-2 border-[#5d4037] flex items-center justify-center opacity-40 shrink-0">
                                    <span className="font-serif font-bold text-2xl text-[#5d4037]">§</span>
                                </div>
                                <h2 className={`text-[40px] leading-[1.5] font-bold ${theme.fontDisplay} ${theme.textColor} z-10 relative border-b-2 border-[#5d4037]/20 pb-2 flex-1`}>
                                    {data.title}
                                </h2>
                           </div>
                         </div>
                         <div className="flex-1 relative">
                            <MarkdownRenderer content={data.body} theme={theme} />
                         </div>
                      </div>
                    )}
                </div>

                {/* 底部 */}
                <div className="relative z-20 pt-8 mt-auto flex justify-between items-end border-t-2 border-dashed border-[#5d4037]/30">
                     <div className={`flex flex-col ${theme.textColor} opacity-70`}>
                       <span className="text-[10px] uppercase tracking-[0.2em] mb-1">
                           Curated By
                       </span>
                       <span className="text-lg font-bold">{customFooter || "Liquid Designer"}</span>
                     </div>
                     
                     <div className="flex flex-col items-end">
                        <span className={`text-xs uppercase tracking-widest opacity-50 ${theme.textColor}`}>
                            LiquidKnows
                        </span>
                     </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
