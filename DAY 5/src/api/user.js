import { users } from '../data/mockData';

export const getUserData = async (userId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const user = users.find(u => u.id === userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};