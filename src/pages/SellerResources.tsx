import { Helmet } from "react-helmet-async";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  TrendingUp, 
  Users, 
  FileText, 
  Video, 
  Download, 
  Globe, 
  Target,
  BarChart3,
  Shield
} from "lucide-react";

const SellerResources = () => {
  const resources = [
    {
      category: "Getting Started",
      icon: BookOpen,
      items: [
        { title: "Supplier Onboarding Guide", type: "PDF", description: "Complete guide to setting up your supplier profile" },
        { title: "Product Listing Best Practices", type: "Article", description: "How to create compelling product listings" },
        { title: "Verification Process Overview", type: "Video", description: "Step-by-step verification walkthrough" },
      ]
    },
    {
      category: "Marketing & Sales",
      icon: TrendingUp,
      items: [
        { title: "B2B Marketing Strategies", type: "Webinar", description: "Effective marketing techniques for B2B suppliers" },
        { title: "Price Negotiation Guide", type: "PDF", description: "Master the art of B2B price negotiations" },
        { title: "Customer Relationship Management", type: "Article", description: "Building lasting business relationships" },
      ]
    },
    {
      category: "Platform Training",
      icon: Users,
      items: [
        { title: "Dashboard Navigation Tutorial", type: "Video", description: "Learn to use your supplier dashboard effectively" },
        { title: "Order Management System", type: "Interactive", description: "Hands-on training for order processing" },
        { title: "Communication Tools Guide", type: "PDF", description: "Master platform messaging and inquiry management" },
      ]
    },
    {
      category: "Market Intelligence",
      icon: BarChart3,
      items: [
        { title: "Industry Trends Report 2024", type: "Report", description: "Latest trends in Indian manufacturing market" },
        { title: "Competitive Analysis Framework", type: "Template", description: "Analyze your competition effectively" },
        { title: "Pricing Strategy Toolkit", type: "Excel", description: "Tools for competitive pricing strategies" },
      ]
    }
  ];

  const tools = [
    {
      title: "Product Photo Guidelines",
      description: "Professional photography tips for machinery products",
      icon: Globe,
      downloadUrl: "#"
    },
    {
      title: "Quality Certificate Templates",
      description: "Standard templates for quality documentation",
      icon: Shield,
      downloadUrl: "#"
    },
    {
      title: "Export Documentation Checklist",
      description: "Complete checklist for international shipping",
      icon: FileText,
      downloadUrl: "#"
    },
    {
      title: "ROI Calculator",
      description: "Calculate your platform investment returns",
      icon: Target,
      downloadUrl: "#"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return FileText;
      case "Video":
        return Video;
      case "Excel":
        return Download;
      default:
        return BookOpen;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "PDF":
        return "bg-red-100 text-red-800";
      case "Video":
        return "bg-blue-100 text-blue-800";
      case "Webinar":
        return "bg-green-100 text-green-800";
      case "Interactive":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <Helmet>
        <title>Seller Resources - SeekFactory</title>
        <meta 
          name="description" 
          content="Access comprehensive resources, guides, and tools to succeed as a supplier on SeekFactory marketplace." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="py-20 bg-hero-gradient">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
                Seller Resources
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Everything you need to succeed as a supplier on SeekFactory. Access guides, 
                training materials, and tools to grow your business.
              </p>
            </div>
          </section>

          {/* Resource Categories */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  Learning Resources
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive guides and training materials organized by category
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {resources.map((category, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-hero-gradient rounded-lg flex items-center justify-center">
                          <category.icon className="w-5 h-5 text-white" />
                        </div>
                        <CardTitle className="text-xl">{category.category}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {category.items.map((item, itemIndex) => {
                          const TypeIcon = getTypeIcon(item.type);
                          return (
                            <div key={itemIndex} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                              <TypeIcon className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium text-sm">{item.title}</h4>
                                  <Badge variant="secondary" className={getTypeBadgeColor(item.type)}>
                                    {item.type}
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">{item.description}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Tools & Templates */}
          <section className="py-20 bg-muted/50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  Tools & Templates
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Download practical tools and templates to streamline your business operations
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tools.map((tool, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-16 h-16 bg-hero-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <tool.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-lg">{tool.title}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Support Section */}
          <section className="py-20">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Need Additional Support?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Our team is here to help you succeed. Get personalized assistance with your supplier journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-hero-gradient hover:opacity-90">
                  Contact Support Team
                </Button>
                <Button size="lg" variant="outline">
                  Join Seller Community
                </Button>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default SellerResources;