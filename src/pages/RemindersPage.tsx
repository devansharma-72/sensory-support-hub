
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Bell, Plus, Calendar, Clock, Check, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const RemindersPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <AnimatedTransition type="fade">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Reminders</h1>
              <p className="text-muted-foreground mt-2">
                Set notifications for important tasks and events
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Reminder
            </Button>
          </div>
        </AnimatedTransition>
        
        <div className="max-w-4xl mx-auto">
          <AnimatedTransition type="fade" delay={0.1}>
            <Tabs defaultValue="today" className="mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              
              <TabsContent value="today" className="mt-4">
                <Card className="dark-card mb-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Today's Reminders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { time: '10:00 AM', title: 'Team Meeting', priority: 'high' },
                        { time: '12:30 PM', title: 'Lunch Break', priority: 'medium' },
                        { time: '3:00 PM', title: 'Therapy Session', priority: 'high' },
                        { time: '5:00 PM', title: 'Take Medication', priority: 'high' },
                      ].map((reminder, index) => (
                        <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                          <div className="flex items-center">
                            <div className="mr-3">
                              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                                <Check className="h-4 w-4" />
                              </Button>
                            </div>
                            <div>
                              <h3 className="font-medium">{reminder.title}</h3>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{reminder.time}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={reminder.priority === 'high' ? 'destructive' : 'outline'}>
                              {reminder.priority}
                            </Badge>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="upcoming" className="mt-4">
                <Card className="dark-card mb-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Tomorrow</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { time: '9:00 AM', title: 'Doctor Appointment', priority: 'high' },
                        { time: '2:00 PM', title: 'Study Session', priority: 'medium' },
                      ].map((reminder, index) => (
                        <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                          <div className="flex items-center">
                            <div className="mr-3">
                              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                                <Check className="h-4 w-4" />
                              </Button>
                            </div>
                            <div>
                              <h3 className="font-medium">{reminder.title}</h3>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{reminder.time}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={reminder.priority === 'high' ? 'destructive' : 'outline'}>
                              {reminder.priority}
                            </Badge>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="dark-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">This Week</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { day: 'Wednesday', time: '11:00 AM', title: 'Weekly Check-in', priority: 'medium' },
                        { day: 'Friday', time: '3:30 PM', title: 'Group Activity', priority: 'medium' },
                      ].map((reminder, index) => (
                        <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                          <div className="flex items-center">
                            <div className="mr-3">
                              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                                <Check className="h-4 w-4" />
                              </Button>
                            </div>
                            <div>
                              <h3 className="font-medium">{reminder.title}</h3>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>{reminder.day}, {reminder.time}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">
                              {reminder.priority}
                            </Badge>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="completed" className="mt-4">
                <Card className="dark-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Recently Completed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { day: 'Today', time: '8:00 AM', title: 'Morning Medication' },
                        { day: 'Yesterday', time: '9:30 AM', title: 'Therapy Session' },
                        { day: 'Yesterday', time: '4:00 PM', title: 'Exercise Routine' },
                      ].map((reminder, index) => (
                        <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                          <div className="flex items-center">
                            <div className="mr-3">
                              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                <Check className="h-4 w-4 text-primary" />
                              </div>
                            </div>
                            <div>
                              <h3 className="font-medium line-through opacity-70">{reminder.title}</h3>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>{reminder.day}, {reminder.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </AnimatedTransition>
          
          <AnimatedTransition type="fade" delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="dark-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Reminder Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      { name: 'Medication', count: 3, color: 'bg-red-500' },
                      { name: 'Appointments', count: 2, color: 'bg-blue-500' },
                      { name: 'Self-care', count: 4, color: 'bg-green-500' },
                      { name: 'Social', count: 1, color: 'bg-yellow-500' },
                    ].map((category, index) => (
                      <div key={index} className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-accent/10 transition-colors cursor-pointer">
                        <div className="flex items-center">
                          <div className={`h-3 w-3 rounded-full ${category.color} mr-3`}></div>
                          <span>{category.name}</span>
                        </div>
                        <Badge variant="outline">{category.count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="dark-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Notification Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: 'Push Notifications', enabled: true },
                      { name: 'Email Reminders', enabled: false },
                      { name: 'Advanced Notice', enabled: true },
                      { name: 'Sound Alerts', enabled: true },
                    ].map((setting, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <span>{setting.name}</span>
                        <Button variant={setting.enabled ? "default" : "outline"} size="sm">
                          {setting.enabled ? "Enabled" : "Disabled"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </AnimatedTransition>
        </div>
      </div>
    </div>
  );
};

export default RemindersPage;
