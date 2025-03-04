import React, { createContext, useContext, useState } from 'react';

interface CreationContextType {
  // Chat/Fikir aşaması
  idea: string;
  setIdea: (idea: string) => void;
  chatResponse: string;
  setChatResponse: (response: string) => void;

  // Görsel aşaması
  imagePrompt: string;
  setImagePrompt: (prompt: string) => void;
  generatedImage: string;
  setGeneratedImage: (image: string) => void;

  // Video aşaması
  videoUrl: string;
  setVideoUrl: (url: string) => void;

  // Ses aşaması
  audioUrl: string;
  setAudioUrl: (url: string) => void;
  musicUrl: string;
  setMusicUrl: (url: string) => void;

  // Akış kontrolü
  currentStep: 'idea' | 'image' | 'video' | 'audio';
  setCurrentStep: (step: 'idea' | 'image' | 'video' | 'audio') => void;
}

const CreationContext = createContext<CreationContextType | undefined>(undefined);

export function CreationProvider({ children }: { children: React.ReactNode }) {
  // State tanımlamaları
  const [idea, setIdea] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [musicUrl, setMusicUrl] = useState('');
  const [currentStep, setCurrentStep] = useState<'idea' | 'image' | 'video' | 'audio'>('idea');

  return (
    <CreationContext.Provider
      value={{
        idea,
        setIdea,
        chatResponse,
        setChatResponse,
        imagePrompt,
        setImagePrompt,
        generatedImage,
        setGeneratedImage,
        videoUrl,
        setVideoUrl,
        audioUrl,
        setAudioUrl,
        musicUrl,
        setMusicUrl,
        currentStep,
        setCurrentStep,
      }}
    >
      {children}
    </CreationContext.Provider>
  );
}

export function useCreation() {
  const context = useContext(CreationContext);
  if (context === undefined) {
    throw new Error('useCreation must be used within a CreationProvider');
  }
  return context;
}
