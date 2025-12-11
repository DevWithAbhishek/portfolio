import { useState } from 'react';
import { Send, Github, Linkedin, Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/DevWithAbhishek',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/devwithabhishek/',
  },
  {
    name: 'Email',
    icon: Mail,
    url: 'mailto:abhishek@codewithabhishek.in',
  },
];

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create mailto link with form data
    const mailtoLink = `mailto:abhishek@codewithabhishek.in?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoLink;

    toast({
      title: 'Opening email client...',
      description: 'Your message is ready to send!',
    });

    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative spotlight min-h-screen flex items-center">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Let's Build Something{' '}
            <span className="gradient-text">Great Together</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind? Let's discuss how we can bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="card-glass gradient-border p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="peer w-full px-4 py-4 rounded-lg bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none placeholder-transparent"
                    placeholder="Name"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 -top-2.5 px-1 text-sm text-muted-foreground bg-card transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary"
                  >
                    Your Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="peer w-full px-4 py-4 rounded-lg bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none placeholder-transparent"
                    placeholder="Email"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 -top-2.5 px-1 text-sm text-muted-foreground bg-card transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary"
                  >
                    Your Email
                  </label>
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="peer w-full px-4 py-4 rounded-lg bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none placeholder-transparent"
                  placeholder="Subject"
                />
                <label
                  htmlFor="subject"
                  className="absolute left-4 -top-2.5 px-1 text-sm text-muted-foreground bg-card transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary"
                >
                  Subject
                </label>
              </div>
              <div className="relative">
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="peer w-full px-4 py-4 rounded-lg bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none resize-none placeholder-transparent"
                  placeholder="Message"
                />
                <label
                  htmlFor="message"
                  className="absolute left-4 -top-2.5 px-1 text-sm text-muted-foreground bg-card transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary"
                >
                  Your Message
                </label>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gradient text-primary-foreground w-full flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h3 className="font-display text-2xl font-bold mb-4">Get In Touch</h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm always excited to work on new projects and collaborate with creative minds. 
                Whether you have a question, a project idea, or just want to say hello, 
                feel free to reach out!
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-display font-semibold text-lg">Connect with me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-14 h-14 rounded-xl glass flex items-center justify-center hover:bg-primary/10 transition-all duration-300"
                    aria-label={social.name}
                  >
                    <social.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                  </a>
                ))}
              </div>
            </div>

            <div className="card-glass p-6">
              <p className="text-muted-foreground text-sm">
                <span className="text-foreground font-medium">Email:</span>{' '}
                <a href="mailto:abhishek@codewithabhishek.in" className="text-primary hover:underline">
                  abhishek@codewithabhishek.in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
