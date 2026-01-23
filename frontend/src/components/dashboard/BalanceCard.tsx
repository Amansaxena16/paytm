// src/components/dashboard/BalanceCard.tsx

'use client';

import React from 'react';
import { Card } from '../ui/Card';

interface BalanceCardProps {
  balance: number;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => {
  return (
    <Card className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      <div className="space-y-2">
        <p className="text-blue-100 text-sm font-medium">Available Balance</p>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold">₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        <div className="pt-4 flex items-center gap-2 text-blue-100">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm">Account Active</span>
        </div>
      </div>
    </Card>
  );
};