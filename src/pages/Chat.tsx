import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send } from 'lucide-react';

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    setMessages(prev => [...prev, { text: message, isUser: true }]);
    setMessage('');
    
    // API çağrısı burada yapılacak
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Şu anda yapım aşamasındayım. Yakında size yardımcı olabileceğim! 🎨", 
        isUser: false 
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
            <Card className={`p-3 max-w-[80%] ${
              msg.isUser 
                ? 'bg-blue-500 text-white' 
                : 'bg-white'
            }`}>
              {msg.text}
            </Card>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Mesajınızı yazın..."
            className="flex-1"
          />
          <Button onClick={handleSend}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
