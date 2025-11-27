
import React from 'react';
import { ThemeStyle, ThemeConfig } from '../types';

interface MarkdownRendererProps {
  content: string;
  theme: ThemeConfig;
  // 新增：允许传入自定义颜色类名，用于适配卡片的动态背景
  customColors?: {
    ulBullet?: string; // 无序列表标识颜色类
    olMarker?: string; // 有序列表序号颜色类
    h3Decoration?: string; // H3 装饰色
    // 新增：引用和代码块的动态颜色
    blockquoteBorder?: string;
    blockquoteBg?: string;
    codeBg?: string;
    codeText?: string;
    codeBorder?: string;
  };
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, theme, customColors }) => {
  // 简单的 Markdown 解析逻辑
  // 支持: ### H3, -/* 无序列表, 1. 有序列表, > 引用, **粗体**, *斜体*, `代码`
  
  const getThemeStyles = (id: ThemeStyle) => {
    const baseText = "text-[28px] leading-relaxed mb-8";
    const listBase = "text-[28px] leading-relaxed";
    
    switch (id) {
      case ThemeStyle.LIQUID_AURORA:
        // 极光流体：动态颜色
        const auroraBullet = customColors?.ulBullet || "before:bg-purple-400";
        const auroraMarker = customColors?.olMarker || "marker:text-purple-500 text-purple-700"; 
        const auroraH3Before = customColors?.h3Decoration || "before:from-blue-400 before:to-purple-400";
        
        // 引用与代码块颜色
        const auroraBqBorder = customColors?.blockquoteBorder || "border-purple-400";
        const auroraBqBg = customColors?.blockquoteBg || "bg-purple-50/50";
        const auroraCodeBg = customColors?.codeBg || "bg-purple-100";
        const auroraCodeText = customColors?.codeText || "text-purple-700";

        return {
          h3: `text-[32px] font-sans-sc font-bold text-slate-800 mt-10 mb-6 flex items-center gap-3 before:content-[''] before:w-3 before:h-3 before:bg-gradient-to-tr ${auroraH3Before} before:rounded-full before:shadow-md`,
          p: `font-sans-sc text-slate-700 ${baseText}`,
          ul: "list-none space-y-3 mb-8 ml-0 font-sans-sc",
          liUl: `relative pl-10 before:content-[''] before:absolute before:left-0 before:top-[20px] before:w-2.5 before:h-2.5 ${auroraBullet} before:rounded-full ${listBase} text-slate-700`,
          liOl: `${listBase} text-slate-700 pl-4`, 
          ol: `list-decimal list-outside space-y-3 mb-8 ml-10 text-slate-700 font-sans-sc ${auroraMarker} marker:font-bold`,
          blockquote: `border-l-4 ${auroraBqBorder} ${auroraBqBg} p-4 rounded-r-xl text-slate-600 mb-8 font-sans-sc text-[26px] shadow-sm`,
          code: `${auroraCodeBg} ${auroraCodeText} px-1.5 py-0.5 rounded text-[0.9em] font-mono`,
          strong: "font-bold text-slate-900",
        };
      case ThemeStyle.NEON_NIGHTS:
        // 赛博流体：动态颜色
        const neonBullet = customColors?.ulBullet || "before:text-fuchsia-400";
        const neonMarker = customColors?.olMarker || "marker:text-cyan-400";
        const neonH3Border = customColors?.h3Decoration || "border-fuchsia-500 from-fuchsia-500/10";
        
        // 引用与代码块颜色
        const neonBqBorder = customColors?.blockquoteBorder || "border-cyan-400";
        const neonBqBg = customColors?.blockquoteBg || "bg-cyan-950/30";
        const neonCodeBg = customColors?.codeBg || "bg-cyan-900/40";
        const neonCodeText = customColors?.codeText || "text-cyan-300";
        const neonCodeBorder = customColors?.codeBorder || "border-cyan-500/30";

        return {
          // 赛博流体 H3：终端命令行风格，左侧边框 + 渐变背景
          h3: `text-[28px] font-mono font-bold text-cyan-300 mt-12 mb-6 border-l-[4px] pl-4 py-2 bg-gradient-to-r to-transparent tracking-wide w-full ${neonH3Border}`,
          p: `font-sans-sc text-cyan-50/90 ${baseText}`,
          ul: "list-none space-y-3 mb-8 ml-0",
          liUl: `relative pl-10 before:content-['>'] before:absolute before:left-0 before:top-0 ${neonBullet} before:font-bold before:font-mono ${listBase} text-cyan-50/90`,
          liOl: `${listBase} pl-4 text-cyan-50/90`,
          ol: `list-decimal list-outside space-y-3 mb-8 ml-8 text-cyan-100/90 font-sans-sc ${neonMarker} marker:text-[24px]`,
          blockquote: `border-l-2 ${neonBqBorder} ${neonBqBg} p-4 text-cyan-100 mb-8 shadow-[0_0_15px_rgba(6,182,212,0.1)] text-[26px] rounded-r-lg`,
          code: `${neonCodeBg} ${neonCodeText} border ${neonCodeBorder} px-1.5 py-0.5 rounded text-[0.9em] font-mono`,
          strong: "font-bold text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]",
        };
      case ThemeStyle.MINIMAL_CLEAN:
        return {
          h3: "text-[32px] font-serif-sc font-black text-gray-900 mt-10 mb-6 tracking-tight flex items-center gap-4 before:w-8 before:h-[2px] before:bg-gray-300",
          p: `font-serif-sc text-gray-700 ${baseText} text-[24px]`,
          ul: "list-disc space-y-3 mb-8 ml-8 text-[24px] font-serif-sc marker:text-gray-400",
          liUl: `relative pl-2 ${listBase} text-gray-700`,
          liOl: `${listBase} pl-2 text-gray-700`,
          ol: "font-serif-sc list-decimal list-outside space-y-3 mb-8 ml-8 text-gray-700 text-[24px] font-serif-sc marker:text-gray-400 marker:font-bold marker:text-2xl",
          blockquote: "border-l-2 border-gray-300 pl-4 py-2 text-gray-500 mb-8 font-serif text-[24px]",
          code: "bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-[0.9em] border border-gray-200 font-mono",
          strong: "font-bold text-gray-900",
        };
      case ThemeStyle.NOTE_KRAFT:
        return {
          h3: "text-[32px] font-serif-sc font-black text-[#3e2723] mt-10 mb-6 uppercase tracking-wide border-b-2 border-[#8d6e63] border-dashed pb-2 inline-block",
          p: `font-sans-sc text-[#4e342e] ${baseText}`,
          ul: "list-disc space-y-3 mb-8 ml-8 font-sans-sc marker:text-[#8d6e63]",
          liUl: `relative pl-2 ${listBase} text-[#4e342e]`,
          liOl: `${listBase} pl-2 text-[#4e342e]`,
          ol: "list-decimal list-outside space-y-3 mb-8 ml-8 text-[#4e342e] font-sans-sc marker:text-[#8d6e63]",
          blockquote: "relative p-4 text-[#5d4037] mb-8 font-serif-sc text-[26px] bg-[url('https://www.transparenttextures.com/patterns/lined-paper.png')] border border-[#8d6e63]/30 shadow-sm",
          code: "bg-[#d7ccc8] text-[#3e2723] px-1.5 py-0.5 rounded-sm text-[0.9em] font-mono border border-[#a1887f]",
          strong: "font-bold text-[#271c19]",
        };
      case ThemeStyle.NOTE_GRID:
        return {
          // 数字方格 H3：反色标签风格，黑底白字 + 蓝色硬阴影
          h3: "text-[28px] font-sans-sc font-medium text-white bg-slate-900 px-4 py-1 mt-8 mb-6 inline-block shadow-[4px_4px_0_#2563eb]",
          p: `font-sans-sc text-slate-700 ${baseText}`,
          ul: "list-none space-y-3 mb-8 ml-0",
          liUl: `relative pl-10 before:content-[''] before:absolute before:left-0 before:top-[16px] before:w-4 before:h-4 before:bg-blue-600 ${listBase} text-slate-700`,
          liOl: `${listBase} pl-2 text-slate-700`,
          ol: "list-decimal list-outside space-y-3 mb-8 ml-8 text-slate-700 font-sans-sc marker:text-blue-600 marker:font-bold marker:text-2xl",
          blockquote: "border-l-[6px] border-blue-600 bg-slate-50 p-4 text-slate-600 mb-8 font-sans-sc text-[26px]",
          code: "bg-slate-100 text-blue-600 px-1.5 py-0.5 border border-slate-200 text-[0.9em] font-mono",
          strong: "font-bold text-slate-900 bg-blue-50 px-1 border-b-2 border-blue-200",
        };
      case ThemeStyle.NOTE_DOT:
        return {
          // 点阵手账 H3：底部高亮标记风格
          h3: "text-[32px] font-sans-sc font-bold text-slate-700 mt-10 mb-6 inline-block border-b-[12px] border-[#e6e2d3] leading-[0.8] pr-4",
          p: `font-sans-sc text-slate-700 ${baseText}`,
          ul: "list-none space-y-3 mb-8 ml-0",
          liUl: `relative pl-8 before:content-['○'] before:absolute before:left-0 before:top-[12px] before:text-slate-400 before:font-bold before:text-sm ${listBase} text-slate-700`,
          liOl: `${listBase} pl-2 text-slate-700`,
          ol: "list-decimal list-outside space-y-3 mb-8 ml-8 text-slate-700 font-sans-sc marker:text-slate-500 marker:text-2xl ",
          blockquote: "relative pl-4 text-slate-600 mb-8 text-[26px] before:content-['“'] before:absolute before:top-[-20px] before:left-[-40px] before:text-9xl before:text-slate-200 before:font-serif",
          code: "bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-lg text-[0.9em]",
          strong: "font-bold text-slate-900 box-decoration-clone bg-yellow-100 px-1",
        };
      case ThemeStyle.MODERN_MAGAZINE:
        return {
          h3: "text-[32px] font-serif-sc font-black text-black mt-12 mb-8 leading-none uppercase tracking-widest border-b-[3px] border-black inline-block pb-2",
          p: `font-serif font-medium text-black ${baseText}`,
          ul: "list-none space-y-3 mb-8 ml-0 font-serif-sc",
          liUl: `relative pl-8 before:content-[''] before:absolute before:left-0 before:top-[18px] before:w-4 before:h-[2px] before:bg-black ${listBase} text-black`,
          liOl: `${listBase} pl-4 text-black`,
          ol: "list-decimal list-outside space-y-3 mb-8 ml-6 text-black font-serif-sc marker:font-black marker:text-2xl",
          blockquote: "relative p-6 text-[26px] font-serif-sc font-medium text-black my-4 bg-gray-50/50 border-l-[8px] border-black overflow-hidden z-10 before:content-['“'] before:absolute before:top-[-10px] before:right-[10px] before:text-[100px] before:text-black/5 before:font-serif before:leading-none before:-z-10",
          code: "bg-gray-100 text-black px-1 py-0.5 text-[0.9em] font-mono border border-gray-300",
          strong: "font-black bg-black text-white px-1",
        };
      case ThemeStyle.TECH_BLUEPRINT:
        return {
          h3: "text-[32px] font-sans-sc font-bold text-cyan-400 mt-10 mb-6 uppercase tracking-wider before:content-['['] after:content-[']'] before:text-cyan-600 after:text-cyan-600 before:mr-2 after:ml-2",
          p: `font-sans-sc text-cyan-50/80 ${baseText}`,
          ul: "list-none space-y-3 mb-8 ml-0",
          liUl: `relative pl-12 before:content-['[+]'] before:absolute before:left-0 before:top-[10px] before:text-cyan-500 before:text-xl before:font-mono ${listBase} text-cyan-50/80`,
          liOl: `${listBase} text-cyan-50/80`,
          ol: "list-decimal list-outside space-y-3 mb-8 ml-12 text-cyan-50/80 font-sans-sc marker:text-cyan-400 marker:font-mono marker:text-2xl",
          blockquote: "border border-dashed border-cyan-500/50 bg-cyan-950/30 p-6 text-cyan-200 mb-8 font-sans-sc text-[26px] relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-2 before:h-2 before:border-t before:border-l before:border-cyan-500",
          code: "bg-cyan-900/50 text-cyan-300 px-1.5 py-0.5 text-[0.9em] font-mono border border-cyan-500/30",
          strong: "font-bold text-white text-shadow-[0_0_5px_rgba(255,255,255,0.5)]",
        };
      default:
        return {
          h3: "text-[32px] font-bold text-slate-800 mt-8 mb-4",
          p: `text-slate-700 ${baseText}`,
          ul: "list-disc list-outside space-y-2 mb-8 ml-5",
          liUl: `${listBase} text-slate-700`,
          liOl: `${listBase} text-slate-700`,
          ol: "list-decimal list-outside space-y-2 mb-8 ml-5",
          blockquote: "border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-6 text-[26px]",
          code: "bg-gray-100 px-1 rounded text-sm font-mono",
          strong: "font-bold",
        };
    }
  };

  const styles = getThemeStyles(theme.id);

  // 解析并渲染内联样式 (Bold, Italic, Code)
  const renderInline = (text: string) => {
    // 1. Split by Code (`...`)
    const codeParts = text.split(/(`[^`]+`)/g);
    
    return codeParts.map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`')) {
            return <code key={i} className={styles.code}>{part.slice(1, -1)}</code>;
        }

        // 2. Split by Bold (**...**)
        const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
        return boldParts.map((subPart, j) => {
            if (subPart.startsWith('**') && subPart.endsWith('**')) {
                return <strong key={`${i}-${j}`} className={styles.strong}>{subPart.slice(2, -2)}</strong>;
            }

            // 3. Split by Italic (*...*)
            const italicParts = subPart.split(/(\*[^*]+\*)/g);
            return italicParts.map((miniPart, k) => {
                if (miniPart.startsWith('*') && miniPart.endsWith('*')) {
                     return <em key={`${i}-${j}-${k}`} className="italic">{miniPart.slice(1, -1)}</em>;
                }
                return miniPart;
            });
        });
    });
  };

  // 分块解析
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  
  let currentList: React.ReactNode[] = [];
  let isOrderedList = false;
  let inBlockquote = false;
  let blockquoteContent: React.ReactNode[] = [];

  const flushList = () => {
      if (currentList.length > 0) {
          const ListTag = isOrderedList ? 'ol' : 'ul';
          elements.push(
              <ListTag key={`list-${elements.length}`} className={isOrderedList ? styles.ol : styles.ul}>
                  {currentList}
              </ListTag>
          );
          currentList = [];
      }
  };

  const flushBlockquote = () => {
      if (blockquoteContent.length > 0) {
          elements.push(
              <blockquote key={`quote-${elements.length}`} className={styles.blockquote}>
                  {blockquoteContent}
              </blockquote>
          );
          blockquoteContent = [];
          inBlockquote = false;
      }
  };

  for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (!line) {
          flushList();
          flushBlockquote();
          continue; 
      }

      // H3
      if (line.startsWith('### ')) {
          flushList();
          flushBlockquote();
          elements.push(<h3 key={`h3-${i}`} className={styles.h3}>{renderInline(line.replace(/^###\s+/, ''))}</h3>);
      }
      // Unordered List (- or *)
      else if (line.startsWith('- ') || line.startsWith('* ')) {
          flushBlockquote();
          if (isOrderedList) flushList(); // Switch list type
          isOrderedList = false;
          // Use styles.liUl for unordered items
          currentList.push(<li key={`li-${i}`} className={styles.liUl}>{renderInline(line.replace(/^[-*]\s+/, ''))}</li>);
      }
      // Ordered List (1. )
      else if (/^\d+\.\s/.test(line)) {
          flushBlockquote();
          if (!isOrderedList && currentList.length > 0) flushList(); // Switch list type
          isOrderedList = true;
          // Use styles.liOl for ordered items
          currentList.push(<li key={`li-${i}`} className={styles.liOl}>{renderInline(line.replace(/^\d+\.\s+/, ''))}</li>);
      }
      // Blockquote (> )
      else if (line.startsWith('> ')) {
          flushList();
          inBlockquote = true;
          blockquoteContent.push(<p key={`bq-p-${i}`} className="mb-2 last:mb-0">{renderInline(line.replace(/^>\s+/, ''))}</p>);
      }
      // Paragraph
      else {
          flushList();
          if (inBlockquote) {
             flushBlockquote(); 
          }
          elements.push(<p key={`p-${i}`} className={styles.p}>{renderInline(line)}</p>);
      }
  }
  
  // Flush remaining
  flushList();
  flushBlockquote();

  return <div>{elements}</div>;
};
