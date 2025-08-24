import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, User, Eye, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // CSS Animation classes are applied via Tailwind
    const elements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .register-card, .about-item');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.remove('opacity-0');
        el.classList.add('animate-fade-in');
      }, index * 200);
    });
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        
        <div ref={heroRef} className="container mx-auto px-4 text-center relative z-10">
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6 opacity-0">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              SIH REGISTRATION
            </span>
            <br />
            <span className="text-4xl md:text-5xl text-foreground">2025</span>
          </h1>
          
          <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground mb-4 opacity-0">
            for LNCTU Students
          </p>
          
          <p className="hero-description text-lg text-muted-foreground mb-12 max-w-2xl mx-auto opacity-0">
            Join the ultimate innovation challenge! LNCTU is proud to help you register for 
            Smart India Hackathon 2025. Whether you're forming a team or looking to join one, 
            we've got you covered.
          </p>

          <Button
            onClick={() => scrollToSection('registration-options')}
            className="group relative overflow-hidden px-8 py-4 text-lg font-semibold"
            variant="default"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </section>

      {/* Registration Options */}
      <section id="registration-options" className="py-20 bg-card/30">
        <div ref={cardsRef} className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Choose Your Path
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Select how you want to participate in SIH 2025
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Team Registration */}
            <Card className="register-card group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 opacity-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="p-8 text-center relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Team Registration</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Already have a team? Register your complete team of 6 members 
                  with all details and skills.
                </p>
                <Link to="/team-registration">
                  <Button className="w-full group-hover:shadow-glow transition-all duration-300">
                    Register Team
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Individual Registration */}
            <Card className="register-card group relative overflow-hidden border-2 hover:border-accent/50 transition-all duration-300 opacity-0">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="p-8 text-center relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <User className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Individual Registration</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Looking for a team? Register individually and connect with 
                  other participants to form amazing teams.
                </p>
                <Link to="/individual-registration">
                  <Button variant="outline" className="w-full group-hover:bg-accent/10 transition-all duration-300">
                    Register Individual
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* View Registered */}
            <Card className="register-card group relative overflow-hidden border-2 hover:border-skill-frontend/50 transition-all duration-300 opacity-0">
              <div className="absolute inset-0 bg-gradient-to-br from-skill-frontend/5 to-skill-backend/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardContent className="p-8 text-center relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 bg-skill-frontend/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Eye className="h-8 w-8 text-skill-frontend" />
                </div>
                <h3 className="text-2xl font-bold mb-4">View Registered</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Browse all registered teams and individuals. Find teammates 
                  or check the competition!
                </p>
                <Link to="/registered">
                  <Button variant="secondary" className="w-full group-hover:shadow-card transition-all duration-300">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About/FAQ Section */}
      <section ref={aboutRef} className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            About & FAQ
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="about-item border border-border rounded-lg px-6 opacity-0">
                <AccordionTrigger className="text-left">
                  What is Smart India Hackathon?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Smart India Hackathon is a nationwide initiative to provide students a platform to solve some of the pressing problems we face in our daily lives, and thus inculcate a culture of product innovation and a mindset of problem-solving.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="about-item border border-border rounded-lg px-6 opacity-0">
                <AccordionTrigger className="text-left">
                  How does LNCTU support students?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  LNCTU provides comprehensive support including team formation assistance, mentorship, resource access, and this dedicated registration portal to streamline the process for our students.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="about-item border border-border rounded-lg px-6 opacity-0">
                <AccordionTrigger className="text-left">
                  What if I don't have a complete team?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  No worries! Use our individual registration to showcase your skills. Other students can view your profile and contact you to form teams. We encourage collaboration and team formation.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="about-item border border-border rounded-lg px-6 opacity-0">
                <AccordionTrigger className="text-left">
                  What information do I need to provide?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  For team registration: team name, leader details, and information for all 6 members including skills, GitHub profiles, and contact details. For individual registration: personal details, skills, experience, and optional contact information.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/50 border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Developed with ❤️ by <span className="font-semibold text-primary">Gautam Jaiswani</span>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            © 2025 LNCTU - Smart India Hackathon Registration Portal
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;