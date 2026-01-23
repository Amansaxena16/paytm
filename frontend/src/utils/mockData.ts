// src/utils/mockData.ts

import { User, Transaction } from '@/types';

export const mockCurrentUser: User = {
  id: '1',
  username: 'john_doe',
  firstName: 'John',
  lastName: 'Doe',
  balance: 15750.50
};

export const mockUsers: User[] = [
  {
    id: '2',
    username: 'alice_smith',
    firstName: 'Alice',
    lastName: 'Smith'
  },
  {
    id: '3',
    username: 'bob_jones',
    firstName: 'Bob',
    lastName: 'Jones'
  },
  {
    id: '4',
    username: 'carol_white',
    firstName: 'Carol',
    lastName: 'White'
  },
  {
    id: '5',
    username: 'david_brown',
    firstName: 'David',
    lastName: 'Brown'
  },
  {
    id: '6',
    username: 'emma_davis',
    firstName: 'Emma',
    lastName: 'Davis'
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: 't1',
    senderId: '1',
    senderName: 'John Doe',
    receiverId: '2',
    receiverName: 'Alice Smith',
    amount: 500,
    status: 'completed',
    date: '2026-01-23T10:30:00',
    type: 'sent'
  },
  {
    id: 't2',
    senderId: '3',
    senderName: 'Bob Jones',
    receiverId: '1',
    receiverName: 'John Doe',
    amount: 1200,
    status: 'completed',
    date: '2026-01-22T15:45:00',
    type: 'received'
  },
  {
    id: 't3',
    senderId: '1',
    senderName: 'John Doe',
    receiverId: '4',
    receiverName: 'Carol White',
    amount: 750,
    status: 'pending',
    date: '2026-01-23T09:15:00',
    type: 'sent'
  },
  {
    id: 't4',
    senderId: '5',
    senderName: 'David Brown',
    receiverId: '1',
    receiverName: 'John Doe',
    amount: 300,
    status: 'completed',
    date: '2026-01-21T14:20:00',
    type: 'received'
  },
  {
    id: 't5',
    senderId: '1',
    senderName: 'John Doe',
    receiverId: '6',
    receiverName: 'Emma Davis',
    amount: 150,
    status: 'failed',
    date: '2026-01-20T11:00:00',
    type: 'sent'
  }
];