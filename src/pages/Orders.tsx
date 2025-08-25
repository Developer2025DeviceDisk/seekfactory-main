import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Orders = () => {
  const { user, session } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && session) {
      fetchOrders();
    }
  }, [user, session]);

  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/orders', {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setOrders(data.orders || []);
      } else {
        setError(data.error || 'Failed to fetch orders');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        {loading && <p>Loading orders...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && orders.length === 0 && <p>No orders found.</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <CardTitle>
                  <Link to={`/orders/${order.id}`} className="hover:underline">
                    Order #{order.id.slice(0, 8)}
                  </Link>
                </CardTitle>
                <Badge variant="secondary" className="mt-2">
                  {order.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="mb-2">
                  <span className="font-semibold">Total:</span> ${order.totalAmount}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Products:</span>
                  <ul className="list-disc ml-6">
                    {order.products.map((item: any) => (
                      <li key={item.id}>{item.quantity} x {item.productId}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="font-semibold">Created:</span> {new Date(order.createdAt).toLocaleString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Orders; 