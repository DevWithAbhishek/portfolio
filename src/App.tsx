import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import KridhaPage from "./pages/projects/Kridha";
import ShelfAPIPage from "./pages/projects/Shelfapi";
import IMSPage from "./pages/projects/Ims";
import EngineeringPage from "./pages/Engineering";
import { Preloader } from "./components/Preloader";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
        <div
          className={`transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
        >
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/projects/kridha" element={<KridhaPage />} />
              <Route path="/projects/shelfapi" element={<ShelfAPIPage />} />
              <Route path="/projects/ims" element={<IMSPage />} />
              <Route path="/engineering" element={<EngineeringPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
