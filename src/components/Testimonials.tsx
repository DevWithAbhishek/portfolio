import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, MessageSquarePlus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO, TechStart',
    content: 'Abhishek delivered exceptional work on our web application. His attention to detail and commitment to quality is remarkable. The animations and interactions he implemented truly elevated our user experience.',
    image: null,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Product Manager, InnovateCo',
    content: 'Working with Abhishek was a pleasure. He understood our requirements perfectly and delivered a solution that exceeded our expectations. His technical skills combined with creative problem-solving made all the difference.',
    image: null,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Founder, DesignHub',
    content: 'The portfolio website Abhishek created for me is absolutely stunning. His understanding of modern design trends and ability to implement complex animations sets him apart from other developers.',
    image: null,
  },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', testimonial: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: 'Thank you for your testimonial!',
      description: 'Your feedback has been submitted for review.',
    });
    
    setFormData({ name: '', email: '', testimonial: '' });
    setIsSubmitting(false);
  };

  return (
    <section id="testimonials" className="py-24 md:py-32 relative spotlight">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">
            What People <span className="gradient-text">Say</span>
          </h2>
          <p className="section-subtitle">
            Feedback from clients and collaborators I've had the pleasure to work with
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Main Testimonial Card */}
          <div className="card-glass gradient-border p-8 md:p-12">
            <Quote className="w-12 h-12 text-primary/30 mb-6" />
            <p className="text-lg md:text-xl leading-relaxed mb-8">
              "{testimonials[currentIndex].content}"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-lg">
                {testimonials[currentIndex].name.charAt(0)}
              </div>
              <div>
                <div className="font-display font-semibold text-lg">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-muted-foreground text-sm">
                  {testimonials[currentIndex].role}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full glass hover:bg-primary/10 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary w-8'
                      : 'bg-muted hover:bg-muted-foreground'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full glass hover:bg-primary/10 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Write Testimonial Button */}
          <div className="text-center mt-12">
            <Dialog>
              <DialogTrigger asChild>
                <button className="btn-outline-gradient text-foreground inline-flex items-center gap-2">
                  <MessageSquarePlus className="w-5 h-5" />
                  Write a Testimonial
                </button>
              </DialogTrigger>
              <DialogContent className="glass-strong border-border/50">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl gradient-text">
                    Share Your Experience
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Testimonial</label>
                    <textarea
                      value={formData.testimonial}
                      onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none resize-none"
                      placeholder="Share your experience working with me..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-gradient text-primary-foreground w-full disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
                  </button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
};
