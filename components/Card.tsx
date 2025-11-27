
import React from 'react';
import { ThemeStyle } from '../types';
import { CardProps } from '../types';

import { LiquidAuroraCard } from './themes/LiquidAuroraCard';
import { MinimalCleanCard } from './themes/MinimalCleanCard';
import { NeonNightsCard } from './themes/NeonNightsCard';
import { NoteKraftCard } from './themes/NoteKraftCard';
import { NoteGridCard } from './themes/NoteGridCard';
import { NoteDotCard } from './themes/NoteDotCard';
import { ModernMagazineCard } from './themes/ModernMagazineCard';
import { TechBlueprintCard } from './themes/TechBlueprintCard';

export const Card: React.FC<CardProps> = (props) => {
  switch (props.theme.id) {
    case ThemeStyle.LIQUID_AURORA:
      return <LiquidAuroraCard {...props} />;
    case ThemeStyle.MINIMAL_CLEAN:
      return <MinimalCleanCard {...props} />;
    case ThemeStyle.NEON_NIGHTS:
      return <NeonNightsCard {...props} />;
    case ThemeStyle.NOTE_KRAFT:
      return <NoteKraftCard {...props} />;
    case ThemeStyle.NOTE_GRID:
      return <NoteGridCard {...props} />;
    case ThemeStyle.NOTE_DOT:
      return <NoteDotCard {...props} />;
    case ThemeStyle.MODERN_MAGAZINE:
      return <ModernMagazineCard {...props} />;
    case ThemeStyle.TECH_BLUEPRINT:
      return <TechBlueprintCard {...props} />;
    default:
      return <LiquidAuroraCard {...props} />;
  }
};
