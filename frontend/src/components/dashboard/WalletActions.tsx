// src/components/dashboard/WalletActions.tsx

'use client';

import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Alert } from '../ui/Alert';
import { addMoney } from '@/services/walletService';

interface WalletActionsProps {
  onSuccess: () => void;
}

export const WalletActions: React.FC<WalletActionsProps> = ({ onSuccess }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{type: 'success' | 'error' | 'info', title: string, message: string} | null>(null);

  const handleAddMoney = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const amountNum = parseFloat(amount);
    if (!amount || isNaN(amountNum) || amountNum <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await addMoney({ amount: amountNum });

      if (response.success) {
        setAlert({
          type: 'success',
          title: 'Success!',
          message: `₹${amountNum.toFixed(2)} added to your wallet`
        });
        setAmount('');
        setTimeout(() => {
          onSuccess();
          setAlert(null);
        }, 2000);
      } else {
        setAlert({
          type: 'error',
          title: 'Error',
          message: response.message || 'Failed to add money'
        });
      }
    } catch (error) {
      setAlert({
        type: 'error',
        title: 'Error',
        message: 'An unexpected error occurred'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card title="Add Money" subtitle="Add money to your wallet">
      {alert && (
        <div className="mb-4">
          <Alert
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        </div>
      )}

      <form onSubmit={handleAddMoney} className="space-y-4">
        <Input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setError('');
          }}
          error={error}
          step="0.01"
          min="0"
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          isLoading={isLoading}
        >
          Add Money
        </Button>
      </form>

      <div className="mt-4 pt-4 border-t">
        <p className="text-xs text-gray-500">
          Quick add amounts
        </p>
        <div className="flex gap-2 mt-2">
          {[500, 1000, 2000, 5000].map((quickAmount) => (
            <button
              key={quickAmount}
              type="button"
              onClick={() => setAmount(quickAmount.toString())}
              className="flex-1 px-2 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              ₹{quickAmount}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};