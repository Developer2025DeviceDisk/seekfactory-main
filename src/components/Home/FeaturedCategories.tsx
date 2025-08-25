import { Button } from "@/components/ui/button";
import { ArrowRight, Cpu, Shirt, Cog, UtensilsCrossed } from "lucide-react";

const FeaturedCategories = () => {
  const categories = [
    {
      id: "electronics",
      name: "Electronics",
      description: "PCB assembly, semiconductors, testing equipment",
      icon: Cpu,
      color: "from-blue-500 to-cyan-500",
      productCount: "2,500+",
    },
    {
      id: "textile",
      name: "Textile Machinery",
      description: "Weaving, spinning, dyeing, and finishing equipment",
      icon: Shirt,
      color: "from-purple-500 to-pink-500",
      productCount: "1,800+",
    },
    {
      id: "manufacturing",
      name: "Manufacturing",
      description: "CNC machines, automation, industrial tools",
      icon: Cog,
      color: "from-green-500 to-emerald-500",
      productCount: "3,200+",
    },
    {
      id: "food-processing",
      name: "Food Processing",
      description: "Packaging, processing, quality control equipment",
      icon: UtensilsCrossed,
      color: "from-orange-500 to-red-500",
      productCount: "1,200+",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            Explore Product Categories
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover high-quality machinery and equipment across diverse industries. 
            Connect with verified suppliers for all your manufacturing needs.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-card rounded-2xl p-6 border border-card-border hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-primary/20">
                {/* Icon with Gradient Background */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-full h-full text-white" />
                </div>

                {/* Category Info */}
                <div className="mb-4">
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {category.description}
                  </p>
                  <div className="text-xs font-medium text-accent">
                    {category.productCount} products
                  </div>
                </div>

                {/* Explore Button */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-between group-hover:bg-primary/10 group-hover:text-primary transition-all"
                >
                  Explore Category
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Categories Button */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="font-semibold">
            View All Categories
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;