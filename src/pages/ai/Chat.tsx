import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChatInterface } from '../../features/Chat/components/ChatInterface';
import { OpenSourceAI } from '../../services/ai/OpenSourceAI';

export default function Chat() {
  useEffect(() => {
    // Sayfa yüklendiğinde yapılacak işlemler
  }, []);

  const handleSendMessage = async (message: string, image?: File) => {
    try {
      const ai = OpenSourceAI.getInstance();
      const response = await ai.chat(message);
      // Yanıtı işle
      console.log(response);
    } catch (error) {
      console.error('Error in AI chat:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>AI Chat - Sanat Galerisi</title>
        <meta name="description" content="Yapay zeka ile sohbet edin" />
      </Helmet>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">AI Chat</h1>
        <ChatInterface
          mode="general"
          suggestions={[
            "Sanat hakkında konuşalım",
            "En sevdiğin sanat eseri nedir?",
            "Bana resim yapmayı öğret"
          ]}
          onSendMessage={handleSendMessage}
        />
      </main>
    </>
  );
}
