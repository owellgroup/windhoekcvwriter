import { useEffect, useState } from "react";
import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const animatedWords = ["Professional", "Modern", "ATS-Friendly", "Custom-Made"];

const Hero = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % animatedWords.length);
        setIsVisible(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32 mt-20">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-2 bg-primary/20 text-primary-foreground rounded-full text-sm font-medium mb-6 animate-fade-in backdrop-blur-sm border border-primary/30">
            Windhoek's #1 CV Writing Service
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6 animate-fade-in-up">
            Get a{" "}
            <span 
              className={`text-secondary inline-block transition-all duration-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
              }`}
            >
              {animatedWords[currentWordIndex]}
            </span>
            <br />
            CV That Gets You Hired
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 animate-fade-in-up animation-delay-200 max-w-2xl">
            Transform your career history into a powerful, accomplishment-driven narrative 
            that captures the attention of hiring managers in Namibia.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
            <Button variant="cta" size="xl" asChild>
              <a href="tel:0812014151" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Call Now
              </a>
            </Button>
            <Button variant="hero" size="xl" asChild>
              <Link to="/pricing" className="flex items-center gap-2">
                View Pricing
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap gap-8 animate-fade-in-up animation-delay-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              <span className="text-primary-foreground/70 text-sm">Quick Turnaround</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              <span className="text-primary-foreground/70 text-sm">ATS-Optimized</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full" />
              <span className="text-primary-foreground/70 text-sm">Unlimited Revisions</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
