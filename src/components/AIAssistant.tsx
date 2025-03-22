
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Mic, MicOff, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
    { role: 'assistant', content: 'Hello! I\'m your assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Simulated responses - in a real app, these would be API calls
  const getAssistantResponse = (userInput: string) => {
    const responses = [
      "I understand that can be challenging. Would you like some strategies to help?",
      "That's a good question. Based on common practices, you might want to consider...",
      "I hear you. Many people with sensory sensitivities find that...",
      "Let me help you with that. Have you tried...",
      "Great job on recognizing that pattern. Would you like to explore this further?",
    ];
    
    // Simulate response selection based on input
    if (userInput.toLowerCase().includes('anxious') || userInput.toLowerCase().includes('anxiety')) {
      return "Feeling anxious is common. Try taking deep breaths - inhale for 4 counts, hold for 4, exhale for 6. Would you like more calming techniques?";
    } else if (userInput.toLowerCase().includes('overwhelm')) {
      return "When you're feeling overwhelmed, try the 5-4-3-2-1 grounding technique: acknowledge 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.";
    } else {
      // Random response for other inputs
      return responses[Math.floor(Math.random() * responses.length)];
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    
    // Clear input field
    setInput('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const response = getAssistantResponse(input);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      
      // Scroll to bottom
      scrollToBottom();
    }, 1000);
  };

  const toggleListening = () => {
    if (!isListening) {
      // This would be implemented with a real speech recognition API
      setIsListening(true);
      // Simulate speech recognition
      setTimeout(() => {
        setInput("I'm feeling a bit overwhelmed today");
        setIsListening(false);
      }, 2000);
    } else {
      setIsListening(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating button to open assistant */}
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
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1"
                />
                <Button type="submit" size="icon" className="flex-shrink-0">
                  <Send className="h-4 w-4" />
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
