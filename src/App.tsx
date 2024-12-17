import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Receipt, PlusCircle } from 'lucide-react';
import { Expense } from './types/expense';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import { theme } from './utils/theme';

function App() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTab, setActiveTab] = useState<'dashboard' | 'expenses' | 'add'>('dashboard');

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = (newExpense: Omit<Expense, 'id'>) => {
    const expense = {
      ...newExpense,
      id: crypto.randomUUID(),
    };
    setExpenses((prev) => [...prev, expense]);
    setActiveTab('expenses');
  };

  const handleUpdateExpense = (id: string, updatedExpense: Omit<Expense, 'id'>) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id ? { ...updatedExpense, id } : expense
      )
    );
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.colors.background }}>
      <nav className="shadow-sm" style={{ backgroundColor: theme.colors.surface }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold" style={{ color: theme.colors.text.primary }}>
                  ExpenseTracker
                </h1>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-4 mb-8">
          {['dashboard', 'expenses', 'add'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex items-center px-4 py-2 rounded-md ${
                activeTab === tab ? 'bg-opacity-20' : ''
              }`}
              style={{
                backgroundColor: activeTab === tab ? theme.colors.primary : theme.colors.surface,
                color: theme.colors.text.primary,
              }}
            >
              {tab === 'dashboard' && <LayoutDashboard className="w-5 h-5 mr-2" />}
              {tab === 'expenses' && <Receipt className="w-5 h-5 mr-2" />}
              {tab === 'add' && <PlusCircle className="w-5 h-5 mr-2" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <main>
          {activeTab === 'dashboard' && <Dashboard expenses={expenses} />}
          {activeTab === 'expenses' && (
            <ExpenseList
              expenses={expenses}
              onUpdateExpense={handleUpdateExpense}
              onDeleteExpense={handleDeleteExpense}
            />
          )}
          {activeTab === 'add' && <ExpenseForm onAddExpense={handleAddExpense} />}
        </main>
      </div>
    </div>
  );
}

export default App;