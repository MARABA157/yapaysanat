import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    // Kullanıcı mesajını ekle
    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Bot yanıtını simüle et
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: 'Bu bir örnek bot yanıtıdır. Gerçek AI entegrasyonu yakında eklenecek!',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen" style={{
      backgroundImage: "url('https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed"
    }}>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-8">
            <MessageSquare className="w-8 h-8 text-purple-500" />
            <h1 className="text-3xl font-bold text-white">AI Chat Asistanı</h1>
          </div>

          <Card className="bg-black/50 backdrop-blur-sm border-purple-500/20">
            <ScrollArea className="h-[500px] p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-3 ${
                      message.sender === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div className={`p-2 rounded-full ${
                      message.sender === 'user' ? 'bg-purple-500' : 'bg-blue-500'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-5 h-5" />
                      ) : (
                        <Bot className="w-5 h-5" />
                      )}
                    </div>
                    <div className={`flex-1 p-4 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-purple-500/20 ml-12' 
                        : 'bg-blue-500/20 mr-12'
                    }`}>
                      <p className="text-sm text-white">{message.text}</p>
                      <span className="text-xs text-gray-400 mt-1 block">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t border-white/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Mesajınızı yazın..."
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <Button 
                  type="submit" 
                  disabled={!input.trim()}
                  className="bg-purple-500 hover:bg-purple-600"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Gönder
                </Button>
              </form>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
