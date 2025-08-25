import { Search, MessageSquare, ShoppingCart, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Search & Discover",
      description: "Browse our extensive catalog of machinery and equipment. Use filters to find exactly what you need.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: MessageSquare,
      title: "Connect & Inquire",
      description: "Send inquiries to verified suppliers. Get detailed quotes and specifications directly.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: ShoppingCart,
      title: "Order & Pay",
      description: "Place orders securely through our platform. Make payments with confidence using escrow protection.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: CheckCircle,
      title: "Receive & Review",
      description: "Track your order delivery. Leave reviews to help other buyers and build supplier reputation.",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
            How SeekFactory Works
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Simple, secure, and efficient. Connect with Chinese suppliers in just a few steps 
            and transform your manufacturing capabilities.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="relative animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Connecting Line for Desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-muted-dark to-transparent transform translate-x-4 z-0">
                    <div className="absolute right-0 top-1/2 transform translate-y-1/2 w-2 h-2 bg-muted-dark rounded-full"></div>
                  </div>
                )}

                <div className="relative z-10 text-center">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full font-bold text-sm mb-6">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${step.color} p-5 mb-6 shadow-lg`}>
                    <step.icon className="w-full h-full text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-4">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6 bg-success-light rounded-2xl">
            <div className="font-heading font-bold text-2xl text-success mb-2">
              Verified Suppliers
            </div>
            <p className="text-muted-foreground">
              All suppliers go through our rigorous verification process
            </p>
          </div>
          <div className="text-center p-6 bg-primary-light rounded-2xl">
            <div className="font-heading font-bold text-2xl text-primary mb-2">
              Secure Payments
            </div>
            <p className="text-muted-foreground">
              Escrow protection ensures safe and secure transactions
            </p>
          </div>
          <div className="text-center p-6 bg-accent-light rounded-2xl">
            <div className="font-heading font-bold text-2xl text-accent mb-2">
              Quality Assurance
            </div>
            <p className="text-muted-foreground">
              Quality checks and buyer reviews maintain high standards
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;