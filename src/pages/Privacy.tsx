import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-3xl px-4 py-20">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Privacy Policy
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Last updated: July 4, 2026
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">1. Introduction</h2>
            <p className="text-foreground/80 leading-relaxed">
              Pactly LLC ("we", "us", "our", or "Company") operates the pactlyhq.com website and the Pactly platform (collectively, the "Service"). This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website and use our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">2. Information We Collect</h2>
            <div className="space-y-3 text-foreground/80 leading-relaxed">
              <h3 className="font-semibold text-foreground">A. Information You Provide Directly</h3>
              <p>
                We collect information you voluntarily provide when you:
              </p>
              <ul className="list-inside list-disc space-y-2 ml-4">
                <li>Create an account or register for a demo</li>
                <li>Submit contact forms</li>
                <li>Upload documents for analysis</li>
                <li>Communicate with our support team</li>
                <li>Subscribe to our newsletters</li>
              </ul>
              <p className="mt-4">
                This information may include name, email address, company name, job title, phone number, and any documents or messages you submit.
              </p>

              <h3 className="font-semibold text-foreground mt-4">B. Information Collected Automatically</h3>
              <p>
                When you access our Service, we automatically collect certain information about your device, including:
              </p>
              <ul className="list-inside list-disc space-y-2 ml-4">
                <li>IP address and geolocation data</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent</li>
                <li>Referring URLs and click patterns</li>
              </ul>
              <p className="mt-4">
                We use cookies and similar tracking technologies to enhance your experience and understand Service usage patterns.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">3. How We Use Your Information</h2>
            <p className="text-foreground/80 leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="list-inside list-disc space-y-2 text-foreground/80 ml-4">
              <li>Provide, maintain, and improve the Service</li>
              <li>Process and fulfill your requests</li>
              <li>Send transactional and administrative communications</li>
              <li>Analyze usage patterns and improve user experience</li>
              <li>Detect, prevent, and address fraud or security issues</li>
              <li>Comply with legal obligations</li>
              <li>Send promotional communications (with your consent)</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">4. Data Sharing and Disclosure</h2>
            <div className="space-y-3 text-foreground/80 leading-relaxed">
              <p>
                We do not sell, trade, or otherwise transfer your personally identifiable information to third parties except:
              </p>
              <ul className="list-inside list-disc space-y-2 ml-4">
                <li>To service providers who assist us in operating our website and conducting our business</li>
                <li>When required by law or to protect our legal rights</li>
                <li>In connection with a merger, acquisition, or asset sale</li>
                <li>With your explicit consent</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">5. Data Security</h2>
            <p className="text-foreground/80 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security but are committed to protecting your data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">6. Your Rights and Choices</h2>
            <div className="space-y-3 text-foreground/80 leading-relaxed">
              <p>
                Depending on your jurisdiction, you may have the right to:
              </p>
              <ul className="list-inside list-disc space-y-2 ml-4">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability (receive your data in a structured format)</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact us at info@pactlyhq.com.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">7. Cookies and Tracking</h2>
            <p className="text-foreground/80 leading-relaxed">
              Our Service uses cookies and similar tracking technologies to enhance functionality and analyze usage. You can control cookie preferences through your browser settings. Disabling cookies may impact Service functionality.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">8. Third-Party Links</h2>
            <p className="text-foreground/80 leading-relaxed">
              Our Service may contain links to third-party websites. We are not responsible for their privacy practices. We encourage you to review their privacy policies before providing personal information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">9. Children's Privacy</h2>
            <p className="text-foreground/80 leading-relaxed">
              Our Service is not intended for individuals under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will delete the information and notify the parent or guardian.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">10. Policy Updates</h2>
            <p className="text-foreground/80 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on our website and updating the "Last updated" date. Your continued use of the Service constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">11. Contact Us</h2>
            <p className="text-foreground/80 leading-relaxed">
              If you have questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-secondary rounded-lg">
              <p className="font-semibold text-foreground">Pactly LLC</p>
              <p className="text-foreground/80">Email: info@pactlyhq.com</p>
              <p className="text-foreground/80">Phone: (307) 554-9921</p>
              <p className="text-foreground/80">Hours: Mon–Fri, 9am–5pm PT</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
