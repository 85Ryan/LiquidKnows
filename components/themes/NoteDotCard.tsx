
import React from 'react';
import { CardProps } from '../../types';
import { MarkdownRenderer } from '../MarkdownRenderer';

export const NoteDotCard: React.FC<CardProps> = ({ 
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
    <div className="absolute inset-0 bg-[#37474f]">
       {/* 1. 基础纹理：高端深灰亚麻/织物 */}
       <div className="absolute inset-0 bg-[#263238]" />
       <div className="absolute inset-0 opacity-40 mix-blend-overlay" 
            style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/dark-denim-3.png")` }} />
       <div className="absolute inset-0 opacity-20" 
            style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/carbon-fibre.png")` }} />

       {/* 2. 光照效果 */}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0.4)_100%)]" />
       
       {/* 边缘高光（四边） */}
       <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-white/10 to-transparent" />
       <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-white/10 to-transparent" />
       <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-white/10 to-transparent" />
       <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-l from-white/10 to-transparent" />

       {/* 3. 缝线：简洁的单条浅灰缝线 */}
       <svg className="absolute inset-5 z-10 pointer-events-none overflow-visible">
          <rect 
            x="2" y="2" 
            width="760" 
            height="1160" 
            rx="8" ry="8" 
            fill="none" 
            stroke="#90a4ae" 
            strokeWidth="1.5" 
            strokeDasharray="8 4" 
            opacity="0.5"
            style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.5))' }}
          />
       </svg>

       {/* 4. 橡皮筋 */}
       <div className="absolute top-0 bottom-0 right-[160px] w-10 bg-[#151515] z-20 shadow-[inset_1px_0_1px_rgba(255,255,255,0.15),inset_-1px_0_2px_rgba(0,0,0,0.8)] flex flex-col items-center overflow-hidden">
           <div className="absolute inset-0 opacity-40" 
                style={{ backgroundImage: 'linear-gradient(0deg, transparent 50%, rgba(0,0,0,0.5) 50%)', backgroundSize: '4px 4px' }} />
           <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-black/20" />
       </div>

       {/* 5. 银色金属角 */}
       {[0, 1, 2, 3].map((i) => {
           const positions = [
               "top-5 left-5", 
               "top-5 right-5 rotate-90", 
               "bottom-5 right-5 rotate-180", 
               "bottom-5 left-5 -rotate-90"
           ];
           return (
              <div key={i} className={`absolute ${positions[i]} w-14 h-14 pointer-events-none z-30`}>
                  <div className="absolute top-0 left-0 w-full h-full border-t-[5px] border-l-[5px] rounded-tl-xl border-[#b0bec5] shadow-[1px_1px_2px_rgba(0,0,0,0.6)]">
                      <div className="absolute top-[-6px] left-[-5px] w-full h-full border-t-[1px] border-l-[1px] border-white/60 rounded-tl-xl" />
                  </div>
                  <div className="absolute top-5 left-5 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-white to-[#78909c] shadow-sm border border-[#546e7a]" />
              </div>
           );
       })}
    </div>
  );

  const renderDecorations = () => (
    <>
      <div className="absolute inset-0 bg-[#fbfaf5]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(100,90,80,0.03)_100%)]" />
      <div className="absolute inset-0" 
           style={{ 
              backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)',
              backgroundSize: '24px 24px'
           }} 
      />
      <div className="absolute -top-3 -right-8 w-32 h-8 bg-blue-200/60 rotate-45 mix-blend-multiply opacity-60" />
    </>
  );

  const containerClass = `relative w-full h-full overflow-hidden transition-all duration-300 bg-[#fbfaf5] shadow-md rounded-[2px] border-l-[1px] border-slate-200 z-30`;

  return (
    <div className={`relative w-[800px] h-[1200px] flex-shrink-0 overflow-hidden transition-all duration-500 ${!shouldRenderBackground ? theme.bgGradient : ''} shadow-2xl text-left`}>
      {shouldRenderBackground && renderFrameBackground()}
      
      <div className={`absolute inset-0 ${showFrame ? 'p-20' : 'p-0'} transition-all duration-300 flex items-center justify-center z-30`}>
        <div className={containerClass}>
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              {renderDecorations()}
            </div>

            <div className="relative z-10 h-full flex flex-col px-10 py-12">
                {/* 头部 */}
                <div className="mb-10 border-b-2 border-dotted border-slate-300/60 pb-4">
                    <div className="flex justify-between items-center mb-3">
                         <div className="flex gap-1">
                             {['M','T','W','T','F','S','S'].map((day, i) => (
                                 <div key={i} className={`w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-[8px] font-bold ${i === 2 ? 'bg-slate-800 text-white border-slate-800' : 'text-slate-400'}`}>
                                     {day}
                                 </div>
                             ))}
                         </div>
                         <div className="flex items-center gap-1 text-slate-500 font-mono text-sm">
                             <span>DATE:</span>
                             <div className="w-24 border-b border-slate-300 border-dotted"></div>
                         </div>
                    </div>
                    <div className="flex items-end gap-2 w-full">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Subject:</span>
                        <div className="flex-1 text-xl font-serif font-bold text-slate-700 italic border-b border-slate-300 border-dotted px-2">
                            {customHeader || "Daily Insight"}
                        </div>
                    </div>
                </div>

                {/* 主要内容 */}
                <div className="flex-1 flex flex-col justify-center relative z-20 px-10">
                    {isCover ? (
                      <div className="flex flex-col h-full justify-center">
                        {/* 大标题：思源黑体，极粗，深色 */}
                        <h1 className="text-[60px] leading-[1.6] mb-8 font-sans-sc font-semibold text-slate-800">
                          {data.title}
                        </h1>
                        
                        {/* 副标题：思源黑体，粗体 */}
                        <p className="text-[30px] leading-[1.6] font-sans-sc font-bold text-slate-700 mb-8">
                          {customSubtitle || data.body}
                        </p>
                          
                          {/* 标签：思源黑体，手账胶囊风格 */}
                          {customTags && customTags.length > 0 && (
                             <div className="flex flex-wrap gap-3">
                                {customTags.map((tag, i) => (
                                    <span key={i} className="px-4 py-1.5 rounded-full bg-white border border-slate-300 text-slate-600 font-sans-sc text-xl shadow-sm">
                                        # {tag}
                                    </span>
                                ))}
                             </div>
                          )}
                      </div>
                    ) : (
                      <div className="flex flex-col h-full pt-4">
                         <div className="mb-12 relative">
                            {/* H2 Title with Highlighter Effect */}
                            <div className="relative inline-block z-10">
                                <div className="absolute -inset-x-2 -inset-y-1 bg-[#f0f4c3] -rotate-1 rounded-sm -z-10 opacity-70 transform scale-105" />
                                <h2 className={`text-[40px] leading-[1.5] ${theme.fontDisplay} ${theme.textColor}`}>
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
                <div className="relative z-20 pt-6 mt-auto border-t-2 border-dotted border-slate-300/60 flex justify-between items-center">
                     <div className="flex flex-col gap-1">
                         <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">NOTES:</span>
                         <div className="w-64 h-6 border-b border-slate-200 border-dotted"></div>
                     </div>
                     {isCover ? (
                         <div className="border-2 border-slate-300 px-3 py-1 text-xs font-bold tracking-widest uppercase text-slate-400 rounded-sm">
                            COVER
                         </div>
                     ) : (
                        <div className="flex items-center gap-2 font-serif italic text-slate-500">
                             <span>Page</span>
                             <span className="font-bold text-lg">{index}</span>
                             <span>of</span>
                             <span>{data.total || 5}</span>
                         </div>
                     )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
