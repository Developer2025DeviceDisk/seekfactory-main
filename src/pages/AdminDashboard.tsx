import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AdminDashboard = () => {
  const { user, session } = useAuth();
  const [analytics, setAnalytics] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && session) {
      fetchData();
    } else if (user) {
      setError('Access denied: Admins only');
      setLoading(false);
    }
    // eslint-disable-next-line
  }, [user, session]);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const [analyticsRes, usersRes] = await Promise.all([
        fetch('/api/admin/analytics', { headers: { Authorization: `Bearer ${session?.access_token}` } }),
        fetch('/api/admin/users', { headers: { Authorization: `Bearer ${session?.access_token}` } }),
      ]);
      const analyticsData = await analyticsRes.json();
      const usersData = await usersRes.json();
      if (!analyticsRes.ok) throw new Error(analyticsData.error || 'Failed to fetch analytics');
      if (!usersRes.ok) throw new Error(usersData.error || 'Failed to fetch users');
      setAnalytics(analyticsData);
      setUsers(usersData.users || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch admin data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        {loading && <p>Loading admin data...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && analytics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader><CardTitle>Total Users</CardTitle></CardHeader>
              <CardContent><div className="text-2xl font-bold">{analytics.totalUsers}</div></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Active Suppliers</CardTitle></CardHeader>
              <CardContent><div className="text-2xl font-bold">{analytics.activeSuppliers}</div></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Total Orders</CardTitle></CardHeader>
              <CardContent><div className="text-2xl font-bold">{analytics.totalOrders}</div></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Monthly GMV</CardTitle></CardHeader>
              <CardContent><div className="text-2xl font-bold">${analytics.monthlyGMV}</div></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Avg. Order Value</CardTitle></CardHeader>
              <CardContent><div className="text-2xl font-bold">${analytics.averageOrderValue.toFixed(2)}</div></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Conversion Rate</CardTitle></CardHeader>
              <CardContent><div className="text-2xl font-bold">{(analytics.conversionRate * 100).toFixed(2)}%</div></CardContent>
            </Card>
          </div>
        )}
        {!loading && !error && users.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Users</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border">Email</th>
                    <th className="px-4 py-2 border">Phone</th>
                    <th className="px-4 py-2 border">Type</th>
                    <th className="px-4 py-2 border">Verified</th>
                    <th className="px-4 py-2 border">Admin</th>
                    <th className="px-4 py-2 border">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td className="px-4 py-2 border">{u.email}</td>
                      <td className="px-4 py-2 border">{u.phone}</td>
                      <td className="px-4 py-2 border">{u.userType}</td>
                      <td className="px-4 py-2 border">{u.verified ? <Badge>Yes</Badge> : <Badge variant="secondary">No</Badge>}</td>
                      <td className="px-4 py-2 border">{u.isAdmin ? <Badge>Yes</Badge> : <Badge variant="secondary">No</Badge>}</td>
                      <td className="px-4 py-2 border">{new Date(u.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard; 