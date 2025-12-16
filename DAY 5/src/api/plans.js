import { plans } from '../data/mockData';

export const getActivePlans = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return plans.filter(plan => plan.active);
};