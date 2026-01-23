// src/services/authService.ts

import { AuthCredentials, SignUpData, ApiResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const signUp = async (data: SignUpData): Promise<ApiResponse<any>> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // });
    // return await response.json();

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Account created successfully',
          data: { id: '1', ...data }
        });
      }, 1500);
    });
  } catch (error) {
    return {
      success: false,
      error: 'Failed to sign up'
    };
  }
};

export const signIn = async (credentials: AuthCredentials): Promise<ApiResponse<any>> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/auth/signin`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(credentials),
    // });
    // return await response.json();

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        if (credentials.username && credentials.password) {
          resolve({
            success: true,
            message: 'Signed in successfully',
            data: { token: 'mock-jwt-token', userId: '1' }
          });
        } else {
          resolve({
            success: false,
            message: 'Invalid credentials'
          });
        }
      }, 1500);
    });
  } catch (error) {
    return {
      success: false,
      error: 'Failed to sign in'
    };
  }
};

export const logout = async (): Promise<ApiResponse<any>> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    //   method: 'POST',
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
          message: 'Logged out successfully'
        });
      }, 500);
    });
  } catch (error) {
    return {
      success: false,
      error: 'Failed to logout'
    };
  }
};