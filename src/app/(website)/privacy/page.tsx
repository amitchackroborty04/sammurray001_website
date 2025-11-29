import PgaeHeaders from "@/components/Reuseable_cards/terms_and_privacy_Heders"


export const metadata = {
  title: "Privacy Policy - Property Nexus",
  description: "Read our privacy policy",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen ">
    <PgaeHeaders backgroundUrl="/assets/privacy.jpg" title="Privacy Policy – Property Nexus" subtitle="Last updated: November 2025"/>
      <section className="py-16 sm:py-24">
        <div className="mx-auto  container px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Section 1 */}
            <div>
              <h2 className="text-xl font-bold text-accent sm:text-2xl">1. Who We Are</h2>
              <p className="mt-4 leading-relaxed text-[#FFFFFF]">
                Property Nexus (&apos;us&apos;) is a digital marketplace that connects people and businesses seeking property or
                space with those offering it. We do not own or manage the listed properties and are not a real estate
                agency.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-xl font-bold text-accent sm:text-2xl">2. Information We Collect</h2>
              <p className="mt-4 leading-relaxed text-[#FFFFFF] mb-4">We may collect:</p>
              <ul className="space-y-2 text-[#FFFFFF]">
                <li className="flex gap-3">
                  <span className="text-[#FFFFFF]">•</span>
                  <span>Basic info (name, email address, phone number)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#FFFFFF]">•</span>
                  <span>Account and profile information of description and digital listing</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#FFFFFF]">•</span>
                  <span>Property or business information you submit to listing</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#FFFFFF]">•</span>
                  <span>Communications on how you use pages visited, line time on site</span>
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-xl font-bold text-accent sm:text-2xl">3. How We Use Your Information</h2>
              <p className="mt-4 leading-relaxed text-[#FFFFFF] mb-4">We use the information we collect to:</p>
              <ul className="space-y-2 text-[#FFFFFF]">
                <li className="flex gap-3">
                  <span className="text-[#FFFFFF]">•</span>
                  <span>Provide and maintain our platform and services</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#FFFFFF]">•</span>
                  <span>Match tenants, developers and property owners</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#FFFFFF]">•</span>
                  <span>Improve website performance and user experience</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#FFFFFF]">•</span>
                  <span>Send transactional emails and marketing communications (as allowed)</span>
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-xl font-bold text-accent sm:text-2xl">4. Analytics & Cookies</h2>
              <p className="mt-4 leading-relaxed text-[#FFFFFF]">
                We use Google Analytics and similar tools to understand how our site is used. Third-party cookies are
                set cookies that collect anonymous-aggregated data. By continuing to use our site, you agree to our use
                of cookies.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-xl font-bold text-accent sm:text-2xl">5. Data Storage & Security</h2>
              <p className="mt-4 leading-relaxed text-[#FFFFFF]">
                Your data is stored securely in the cloud (eg. AWS, GCP of Heroku). We take reasonable steps to protect
                your information from loss, misuse or unauthorized access.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-xl font-bold text-accent sm:text-2xl">6. Sharing of Information</h2>
              <p className="mt-4 leading-relaxed text-[#FFFFFF]">We only share data with:</p>
              <ul className="space-y-2 text-[#FFFFFF] mt-4">
                <li className="flex gap-3">
                  <span className="text-[#FFFFFF]">•</span>
                  <span>Law enforcement if legally required in court order</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#FFFFFF]">•</span>
                  <span>We never sell personal information to third parties</span>
                </li>
              </ul>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-xl font-bold text-accent sm:text-2xl">7. Access and Corrections</h2>
              <p className="mt-4 leading-relaxed text-[#FFFFFF]">
                You can request access to your personal information at any time by contacting us at the email below.
              </p>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-xl font-bold text-accent sm:text-2xl">8. International Transfers</h2>
              <p className="mt-4 leading-relaxed text-[#FFFFFF]">
                If your data is stored in the US or Australia, we ensure that appropriate safeguards are in place.
              </p>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-xl font-bold text-accent sm:text-2xl">9. Contact Us</h2>
              <p className="mt-4 leading-relaxed text-[#FFFFFF]">For questions about privacy, contact:</p>
              <p className="mt-4 text-[#FFFFFF]">
                <a href="mailto:support@propertynexus.io" className="bg-gradient bg-clip-text text-transparent transition-colors">
                  support@nexus.io
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

     
    </main>
  )
}
