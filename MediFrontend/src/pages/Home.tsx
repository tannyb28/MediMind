import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link to="/" className="flex items-center text-xl font-bold">MediMind</Link>
        <nav className="ml-auto flex gap-4">
          <Link to="/login" className="text-sm font-medium">Log In</Link>
          <Link to="/register" className="text-sm font-medium">Register</Link>
        </nav>
      </header>
      {/* Hero Section */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Your Personal Medical Device Dashboard
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Access comprehensive information about your medical implant, maintenance schedules, and treatment
                    details all in one place.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to="/dashboard">
                    <Button>
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="outline">Create Account</Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/hero-tech-brain.png"
                  alt="Medical Device Dashboard"
                  className="rounded-lg object-cover"
                  width={550}
                  height={400}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Comprehensive Device Management
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to know about your medical device in one convenient location.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Device Care</CardTitle>
                  <CardDescription>Learn how to properly care for your implant</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Detailed instructions on maintaining your device for optimal performance and longevity.</p>
                </CardContent>
                <CardFooter>
                  <Link to="/dashboard/device-care">
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recharging Guide</CardTitle>
                  <CardDescription>Schedules and instructions for recharging</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Step-by-step guidance on how and when to recharge your device for uninterrupted therapy.</p>
                </CardContent>
                <CardFooter>
                  <Link to="/dashboard/recharging">
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Treatment Info</CardTitle>
                  <CardDescription>Understanding your therapy</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Comprehensive information about your treatment, how it works, and what to expect.</p>
                </CardContent>
                <CardFooter>
                  <Link to="/dashboard/treatment">
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="flex flex-col sm:flex-row gap-2 py-6 border-t px-4">
        <p className="text-xs">© 2025 MediMind. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 text-xs">
          <Link to="#">Terms of Service</Link>
          <Link to="#">Privacy</Link>
        </nav>
      </footer>
    </div>
  );
}