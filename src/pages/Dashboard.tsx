
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Heart, 
  Users, 
  BookOpen, 
  Mic, 
  Star, 
  MessageSquare, 
  Gamepad, 
  Music,
  Bell,
  Calendar,
  Activity,
  Plus
} from 'lucide-react';
import FeatureCard from '@/components/FeatureCard';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
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
        },
        {
          title: 'Focus Timer',
          description: 'Customize work and break intervals to maintain focus',
          icon: Clock,
          color: 'sensory-focus',
        },
        {
          title: 'Journal',
          description: 'Document your thoughts, feelings, and experiences',
          icon: BookOpen,
          color: 'primary',
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
        },
        {
          title: 'Memory Games',
          description: 'Engaging activities to strengthen memory skills',
          icon: Gamepad,
          color: 'sensory-joy',
        },
        {
          title: 'Focus Playlist',
          description: 'Generate custom audio environments for concentration',
          icon: Music,
          color: 'primary',
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
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
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
                  <Button variant="outline" size="sm" className="h-auto py-2 justify-start">
                    <Clock className="mr-2 h-4 w-4" />
                    Timer
                  </Button>
                  <Button variant="outline" size="sm" className="h-auto py-2 justify-start">
                    <Heart className="mr-2 h-4 w-4" />
                    Calming
                  </Button>
                  <Button variant="outline" size="sm" className="h-auto py-2 justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule
                  </Button>
                  <Button variant="outline" size="sm" className="h-auto py-2 justify-start">
                    <Activity className="mr-2 h-4 w-4" />
                    Progress
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">Customize</Button>
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
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </AnimatedTransition>

        <AnimatedTransition type="fade" delay={0.4}>
          <div className="rounded-xl p-6 bg-primary/5 border border-primary/20">
            <h2 className="text-xl font-semibold mb-4">Recommendations for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-4">
                <Star className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Try a Memory Game</h3>
                  <p className="text-sm text-muted-foreground">Exercise your memory with our new pattern matching game.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Music className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Focus Playlist</h3>
                  <p className="text-sm text-muted-foreground">Generate a custom playlist to help you stay focused.</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedTransition>
      </div>
    </div>
  );
};

export default Dashboard;
