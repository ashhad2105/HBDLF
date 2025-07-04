import React, { useState, useEffect } from 'react';
import PasswordGate from './components/PasswordGate';
import EnvelopeAnimation from './components/EnvelopeAnimation';
import WelcomePage from './components/WelcomePage';
import ChapterLoader from './components/ChapterLoader';
import LoveLetter from './components/LoveLetter';
import FiftyReasons from './components/FiftyReasons';
import VirtualCake from './components/VirtualCake';
import Timeline from './components/Timeline';
import MiniGames from './components/MiniGames';
import FutureDreams from './components/FutureDreams';
import AnimatedGifts from './components/AnimatedGifts';
import FakeEnding from './components/FakeEnding';
import FloatingHearts from './components/FloatingHearts';
import BackgroundMusic from './components/BackgroundMusic';
import { tracker } from './utils/interactionTracker';

type AppStage = 
  | 'password' 
  | 'envelope' 
  | 'welcome' 
  | 'chapter1' 
  | 'loveLetter' 
  | 'chapter2' 
  | 'fiftyReasons' 
  | 'chapter3' 
  | 'virtualCake' 
  | 'chapter4' 
  | 'timeline' 
  | 'chapter5' 
  | 'miniGames' 
  | 'chapter6' 
  | 'futureDreams' 
  | 'chapter7' 
  | 'animatedGifts' 
  | 'fakeEnding';

function App() {
  const [currentStage, setCurrentStage] = useState<AppStage>('password');
  const [musicEnabled, setMusicEnabled] = useState(false);

  useEffect(() => {
    tracker.trackInteraction('app_loaded');
  }, []);

  const handleStageComplete = (nextStage: AppStage) => {
    tracker.trackStageChange(nextStage);
    setTimeout(() => {
      setCurrentStage(nextStage);
    }, 500);
  };

  const handlePasswordSuccess = () => {
    tracker.trackStageChange('envelope');
    setCurrentStage('envelope');
  };

  const handleEnvelopeOpen = () => {
    tracker.trackStageChange('welcome');
    setCurrentStage('welcome');
  };

  const handleWelcomeComplete = () => {
    tracker.trackStageChange('chapter1');
    setCurrentStage('chapter1');
  };

  const handleChapterComplete = (nextStage: AppStage) => {
    tracker.trackStageChange(nextStage);
    setCurrentStage(nextStage);
  };

  const renderCurrentStage = () => {
    switch (currentStage) {
      case 'password':
        return <PasswordGate onSuccess={handlePasswordSuccess} />;
      case 'envelope':
        return <EnvelopeAnimation onComplete={handleEnvelopeOpen} />;
      case 'welcome':
        return <WelcomePage onComplete={handleWelcomeComplete} setMusicEnabled={setMusicEnabled} />;
      case 'chapter1':
        return <ChapterLoader chapter="Chapter 1: From My Heart Across the Miles" onComplete={() => handleChapterComplete('loveLetter')} />;
      case 'loveLetter':
        return <LoveLetter onComplete={() => handleChapterComplete('chapter2')} />;
      case 'chapter2':
        return <ChapterLoader chapter="Chapter 2: Why I Love You" onComplete={() => handleChapterComplete('fiftyReasons')} />;
      case 'fiftyReasons':
        return <FiftyReasons onComplete={() => handleChapterComplete('chapter3')} />;
      case 'chapter3':
        return <ChapterLoader chapter="Chapter 3: Make a Wish" onComplete={() => handleChapterComplete('virtualCake')} />;
      case 'virtualCake':
        return <VirtualCake onComplete={() => handleChapterComplete('chapter4')} />;
      case 'chapter4':
        return <ChapterLoader chapter="Chapter 4: Our Love Story" onComplete={() => handleChapterComplete('timeline')} />;
      case 'timeline':
        return <Timeline onComplete={() => handleChapterComplete('chapter5')} />;
      case 'chapter5':
        return <ChapterLoader chapter="Chapter 5: Fun & Games" onComplete={() => handleChapterComplete('miniGames')} />;
      case 'miniGames':
        return <MiniGames onComplete={() => handleChapterComplete('chapter6')} />;
      case 'chapter6':
        return <ChapterLoader chapter="Chapter 6: Our Dreams Together" onComplete={() => handleChapterComplete('futureDreams')} />;
      case 'futureDreams':
        return <FutureDreams onComplete={() => handleChapterComplete('chapter7')} />;
      case 'chapter7':
        return <ChapterLoader chapter="Chapter 7: Special Gifts" onComplete={() => handleChapterComplete('animatedGifts')} />;
      case 'animatedGifts':
        return <AnimatedGifts onComplete={() => handleChapterComplete('fakeEnding')} />;
      case 'fakeEnding':
        return <FakeEnding />;
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-cream-100 overflow-hidden">
      <FloatingHearts />
      {musicEnabled && <BackgroundMusic />}
      {renderCurrentStage()}
    </div>
  );
}

export default App;