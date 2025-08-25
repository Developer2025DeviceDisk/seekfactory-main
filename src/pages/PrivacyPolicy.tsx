import { Helmet } from "react-helmet-async";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicy = () => {
  const lastUpdated = "January 20, 2024";

  return (
    <>
      <Helmet>
        <title>Privacy Policy - SeekFactory</title>
        <meta 
          name="description" 
          content="SeekFactory's privacy policy explaining how we collect, use, and protect your personal information." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="py-20 bg-hero-gradient">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
                Privacy Policy
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Your privacy is important to us. This policy explains how we collect, 
                use, and protect your personal information.
              </p>
              <p className="text-white/80 mt-6">Last updated: {lastUpdated}</p>
            </div>
          </section>

          {/* Privacy Content */}
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="space-y-8">
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">1. Information We Collect</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Personal Information</h4>
                      <p className="text-muted-foreground">
                        We collect information you provide directly to us, including:
                      </p>
                      <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                        <li>Name, email address, phone number, and business details</li>
                        <li>Company information and business registration details</li>
                        <li>Payment information and billing addresses</li>
                        <li>Profile photos and business documents</li>
                        <li>Communication preferences and inquiry details</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Automatically Collected Information</h4>
                      <p className="text-muted-foreground">
                        We automatically collect certain information when you use our platform:
                      </p>
                      <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                        <li>Device information (IP address, browser type, operating system)</li>
                        <li>Usage data (pages visited, time spent, search queries)</li>
                        <li>Location data (approximate location based on IP address)</li>
                        <li>Cookies and similar tracking technologies</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">2. How We Use Your Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">We use the information we collect to:</p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Provide, maintain, and improve our services</li>
                      <li>Process transactions and facilitate business connections</li>
                      <li>Verify supplier credentials and maintain platform security</li>
                      <li>Send important updates, notifications, and marketing communications</li>
                      <li>Provide customer support and respond to inquiries</li>
                      <li>Analyze usage patterns and improve user experience</li>
                      <li>Comply with legal obligations and enforce our terms</li>
                      <li>Detect and prevent fraud, spam, and abuse</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">3. Information Sharing</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      We may share your information in the following circumstances:
                    </p>
                    
                    <div>
                      <h4 className="font-semibold mb-2">With Other Users</h4>
                      <p className="text-muted-foreground">
                        Certain profile information may be visible to other platform users to facilitate business connections.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Service Providers</h4>
                      <p className="text-muted-foreground">
                        We share information with trusted third-party service providers who help us operate our platform.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Legal Requirements</h4>
                      <p className="text-muted-foreground">
                        We may disclose information when required by law, court order, or government request.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Business Transfers</h4>
                      <p className="text-muted-foreground">
                        Information may be transferred in connection with mergers, acquisitions, or sale of assets.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">4. Data Security</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      We implement appropriate technical and organizational measures to protect your information:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Encryption of data in transit and at rest</li>
                      <li>Regular security assessments and monitoring</li>
                      <li>Access controls and authentication requirements</li>
                      <li>Employee training on data protection practices</li>
                      <li>Incident response procedures for security breaches</li>
                    </ul>
                    <p className="text-muted-foreground">
                      However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">5. Your Rights and Choices</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">You have the following rights regarding your personal information:</p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                      <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                      <li><strong>Deletion:</strong> Request deletion of your personal information (subject to certain exceptions)</li>
                      <li><strong>Portability:</strong> Request transfer of your data to another service provider</li>
                      <li><strong>Objection:</strong> Object to processing of your information for certain purposes</li>
                      <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
                    </ul>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Marketing Communications</h4>
                      <p className="text-muted-foreground">
                        You can opt out of marketing communications by following unsubscribe links in emails or contacting us directly.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">6. Data Retention</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. Specific retention periods depend on the type of information and the purpose for which it was collected. We will delete or anonymize your information when it is no longer needed, unless we are required to retain it by law.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">7. International Data Transfers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Your information may be transferred to and processed in countries other than your country of residence. We ensure that such transfers are made in accordance with applicable data protection laws and that appropriate safeguards are in place to protect your information.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">8. Children's Privacy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we learn that we have collected information from a child, we will take steps to delete such information promptly.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">9. Updates to This Policy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last updated" date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">10. Contact Us</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      If you have any questions about this privacy policy or our data practices, please contact us:
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

export default PrivacyPolicy;