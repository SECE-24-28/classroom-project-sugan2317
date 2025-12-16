import { plans, fraudAlerts } from '../data/mockData';

export const getAllPlans = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return JSON.parse(localStorage.getItem('plans') || JSON.stringify(plans));
};

export const createPlan = async (planData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newPlan = { ...planData, id: Date.now().toString() };
  const storedPlans = JSON.parse(localStorage.getItem('plans') || JSON.stringify(plans));
  storedPlans.push(newPlan);
  localStorage.setItem('plans', JSON.stringify(storedPlans));
  return newPlan;
};

export const updatePlan = async (planId, planData) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const storedPlans = JSON.parse(localStorage.getItem('plans') || JSON.stringify(plans));
  const planIndex = storedPlans.findIndex(p => p.id === planId);
  
  if (planIndex !== -1) {
    storedPlans[planIndex] = { ...storedPlans[planIndex], ...planData };
    localStorage.setItem('plans', JSON.stringify(storedPlans));
    return storedPlans[planIndex];
  }
  
  throw new Error('Plan not found');
};

export const deletePlan = async (planId) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const storedPlans = JSON.parse(localStorage.getItem('plans') || JSON.stringify(plans));
  const filteredPlans = storedPlans.filter(p => p.id !== planId);
  localStorage.setItem('plans', JSON.stringify(filteredPlans));
  return { success: true };
};

export const getFraudAlerts = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return JSON.parse(localStorage.getItem('fraudAlerts') || JSON.stringify(fraudAlerts));
};

export const createFraudAlert = async (fraudData) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const newAlert = { ...fraudData, id: Date.now().toString() };
  const storedAlerts = JSON.parse(localStorage.getItem('fraudAlerts') || JSON.stringify(fraudAlerts));
  storedAlerts.push(newAlert);
  localStorage.setItem('fraudAlerts', JSON.stringify(storedAlerts));
  return newAlert;
};

export const resolveFraudAlert = async (fraudId) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const storedAlerts = JSON.parse(localStorage.getItem('fraudAlerts') || JSON.stringify(fraudAlerts));
  const alertIndex = storedAlerts.findIndex(a => a.id === fraudId);
  
  if (alertIndex !== -1) {
    storedAlerts[alertIndex].resolved = true;
    localStorage.setItem('fraudAlerts', JSON.stringify(storedAlerts));
    return storedAlerts[alertIndex];
  }
  
  throw new Error('Fraud alert not found');
};