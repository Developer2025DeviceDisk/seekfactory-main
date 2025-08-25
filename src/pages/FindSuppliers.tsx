import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, MapPin, Star, MessageCircle, Building, Globe, Award } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

interface Supplier {
  id: string;
  company_name: string;
  contact_person: string;
  description: string;
  city: string;
  country: string;
  website: string;
  profile_image_url: string;
  is_verified: boolean;
  created_at: string;
  product_count?: number;
}

// Placeholder data for demonstration
const mockSuppliers: Supplier[] = [
  {
    id: "1",
    company_name: "TechMachinery Ltd",
    contact_person: "John Smith",
    description: "Leading manufacturer of industrial machinery with 20+ years of experience",
    city: "Mumbai",
    country: "India",
    website: "https://techmachinery.com",
    profile_image_url: "",
    is_verified: true,
    created_at: "2024-01-01",
    product_count: 25
  },
  {
    id: "2", 
    company_name: "Global Manufacturing Co",
    contact_person: "Sarah Johnson",
    description: "Specialized in precision tools and equipment manufacturing",
    city: "Delhi",
    country: "India",
    website: "https://globalmanufacturing.com",
    profile_image_url: "",
    is_verified: true,
    created_at: "2024-01-02",
    product_count: 18
  },
  {
    id: "3",
    company_name: "Elite Engineering Works",
    contact_person: "Raj Patel",
    description: "Custom machinery solutions for various industries",
    city: "Bangalore",
    country: "India", 
    website: "",
    profile_image_url: "",
    is_verified: false,
    created_at: "2024-01-03",
    product_count: 12
  }
];

const mockCategories = [
  { id: "1", name: "Industrial Machinery" },
  { id: "2", name: "Construction Equipment" },
  { id: "3", name: "Agricultural Tools" },
  { id: "4", name: "Manufacturing Equipment" }
];

const FindSuppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSuppliers(mockSuppliers);
      setCategories(mockCategories);
      setLoading(false);
    }, 1000);
  }, []);

  const countries = ["China", "India", "United States", "Germany", "Japan", "South Korea", "Taiwan"];

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch = 
      supplier.company_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.contact_person?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCountry = 
      selectedCountry === "all" || 
      supplier.country === selectedCountry;

    return matchesSearch && matchesCountry;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
            Find Verified Suppliers
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Connect with trusted manufacturers and suppliers from around the world. 
            Browse verified companies with proven track records in quality production.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{suppliers.length}+</div>
              <div className="text-sm text-muted-foreground">Suppliers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-lg border border-card-border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search suppliers by company name, description, or contact person..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="lg:w-48">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="lg:w-48">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-muted-foreground">
            Showing {filteredSuppliers.length} of {suppliers.length} suppliers
          </p>
          <Select defaultValue="newest">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="verified">Verified First</SelectItem>
              <SelectItem value="products">Most Products</SelectItem>
              <SelectItem value="name">Company Name</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Suppliers Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-muted rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-3 bg-muted rounded w-3/4"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSuppliers.map((supplier) => (
              <Card key={supplier.id} className="group hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={supplier.profile_image_url} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {supplier.company_name?.charAt(0) || 'S'}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-1">
                          {supplier.company_name}
                        </h3>
                        {supplier.is_verified && (
                          <Badge variant="default" className="shrink-0">
                            <Star className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {supplier.contact_person}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {supplier.description || "Professional manufacturer and supplier with years of industry experience."}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span className="line-clamp-1">{supplier.city}, {supplier.country}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building className="w-4 h-4 shrink-0" />
                      <span>{supplier.product_count || 0} products listed</span>
                    </div>
                    {supplier.website && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Globe className="w-4 h-4 shrink-0" />
                        <a 
                          href={supplier.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline line-clamp-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <Link to={`/supplier/${supplier.id}`}>
                        View Profile
                      </Link>
                    </Button>
                    <Button size="sm" className="flex-1">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredSuppliers.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">No suppliers found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or browse all suppliers
            </p>
            <Button onClick={() => { setSearchQuery(""); setSelectedCountry("all"); setSelectedCategory("all"); }}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center bg-card rounded-lg border border-card-border p-8">
          <h2 className="text-2xl font-heading font-bold mb-4">
            Can't find the right supplier?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Let us help you find the perfect manufacturing partner. 
            Submit a sourcing request and get matched with qualified suppliers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/inquiry/new">Post Sourcing Request</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/auth">Register as Supplier</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FindSuppliers;
