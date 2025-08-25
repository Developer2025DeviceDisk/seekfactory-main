import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SupplierProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) fetchProfile();
    // eslint-disable-next-line
  }, [id]);

  const fetchProfile = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/suppliers/${id}`);
      const data = await res.json();
      if (res.ok) {
        setProfile(data.profile);
      } else {
        setProfile(null);
        setError(data.error || 'Supplier not found');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {loading && <p>Loading supplier profile...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && profile && (
          <Card>
            <CardHeader>
              <CardTitle>{profile.companyName}</CardTitle>
              <div className="mt-2 flex gap-2">
                <Badge variant={profile.verification?.emailVerified ? 'default' : 'secondary'}>Email {profile.verification?.emailVerified ? 'Verified' : 'Unverified'}</Badge>
                <Badge variant={profile.verification?.phoneVerified ? 'default' : 'secondary'}>Phone {profile.verification?.phoneVerified ? 'Verified' : 'Unverified'}</Badge>
                <Badge variant={profile.verification?.businessVerified ? 'default' : 'secondary'}>Business {profile.verification?.businessVerified ? 'Verified' : 'Unverified'}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-2">
                <span className="font-semibold">Description:</span> {profile.description}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Established:</span> {profile.establishedYear}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Location:</span> {profile.city}, {profile.province}, {profile.country}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Certifications:</span>
                <div className="flex gap-2 mt-1">
                  {profile.certifications && profile.certifications.length > 0 ? (
                    profile.certifications.map((url: string, i: number) => (
                      <img key={i} src={url} alt="Certification" className="w-16 h-16 object-cover rounded border" />
                    ))
                  ) : (
                    <span className="text-muted-foreground">None</span>
                  )}
                </div>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Business License:</span>
                {profile.businessLicense ? (
                  <img src={profile.businessLicense} alt="Business License" className="w-32 h-32 object-cover rounded border mt-1" />
                ) : (
                  <span className="text-muted-foreground ml-2">Not uploaded</span>
                )}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Contact Info:</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                  <span>Email: {profile.contactInfo?.email || '-'}</span>
                  <span>Phone: {profile.contactInfo?.phone || '-'}</span>
                  <span>WhatsApp: {profile.contactInfo?.whatsapp || '-'}</span>
                  <span>WeChat: {profile.contactInfo?.wechat || '-'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SupplierProfile;