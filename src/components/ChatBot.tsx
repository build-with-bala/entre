
"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { chat } from '@/ai/flows/chat-flow';
import { useApp } from '@/context/AppContext';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export default function ChatBot() {
  const { currentUser } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const predefinedQueries = [
    "What is the admission process?",
    "What are the hostel facilities like?",
    "How can I book a study room?",
    "What's the Wi-Fi password?",
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);
  
  const handleSend = async (query?: string) => {
    const userMessage = query || input;
    if (!userMessage.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chat({ message: userMessage });
      setMessages(prev => [...prev, { sender: 'bot', text: result.response }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages(prev => [...prev, { sender: 'bot', text: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!currentUser) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-24 right-4 z-50"
          >
            <Card className="w-[350px] h-[500px] flex flex-col shadow-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="h-6 w-6 text-primary" />
                  <CardTitle className="text-lg font-headline">CampusBot</CardTitle>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full" ref={scrollAreaRef}>
                  <div className="p-4 space-y-4">
                    {messages.length === 0 && (
                       <div className="text-center p-4">
                        <p className="text-sm text-muted-foreground mb-4">Ask me anything, or try a suggestion!</p>
                        <div className="flex flex-col gap-2">
                           {predefinedQueries.map((q, i) => (
                              <Button key={i} variant="outline" size="sm" onClick={() => handleSend(q)}>{q}</Button>
                           ))}
                        </div>
                       </div>
                    )}
                    {messages.map((msg, index) => (
                      <div key={index} className={`flex items-start gap-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                        {msg.sender === 'bot' && <Bot className="h-5 w-5 text-primary flex-shrink-0" />}
                        <div className={`rounded-lg px-3 py-2 text-sm ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                          {msg.text}
                        </div>
                        {msg.sender === 'user' && <User className="h-5 w-5 text-muted-foreground flex-shrink-0" />}
                      </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-start gap-2">
                            <Bot className="h-5 w-5 text-primary flex-shrink-0" />
                            <div className="rounded-lg px-3 py-2 text-sm bg-muted">
                                <Loader2 className="h-4 w-4 animate-spin" />
                            </div>
                        </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="p-4">
                <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex w-full items-center space-x-2">
                  <Input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask a question..."
                    disabled={isLoading}
                  />
                  <Button type="submit" size="icon" disabled={isLoading}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        size="icon"
        className="fixed bottom-4 right-4 z-50 rounded-full w-16 h-16 shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Chatbot"
      >
        {isOpen ? <X className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
      </Button>
    </>
  );
}
