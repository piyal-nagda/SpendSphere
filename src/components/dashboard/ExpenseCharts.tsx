import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Expense } from '../../types/expense';
import { theme } from '../../utils/theme';
import { useExpenseChartData } from '../../hooks/useExpenseChartData';

interface ExpenseChartsProps {
  expenses: Expense[];
}

export function ExpenseCharts({ expenses }: ExpenseChartsProps) {
  const { doughnutData, barData, chartOptions } = useExpenseChartData(expenses);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: theme.colors.surface }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: theme.colors.text.primary }}>
          Expenses by Category
        </h3>
        <div className="h-64">
          <Doughnut data={doughnutData} options={chartOptions} />
        </div>
      </div>

      <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: theme.colors.surface }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: theme.colors.text.primary }}>
          Daily Spending
        </h3>
        <div className="h-64">
          <Bar data={barData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}