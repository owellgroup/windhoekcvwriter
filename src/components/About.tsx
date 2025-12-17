import { CheckCircle, MapPin, Award, Clock, Users } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Local Expertise",
    description: "Intimately familiar with the Namibian employment landscape",
  },
  {
    icon: Award,
    title: "Proven Results",
    description: "Higher interview rates and faster job placements",
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description: "Fast delivery with unlimited minor revisions",
  },
  {
    icon: Users,
    title: "Tailored to You",
    description: "Every document is custom-written, no templates",
  },
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">About Us</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-6">
              Your Partner in Career Success
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Windhoek CV Writers is a Namibian professional writing service dedicated to 
              empowering individuals with high-quality, customised career documents. Based 
              right here in Windhoek, we specialise in crafting modern, ATS-friendly CVs 
              and compelling cover letters that set you apart in Namibia's competitive job market.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our team combines years of writing expertise and local industry insight to create 
              CVs that communicate value and inspire confidence. We understand what employers 
              look for, how recruiters shortlist candidates, and what details make you stand out.
            </p>

            <div className="space-y-4">
              {[
                "Professionally formatted, ATS-friendly documents",
                "Tailored to the Namibian job market",
                "Affordable packages for every career stage",
                "Support across all 14 regions of Namibia",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={`p-6 bg-card rounded-xl shadow-card card-hover ${
                    index % 2 === 1 ? "mt-8" : ""
                  }`}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
