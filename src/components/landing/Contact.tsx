import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, Clock, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const FREE_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
  "icloud.com",
];

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255)
    .refine(
      (email) => !FREE_EMAIL_DOMAINS.includes(email.split("@")[1]?.toLowerCase() ?? ""),
      "Please use your enterprise email address"
    ),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a bit more — at least 10 characters")
    .max(2000),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const contactInfo = [
  { icon: Mail, label: "Email", value: "info@pactlyhq.com", href: "mailto:info@pactlyhq.com" },
  { icon: Phone, label: "Phone", value: "(307) 554-9921", href: "tel:+13075549921" },
  { icon: Clock, label: "Hours", value: "Mon–Fri, 9am–5pm PT" },
];

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (values: ContactFormValues) => {
    // Simulate request handling; wire to backend/CRM when available.
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.info("Demo request submitted:", values);
    setSubmitted(true);
    toast.success("Request received", {
      description: "Our team will reach out within one business day.",
    });
  };

  return (
    <section id="contact" className="scroll-mt-20 bg-primary py-20 text-white lg:py-28">
      <div className="container grid gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Info */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--electric-bright))]">
            Contact
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            See Pactly on your agreements
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-white/70">
            Book a 30-minute demo tailored to your team. We'll walk through
            intake, Maestro orchestration, and compliance tracking using
            agreement types you actually handle.
          </p>

          <dl className="mt-10 space-y-6">
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <Icon className="h-5 w-5 text-[hsl(var(--electric-bright))]" />
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-white/50">
                    {label}
                  </dt>
                  <dd className="mt-0.5 font-medium">
                    {href ? (
                      <a href={href} className="transition-colors hover:text-[hsl(var(--electric-bright))]">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        {/* Form */}
        <Card className="border-white/10 bg-white text-foreground shadow-lg">
          <CardContent className="p-8">
            {submitted ? (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
                <CheckCircle2 className="h-12 w-12 text-accent" />
                <h3 className="mt-4 text-xl font-semibold">Thank you!</h3>
                <p className="mt-2 max-w-sm text-muted-foreground">
                  Your demo request is in. A Pactly specialist will reach out
                  within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Name</Label>
                  <Input
                    id="contact-name"
                    placeholder="Jordan Ellis"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-email">Enterprise Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="jordan.ellis@company.com"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Tell us about your agreement volume, teams involved, and current systems (ServiceNow, Workday, etc.)"
                    aria-invalid={!!errors.message}
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {isSubmitting ? "Sending…" : "Book a Demo"}
                  {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  No payment required. We'll never share your information.
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
