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
              {['🎉', '🎊', '💖', '✨', '🌟', '🎂', '🍰'][Math.floor(Math.random() * 7)]}
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
            Your special birthday cake awaits
          </p>
        </div>

        <div className="text-center">
          <div className="relative inline-block">
            {/* Simple Realistic Cake */}
            <div className="relative">
              {/* Main Cake Body - Single Layer */}
              <div className="relative w-72 h-40 mx-auto">
                {/* Cake Base */}
                <div className="absolute bottom-0 w-full h-32 bg-gradient-to-b from-amber-100 to-amber-200 rounded-t-2xl shadow-2xl border-2 border-amber-200">
                  {/* Cake texture lines */}
                  <div className="absolute top-4 left-4 right-4 h-0.5 bg-amber-300 opacity-50"></div>
                  <div className="absolute top-8 left-4 right-4 h-0.5 bg-amber-300 opacity-50"></div>
                  <div className="absolute top-12 left-4 right-4 h-0.5 bg-amber-300 opacity-50"></div>
                </div>

                {/* White Frosting Top */}
                <div className="absolute top-0 w-full h-12 bg-gradient-to-b from-white to-gray-50 rounded-t-2xl shadow-lg border-2 border-gray-100">
                  {/* Frosting swirls */}
                  <div className="absolute top-2 left-8 w-4 h-4 bg-pink-200 rounded-full opacity-80"></div>
                  <div className="absolute top-3 right-8 w-3 h-3 bg-pink-200 rounded-full opacity-80"></div>
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-pink-100 rounded-full opacity-60"></div>
                </div>

                {/* Simple decorative border */}
                <div className="absolute top-10 left-0 right-0 h-2 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 opacity-70"></div>

                {/* Candles - Simple and clean */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                      {/* Candle stick */}
                      <div className="w-2 h-12 bg-gradient-to-b from-red-400 to-red-500 rounded-t-full shadow-md border border-red-300">
                        {/* Flame */}
                        {!candlesBlown && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <div className="w-3 h-4 bg-gradient-to-t from-orange-400 to-yellow-300 rounded-full animate-flicker"></div>
                          </div>
                        )}
                        {/* Smoke after blowing */}
                        {candlesBlown && (
                          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                            <div className="text-gray-400 text-sm animate-fade-in">💨</div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cake slice lines when cut */}
                {cakeSliced && (
                  <>
                    <div className="absolute top-6 left-1/2 w-0.5 h-24 bg-gray-400 transform -translate-x-1/2 animate-fade-in"></div>
                    <div className="absolute top-6 left-1/2 w-16 h-0.5 bg-gray-400 transform -translate-x-1/2 rotate-45 origin-left animate-fade-in"></div>
                    <div className="absolute top-6 left-1/2 w-16 h-0.5 bg-gray-400 transform -translate-x-1/2 -rotate-45 origin-left animate-fade-in"></div>
                  </>
                )}
              </div>

              {/* Simple cake plate */}
              <div className="w-80 h-4 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full mx-auto shadow-xl border border-gray-400 mt-2"></div>
              <div className="w-76 h-2 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full mx-auto shadow-inner mt-1"></div>
            </div>
          </div>

          <div className="mt-12">
            {!candlesBlown ? (
              <div className="space-y-6">
                <p className="text-xl font-dancing text-pink-600">
                  Close your eyes, make a wish, and blow out the candles! 💨
                </p>
                <button
                  onClick={blowCandles}
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white py-4 px-8 rounded-full font-poppins font-medium text-lg hover:from-yellow-500 hover:to-orange-500 transform hover:scale-105 transition-all duration-300 shadow-xl animate-pulse"
                >
                  🌬️ Blow Candles
                </button>
              </div>
            ) : !cakeSliced ? (
              <div className="space-y-6">
                <div className="text-6xl animate-bounce">🎉</div>
                <p className="text-2xl font-dancing text-pink-600">
                  Happy Birthday Beautiful! 🎂
                </p>
                {showMessage && (
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto border border-pink-200 animate-fade-in">
                    <p className="text-lg font-poppins text-gray-700 leading-relaxed mb-6">
                      I hope all your wishes come true! Now let's cut the cake and celebrate your special day together! 💖
                    </p>
                    {showSliceButton && (
                      <button
                        onClick={sliceCake}
                        className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-full font-poppins font-medium hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
                      >
                        🔪 Cut the Cake
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-6xl animate-bounce">🍰</div>
                <p className="text-2xl font-dancing text-pink-600">
                  Perfect! Let's enjoy this sweet moment together! 
                </p>
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto border border-pink-200 animate-fade-in">
                  <p className="text-lg font-poppins text-gray-700 leading-relaxed">
                    Every slice of this virtual cake is filled with my love for you. Even though we're miles apart, we're celebrating together in our hearts. You make every day sweeter! 🍰💕
                  </p>
                </div>
                <button
                  onClick={handleContinue}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 px-8 rounded-full font-poppins font-medium text-lg hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  Continue Our Journey
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