import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowRight, Shield, Zap, Heart, Clock, Users, CheckCircle, Menu, X, Award, BookOpen, MessageCircle, Phone, Mail, HelpCircle } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMobileMenuOpen(false); // Close mobile menu after clicking
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Enhanced Logo */}
            <Link to="/" className="group flex items-center space-x-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Heart className="h-6 w-6 text-white group-hover:animate-pulse" />
                </div>
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse opacity-75"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:via-purple-700 group-hover:to-indigo-700 transition-all duration-300">
                  MediMind
                </span>
                <span className="text-xs text-gray-500 -mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Your Health Companion
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => scrollToSection('features')}
                  className="relative text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 group cursor-pointer"
                >
                  Features
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="relative text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 group cursor-pointer"
                >
                  About
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </button>
                <button 
                  onClick={() => scrollToSection('support')}
                  className="relative text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 group cursor-pointer"
                >
                  Support
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-blue-50"
                >
                  Sign In
                </Link>
                <Link to="/register">
                  <Button size="sm" className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <span className="relative z-10">Get Started</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </Link>
              </div>
        </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
              <div className="px-4 py-6 space-y-4">
                <button 
                  onClick={() => scrollToSection('features')}
                  className="block w-full text-left text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="block w-full text-left text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('support')}
                  className="block w-full text-left text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2"
                >
                  Support
                </button>
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <Link 
                    to="/login" 
                    className="block text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden py-20 sm:py-32 lg:py-40">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50"></div>
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                    <Shield className="mr-2 h-4 w-4" />
                    Secure Medical Device Management
                  </div>
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                    Your Personal
                    <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Medical Dashboard
                    </span>
                  </h1>
                  <p className="max-w-2xl text-lg text-gray-600 sm:text-xl">
                    Comprehensive insights into your medical implant, maintenance schedules, and treatment details. 
                    Everything you need, beautifully organized in one secure platform.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                  <Link to="/dashboard">
                    <Button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-4 text-lg font-semibold">
                      Access Dashboard
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="outline" className="px-8 py-4 text-lg font-semibold border-2 hover:bg-gray-50 transition-all duration-200">
                      Create Account
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center space-x-8 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>HIPAA Compliant</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>24/7 Access</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Real-time Updates</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-3xl"></div>
                <img
                  src="/hero-tech-brain.png"
                  alt="Medical Device Dashboard"
                    className="relative rounded-2xl object-cover shadow-2xl border border-gray-200/50"
                    width={600}
                    height={450}
                />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 sm:py-32 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                Everything You Need to Know
                </h2>
              <p className="max-w-3xl mx-auto text-lg text-gray-600">
                Comprehensive device management with detailed insights, maintenance schedules, and personalized care instructions.
                </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">Device Care</CardTitle>
                  <CardDescription className="text-gray-600">
                    Expert guidance on maintaining your implant for optimal performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    Detailed instructions and best practices to ensure your medical device operates at peak efficiency and longevity.
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link to="/dashboard/device-care">
                    <Button variant="outline" size="sm" className="group-hover:bg-blue-50 group-hover:border-blue-200 transition-all duration-200">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">Recharging Guide</CardTitle>
                  <CardDescription className="text-gray-600">
                    Smart scheduling and step-by-step recharging instructions
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    Never miss a recharge with intelligent reminders and comprehensive guidance for uninterrupted therapy.
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link to="/dashboard/recharging">
                    <Button variant="outline" size="sm" className="group-hover:bg-purple-50 group-hover:border-purple-200 transition-all duration-200">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">Treatment Info</CardTitle>
                  <CardDescription className="text-gray-600">
                    Complete understanding of your therapy and expectations
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    Comprehensive information about your treatment protocol, how it works, and what to expect throughout your journey.
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link to="/dashboard/treatment">
                    <Button variant="outline" size="sm" className="group-hover:bg-green-50 group-hover:border-green-200 transition-all duration-200">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 sm:py-32 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
                    <Award className="mr-2 h-4 w-4" />
                    About MediMind
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                    Empowering Patients Through
                    <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      Intelligent Healthcare
                    </span>
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    MediMind was founded with a simple mission: to make medical device management intuitive, accessible, and empowering for patients worldwide. We believe that patients should have complete control and understanding of their medical devices.
                  </p>
                </div>
                
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">HIPAA Compliant</h3>
                      <p className="text-gray-600 text-sm">Your data is protected with enterprise-grade security measures.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Expert Team</h3>
                      <p className="text-gray-600 text-sm">Built by medical professionals and technology experts.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Evidence-Based</h3>
                      <p className="text-gray-600 text-sm">All recommendations are backed by clinical research and best practices.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                      <Heart className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Patient-Centered</h3>
                      <p className="text-gray-600 text-sm">Designed with patient needs and experiences at the forefront.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-2xl blur-3xl"></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-2xl border border-gray-200/50">
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Impact</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
                        <div className="text-sm text-gray-600">Active Users</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
                        <div className="text-sm text-gray-600">Uptime</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
                        <div className="text-sm text-gray-600">Healthcare Partners</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-orange-600 mb-2">4.9★</div>
                        <div className="text-sm text-gray-600">User Rating</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section id="support" className="py-20 sm:py-32 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                We're Here to Help
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-gray-600">
                Get the support you need, when you need it. Our dedicated team is committed to ensuring your success with MediMind.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mb-12">
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/50">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">Live Chat</CardTitle>
                  <CardDescription className="text-gray-600">
                    Get instant answers from our support team
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    Available 24/7 for urgent medical device questions and technical support.
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" size="sm" className="group-hover:bg-blue-50 group-hover:border-blue-200 transition-all duration-200">
                    Start Chat
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-green-50/50">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">Phone Support</CardTitle>
                  <CardDescription className="text-gray-600">
                    Speak directly with our healthcare specialists
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    Call us for complex questions or when you need detailed guidance.
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" size="sm" className="group-hover:bg-green-50 group-hover:border-green-200 transition-all duration-200">
                    Call Now
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-purple-50/50">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                    <HelpCircle className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">Help Center</CardTitle>
                  <CardDescription className="text-gray-600">
                    Browse articles and frequently asked questions
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    Comprehensive guides, tutorials, and troubleshooting resources.
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" size="sm" className="group-hover:bg-purple-50 group-hover:border-purple-200 transition-all duration-200">
                    Browse Articles
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Contact CTA */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Need Immediate Assistance?
                </h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  For medical emergencies, please contact your healthcare provider immediately. For urgent technical support, our team is available 24/7.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Support
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold">
                    <Mail className="mr-2 h-5 w-5" />
                    Email Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-32 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Ready to Take Control?
              </h2>
              <p className="text-xl text-blue-100">
                Join thousands of patients who trust MediMind for their medical device management.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center">
                <Link to="/register">
                  <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold">
                    View Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">MediMind</span>
              </div>
              <p className="text-sm text-gray-400">
                Empowering patients with comprehensive medical device management.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors cursor-pointer">Features</button></li>
                <li><Link to="#" className="hover:text-white transition-colors">Security</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => scrollToSection('support')} className="hover:text-white transition-colors cursor-pointer">Help Center</button></li>
                <li><button onClick={() => scrollToSection('support')} className="hover:text-white transition-colors cursor-pointer">Contact Us</button></li>
                <li><Link to="#" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">HIPAA Compliance</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>© 2025 MediMind. All rights reserved. HIPAA compliant medical device management platform.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}