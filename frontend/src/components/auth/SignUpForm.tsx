// src/components/auth/SignUpForm.tsx

'use client';

import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Alert } from '../ui/Alert';
import { signUp } from '@/services/authService';
import Link from 'next/link';

export const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{type: 'success' | 'error' | 'info', title: string, message: string} | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.first_name.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.last_name.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await signUp(formData);
      if (response.message) {
        setAlert({
          type: 'success',
          title: 'Success!',
          message: response.message || 'Account created successfully. Redirecting to sign in...'
        });

        // fetch token from response and store it in local storage
        const token = response.token
        if (!token){
          setAlert({
            type: 'error',
            title: 'Token Not Found!',
            message: 'Account created successfully, but could not find token, Login in...'
          });
          setTimeout(() => {
            window.location.href = '/signin';
          }, 2000);
          return
        } 

        localStorage.setItem('access_token', token)

        // Redirect to sign in after 2 seconds
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2000);
      } else {
        setAlert({
          type: 'error',
          title: 'Error',
          message: response.message || 'Failed to create account'
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
    <div className="w-full max-w-md">
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="First Name"
          name="first_name"
          type="text"
          placeholder="Enter your first name"
          value={formData.first_name}
          onChange={handleChange}
          error={errors.firstName}
        />

        <Input
          label="Last Name"
          name="last_name"
          type="text"
          placeholder="Enter your last name"
          value={formData.last_name}
          onChange={handleChange}
          error={errors.lastName}
        />

        <Input
          label="Username"
          name="username"
          type="text"
          placeholder="Choose a username"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          isLoading={isLoading}
        >
          Sign Up
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/signin" className="text-blue-600 hover:text-blue-700 font-medium">
          Sign In
        </Link>
      </p>
    </div>
  );
};