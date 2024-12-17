import React from 'react';
import { theme } from '../../utils/theme';
import { formatCurrency } from '../../utils/currency';

interface ExpenseOverviewProps {
  totalSpent: number;
}

export function ExpenseOverview({ totalSpent }: ExpenseOverviewProps) {
  return (
    <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: theme.colors.surface }}>
      <h2 className="text-2xl font-bold mb-4" style={{ color: theme.colors.text.primary }}>
        Overview
      </h2>
      <div className="text-4xl font-bold" style={{ color: theme.colors.primary }}>
        {formatCurrency(totalSpent)}
      </div>
      <div className="text-sm" style={{ color: theme.colors.text.secondary }}>
        Total Expenses
      </div>
    </div>
  );
}