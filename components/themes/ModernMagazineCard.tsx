
import React from 'react';
import { CardProps } from '../../types';
import { MarkdownRenderer } from '../MarkdownRenderer';

export const ModernMagazineCard: React.FC<CardProps> = ({ 
  data, 
  theme, 
  customHeader, 
  customFooter, 
  customSubtitle,
  customTags,
  customIssue,
  showFrame = false 
}) => {
  const isCover = data.type === 'cover';
  const index = data.index || 0;
  
  const shouldRenderBackground = showFrame;

  const renderFrameBackground = () => (
    <div className="absolute inset-0 bg-[#f0f0f0]">
       <div className="absolute inset-0 bg-white" />
       <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300 opacity-50" />
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-black/40 blur-[60px] rounded-full opacity-20" />
    </div>
  );

  const renderDecorations = () => (
    <>
       <div className="absolute inset-0 bg-white" />
       <div className="absolute top-0 bottom-0 left-8 w-[1px] bg-black/10" />
       <div className="absolute bottom-40 -left-[140px] w-[400px] h-20 flex items-center justify-center rotate-[-90deg]">
          <span className="text-[96px] font-black text-black/5 tracking-tighter whitespace-nowrap font-serif-sc">
            NOTES
          </span>
       </div>
       {isCover && (
         <div className="absolute top-20 right-0 w-32 h-32 rounded-full bg-black mix-blend-multiply opacity-[0.03]" />
       )}
       <div className="absolute top-0 left-0 w-full h-4 bg-black" />
    </>
  );

  const containerClass = `relative w-full h-full overflow-hidden transition-all duration-300 bg-white shadow-xl border border-gray-200 text-black`;

  return (
    <div className={`relative w-[800px] h-[1200px] flex-shrink-0 overflow-hidden transition-all duration-500 ${!shouldRenderBackground ? theme.bgGradient : ''} shadow-2xl text-left`}>
      {shouldRenderBackground && renderFrameBackground()}
      
      <div className={`absolute inset-0 ${showFrame ? 'p-20' : 'p-0'} transition-all duration-300 flex items-center justify-center z-30`}>
        <div className={containerClass}>
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              {renderDecorations()}
            </div>

            <div className="relative z-10 h-full flex flex-col px-14 py-14">
                {/* 头部 */}
                <div className="mb-14 relative">
                     <div className="flex justify-between items-start border-b-[4px] border-black pb-6">
                         <div className="flex flex-col">
                             <h3 className="text-5xl font-black tracking-tighter leading-none uppercase transform -ml-1 font-sans-sc">
                                {customHeader || "INSIGHT"}
                             </h3>
                             <span className="text-sm font-bold bg-black text-white inline-block px-2 py-1 mt-2 w-max uppercase tracking-widest font-sans">
                                 {customIssue || "Vol. 25 / Issue 04"}
                             </span>
                         </div>
                         <div className="flex flex-col items-end">
                             <span className="text-[80px] font-black leading-none tracking-tighter font-serif-sc">
                                 {String(index).padStart(2, '0')}
                             </span>
                             <span className="text-xs font-bold uppercase tracking-widest border border-black px-2 rounded-full mt-[-10px] bg-white font-sans">
                                 PAGE
                             </span>
                         </div>
                     </div>
                     <div className="absolute -bottom-[10px] right-20 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-black" />
                </div>

                {/* 主要内容 */}
                <div className="flex-1 flex flex-col justify-center relative z-20">
                    {isCover ? (
                      <div className="flex flex-col h-full justify-center">
                        {/* 大标题：思源宋体，极粗，杂志风 */}
                        <h1 className="text-[64px] leading-[1.6] mb-8 font-serif-sc font-black text-black break-words">
                          {data.title}
                        </h1>
                        
                        <div className="border-l-[8px] border-black pl-6 mb-10">
                          {/* 副标题：思源宋体，粗体 */}
                          <p className="text-[32px] leading-[1.5] font-serif-sc font-bold text-gray-900">
                            {customSubtitle || data.body}
                          </p>
                        </div>
                          
                        {/* 标签：黑底白字风格 */}
                        {customTags && customTags.length > 0 && (
                          <div className="flex flex-wrap gap-3">
                            {customTags.map((tag, i) => (
                              <span key={i} className="px-3 py-2 bg-black text-white text-xl font-serif-sc font-bold tracking-wide">
                                # {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                      </div>
                    ) : (
                      <div className="flex flex-col h-full pt-4">
                         <div className="mb-12 relative">
                           <h2 className={`text-[40px] leading-[1.5] ${theme.fontDisplay} ${theme.textColor} mb-6 z-10 relative`}>
                             {data.title}
                           </h2>
                           <div className="w-24 h-4 bg-black mt-4" />
                         </div>

                         <div className="flex-1 relative">
                            {/* 使用 MarkdownRenderer */}
                            <div className="relative z-10">
                               <MarkdownRenderer content={data.body} theme={theme} />
                            </div>
                         </div>
                      </div>
                    )}
                </div>

                {/* 底部 */}
                <div className="relative z-20 pt-8 mt-auto flex justify-between items-end border-t-[4px] border-black">
                   <div className="flex flex-col">
                       <div className="flex h-8 items-end gap-[2px] mb-2">
                         {[...Array(20)].map((_,i) => (
                             <div key={i} className={`bg-black w-[${Math.random() > 0.5 ? '2px' : '4px'}] h-full`} />
                         ))}
                       </div>
                       <span className="text-[10px] font-mono tracking-widest">0001-2025-LK</span>
                   </div>
                   
                   <div className="text-right">
                      <div className="text-sm font-black uppercase tracking-tight bg-black text-white px-2 py-1 mb-1 inline-block font-serif-sc">
                          {customFooter || "LIQUID STUDIO"}
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-widest mt-1 font-sans">
                          Printed in Digital Reality
                      </div>
                   </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
