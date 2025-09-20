import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Learning from "./pages/Learning";
import UserTypeSelection from "./pages/UserTypeSelection";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { EcoEscapeRoom } from "./components/EcoEscapeRoom";
import { WasteBasicsModule } from "./components/learning/WasteBasicsModule";
import WasteSortingGame from "./components/WasteSortingGame";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";

// ✅ import your landing page
import Landing from "./pages/landing";

// ✅ import landing-details pages
import CommunityEngagement from "./pages/landing-details/CommunityEngagement";
import SmartSegregation from "./pages/landing-details/SmartSegregation";
import ProgressTracking from "./pages/landing-details/ProgressTracking";
import RewardsSystem from "./pages/landing-details/RewardsSystem";
import Transparency from "./pages/landing-details/Transparency";
import DigitalFirst from "./pages/landing-details/DigitalFirst";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* ✅ landing page */}
          <Route path="/" element={<Landing onUserTypeSelect={() => {}} />} />

          {/* ✅ landing-details routes */}
          <Route path="/community-engagement" element={<CommunityEngagement />} />
          <Route path="/smart-segregation" element={<SmartSegregation />} />
          <Route path="/progress-tracking" element={<ProgressTracking />} />
          <Route path="/rewards-system" element={<RewardsSystem />} />
          <Route path="/transparency" element={<Transparency />} />
          <Route path="/digital-first" element={<DigitalFirst />} />

          {/* other existing routes */}
          <Route path="/learning" element={<Learning />} />
          <Route path="/learning/waste-basics" element={<WasteBasicsModule />} />
          <Route path="/learning/waste-sorting-game" element={<WasteSortingGame />} />
          <Route path="/get-started" element={<UserTypeSelection />} />
          <Route
            path="/login"
            element={
              <ProtectedRoute requireAuth={false}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectedRoute requireAuth={false}>
                <Signup />
              </ProtectedRoute>
            }
          />
          <Route path="/eco-escape-room" element={<EcoEscapeRoom />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requireAuth={true}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
