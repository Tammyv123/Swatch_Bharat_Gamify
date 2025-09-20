import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Settings,
  LogOut,
  Home,
  GraduationCap,
  Languages,
  Trophy,
  Award,
  Gift
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import ReferAndEarn from "./ReferAndEarn";

interface NavbarProps {
  onNavigate?: (path: string) => void;
}

const Navbar = ({ onNavigate }: NavbarProps) => {
  const [language, setLanguage] = useState("en");
  const [showReferModal, setShowReferModal] = useState(false);
  const { user, userData, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleNavigation = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
  };

  const languages = [
    { value: "en", label: "English" },
    { value: "hi", label: "हिंदी" },
    { value: "bn", label: "বাংলা" },
    { value: "te", label: "తెలుగు" },
    { value: "ta", label: "தமிழ்" },
    { value: "mr", label: "मराठी" },
    { value: "gu", label: "ગુજરાતી" },
    { value: "kn", label: "ಕನ್ನಡ" }
  ];

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SW</span>
            </div>
            <span className="font-bold text-lg text-foreground">Swachh Bharat</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleNavigation('/')}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Home
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleNavigation('/learning')}
              className="flex items-center gap-2"
            >
              <GraduationCap className="h-4 w-4" />
              Learning
            </Button>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-32 h-8">
                <Languages className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 px-2 flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {userData?.displayName?.charAt(0)?.toUpperCase() ||
                          user.email?.charAt(0)?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex flex-col items-start">
                      <span className="text-sm font-medium">
                        {userData?.displayName || user.displayName || 'User'}
                      </span>
                      <Badge variant="secondary" className="text-xs h-4">
                        {userData?.role === 'municipal-employee' ? 'Municipal' : 'Citizen'}
                      </Badge>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">
                      {userData?.displayName || user.displayName || 'User'}
                    </p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleNavigation('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigation('/certifications')}>
                    <Award className="mr-2 h-4 w-4" />
                    Certifications
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigation('/rewards')}>
                    <Trophy className="mr-2 h-4 w-4" />
                    Rewards
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowReferModal(true)}>
                    <Gift className="mr-2 h-4 w-4" />
                    Refer & Earn
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigation('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleNavigation('/login')}>
                  Sign In
                </Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => handleNavigation('/signup')}>
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Refer and Earn Modal */}
      <ReferAndEarn
        isOpen={showReferModal}
        onClose={() => setShowReferModal(false)}
      />
    </nav>
  );
};

export default Navbar;