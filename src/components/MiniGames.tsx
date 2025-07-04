import React, { useState } from 'react';
import { Heart, ArrowRight, Trophy, RotateCcw } from 'lucide-react';
import { tracker } from '../utils/interactionTracker';

interface MiniGamesProps {
  onComplete: () => void;
}

interface GameData {
  quizAnswers: number[];
  quizScore: number;
  puzzleCompleted: boolean;
  puzzleTime: number;
}

const MiniGames: React.FC<MiniGamesProps> = ({ onComplete }) => {
  const [currentGame, setCurrentGame] = useState<'menu' | 'quiz' | 'puzzle'>('menu');
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);

  const [puzzlePieces, setPuzzlePieces] = useState<number[]>([]);
  const [puzzleCompleted, setPuzzleCompleted] = useState(false);
  const [puzzleStartTime, setPuzzleStartTime] = useState<number>(0);
  const [puzzleTime, setPuzzleTime] = useState<number>(0);

  const quizQuestions = [
    {
      question: 'What time do we usually have our private talks?',
      options: ['Morning', 'Afternoon', 'Evening', 'Late night'],
      correct: 3,
    },
    {
      question: "What's my favorite thing about our long-distance relationship?",
      options: ['The anticipation', 'Our deep conversations', 'Planning visits', 'All of the above'],
      correct: 3,
    },
    {
      question: 'When are we planning to get married?',
      options: ['2025', '2026', '2027', "When we're ready"],
      correct: 1,
    },
    {
      question: 'What do I love most about you?',
      options: ['Your smile through the screen', 'Your voice on calls', 'Your loving heart', 'Everything'],
      correct: 3,
    },
    {
      question: "What's our biggest dream together?",
      options: ['Traveling the world', 'Building a home', 'Never being apart again', 'All of the above'],
      correct: 3,
    },
  ];

  React.useEffect(() => {
    if (currentGame === 'puzzle' && puzzlePieces.length === 0) {
      const pieces = Array.from({ length: 16 }, (_, i) => i).sort(() => Math.random() - 0.5);
      setPuzzlePieces(pieces);
      setPuzzleStartTime(Date.now());
      tracker.trackInteraction('puzzle_started');
    }
  }, [currentGame]);

  const handleQuizAnswer = (selectedIndex: number) => {
    const newAnswers = [...quizAnswers, selectedIndex];
    setQuizAnswers(newAnswers);
    
    const isCorrect = selectedIndex === quizQuestions[currentQuestion].correct;
    tracker.trackQuizAnswer(currentQuestion, selectedIndex, isCorrect);

    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResults(true);
      tracker.trackInteraction('quiz_completed', { 
        finalScore: quizScore + (isCorrect ? 1 : 0),
        answers: newAnswers 
      });
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setQuizScore(0);
    setShowResults(false);
    setQuizAnswers([]);
    tracker.trackClick('quiz_reset');
  };

  const handlePuzzlePieceClick = (index: number) => {
    if (puzzleCompleted) return;

    const newPieces = [...puzzlePieces];
    const emptyIndex = newPieces.indexOf(15);

    const clickedRow = Math.floor(index / 4);
    const clickedCol = index % 4;
    const emptyRow = Math.floor(emptyIndex / 4);
    const emptyCol = emptyIndex % 4;

    const isAdjacent =
      (Math.abs(clickedRow - emptyRow) === 1 && clickedCol === emptyCol) ||
      (Math.abs(clickedCol - emptyCol) === 1 && clickedRow === emptyRow);

    if (isAdjacent) {
      [newPieces[index], newPieces[emptyIndex]] = [newPieces[emptyIndex], newPieces[index]];
      setPuzzlePieces(newPieces);

      const isSolved = newPieces.every((piece, idx) => piece === idx);
      if (isSolved) {
        const completionTime = Math.floor((Date.now() - puzzleStartTime) / 1000);
        setPuzzleCompleted(true);
        setPuzzleTime(completionTime);
        tracker.trackInteraction('puzzle_completed', { timeSeconds: completionTime });
      }
    }
  };

  const resetPuzzle = () => {
    const pieces = Array.from({ length: 16 }, (_, i) => i).sort(() => Math.random() - 0.5);
    setPuzzlePieces(pieces);
    setPuzzleCompleted(false);
    setPuzzleStartTime(Date.now());
    setPuzzleTime(0);
    tracker.trackClick('puzzle_reset');
  };

  const saveGameData = () => {
    const gameData: GameData = {
      quizAnswers,
      quizScore,
      puzzleCompleted,
      puzzleTime,
    };

    localStorage.setItem('birthdayGameData', JSON.stringify(gameData));
    tracker.trackGameData(gameData);
  };

  const handleComplete = () => {
    saveGameData();
    tracker.trackClick('games_complete');
    onComplete();
  };

  const renderGameMenu = () => (
    <div className="text-center">
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-pink-200 cursor-pointer transform transition-all duration-300 hover:scale-105"
          onClick={() => {
            setCurrentGame('quiz');
            tracker.trackClick('start_quiz');
          }}
        >
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-2xl font-dancing text-pink-600 mb-4">
            Long Distance Love Quiz
          </h3>
          <p className="text-gray-600 font-poppins">
            Test how well you know our relationship!
          </p>
        </div>

        <div
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-pink-200 cursor-pointer transform transition-all duration-300 hover:scale-105"
          onClick={() => {
            setCurrentGame('puzzle');
            tracker.trackClick('start_puzzle');
          }}
        >
          <div className="text-6xl mb-4">🧩</div>
          <h3 className="text-2xl font-dancing text-pink-600 mb-4">
            Heart Puzzle
          </h3>
          <p className="text-gray-600 font-poppins">
            Put our love back together!
          </p>
        </div>
      </div>
    </div>
  );

  const renderQuiz = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-pink-200">
        {!showResults ? (
          <div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-pink-500 font-poppins">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </span>
                <span className="text-purple-500 font-poppins">
                  Score: {quizScore}
                </span>
              </div>
              <div className="bg-pink-100 rounded-full h-2 mb-6">
                <div
                  className="bg-gradient-to-r from-pink-400 to-purple-400 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            <h3 className="text-2xl font-dancing text-pink-600 mb-6">
              {quizQuestions[currentQuestion].question}
            </h3>

            <div className="space-y-4">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleQuizAnswer(index)}
                  className="w-full bg-gradient-to-r from-pink-100 to-purple-100 hover:from-pink-200 hover:to-purple-200 text-gray-700 py-4 px-6 rounded-2xl font-poppins text-left transition-all duration-300 transform hover:scale-105"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-6xl mb-6">
              {quizScore === quizQuestions.length ? '🏆' : quizScore >= quizQuestions.length / 2 ? '🎉' : '💕'}
            </div>
            <h3 className="text-3xl font-dancing text-pink-600 mb-4">
              {quizScore === quizQuestions.length
                ? 'Perfect Score!'
                : quizScore >= quizQuestions.length / 2
                ? 'Great Job!'
                : 'You Know Our Love So Well!'}
            </h3>
            <p className="text-lg font-poppins text-gray-700 mb-6">
              You got {quizScore} out of {quizQuestions.length} questions right!
            </p>
            <p className="text-pink-600 font-poppins mb-8">
              No matter the score, you know what matters most - how much we love each other across the miles! 💖
            </p>
            <button
              onClick={resetQuiz}
              className="bg-gradient-to-r from-pink-400 to-purple-400 text-white py-3 px-6 rounded-full font-poppins mr-4 hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderPuzzle = () => (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-pink-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-dancing text-pink-600">Heart Puzzle</h3>
          <button
            onClick={resetPuzzle}
            className="bg-gradient-to-r from-gray-400 to-gray-500 text-white py-2 px-4 rounded-full font-poppins text-sm hover:from-gray-500 hover:to-gray-600 transition-all duration-300"
          >
            <RotateCcw className="w-4 h-4 inline mr-1" />
            Reset
          </button>
        </div>

        {puzzleCompleted && (
          <div className="mb-6 p-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl">
            <div className="text-4xl mb-2">🎉</div>
            <p className="text-pink-600 font-poppins">
              Puzzle completed in {puzzleTime} seconds! Our love fits together perfectly! 💖
            </p>
          </div>
        )}

        <div className="grid grid-cols-4 gap-1 max-w-xs mx-auto mb-6 bg-pink-100 p-4 rounded-2xl">
          {puzzlePieces.map((piece, index) => (
            <div
              key={index}
              className={`aspect-square rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 ${
                piece === 15
                  ? 'bg-transparent'
                  : `bg-gradient-to-br from-pink-${200 + (piece % 3) * 100} to-purple-${
                      200 + (piece % 3) * 100
                    } hover:scale-105 shadow-md`
              }`}
              onClick={() => handlePuzzlePieceClick(index)}
            >
              {piece !== 15 && (
                <span className="text-lg font-bold text-white">
                  {['💖', '📱', '✨', '💕', '🌍', '🌟', '💝', '📹', '💖', '🎵', '💌', '🌹', '💍', '👫', '🏠'][piece]}
                </span>
              )}
            </div>
          ))}
        </div>

        <p className="text-gray-600 font-poppins text-sm">
          Click pieces next to the empty space to move them. Arrange them in order!
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-green-100 via-blue-50 to-purple-100">
      <div className="max-w-6xl mx-auto py-8">
        <div className="text-center mb-8">
          <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-dancing text-pink-600 mb-4">
            Fun & Games
          </h1>
          <p className="text-lg font-poppins text-gray-600 mb-6">
            Let's play together and create more virtual memories!
          </p>
          {currentGame !== 'menu' && (
            <button
              onClick={() => {
                setCurrentGame('menu');
                tracker.trackClick('back_to_games_menu');
              }}
              className="bg-gradient-to-r from-gray-400 to-gray-500 text-white py-2 px-6 rounded-full font-poppins text-sm hover:from-gray-500 hover:to-gray-600 transition-all duration-300 mb-8"
            >
              Back to Games
            </button>
          )}
        </div>

        {currentGame === 'menu' && renderGameMenu()}
        {currentGame === 'quiz' && renderQuiz()}
        {currentGame === 'puzzle' && renderPuzzle()}

        <div className="text-center mt-12">
          <button
            onClick={handleComplete}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 px-8 rounded-full font-poppins font-medium text-lg hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Next Surprise
            <ArrowRight className="w-5 h-5 inline ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiniGames;