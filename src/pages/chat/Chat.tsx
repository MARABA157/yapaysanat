import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, User, Bot, RefreshCw, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { webLLMService, ChatMessage } from '@/services/webllm';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// LocalStorage anahtar adı
const CHAT_HISTORY_KEY = 'yapay-sanat-chat-history';

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // localStorage'dan mesajları yükle
  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem(CHAT_HISTORY_KEY);
      if (savedMessages) {
        // Timestamp'leri string'den Date nesnesine dönüştür
        const parsedMessages = JSON.parse(savedMessages, (key, value) => {
          if (key === 'timestamp') {
            return new Date(value);
          }
          return value;
        });
        
        if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
          setMessages(parsedMessages);
          console.log('Sohbet geçmişi localStorage\'dan yüklendi:', parsedMessages.length, 'mesaj');
          return; // Eğer localStorage'dan mesajlar yüklenmişse, karşılama mesajı ekleme
        }
      }
      
      // localStorage'da mesaj yoksa, servisi başlat
      initializeChat();
    } catch (error) {
      console.error('localStorage okuma hatası:', error);
      // Hata durumunda servisi başlat
      initializeChat();
    }
  }, []);

  // Mesajlar değiştikçe localStorage'a kaydet
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Servisi başlat
  const initializeChat = async () => {
    try {
      setIsLoading(true);
      await webLLMService.initialize((progress) => {
        console.log(`Yapay Sanat Asistanı yükleniyor: ${Math.round(progress.progress * 100)}%`);
      });
      
      setIsReady(true);
      
      // Başlangıç mesajı ekle
      const welcomeMessage: Message = {
        id: Date.now(),
        text: 'Merhaba! Ben Yapay Sanat Asistanıyım. Size sanat, eserler, sanatçılar ve galerilerle ilgili konularda yardımcı olabilirim. Nasıl yardımcı olabilirim?',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    } catch (error) {
      console.error('Chat başlatma hatası:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Sohbet geçmişini temizle
  const clearChatHistory = () => {
    localStorage.removeItem(CHAT_HISTORY_KEY);
    setMessages([]);
    // Temizlikten sonra yeni karşılama mesajı ekle
    initializeChat();
  };

  // Mesajlar eklendiğinde otomatik kaydır
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || !isReady) return;
    
    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Sohbet geçmişini servise gönder
      const chatHistory: ChatMessage[] = messages
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        }));
      
      // Yeni kullanıcı mesajını ekle
      chatHistory.push({
        role: 'user',
        content: input
      });
      
      // Yanıt al
      const response = await webLLMService.sendMessage(chatHistory);
      
      // Yanıtı ekle
      const botMessage: Message = {
        id: Date.now(),
        text: response.choices[0].message.content,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Mesaj gönderme hatası:', error);
      
      // Hata mesajı ekle
      const errorMessage: Message = {
        id: Date.now(),
        text: 'Üzgünüm, mesajınıza yanıt verirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-cover bg-center" style={{ backgroundImage: 'url(/images/chat-bg.jpg)' }}>
      <div className="flex flex-col h-full max-w-4xl mx-auto w-full p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold flex items-center">
            <MessageSquare className="mr-2" />
            Yapay Sanat Asistanı
          </h1>
          
          {/* Sohbeti temizle butonu */}
          <Button
            variant="outline"
            size="sm"
            title="Sohbet geçmişini temizle"
            onClick={clearChatHistory}
            disabled={isLoading || messages.length === 0}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Sohbeti Temizle</span>
          </Button>
        </div>

        <Card className="flex-grow mb-4 overflow-hidden">
          <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <div className="flex items-center mb-1">
                        {message.sender === 'user' ? (
                          <>
                            <span className="text-xs font-medium">Sen</span>
                            <User className="h-3 w-3 ml-1" />
                          </>
                        ) : (
                          <>
                            <Bot className="h-3 w-3 mr-1" />
                            <span className="text-xs font-medium">Yapay Sanat Asistanı</span>
                          </>
                        )}
                      </div>
                      <p className="whitespace-pre-wrap">{message.text}</p>
                      <div className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && messages.length === 0 && (
                <div className="flex justify-center items-center h-32">
                  <p className="text-muted-foreground">Yapay Sanat Asistanı hazırlanıyor...</p>
                </div>
              )}
              {!isLoading && messages.length === 0 && (
                <div className="flex justify-center items-center h-32">
                  <p className="text-muted-foreground">Bir soru sorarak sohbete başlayın...</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </Card>

        <div className="flex space-x-2">
          <Input
            placeholder="Sanat hakkında bir soru sorun..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading || !isReady}
            className="flex-grow"
          />
          <Button
            onClick={handleSend}
            disabled={isLoading || !input.trim() || !isReady}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw className="h-4 w-4" />
              </motion.div>
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
