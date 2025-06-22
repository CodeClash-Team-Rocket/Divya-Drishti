import React from "react";
import Hero from "./components/Hero";
// import { HeroHighlight } from "@/components/ui/hero-highlight";
// import { Spotlight } from "@/components/ui/spotlight-new";
import Showcase from "./components/showcase";

export default function page() {
  return (
    <div>
      <Hero />
      <Showcase />
    </div>
  );
}
