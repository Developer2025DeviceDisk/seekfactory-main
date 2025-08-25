import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Send } from "lucide-react";

interface Product {
  id: string;
  name: string;
  supplier_id: string;
}

const CreateInquiry = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('product');
  const supplierId = searchParams.get('supplier');

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    quantity_required: "",
    target_price: "",
    delivery_timeline: ""
  });

  useEffect(() => {
    if (productId) {
      // Simulate fetching product data
      setProduct({
        id: productId,
        name: "Sample Product",
        supplier_id: supplierId || "1"
      });
      
      setFormData(prev => ({
        ...prev,
        subject: `Inquiry about Sample Product`
      }));
    }
  }, [productId, supplierId]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "Please sign in to send an inquiry.",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Success",
        description: "Your inquiry has been sent successfully!",
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating inquiry:', error);
      toast({
        title: "Error",
        description: "Failed to send inquiry. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">
                Send Inquiry
              </h1>
              <p className="text-muted-foreground">
                {product ? `Inquiring about: ${product.name}` : "Create a new supplier inquiry"}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Inquiry Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="What are you looking for?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Describe your requirements, specifications, and any other details..."
                    rows={6}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="quantity_required">Quantity Required</Label>
                    <Input
                      id="quantity_required"
                      type="number"
                      value={formData.quantity_required}
                      onChange={(e) => handleInputChange('quantity_required', e.target.value)}
                      placeholder="e.g., 1000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="target_price">Target Price</Label>
                    <Input
                      id="target_price"
                      value={formData.target_price}
                      onChange={(e) => handleInputChange('target_price', e.target.value)}
                      placeholder="e.g., $5-10 per unit"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="delivery_timeline">Delivery Timeline</Label>
                    <Select onValueChange={(value) => handleInputChange('delivery_timeline', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ASAP">ASAP</SelectItem>
                        <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                        <SelectItem value="1 month">1 month</SelectItem>
                        <SelectItem value="2-3 months">2-3 months</SelectItem>
                        <SelectItem value="3+ months">3+ months</SelectItem>
                        <SelectItem value="Flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <h4 className="font-medium">Tips for a good inquiry:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Be specific about your requirements and specifications</li>
                    <li>• Include quantity, quality standards, and delivery expectations</li>
                    <li>• Mention any certifications or compliance requirements</li>
                    <li>• Provide your business background and intended use</li>
                    <li>• Be clear about your budget and timeline</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between pt-6">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading || !formData.subject || !formData.message}>
                <Send className="w-4 h-4 mr-2" />
                {loading ? "Sending..." : "Send Inquiry"}
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateInquiry;
