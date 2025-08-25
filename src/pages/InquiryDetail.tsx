import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const InquiryDetail = () => {
  const { id } = useParams();
  const { user, session } = useAuth();
  const [inquiry, setInquiry] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user && session && id) {
      fetchInquiry();
    }
    // eslint-disable-next-line
  }, [user, session, id]);

  const fetchInquiry = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setInquiry(data.inquiry);
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        setError(data.error || 'Failed to fetch inquiry');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch inquiry');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendError('');
    if (!message.trim()) return;
    setSending(true);
    try {
      const res = await fetch(`/api/inquiries/${id}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ content: message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send message');
      setMessage('');
      await fetchInquiry();
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setSendError(err.message || 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {loading && <p>Loading inquiry...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && inquiry && (
          <Card>
            <CardHeader>
              <CardTitle>Inquiry #{inquiry.id.slice(0, 8)}</CardTitle>
              <Badge variant="secondary" className="mt-2">{inquiry.status}</Badge>
            </CardHeader>
            <CardContent>
              <div className="mb-2">
                <span className="font-semibold">Type:</span> {inquiry.inquiryType}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Message:</span> {inquiry.message}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Created:</span> {new Date(inquiry.createdAt).toLocaleString()}
              </div>
              <div className="mb-4">
                <span className="font-semibold">Conversation:</span>
                <div className="border rounded p-3 mt-2 bg-gray-50 max-h-96 overflow-y-auto">
                  {inquiry.messages.length === 0 && <p className="text-muted-foreground">No messages yet.</p>}
                  {inquiry.messages.map((msg: any) => (
                    <div key={msg.id} className={`mb-2 ${msg.senderId === user?.id ? 'text-right' : 'text-left'}`}>
                      <div className={`inline-block px-3 py-2 rounded-lg ${msg.senderId === user?.id ? 'bg-primary text-primary-foreground' : 'bg-gray-200 text-gray-900'}`}>
                        <span className="text-xs font-semibold mr-2">{msg.sender.email} ({msg.sender.userType})</span>
                        <span>{msg.content}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{new Date(msg.createdAt).toLocaleString()}</div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              <form onSubmit={handleSendMessage} className="flex gap-2 mt-4">
                <input
                  type="text"
                  className="flex-1 p-2 border border-gray-300 rounded"
                  placeholder="Type your message..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  disabled={sending}
                />
                <Button type="submit" disabled={sending || !message.trim()}>
                  {sending ? 'Sending...' : 'Send'}
                </Button>
              </form>
              {sendError && <p className="text-red-500 text-sm mt-2">{sendError}</p>}
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default InquiryDetail; 