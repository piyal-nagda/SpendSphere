import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { categories } from '../data/categories';
import { theme } from '../utils/theme';

interface ExpenseFormProps {
  onAddExpense: (expense: {
    amount: number;
    category: string;
    description: string;
    date: string;
  }) => void;
  initialData?: {
    amount: number;
    category: string;
    description: string;
  };
  isEditing?: boolean;
}

export default function ExpenseForm({ onAddExpense, initialData, isEditing }: ExpenseFormProps) {
  const [amount, setAmount] = useState(initialData?.amount.toString() || '');
  const [category, setCategory] = useState(initialData?.category || categories[0].name);
  const [description, setDescription] = useState(initialData?.description || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;

    onAddExpense({
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toISOString(),
    });

    if (!isEditing) {
      setAmount('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-md" style={{ backgroundColor: theme.colors.surface }}>
      <div className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium" style={{ color: theme.colors.text.primary }}>
            Amount (₹)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-offset-2"
            style={{
              backgroundColor: theme.colors.background,
              color: theme.colors.text.primary,
              borderColor: theme.colors.border,
            }}
            placeholder="0.00"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium" style={{ color: theme.colors.text.primary }}>
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full rounded-md shadow-sm"
            style={{
              backgroundColor: theme.colors.background,
              color: theme.colors.text.primary,
              borderColor: theme.colors.border,
            }}
          >
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium" style={{ color: theme.colors.text.primary }}>
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md shadow-sm"
            style={{
              backgroundColor: theme.colors.background,
              color: theme.colors.text.primary,
              borderColor: theme.colors.border,
            }}
            placeholder="Enter description"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-sm font-medium"
          style={{
            backgroundColor: theme.colors.primary,
            color: theme.colors.background,
          }}
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          {isEditing ? 'Update Expense' : 'Add Expense'}
        </button>
      </div>
    </form>
  );
}