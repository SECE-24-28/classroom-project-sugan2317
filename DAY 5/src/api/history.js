import { payments, notifications } from '../data/mockData';

export const getUserPayments = async (userId) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const storedPayments = JSON.parse(localStorage.getItem('payments') || JSON.stringify(payments));
  return storedPayments.filter(p => p.userId === userId);
};

export const getNotifications = async (userId) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const storedNotifications = JSON.parse(localStorage.getItem('notifications') || JSON.stringify(notifications));
  return storedNotifications.filter(n => n.userId === userId);
};

export const markNotificationRead = async (notificationId) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const storedNotifications = JSON.parse(localStorage.getItem('notifications') || JSON.stringify(notifications));
  const notificationIndex = storedNotifications.findIndex(n => n.id === notificationId);
  
  if (notificationIndex !== -1) {
    storedNotifications[notificationIndex].read = true;
    localStorage.setItem('notifications', JSON.stringify(storedNotifications));
    return storedNotifications[notificationIndex];
  }
  
  throw new Error('Notification not found');
};