import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      company: "Kumar Manufacturing Pvt. Ltd.",
      location: "Mumbai, India",
      rating: 5,
      content: "SeekFactory helped us find the perfect CNC machines from a verified Chinese supplier. The quality exceeded our expectations and the process was seamless.",
      industry: "Manufacturing",
      orderValue: "₹25 Lakhs"
    },
    {
      id: 2,
      name: "Priya Sharma",
      company: "Textile Innovations",
      location: "Tirupur, India",
      rating: 5,
      content: "We sourced our entire textile production line through SeekFactory. The supplier verification gave us confidence, and the escrow payment system ensured security.",
      industry: "Textile",
      orderValue: "₹40 Lakhs"
    },
    {
      id: 3,
      name: "Amit Patel",
      company: "Food Tech Solutions",
      location: "Ahmedabad, India",
      rating: 5,
      content: "The platform made it incredibly easy to connect with reliable food processing equipment suppliers. Our production capacity increased by 300%!",
      industry: "Food Processing",
      orderValue: "₹18 Lakhs"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            Trusted by Indian Businesses
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of successful Indian businesses who have transformed their 
            operations with quality machinery from our verified suppliers.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="bg-card rounded-2xl p-8 border border-card-border shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Quote className="w-6 h-6 text-primary" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-current" />
                ))}
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-foreground leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </blockquote>

              {/* Customer Info */}
              <div className="border-t border-card-border pt-6">
                <div className="font-heading font-semibold text-foreground mb-1">
                  {testimonial.name}
                </div>
                <div className="text-muted-foreground text-sm mb-2">
                  {testimonial.company}
                </div>
                <div className="text-muted-foreground text-sm mb-3">
                  {testimonial.location}
                </div>
                
                {/* Order Details */}
                <div className="flex justify-between items-center text-xs">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                    {testimonial.industry}
                  </span>
                  <span className="font-semibold text-accent">
                    {testimonial.orderValue}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="font-heading font-bold text-3xl text-primary mb-2">500+</div>
            <div className="text-muted-foreground text-sm">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="font-heading font-bold text-3xl text-accent mb-2">₹50Cr+</div>
            <div className="text-muted-foreground text-sm">Trade Volume</div>
          </div>
          <div className="text-center">
            <div className="font-heading font-bold text-3xl text-success mb-2">98%</div>
            <div className="text-muted-foreground text-sm">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="font-heading font-bold text-3xl text-primary mb-2">24/7</div>
            <div className="text-muted-foreground text-sm">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;