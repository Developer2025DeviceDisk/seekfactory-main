import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const SupplierProfileManagement = () => {
  const { user, session } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState<any>({
    companyName: '',
    description: '',
    establishedYear: '',
    city: '',
    province: '',
    country: '',
    certifications: [],
    businessLicense: '',
    contactInfo: { email: '', phone: '', whatsapp: '', wechat: '' },
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user && session && user.userType === 'supplier') {
      fetchProfile();
    }
    // eslint-disable-next-line
  }, [user, session]);

  const fetchProfile = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/suppliers/${user.id}`);
      const data = await res.json();
      if (res.ok) {
        setProfile(data.profile);
        setForm({ ...data.profile });
      } else {
        setProfile(null);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleContactChange = (field: string, value: string) => {
    setForm((prev: any) => ({ ...prev, contactInfo: { ...prev.contactInfo, [field]: value } }));
  };

  const handleCertUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append('file', files[i]);
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (res.ok && data.url) {
          setForm((prev: any) => ({ ...prev, certifications: [...(prev.certifications || []), data.url] }));
        }
      } catch {}
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleLicenseUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const formData = new FormData();
    formData.append('file', files[0]);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setForm((prev: any) => ({ ...prev, businessLicense: data.url }));
      }
    } catch {}
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveCert = (url: string) => {
    setForm((prev: any) => ({ ...prev, certifications: prev.certifications.filter((c: string) => c !== url) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/suppliers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save profile');
      setSuccess('Profile saved successfully!');
      setProfile(data.profile);
    } catch (err: any) {
      setError(err.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Supplier Profile Management</h1>
        {loading && <p>Loading profile...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        {!loading && (
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              {profile && profile.verification && (
                <div className="mt-2 flex gap-2">
                  <Badge variant={profile.verification.emailVerified ? 'default' : 'secondary'}>Email {profile.verification.emailVerified ? 'Verified' : 'Unverified'}</Badge>
                  <Badge variant={profile.verification.phoneVerified ? 'default' : 'secondary'}>Phone {profile.verification.phoneVerified ? 'Verified' : 'Unverified'}</Badge>
                  <Badge variant={profile.verification.businessVerified ? 'default' : 'secondary'}>Business {profile.verification.businessVerified ? 'Verified' : 'Unverified'}</Badge>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Company Name</label>
                  <input type="text" value={form.companyName} onChange={e => handleInputChange('companyName', e.target.value)} className="w-full p-2 border rounded" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea value={form.description} onChange={e => handleInputChange('description', e.target.value)} className="w-full p-2 border rounded" rows={3} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Established Year</label>
                  <input type="number" value={form.establishedYear} onChange={e => handleInputChange('establishedYear', e.target.value)} className="w-full p-2 border rounded" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input type="text" value={form.city} onChange={e => handleInputChange('city', e.target.value)} className="w-full p-2 border rounded" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Province</label>
                    <input type="text" value={form.province} onChange={e => handleInputChange('province', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Country</label>
                    <input type="text" value={form.country} onChange={e => handleInputChange('country', e.target.value)} className="w-full p-2 border rounded" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Certifications</label>
                  <input type="file" accept="image/*" multiple ref={fileInputRef} onChange={handleCertUpload} className="block w-full text-sm text-gray-500" />
                  <div className="flex gap-2 mt-2">
                    {form.certifications && form.certifications.map((url: string, i: number) => (
                      <div key={i} className="relative group">
                        <img src={url} alt="Certification" className="w-20 h-20 object-cover rounded border" />
                        <button type="button" onClick={() => handleRemoveCert(url)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs opacity-80 group-hover:opacity-100">&times;</button>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Business License</label>
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handleLicenseUpload} className="block w-full text-sm text-gray-500" />
                  {form.businessLicense && (
                    <div className="mt-2">
                      <img src={form.businessLicense} alt="Business License" className="w-32 h-32 object-cover rounded border" />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Contact Info</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="email" value={form.contactInfo?.email || ''} onChange={e => handleContactChange('email', e.target.value)} className="w-full p-2 border rounded" placeholder="Email" />
                    <input type="text" value={form.contactInfo?.phone || ''} onChange={e => handleContactChange('phone', e.target.value)} className="w-full p-2 border rounded" placeholder="Phone" />
                    <input type="text" value={form.contactInfo?.whatsapp || ''} onChange={e => handleContactChange('whatsapp', e.target.value)} className="w-full p-2 border rounded" placeholder="WhatsApp" />
                    <input type="text" value={form.contactInfo?.wechat || ''} onChange={e => handleContactChange('wechat', e.target.value)} className="w-full p-2 border rounded" placeholder="WeChat" />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={saving}>{saving ? 'Saving...' : 'Save Profile'}</Button>
              </form>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SupplierProfileManagement; 