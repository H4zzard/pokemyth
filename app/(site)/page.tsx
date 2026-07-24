import { HeroSection } from "@/components/home/hero-section";
import {
  ScreenshotsSection,
  UpdatesSection,
  EventsSection,
  FinalCTA,
} from "@/components/home/home-sections";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ScreenshotsSection />
      <UpdatesSection />
      <EventsSection />
      <FinalCTA />
    </>
  );
}
