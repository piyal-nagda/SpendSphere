import { useMemo } from 'react';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isWithinInterval
} from 'date-fns';
import { Expense } from '../types/expense';

export function useMonthlyExpenses(expenses: Expense[], currentMonth: Date) {
  return useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const dailyExpenses = expenses.reduce((acc, expense) => {
      const expenseDate = new Date(expense.date);
      if (isWithinInterval(expenseDate, { start: monthStart, end: monthEnd })) {
        const dateKey = format(expenseDate, 'yyyy-MM-dd');
        acc[dateKey] = (acc[dateKey] || 0) + expense.amount;
      }
      return acc;
    }, {} as Record<string, number>);

    const maxDailyExpense = Math.max(...Object.values(dailyExpenses), 1);

    return {
      daysInMonth,
      dailyExpenses,
      maxDailyExpense,
    };
  }, [expenses, currentMonth]);
}