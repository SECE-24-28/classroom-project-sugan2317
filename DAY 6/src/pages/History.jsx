import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { paymentsAPI } from '../services/api';
import Card from '../components/Card';
import Button from '../components/Button';
import { ArrowLeft, Calendar, CreditCard, CheckCircle } from 'lucide-react';

const History = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await paymentsAPI.getByUserId(user.id);
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
      // Mock data for demo
      setPayments([
        {
          id: 1,
          amount: 299,
          date: '2024-01-15T10:30:00Z',
          status: 'completed',
          planDetails: { validity: '28 days', data: '2 GB/day' }
        },
        {
          id: 2,
          amount: 199,
          date: '2023-12-18T14:20:00Z',
          status: 'completed',
          planDetails: { validity: '28 days', data: '1.5 GB/day' }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Payment History</h1>
          <p className="text-gray-300">View all your recharge transactions</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card hover={false} className="text-center">
          <h3 className="text-2xl font-bold text-primary mb-2">
            {payments.length}
          </h3>
          <p className="text-gray-300">Total Recharges</p>
        </Card>
        <Card hover={false} className="text-center">
          <h3 className="text-2xl font-bold text-green-400 mb-2">
            ₹{payments.reduce((sum, p) => sum + p.amount, 0)}
          </h3>
          <p className="text-gray-300">Total Spent</p>
        </Card>
        <Card hover={false} className="text-center">
          <h3 className="text-2xl font-bold text-accent mb-2">
            {payments.filter(p => p.status === 'completed').length}
          </h3>
          <p className="text-gray-300">Successful</p>
        </Card>
      </div>

      {/* Payment History */}
      {payments.length === 0 ? (
        <Card className="text-center py-12">
          <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Transactions Yet</h3>
          <p className="text-gray-300 mb-6">You haven't made any recharges yet.</p>
          <Button onClick={() => navigate('/plans')}>
            Browse Plans
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {payments.map((payment) => (
            <Card key={payment.id} hover={false}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Recharge - ₹{payment.amount}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(payment.date).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      {payment.planDetails && (
                        <>
                          <span>•</span>
                          <span>{payment.planDetails.validity}</span>
                          <span>•</span>
                          <span>{payment.planDetails.data}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary mb-1">
                    ₹{payment.amount}
                  </div>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                    {payment.status}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8 flex justify-center gap-4">
        <Button onClick={() => navigate('/plans')}>
          New Recharge
        </Button>
        <Button variant="outline" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default History;