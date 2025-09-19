import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Recycle, TrendingUp, Award, Shield, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/hero-bg.jpg";

interface LandingProps {
  onUserTypeSelect: (type: 'waste-collector' | 'student' | 'community-leader' | 'employee') => void;
}

const Landing = ({ onUserTypeSelect }: LandingProps) => {
  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community Engagement",
      description: "Join millions of Indians in the clean India mission"
    },
    {
      icon: <Recycle className="h-6 w-6" />,
      title: "Smart Segregation",
      description: "Learn proper waste sorting with AI-powered guidance"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Progress Tracking",
      description: "Monitor your environmental impact in real-time"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Rewards System",
      description: "Earn points and rewards for sustainable actions"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Transparency",
      description: "Full transparency in waste management processes"
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Digital First",
      description: "Modern digital platform for seamless experience"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden text-white">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Dark Overlay for Contrast */}
        <div className="absolute inset-0 bg-black/40 z-0" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            Transform India's
            <span className="block bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Waste Management
            </span>
          </h1>

          <p className="mb-8 text-lg md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-in">
            Join the nationwide digital platform tackling India's waste crisis through
            education, gamification, and transparency. Every person matters.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white shadow-lg">
              <Link to="/get-started">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
              <Link to="/learning">Explore Learning</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Join millions of Indians in creating a cleaner, greener future. Choose your role and start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90"
                onClick={() => onUserTypeSelect("waste-collector")}
              >
                Get Started Now
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/learning">Explore Learning</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to participate in India's waste management revolution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-eco transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of Indians already contributing to a cleaner, greener nation
          </p>
          <Button asChild size="xl" className="bg-white text-green-700 font-bold hover:bg-gray-100">
            <Link to="/get-started">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
