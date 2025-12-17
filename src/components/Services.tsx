import { useEffect, useRef, useState } from "react";
import { FileText, FileSignature, Users, RefreshCw, Settings, Linkedin } from "lucide-react";
import serviceCv from "@/assets/service-cv.jpg";
import serviceCoverLetter from "@/assets/service-cover-letter.jpg";
import serviceConsultation from "@/assets/service-consultation.jpg";
import serviceAts from "@/assets/service-ats.jpg";
import serviceRevision from "@/assets/service-revision.jpg";
import serviceLinkedin from "@/assets/service-linkedin.jpg";

const services = [
  {
    icon: FileText,
    title: "Professional CV Writing",
    description: "Modern, ATS-friendly CVs tailored to the Namibian job market, highlighting your skills, achievements, and career strengths.",
    image: serviceCv,
  },
  {
    icon: FileSignature,
    title: "Cover Letter Writing",
    description: "Custom-written, job-specific cover letters that explain why you're the ideal candidate and strengthen your application.",
    image: serviceCoverLetter,
  },
  {
    icon: Users,
    title: "Career Consultation",
    description: "Personalised consultations to tailor your career documents to individual goals and employer expectations.",
    image: serviceConsultation,
  },
  {
    icon: Settings,
    title: "ATS-Friendly Formatting",
    description: "Professional formatting to ensure your CV passes Applicant Tracking Systems and is easy for recruiters to read.",
    image: serviceAts,
  },
  {
    icon: RefreshCw,
    title: "CV Revision & Optimisation",
    description: "Refinement and improvement of existing CVs to enhance clarity, impact, and interview potential.",
    image: serviceRevision,
  },
  {
    icon: Linkedin,
    title: "LinkedIn Profile Optimization",
    description: "Enhance your professional online presence with a compelling LinkedIn profile that attracts recruiters.",
    image: serviceLinkedin,
  },
];

const Services = () => {
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
    <section id="services" className="py-24 bg-muted/30" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-4">
            Professional Career Documents
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We craft compelling career documents that showcase your unique strengths and help you stand out in Namibia's competitive job market.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isVisible = visibleItems.includes(index);
            
            return (
              <div
                key={service.title}
                data-index={index}
                className={`group bg-card rounded-xl overflow-hidden shadow-card card-hover transition-all duration-500 ${
                  isVisible 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
