import React, { useState, useEffect } from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { tracker } from '../utils/interactionTracker';

interface LoveLetterProps {
  onComplete: () => void;
}

const LoveLetter: React.FC<LoveLetterProps> = ({ onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showContinue, setShowContinue] = useState(false);
  const [currentSentence, setCurrentSentence] = useState(0);

  const loveLetterText = `My Dearest Lubna,

As I write this from miles away, my heart feels so close to yours that distance seems like just a number. You are the most beautiful soul I've ever known, and even though we're apart, you fill every corner of my world with love and light.

Every morning I wake up thinking about you, and every night I fall asleep with your voice echoing in my heart. The miles between us have only made my love for you grow stronger, deeper, and more certain.

You are my sunshine on cloudy days, my comfort when the world feels overwhelming, and my greatest source of joy. Your laugh through video calls brightens my entire week, and your messages are the highlight of every single day.

I love how you scrunch your nose when you laugh during our calls, how you always know exactly what to say when I'm feeling down, and how you make even the ordinary moments feel extraordinary - even from thousands of miles away.

The thought of finally being together, of building our life side by side, of waking up next to you every morning - it fills me with such excitement and love that I can barely contain it.

You are my best friend, my greatest love, and my forever person. In just over a year, we'll never have to say goodbye through a screen again. We'll be husband and wife, partners in everything, creating the most beautiful life together.

Happy Birthday, my beautiful angel. You deserve all the happiness in the world, and I can't wait to spend my life with you.

Until we're together again, know that you are loved beyond measure, missed every single second, and cherished more than words could ever express.

Forever and always yours,
Your devoted heart 💖,
Your Future Husband [Inshallah],
[Mohammed Ashhad]`;

  const sentences = loveLetterText.split(/(?<=[.!?])\s+/);

  const emotionalPauses = {
    'distance seems like just a number.': 800,
    'fill every corner of my world with love and light.': 1200,
    'more certain.': 800,
    'highlight of every single day.': 1000,
    'thousands of miles away.': 1200,
    'I can barely contain it.': 1000,
    'creating the most beautiful life together.': 1500,
    'words could ever express.': 1500,
    'Your devoted heart 💖': 2000,
  };

  useEffect(() => {
    tracker.trackInteraction('love_letter_started');
    
    let index = 0;
    let sentenceIndex = 0;

    const timer = setInterval(() => {
      if (index < loveLetterText.length) {
        setDisplayedText(loveLetterText.slice(0, index + 1));

        const currentText = loveLetterText.slice(0, index + 1);
        if (sentenceIndex < sentences.length) {
          const currentSentenceEnd = sentences
            .slice(0, sentenceIndex + 1)
            .join(' ').length;
          if (currentText.length >= currentSentenceEnd) {
            const completedSentence = sentences[sentenceIndex];
            setCurrentSentence(sentenceIndex);

            const pauseTime = emotionalPauses[completedSentence.trim()];
            if (pauseTime) {
              clearInterval(timer);
              setTimeout(() => {
                sentenceIndex++;
                index++;
                if (index < loveLetterText.length) {
                  const resumeTimer = setInterval(() => {
                    if (index < loveLetterText.length) {
                      setDisplayedText(loveLetterText.slice(0, index + 1));
                      index++;
                    } else {
                      clearInterval(resumeTimer);
                      setTimeout(() => {
                        setShowContinue(true);
                        tracker.trackInteraction('love_letter_completed');
                      }, 1000);
                    }
                  }, 30);
                } else {
                  setTimeout(() => {
                    setShowContinue(true);
                    tracker.trackInteraction('love_letter_completed');
                  }, 1000);
                }
              }, pauseTime);
              return;
            }
            sentenceIndex++;
          }
        }
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setShowContinue(true);
          tracker.trackInteraction('love_letter_completed');
        }, 1000);
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  const handleContinue = () => {
    tracker.trackClick('continue_love_letter');
    onComplete();
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-cream-50 via-pink-50 to-purple-50">
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-8">
          <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-dancing text-pink-600 mb-2">
            A Letter From Across the Miles
          </h1>
          <p className="text-lg font-poppins text-gray-600">
            Written with all my love, sent through the universe to you
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-pink-100 max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <div className="font-dancing text-lg md:text-xl text-gray-800 leading-relaxed whitespace-pre-wrap relative">
              {displayedText}
              <span className="animate-pulse text-pink-500">|</span>

              {currentSentence > 0 && (
                <div className="absolute -right-8 top-0 hidden md:block">
                  <div className="flex flex-col space-y-2">
                    {currentSentence >= 2 && (
                      <span className="text-2xl animate-pulse">💕</span>
                    )}
                    {currentSentence >= 5 && (
                      <span className="text-2xl animate-pulse">🥰</span>
                    )}
                    {currentSentence >= 8 && (
                      <span className="text-2xl animate-pulse">😍</span>
                    )}
                    {currentSentence >= 12 && (
                      <span className="text-2xl animate-pulse">💖</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {showContinue && (
          <div className="text-center mt-8 animate-fade-in">
            <button
              onClick={handleContinue}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 px-8 rounded-full font-poppins font-medium text-lg hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Continue Our Story
              <ArrowRight className="w-5 h-5 inline ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoveLetter;
