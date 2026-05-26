import Navbar
  from "./components/Navbar";

import Hero
  from "./components/Hero";

import GlowBackground
  from "./components/GlowBackground";

import Features
  from "./components/Features";

import Stats
  from "./components/Stats";

import Particles
  from "./components/Particles";

import UploadSection
  from "./components/UploadSection";

import VerifySection
  from "./components/VerifySection";

import LiveStats
  from "./components/LiveStats";

import ActivityPanel
  from "./components/ActivityPanel";

function App() {

  return (

    <div className="
      relative
      min-h-screen
      bg-primary
      text-white
      overflow-hidden
    ">

      <Particles />

      <GlowBackground />

      <Navbar />

      <Hero />

      <LiveStats />

      <ActivityPanel />

      <Stats />

      <Features />

      <UploadSection />

      <VerifySection />

    </div>
  );
}

export default App;