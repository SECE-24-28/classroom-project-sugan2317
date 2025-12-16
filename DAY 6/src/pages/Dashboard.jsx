import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';
import { 
  Smartphone, 
  CreditCard, 
  History, 
  Zap, 
  HelpCircle, 
  LogOut,
  User
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const dashboardCards = [
    {
      title: 'My SIM Details',
      description: 'View your SIM card information and balance',
      icon: Smartphone,
      color: 'text-blue-400',
      onClick: () => navigate('/sim-details')
    },
    {
      title: 'Recharge Plans',
      description: 'Browse and select recharge plans',
      icon: CreditCard,
      color: 'text-green-400',
      onClick: () => navigate('/plans')
    },
    {
      title: 'Payment History',
      description: 'View your transaction history',
      icon: History,
      color: 'text-purple-400',
      onClick: () => navigate('/history')
    },
    {
      title: 'Quick Recharge',
      description: 'Instant recharge with saved plans',
      icon: Zap,
      color: 'text-yellow-400',
      onClick: () => navigate('/quick-recharge')
    },
    {
      title: 'Support & Help',
      description: 'Get help and contact support',
      icon: HelpCircle,
      color: 'text-orange-400',
      onClick: () => navigate('/support')
    }
  ];

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-300">Manage your mobile recharge easily</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-300">
            <User className="w-5 h-5" />
            <span>{user?.username}</span>
          </div>
          <Button
            variant="ghost"
            onClick={logout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <Card
              key={index}
              onClick={card.onClick}
              className="h-48 flex flex-col justify-between"
            >
              <div>
                <div className={`w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-4`}>
                  <IconComponent className={`w-6 h-6 ${card.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  {card.description}
                </p>
              </div>
              <div className="flex justify-end">
                <Button variant="ghost" size="sm">
                  Open →
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card hover={false} className="text-center">
          <h3 className="text-2xl font-bold text-primary mb-2">₹250</h3>
          <p className="text-gray-300">Current Balance</p>
        </Card>
        <Card hover={false} className="text-center">
          <h3 className="text-2xl font-bold text-green-400 mb-2">15 Days</h3>
          <p className="text-gray-300">Validity Remaining</p>
        </Card>
        <Card hover={false} className="text-center">
          <h3 className="text-2xl font-bold text-accent mb-2">2.5 GB</h3>
          <p className="text-gray-300">Data Remaining</p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;