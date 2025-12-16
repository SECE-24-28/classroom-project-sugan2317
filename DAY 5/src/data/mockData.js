// Mock data for the application
export const users = [
  {
    id: "1",
    name: "John Doe",
    mobile: "9876543210",
    pin: "1234",
    operator: "Airtel",
    walletBalance: 500,
    currentPlanId: null,
    isActive: true
  },
  {
    id: "2",
    name: "Jane Smith",
    mobile: "9876543211",
    pin: "5678",
    operator: "Jio",
    walletBalance: 750,
    currentPlanId: null,
    isActive: true
  }
];

export const admins = [
  {
    id: "1",
    username: "admin",
    password: "admin123"
  }
];

export const plans = [
  {
    id: "1",
    name: "Basic Plan",
    price: 199,
    data: "1.5",
    validity: 28,
    sms: "100/day",
    calls: "Unlimited",
    active: true
  },
  {
    id: "2",
    name: "Standard Plan",
    price: 299,
    data: "2",
    validity: 28,
    sms: "100/day",
    calls: "Unlimited",
    active: true
  },
  {
    id: "3",
    name: "Popular Plan",
    price: 399,
    data: "3",
    validity: 56,
    sms: "100/day",
    calls: "Unlimited",
    active: true
  },
  {
    id: "4",
    name: "Premium Plan",
    price: 499,
    data: "4",
    validity: 56,
    sms: "100/day",
    calls: "Unlimited",
    active: true
  },
  {
    id: "5",
    name: "Super Plan",
    price: 699,
    data: "6",
    validity: 84,
    sms: "100/day",
    calls: "Unlimited",
    active: true
  },
  {
    id: "6",
    name: "Ultimate Plan",
    price: 999,
    data: "12",
    validity: 84,
    sms: "100/day",
    calls: "Unlimited",
    active: true
  }
];

export const payments = [
  {
    id: "1",
    userId: "1",
    planId: "3",
    amount: 399,
    date: "2024-01-15T10:30:00.000Z",
    status: "completed",
    method: "wallet"
  },
  {
    id: "2",
    userId: "2",
    planId: "2",
    amount: 299,
    date: "2024-01-10T14:20:00.000Z",
    status: "completed",
    method: "upi"
  }
];

export const notifications = [
  {
    id: "1",
    userId: "1",
    message: "Your plan expires in 5 days. Recharge now to avoid service interruption.",
    read: false,
    timestamp: "2024-01-20T10:30:00.000Z"
  },
  {
    id: "2",
    userId: "1",
    message: "Low wallet balance alert. Current balance: ₹50",
    read: false,
    timestamp: "2024-01-19T15:45:00.000Z"
  },
  {
    id: "3",
    userId: "1",
    message: "New offers available! Get 50% extra data on your next recharge.",
    read: true,
    timestamp: "2024-01-18T09:15:00.000Z"
  }
];

export const fraudAlerts = [
  {
    id: "1",
    userId: "1",
    type: "High Value Payment",
    description: "Payment of ₹15000 exceeds threshold",
    severity: "Medium",
    timestamp: "2024-01-20T14:30:00.000Z",
    resolved: false
  }
];