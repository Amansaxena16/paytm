// src/services/walletService.ts

import { Transaction, ApiResponse } from '@/types';
import { mockTransactions } from '@/utils/mockData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const addMoney = async (data: { amount: number }): Promise<ApiResponse<any>> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/wallet/add`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   },
    //   body: JSON.stringify(data),
    // });
    // return await response.json();

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Money added successfully',
          data: { newBalance: 15750.50 + data.amount }
        });
      }, 1500);
    });
  } catch (error) {
    return {
      success: false,
      error: 'Failed to add money'
    };
  }
};

export const sendMoney = async (data: {
  recipientId: string;
  amount: number;
}): Promise<ApiResponse<any>> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/wallet/send`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   },
    //   body: JSON.stringify(data),
    // });
    // return await response.json();

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Money sent successfully',
          data: {
            transactionId: 'txn_' + Date.now(),
            newBalance: 15750.50 - data.amount
          }
        });
      }, 1500);
    });
  } catch (error) {
    return {
      success: false,
      error: 'Failed to send money'
    };
  }
};

export const getTransactions = async (): Promise<ApiResponse<Transaction[]>> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/wallet/transactions`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   },
    // });
    // return await response.json();

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: mockTransactions
        });
      }, 500);
    });
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch transactions'
    };
  }
};

export const getBalance = async (): Promise<ApiResponse<{ balance: number }>> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/wallet/balance`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   },
    // });
    // return await response.json();

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: { balance: 15750.50 }
        });
      }, 500);
    });
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch balance'
    };
  }
};