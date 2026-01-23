// src/services/userService.ts

import { User, ApiResponse } from '@/types';
import { mockUsers } from '@/utils/mockData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const searchUsers = async (query: string): Promise<ApiResponse<User[]>> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/users/search?q=${encodeURIComponent(query)}`, {
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
        if (!query.trim()) {
          resolve({
            success: true,
            data: mockUsers
          });
        } else {
          const filtered = mockUsers.filter(user =>
            user.username.toLowerCase().includes(query.toLowerCase()) ||
            user.firstName.toLowerCase().includes(query.toLowerCase()) ||
            user.lastName.toLowerCase().includes(query.toLowerCase())
          );
          resolve({
            success: true,
            data: filtered
          });
        }
      }, 500);
    });
  } catch (error) {
    return {
      success: false,
      error: 'Failed to search users'
    };
  }
};

export const updateUser = async (userData: User): Promise<ApiResponse<User>> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/users/${userData.id}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   },
    //   body: JSON.stringify(userData),
    // });
    // return await response.json();

    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Profile updated successfully',
          data: userData
        });
      }, 1000);
    });
  } catch (error) {
    return {
      success: false,
      error: 'Failed to update profile'
    };
  }
};

export const getUserProfile = async (userId: string): Promise<ApiResponse<User>> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   },
    // });
    // return await response.json();

    // Mock implementation - this would normally fetch from API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: userId,
            username: 'john_doe',
            firstName: 'John',
            lastName: 'Doe',
            balance: 15750.50
          }
        });
      }, 500);
    });
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch user profile'
    };
  }
};