// src/components/dashboard/UserProfile.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { User } from '@/types';
import { updateUser } from '@/services/userService';

interface UserProfileProps {
  user: User;
  onUpdate: (user: User) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
  });  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
      });
    }
  }, [user]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await updateUser({
        ...user,
        ...formData
      });

      if (response.success && response.data) {
        onUpdate(response.data);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Failed to update profile', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return null; // or a loader if you want
  }
  
  return (
    <>
      <Card title="Profile" className="h-fit">
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.first_name[0] || ""}{user.last_name[0] || ""}
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-600">Username</p>
              <p className="font-medium text-gray-900">@{user.username}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">First Name</p>
              <p className="font-medium text-gray-900">{user.first_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Last Name</p>
              <p className="font-medium text-gray-900">{user.last_name}</p>
            </div>
          </div>

          <Button
            variant="secondary"
            className="w-full"
            onClick={() => setIsModalOpen(true)}
          >
            Edit Profile
          </Button>
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Profile"
        size="sm"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="First Name"
            name="first_name"
            type="text"
            value={formData.first_name}
            onChange={handleChange}
          />
          <Input
            label="Last Name"
            name="last_name"
            type="text"
            value={formData.last_name}
            onChange={handleChange}
          />
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};