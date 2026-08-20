import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
// import { Testimonials } from '@/components/Testimonials';
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <Hero />
      <Projects />
      <Skills />
      <Services />
      {/* <Testimonials /> */}
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
