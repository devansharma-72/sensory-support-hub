
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  Heart, 
  Users, 
  BookOpen, 
  Mic, 
  Star, 
  HelpCircle, 
  MessageSquare, 
  Gamepad, 
  Music 
} from 'lucide-react';
import Layout from '@/components/Layout';
import FeatureCard from '@/components/FeatureCard';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from '@/components/ui/button';

const Index = () => {
  const features = [
    {
      title: 'Customizable Reminders',
      description: 'Create personalized reminders for daily tasks, appointments, and routines.',
      icon: Clock,
      color: 'sensory-calm',
    },
    {
      title: 'Focus Management',
      description: 'Pomodoro timer with customizable work and break durations to help maintain focus.',
      icon: Clock,
      color: 'sensory-focus',
    },
    {
      title: 'Emotional Regulation',
      description: 'Tools and exercises to help identify, understand, and manage emotions effectively.',
      icon: Heart,
      color: 'sensory-energy',
    },
    {
      title: 'Social Interaction Support',
      description: 'Guides and prompts for navigating various social situations with confidence.',
      icon: Users,
      color: 'sensory-joy',
    },
    {
      title: 'Journal & Progress',
      description: 'Track your daily experiences, challenges, and achievements over time.',
      icon: BookOpen,
      color: 'primary',
    },
    {
      title: 'Voice & Text Options',
      description: 'Interact with the app through voice commands or traditional text input.',
      icon: Mic,
      color: 'accent',
    },
    {
      title: 'Personalized Recommendations',
      description: 'Receive suggestions tailored to your unique preferences and needs.',
      icon: Star,
      color: 'sensory-energy',
    },
    {
      title: 'Community Support',
      description: 'Connect with others, share experiences, and discover helpful resources.',
      icon: HelpCircle,
      color: 'sensory-calm',
    },
    {
      title: 'Scenario Practice',
      description: 'Practice responses to common social scenarios and receive helpful feedback.',
      icon: MessageSquare,
      color: 'sensory-focus',
    },
    {
      title: 'Memory Games',
      description: 'Strengthen cognitive skills with engaging, adaptable memory exercises.',
      icon: Gamepad,
      color: 'sensory-joy',
    },
    {
      title: 'Focus Playlist Generator',
      description: 'Create custom audio environments to enhance concentration and productivity.',
      icon: Music,
      color: 'primary',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background"></div>
          <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-accent/10 via-primary/5 to-background blur-3xl opacity-60 transform -translate-y-1/2"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <AnimatedTransition type="blur">
              <motion.span 
                className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary"
              >
                Designed with neurodiversity in mind
              </motion.span>
            </AnimatedTransition>
            
            <AnimatedTransition type="blur" delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
                Support for your <span className="text-primary">sensory</span> journey
              </h1>
            </AnimatedTransition>
            
            <AnimatedTransition type="blur" delay={0.2}>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
                A comprehensive digital companion designed to support autistic individuals with tools for focus, emotional regulation, social interaction, and personal growth.
              </p>
            </AnimatedTransition>
            
            <AnimatedTransition type="scale" delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/dashboard">
                    Get Started
                  </Link>
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </AnimatedTransition>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-accent/10 text-accent">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tools designed for your needs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform offers a comprehensive suite of features to support your daily life, focusing on what matters most to you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                color={feature.color as any}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-background"></div>
          <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-to-tr from-accent/10 via-primary/5 to-background blur-3xl opacity-60 transform translate-y-1/2"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="glass-card rounded-2xl p-8 md:p-12 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to begin your journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our supportive community today and discover tools designed to enhance your daily life and well-being.
            </p>
            <Button size="lg" asChild>
              <Link to="/dashboard">
                Start Now
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
