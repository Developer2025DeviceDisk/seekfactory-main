import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, Users, Verified, Globe } from "lucide-react";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
  };

  const stats = [
    { icon: Users, label: "Verified Suppliers", value: "500+" },
    { icon: Verified, label: "Quality Products", value: "10,000+" },
    { icon: Globe, label: "Countries Connected", value: "2" },
  ];

  return (
    <section className="relative bg-hero-gradient text-white py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl mb-6 animate-fade-in">
            Connect with
            <span className="block text-accent-light">
              Verified Chinese
            </span>
            <span className="block">
              Machinery Suppliers
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto animate-slide-up">
            India's premier B2B marketplace for manufacturing equipment. 
            Find quality machinery, connect with trusted suppliers, and grow your business.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12 animate-slide-up">
            <div className="flex flex-col sm:flex-row gap-3 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for machinery, equipment, or suppliers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/40 h-12"
                />
              </div>
              <Button 
                type="submit" 
                variant="accent" 
                size="lg"
                className="h-12 px-8 font-semibold"
              >
                Search Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </form>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up">
            <Button variant="accent" size="xl" className="font-semibold">
              Find Suppliers
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50 font-semibold"
            >
              Join as Supplier
            </Button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center animate-bounce-gentle"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-accent-light" />
                  </div>
                  <div className="font-heading font-bold text-2xl md:text-3xl mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/80 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;