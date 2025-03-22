
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Gamepad, Clock, Award, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const MemoryGamePage: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  
  return (
    <div className="bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <AnimatedTransition type="fade">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Memory Games</h1>
            <p className="text-muted-foreground mt-2">
              Engaging activities to strengthen memory skills
            </p>
          </div>
        </AnimatedTransition>
        
        <div className="max-w-4xl mx-auto">
          {!gameStarted ? (
            <AnimatedTransition type="fade" delay={0.1}>
              <div className="text-center mb-8">
                <Button size="lg" onClick={() => setGameStarted(true)}>
                  <Gamepad className="mr-2 h-5 w-5" />
                  Start New Game
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="dark-card">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <Gamepad className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Pattern Matching</h3>
                    <p className="text-sm text-muted-foreground">Match pairs of cards to test your visual memory</p>
                  </CardContent>
                </Card>
                
                <Card className="dark-card">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Sequence Recall</h3>
                    <p className="text-sm text-muted-foreground">Remember and repeat increasingly complex sequences</p>
                  </CardContent>
                </Card>
                
                <Card className="dark-card">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Word Association</h3>
                    <p className="text-sm text-muted-foreground">Remember associated word pairs to improve verbal memory</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="dark-card mb-8">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Your Progress</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-primary/10 rounded-lg p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Games Played</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Best Score</p>
                      <p className="text-2xl font-bold">89%</p>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Avg. Time</p>
                      <p className="text-2xl font-bold">2:34</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedTransition>
          ) : (
            <AnimatedTransition type="fade" delay={0.1}>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  <span className="font-mono">00:45</span>
                </div>
                <div>
                  <span className="font-medium">Score: </span>
                  <span className="font-mono">120</span>
                </div>
                <Button variant="outline" size="sm" onClick={() => setGameStarted(false)}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
              
              <div className="grid grid-cols-4 gap-4 mb-8">
                {Array.from({ length: 16 }, (_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="aspect-square bg-primary/5 dark:bg-slate-800/50 rounded-lg flex items-center justify-center cursor-pointer border-2 border-transparent hover:border-primary transition-colors"
                  >
                    {i % 8 === 0 && <Gamepad className="h-8 w-8 text-primary opacity-75" />}
                  </motion.div>
                ))}
              </div>
            </AnimatedTransition>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemoryGamePage;
