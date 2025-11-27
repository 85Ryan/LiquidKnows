
import React from 'react';
import { CardProps } from '../../types';
import { MarkdownRenderer } from '../MarkdownRenderer';

export const NoteGridCard: React.FC<CardProps> = ({ 
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
    <div className="absolute inset-0 bg-[#263238]">
       {/* 1. 基础材质 */}
       <div className="absolute inset-0 bg-[#263238]" />
       <div className="absolute inset-0 opacity-30" style={{ 
           backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")` 
       }} />
       
       {/* 2. 网格系统 */}
       <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          backgroundPosition: 'center'
       }} />
       <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
          backgroundPosition: 'center'
       }} />

       {/* 3. 角度参考线 */}
       <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-screen">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-white rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[150%] bg-white rotate-45" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[150%] bg-white -rotate-45" />
       </div>

       {/* 4. 测量标尺 */}
       {/* 顶部标尺条 */}
       <div className="absolute top-0 left-0 right-0 h-10 bg-[#263238] border-b border-white/10 flex items-end justify-center shadow-[0_2px_5px_rgba(0,0,0,0.2)] z-10">
           <div className="flex gap-[20px] px-10">
              {[...Array(41)].map((_, i) => (
                   <div key={i} className="flex flex-col items-center gap-1 w-[2px]">
                       {i % 5 === 0 && <span className="text-[8px] font-mono text-white/50 mb-[1px] font-bold">{i * 5}</span>}
                       <div className={`w-[1px] bg-white/30 ${i % 5 === 0 ? 'h-3 bg-white/60' : 'h-1.5'}`} />
                   </div>
              ))}
           </div>
       </div>
       {/* 左侧标尺条 */}
       <div className="absolute top-0 left-0 bottom-0 w-10 bg-[#263238] border-r border-white/10 flex flex-col items-end justify-center shadow-[2px_0_5px_rgba(0,0,0,0.2)] z-10">
           <div className="flex flex-col gap-[20px] py-10">
              {[...Array(61)].map((_, i) => (
                   <div key={i} className="flex items-center justify-end gap-1 w-full h-[2px]">
                       {i % 5 === 0 && <span className="text-[8px] font-mono text-white/50 rotate-[-90deg] mr-[1px] font-bold">{i * 5}</span>}
                       <div className={`h-[1px] bg-white/30 ${i % 5 === 0 ? 'w-3 bg-white/60' : 'w-1.5'}`} />
                   </div>
              ))}
           </div>
       </div>
       
       {/* 5. 逼真光照叠加 */}
       <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/40 pointer-events-none mix-blend-overlay" />
    </div>
  );

  const renderDecorations = () => (
    <>
      <div className="absolute inset-0 bg-white" />
      <div className="absolute top-0 left-0 w-full h-[120px] bg-white border-b-2 border-slate-200 z-0" />
      <div className="absolute top-[120px] bottom-0 left-0 right-0" 
           style={{ 
              backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)',
              backgroundSize: '25px 25px'
           }} 
      />
      <div className="absolute top-0 bottom-0 left-20 w-[1px] bg-red-300 opacity-60 z-0" />
      <div className="absolute top-[150px] left-6 w-4 h-4 bg-slate-100 rounded-full shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)]" />
      <div className="absolute top-1/2 left-6 w-4 h-4 bg-slate-100 rounded-full shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)]" />
      <div className="absolute bottom-[150px] left-6 w-4 h-4 bg-slate-100 rounded-full shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)]" />
    </>
  );

  const containerClass = `relative w-full h-full overflow-hidden transition-all duration-300 bg-white shadow-xl rounded-sm`;

  return (
    <div className={`relative w-[800px] h-[1200px] flex-shrink-0 overflow-hidden transition-all duration-500 ${!shouldRenderBackground ? theme.bgGradient : ''} shadow-2xl text-left`}>
      {shouldRenderBackground && renderFrameBackground()}
      
      <div className={`absolute inset-0 ${showFrame ? 'p-20' : 'p-0'} transition-all duration-300 flex items-center justify-center z-30`}>
        <div className={containerClass}>
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              {renderDecorations()}
            </div>

            <div className="relative z-10 h-full flex flex-col p-0">
                {/* 头部 */}
                <div className="flex justify-between items-end mb-12 pt-10 px-4 relative z-10 font-mono h-[110px]">
                    <div className="text-sm font-bold tracking-[0.2em] uppercase text-slate-500 mb-1 ml-16">
                        {customHeader || "Design Daily"}
                    </div>
                    <div className="flex items-end gap-3 text-slate-400 mr-4">
                        <span className="text-xs font-bold tracking-widest mb-1">NO.</span>
                        <div className="relative border-b-2 border-slate-300 min-w-[60px] text-center">
                            {!isCover ? (
                               <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-3xl font-bold text-blue-600 font-display leading-none -mb-1">
                                  {String(index).padStart(2, '0')}
                               </span>
                            ) : (
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-400 leading-none mb-1">
                                  COVER
                               </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* 主要内容 */}
                <div className="flex-1 flex flex-col justify-center relative z-20 pl-20 pr-12">
                    {isCover ? (
                      <div className="flex flex-col h-full justify-center">
                        {/* 装饰性标题引导线 */}
                        <div className="w-16 h-2 bg-blue-600 mb-6" />
                        
                        {/* 大标题：思源黑体，极粗，深色 */}
                        <h1 className="text-[60px] leading-[1.6] mb-6 font-sans-sc font-semibold text-slate-900">
                          {data.title}
                        </h1>

                        {/* 副标题：思源黑体，粗体 */}
                        <p className="text-[32px] leading-[1.6] font-sans-sc font-bold text-slate-600">
                           {customSubtitle || data.body}
                        </p>

                        {/* 标签：模块化方块风格 */}
                        {customTags && customTags.length > 0 && (
                             <div className="flex flex-wrap gap-4 mt-12">
                                {customTags.map((tag, i) => (
                                    <div key={i} className="group relative flex items-center bg-white border border-slate-300 px-5 py-2.5 rounded-sm shadow-sm hover:border-blue-500 hover:shadow-md transition-all duration-300 cursor-default">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-300 group-hover:bg-blue-500 transition-colors" />
                                        <div className="w-2 h-2 bg-slate-300 rounded-sm mr-3 group-hover:bg-blue-500 transition-colors" />
                                        <span className="text-xl font-sans-sc text-slate-600 tracking-wide group-hover:text-blue-800 transition-colors">
                                            {tag}
                                        </span>
                                    </div>
                                ))}
                             </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col h-full pt-4">
                         <div className="mb-12 relative">
                           {/* H2 Title with Grid Marker */}
                           <div className="flex items-start gap-5 mb-6">
                                <div className="mt-6 w-6 h-6 bg-blue-600 flex-shrink-0 shadow-sm" />
                                <h2 className={`text-[40px] leading-[1.4] ${theme.fontDisplay} ${theme.textColor} z-10 relative`}>
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
                <div className="relative z-20 mt-auto pt-6 pb-8 px-4 flex justify-between items-end border-t-2 border-slate-100">
                    <div className="flex items-center gap-3 ml-16">
                       <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">CURATED BY</span>
                       <div className="border-b-2 border-slate-200 px-2 pb-1 min-w-[120px] text-sm font-bold text-slate-600 font-serif italic">
                          {customFooter || "Liquid Designer"}
                       </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mr-4">
                       <div className="w-2 h-2 rounded-full bg-slate-300" />
                       <span className="text-[10px] font-bold tracking-[0.2em] text-slate-300 uppercase">LIQUID.KNOWS</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
