import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Inquiries = () => {
  const { user, session } = useAuth();
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && session) {
      fetchInquiries();
    }
  }, [user, session]);

  const fetchInquiries = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/inquiries', {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setInquiries(data.inquiries || []);
      } else {
        setError(data.error || 'Failed to fetch inquiries');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch inquiries');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Inquiries</h1>
        {loading && <p>Loading inquiries...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && inquiries.length === 0 && <p>No inquiries found.</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inquiries.map((inquiry) => (
            <Card key={inquiry.id}>
              <CardHeader>
                <CardTitle>
                  <Link to={`/inquiries/${inquiry.id}`} className="hover:underline">
                    Inquiry #{inquiry.id.slice(0, 8)}
                  </Link>
                </CardTitle>
                <Badge variant="secondary" className="mt-2">
                  {inquiry.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="mb-2">
                  <span className="font-semibold">Type:</span> {inquiry.inquiryType}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Message:</span> {inquiry.message}
                </div>
                <div>
                  <span className="font-semibold">Created:</span> {new Date(inquiry.createdAt).toLocaleString()}
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

export default Inquiries; 