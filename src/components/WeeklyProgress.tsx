import React from 'react';
import { startOfWeek, endOfWeek, eachDayOfInterval, format, subWeeks } from 'date-fns';
import { Expense } from '../types/expense';
import { theme } from '../utils/theme';

interface WeeklyProgressProps {
  expenses: Expense[];
}

export default function WeeklyProgress({ expenses }: WeeklyProgressProps) {
  const today = new Date();
  const lastThreeWeeks = Array.from({ length: 3 }, (_, i) => ({
    start: startOfWeek(subWeeks(today, i)),
    end: endOfWeek(subWeeks(today, i)),
  })).reverse();

  const getWeeklyTotal = (start: Date, end: Date) => {
    return expenses.reduce((total, expense) => {
      const expenseDate = new Date(expense.date);
      if (expenseDate >= start && expenseDate <= end) {
        return total + expense.amount;
      }
      return total;
    }, 0);
  };

  const weeklyTotals = lastThreeWeeks.map((week) => ({
    week: format(week.start, 'MMM d') + ' - ' + format(week.end, 'MMM d'),
    total: getWeeklyTotal(week.start, week.end),
  }));

  const maxTotal = Math.max(...weeklyTotals.map((w) => w.total));
  const getRating = (total: number) => {
    if (total === 0) return { text: 'No Expenses', color: theme.colors.text.secondary };
    const ratio = total / maxTotal;
    if (ratio <= 0.2) return { text: 'Excellent!', color: theme.colors.rating.excellent };
    if (ratio <= 0.4) return { text: 'Good Job!', color: theme.colors.rating.good };
    if (ratio <= 0.6) return { text: 'Not Bad', color: theme.colors.rating.average };
    if (ratio <= 0.8) return { text: 'Watch Out!', color: theme.colors.rating.poor };
    return { text: 'Too High!', color: theme.colors.rating.bad };
  };

  return (
    <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: theme.colors.surface }}>
      <h3 className="text-lg font-semibold mb-4" style={{ color: theme.colors.text.primary }}>
        Weekly Progress (Last 3 Weeks)
      </h3>
      <div className="space-y-4">
        {weeklyTotals.map(({ week, total }) => {
          const rating = getRating(total);
          return (
            <div key={week} className="relative">
              <div className="flex justify-between mb-1">
                <span style={{ color: theme.colors.text.primary }}>{week}</span>
                <span style={{ color: rating.color }}>{rating.text}</span>
              </div>
              <div className="h-4 rounded-full overflow-hidden" style={{ backgroundColor: theme.colors.hover }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: total === 0 ? '0%' : `${(total / maxTotal) * 100}%`,
                    backgroundColor: rating.color,
                  }}
                />
              </div>
              <div className="mt-1 text-sm" style={{ color: theme.colors.text.secondary }}>
                ₹{total.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}