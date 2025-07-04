import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface ChapterLoaderProps {
  chapter: string;
  onComplete: () => void;
}

const ChapterLoader: React.FC<ChapterLoaderProps> = ({ chapter, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Loading love');

  const loadingMessages = [
    'Loading love 💖',
    'Preparing surprises ✨',
    'Gathering memories 📸',
    'Sprinkling magic 🌟',
    'Almost ready 💕'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const textInterval = setInterval(() => {
      setLoadingText(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-100 via-purple-50 to-cream-100">
      <div className="text-center max-w-md w-full">
        <div className="mb-8">
          <Heart className="w-16 h-16 text-pink-400 mx-auto mb-4 animate-pulse" />
          <h2 className="text-3xl font-dancing text-pink-600 mb-6">
            {chapter}
          </h2>
        </div>

        <div className="bg-pink-100 rounded-full h-4 mb-4 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-pink-400 to-purple-400 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-pink-500 font-poppins animate-pulse">
          {loadingText}
        </p>

        <div className="mt-8 text-sm text-gray-400 font-poppins">
          {progress}% complete
        </div>
      </div>
    </div>
  );
};

export default ChapterLoader;