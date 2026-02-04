import { useEffect, useState } from 'react';
import { adminAPI } from '../utils/api';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await adminAPI.getDashboardStats();
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const statCards = [
    { label: 'Total Bookings', value: stats?.totalBookings || 0 },
    { label: 'Pending', value: stats?.pendingBookings || 0 },
    { label: 'Approved', value: stats?.approvedBookings || 0 },
    { label: 'Today\'s Events', value: stats?.todayBookings || 0 },
    { label: 'Total Revenue', value: `$${stats?.totalRevenue || 0}` },
    { label: 'Cancelled', value: stats?.cancelledBookings || 0 }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2 text-gray-900">
          Dashboard
        </h1>
        <p className="text-gray-600">Overview of your business</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="stat-card">
            <div>
              <p className="text-gray-500 text-xs font-medium mb-2 uppercase tracking-wide">{stat.label}</p>
              <p className="text-3xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
