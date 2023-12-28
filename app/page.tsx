import { allPosts } from "@/.contentlayer/generated"
import HeroSection from "@/components/hero-section"
import { BackgroundBeamsDemo } from "@/components/ui/background-beam"
import Link from "next/link"

export default function Home() {
  return (
    <div className="max-w-4xl flex flex-col justify-center items-center gap-6 ">
      <div>
        <HeroSection />
        <BackgroundBeamsDemo />
      </div>
     
    </div>
  )
}
