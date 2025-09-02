import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import SupplierProfile from "./pages/SupplierProfile";
import FindSuppliers from "./pages/FindSuppliers";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Dashboard from "./pages/Dashboard";
import ProfileManagement from "./pages/ProfileManagement";
import CreateProduct from "./pages/CreateProduct";
import CreateInquiry from "./pages/CreateInquiry";
import ProductForm from "./pages/ProductForm";
import SupplierGuidelines from "./pages/SupplierGuidelines";
import VerificationProcess from "./pages/VerificationProcess";
import SuccessStories from "./pages/SuccessStories";
import SellerResources from "./pages/SellerResources";
import ProductCategories from "./pages/ProductCategories";
import BuyingGuide from "./pages/BuyingGuide";
import QualityAssurance from "./pages/QualityAssurance";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ContactUs from "./pages/ContactUs";
import HelpCenter from "./pages/HelpCenter";
import NotFound from "./pages/NotFound";
import path from 'path';
import AdminDashboard from "./pages/AdminDashboard";
import { ProductProvider } from "./contexts/ProductContext";
// import AutoRedirect from "./components/Auth/AutoRedirect";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ProductProvider>
        {/* <AutoRedirect /> */}
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/supplier/:id" element={<SupplierProfile />} />
            <Route path="/suppliers" element={<FindSuppliers />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Blog />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/profile" element={<ProfileManagement />} />
            <Route path="/dashboard/products/new" element={<CreateProduct />} />
            {/* <Route path="/products/new" element={<ProductForm />} /> */}
            <Route path="/products/edit/:id" element={<ProductForm />} />
            <Route path="/inquiry/new" element={<CreateInquiry />} />
            <Route path="/supplier-guidelines" element={<SupplierGuidelines />} />
            <Route path="/verification" element={<VerificationProcess />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/seller-resources" element={<SellerResources />} />
            <Route path="/categories" element={<ProductCategories />} />
            <Route path="/buying-guide" element={<BuyingGuide />} />
            <Route path="/quality" element={<QualityAssurance />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/help" element={<HelpCenter />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ProductProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
