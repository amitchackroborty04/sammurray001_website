import PageHeader from "@/components/Reuseable_cards/terms_and_privacy_Heders"


export const metadata = {
  title: "Terms of Service - Property Nexus",
  description: "Read our terms of service",
}

export default function TermsPage() {
  return (
    <main className="">
      <PageHeader backgroundUrl="/assets/termsimage.jpg" title="Terms of Service – Property Nexus" subtitle="Last updated: November 2025"/>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Section 1 */}
            <div>
              <h2 className="text-xl font-bold text-accent sm:text-2xl">1. Acceptance of Terms</h2>
              <p className="mt-4 leading-relaxed text-[#FFFFFF]">
                By accessing or using Property Nexus (&apos;The Platform&apos;) you agree to these Terms of Service and our
                Privacy Policy. If you do not agree, please do not use the Platform.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-xl font-bold text-accent sm:text-2xl">2. Our Service</h2>
              <p className="mt-4 leading-relaxed text-[#FFFFFF]">
                Property Nexus is a digital marketplace that connects people and businesses seeking property or space
                with those offering it. We do not own or manage the listed properties and are not a real estate agency.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-xl font-bold text-accent sm:text-2xl">3. User Accounts & Conduct</h2>
              <p className="mt-4 leading-relaxed text-[#FFFFFF] mb-4">You agree to:</p>
              <ul className="space-y-2 text-[#FFFFFF]">
                <li className="flex gap-3">
                  <span className="text-[#FFFFFF]">•</span>
                  <span>Provide accurate and truthful information</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#FFFFFF]">•</span>
                  <span>Be responsible for any content you post</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#FFFFFF]">•</span>
                  <span>Not upload offensive, false or misleading content</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#FFFFFF]">•</span>
                  <span>Comply with all relevant laws and regulations</span>
                </li>
              </ul>
              <p className="mt-4 leading-relaxed text-[#FFFFFF]">
                We reserve the right to remove content or suspend accounts that violate these Terms of Service.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-xl font-bold text-accent sm:text-2xl">4. Listings and Content</h2>
              <p className="mt-4 leading-relaxed text-[#FFFFFF]">
                All listings and user-submitted content remain the responsibility of the poster. Property Nexus is not
                liable for the accuracy, completeness or legality of any listing.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-xl font-bold text-accent sm:text-2xl">5. Fees and Payments</h2>
              <p className="mt-4 leading-relaxed text-[#FFFFFF]">
                Fixed plans or subscriptions are introduced, pricing and terms will be clearly displayed before
                purchase. All fees in USD unless otherwise stated.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-xl font-bold text-accent sm:text-2xl">6. Intellectual Property</h2>
              <p className="mt-4 leading-relaxed text-[#FFFFFF]">
                All design, branding and software on the Platform belong to Property Nexus or its licensors. You may not
                copy or reproduce any part without permission.
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-xl font-bold text-accent sm:text-2xl">7. Limitation of Liability</h2>
              <p className="mt-4 leading-relaxed text-[#FFFFFF]">
                Property Nexus is provided &apos;as is.&apos; We do not guarantee continuous availability of accuracy of content.
                To the extent permitted by law, we exclude all liability for loss or damage arising from use of the
                Platform.
              </p>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-xl font-bold text-accent sm:text-2xl">8. Termination</h2>
              <p className="mt-4 leading-relaxed text-[#FFFFFF]">
                We may suspend or terminate access at any time if we believe you&apos;ve breached these Terms or for
                maintenance and security reasons.
              </p>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-xl font-bold text-accent sm:text-2xl">9. Changes to These Terms</h2>
              <p className="mt-4 leading-relaxed text-[#FFFFFF]">
                We may update these Terms from time to time. The latest version will always be posted on this page and
                becomes effective immediately upon publication.
              </p>
            </div>

            {/* Section 10 */}
            <div>
              <h2 className="text-xl font-bold text-accent sm:text-2xl">10. Contact</h2>
              <p className="mt-4 leading-relaxed text-[#FFFFFF]">Questions about these Terms?</p>
              <p className="mt-2 text-[#FFFFFF]">
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
