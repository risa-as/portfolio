import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Image from "next/image";

export const revalidate = 60; // ISR: Revalidate every 60 seconds

import Services from "@/components/sections/services";
import Footer from "@/components/footer";

export default function Home() {
    return (
        <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Services />
            <Contact />
            <Footer />
        </main>
    );
}
