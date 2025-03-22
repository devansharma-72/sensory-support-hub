
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Music, Play, Pause, SkipForward, SkipBack, Volume2, List, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

const FocusPlaylistPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <AnimatedTransition type="fade">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Focus Playlist</h1>
            <p className="text-muted-foreground mt-2">
              Generate custom audio environments for optimal concentration
            </p>
          </div>
        </AnimatedTransition>
        
        <div className="max-w-4xl mx-auto">
          <AnimatedTransition type="fade" delay={0.1}>
            <Card className="dark-card shadow-sm mb-8">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/3">
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-primary/10 mb-3 flex items-center justify-center">
                      <Music className="h-16 w-16 text-primary opacity-50" />
                      <Badge className="absolute top-3 right-3 bg-primary">Playing</Badge>
                    </div>
                    <h3 className="text-lg font-medium">Deep Focus Mix</h3>
                    <p className="text-sm text-muted-foreground">Ambient, Natural Sounds</p>
                  </div>
                  
                  <div className="w-full md:w-2/3 flex flex-col justify-between">
                    <div className="mb-6">
                      <div className="mb-8">
                        <Slider defaultValue={[65]} max={100} step={1} className="w-full" />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>1:23</span>
                          <span>4:56</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-center items-center gap-4">
                        <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                          <SkipBack className="h-4 w-4" />
                        </Button>
                        <Button size="icon" className="rounded-full h-14 w-14 bg-primary hover:bg-primary/90">
                          <Pause className="h-6 w-6" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                          <SkipForward className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Volume2 className="h-4 w-4 text-muted-foreground" />
                      <Slider defaultValue={[80]} max={100} step={1} className="w-full max-w-[120px]" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedTransition>
          
          <AnimatedTransition type="fade" delay={0.2}>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Playlists</h2>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Create New
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {["Deep Work", "Nature Sounds", "Lo-Fi Beats", "White Noise", "Ocean Waves", "Rainfall"].map((playlist, index) => (
                <Card key={index} className="dark-card hover:bg-accent/10 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Music className="h-4 w-4 mr-2 text-primary" />
                        <h3 className="font-medium">{playlist}</h3>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {index % 2 === 0 ? "30 minutes" : "45 minutes"} • Last played 2 days ago
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </AnimatedTransition>
          
          <AnimatedTransition type="fade" delay={0.3}>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Recommended for You</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {["Productivity Boost", "Calm Focus", "Study Music", "Morning Energy"].map((playlist, index) => (
                <Card key={index} className="dark-card hover:bg-accent/10 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Music className="h-4 w-4 mr-2 text-primary" />
                        <h3 className="font-medium">{playlist}</h3>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {30 + index * 10} minutes • Recommended based on your preferences
                    </p>
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

export default FocusPlaylistPage;
