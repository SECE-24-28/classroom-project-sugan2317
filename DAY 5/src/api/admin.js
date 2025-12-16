import { users, payments } from '../data/mockData';

export const getAllUsers = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return JSON.parse(localStorage.getItem('users') || JSON.stringify(users));
};

export const getAllPayments = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return JSON.parse(localStorage.getItem('payments') || JSON.stringify(payments));
};

export const createUser = async (userData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newUser = { ...userData, id: Date.now().toString() };
  const storedUsers = JSON.parse(localStorage.getItem('users') || JSON.stringify(users));
  storedUsers.push(newUser);
  localStorage.setItem('users', JSON.stringify(storedUsers));
  return newUser;
};

export const updateUser = async (userId, userData) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const storedUsers = JSON.parse(localStorage.getItem('users') || JSON.stringify(users));
  const userIndex = storedUsers.findIndex(u => u.id === userId);
  
  if (userIndex !== -1) {
    storedUsers[userIndex] = { ...storedUsers[userIndex], ...userData };
    localStorage.setItem('users', JSON.stringify(storedUsers));
    return storedUsers[userIndex];
  }
  
  throw new Error('User not found');
};

export const deleteUser = async (userId) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const storedUsers = JSON.parse(localStorage.getItem('users') || JSON.stringify(users));
  const filteredUsers = storedUsers.filter(u => u.id !== userId);
  localStorage.setItem('users', JSON.stringify(filteredUsers));
  return { success: true };
};