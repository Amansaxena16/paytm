// src/components/dashboard/SendMoneyModal.tsx

'use client';

import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Alert } from '../ui/Alert';
import { User } from '@/types';
import { sendMoney } from '@/services/walletService';

interface SendMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: User | null;
  onSuccess: () => void;
}

export const SendMoneyModal: React.FC<SendMoneyModalProps> = ({
  isOpen,
  onClose,
  recipient,
  onSuccess
}) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{type: 'success' | 'error' | 'info', title: string, message: string} | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const amountNum = parseFloat(amount);
    if (!amount || isNaN(amountNum) || amountNum <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (!recipient) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await sendMoney({
        recipientId: recipient.id,
        amount: amountNum
      });

      if (response.success) {
        setAlert({
          type: 'success',
          title: 'Success!',
          message: `₹${amountNum.toFixed(2)} sent to ${recipient.firstName} ${recipient.lastName}`
        });
        setTimeout(() => {
          onSuccess();
          onClose();
          setAmount('');
          setAlert(null);
        }, 2000);
      } else {
        setAlert({
          type: 'error',
          title: 'Error',
          message: response.message || 'Failed to send money'
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

  const handleClose = () => {
    setAmount('');
    setError('');
    setAlert(null);
    onClose();
  };

  if (!recipient) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Send Money"
      size="sm"
    >
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

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-2">Sending to:</p>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
            {recipient.firstName[0]}{recipient.lastName[0]}
          </div>
          <div>
            <p className="font-medium text-gray-900">
              {recipient.firstName} {recipient.lastName}
            </p>
            <p className="text-sm text-gray-500">@{recipient.username}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Amount"
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

        <div className="flex gap-3 justify-end">
          <Button
            type="button"
            variant="ghost"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
          >
            Confirm Transfer
          </Button>
        </div>
      </form>
    </Modal>
  );
};