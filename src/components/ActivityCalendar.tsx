import React from 'react';
import { format, eachDayOfInterval, startOfMonth, endOfMonth, isToday } from 'date-fns';
import { Expense } from '../types/expense';
import { theme } from '../utils/theme';
import { formatCurrency } from '../utils/currency';

interface ActivityCalendarProps {
  expenses: Expense[];
}

export default function ActivityCalendar({ expenses }: ActivityCalendarProps) {
  const today = new Date();
  const startDate = startOfMonth(today);
  const endDate = endOfMonth(today);
  const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

  const dailyExpenses = expenses.reduce((acc, expense) => {
    const date = expense.date.split('T')[0];
    acc[date] = (acc[date] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const maxAmount = Math.max(...Object.values(dailyExpenses), 1);

  const getColorForAmount = (amount: number) => {
    if (amount === 0) return theme.colors.surface;
    const ratio = amount / maxAmount;
    if (ratio <= 0.2) return theme.colors.rating.excellent;
    if (ratio <= 0.4) return theme.colors.rating.good;
    if (ratio <= 0.6) return theme.colors.rating.average;
    if (ratio <= 0.8) return theme.colors.rating.poor;
    return theme.colors.rating.bad;
  };

  return (
    <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: theme.colors.surface }}>
      <h3 className="text-lg font-semibold mb-4" style={{ color: theme.colors.text.primary }}>
        Activity Calendar
      </h3>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium"
            style={{ color: theme.colors.text.secondary }}
          >
            {day}
          </div>
        ))}
        {daysInMonth.map((date) => {
          const dateStr = format(date, 'yyyy-MM-dd');
          const amount = dailyExpenses[dateStr] || 0;
          const isCurrentDay = isToday(date);

          return (
            <div
              key={dateStr}
              className={`aspect-square rounded-lg flex items-center justify-center text-sm relative group ${
                isCurrentDay ? 'ring-2 ring-offset-2' : ''
              }`}
              style={{
                backgroundColor: getColorForAmount(amount),
                color: amount === 0 ? theme.colors.text.secondary : '#FFF',
                ringColor: theme.colors.primary,
              }}
            >
              <span className="absolute top-1 left-1">{format(date, 'd')}</span>
              {amount > 0 && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="text-xs">{formatCurrency(amount)}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}