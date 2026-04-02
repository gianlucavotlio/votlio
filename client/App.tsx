import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ReactNode } from "react";
import Home from "./pages/Home";
import TopicDetail from "./pages/TopicDetail";
import ChapterIntro from "./pages/ChapterIntro";
import SituationQuiz from "./pages/SituationQuiz";
import Result from "./pages/Result";
import AnalysisQuiz from "./pages/AnalysisQuiz";
import AnalysisResult from "./pages/AnalysisResult";
import AdminPanel from "./pages/AdminPanel";
import Leaderboard from "./pages/Leaderboard";
import PoliticalTest from "./pages/PoliticalTest";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import { UserProfileProvider } from "./contexts/UserProfileContext";
import { useAuth } from "./lib/useAuth";
import Onboarding from "./pages/Onboarding";
import RankProgression from "./pages/RankProgression";
import TermMatching from "./pages/TermMatching";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { session, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary">Laden...</div>;
  }

  // Allow access if: has Supabase session OR is in guest mode
  if (!session && !isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

const LandingPage = () => {
  const { session, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary">Laden...</div>;
  }

  // If user is logged in, redirect to home
  if (session || isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  // Otherwise show onboarding
  return <Onboarding />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <UserProfileProvider>
        <BrowserRouter>
          <Routes>
            {/* Landing page: shows Onboarding if not logged in, redirects to home if logged in */}
            <Route path="/" element={<LandingPage />} />

            {/* Public routes */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/political-test" element={<PoliticalTest />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route
              path="/rank-progression"
              element={
                <ProtectedRoute>
                  <RankProgression />
                </ProtectedRoute>
              }
            />
            <Route
              path="/term-matching"
              element={
                <ProtectedRoute>
                  <TermMatching />
                </ProtectedRoute>
              }
            />

            {/* Protected routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/topic/:topicId"
              element={
                <ProtectedRoute>
                  <TopicDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chapter/:chapterId"
              element={
                <ProtectedRoute>
                  <ChapterIntro />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chapter/:chapterId/quiz"
              element={
                <ProtectedRoute>
                  <SituationQuiz />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chapter/:chapterId/result"
              element={
                <ProtectedRoute>
                  <Result />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chapter/:chapterId/analysis"
              element={
                <ProtectedRoute>
                  <AnalysisQuiz />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chapter/:chapterId/analysis/result"
              element={
                <ProtectedRoute>
                  <AnalysisResult />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserProfileProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
