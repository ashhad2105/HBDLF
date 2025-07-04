import React, { useState } from 'react';
import { Heart, Lock } from 'lucide-react';
import { tracker } from '../utils/interactionTracker';
import { sendPasswordEntryNotification } from '../utils/emailService';

interface PasswordGateProps {
  onSuccess: () => void;
}

const PasswordGate: React.FC<PasswordGateProps> = ({ onSuccess }) => {
  const [answer, setAnswer] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const correctAnswers = ['honey'];
  const playfulMessages = [
    'Hmm, try again love 😘',
    "Not quite, but you're adorable 💕",
    "Close! Think about what you call me when you're being sweet 🥰",
    'One more try, my beautiful 💖',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    tracker.trackInteraction('password_attempt', { 
      attempt: attempts + 1, 
      answer: answer.toLowerCase().trim() 
    });

    if (correctAnswers.includes(answer.toLowerCase().trim())) {
      tracker.trackInteraction('password_success');
      
      // Send immediate email notification that she entered the website
      console.log('🚨 Password correct! Sending entry notification...');
      await sendPasswordEntryNotification();
      
      onSuccess();
    } else {
      setAttempts((prev) => prev + 1);
      if (attempts >= 2) {
        setShowHint(true);
      }
      setAnswer('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-200 via-purple-100 to-cream-200">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-pink-200">
        <div className="mb-6">
          <Lock className="w-16 h-16 text-pink-400 mx-auto mb-4 animate-pulse" />
          <h1 className="text-3xl font-dancing text-pink-600 mb-2">
            Before We Begin...
          </h1>
          <p className="text-gray-600 font-poppins">
            This special place is just for you 💕
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-dancing text-pink-500 mb-3">
              What's the sweetest nickname you call me? 💖
            </label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full px-4 py-3 border-2 border-pink-200 rounded-full focus:border-pink-400 focus:outline-none text-center font-poppins"
              placeholder="Type your answer here..."
            />
          </div>

          {attempts > 0 && (
            <div className="text-pink-500 font-poppins animate-bounce">
              {playfulMessages[Math.min(attempts - 1, playfulMessages.length - 1)]}
            </div>
          )}

          {showHint && (
            <div className="bg-pink-50 p-3 rounded-2xl text-pink-600 font-poppins text-sm">
              💡 Hint: It's what you call me when you want to be extra sweet...
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white py-3 px-6 rounded-full font-poppins font-medium hover:from-pink-500 hover:to-purple-500 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <Heart className="w-5 h-5 inline mr-2" />
            Enter My Heart
          </button>
        </form>

        <div className="mt-6 text-xs text-gray-400 font-poppins">
          Made with 💖 just for you
        </div>
      </div>
    </div>
  );
};

export default PasswordGate;
