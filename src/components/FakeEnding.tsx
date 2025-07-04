import React, { useState, useEffect } from 'react';
import { Heart, ArrowRight, Play } from 'lucide-react';
import { sendComprehensiveReport } from '../utils/emailService';
import { tracker } from '../utils/interactionTracker';

const FakeEnding: React.FC = () => {
  const [showFakeEnd, setShowFakeEnd] = useState(true);
  const [showRealSurprise, setShowRealSurprise] = useState(false);
  const [showVideoMessage, setShowVideoMessage] = useState(false);
  const [showFinalCelebration, setShowFinalCelebration] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [showFinalLetter, setShowFinalLetter] = useState(false);
  const [showLetterButton, setShowLetterButton] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFakeEnd(false);
      setTimeout(() => {
        setShowRealSurprise(true);
        setTimeout(() => {
          setShowContinueButton(true);
        }, 3000);
      }, 2000);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinueToVideo = () => {
    setShowRealSurprise(false);
    setShowContinueButton(false);
    tracker.trackClick('continue_to_video');
    setTimeout(() => {
      setShowVideoMessage(true);
    }, 1000);
  };

  const handleVideoComplete = () => {
    setShowVideoMessage(false);
    tracker.trackClick('video_complete');
    setTimeout(() => {
      setShowFinalLetter(true);
      setTimeout(() => {
        setShowLetterButton(true);
      }, 5000);
    }, 1000);
  };

  const handleLetterComplete = async () => {
    setShowFinalLetter(false);
    setShowLetterButton(false);
    tracker.trackClick('letter_complete');
    
    // Automatically send comprehensive report silently
    if (!emailSent) {
      setEmailSent(true);
      await sendComprehensiveReport();
    }
    
    setTimeout(() => {
      setShowFinalCelebration(true);
    }, 1000);
  };

  if (showFakeEnd) {
    return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-200">
            <h1 className="text-4xl font-dancing text-gray-600 mb-6">
              That's All!
            </h1>
            <p className="text-lg font-poppins text-gray-500 mb-8">
              Thank you for going through this birthday journey with me. I hope you enjoyed all the surprises I prepared for you from across the miles.
            </p>
            <div className="text-gray-400">🎉 Happy Birthday, My Love 🎉</div>
          </div>
        </div>
      </div>
    );
  }

  if (showRealSurprise && !showVideoMessage) {
    return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-pink-200 via-purple-100 to-cream-200 flex items-center justify-center">
        <div className="text-center max-w-2xl animate-fade-in">
          <div className="mb-8">
            <div className="text-8xl animate-bounce mb-6">😏</div>
            <h1 className="text-5xl font-dancing text-pink-600 mb-6 animate-pulse">
              Wait... One More Thing! 💌
            </h1>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-pink-200 mb-8">
            <p className="text-xl font-poppins text-gray-700 leading-relaxed mb-6">
              Did you really think I would end our special day without one final surprise? You know me better than that! I have something very special to show you... 😘
            </p>
            <p className="text-lg font-poppins text-pink-600">
              The most important part of your birthday surprise is waiting for you!
            </p>
          </div>

          {showContinueButton && (
            <button
              onClick={handleContinueToVideo}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 px-8 rounded-full font-poppins font-medium text-lg hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-xl animate-pulse"
            >
              Continue to Final Surprise
              <ArrowRight className="w-5 h-5 inline ml-2" />
            </button>
          )}
        </div>
      </div>
    );
  }

  if (showVideoMessage && !showFinalLetter) {
    return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-purple-100 via-pink-50 to-cream-100">
        <div className="max-w-4xl mx-auto py-8">
          <div className="text-center mb-8">
            <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-dancing text-pink-600 mb-4">
              A Special Message From My Heart
            </h1>
            <p className="text-lg font-poppins text-gray-600">
              The most important part of your birthday surprise
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-pink-200 max-w-3xl mx-auto">
            <div className="p-8">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-6 relative border-4 border-gray-300">
                <div className="w-full h-full">
                  <iframe 
  width="100%" 
  height="100%" 
  src="https://drive.google.com/file/d/1EBLuW1lpxPE8j3GeZbF9DuJbkaPs0VyD/preview" 
  title="Google Drive video player" 
  frameBorder="0" 
  allow="autoplay; encrypted-media; picture-in-picture" 
  allowFullScreen 
  className="rounded-2xl">
</iframe>
                </div>
              </div>

              <div className="bg-pink-50 p-6 rounded-2xl mb-6">
                <h4 className="text-xl font-dancing text-pink-600 mb-3">
                  Until you can see my video, here's what I want you to know:
                </h4>
                <p className="font-poppins text-gray-700 leading-relaxed">
                  "My beautiful love, even though we're miles apart, you are always in my heart. Every day I wake up grateful for you, for us, for this incredible love we share. The distance has only made me love you more deeply, appreciate you more fully, and dream about our future more vividly. Happy birthday, my angel. I can't wait to celebrate every birthday with you for the rest of our lives."
                </p>
              </div>

              <div className="text-center">
                <button
                  onClick={handleVideoComplete}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 px-8 rounded-full font-poppins font-medium text-lg hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  Continue the Journey
                  <ArrowRight className="w-5 h-5 inline ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showFinalLetter && !showFinalCelebration) {
    return (
      <div className="min-h-screen p-4 bg-gradient-to-br from-pink-100 via-purple-50 to-cream-100 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <Heart
              key={i}
              className="absolute text-pink-400 animate-float opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                fontSize: `${1 + Math.random() * 2}rem`,
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto py-8 relative z-10">
          <div className="text-center animate-fade-in">
            <div className="mb-8">
              <div className="text-8xl mb-6 animate-pulse">💖</div>
              <h1 className="text-6xl md:text-7xl font-dancing text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-6">
                I Love You Sooo Much
              </h1>
              <h2 className="text-3xl md:text-4xl font-pacifico text-pink-500 mb-8">
                Across Every Mile, Beyond Every Distance
              </h2>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-pink-200 mb-8">
              <div className="text-6xl mb-8">🌹</div>
              <div className="space-y-6 text-left max-w-2xl mx-auto">
                <p className="text-xl font-dancing text-gray-700 leading-relaxed">
                  My Dearest Beautiful Soul,
                </p>
                <p className="text-lg font-poppins text-gray-700 leading-relaxed">
                  If you've made it this far, it means you've experienced every single surprise I prepared for you from across the miles. But the real surprise isn't in any of these pages - it's in my heart, where my love for you grows stronger with every video call, every text message, every "good morning" and "good night."
                </p>
                <p className="text-lg font-poppins text-gray-700 leading-relaxed">
                  This website is just a tiny glimpse into how much you mean to me. Every memory we've created through screens, every dream we've shared for our future, every moment of missing you - they all pale in comparison to the joy you bring to my life simply by being you, even from thousands of miles away.
                </p>
                <p className="text-lg font-poppins text-gray-700 leading-relaxed">
                  On your special day, I want you to know that you are cherished, celebrated, and loved beyond measure. You are my sunshine across time zones, my inspiration through every challenge, and my forever home that I'm coming to soon.
                </p>
                <p className="text-xl font-dancing text-pink-600 leading-relaxed">
                  Happy Birthday, My Everything. Here's to your last birthday where we have to celebrate apart. Next year, I'll be right there beside you, and every year after that. 💖
                </p>
                <p className="text-lg font-dancing text-gray-700 text-right">
                  Forever yours across every mile,
                  <br />
                  Your devoted heart ❤️
                </p>
              </div>
            </div>

            {showLetterButton && (
              <div className="animate-fade-in">
                <button
                  onClick={handleLetterComplete}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 px-8 rounded-full font-poppins font-medium text-lg hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  Complete Our Journey
                  <ArrowRight className="w-5 h-5 inline ml-2" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-pink-100 via-purple-50 to-cream-100 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-confetti text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            {['🎉', '🎊', '💖', '✨', '🌟', '💕', '🎈', '🌹'][Math.floor(Math.random() * 8)]}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-400 animate-float opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              fontSize: `${1 + Math.random() * 2}rem`,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto py-8 relative z-10">
        <div className="text-center animate-fade-in">
          <div className="mb-8">
            <div className="text-8xl mb-6 animate-pulse">💖</div>
            <h1 className="text-6xl md:text-7xl font-dancing text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-6">
              Thank You For This Journey
            </h1>
            <h2 className="text-3xl md:text-4xl font-pacifico text-pink-500 mb-8">
              Every Click, Every Moment Was Magical
            </h2>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-pink-200 mb-8">
            <div className="text-6xl mb-8">🌟</div>
            <h3 className="text-3xl font-dancing mb-4">
              This Website Will Be Stored Forever
            </h3>
            <p className="text-lg font-poppins leading-relaxed text-gray-700 mb-6">
              Every word, every animation, every moment of love captured here will remain as a testament to our beautiful long-distance love story. Years from now, when we're old and gray, we can look back at this and remember how our love conquered every mile between us.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-green-600 font-poppins">
                ✅ Your complete journey has been captured and preserved!
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-3xl p-8 shadow-2xl mb-8">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-3xl font-dancing mb-4">
              Your Journey Has Been Recorded
            </h3>
            <p className="text-lg font-poppins leading-relaxed">
              Every interaction, every click, every moment you spent exploring this birthday surprise has been lovingly tracked and preserved. This way, we can remember exactly how you experienced our special day together! 💖
            </p>
          </div>

          <div className="text-center">
            <div className="text-6xl mb-4 animate-pulse">🎉</div>
            <h3 className="text-3xl font-dancing text-pink-600 mb-4">
              Until We're Together...
            </h3>
            <p className="text-lg font-poppins text-gray-600 mb-8">
              Every day brings us closer to forever! 💖
            </p>
            
            <div className="bg-pink-50 border border-pink-200 rounded-2xl p-6">
              <p className="text-pink-600 font-poppins">
                🎂 Happy Birthday, My Beautiful Love! 🎂
                <br />
                This magical journey is complete, but our love story continues forever! 💕
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FakeEnding;