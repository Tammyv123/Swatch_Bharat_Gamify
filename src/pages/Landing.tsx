import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Recycle,
  TrendingUp,
  Award,
  Shield,
  Smartphone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import heroImage from "@/assets/hero-bg.jpg";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

interface LandingProps {
  onUserTypeSelect: (
    type: "waste-collector" | "student" | "community-leader" | "employee"
  ) => void;
}

const Landing = ({ onUserTypeSelect }: LandingProps) => {
  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community Engagement",
      description: "Join millions of Indians in the clean India mission",
      link: "/community-engagement",
    },
    {
      icon: <Recycle className="h-6 w-6" />,
      title: "Smart Segregation",
      description: "Learn proper waste sorting with AI-powered guidance",
      link: "/smart-segregation",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Progress Tracking",
      description: "Monitor your environmental impact in real-time",
      link: "/progress-tracking",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Rewards System",
      description: "Earn points and rewards for sustainable actions",
      link: "/rewards-system",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Transparency",
      description: "Full transparency in waste management processes",
      link: "/transparency",
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Digital First",
      description: "Modern digital platform for seamless experience",
      link: "/digital-first",
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden text-white">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="relative z-10 container mx-auto px-4 py-24 text-center">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 1 }}
          >
            Transform India's
            <span className="block bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Waste Management
            </span>
          </motion.h1>

          <motion.p
            className="mb-8 text-lg md:text-2xl text-white/90 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Join the nationwide digital platform tackling India's waste crisis
            through education, gamification, and transparency. Every person
            matters.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
            >
              <Link to="/get-started">Get Started</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-100 via-green-50 to-green-100 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />

        <div className="relative container mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-green-800 mb-6"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 1 }}
          >
            About Us
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-green-700 max-w-2xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            We are on a mission to inspire citizens across India to embrace
            sustainability, tackle waste challenges, and build a cleaner, greener
            future—together. 🌍
          </motion.p>

          <motion.div
            className="max-w-xl mx-auto bg-white/30 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl p-10 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-green-900">
              <Typewriter
                words={["Learn 📘", "Play 🎮", "Resolve ♻️", "Earn 🏆"]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={100}
                deleteSpeed={60}
                delaySpeed={1500}
              />
            </h3>
            <p className="mt-4 text-green-800 text-lg">
              Engage with eco-friendly challenges that are fun, impactful, and
              rewarding. 🌱
            </p>
          </motion.div>

          <motion.div
            className="mt-12 flex flex-wrap justify-center gap-6 text-green-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            <div className="flex items-center gap-2">
              <Recycle className="h-6 w-6" /> <span>Reduce Waste</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6" /> <span>Empower Communities</span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="h-6 w-6" /> <span>Go Digital</span>
            </div>
          </motion.div>
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
              Everything you need to participate in India's waste management
              revolution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <Link to={feature.link}>
                  <Card className="hover:shadow-eco transition-all duration-300 hover:scale-105 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center text-primary">
                        {feature.icon}
                      </div>
                      <h3 className="font-semibold text-lg mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-green-100 py-16 relative overflow-hidden">
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-green-700 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-green-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">
                SwachhNation
              </h2>
              <p className="text-green-200 text-sm">
                Join us in creating a cleaner, greener India. Empower
                communities, track progress, and earn rewards for sustainability.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-green-200">
                <li>
                  <Link to="/get-started" className="hover:text-white">
                    Get Started
                  </Link>
                </li>
                <li>
                  <Link to="/learning" className="hover:text-white">
                    Learning Hub
                  </Link>
                </li>
                <li>
                  <Link to="/features" className="hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-green-200">
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact Us</h3>
              <p className="text-green-200 text-sm mb-4">
                Email: support@swachhnation.org
              </p>
              <p className="text-green-200 text-sm mb-4">
                Phone: +91 12345 67890
              </p>

              <div className="flex gap-4 mt-2">
                <a href="#" className="text-green-200 hover:text-white">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-green-200 hover:text-white">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-green-200 hover:text-white">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-green-200 hover:text-white">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-green-700 mt-12 pt-6 text-center text-green-200 text-sm">
            &copy; {new Date().getFullYear()} SwachhNation. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
