import AboutSection from "@/components/web/about-section";
import BrowseProperties from "@/components/web/browse-properties";
import FeaturedListings from "@/components/web/featured-listings";
import Footer from "@/components/web/footer";
import Header from "@/components/web/header";
import Hero from "@/components/web/hero";
import MapSection from "@/components/web/map-section";
import ProcessSteps from "@/components/web/process-steps";


export default function Home() {
  return (
    <main className="bg-[#070E28]">
      <Header />
      <Hero />
      <ProcessSteps />
      <FeaturedListings />
      <MapSection />
      <AboutSection />
      <BrowseProperties/>
      <Footer />
    </main>
  )
}
