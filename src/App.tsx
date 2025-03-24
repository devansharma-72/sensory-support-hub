
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import ScenarioTalks from "./pages/ScenarioTalks";
import FocusTimerPage from "./pages/FocusTimerPage";
import JournalPage from "./pages/JournalPage";
import FocusPlaylistPage from "./pages/FocusPlaylistPage";
import MemoryGamePage from "./pages/MemoryGamePage";
import RemindersPage from "./pages/RemindersPage";
import ContactUsPage from "./pages/ContactUsPage";
import NotFound from "./pages/NotFound";
import AIAssistant from "./components/AIAssistant";
import ReminderPage from "./pages/Reminders";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/scenario-talks" element={<ScenarioTalks />} />
              <Route path="/focus-timer" element={<FocusTimerPage />} />
              <Route path="/journal" element={<JournalPage />} />
              <Route path="/focus-playlist" element={<FocusPlaylistPage />} />
              <Route path="/memory-game" element={<MemoryGamePage />} />
              <Route path="/reminders" element={<RemindersPage />} />
              <Route path="/contact-us" element={<ContactUsPage />} />
              <Route path="/reminder" element={<ReminderPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Layout>
        <AIAssistant />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
