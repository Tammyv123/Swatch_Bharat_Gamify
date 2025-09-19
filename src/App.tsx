import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Learning from "./pages/Learning";
import UserTypeSelection from "./pages/UserTypeSelection";
import NotFound from "./pages/NotFound";
import { EcoEscapeRoom } from "./components/EcoEscapeRoom";
import { WasteBasicsModule } from "./components/learning/WasteBasicsModule";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/learning/waste-basics" element={<WasteBasicsModule />} />
          <Route path="/get-started" element={<UserTypeSelection />} />
          <Route path="/eco-escape-room" element={<EcoEscapeRoom />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
