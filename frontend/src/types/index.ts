// src/types/index.ts
  
  export interface AuthCredentials {
    username: string;
    password: string;
  }
  
  export interface SignUpData extends AuthCredentials {
    first_name: string;
    last_name: string;
  }
  
  export interface AlertProps {
    type: 'success' | 'error' | 'info';
    title: string;
    message: string;
    onClose: () => void;
  }
  
  export interface ApiResponse<T> {
    token?: string;
    message?: string;
    error?: string;
  }

  // User object
export interface User {
  first_name: string;
  last_name: string;
  username: string;
  created_at: string; // ISO string
}

// Account object
export interface Account {
  id: string;        // UUID
  user_id: string;  // UUID
  balance: number;
}

// Transaction object (adjust fields if you add more later)
export interface Transaction {
  id: string;
  amount: string; // Decimal comes as string from backend
  status: "SUCCESS" | "INCOMPLETE" | "FAILED";
  sender_id?: string;
  receiver_id?: string;
  created_at: string;
}

// Dashboard API response
export interface DashboardResponse {
  message: string;
  user: User;
  account: Account;
  transactions: Transaction[];
}
