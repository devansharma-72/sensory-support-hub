import React, { useState, useRef, useEffect } from 'react';
import { Mic, Video, StopCircle, Save, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import AnimatedTransition from '@/components/AnimatedTransition';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import FormData from 'form-data';

interface Scenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface AnalysisResult {
  eyeContact: number;
  transcript: string;
  feedback: string;
}

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: Event) => void;
  start: () => void;
  stop: () => void;
}

const ScenarioTalks: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<BlobPart[]>([]);
  const [feedback, setFeedback] = useState<AnalysisResult | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const scenarios: Scenario[] = [
    {
      id: 'sc1',
      title: 'Introducing Yourself',
      description: 'Practice introducing yourself in a new social setting.',
      difficulty: 'easy',
    },
    {
      id: 'sc2',
      title: 'Ordering at a Restaurant',
      description: 'Practice ordering food at a restaurant.',
      difficulty: 'easy',
    },
    {
      id: 'sc3',
      title: 'Job Interview',
      description: 'Respond to common interview questions.',
      difficulty: 'medium',
    },
    {
      id: 'sc4',
      title: 'Making Plans with a Friend',
      description: 'Practice suggesting activities and coordinating times.',
      difficulty: 'medium',
    },
    {
      id: 'sc5',
      title: 'Handling a Disagreement',
      description: 'Practice expressing your perspective calmly.',
      difficulty: 'hard',
    },
    {
      id: 'sc6',
      title: 'Asking for Help',
      description: 'Practice asking for clarification or assistance.',
      difficulty: 'medium',
    },
  ];

  useEffect(() => {
    const setupSpeechRecognition = () => {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        toast({
          title: "Browser Not Supported",
          description: "Please use Chrome or Edge for speech recognition.",
          variant: "destructive",
        });
        return;
      }
  
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
  
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + ' ';
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        
        // Replace the transcript with the complete text rather than appending multiple times
        setTranscript(finalTranscript + interimTranscript);
      };
      
  
      recognition.onerror = (event: Event) => {
        console.error('Speech recognition error:', event);
        toast({
          title: "Recognition Error",
          description: "An error occurred during speech recognition.",
          variant: "destructive",
        });
      };
  
      recognitionRef.current = recognition;
    };
  
    setupSpeechRecognition();
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;

      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      const chunks: BlobPart[] = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        setRecordedVideo(URL.createObjectURL(blob));
        setRecordedChunks(chunks);
      };

      recorder.start();
      setIsRecording(true);
      recognitionRef.current?.start();
      toast({ title: "Recording Started", description: "You are now being recorded." });
    } catch (err) {
      console.error("Media device error:", err);
      toast({
        title: "Permission Required",
        description: "Please allow camera/microphone access.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      recognitionRef.current?.stop();
      setIsRecording(false);
      streamRef.current?.getTracks().forEach((track) => track.stop());
      toast({ title: "Recording Stopped", description: "Ready for analysis." });
    }
  };

  const saveRecording = () => {
    if (recordedChunks.length === 0) {
      toast({
        title: "No Recording Found",
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
      title: "Recording Saved",
      description: "Your response has been saved to your device.",
    });
  };

  const selectScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setRecordedVideo(null);
    setFeedback(null);
    setRecordedChunks([]);
    setTranscript('');

    if (isRecording) {
      stopRecording();
    }

    toast({
      title: "Scenario Selected",
      description: scenario.title,
    });
  };

  const analyzeRecording = async () => {
    if (!recordedChunks.length || !transcript) return;
  
    setIsLoading(true);
    try {
      const formData = new FormData();
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      formData.append('video', blob, 'recording.webm');
      formData.append('transcript', transcript);
  
      const response = await axios.post(
        'http://localhost:5000/api/analyze-video', // Ensure this matches your backend URL
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
  
      setFeedback(response.data);
      toast({ title: "Analysis Complete", description: "Feedback generated!" });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "Could not process feedback",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <AnimatedTransition type="fade">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-primary">Scenario Talks</h1>
            <p className="text-muted-foreground">Practice social scenarios with real-time feedback.</p>
          </div>
        </AnimatedTransition>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Scenario Selection Panel */}
          <AnimatedTransition type="fade" delay={0.1}>
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Choose Scenario</CardTitle>
                  <CardDescription>Select a practice scenario</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="easy">
                    <TabsList className="grid grid-cols-3">
                      <TabsTrigger value="easy">Easy</TabsTrigger>
                      <TabsTrigger value="medium">Medium</TabsTrigger>
                      <TabsTrigger value="hard">Hard</TabsTrigger>
                    </TabsList>
                    {['easy', 'medium', 'hard'].map((difficulty) => (
                      <TabsContent key={difficulty} value={difficulty} className="mt-4">
                        <div className="space-y-2">
                          {scenarios
                            .filter((s) => s.difficulty === difficulty)
                            .map((scenario) => (
                              <div
                                key={scenario.id}
                                className={`p-3 rounded-lg cursor-pointer ${
                                  selectedScenario?.id === scenario.id
                                    ? 'bg-primary text-white'
                                    : 'bg-secondary hover:bg-primary/10'
                                }`}
                                onClick={() => selectScenario(scenario)}
                              >
                                <h3 className="font-medium">{scenario.title}</h3>
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

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              {selectedScenario ? (
                <>
                  <CardHeader>
                    <CardTitle>{selectedScenario.title}</CardTitle>
                    <CardDescription>{selectedScenario.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="relative aspect-video bg-black rounded-lg">
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

                    <div className="flex gap-2">
                      {!isRecording && !recordedVideo && (
                        <Button onClick={startRecording} size="lg" className="flex-1">
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
                            onClick={analyzeRecording}
                            variant="secondary"
                            className="flex-1"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Analyzing...
                              </>
                            ) : (
                              "Get Feedback"
                            )}
                          </Button>
                          <Button
                            onClick={saveRecording}
                            variant="outline"
                            className="flex-1"
                          >
                            <Save className="mr-2 h-4 w-4" />
                            Save
                          </Button>
                        </>
                      )}
                    </div>

                    {feedback && (
                      <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <Card>
                            <CardHeader>
                              <CardTitle>Eye Contact</CardTitle>
                              <CardDescription>Percentage during recording</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold">
                                {feedback.eyeContact}%
                              </div>
                              <Progress value={feedback.eyeContact} className="mt-2 h-2" />
                            </CardContent>
                          </Card>
                          <Card>
                            <CardHeader>
                              <CardTitle>Transcript</CardTitle>
                              <CardDescription>Recognized speech</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm">{feedback.transcript}</p>
                            </CardContent>
                          </Card>
                        </div>
                        <Card>
                          <CardHeader>
                            <CardTitle>Feedback</CardTitle>
                            <CardDescription>AI analysis results</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="whitespace-pre-wrap">{feedback.feedback}</p>
                          </CardContent>
                        </Card>
                        <Textarea
                          placeholder="Add your personal notes..."
                          rows={3}
                        />
                      </div>
                    )}
                  </CardContent>
                </>
              ) : (
                <div className="flex items-center justify-center h-full p-8">
                  <div className="text-center">
                    <Video className="mx-auto h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold">Select a Scenario</h3>
                    <p className="text-muted-foreground mt-2">
                      Choose from the left panel to begin practicing.
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioTalks;