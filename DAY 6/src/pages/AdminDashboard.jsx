import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { plansAPI, paymentsAPI, usersAPI } from '../services/api';
import Card from '../components/Card';
import Button from '../components/Button';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  CreditCard, 
  Package,
  LogOut,
  X
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('plans');
  const [plans, setPlans] = useState([]);
  const [payments, setPayments] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    price: '',
    validity: '',
    data: '',
    description: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [plansRes, paymentsRes, usersRes] = await Promise.all([
        plansAPI.getAll(),
        paymentsAPI.getAll(),
        usersAPI.getAll()
      ]);
      setPlans(plansRes.data);
      setPayments(paymentsRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddPlan = () => {
    setEditingPlan(null);
    setFormData({ price: '', validity: '', data: '', description: '' });
    setShowModal(true);
  };

  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
    setFormData(plan);
    setShowModal(true);
  };

  const handleSavePlan = async () => {
    try {
      if (editingPlan) {
        await plansAPI.update(editingPlan.id, formData);
      } else {
        await plansAPI.create(formData);
      }
      fetchData();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving plan:', error);
    }
  };

  const handleDeletePlan = async (id) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      try {
        await plansAPI.delete(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting plan:', error);
      }
    }
  };

  const tabs = [
    { id: 'plans', label: 'Manage Plans', icon: Package },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'users', label: 'Users', icon: Users }
  ];

  return (
    <div className="min-h-screen">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-darker p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
          <p className="text-gray-400">Welcome, {user?.name}</p>
        </div>

        <nav className="space-y-2">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Button
            variant="ghost"
            onClick={logout}
            className="w-full flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            {tabs.find(tab => tab.id === activeTab)?.label}
          </h1>
          {activeTab === 'plans' && (
            <Button onClick={handleAddPlan} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Plan
            </Button>
          )}
        </div>

        {/* Plans Tab */}
        {activeTab === 'plans' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card key={plan.id} hover={false}>
                <div className="flex justify-between items-start mb-4">
                  <div className="text-2xl font-bold text-primary">₹{plan.price}</div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditPlan(plan)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeletePlan(plan.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-white">Validity: {plan.validity}</p>
                  <p className="text-white">Data: {plan.data}</p>
                  <p className="text-gray-300">{plan.description}</p>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <Card hover={false}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 text-gray-300">ID</th>
                    <th className="text-left py-3 text-gray-300">User ID</th>
                    <th className="text-left py-3 text-gray-300">Amount</th>
                    <th className="text-left py-3 text-gray-300">Date</th>
                    <th className="text-left py-3 text-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-b border-white/10">
                      <td className="py-3 text-white">{payment.id}</td>
                      <td className="py-3 text-white">{payment.userId}</td>
                      <td className="py-3 text-white">₹{payment.amount}</td>
                      <td className="py-3 text-white">
                        {new Date(payment.date).toLocaleDateString()}
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <Card hover={false}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 text-gray-300">ID</th>
                    <th className="text-left py-3 text-gray-300">Username</th>
                    <th className="text-left py-3 text-gray-300">Role</th>
                    <th className="text-left py-3 text-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-white/10">
                      <td className="py-3 text-white">{user.id}</td>
                      <td className="py-3 text-white">{user.username}</td>
                      <td className="py-3 text-white">{user.role}</td>
                      <td className="py-3">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">
                {editingPlan ? 'Edit Plan' : 'Add New Plan'}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowModal(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price (₹)
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Validity
                </label>
                <input
                  type="text"
                  value={formData.validity}
                  onChange={(e) => setFormData({ ...formData, validity: e.target.value })}
                  placeholder="e.g., 28 days"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Data
                </label>
                <input
                  type="text"
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                  placeholder="e.g., 1.5 GB/day"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g., Unlimited calls + SMS"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  rows="3"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleSavePlan}
              >
                {editingPlan ? 'Update' : 'Create'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;