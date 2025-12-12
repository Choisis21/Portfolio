import AboutSection from "../components/AboutSection"
import Hero from "../components/Hero"
import { Navbar } from "../components/Navbar"
import { StarBackground } from "@/components/StarBackground"
import ServicesSection from "../components/ServicesSection"
import Projects from "../components/Projects"

export const Home = () => { 
    
    return <div className="min-h-screen bg-background text-foreground overflow-x-hidden overflow-y-hidden">        
        {/* Background Effects */}
        <StarBackground />

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <Hero />
        <AboutSection />
        <ServicesSection />
        <Projects />

        {/* Footer */}
    </div>
}