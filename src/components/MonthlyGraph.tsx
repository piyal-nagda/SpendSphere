import React, { useState } from 'react';
import { subMonths, addMonths } from 'date-fns';
import { Expense } from '../types/expense';
import { theme } from '../utils/theme';
import { useMonthlyExpenses } from '../hooks/useMonthlyExpenses';
import { MonthHeader } from './monthly/MonthHeader';
import { DailyBar } from './monthly/DailyBar';

interface MonthlyGraphProps {
  expenses: Expense[];
}

export default function MonthlyGraph({ expenses }: MonthlyGraphProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { daysInMonth, dailyExpenses, maxDailyExpense } = useMonthlyExpenses(expenses, currentMonth);

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => {
    const nextMonth = addMonths(currentMonth, 1);
    if (nextMonth <= new Date()) {
      setCurrentMonth(nextMonth);
    }
  };

  return (
    <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: theme.colors.surface }}>
      <MonthHeader
        currentMonth={currentMonth}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      
      <div className="flex items-end space-x-1 h-40">
        {daysInMonth.map((day) => (
          <DailyBar
            key={day.toISOString()}
            date={day}
            amount={dailyExpenses[day.toISOString().split('T')[0]] || 0}
            maxAmount={maxDailyExpense}
          />
        ))}
      </div>
    </div>
  );
}