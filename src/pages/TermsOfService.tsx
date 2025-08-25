import { Helmet } from "react-helmet-async";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsOfService = () => {
  const lastUpdated = "January 20, 2024";

  return (
    <>
      <Helmet>
        <title>Terms of Service - SeekFactory</title>
        <meta 
          name="description" 
          content="SeekFactory's terms of service outlining the rules and regulations for using our B2B marketplace platform." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="py-20 bg-hero-gradient">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
                Terms of Service
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                These terms govern your use of SeekFactory's platform and services. 
                Please read them carefully before using our platform.
              </p>
              <p className="text-white/80 mt-6">Last updated: {lastUpdated}</p>
            </div>
          </section>

          {/* Terms Content */}
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="space-y-8">
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">1. Acceptance of Terms</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      By accessing or using SeekFactory's platform, you agree to be bound by these Terms of Service ("Terms"). 
                      If you do not agree to these Terms, you may not access or use our services. These Terms apply to all 
                      users of the platform, including buyers, suppliers, and visitors.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">2. Description of Service</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      SeekFactory is a B2B marketplace platform that connects Indian buyers with Chinese suppliers for 
                      industrial machinery and equipment. Our services include:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Product listing and discovery platform</li>
                      <li>Supplier verification and quality assurance</li>
                      <li>Communication tools for buyer-supplier interaction</li>
                      <li>Transaction facilitation and payment processing</li>
                      <li>Logistics and shipping coordination</li>
                      <li>Customer support and dispute resolution</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">3. User Accounts and Registration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Account Creation</h4>
                      <p className="text-muted-foreground">
                        To access certain features, you must create an account by providing accurate and complete information. 
                        You are responsible for maintaining the confidentiality of your account credentials.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Account Requirements</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>You must be at least 18 years old and legally capable of entering into contracts</li>
                        <li>You must provide accurate business information and valid contact details</li>
                        <li>You must comply with all applicable laws and regulations</li>
                        <li>You may not create multiple accounts or share account access</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Account Termination</h4>
                      <p className="text-muted-foreground">
                        We reserve the right to suspend or terminate accounts that violate these Terms or engage in 
                        fraudulent or harmful activities.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">4. User Conduct and Prohibited Activities</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">You agree not to engage in any of the following prohibited activities:</p>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Content Violations</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Posting false, misleading, or fraudulent information</li>
                        <li>Uploading content that infringes intellectual property rights</li>
                        <li>Sharing inappropriate, offensive, or illegal content</li>
                        <li>Posting spam or unsolicited promotional material</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Platform Misuse</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Attempting to hack, reverse engineer, or disrupt the platform</li>
                        <li>Using automated tools to scrape or extract data</li>
                        <li>Circumventing security measures or access controls</li>
                        <li>Impersonating other users or entities</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Business Practices</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Engaging in fraudulent or deceptive business practices</li>
                        <li>Attempting to bypass platform fees or payment systems</li>
                        <li>Soliciting users to conduct business outside the platform</li>
                        <li>Violating applicable trade laws or regulations</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">5. Transactions and Payments</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Transaction Facilitation</h4>
                      <p className="text-muted-foreground">
                        SeekFactory facilitates transactions between buyers and suppliers but is not a party to the 
                        underlying commercial agreement. All contracts are between the buyer and supplier directly.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Payment Processing</h4>
                      <p className="text-muted-foreground">
                        We may facilitate payment processing through third-party payment providers. You agree to comply 
                        with their terms and conditions. Platform fees are non-refundable except as expressly stated.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Dispute Resolution</h4>
                      <p className="text-muted-foreground">
                        While we provide dispute resolution assistance, we are not responsible for resolving all 
                        commercial disputes between users. Users are encouraged to resolve disputes directly.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">6. Intellectual Property</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Platform Content</h4>
                      <p className="text-muted-foreground">
                        All content, features, and functionality of the platform, including but not limited to text, 
                        graphics, logos, and software, are owned by SeekFactory and protected by intellectual property laws.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">User Content</h4>
                      <p className="text-muted-foreground">
                        You retain ownership of content you upload but grant SeekFactory a license to use, modify, 
                        and distribute such content for platform operations. You represent that you have the right 
                        to grant such license.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Trademark Policy</h4>
                      <p className="text-muted-foreground">
                        Users may not use SeekFactory's trademarks without permission. We respect intellectual property 
                        rights and will respond to valid infringement claims.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">7. Privacy and Data Protection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect 
                      your information. By using our platform, you agree to our Privacy Policy. We implement 
                      appropriate security measures to protect user data but cannot guarantee absolute security.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">8. Disclaimers and Limitation of Liability</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Service Disclaimer</h4>
                      <p className="text-muted-foreground">
                        The platform is provided "as is" without warranties of any kind. We do not guarantee the 
                        accuracy, completeness, or reliability of user-generated content or the availability of services.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Limitation of Liability</h4>
                      <p className="text-muted-foreground">
                        To the maximum extent permitted by law, SeekFactory shall not be liable for any indirect, 
                        incidental, special, or consequential damages arising from your use of the platform. Our 
                        total liability shall not exceed the fees paid by you in the twelve months preceding the claim.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Third-Party Services</h4>
                      <p className="text-muted-foreground">
                        We are not responsible for the actions, content, or services of third-party providers, 
                        including suppliers, payment processors, and logistics providers.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">9. Indemnification</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      You agree to indemnify and hold harmless SeekFactory from any claims, damages, or expenses 
                      (including attorney fees) arising from your use of the platform, violation of these Terms, 
                      or infringement of third-party rights.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">10. Governing Law and Jurisdiction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      These Terms are governed by the laws of India. Any disputes arising from these Terms or your 
                      use of the platform shall be subject to the exclusive jurisdiction of the courts in Delhi, India.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">11. Changes to Terms</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We reserve the right to modify these Terms at any time. We will notify users of material changes 
                      by posting the updated Terms on our platform and updating the "Last updated" date. Your continued 
                      use after such changes constitutes acceptance of the new Terms.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">12. Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      If you have any questions about these Terms, please contact us:
                    </p>
                    <div className="text-muted-foreground space-y-2">
                      <p><strong>Email:</strong> vimarsh@seekfactory.com</p>
                      <p><strong>Address:</strong> Delhi, India</p>
                      <p><strong>Phone:</strong> +91 9876543210</p>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default TermsOfService;