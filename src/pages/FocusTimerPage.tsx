
import React from 'react';
import { motion } from 'framer-motion';
import FocusTimer from '@/components/FocusTimer';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Clock, Brain, Lightbulb } from 'lucide-react';

const FocusTimerPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <AnimatedTransition type="fade">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Focus Timer</h1>
            <p className="text-muted-foreground mt-2">
              Use the Pomodoro technique to improve focus and productivity
            </p>
          </div>
        </AnimatedTransition>
        
        <div className="max-w-3xl mx-auto">
          <AnimatedTransition type="fade" delay={0.1}>
            <div className="dark-card shadow-sm rounded-lg p-6 mb-8">
              <FocusTimer />
            </div>
          </AnimatedTransition>
          
          <AnimatedTransition type="fade" delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="dark-card p-5 rounded-lg shadow-sm">
                <div className="flex items-center mb-3">
                  <Clock className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-medium">Time Management</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Breaking work into focused intervals helps manage attention and prevents burnout.
                </p>
              </div>
              
              <div className="dark-card p-5 rounded-lg shadow-sm">
                <div className="flex items-center mb-3">
                  <Brain className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-medium">Cognitive Benefits</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Regular breaks help maintain consistent focus and reduce mental fatigue.
                </p>
              </div>
              
              <div className="dark-card p-5 rounded-lg shadow-sm">
                <div className="flex items-center mb-3">
                  <Lightbulb className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-medium">Customization</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Adjust focus periods and breaks to match your personal attention patterns.
                </p>
              </div>
            </div>
          </AnimatedTransition>
        </div>
      </div>
    </div>
  );
};

export default FocusTimerPage;
