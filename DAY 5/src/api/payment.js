import { plans, users, payments } from '../data/mockData';

export const getPlanById = async (planId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const plan = plans.find(p => p.id === planId);
  if (!plan) {
    throw new Error('Plan not found');
  }
  return plan;
};

export const createPayment = async (paymentData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newPayment = {
    ...paymentData,
    id: Date.now().toString()
  };
  
  // Store in localStorage
  const storedPayments = JSON.parse(localStorage.getItem('payments') || '[]');
  storedPayments.push(newPayment);
  localStorage.setItem('payments', JSON.stringify(storedPayments));
  
  return newPayment;
};

export const updateUserPlan = async (userId, planId, newBalance = null) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Update user in localStorage
  const storedUsers = JSON.parse(localStorage.getItem('users') || JSON.stringify(users));
  const userIndex = storedUsers.findIndex(u => u.id === userId);
  
  if (userIndex !== -1) {
    storedUsers[userIndex].currentPlanId = planId;
    if (newBalance !== null) {
      storedUsers[userIndex].walletBalance = newBalance;
    }
    localStorage.setItem('users', JSON.stringify(storedUsers));
    return storedUsers[userIndex];
  }
  
  throw new Error('User not found');
};