import { Helmet } from "react-helmet-async";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Cog, 
  Truck, 
  Zap, 
  Package, 
  Wrench, 
  Factory, 
  HardHat, 
  Cpu,
  ArrowRight,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";

const ProductCategories = () => {
  const categories = [
    {
      id: "manufacturing",
      title: "Manufacturing Equipment",
      description: "Complete range of manufacturing machinery and equipment",
      icon: Factory,
      productCount: "2,500+",
      subcategories: [
        "CNC Machines",
        "Injection Molding",
        "3D Printers",
        "Assembly Lines",
        "Quality Control Equipment"
      ],
      featured: true
    },
    {
      id: "industrial",
      title: "Industrial Machinery",
      description: "Heavy-duty industrial equipment for large-scale operations",
      icon: Cog,
      productCount: "1,800+",
      subcategories: [
        "Excavators",
        "Cranes",
        "Compressors",
        "Generators",
        "Pumps & Motors"
      ],
      featured: true
    },
    {
      id: "packaging",
      title: "Packaging Equipment",
      description: "Complete packaging solutions for all industries",
      icon: Package,
      productCount: "950+",
      subcategories: [
        "Filling Machines",
        "Labeling Equipment",
        "Sealing Machines",
        "Wrapping Equipment",
        "Conveyor Systems"
      ],
      featured: false
    },
    {
      id: "electrical",
      title: "Electrical Equipment",
      description: "Electrical machinery and power equipment",
      icon: Zap,
      productCount: "1,200+",
      subcategories: [
        "Transformers",
        "Switchgear",
        "Electric Motors",
        "Power Supplies",
        "Control Panels"
      ],
      featured: false
    },
    {
      id: "automotive",
      title: "Automotive Equipment",
      description: "Specialized equipment for automotive manufacturing",
      icon: Truck,
      productCount: "850+",
      subcategories: [
        "Engine Equipment",
        "Body Shop Tools",
        "Paint Booths",
        "Testing Equipment",
        "Assembly Tools"
      ],
      featured: false
    },
    {
      id: "textile",
      title: "Textile Machinery",
      description: "Complete textile production equipment",
      icon: Package,
      productCount: "720+",
      subcategories: [
        "Spinning Machines",
        "Weaving Looms",
        "Dyeing Equipment",
        "Finishing Machines",
        "Cutting Equipment"
      ],
      featured: false
    },
    {
      id: "food",
      title: "Food Processing",
      description: "Food and beverage processing equipment",
      icon: Factory,
      productCount: "680+",
      subcategories: [
        "Mixing Equipment",
        "Cooking Systems",
        "Refrigeration",
        "Bottling Lines",
        "Quality Testing"
      ],
      featured: false
    },
    {
      id: "construction",
      title: "Construction Equipment",
      description: "Heavy equipment for construction and infrastructure",
      icon: HardHat,
      productCount: "1,100+",
      subcategories: [
        "Concrete Equipment",
        "Earth Moving",
        "Road Construction",
        "Building Tools",
        "Safety Equipment"
      ],
      featured: false
    },
    {
      id: "technology",
      title: "Technology Equipment",
      description: "Advanced technology and automation equipment",
      icon: Cpu,
      productCount: "550+",
      subcategories: [
        "Automation Systems",
        "Robotics",
        "IoT Devices",
        "AI Equipment",
        "Software Solutions"
      ],
      featured: false
    },
    {
      id: "tools",
      title: "Hand Tools & Hardware",
      description: "Professional tools and hardware supplies",
      icon: Wrench,
      productCount: "3,200+",
      subcategories: [
        "Power Tools",
        "Hand Tools",
        "Measuring Tools",
        "Fasteners",
        "Workshop Equipment"
      ],
      featured: false
    }
  ];

  const stats = [
    { label: "Total Categories", value: "50+" },
    { label: "Active Products", value: "15,000+" },
    { label: "Verified Suppliers", value: "2,800+" },
    { label: "Monthly Inquiries", value: "25,000+" }
  ];

  return (
    <>
      <Helmet>
        <title>Product Categories - SeekFactory</title>
        <meta 
          name="description" 
          content="Explore comprehensive product categories including manufacturing equipment, industrial machinery, and more from verified Chinese suppliers." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="py-20 bg-hero-gradient">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
                Product Categories
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Discover thousands of products across multiple categories from verified Chinese suppliers. 
                Find the perfect machinery and equipment for your business needs.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-white/80 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Categories */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  Featured Categories
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Most popular product categories with highest demand from Indian buyers
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {categories.filter(cat => cat.featured).map((category) => (
                  <Card key={category.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-hero-gradient rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <category.icon className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-xl mb-2">{category.title}</CardTitle>
                            <CardDescription className="text-base">{category.description}</CardDescription>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-accent/10 text-accent">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {category.productCount}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {category.subcategories.slice(0, 4).map((sub, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {sub}
                          </Badge>
                        ))}
                        {category.subcategories.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{category.subcategories.length - 4} more
                          </Badge>
                        )}
                      </div>
                      <Button className="w-full group" asChild>
                        <Link to={`/products?category=${category.id}`}>
                          Browse Products
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* All Categories */}
          <section className="py-20 bg-muted/50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  All Categories
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Complete range of industrial products and machinery
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.filter(cat => !cat.featured).map((category) => (
                  <Card key={category.id} className="group hover:shadow-lg transition-all cursor-pointer">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-hero-gradient rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <category.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{category.title}</CardTitle>
                          <Badge variant="secondary" className="text-xs bg-accent/10 text-accent">
                            {category.productCount}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription className="text-sm">{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-1 mb-4">
                        {category.subcategories.slice(0, 3).map((sub, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {sub}
                          </Badge>
                        ))}
                        {category.subcategories.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{category.subcategories.length - 3}
                          </Badge>
                        )}
                      </div>
                      <Button size="sm" variant="outline" className="w-full" asChild>
                        <Link to={`/products?category=${category.id}`}>
                          View Products
                          <ArrowRight className="w-3 h-3 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Can't Find What You're Looking For?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Our suppliers can source custom products and machinery. Post your requirements 
                and get quotes from verified suppliers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-hero-gradient hover:opacity-90" asChild>
                  <Link to="/inquiry/new">Post Requirement</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/suppliers">Find Suppliers</Link>
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

export default ProductCategories;