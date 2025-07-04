import React, { useState } from 'react';
import { Heart, ArrowRight, Shuffle } from 'lucide-react';
import { tracker } from '../utils/interactionTracker';

interface FiftyReasonsProps {
  onComplete: () => void;
}

const FiftyReasons: React.FC<FiftyReasonsProps> = ({ onComplete }) => {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [currentReason, setCurrentReason] = useState(0);

  const reasons = [
    'Your smile lights up my entire world, even through a screen',
    'You make me laugh even on my worst days from miles away',
    'Your kindness touches everyone around you',
    "You believe in me when I don't believe in myself",
    'Your voice is the most beautiful sound in the world',
    'You remember the little things that matter to me',
    'Your passion for life is inspiring',
    'You make ordinary video calls feel magical',
    'Your sleepy messages during late night talks melt my heart',
    "You're incredibly intelligent and wise beyond your years",
    'You have the most beautiful and caring heart',
    'Your messages always brighten my entire day',
    "You're my best friend and my greatest love",
    'You make me want to be a better person every day',
    'Your laugh is pure music to my soul',
    "You're patient with me when I'm being difficult",
    'Your dreams and ambitions inspire me constantly',
    "You're incredibly strong and resilient through everything",
    'Your way of loving makes me believe in forever',
    'You are the most beautiful woman in the world',
  ];

  const handleCardClick = (index: number) => {
    if (!flippedCards.includes(index)) {
      setFlippedCards([...flippedCards, index]);
      setCurrentReason(index);
      
      tracker.trackHeartClick(index);

      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const heart = document.createElement('div');
          heart.innerHTML = '💖';
          heart.className = 'fixed text-2xl pointer-events-none z-50 animate-float-up';
          heart.style.left = Math.random() * window.innerWidth + 'px';
          heart.style.top = window.innerHeight + 'px';
          document.body.appendChild(heart);
          setTimeout(() => heart.remove(), 3000);
        }, i * 100);
      }
    }
  };

  const getRandomReason = () => {
    const randomIndex = Math.floor(Math.random() * reasons.length);
    setCurrentReason(randomIndex);
    tracker.trackClick('random_reason', { reasonIndex: randomIndex });
  };

  const handleContinue = () => {
    tracker.trackClick('continue_reasons', { 
      totalRevealed: flippedCards.length,
      allRevealed: flippedCards.length === reasons.length 
    });
    onComplete();
  };

  const allRevealed = flippedCards.length === reasons.length;

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-red-100 via-pink-50 to-purple-100">
      <div className="max-w-6xl mx-auto py-8">
        <div className="text-center mb-8">
          <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-dancing text-pink-600 mb-4">
            20 Reasons Why I Love You
          </h1>
          <p className="text-lg font-poppins text-gray-600 mb-6">
            Click the hearts to reveal each reason
          </p>
          <button
            onClick={getRandomReason}
            className="bg-gradient-to-r from-pink-400 to-red-400 text-white py-2 px-6 rounded-full font-poppins text-sm hover:from-pink-500 hover:to-red-500 transform hover:scale-105 transition-all duration-300 shadow-lg mb-8"
          >
            <Shuffle className="w-4 h-4 inline mr-2" />
            Show Random Reason
          </button>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 max-w-2xl mx-auto border border-pink-200">
          <div className="text-center">
            <div className="text-6xl mb-4">💖</div>
            <p className="text-xl font-dancing text-gray-700 leading-relaxed">
              {reasons[currentReason]}
            </p>
            {flippedCards.includes(currentReason) && (
              <div className="mt-4">
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-2 rounded-full text-sm font-poppins">
                  Reason #{currentReason + 1} ✨
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-5 gap-4 mb-8 max-w-4xl mx-auto">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="relative cursor-pointer transform transition-all duration-300 hover:scale-110"
              onClick={() => handleCardClick(index)}
            >
              <div className={`flip-card ${flippedCards.includes(index) ? 'flipped' : ''}`}>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <Heart
                      className={`w-12 h-12 transition-colors duration-300 ${
                        flippedCards.includes(index)
                          ? 'text-red-400'
                          : 'text-pink-400 hover:text-red-400'
                      }`}
                    />
                  </div>
                  <div className="flip-card-back bg-gradient-to-br from-pink-400 to-red-400 rounded-lg p-2 text-white text-xs font-poppins flex items-center justify-center text-center">
                    <span>{index + 1}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="text-pink-500 font-poppins mb-6">
            Discovered: {flippedCards.length} of {reasons.length} reasons
          </div>

          {allRevealed && (
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto border border-pink-200 mb-8 animate-fade-in">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-dancing text-pink-600 mb-4">
                You Found All 20 Reasons!
              </h3>
              <p className="text-lg font-poppins text-gray-700 leading-relaxed">
                But honestly, these are just a few of the countless reasons why
                I love you. Every day you give me new reasons to fall deeper in
                love with you. You are my everything, my forever, and my
                greatest blessing. 💖
              </p>
            </div>
          )}

          <button
            onClick={handleContinue}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 px-8 rounded-full font-poppins font-medium text-lg hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Continue to Next Surprise
            <ArrowRight className="w-5 h-5 inline ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiftyReasons;