import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Mic, MicOff, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

// Type declarations
declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

const AIAssistant: React.FC = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'assistant', 
      content: 'Hello! I\'m your assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false); // Add this state
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognition = useRef<any>(null);
  const synthesis = useRef<SpeechSynthesis | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognition.current.onerror = (event: any) => {
        setIsListening(false);
        toast({
          variant: "destructive",
          title: "Speech Recognition Error",
          description: event.error
        });
      };

      recognition.current.onspeechend = () => {
        setIsListening(false);
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }

    synthesis.current = window.speechSynthesis;
  }, [toast]);

  // Stop speech function
  const stopSpeech = () => {
    if (synthesis.current) {
      synthesis.current.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    try {
      setIsProcessing(true);
      const userMessage: ChatMessage = { 
        role: 'user', 
        content: input,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      setInput('');

      // API call to backend
      const response = await fetch('http://localhost:5000/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 'current-user',
          message: input
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      const assistantMessage: ChatMessage = { 
        role: 'assistant', 
        content: data.response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      
      // Text-to-speech
      if (synthesis.current) {
        const utterance = new SpeechSynthesisUtterance(data.response);
        utterance.rate = 0.9; // Slightly slower
        utterance.pitch = 1.1; // Slightly higher pitch

        // Handle speech start and end events
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        synthesis.current.speak(utterance);
      }

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Communication Error",
        description: error instanceof Error ? error.message : "Failed to get assistant response"
      });
    } finally {
      setIsProcessing(false);
      scrollToBottom();
    }
  };

  const toggleListening = () => {
    if (recognition.current) {
      if (!isListening) {
        recognition.current.start();
        setIsListening(true);
      } else {
        // Add a small delay before stopping
        setTimeout(() => {
          recognition.current.stop();
          setIsListening(false);
        }, 500); // 500ms delay
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating button */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg"
          size="icon"
        >
          <Bot className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Assistant dialog */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={isOpen ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed bottom-24 right-6 w-[90%] sm:w-[400px] max-h-[70vh] z-50 rounded-xl overflow-hidden shadow-xl",
          !isOpen && "pointer-events-none"
        )}
      >
        {isOpen && (
          <Card className="flex flex-col h-[600px] max-h-[70vh]">
            <CardHeader className="py-3 border-b flex flex-row justify-between items-center space-y-0">
              <div className="flex items-center">
                <Bot className="h-5 w-5 text-primary mr-2" />
                <h3 className="font-medium">AI Assistant</h3>
              </div>
              <Button 
                onClick={() => setIsOpen(false)} 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex",
                      msg.role === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-4 py-2",
                        msg.role === 'user'
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            <CardFooter className="p-3 border-t">
              <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={toggleListening}
                  className={cn(
                    "flex-shrink-0",
                    isListening && "text-red-500"
                  )}
                >
                  {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
                {/* Add the stop speech button here */}
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={stopSpeech}
                  disabled={!isSpeaking}
                  className="flex-shrink-0"
                >
                  <X className="h-5 w-5" /> {/* Use a stop icon if available */}
                </Button>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  className="flex-shrink-0"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
            </CardFooter>
          </Card>
        )}
      </motion.div>
    </>
  );
};

export default AIAssistant;