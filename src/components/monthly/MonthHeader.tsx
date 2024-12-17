import React from 'react';
import { format, addMonths } from 'date-fns';
import { theme } from '../../utils/theme';

interface MonthHeaderProps {
  currentMonth: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export function MonthHeader({ currentMonth, onPrevMonth, onNextMonth }: MonthHeaderProps) {
  const canGoNext = addMonths(currentMonth, 1) <= new Date();

  return (
    <div className="flex justify-between items-center mb-6">
      <button
        onClick={onPrevMonth}
        className="px-3 py-1 rounded transition-colors duration-200 hover:opacity-80"
        style={{ backgroundColor: theme.colors.hover, color: theme.colors.text.primary }}
      >
        ←
      </button>
      <h3 className="text-lg font-semibold" style={{ color: theme.colors.text.primary }}>
        {format(currentMonth, 'MMMM yyyy')}
      </h3>
      <button
        onClick={onNextMonth}
        className="px-3 py-1 rounded transition-colors duration-200 hover:opacity-80"
        style={{ 
          backgroundColor: theme.colors.hover, 
          color: theme.colors.text.primary,
          opacity: canGoNext ? 1 : 0.5,
        }}
        disabled={!canGoNext}
      >
        →
      </button>
    </div>
  );
}