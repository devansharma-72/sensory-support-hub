
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Book, Edit, Calendar, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

const JournalPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <AnimatedTransition type="fade">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Journal</h1>
            <p className="text-muted-foreground mt-2">
              Document your thoughts, feelings, and experiences
            </p>
          </div>
        </AnimatedTransition>
        
        <div className="max-w-4xl mx-auto">
          <AnimatedTransition type="fade" delay={0.1}>
            <Tabs defaultValue="new" className="mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="new">
                  <Edit className="mr-2 h-4 w-4" />
                  New Entry
                </TabsTrigger>
                <TabsTrigger value="recent">
                  <Calendar className="mr-2 h-4 w-4" />
                  Recent
                </TabsTrigger>
                <TabsTrigger value="templates">
                  <List className="mr-2 h-4 w-4" />
                  Templates
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="new" className="mt-4">
                <Card className="dark-card shadow-sm">
                  <CardContent className="pt-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-medium">New Journal Entry</h3>
                      <span className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="mb-4">
                      <input 
                        type="text" 
                        placeholder="Entry Title" 
                        className="w-full p-2 rounded-md border border-input bg-transparent"
                      />
                    </div>
                    <div className="mb-4">
                      <Textarea 
                        placeholder="Start writing your thoughts..." 
                        className="min-h-[300px]"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Save Draft</Button>
                      <Button>Save Entry</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="recent" className="mt-4">
                <div className="grid gap-4">
                  {[1, 2, 3].map((index) => (
                    <Card key={index} className="dark-card hover:bg-accent/10 transition-colors cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">Morning Reflection {index}</h3>
                          <span className="text-xs text-muted-foreground">
                            {new Date(2023, 5, 20 - index).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          Today I felt a sense of accomplishment after completing my morning routine efficiently...
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="templates" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["Daily Reflection", "Emotion Check-in", "Goal Setting", "Gratitude List"].map((template) => (
                    <Card key={template} className="dark-card hover:bg-accent/10 transition-colors cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center mb-2">
                          <Book className="h-4 w-4 mr-2 text-primary" />
                          <h3 className="font-medium">{template}</h3>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Use this template to structure your {template.toLowerCase()} journal entry.
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </AnimatedTransition>
        </div>
      </div>
    </div>
  );
};

export default JournalPage;
