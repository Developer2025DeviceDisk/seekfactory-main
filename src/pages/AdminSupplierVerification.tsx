import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const AdminSupplierVerification = () => {
  const { user, session } = useAuth();
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [savingId, setSavingId] = useState<string | null>(null);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user && session) {
      fetchSuppliers();
    }
    // eslint-disable-next-line
  }, [user, session]);

  const fetchSuppliers = async () => {
    setLoading(true);
    setError('');
    try {
      // Fetch all supplier profiles (for demo, fetch all users with userType supplier and their profiles)
      const res = await fetch('/api/admin/users', { headers: { Authorization: `Bearer ${session?.access_token}` } });
      const data = await res.json();
      if (res.ok) {
        // For each supplier, fetch their profile
        const supplierUsers = data.users.filter((u: any) => u.userType === 'supplier');
        const profiles = await Promise.all(
          supplierUsers.map(async (u: any) => {
            const pRes = await fetch(`/api/suppliers/${u.id}`);
            const pData = await pRes.json();
            return pRes.ok ? { ...u, profile: pData.profile } : { ...u, profile: null };
          })
        );
        setSuppliers(profiles);
      } else {
        setError(data.error || 'Failed to fetch suppliers');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch suppliers');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (id: string, flags: any) => {
    setSavingId(id);
    setSuccess('');
    try {
      const res = await fetch(`/api/suppliers/${id}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify(flags),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to verify supplier');
      setSuccess('Verification updated!');
      fetchSuppliers();
    } catch (err: any) {
      setError(err.message || 'Failed to verify supplier');
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin: Supplier Verification</h1>
        {loading && <p>Loading suppliers...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        {!loading && suppliers.length === 0 && <p>No suppliers found.</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suppliers.map((s) => (
            <Card key={s.id}>
              <CardHeader>
                <CardTitle>{s.profile?.companyName || s.email}</CardTitle>
                <div className="mt-2 flex gap-2">
                  <Badge variant={s.profile?.verification?.emailVerified ? 'default' : 'secondary'}>Email {s.profile?.verification?.emailVerified ? 'Verified' : 'Unverified'}</Badge>
                  <Badge variant={s.profile?.verification?.phoneVerified ? 'default' : 'secondary'}>Phone {s.profile?.verification?.phoneVerified ? 'Verified' : 'Unverified'}</Badge>
                  <Badge variant={s.profile?.verification?.businessVerified ? 'default' : 'secondary'}>Business {s.profile?.verification?.businessVerified ? 'Verified' : 'Unverified'}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-2">
                  <span className="font-semibold">Email:</span> {s.email}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Phone:</span> {s.phone}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Company:</span> {s.profile?.companyName || '-'}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Business License:</span>
                  {s.profile?.businessLicense ? (
                    <img src={s.profile.businessLicense} alt="Business License" className="w-24 h-24 object-cover rounded border mt-1" />
                  ) : (
                    <span className="text-muted-foreground ml-2">Not uploaded</span>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    disabled={savingId === s.id}
                    onClick={() => handleVerify(s.id, { emailVerified: true, phoneVerified: true, businessVerified: true })}
                  >
                    {savingId === s.id ? 'Saving...' : 'Verify All'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={savingId === s.id}
                    onClick={() => handleVerify(s.id, { emailVerified: false, phoneVerified: false, businessVerified: false })}
                  >
                    {savingId === s.id ? 'Saving...' : 'Unverify All'}
                  </Button>
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

export default AdminSupplierVerification; 