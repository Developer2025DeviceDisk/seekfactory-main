import { Helmet } from "react-helmet-async";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  BookOpen, 
  MessageSquare, 
  Phone, 
  Users, 
  ShoppingCart,
  Shield,
  CreditCard,
  Truck,
  Star,
  ChevronRight,
  HelpCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const HelpCenter = () => {
  const helpCategories = [
    {
      title: "Getting Started",
      description: "Learn the basics of using SeekFactory",
      icon: BookOpen,
      articleCount: 12,
      topics: [
        "Creating your account",
        "Setting up your profile",
        "Navigating the platform",
        "Understanding user roles"
      ]
    },
    {
      title: "Finding Suppliers",
      description: "How to find and evaluate suppliers",
      icon: Users,
      articleCount: 15,
      topics: [
        "Search techniques",
        "Supplier verification",
        "Reading supplier profiles",
        "Communication best practices"
      ]
    },
    {
      title: "Product Sourcing",
      description: "Complete guide to product sourcing",
      icon: ShoppingCart,
      articleCount: 18,
      topics: [
        "Product search and filters",
        "Requesting quotations",
        "Comparing offers",
        "Negotiation strategies"
      ]
    },
    {
      title: "Quality Assurance",
      description: "Ensuring product quality and standards",
      icon: Shield,
      articleCount: 10,
      topics: [
        "Quality requirements",
        "Inspection services",
        "Certification verification",
        "Quality complaints"
      ]
    },
    {
      title: "Payments & Billing",
      description: "Payment methods and billing information",
      icon: CreditCard,
      articleCount: 8,
      topics: [
        "Payment methods",
        "Transaction security",
        "Invoice management",
        "Refund policies"
      ]
    },
    {
      title: "Shipping & Logistics",
      description: "Shipping, customs, and delivery",
      icon: Truck,
      articleCount: 14,
      topics: [
        "Shipping options",
        "Customs procedures",
        "Tracking orders",
        "Delivery issues"
      ]
    }
  ];

  const popularArticles = [
    {
      title: "How to verify a supplier's credibility",
      category: "Finding Suppliers",
      readTime: "5 min read",
      views: "12.5K"
    },
    {
      title: "Understanding FOB and CIF pricing",
      category: "Product Sourcing",
      readTime: "3 min read",
      views: "9.8K"
    },
    {
      title: "Payment security best practices",
      category: "Payments & Billing",
      readTime: "4 min read",
      views: "8.2K"
    },
    {
      title: "Quality inspection checklist",
      category: "Quality Assurance",
      readTime: "6 min read",
      views: "7.9K"
    },
    {
      title: "Customs clearance requirements for India",
      category: "Shipping & Logistics",
      readTime: "8 min read",
      views: "6.5K"
    }
  ];

  const quickActions = [
    {
      title: "Contact Support",
      description: "Get help from our team",
      icon: MessageSquare,
      action: "Start Chat",
      href: "/contact"
    },
    {
      title: "Call Us",
      description: "Speak with an expert",
      icon: Phone,
      action: "Call Now",
      href: "tel:+919876543210"
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step guides",
      icon: BookOpen,
      action: "Watch Videos",
      href: "#"
    },
    {
      title: "Community Forum",
      description: "Connect with other users",
      icon: Users,
      action: "Join Discussion",
      href: "#"
    }
  ];

  const supportStats = [
    { label: "Help Articles", value: "150+" },
    { label: "Video Tutorials", value: "25+" },
    { label: "Response Time", value: "< 2 hrs" },
    { label: "Satisfaction Rate", value: "98%" }
  ];

  return (
    <>
      <Helmet>
        <title>Help Center - SeekFactory</title>
        <meta 
          name="description" 
          content="Find answers to your questions about using SeekFactory. Browse our help articles, guides, and tutorials." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="py-20 bg-hero-gradient">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
                Help Center
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Find answers to your questions and get the most out of SeekFactory. 
                Search our knowledge base or contact our support team.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input 
                    placeholder="Search for help articles, guides, or tutorials..."
                    className="pl-12 h-14 text-lg bg-white border-0 shadow-lg"
                  />
                  <Button className="absolute right-2 top-2 h-10">
                    Search
                  </Button>
                </div>
              </div>
              
              {/* Support Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {supportStats.map((stat, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-white/80 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  Need Immediate Help?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Choose the fastest way to get assistance
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickActions.map((action, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-16 h-16 bg-hero-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <action.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                      <CardDescription>{action.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" asChild>
                        <Link to={action.href}>{action.action}</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Help Categories */}
          <section className="py-20 bg-muted/50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  Browse by Category
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Find detailed guides and tutorials organized by topic
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {helpCategories.map((category, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-hero-gradient rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <category.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{category.title}</CardTitle>
                          <Badge variant="secondary" className="text-xs">
                            {category.articleCount} articles
                          </Badge>
                        </div>
                      </div>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-4">
                        {category.topics.map((topic, topicIndex) => (
                          <li key={topicIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <ChevronRight className="w-3 h-3" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                      <Button variant="outline" className="w-full">
                        Explore Category
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Popular Articles */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  Popular Articles
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Most viewed help articles and guides
                </p>
              </div>

              <div className="max-w-4xl mx-auto space-y-4">
                {popularArticles.map((article, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <HelpCircle className="w-5 h-5 text-muted-foreground" />
                            <h3 className="font-semibold text-lg">{article.title}</h3>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <Badge variant="outline">{article.category}</Badge>
                            <span>{article.readTime}</span>
                            <span>{article.views} views</span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Still Need Help */}
          <section className="py-20 bg-hero-gradient">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                Still Need Help?
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Can't find what you're looking for? Our support team is here to help you succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                  <Link to="/contact">Contact Support</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Schedule a Call
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

export default HelpCenter;