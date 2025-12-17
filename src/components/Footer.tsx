import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <img src={logo} alt="Windhoek CV Writers" className="h-16 w-auto mb-4 brightness-0 invert" />
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Professional CV writing services in Namibia. We help you stand out and get hired.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/#services" className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/#about" className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              <li className="text-primary-foreground/70 text-sm">Professional CV Writing</li>
              <li className="text-primary-foreground/70 text-sm">Cover Letter Writing</li>
              <li className="text-primary-foreground/70 text-sm">CV Revision</li>
              <li className="text-primary-foreground/70 text-sm">Career Consultation</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:0812014151" className="flex items-center gap-2 text-primary-foreground/70 hover:text-secondary transition-colors text-sm">
                  <Phone className="w-4 h-4" />
                  081 201 4151
                </a>
              </li>
              <li>
                <a href="mailto:windhoekcvwriters@gmail.com" className="flex items-center gap-2 text-primary-foreground/70 hover:text-secondary transition-colors text-sm">
                  <Mail className="w-4 h-4" />
                  windhoekcvwriters@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/70 text-sm">
                <MapPin className="w-4 h-4" />
                Windhoek, Namibia
              </li>
              <li>
                <a 
                  href="https://www.facebook.com/profile.php?id=61583789264018" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-foreground/70 hover:text-secondary transition-colors text-sm"
                >
                  <Facebook className="w-4 h-4" />
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} Windhoek CV Writers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
