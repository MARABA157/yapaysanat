import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChatInterface } from '../../features/Chat/components/ChatInterface';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async (message: string, image?: File) => {
    try {
      // Kullanıcı mesajını ekle
      const userMessage: Message = {
        id: Date.now().toString(),
        text: message,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);

      // AI yanıtını simüle et
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Şu anda AI servisi bakımda. Lütfen daha sonra tekrar deneyin.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      
    } catch (error) {
      console.error('Error in chat:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>AI Chat - Sanat Galerisi</title>
        <meta name="description" content="Yapay zeka ile sohbet edin" />
      </Helmet>

      <div 
        className="min-h-screen bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=100&w=3840&h=2160")',
        }}
      >
        <div className="min-h-screen bg-black/30 backdrop-blur-[2px]">
          <main className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-bold text-white mb-4">
                AI ile Sanat Sohbeti
              </h1>
              <p className="text-white/90 text-lg">
                Yapay zeka ile sanat hakkında sohbet edin ve yeni fikirler keşfedin
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-black/40 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/10 text-white"
            >
              <ChatInterface
                mode="general"
                messages={messages}
                suggestions={[
                  "Sanat hakkında konuşalım",
                  "En sevdiğin sanat eseri nedir?",
                  "Bana resim yapmayı öğret"
                ]}
                onSendMessage={handleSendMessage}
              />
            </motion.div>
          </main>
        </div>
      </div>
    </>
  );
}
