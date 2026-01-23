// src/app/dashboard/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { UserProfile } from '@/components/dashboard/UserProfile';
import { BalanceCard } from '@/components/dashboard/BalanceCard';
import { UserSearch } from '@/components/dashboard/UserSearch';
import { SendMoneyModal } from '@/components/dashboard/SendMoneyModal';
import { WalletActions } from '@/components/dashboard/WalletActions';
import { TransactionList } from '@/components/dashboard/TransactionList';
import { User, Transaction } from '@/types';
import { mockCurrentUser, mockTransactions } from '@/utils/mockData';
import { getTransactions } from '@/services/walletService';

export default function DashboardPage() {
  const [currentUser, setCurrentUser] = useState<User>(mockCurrentUser);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isSendMoneyModalOpen, setIsSendMoneyModalOpen] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setIsLoadingTransactions(true);
    try {
      const response = await getTransactions();
      if (response.success && response.data) {
        setTransactions(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch transactions', error);
    } finally {
      setIsLoadingTransactions(false);
    }
  };

  const handleSendMoney = (user: User) => {
    setSelectedUser(user);
    setIsSendMoneyModalOpen(true);
  };

  const handleTransactionSuccess = () => {
    fetchTransactions();
    // In a real app, you would also refresh the balance
  };

  const handleUpdateProfile = (updatedUser: User) => {
    setCurrentUser(updatedUser);
  };

  const handleLogout = () => {
    // TODO: Implement logout
    window.location.href = '/signin';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">My Wallet</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - User Profile */}
          <div className="lg:col-span-3">
            <UserProfile user={currentUser} onUpdate={handleUpdateProfile} />
          </div>

          {/* Center Column - Balance & Send Money */}
          <div className="lg:col-span-6 space-y-6">
            <BalanceCard balance={currentUser.balance || 0} />
            <UserSearch onSendMoney={handleSendMoney} />
          </div>

          {/* Right Column - Wallet Actions & Transactions */}
          <div className="lg:col-span-3 space-y-6">
            <WalletActions onSuccess={handleTransactionSuccess} />
            <TransactionList
              transactions={transactions}
              isLoading={isLoadingTransactions}
            />
          </div>
        </div>
      </main>

      {/* Send Money Modal */}
      <SendMoneyModal
        isOpen={isSendMoneyModalOpen}
        onClose={() => {
          setIsSendMoneyModalOpen(false);
          setSelectedUser(null);
        }}
        recipient={selectedUser}
        onSuccess={handleTransactionSuccess}
      />
    </div>
  );
}