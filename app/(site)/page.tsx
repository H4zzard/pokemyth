import { HeroSection } from "@/components/home/hero-section";
import { MarketPreview } from "@/components/home/market-preview";
import { FeaturePath } from "@/components/home/feature-path";
import {
  ScreenshotsSection,
  UpdatesSection,
  CommunitySection,
  EventsSection,
  PokepediaSection,
  FinalCTA,
} from "@/components/home/home-sections";
import { marketListings } from "@/lib/data/market-items";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ScreenshotsSection />
      <FeaturePath />
      <MarketPreview listings={marketListings} />
      <UpdatesSection />
      <CommunitySection />
      <EventsSection />
      <PokepediaSection />
      <FinalCTA />
    </>
  );
}
