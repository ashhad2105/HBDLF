import React, { useState } from 'react';
import { Heart, ArrowRight, Gift, Video, BellRing as Ring } from 'lucide-react';
import { tracker } from '../utils/interactionTracker';

interface AnimatedGiftsProps {
  onComplete: () => void;
}

const AnimatedGifts: React.FC<AnimatedGiftsProps> = ({ onComplete }) => {
  const [openedGifts, setOpenedGifts] = useState<number[]>([]);

  const gifts = [
    {
      icon: <Video className="w-8 h-8" />,
      title: 'Video Call Dates',
      content: '📹 Unlimited video dates where we can watch movies, and just be together',
      color: 'from-purple-400 to-pink-400',
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Love Letter Collection',
      content: '💕 A digital scrapbook of all our messages, voice notes, and sweet memories',
      color: 'from-blue-400 to-purple-400',
    },
    {
      icon: <Ring className="w-8 h-8" />,
      title: 'Wedding Planning Dreams',
      content: '💍 A planning space for our dream wedding',
      color: 'from-amber-400 to-orange-400',
    },
  ];

  const openGift = (index: number) => {
    if (!openedGifts.includes(index)) {
      setOpenedGifts([...openedGifts, index]);
      tracker.trackGiftOpen(index);

      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          const heart = document.createElement('div');
          heart.innerHTML = '💖';
          heart.className = 'fixed text-2xl pointer-events-none z-50 animate-float-up';
          heart.style.left = Math.random() * window.innerWidth + 'px';
          heart.style.top = window.innerHeight + 'px';
          document.body.appendChild(heart);
          setTimeout(() => heart.remove(), 3000);
        }, i * 200);
      }
    }
  };

  const handleComplete = () => {
    tracker.trackClick('gifts_complete', { 
      giftsOpened: openedGifts.length,
      totalGifts: gifts.length 
    });
    onComplete();
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <Gift
            key={i}
            className="absolute text-pink-300 animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto py-8 relative z-10">
        <div className="text-center mb-8">
          <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-dancing text-pink-600 mb-4">
            Special Gifts Just for You
          </h1>
          <p className="text-lg font-poppins text-gray-600">
            Click each floating gift to reveal your surprise! 🎁
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
          {gifts.map((gift, index) => (
            <div
              key={index}
              className={`relative cursor-pointer transform transition-all duration-500 ${
                openedGifts.includes(index) ? 'scale-105' : 'hover:scale-110 animate-gentle-bounce'
              }`}
              onClick={() => openGift(index)}
            >
              <div className={`bg-gradient-to-br ${gift.color} rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden`}>
                {!openedGifts.includes(index) && (
                  <>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-full bg-white/20"></div>
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-8 bg-white/20"></div>
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-white/30 rounded-full"></div>
                  </>
                )}

                <div className="relative z-10">
                  <div className="text-center mb-4">
                    <div className="bg-white/20 rounded-full p-4 inline-block mb-4">
                      {gift.icon}
                    </div>
                    <h3 className="text-2xl font-dancing mb-4">{gift.title}</h3>
                  </div>

                  {openedGifts.includes(index) ? (
                    <div className="animate-fade-in">
                      <p className="font-poppins leading-relaxed text-center">
                        {gift.content}
                      </p>
                      <div className="mt-4 text-center">
                        <span className="bg-white/30 px-4 py-2 rounded-full text-sm font-poppins">
                          Opened! 💖
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="bg-white/30 rounded-2xl p-4 mb-4">
                        <Gift className="w-8 h-8 mx-auto mb-2" />
                        <p className="font-poppins text-sm">Tap to unwrap</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto border border-pink-200 mb-8">
            <div className="text-6xl mb-4">🎁</div>
            <h3 className="text-2xl font-dancing text-pink-600 mb-4">
              Every Day with You is a Gift
            </h3>
            <p className="text-lg font-poppins text-gray-700 leading-relaxed">
              These little gifts are just small tokens of my love. The real gift is having you in my life every single day, even from miles away. You are my greatest treasure, my biggest blessing, and my most precious gift. Soon we'll be together forever! 💖
            </p>
            <div className="mt-6">
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-2 rounded-full font-poppins text-sm">
                Gifts Opened: {openedGifts.length} of {gifts.length}
              </span>
            </div>
          </div>

          <button
            onClick={handleComplete}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 px-8 rounded-full font-poppins font-medium text-lg hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-xl"
          >
            One More Surprise...
            <ArrowRight className="w-5 h-5 inline ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimatedGifts;