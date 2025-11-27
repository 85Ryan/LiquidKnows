
import React from 'react';
import { CardProps } from '../../types';
import { MarkdownRenderer } from '../MarkdownRenderer';

export const TechBlueprintCard: React.FC<CardProps> = ({ 
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
    <div className="absolute inset-0 bg-[#0B1221]">
       {/* 1. 基底：数字屏幕 / 深色蓝图纸 */}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e293b_0%,#020617_100%)]" />
       
       {/* 2. 网格系统 */}
       <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(rgba(6,182,212,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
       }} />
       <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
       }} />

       {/* 3. 拟物化玻璃/屏幕效果 */}
       <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.5) 50%)',
          backgroundSize: '100% 4px',
          opacity: 0.1
       }} />
       <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none mix-blend-overlay" />

       {/* 4. 技术标记 */}
       <div className="absolute top-0 left-10 right-10 h-8 border-b border-cyan-500/20 flex justify-between items-end px-2">
           {[...Array(40)].map((_, i) => (
               <div key={i} className={`w-[1px] bg-cyan-500/40 ${i % 5 === 0 ? 'h-4' : 'h-2'}`} />
           ))}
       </div>
       <div className="absolute bottom-0 left-10 right-10 h-8 border-t border-cyan-500/20 flex justify-between items-start px-2">
           {[...Array(40)].map((_, i) => (
               <div key={i} className={`w-[1px] bg-cyan-500/40 ${i % 5 === 0 ? 'h-4' : 'h-2'}`} />
           ))}
       </div>
       <div className="absolute top-10 bottom-10 left-0 w-8 border-r border-cyan-500/20 flex flex-col justify-between items-end py-2">
           {[...Array(60)].map((_, i) => (
               <div key={i} className={`h-[1px] bg-cyan-500/40 ${i % 5 === 0 ? 'w-4' : 'w-2'}`} />
           ))}
       </div>

       {/* 5. 框架与螺栓 */}
       <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-lg" />
       <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-lg" />
       <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-lg" />
       <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-cyan-500/50 rounded-br-lg" />
       
       {[
         "top-6 left-6", "top-6 right-6", "bottom-6 left-6", "bottom-6 right-6"
       ].map((pos, i) => (
           <div key={i} className={`absolute ${pos} w-3 h-3 rounded-full bg-[#0f172a] border border-cyan-500/50 flex items-center justify-center shadow-[0_0_5px_rgba(6,182,212,0.5)]`}>
               <div className="w-full h-[1px] bg-cyan-500/50 rotate-45" />
               <div className="absolute w-full h-[1px] bg-cyan-500/50 -rotate-45" />
           </div>
       ))}

       {/* 6. 装饰性技术数据 */}
       <div className="absolute top-32 right-2 w-6 flex flex-col gap-2 items-center opacity-50">
           <div className="text-[8px] text-cyan-500 font-mono rotate-90 whitespace-nowrap">SYS.01</div>
           <div className="w-1 h-20 bg-cyan-900/50 relative overflow-hidden">
               <div className="absolute bottom-0 left-0 w-full h-[60%] bg-cyan-500/30 animate-pulse" />
           </div>
       </div>
    </div>
  );

  const renderDecorations = () => (
    <>
       <div className="absolute inset-0 bg-[#0f172a]/80" />
       <div className="absolute inset-0 opacity-20" 
            style={{ 
              backgroundImage: 'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} 
       />
       <div className="absolute bottom-12 right-12 w-32 h-32 border-2 border-cyan-500/10 rounded-full flex items-center justify-center opacity-20 animate-spin-slow">
           <div className="w-24 h-24 border-2 border-dashed border-cyan-500/20 rounded-full" />
       </div>
    </>
  );

  const containerClass = `relative w-full h-full overflow-hidden transition-all duration-300 bg-[#0f172a]/80 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)] rounded-lg`;

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
                        <div className="border border-cyan-500/50 px-3 py-1 bg-cyan-950/50 rounded text-cyan-400 font-mono tracking-wider flex items-center gap-2">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                            {customHeader?.toUpperCase() || "SYS.ONLINE"}
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        {!isCover && (
                            <div className={`text-4xl ${theme.accentColor} font-bold`}>
                              <span className="text-xl align-top opacity-50 mr-1">#</span>
                              {String(index).padStart(2, '0')}
                            </div>
                        )}
                        {isCover && (
                            <div className={`px-4 py-1 border rounded-full tracking-widest opacity-60 ${theme.textColor} border-current`}>
                                COVER
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="w-full h-[1px] bg-cyan-500/30 mb-10" />

                {/* 主要内容 */}
                <div className="flex-1 flex flex-col justify-center relative z-20">
                    {isCover ? (
                      <div className="flex flex-col h-full justify-center relative">
                        {/* 装饰性数据流标识 */}
                        <div className="flex items-center gap-2 mb-8 opacity-70">
                            <div className="w-2 h-2 bg-cyan-500 rounded-sm animate-pulse" />
                            <div className="h-[1px] w-12 bg-cyan-500/50" />
                            <span className="text-xs font-mono text-cyan-400">DATA_STREAM</span>
                        </div>

                        {/* 大标题：思源黑体，极粗 */}
                        <h1 className="text-[60px] leading-[1.6] mb-8 font-sans-sc font-semibold text-white drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                          {data.title}
                        </h1>

                        {/* 副标题容器 */}
                        <div className="relative pl-8 border-l-2 border-cyan-500/30">
                            {/* 左侧动态光标装饰 */}
                            <div className="absolute top-0 left-[-2px] w-[2px] h-12 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                            
                            {/* 副标题：思源黑体，粗体 */}
                            <p className="text-[30px] leading-[1.6] font-sans-sc font-medium text-cyan-100/90 mb-12">
                              {customSubtitle || data.body}
                            </p>
                            
                            {/* 标签：HUD模块风格 */}
                            {customTags && customTags.length > 0 && (
                                <div className="flex flex-wrap gap-4">
                                    {customTags.map((tag, i) => (
                                        <div key={i} className="group relative flex items-center bg-cyan-950/40 border border-cyan-500/40 px-5 py-2 rounded-sm backdrop-blur-sm hover:border-cyan-400 hover:bg-cyan-900/40 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300 cursor-default">
                                            {/* Tech decorative bits */}
                                            <div className="flex flex-col gap-[3px] mr-3">
                                                <div className="w-1 h-1 bg-cyan-500/50 rounded-full group-hover:bg-cyan-400" />
                                                <div className="w-1 h-1 bg-cyan-500 rounded-full group-hover:shadow-[0_0_5px_cyan]" />
                                            </div>
                                            <span className="text-xl font-sans-sc text-cyan-200 tracking-wider group-hover:text-white transition-colors">
                                                {tag}
                                            </span>
                                            {/* Corner accents */}
                                            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyan-500/0 group-hover:border-cyan-400 transition-colors" />
                                            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyan-500/0 group-hover:border-cyan-400 transition-colors" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col h-full pt-4">
                         <div className="mb-8 relative">
                           <h2 className={`text-[40px] leading-[1.5] font-semibold ${theme.fontDisplay} ${theme.textColor} mb-6 z-10 relative`}>
                             {data.title}
                           </h2>
                         </div>
                         <div className="flex-1 relative p-8 border border-dashed border-cyan-800 bg-cyan-950/20">
                            {/* 角落装饰 */}
                            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-500" />
                            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-500" />
                            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan-500" />
                            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-500" />

                            <MarkdownRenderer content={data.body} theme={theme} />
                         </div>
                      </div>
                    )}
                </div>

                {/* 底部 */}
                <div className="relative z-20 pt-8 mt-auto flex justify-between items-end">
                     <div className={`flex flex-col ${theme.textColor} opacity-70`}>
                       <span className="text-[10px] uppercase tracking-[0.2em] mb-1 font-mono">
                           Generated By
                       </span>
                       <span className="text-lg font-bold font-mono">{customFooter || "LIQUID_AI"}</span>
                     </div>
                     <div className="flex flex-col items-end">
                        <span className={`text-xs uppercase tracking-widest opacity-50 ${theme.textColor} font-mono`}>
                            END_TRANSMISSION
                        </span>
                     </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
