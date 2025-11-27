
import React from 'react';
import { CardProps } from '../../types';
import { MarkdownRenderer } from '../MarkdownRenderer';

export const MinimalCleanCard: React.FC<CardProps> = ({ 
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
    <div className="absolute inset-0 bg-[#E8E8E8]">
       <div className="absolute inset-0 bg-[#F7F7F5]" />
       <div className="absolute inset-0 opacity-50 mix-blend-multiply" 
            style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/concrete-wall.png")` }} />
       <div className="absolute inset-0 opacity-30 mix-blend-multiply" 
            style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/dust.png")` }} />
       <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-black/5" />
       <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full border-[1px] border-white/60 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05),1px_1px_0_white]" />
       <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full border-[1px] border-black/5 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),-1px_-1px_2px_rgba(0,0,0,0.02)]" />
       <div className="absolute top-0 bottom-0 left-24 w-[2px] bg-[#E5E5E0] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1),1px_0_0_rgba(255,255,255,0.5)]" />
       <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-[#E0E0DC] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.15),1px_1px_1px_white]" />
    </div>
  );

  const renderDecorations = () => (
    <>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/porcelain.png")` }} />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/80 via-transparent to-black/5 pointer-events-none" />
        <div className="absolute top-24 bottom-24 left-[28%] w-[1px] bg-gray-200" />
        <div className="absolute top-12 right-12 w-16 h-16 rounded-full border border-gray-100 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05),1px_1px_0px_white]" />
    </>
  );

  const containerClass = `relative w-full h-full overflow-hidden transition-all duration-300 bg-[#fafafa] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.02)] rounded-[2px]`;

  return (
    <div className={`relative w-[800px] h-[1200px] flex-shrink-0 overflow-hidden transition-all duration-500 ${!shouldRenderBackground ? theme.bgGradient : ''} shadow-2xl text-left`}>
      {shouldRenderBackground && renderFrameBackground()}
      
      <div className={`absolute inset-0 ${showFrame ? 'p-20' : 'p-0'} transition-all duration-300 flex items-center justify-center z-30`}>
        <div className={containerClass}>
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              {renderDecorations()}
            </div>

            <div className="relative z-10 h-full flex flex-col p-0">
                <div className="flex h-full text-[#2d2d2d]">
                    <div className="w-[28%] h-full border-r border-gray-100 p-10 flex flex-col justify-between bg-gray-50/30 relative z-10">
                        <div>
                            <span className="block text-sm font-bold uppercase tracking-[0.25em] text-gray-400 mb-4">
                                {customHeader || "GALLERY"}
                            </span>
                            <div className="w-8 h-[2px] bg-gray-800 mb-8" />
                            {!isCover && (
                                <span className="text-9xl font-serif font-medium text-gray-300">
                                    {String(index).padStart(2, '0')}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-8">
                            {isCover && customTags && customTags.length > 0 && (
                                <div className="space-y-4">
                                    <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 border-b border-gray-200 pb-2">
                                        Keywords
                                    </span>
                                    <div className="flex flex-col gap-6">
                                        {customTags.map((tag, i) => (
                                            <div key={i} className="group relative flex items-center gap-3">
                                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full group-hover:bg-gray-800 transition-colors duration-300"></span>
                                                <span className="block text-xl font-serif-sc font-medium text-gray-600 group-hover:text-gray-900 transition-colors duration-300 tracking-wide">
                                                    {tag}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="space-y-1">
                                <span className="block text-xs font-bold uppercase text-gray-400">Curated</span>
                                <span className="block text-sm font-serif italic text-gray-600">{customFooter || "Liquid AI"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 py-16 px-12 flex flex-col justify-center relative z-20">
                        {isCover ? (
                            <div className="flex flex-col justify-between h-full py-10">
                                <div className="border-b border-gray-200 pb-12 mb-10">
                                    <div className="inline-flex items-center gap-2 border border-gray-300 px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-8 bg-white/50">
                                        <span className="w-1.5 h-1.5 bg-gray-800 rounded-full"></span>
                                        Exhibition Title
                                    </div>
                                    <h1 className="text-[60px] font-bold leading-[1.6] text-[#111] font-serif-sc">
                                        {data.title}
                                    </h1>
                                </div>
                                <p className="text-3xl leading-relaxed text-gray-800 font-serif-sc tracking-wide">
                                    {customSubtitle || data.body}
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col h-full py-4">
                                <div className="mb-12">
                                    <h2 className={`text-4xl font-medium leading-tight text-gray-900 mb-6 ${theme.fontDisplay}`}>
                                        {data.title}
                                    </h2>
                                    <div className="w-12 h-1 bg-gray-900" />
                                </div>
                                
                                <div className="flex-1">
                                    <MarkdownRenderer content={data.body} theme={theme} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
