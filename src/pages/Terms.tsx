import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-3xl px-4 py-20">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Terms of Service
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Last updated: July 4, 2026
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p className="text-foreground/80 leading-relaxed">
              By accessing and using the Pactly platform and website (collectively, the "Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">2. License Grant</h2>
            <p className="text-foreground/80 leading-relaxed">
              Pactly LLC grants you a limited, non-exclusive, non-transferable license to use the Service for your internal business purposes in accordance with these Terms. You may not sublicense, rent, lease, or transfer this license.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">3. User Responsibilities</h2>
            <div className="space-y-3 text-foreground/80 leading-relaxed">
              <p>
                You agree to:
              </p>
              <ul className="list-inside list-disc space-y-2 ml-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Be responsible for all activities under your account</li>
                <li>Not use the Service for illegal or unauthorized purposes</li>
                <li>Not transmit viruses, malware, or harmful code</li>
                <li>Not attempt to gain unauthorized access to the Service</li>
                <li>Not reverse-engineer, decompile, or disassemble the Service</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">4. Intellectual Property Rights</h2>
            <p className="text-foreground/80 leading-relaxed">
              All content, features, and functionality of the Service (including but not limited to software, text, graphics, logos, icons, and images) are owned by Pactly LLC or its content suppliers and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">5. User Content</h2>
            <div className="space-y-3 text-foreground/80 leading-relaxed">
              <p>
                You retain all rights to any content you upload to the Service. By uploading content, you grant Pactly LLC a worldwide, royalty-free license to use, reproduce, modify, and distribute the content solely to provide and improve the Service.
              </p>
              <p>
                You represent and warrant that you own or have the necessary rights to all content you submit and that its use does not violate any third-party rights or applicable laws.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">6. Acceptable Use Policy</h2>
            <p className="text-foreground/80 leading-relaxed">
              You agree not to use the Service to:
            </p>
            <ul className="list-inside list-disc space-y-2 text-foreground/80 ml-4">
              <li>Violate any applicable law or regulation</li>
              <li>Infringe on any intellectual property rights</li>
              <li>Engage in harassment, abuse, or threatening behavior</li>
              <li>Transmit obscene or defamatory content</li>
              <li>Interfere with the Service's operation or security</li>
              <li>Access unauthorized areas of the Service</li>
              <li>Scrape or extract data without permission</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">7. Service Modifications</h2>
            <p className="text-foreground/80 leading-relaxed">
              Pactly LLC reserves the right to modify, suspend, or discontinue the Service at any time, with or without notice. We will not be liable to you or any third party for any modification or discontinuation of the Service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">8. Disclaimer of Warranties</h2>
            <p className="text-foreground/80 leading-relaxed">
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Pactly LLC disclaims all warranties, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Service will be uninterrupted, error-free, or secure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">9. Limitation of Liability</h2>
            <p className="text-foreground/80 leading-relaxed">
              To the fullest extent permitted by law, Pactly LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits or data loss, arising from your use of or inability to use the Service, even if we have been advised of the possibility of such damages.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">10. Indemnification</h2>
            <p className="text-foreground/80 leading-relaxed">
              You agree to indemnify, defend, and hold harmless Pactly LLC, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of the Service or violation of these Terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">11. Termination</h2>
            <p className="text-foreground/80 leading-relaxed">
              Pactly LLC may terminate your access to the Service at any time, with or without cause or notice. Upon termination, all provisions of these Terms that by their nature should survive termination will survive.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">12. Governing Law</h2>
            <p className="text-foreground/80 leading-relaxed">
              These Terms are governed by and construed in accordance with the laws of the United States, without regard to its conflict of law principles. You agree to submit to the exclusive jurisdiction of the federal and state courts located in the United States.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">13. Severability</h2>
            <p className="text-foreground/80 leading-relaxed">
              If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will continue in full force and effect, and the invalid provision will be modified to the minimum extent necessary to make it valid.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">14. Entire Agreement</h2>
            <p className="text-foreground/80 leading-relaxed">
              These Terms constitute the entire agreement between you and Pactly LLC regarding the Service and supersede all prior or contemporaneous agreements, understandings, and communications, whether written or oral.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">15. Contact Information</h2>
            <p className="text-foreground/80 leading-relaxed">
              If you have questions about these Terms of Service, please contact us at:
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

export default Terms;
