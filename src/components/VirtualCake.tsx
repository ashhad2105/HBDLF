import React, { useState } from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { tracker } from '../utils/interactionTracker';

interface VirtualCakeProps {
  onComplete: () => void;
}

const VirtualCake: React.FC<VirtualCakeProps> = ({ onComplete }) => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [cakeSliced, setCakeSliced] = useState(false);
  const [showSliceButton, setShowSliceButton] = useState(false);

  const blowCandles = () => {
    setCandlesBlown(true);
    setShowConfetti(true);
    tracker.trackCandlesBlow();
    
    setTimeout(() => {
      setShowMessage(true);
      setTimeout(() => {
        setShowSliceButton(true);
      }, 2000);
    }, 1500);
  };

  const sliceCake = () => {
    setCakeSliced(true);
    tracker.trackInteraction('cake_sliced');
    
    // Create slice animation effect
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const slice = document.createElement('div');
        slice.innerHTML = '🍰';
        slice.className = 'fixed text-3xl pointer-events-none z-50 animate-float-up';
        slice.style.left = Math.random() * window.innerWidth + 'px';
        slice.style.top = window.innerHeight + 'px';
        document.body.appendChild(slice);
        setTimeout(() => slice.remove(), 3000);
      }, i * 200);
    }
  };

  const handleContinue = () => {
    tracker.trackClick('continue_cake');
    onComplete();
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-yellow-100 via-pink-50 to-purple-100 relative overflow-hidden">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              {['🎉', '🎊', '💖', '✨', '🌟', '🎂', '🍰', '🌹', '💕'][Math.floor(Math.random() * 9)]}
            </div>
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-8">
          <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-dancing text-pink-600 mb-4">
            Make a Wish! 🎂
          </h1>
          <p className="text-lg font-poppins text-gray-600">
            Your special birthday cake awaits, my beautiful princess
          </p>
        </div>

        <div className="text-center">
          <div className="relative inline-block">
            {/* Beautiful Romantic Cake */}
            <div className="relative">
              {/* Main Cake Structure - 3 Tiers */}
              <div className="relative w-96 h-64 mx-auto">
                
                {/* Bottom Tier - Largest */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 h-24">
                  <div className="w-full h-full bg-gradient-to-b from-pink-50 to-pink-100 rounded-t-3xl shadow-2xl border-4 border-pink-200 relative overflow-hidden">
                    {/* Cake texture */}
                    <div className="absolute inset-2 bg-gradient-to-b from-cream-50 to-cream-100 rounded-t-2xl"></div>
                    {/* Decorative roses around bottom tier */}
                    <div className="absolute -top-2 left-4 text-2xl">🌹</div>
                    <div className="absolute -top-2 right-4 text-2xl">🌹</div>
                    <div className="absolute top-4 left-2 text-xl">🌸</div>
                    <div className="absolute top-4 right-2 text-xl">🌸</div>
                    <div className="absolute top-8 left-6 text-lg">💕</div>
                    <div className="absolute top-8 right-6 text-lg">💕</div>
                  </div>
                  {/* Pink frosting border */}
                  <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300 rounded-t-3xl border-2 border-pink-400"></div>
                </div>

                {/* Middle Tier */}
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-64 h-20">
                  <div className="w-full h-full bg-gradient-to-b from-purple-50 to-purple-100 rounded-t-2xl shadow-xl border-3 border-purple-200 relative overflow-hidden">
                    {/* Cake texture */}
                    <div className="absolute inset-2 bg-gradient-to-b from-cream-50 to-cream-100 rounded-t-xl"></div>
                    {/* Heart decorations */}
                    <div className="absolute top-2 left-4 text-lg">💖</div>
                    <div className="absolute top-2 right-4 text-lg">💖</div>
                    <div className="absolute top-6 left-8 text-sm">✨</div>
                    <div className="absolute top-6 right-8 text-sm">✨</div>
                  </div>
                  {/* Purple frosting border */}
                  <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 rounded-t-2xl border-2 border-purple-400"></div>
                </div>

                {/* Top Tier */}
                <div className="absolute bottom-36 left-1/2 transform -translate-x-1/2 w-48 h-16">
                  <div className="w-full h-full bg-gradient-to-b from-cream-50 to-cream-100 rounded-t-xl shadow-lg border-2 border-cream-200 relative overflow-hidden">
                    {/* Cake texture */}
                    <div className="absolute inset-1 bg-gradient-to-b from-white to-cream-50 rounded-t-lg"></div>
                    {/* Small decorations */}
                    <div className="absolute top-1 left-3 text-sm">🌟</div>
                    <div className="absolute top-1 right-3 text-sm">🌟</div>
                    <div className="absolute top-4 left-6 text-xs">💫</div>
                    <div className="absolute top-4 right-6 text-xs">💫</div>
                  </div>
                  {/* White frosting border */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-white via-pink-100 to-white rounded-t-xl border border-pink-200"></div>
                </div>

                {/* Beautiful Name on Cake */}
                <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-64 h-8 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-2 shadow-lg border-2 border-pink-300">
                    <span className="text-2xl font-dancing text-pink-600 font-bold tracking-wide">
                      Happy Birthday Lubna
                    </span>
                  </div>
                </div>

                {/* Elegant Candles */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex space-x-6">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                      {/* Candle holder */}
                      <div className="w-1 h-2 bg-gradient-to-b from-gold-300 to-gold-400 rounded-full mb-1"></div>
                      {/* Candle stick */}
                      <div className="w-3 h-16 bg-gradient-to-b from-pink-300 to-pink-400 rounded-t-full shadow-lg border border-pink-500 relative">
                        {/* Candle details */}
                        <div className="absolute top-2 left-0 right-0 h-0.5 bg-pink-500 opacity-50"></div>
                        <div className="absolute top-6 left-0 right-0 h-0.5 bg-pink-500 opacity-50"></div>
                        
                        {/* Flame */}
                        {!candlesBlown && (
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <div className="w-4 h-5 bg-gradient-to-t from-orange-400 via-yellow-300 to-yellow-200 rounded-full animate-flicker shadow-lg">
                              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-gradient-to-t from-red-400 to-orange-300 rounded-full opacity-80"></div>
                            </div>
                          </div>
                        )}
                        
                        {/* Smoke after blowing */}
                        {candlesBlown && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <div className="text-gray-400 text-lg animate-fade-in opacity-70">💨</div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Romantic decorative elements */}
                <div className="absolute -left-8 top-8 text-3xl animate-float opacity-70">🌹</div>
                <div className="absolute -right-8 top-12 text-3xl animate-float opacity-70" style={{animationDelay: '1s'}}>🌹</div>
                <div className="absolute -left-6 bottom-8 text-2xl animate-float opacity-60" style={{animationDelay: '2s'}}>💕</div>
                <div className="absolute -right-6 bottom-12 text-2xl animate-float opacity-60" style={{animationDelay: '3s'}}>💕</div>

                {/* Cake slice lines when cut */}
                {cakeSliced && (
                  <>
                    <div className="absolute bottom-8 left-1/2 w-0.5 h-32 bg-gray-400 transform -translate-x-1/2 animate-fade-in"></div>
                    <div className="absolute bottom-8 left-1/2 w-24 h-0.5 bg-gray-400 transform -translate-x-1/2 rotate-30 origin-left animate-fade-in"></div>
                    <div className="absolute bottom-8 left-1/2 w-24 h-0.5 bg-gray-400 transform -translate-x-1/2 -rotate-30 origin-left animate-fade-in"></div>
                  </>
                )}
              </div>

              {/* Elegant cake stand */}
              <div className="w-96 h-6 bg-gradient-to-b from-gray-100 to-gray-200 rounded-full mx-auto shadow-2xl border-2 border-gray-300 mt-4 relative">
                <div className="absolute top-1 left-4 right-4 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-60 rounded-full"></div>
              </div>
              <div className="w-88 h-3 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full mx-auto shadow-inner mt-1"></div>
            </div>
          </div>

          <div className="mt-16">
            {!candlesBlown ? (
              <div className="space-y-6">
                <p className="text-xl font-dancing text-pink-600">
                  Close your eyes, make a wish, and blow out the candles, my beautiful Lubna! 💨
                </p>
                <button
                  onClick={blowCandles}
                  className="bg-gradient-to-r from-pink-400 to-rose-400 text-white py-4 px-8 rounded-full font-poppins font-medium text-lg hover:from-pink-500 hover:to-rose-500 transform hover:scale-105 transition-all duration-300 shadow-xl animate-pulse"
                >
                  🌬️ Blow Candles
                </button>
              </div>
            ) : !cakeSliced ? (
              <div className="space-y-6">
                <div className="text-6xl animate-bounce">🎉</div>
                <p className="text-2xl font-dancing text-pink-600">
                  Happy Birthday My Beautiful Princess Lubna! 🎂
                </p>
                {showMessage && (
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto border border-pink-200 animate-fade-in">
                    <div className="text-4xl mb-4">👑</div>
                    <p className="text-lg font-poppins text-gray-700 leading-relaxed mb-6">
                      I hope all your wishes come true, my love! This beautiful cake is made with all my love for you. Now let's cut it together and celebrate your special day! 💖
                    </p>
                    {showSliceButton && (
                      <button
                        onClick={sliceCake}
                        className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-full font-poppins font-medium hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
                      >
                        🔪 Cut the Beautiful Cake
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-6xl animate-bounce">🍰</div>
                <p className="text-2xl font-dancing text-pink-600">
                  Perfect! Let's enjoy this sweet moment together, Lubna! 
                </p>
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto border border-pink-200 animate-fade-in">
                  <div className="text-4xl mb-4">🌹</div>
                  <p className="text-lg font-poppins text-gray-700 leading-relaxed">
                    Every slice of this beautiful cake is filled with my endless love for you, Lubna. Even though we're miles apart, we're celebrating together in our hearts. You make every day sweeter, my princess! 🍰💕
                  </p>
                </div>
                <button
                  onClick={handleContinue}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 px-8 rounded-full font-poppins font-medium text-lg hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  Continue Our Magical Journey
                  <ArrowRight className="w-5 h-5 inline ml-2" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualCake;