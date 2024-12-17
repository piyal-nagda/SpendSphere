import React, { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Expense } from '../types/expense';
import { categories } from '../data/categories';
import { formatCurrency } from '../utils/currency';
import { formatDate, canEdit } from '../utils/date';
import { theme } from '../utils/theme';
import ExpenseForm from './ExpenseForm';

interface ExpenseListProps {
  expenses: Expense[];
  onUpdateExpense: (id: string, expense: Omit<Expense, 'id'>) => void;
  onDeleteExpense: (id: string) => void;
}

export default function ExpenseList({ expenses, onUpdateExpense, onDeleteExpense }: ExpenseListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEdit = (expense: Expense) => {
    if (canEdit(expense.date)) {
      setEditingId(expense.id);
    }
  };

  return (
    <div className="rounded-lg shadow-md overflow-hidden" style={{ backgroundColor: theme.colors.surface }}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y" style={{ borderColor: theme.colors.border }}>
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" 
                  style={{ color: theme.colors.text.primary }}>
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: theme.colors.text.primary }}>
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: theme.colors.text.primary }}>
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: theme.colors.text.primary }}>
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  style={{ color: theme.colors.text.primary }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: theme.colors.border }}>
            {expenses.map((expense) => {
              const category = categories.find((c) => c.name === expense.category);
              const isEditable = canEdit(expense.date);

              if (editingId === expense.id) {
                return (
                  <tr key={expense.id}>
                    <td colSpan={5} className="px-6 py-4">
                      <ExpenseForm
                        initialData={expense}
                        isEditing={true}
                        onAddExpense={(updatedExpense) => {
                          onUpdateExpense(expense.id, updatedExpense);
                          setEditingId(null);
                        }}
                      />
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={expense.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: theme.colors.text.secondary }}>
                    {formatDate(expense.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                      style={{
                        backgroundColor: `${category?.color}33`,
                        color: category?.color,
                      }}
                    >
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: theme.colors.text.secondary }}>
                    {expense.description || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" style={{ color: theme.colors.text.primary }}>
                    {formatCurrency(expense.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {isEditable && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(expense)}
                          className="p-1 rounded-full hover:bg-opacity-20"
                          style={{ color: theme.colors.text.primary }}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteExpense(expense.id)}
                          className="p-1 rounded-full hover:bg-opacity-20"
                          style={{ color: theme.colors.text.danger }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}