import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CareerPaths from "./components/CareerPaths";
import FeaturedJobs from "./components/FeaturedJobs";
import CareerMatch from "./components/CareerMatch";
import CareerFlow from "./components/CareerFlow";
import HiringOrbit from "./components/HiringOrbit";
import CareerProfile from "./components/CareerProfile";
import SmartJobRadar from "./components/SmartJobRadar";
import FinalAction from "./components/FinalAction";
import LuxuryFooter from "./components/LuxuryFooter";

import Profile from "./profile/Profile";

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <CareerPaths />
        <FeaturedJobs />
        <CareerMatch />
        <CareerFlow />
        <HiringOrbit />
        <CareerProfile />
        <SmartJobRadar />
        <FinalAction />
      </main>

      <LuxuryFooter />
    </>
  );
}

// Jobs Page
function JobsPage() {
  return (
    <>
      <Navbar />

      <main>
        <FeaturedJobs />
      </main>

      <LuxuryFooter />
    </>
  );
}

// Internships Page
function InternshipsPage() {
  return (
    <>
      <Navbar />

      <main>
        <CareerPaths />
      </main>

      <LuxuryFooter />
    </>
  );
}

// Career Match Page
function CareerMatchPage() {
  return (
    <>
      <Navbar />

      <main>
        <CareerMatch />
      </main>

      <LuxuryFooter />
    </>
  );
}

// Career Flow Page
function CareerFlowPage() {
  return (
    <>
      <Navbar />

      <main>
        <CareerFlow />
      </main>

      <LuxuryFooter />
    </>
  );
}

// Companies Page
function CompaniesPage() {
  return (
    <>
      <Navbar />

      <main>
        <HiringOrbit />
      </main>

      <LuxuryFooter />
    </>
  );
}

// Profile Page
function ProfilePage() {
  return (
    <>
      <Navbar />

      <main>
        <Profile />
      </main>

      <LuxuryFooter />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/jobs" element={<JobsPage />} />

        <Route
          path="/internships"
          element={<InternshipsPage />}
        />

        <Route
          path="/career-match"
          element={<CareerMatchPage />}
        />

        <Route
          path="/career-flow"
          element={<CareerFlowPage />}
        />

        <Route
          path="/companies"
          element={<CompaniesPage />}
        />

        <Route
          path="/profile"
          element={<ProfilePage />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;