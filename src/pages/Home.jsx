import AboutSection from "../components/AboutSection"
import Hero from "../components/Hero"
import { StarBackground } from "@/components/StarBackground"
import ServicesSection from "../components/ServicesSection"
import Projects from "../components/Projects"
import ContactForm from "../components/ContactForm"
import Experience from "../components/Experience"

export const Home = () => { 
    
    return <div className="min-h-screen bg-background text-foreground overflow-x-hidden overflow-y-hidden">        
        {/* Background Effects */}
        <StarBackground />

        {/* Main Content */}
        <Hero />
        <AboutSection />
        <ServicesSection />
        <Experience />
        <Projects />
        <ContactForm />
        
    </div>
}