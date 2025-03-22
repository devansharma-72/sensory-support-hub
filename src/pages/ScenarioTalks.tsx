
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, Video, StopCircle, PlayCircle, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import AnimatedTransition from '@/components/AnimatedTransition';
import { toast } from '@/components/ui/use-toast';

interface Scenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const ScenarioTalks: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<BlobPart[]>([]);
  const [feedback, setFeedback] = useState('');
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const scenarios: Scenario[] = [
    {
      id: 'sc1',
      title: 'Introducing Yourself',
      description: 'Practice introducing yourself in a new social setting. Include your name, one thing you enjoy doing, and ask a question to the other person.',
      difficulty: 'easy',
    },
    {
      id: 'sc2',
      title: 'Ordering at a Restaurant',
      description: 'Practice ordering food at a restaurant, including asking about menu items and making specific requests.',
      difficulty: 'easy',
    },
    {
      id: 'sc3',
      title: 'Job Interview',
      description: 'Respond to the question: "Tell me about a challenge you faced and how you overcame it."',
      difficulty: 'medium',
    },
    {
      id: 'sc4',
      title: 'Making Plans with a Friend',
      description: 'Practice suggesting an activity and coordinating a time to meet with a friend.',
      difficulty: 'medium',
    },
    {
      id: 'sc5',
      title: 'Handling a Disagreement',
      description: 'Practice expressing your perspective calmly during a disagreement, and finding a compromise.',
      difficulty: 'hard',
    },
    {
      id: 'sc6',
      title: 'Asking for Help',
      description: 'Practice asking for clarification or assistance in a work or school setting.',
      difficulty: 'medium',
    },
  ];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      
      const chunks: BlobPart[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };
      
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const videoURL = URL.createObjectURL(blob);
        setRecordedVideo(videoURL);
        setRecordedChunks(chunks);
        
        if (videoRef.current) {
          videoRef.current.srcObject = null;
          videoRef.current.src = videoURL;
          videoRef.current.play();
        }
      };
      
      recorder.start();
      setIsRecording(true);
      toast({
        title: "Recording started",
        description: "You are now recording your response to the scenario.",
      });
    } catch (err) {
      console.error("Error accessing media devices: ", err);
      toast({
        title: "Permission Error",
        description: "Please allow camera and microphone access to use this feature.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      
      // Stop all tracks of the stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      toast({
        title: "Recording stopped",
        description: "Your response has been recorded. You can now play it back or save it.",
      });
    }
  };

  const saveRecording = () => {
    if (recordedChunks.length === 0) {
      toast({
        title: "No recording to save",
        description: "Please record a response first.",
        variant: "destructive",
      });
      return;
    }
    
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scenario-talk-${Date.now()}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Recording saved",
      description: "Your response has been saved to your device.",
    });
  };

  const generateFeedback = () => {
    // This would connect to an API in a real application
    const feedbackOptions = [
      "Great job maintaining eye contact throughout your response!",
      "Your pace was good, but try to speak a bit slower in some sections.",
      "You expressed your thoughts clearly. Consider adding specific examples next time.",
      "Your body language was open and engaging.",
      "You showed good emotional awareness in handling this scenario.",
      "Try to reduce filler words like 'um' and 'uh' for more confident delivery.",
      "Your response was well-structured with a clear beginning, middle, and end."
    ];
    
    const randomFeedback = feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)];
    setFeedback(randomFeedback);
    
    toast({
      title: "Feedback generated",
      description: "Review your feedback below.",
    });
  };

  const selectScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setRecordedVideo(null);
    setFeedback('');
    setRecordedChunks([]);
    
    if (isRecording) {
      stopRecording();
    }
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <AnimatedTransition type="fade">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-blue-900">Scenario Talks</h1>
            <p className="text-muted-foreground">Practice your responses to various social scenarios and receive feedback.</p>
          </div>
        </AnimatedTransition>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AnimatedTransition type="fade" delay={0.1}>
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Choose a Scenario</CardTitle>
                  <CardDescription>Select a scenario to practice your response</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="easy">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="easy">Easy</TabsTrigger>
                      <TabsTrigger value="medium">Medium</TabsTrigger>
                      <TabsTrigger value="hard">Hard</TabsTrigger>
                    </TabsList>
                    {['easy', 'medium', 'hard'].map((difficulty) => (
                      <TabsContent key={difficulty} value={difficulty} className="mt-4">
                        <div className="space-y-2">
                          {scenarios
                            .filter((scenario) => scenario.difficulty === difficulty)
                            .map((scenario) => (
                              <div
                                key={scenario.id}
                                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                                  selectedScenario?.id === scenario.id
                                    ? 'bg-primary text-white'
                                    : 'bg-secondary hover:bg-primary/10'
                                }`}
                                onClick={() => selectScenario(scenario)}
                              >
                                <h3 className={`font-medium ${selectedScenario?.id === scenario.id ? 'text-white' : 'text-primary'}`}>
                                  {scenario.title}
                                </h3>
                              </div>
                            ))}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </AnimatedTransition>

          <AnimatedTransition type="fade" delay={0.2}>
            <div className="lg:col-span-2">
              <Card className="h-full flex flex-col">
                {selectedScenario ? (
                  <>
                    <CardHeader>
                      <CardTitle>{selectedScenario.title}</CardTitle>
                      <CardDescription>{selectedScenario.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="flex flex-col space-y-4">
                        <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                          <video
                            ref={videoRef}
                            className="w-full h-full"
                            autoPlay
                            muted={isRecording}
                            playsInline
                          />
                          {!recordedVideo && !isRecording && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Video className="h-16 w-16 text-white/40" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {!isRecording && !recordedVideo && (
                            <Button 
                              onClick={startRecording} 
                              className="flex-1"
                              size="lg"
                            >
                              <Mic className="mr-2 h-5 w-5" />
                              Start Recording
                            </Button>
                          )}
                          {isRecording && (
                            <Button 
                              onClick={stopRecording} 
                              variant="destructive"
                              className="flex-1"
                              size="lg"
                            >
                              <StopCircle className="mr-2 h-5 w-5" />
                              Stop Recording
                            </Button>
                          )}
                          {recordedVideo && (
                            <>
                              <Button 
                                onClick={saveRecording} 
                                variant="outline"
                                className="flex-1"
                              >
                                <Save className="mr-2 h-4 w-4" />
                                Save Recording
                              </Button>
                              <Button 
                                onClick={generateFeedback} 
                                variant="secondary"
                                className="flex-1"
                              >
                                Get Feedback
                              </Button>
                            </>
                          )}
                        </div>
                        {feedback && (
                          <div className="mt-4">
                            <h3 className="font-medium text-lg text-blue-800 mb-2">Feedback</h3>
                            <Card className="bg-blue-50">
                              <CardContent className="pt-4">
                                <p>{feedback}</p>
                              </CardContent>
                            </Card>
                            <Textarea 
                              className="mt-4"
                              placeholder="Add your own notes about this practice session..."
                              rows={3}
                            />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full p-8">
                    <div className="text-center">
                      <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
                        <Video className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-medium mb-2">Select a Scenario</h3>
                      <p className="text-muted-foreground">
                        Choose a scenario from the list to begin practicing
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </AnimatedTransition>
        </div>
      </div>
    </div>
  );
};

export default ScenarioTalks;
