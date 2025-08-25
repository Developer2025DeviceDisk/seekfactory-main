import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MessageCircle, 
  Handshake, 
  UserCheck, 
  Package, 
  Shield,
  Clock,
  Globe,
  Award,
  ArrowRight,
  CheckCircle,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

const HowItWorks = () => {
  const buyerSteps = [
    {
      step: 1,
      icon: Search,
      title: "Search & Discover",
      description: "Browse our verified supplier directory or search for specific products. Use advanced filters to find exactly what you need.",
      details: ["25,000+ verified suppliers", "Advanced search filters", "Product categories", "Country-wise listings"]
    },
    {
      step: 2,
      icon: MessageCircle,
      title: "Connect & Inquire",
      description: "Send detailed inquiries to suppliers with your requirements. Get personalized quotes and proposals.",
      details: ["Direct messaging system", "Requirement specifications", "File attachments", "Quick response time"]
    },
    {
      step: 3,
      icon: Handshake,
      title: "Negotiate & Close",
      description: "Compare offers, negotiate terms, and finalize your deal with complete transparency and security.",
      details: ["Compare multiple quotes", "Secure payment options", "Contract templates", "Trade assurance"]
    }
  ];

  const supplierSteps = [
    {
      step: 1,
      icon: UserCheck,
      title: "Register & Verify",
      description: "Create your supplier profile and complete our verification process to build trust with buyers.",
      details: ["Business verification", "Company documentation", "Product certifications", "Quality assessments"]
    },
    {
      step: 2,
      icon: Package,
      title: "List Products",
      description: "Upload your product catalog with detailed specifications, images, and competitive pricing.",
      details: ["Unlimited product listings", "High-quality images", "Detailed specifications", "Bulk upload tools"]
    },
    {
      step: 3,
      icon: Globe,
      title: "Connect & Grow",
      description: "Receive inquiries from global buyers and grow your business with our marketing tools.",
      details: ["Global buyer network", "Lead generation", "Marketing tools", "Analytics dashboard"]
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Verified Suppliers",
      description: "All suppliers undergo strict verification including business licenses, quality certifications, and background checks."
    },
    {
      icon: Clock,
      title: "Fast Response",
      description: "Get responses to your inquiries within 24 hours from our responsive supplier network."
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Third-party inspection services and quality guarantees ensure you receive exactly what you ordered."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connect with suppliers from over 50 countries and expand your sourcing options worldwide."
    }
  ];

  const features = [
    "Secure payment processing",
    "Trade assurance protection",
    "Quality inspection services",
    "Logistics coordination",
    "Multi-language support",
    "24/7 customer service",
    "Mobile app access",
    "Advanced analytics"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <Badge variant="outline" className="mb-4">
            Trusted by 50,000+ businesses worldwide
          </Badge>
          <h1 className="font-heading font-bold text-4xl md:text-6xl text-foreground mb-6">
            How SeekFactory Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Connecting global buyers with verified suppliers through our secure, 
            efficient, and transparent B2B marketplace platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/auth">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </section>

        {/* For Buyers Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                For Buyers
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find reliable suppliers and source quality products with confidence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {buyerSteps.map((step, index) => (
                <div key={step.step} className="relative">
                  <Card className="h-full">
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <step.icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mb-2 mx-auto">
                        {step.step}
                      </div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-center mb-4">
                        {step.description}
                      </CardDescription>
                      <ul className="space-y-2">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  
                  {index < buyerSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-8 h-8 text-primary" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button size="lg" asChild>
                <Link to="/suppliers">Start Sourcing Now</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* For Suppliers Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                For Suppliers
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Expand your business globally and connect with qualified buyers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {supplierSteps.map((step, index) => (
                <div key={step.step} className="relative">
                  <Card className="h-full">
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                        <step.icon className="w-8 h-8 text-secondary-foreground" />
                      </div>
                      <div className="w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-sm font-bold mb-2 mx-auto">
                        {step.step}
                      </div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-center mb-4">
                        {step.description}
                      </CardDescription>
                      <ul className="space-y-2">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  
                  {index < supplierSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-8 h-8 text-secondary" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/auth">Join as Supplier</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                Why Choose SeekFactory?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We provide the tools, security, and support you need for successful B2B trading
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
                  Everything You Need for B2B Success
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Our comprehensive platform includes all the tools and services 
                  necessary for successful international trade.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Button size="lg" asChild>
                    <Link to="/auth">Start Free Trial</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="p-8">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                      <Star className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Trusted by Industry Leaders</h3>
                    <p className="text-muted-foreground mb-6">
                      "SeekFactory has transformed how we source materials globally. 
                      The platform's verification process gives us confidence in every supplier."
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <div className="text-sm">
                        <div className="font-medium">Sarah Chen</div>
                        <div className="text-muted-foreground">Procurement Director, TechCorp</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join thousands of successful businesses already using SeekFactory 
              to streamline their global sourcing and sales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/auth">Create Free Account</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/suppliers">Browse Suppliers</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;