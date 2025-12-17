import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const serviceOptions = [
  "Professional CV Writing",
  "Cover Letter Writing",
  "Career Consultation",
  "ATS-Friendly Formatting",
  "CV Revision & Optimisation",
  "LinkedIn Profile Optimization",
];

const pricingOptions = [
  "Entry Level – N$100 (0–3 years)",
  "Mid-Level – N$150 (3–8 years)",
  "Senior Level – N$200 (8–15 years)",
  "Executive Level – N$250 (15+ years)",
];

const BookingForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [pricingTier, setPricingTier] = useState(pricingOptions[1]);
  const [preferredContact, setPreferredContact] = useState<"phone" | "email">("phone");
  const [timeframe, setTimeframe] = useState("Within 3–5 days");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service],
    );
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!fullName || !email || selectedServices.length === 0 || !pricingTier) {
      setStatus("error");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          services: selectedServices,
          pricingTier,
          preferredContact,
          timeframe,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      setFullName("");
      setEmail("");
      setPhone("");
      setSelectedServices([]);
      setPricingTier(pricingOptions[1]);
      setPreferredContact("phone");
      setTimeframe("Within 3–5 days");
      setMessage("");
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-background" id="booking">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Book Your Service
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-4">
              Ready to get started?
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-xl">
              Tell us which services you need and your career level, and we&apos;ll contact you to
              confirm the details and get your CV package started.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Personalised recommendations based on your goals</li>
              <li>• Fast response during business hours</li>
              <li>• All information kept private and confidential</li>
            </ul>
          </div>

          <div className="bg-card rounded-2xl shadow-card p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (WhatsApp)</Label>
                  <Input
                    id="phone"
                    placeholder="081 201 4151"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Which services are you interested in?</Label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {serviceOptions.map((service) => (
                    <label
                      key={service}
                      className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 cursor-pointer hover:border-primary/60"
                    >
                      <Checkbox
                        checked={selectedServices.includes(service)}
                        onCheckedChange={() => toggleService(service)}
                      />
                      <span className="text-sm text-foreground">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pricingTier">Which CV package best matches you?</Label>
                <select
                  id="pricingTier"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={pricingTier}
                  onChange={(e) => setPricingTier(e.target.value)}
                  required
                >
                  {pricingOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Preferred contact method</Label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setPreferredContact("phone")}
                      className={`flex-1 rounded-lg border px-3 py-2 text-sm ${
                        preferredContact === "phone"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      Phone / WhatsApp
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreferredContact("email")}
                      className={`flex-1 rounded-lg border px-3 py-2 text-sm ${
                        preferredContact === "email"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      Email
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeframe">How soon do you need your CV?</Label>
                  <select
                    id="timeframe"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                  >
                    <option>Urgent (24–48 hours)</option>
                    <option>Within 3–5 days</option>
                    <option>Flexible timeline</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Anything else we should know?</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your current role, target job, or any specific requirements."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Button
                  type="submit"
                  variant="cta"
                  size="xl"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending booking..." : "Submit Booking Request"}
                </Button>
                {status === "success" && (
                  <p className="text-sm text-emerald-600">
                    Thank you! Your booking request has been sent. We&apos;ll contact you shortly.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-sm text-red-600">
                    Something went wrong. Please check the required fields and try again.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;


