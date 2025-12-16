import { useState, useEffect } from 'react';
import { getAllUsers, getAllPayments } from '../api/admin';
import { getActivePlans } from '../api/plans';
import Layout from '../components/Layout';
import Card from '../components/Card';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPlans: 0,
    totalRevenue: 0,
    fraudAlerts: 0
  });
  const [recentPayments, setRecentPayments] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [users, payments, plans] = await Promise.all([
          getAllUsers(),
          getAllPayments(),
          getActivePlans()
        ]);

        // Calculate stats
        const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
        const fraudAlerts = payments.filter(p => p.status === 'failed').length;

        setStats({
          totalUsers: users.length,
          totalPlans: plans.length,
          totalRevenue,
          fraudAlerts
        });

        // Recent payments (last 10)
        const sortedPayments = payments
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 10);
        setRecentPayments(sortedPayments);

        // Revenue trend (last 7 days)
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          return date.toISOString().split('T')[0];
        }).reverse();

        const revenueByDay = last7Days.map(date => {
          const dayRevenue = payments
            .filter(p => p.date.startsWith(date))
            .reduce((sum, p) => sum + p.amount, 0);
          return { date, revenue: dayRevenue };
        });

        setRevenueData(revenueByDay);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 80px)',
          fontSize: '1.5rem',
          color: 'white'
        }}>
          Loading dashboard...
        </div>
      </Layout>
    );
  }

  const maxRevenue = Math.max(...revenueData.map(d => d.revenue), 1);

  return (
    <Layout>
      <div style={{ padding: '30px' }}>
        <h1 style={{ color: 'white', marginBottom: '30px' }}>Admin Dashboard</h1>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <Card gradientBorder>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ color: 'var(--yellow)', marginBottom: '10px' }}>Total Users</h3>
              <div style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>
                {stats.totalUsers}
              </div>
            </div>
          </Card>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ color: 'var(--yellow)', marginBottom: '10px' }}>Total Plans</h3>
              <div style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>
                {stats.totalPlans}
              </div>
            </div>
          </Card>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ color: 'var(--yellow)', marginBottom: '10px' }}>Total Revenue</h3>
              <div style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>
                ₹{stats.totalRevenue.toLocaleString()}
              </div>
            </div>
          </Card>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ color: 'var(--yellow)', marginBottom: '10px' }}>Fraud Alerts</h3>
              <div style={{ color: stats.fraudAlerts > 0 ? 'var(--pink)' : 'white', fontSize: '2rem', fontWeight: 'bold' }}>
                {stats.fraudAlerts}
              </div>
            </div>
          </Card>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          {/* Recent Payments */}
          <Card>
            <h3 style={{ color: 'var(--yellow)', marginBottom: '20px' }}>Recent Payments</h3>
            <div style={{ overflowY: 'auto', maxHeight: '300px' }}>
              {recentPayments.map(payment => (
                <div
                  key={payment.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div>
                    <div style={{ color: 'white', fontWeight: 'bold' }}>
                      User #{payment.userId}
                    </div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
                      {new Date(payment.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: 'white', fontWeight: 'bold' }}>
                      ₹{payment.amount}
                    </div>
                    <div style={{
                      color: payment.status === 'completed' ? 'var(--yellow)' : 'var(--pink)',
                      fontSize: '14px'
                    }}>
                      {payment.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Revenue Chart */}
          <Card>
            <h3 style={{ color: 'var(--yellow)', marginBottom: '20px' }}>Revenue Trend (7 Days)</h3>
            <div style={{ display: 'flex', alignItems: 'end', gap: '10px', height: '200px' }}>
              {revenueData.map((data, index) => (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%'
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, var(--pink), var(--purple))',
                      borderRadius: '4px 4px 0 0',
                      height: `${(data.revenue / maxRevenue) * 150}px`,
                      minHeight: '2px',
                      marginBottom: '10px'
                    }}
                  />
                  <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px', textAlign: 'center' }}>
                    {new Date(data.date).getDate()}
                  </div>
                  <div style={{ color: 'white', fontSize: '10px', textAlign: 'center' }}>
                    ₹{data.revenue}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;