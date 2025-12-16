import { users, admins } from '../data/mockData';

export const loginUser = async (mobile, pin) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const user = users.find(u => u.mobile === mobile && u.pin === pin && u.isActive);
  if (user) {
    return { success: true, user, role: 'user' };
  }
  return { success: false, message: 'Invalid credentials' };
};

export const loginAdmin = async (username, password) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const admin = admins.find(a => a.username === username && a.password === password);
  if (admin) {
    return { success: true, user: admin, role: 'admin' };
  }
  return { success: false, message: 'Invalid credentials' };
};