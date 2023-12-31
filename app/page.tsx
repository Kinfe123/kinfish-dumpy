import { allPosts } from "@/.contentlayer/generated";
import HeroSection from "@/components/hero-section";
import Lamper from "@/components/lamp";
import Trendy from "@/components/trendy";
import { BackgroundBeamsDemo } from "@/components/ui/background-beam";

import { EvervaultCard } from "@/components/ui/card-binary";
import TwickledDemo from "@/components/ui/twickled-view";

export default function Home() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-6 ">
      <div>
        <HeroSection />
        <div>
          <Trendy />
        </div>
        <div className="max-w-full mx-auto  flex flex-col justify-center items-center">
          <BackgroundBeamsDemo />
        </div>
        <div>
          <Lamper />
        </div>

        <TwickledDemo />
      </div>
    </div>
  );
}
