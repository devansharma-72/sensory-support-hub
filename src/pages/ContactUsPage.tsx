
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Mail, Phone, MapPin, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ContactUsPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <AnimatedTransition type="fade">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Contact Us</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              We're here to help with any questions or concerns. Reach out to our team using any of the methods below.
            </p>
          </div>
        </AnimatedTransition>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <AnimatedTransition type="fade" delay={0.1}>
              <Card className="dark-card h-full">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Get in Touch</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="mr-4 mt-1">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Email Us</h3>
                        <p className="text-muted-foreground text-sm mb-1">For general inquiries:</p>
                        <a href="mailto:support@sensoryhub.com" className="text-primary hover:underline">
                          support@sensoryhub.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mr-4 mt-1">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <Phone className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Call Us</h3>
                        <p className="text-muted-foreground text-sm mb-1">Monday to Friday, 9AM-5PM:</p>
                        <a href="tel:+18005551234" className="text-primary hover:underline">
                          +1 (800) 555-1234
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mr-4 mt-1">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Visit Us</h3>
                        <p className="text-muted-foreground text-sm mb-1">Our main office:</p>
                        <address className="not-italic">
                          123 Support Street<br />
                          San Francisco, CA 94103<br />
                          United States
                        </address>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="mr-4 mt-1">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <MessageSquare className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Live Chat</h3>
                        <p className="text-muted-foreground text-sm mb-1">Available 24/7:</p>
                        <Button variant="outline" size="sm">
                          Start Chat
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedTransition>
            
            <AnimatedTransition type="fade" delay={0.2}>
              <Card className="dark-card h-full">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Send a Message</h2>
                  
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input id="name" placeholder="Your name" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input id="email" type="email" placeholder="Your email" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input id="subject" placeholder="What is this regarding?" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea id="message" placeholder="Your message" rows={5} />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </AnimatedTransition>
          </div>
          
          <AnimatedTransition type="fade" delay={0.3}>
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-semibold mb-2">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Find quick answers to common questions</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                {
                  question: "How do I reset my password?",
                  answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page and following the instructions sent to your email."
                },
                {
                  question: "Is my data secure?",
                  answer: "Yes, we use industry-standard encryption to protect your personal information and never share your data with third parties without your explicit consent."
                },
                {
                  question: "Can I use the app offline?",
                  answer: "Some features of the app are available offline, but you'll need an internet connection to sync your data and access all functionalities."
                },
                {
                  question: "How do I customize notifications?",
                  answer: "Go to your profile settings and select 'Notifications' to customize which alerts you receive and how they're delivered."
                },
              ].map((faq, index) => (
                <Card key={index} className="dark-card">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </AnimatedTransition>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
