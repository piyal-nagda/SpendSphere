import React from 'react';
import { Expense } from '../types/expense';
import { ExpenseOverview } from './dashboard/ExpenseOverview';
import { ExpenseCharts } from './dashboard/ExpenseCharts';
import ActivityCalendar from './ActivityCalendar';
import WeeklyProgress from './WeeklyProgress';
import MonthlyGraph from './MonthlyGraph';

export default function Dashboard({ expenses }: { expenses: Expense[] }) {
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-6">
      <ExpenseOverview totalSpent={totalSpent} />
      <ActivityCalendar expenses={expenses} />
      <WeeklyProgress expenses={expenses} />
      <MonthlyGraph expenses={expenses} />
      <ExpenseCharts expenses={expenses} />
    </div>
  );
}