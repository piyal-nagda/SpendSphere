import React from 'react';
import { format } from 'date-fns';
import { theme } from '../../utils/theme';
import { formatCurrency } from '../../utils/currency';

interface DailyBarProps {
  date: Date;
  amount: number;
  maxAmount: number;
}

export function DailyBar({ date, amount, maxAmount }: DailyBarProps) {
  const heightPercentage = (amount / maxAmount) * 100;
  
  return (
    <div className="flex-1 flex flex-col items-center group relative" style={{ minWidth: 0 }}>
      <div
        className="w-full rounded-t transition-all duration-300 relative"
        style={{
          height: `${heightPercentage}%`,
          backgroundColor: amount > 0 ? theme.colors.primary : theme.colors.hover,
          opacity: amount > 0 ? 0.8 : 0.3,
        }}
      >
        {amount > 0 && (
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
            {formatCurrency(amount)}
          </div>
        )}
      </div>
      <div
        className="text-xs mt-1 transform -rotate-45 origin-top-left whitespace-nowrap"
        style={{ color: theme.colors.text.secondary }}
      >
        {format(date, 'd')}
      </div>
    </div>
  );
}