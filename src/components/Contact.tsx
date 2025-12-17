import { Phone, Mail, MapPin, Clock, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Get In Touch</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-4">
            Ready to Boost Your Career?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Contact us today to discuss your CV needs. We're here to help you take the next step in your career journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-card p-6 rounded-xl shadow-card text-center card-hover">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">Phone</h3>
            <a 
              href="tel:0812014151" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              081 201 4151
            </a>
          </div>

          <div className="bg-card p-6 rounded-xl shadow-card text-center card-hover">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">Email</h3>
            <a 
              href="mailto:windhoekcvwriters@gmail.com" 
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              windhoekcvwriters@gmail.com
            </a>
          </div>

          <div className="bg-card p-6 rounded-xl shadow-card text-center card-hover">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">Location</h3>
            <p className="text-muted-foreground">Windhoek, Namibia</p>
          </div>

          <div className="bg-card p-6 rounded-xl shadow-card text-center card-hover">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">Hours</h3>
            <p className="text-muted-foreground">Mon – Fri</p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cta" size="xl" asChild>
              <a href="tel:0812014151" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a 
                href="https://www.facebook.com/profile.php?id=61583789264018" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Facebook className="w-5 h-5" />
                Follow on Facebook
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
