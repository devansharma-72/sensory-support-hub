
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Settings, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

interface TimerSettings {
  focus: number;
  shortBreak: number;
  longBreak: number;
  cycles: number;
}

const FocusTimer: React.FC = () => {
  const defaultSettings: TimerSettings = {
    focus: 25,
    shortBreak: 5,
    longBreak: 15,
    cycles: 4,
  };

  const [settings, setSettings] = useState<TimerSettings>(defaultSettings);
  const [timeLeft, setTimeLeft] = useState(settings.focus * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<TimerMode>('focus');
  const [currentCycle, setCurrentCycle] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { toast } = useToast();
  
  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/notification.mp3');
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    // Reset timer when mode changes
    setTimeLeft(settings[mode] * 60);
    setIsActive(false);
  }, [mode, settings]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsActive(false);
    setTimeLeft(settings[mode] * 60);
  };

  const playSound = () => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.play();
    }
  };

  const moveToNextMode = () => {
    playSound();
    
    if (mode === 'focus') {
      // After focus period
      if (currentCycle < settings.cycles) {
        toast({
          title: "Break time!",
          description: "Take a short break. You've earned it!",
        });
        setMode('shortBreak');
      } else {
        toast({
          title: "Long break time!",
          description: "Completed a full Pomodoro cycle. Take a longer break!",
        });
        setMode('longBreak');
        setCurrentCycle(1); // Reset cycle count after long break
      }
    } else {
      // After any break
      toast({
        title: "Focus time!",
        description: "Time to get back to work!",
      });
      setMode('focus');
      if (mode === 'shortBreak') {
        setCurrentCycle(prev => prev + 1);
      }
    }
  };

  useEffect(() => {
    if (isActive) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            moveToNextMode();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateProgress = (): number => {
    const totalSeconds = settings[mode] * 60;
    return ((totalSeconds - timeLeft) / totalSeconds) * 100;
  };

  const updateSettings = (setting: keyof TimerSettings, value: number) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const getModeColor = () => {
    switch (mode) {
      case 'focus': return 'from-blue-500 to-blue-600';
      case 'shortBreak': return 'from-green-500 to-green-600';
      case 'longBreak': return 'from-indigo-500 to-indigo-600';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-center space-x-2 mb-6">
        <Button 
          variant={mode === 'focus' ? 'default' : 'outline'} 
          onClick={() => !isActive && setMode('focus')}
        >
          Focus
        </Button>
        <Button 
          variant={mode === 'shortBreak' ? 'default' : 'outline'} 
          onClick={() => !isActive && setMode('shortBreak')}
        >
          Short Break
        </Button>
        <Button 
          variant={mode === 'longBreak' ? 'default' : 'outline'} 
          onClick={() => !isActive && setMode('longBreak')}
        >
          Long Break
        </Button>
      </div>

      <div className="relative w-64 h-64 mx-auto mb-6">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-200 stroke-current"
            strokeWidth="4"
            cx="50"
            cy="50"
            r="45"
            fill="transparent"
          />
          <circle
            className={`text-primary stroke-current`}
            strokeWidth="4"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="45"
            fill="transparent"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * calculateProgress()) / 100}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-semibold mb-2">{formatTime(timeLeft)}</div>
          <div className="text-sm text-muted-foreground capitalize">{mode === 'shortBreak' ? 'Short Break' : mode === 'longBreak' ? 'Long Break' : 'Focus'}</div>
          <div className="text-xs text-muted-foreground mt-1">Cycle {currentCycle}/{settings.cycles}</div>
        </div>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        <Button onClick={toggleTimer} size="icon" variant="outline" className="h-12 w-12 rounded-full">
          {isActive ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </Button>
        <Button onClick={resetTimer} size="icon" variant="outline" className="h-12 w-12 rounded-full">
          <RotateCcw className="h-5 w-5" />
        </Button>
        <Button 
          onClick={() => setSoundEnabled(!soundEnabled)} 
          size="icon" 
          variant="outline" 
          className="h-12 w-12 rounded-full"
        >
          {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
        </Button>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon" variant="outline" className="h-12 w-12 rounded-full">
              <Settings className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Timer Settings</DialogTitle>
              <DialogDescription>
                Customize your Pomodoro timer settings
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Focus Duration: {settings.focus} min</label>
                </div>
                <Slider 
                  value={[settings.focus]} 
                  min={5} 
                  max={60} 
                  step={5}
                  onValueChange={(value) => updateSettings('focus', value[0])} 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Short Break: {settings.shortBreak} min</label>
                </div>
                <Slider 
                  value={[settings.shortBreak]} 
                  min={1} 
                  max={15} 
                  step={1}
                  onValueChange={(value) => updateSettings('shortBreak', value[0])} 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Long Break: {settings.longBreak} min</label>
                </div>
                <Slider 
                  value={[settings.longBreak]} 
                  min={5} 
                  max={30} 
                  step={5}
                  onValueChange={(value) => updateSettings('longBreak', value[0])} 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Cycles before Long Break: {settings.cycles}</label>
                </div>
                <Slider 
                  value={[settings.cycles]} 
                  min={1} 
                  max={10} 
                  step={1}
                  onValueChange={(value) => updateSettings('cycles', value[0])} 
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default FocusTimer;
