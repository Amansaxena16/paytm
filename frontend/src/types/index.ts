// src/types/index.ts

export interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    balance?: number;
  }
  
  export interface Transaction {
    id: string;
    senderId: string;
    senderName: string;
    receiverId: string;
    receiverName: string;
    amount: number;
    status: 'pending' | 'completed' | 'failed';
    date: string;
    type: 'sent' | 'received';
  }
  
  export interface AuthCredentials {
    username: string;
    password: string;
  }
  
  export interface SignUpData extends AuthCredentials {
    firstName: string;
    lastName: string;
  }
  
  export interface AlertProps {
    type: 'success' | 'error' | 'info';
    title: string;
    message: string;
    onClose: () => void;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
  }