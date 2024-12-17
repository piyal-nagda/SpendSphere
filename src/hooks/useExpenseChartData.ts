import { useMemo } from 'react';
import { format } from 'date-fns';
import { ChartData, ChartOptions } from 'chart.js';
import { Expense } from '../types/expense';
import { categories } from '../data/categories';
import { theme } from '../utils/theme';
import { defaultChartOptions } from '../utils/chartConfig';

export function useExpenseChartData(expenses: Expense[]) {
  return useMemo(() => {
    // Calculate category totals
    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    // Calculate daily totals
    const dailyTotals = expenses.reduce((acc, expense) => {
      const date = format(new Date(expense.date), 'MMM d');
      acc[date] = (acc[date] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    const doughnutData: ChartData<'doughnut'> = {
      labels: categories.map(cat => cat.name),
      datasets: [{
        data: categories.map(cat => categoryTotals[cat.name] || 0),
        backgroundColor: categories.map(cat => cat.color),
        borderColor: theme.colors.surface,
        borderWidth: 2,
      }],
    };

    const barData: ChartData<'bar'> = {
      labels: Object.keys(dailyTotals),
      datasets: [{
        label: 'Daily Expenses',
        data: Object.values(dailyTotals),
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.surface,
        borderWidth: 2,
      }],
    };

    const chartOptions: ChartOptions<'bar' | 'doughnut'> = {
      ...defaultChartOptions,
      plugins: {
        ...defaultChartOptions.plugins,
        legend: {
          ...defaultChartOptions.plugins?.legend,
          labels: {
            color: theme.colors.text.primary,
          },
        },
      },
      scales: {
        y: {
          ticks: {
            color: theme.colors.text.secondary,
          },
          grid: {
            color: `${theme.colors.border}33`,
          },
        },
        x: {
          ticks: {
            color: theme.colors.text.secondary,
          },
          grid: {
            color: `${theme.colors.border}33`,
          },
        },
      },
    };

    return { doughnutData, barData, chartOptions };
  }, [expenses]);
}