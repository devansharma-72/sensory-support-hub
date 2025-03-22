
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedTransition from "@/components/AnimatedTransition";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <AnimatedTransition type="blur">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-8">
            <span className="text-4xl font-bold">404</span>
          </div>
        </AnimatedTransition>
        
        <AnimatedTransition type="blur" delay={0.1}>
          <h1 className="text-3xl font-bold mb-2">Page not found</h1>
        </AnimatedTransition>
        
        <AnimatedTransition type="blur" delay={0.2}>
          <p className="text-muted-foreground mb-8">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </AnimatedTransition>
        
        <AnimatedTransition type="blur" delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </AnimatedTransition>
      </div>
    </div>
  );
};

export default NotFound;
