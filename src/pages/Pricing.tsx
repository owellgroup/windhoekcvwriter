import { useEffect, useRef, useState } from "react";
import { Check, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const packages = [
  {
    name: "Entry Level",
    experience: "0-3 Years",
    price: "N$100",
    description: "Building Your Foundation",
    details: "Perfect for recent graduates and those early in their careers. We focus on academic achievements, internships, and transferable skills to launch your professional journey.",
    features: [
      "Professional ATS-friendly CV",
      "Tailored to Namibian market",
      "Focus on academic achievements",
      "Highlight transferable skills",
      "Quick turnaround",
      "Unlimited minor revisions",
    ],
    popular: false,
  },
  {
    name: "Mid-Level",
    experience: "3-8 Years",
    price: "N$150",
    description: "Highlighting Your Impact",
    details: "Designed for professionals looking to progress or change roles. We emphasise proven accomplishments, responsibilities, and quantifiable results that show your value.",
    features: [
      "Everything in Entry Level",
      "Achievement-focused content",
      "Quantifiable results highlighted",
      "Career progression strategy",
      "Industry-specific keywords",
      "Professional summary",
    ],
    popular: true,
  },
  {
    name: "Senior Level",
    experience: "8-15 Years",
    price: "N$200",
    description: "Showcasing Leadership & Expertise",
    details: "For established experts and managers. We craft a strategic CV highlighting leadership, team management, complex project success, and industry-specific expertise.",
    features: [
      "Everything in Mid-Level",
      "Leadership showcase",
      "Team management highlights",
      "Complex project success",
      "Industry expertise emphasis",
      "Strategic positioning",
    ],
    popular: false,
  },
  {
    name: "Executive Level",
    experience: "15+ Years",
    price: "N$250",
    description: "Defining Your Legacy",
    details: "Our premium service for directors, CEOs, and senior executives. This package focuses on strategic vision, P&L responsibility, organisational transformation, and key stakeholder management.",
    features: [
      "Everything in Senior Level",
      "Executive positioning",
      "Strategic vision showcase",
      "Board-level presentation",
      "Transformation leadership",
      "Premium formatting",
    ],
    popular: false,
  },
];

const Pricing = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0");
            setVisibleItems((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const items = sectionRef.current?.querySelectorAll("[data-index]");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4 text-center">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">Our Packages</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mt-2 mb-6">
              CV Writing Packages
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Choose the package that aligns with your current career stage. All packages include 
              a professionally formatted, ATS-friendly CV tailored to the Namibian market.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16" ref={sectionRef}>
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {packages.map((pkg, index) => {
                const isVisible = visibleItems.includes(index);
                
                return (
                  <div
                    key={pkg.name}
                    data-index={index}
                    className={`relative bg-card rounded-2xl shadow-card overflow-hidden transition-all duration-500 ${
                      isVisible 
                        ? "opacity-100 translate-y-0" 
                        : "opacity-0 translate-y-8"
                    } ${pkg.popular ? "ring-2 ring-primary" : ""}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {pkg.popular && (
                      <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-xs font-medium rounded-bl-lg flex items-center gap-1">
                        <Star className="w-3 h-3" fill="currentColor" />
                        Popular
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-display font-bold text-foreground">{pkg.name}</h3>
                        <p className="text-primary text-sm font-medium">{pkg.experience}</p>
                      </div>
                      
                      <div className="mb-4">
                        <span className="text-4xl font-display font-bold text-foreground">{pkg.price}</span>
                      </div>
                      
                      <p className="text-secondary font-medium text-sm mb-2">{pkg.description}</p>
                      <p className="text-muted-foreground text-sm mb-6">{pkg.details}</p>
                      
                      <ul className="space-y-3 mb-6">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        variant={pkg.popular ? "cta" : "outline"} 
                        className="w-full" 
                        asChild
                      >
                        <a href="tel:0812014151" className="flex items-center justify-center gap-2">
                          <Phone className="w-4 h-4" />
                          Get Started
                        </a>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Cover Letter Add-on */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-card rounded-2xl shadow-card p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                Add a Cover Letter
              </h2>
              <p className="text-muted-foreground mb-6">
                Don't let your CV go alone! Add a compelling, job-specific cover letter that 
                explains why you're the perfect candidate.
              </p>
              <div className="mb-6">
                <span className="text-4xl font-display font-bold text-primary">N$50</span>
                <span className="text-muted-foreground ml-2">when bundled with any CV package</span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 text-left mb-8">
                {[
                  "Shows genuine interest in the role",
                  "Tells your unique career story",
                  "Demonstrates communication skills",
                  "Creates a personal connection",
                  "Addresses key job criteria",
                  "Custom-written for each application",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-foreground text-sm">{item}</span>
                  </div>
                ))}
              </div>
              
              <Button variant="cta" size="xl" asChild>
                <a href="tel:0812014151" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call to Add Cover Letter
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
