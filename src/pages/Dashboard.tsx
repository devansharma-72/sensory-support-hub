
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Heart, 
  Users, 
  BookOpen, 
  Mic, 
  MessageSquare, 
  Gamepad, 
  Music,
  Bell,
  Calendar,
  Activity,
  Plus,
  Book,
  Timer
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FeatureCard from '@/components/FeatureCard';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const featureSections = [
    {
      title: "Daily Tools",
      description: "Features to support your daily routine",
      items: [
        {
          title: 'Reminders',
          description: 'Set custom notifications for important tasks and events',
          icon: Bell,
          color: 'sensory-calm',
          onClick: () => navigate('/reminders'),
        },
        {
          title: 'Focus Timer',
          description: 'Customize work and break intervals to maintain focus',
          icon: Clock,
          color: 'sensory-focus',
          onClick: () => navigate('/focus-timer'),
        },
        {
          title: 'Journal',
          description: 'Document your thoughts, feelings, and experiences',
          icon: BookOpen,
          color: 'primary',
          onClick: () => navigate('/journal'),
        },
      ]
    },
    {
      title: "Support Features",
      description: "Tools designed to help with specific situations",
      items: [
        {
          title: 'Emotion Tools',
          description: 'Resources to help identify and manage emotions',
          icon: Heart,
          color: 'sensory-energy',
        },
        {
          title: 'Social Guide',
          description: 'Guidance for navigating various social scenarios',
          icon: Users,
          color: 'sensory-joy',
        },
        {
          title: 'Voice Assistant',
          description: 'Interact with the app using voice commands',
          icon: Mic,
          color: 'accent',
        },
      ]
    },
    {
      title: "Activity Center",
      description: "Interactive exercises to build skills",
      items: [
        {
          title: 'Scenario Practice',
          description: 'Practice responses to common social situations',
          icon: MessageSquare,
          color: 'sensory-focus',
          onClick: () => navigate('/scenario-talks'),
        },
        {
          title: 'Memory Games',
          description: 'Engaging activities to strengthen memory skills',
          icon: Gamepad,
          color: 'sensory-joy',
          onClick: () => navigate('/memory-game'),
        },
        {
          title: 'Focus Playlist',
          description: 'Generate custom audio environments for concentration',
          icon: Music,
          color: 'primary',
          onClick: () => navigate('/focus-playlist'),
        },
      ]
    }
  ];

  return (
    <div className="bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <AnimatedTransition type="fade">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here are your tools and features.</p>
            </div>
          </AnimatedTransition>
          
          <AnimatedTransition type="fade" delay={0.1}>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => navigate('/focus-timer')} variant="outline" className="flex items-center">
                <Timer className="mr-2 h-4 w-4" />
                Focus Timer
              </Button>
              <Button onClick={() => navigate('/journal')} variant="outline" className="flex items-center">
                <Book className="mr-2 h-4 w-4" />
                Journal
              </Button>
              <Button onClick={() => navigate('/focus-playlist')} variant="outline" className="flex items-center">
                <Music className="mr-2 h-4 w-4" />
                Playlist
              </Button>
              <Button onClick={() => navigate('/memory-game')} variant="outline" className="flex items-center">
                <Gamepad className="mr-2 h-4 w-4" />
                Memory Game
              </Button>
            </div>
          </AnimatedTransition>
        </div>

        <AnimatedTransition type="fade" delay={0.2}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Today's Focus</CardTitle>
                <CardDescription>Your planned activities for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Morning Routine</p>
                      <p className="text-sm text-muted-foreground">8:00 AM - 9:00 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-accent"></div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Focus Session</p>
                      <p className="text-sm text-muted-foreground">10:00 AM - 11:30 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-sensory-energy"></div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Lunch Break</p>
                      <p className="text-sm text-muted-foreground">12:00 PM - 1:00 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">View All</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Emotion Tracker</CardTitle>
                <CardDescription>How are you feeling today?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {['Calm', 'Happy', 'Focused', 'Tired', 'Overwhelmed', 'Anxious'].map((emotion) => (
                    <Button key={emotion} variant="outline" size="sm" className="h-auto py-2">
                      {emotion}
                    </Button>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">View History</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Quick Tools</CardTitle>
                <CardDescription>Access your most-used features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="h-auto py-2 justify-start" onClick={() => navigate('/focus-timer')}>
                    <Clock className="mr-2 h-4 w-4" />
                    Timer
                  </Button>
                  <Button variant="outline" size="sm" className="h-auto py-2 justify-start" onClick={() => navigate('/reminders')}>
                    <Bell className="mr-2 h-4 w-4" />
                    Reminders
                  </Button>
                  <Button variant="outline" size="sm" className="h-auto py-2 justify-start" onClick={() => navigate('/journal')}>
                    <Book className="mr-2 h-4 w-4" />
                    Journal
                  </Button>
                  <Button variant="outline" size="sm" className="h-auto py-2 justify-start" onClick={() => navigate('/focus-playlist')}>
                    <Music className="mr-2 h-4 w-4" />
                    Playlist
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/dashboard')}>Customize</Button>
              </CardFooter>
            </Card>
          </div>
        </AnimatedTransition>

        <AnimatedTransition type="fade" delay={0.3}>
          <Tabs defaultValue="daily" className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="daily">Daily Tools</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
            </TabsList>
            {featureSections.map((section, index) => (
              <TabsContent key={index} value={section.title === "Daily Tools" ? "daily" : section.title === "Support Features" ? "support" : "activities"}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.items.map((feature, featureIndex) => (
                    <FeatureCard
                      key={featureIndex}
                      title={feature.title}
                      description={feature.description}
                      icon={feature.icon}
                      color={feature.color as any}
                      className="h-full"
                      onClick={feature.onClick}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </AnimatedTransition>
      </div>
    </div>
  );
};

export default Dashboard;
