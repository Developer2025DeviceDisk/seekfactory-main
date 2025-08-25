import { Helmet } from "react-helmet-async";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  FileText, 
  Shield, 
  Star,
  Truck,
  Globe,
  Award,
  Users
} from "lucide-react";

const SupplierGuidelines = () => {
  const guidelines = [
    {
      icon: Shield,
      title: "Quality Standards",
      description: "Maintain ISO certifications and quality management systems",
      requirements: [
        "ISO 9001:2015 Quality Management System",
        "Product testing and certification reports",
        "Quality control documentation",
        "Regular quality audits and inspections"
      ]
    },
    {
      icon: FileText,
      title: "Documentation",
      description: "Complete and accurate business documentation",
      requirements: [
        "Valid business license and registration",
        "Tax registration certificates",
        "Export/Import licenses",
        "Insurance and liability coverage"
      ]
    },
    {
      icon: Truck,
      title: "Logistics & Delivery",
      description: "Reliable shipping and delivery capabilities",
      requirements: [
        "Established shipping partnerships",
        "Packaging and handling standards",
        "Delivery tracking systems",
        "Clear shipping policies and terms"
      ]
    },
    {
      icon: Users,
      title: "Communication",
      description: "Professional and responsive communication",
      requirements: [
        "English-speaking customer service team",
        "Response time within 24 hours",
        "Clear product specifications",
        "Transparent pricing and terms"
      ]
    }
  ];

  const benefits = [
    {
      icon: Award,
      title: "Verified Badge",
      description: "Get a verified supplier badge to build trust with buyers"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Access to Indian market and international opportunities"
    },
    {
      icon: Star,
      title: "Premium Listing",
      description: "Priority placement in search results and categories"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Supplier Guidelines | SeekFactory</title>
        <meta name="description" content="Comprehensive guidelines for suppliers on SeekFactory platform. Learn about quality standards, documentation requirements, and best practices." />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
            Supplier Guidelines
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Your comprehensive guide to becoming a successful verified supplier on SeekFactory. 
            Follow these guidelines to build trust, increase sales, and grow your business.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="font-heading font-bold text-3xl text-center mb-8">
            Benefits of Being a Verified Supplier
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Guidelines */}
        <div className="space-y-8">
          <h2 className="font-heading font-bold text-3xl text-center mb-8">
            Platform Guidelines & Requirements
          </h2>
          
          {guidelines.map((guideline, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <guideline.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{guideline.title}</CardTitle>
                    <p className="text-muted-foreground">{guideline.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {guideline.requirements.map((requirement, reqIndex) => (
                    <div key={reqIndex} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm">{requirement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Best Practices */}
        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Best Practices for Success</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Badge variant="outline">Product Listings</Badge>
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Use high-quality product images (minimum 1024x768)</li>
                    <li>• Provide detailed technical specifications</li>
                    <li>• Include certifications and compliance information</li>
                    <li>• Update inventory and pricing regularly</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Badge variant="outline">Customer Service</Badge>
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Respond to inquiries within 24 hours</li>
                    <li>• Provide accurate delivery estimates</li>
                    <li>• Maintain professional communication</li>
                    <li>• Offer after-sales support and warranty</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="font-heading font-bold text-2xl mb-4">Need Help Getting Started?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Our team is here to help you succeed. Contact us for guidance on the verification process, 
                platform features, or any questions about becoming a supplier.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <span className="text-primary font-medium">📧 vimarsh@seekfactory.com</span>
                <span className="text-primary font-medium">📞 +91 9876543210</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SupplierGuidelines;