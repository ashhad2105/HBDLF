import React, { useState } from 'react';
import { Heart, ArrowRight, Star, MapPin } from 'lucide-react';
import { tracker } from '../utils/interactionTracker';

interface FutureDreamsProps {
  onComplete: () => void;
}

const FutureDreams: React.FC<FutureDreamsProps> = ({ onComplete }) => {
  const [checkedDreams, setCheckedDreams] = useState<number[]>([]);

  const dreams = [
    {
      category: 'Our Wedding Dreams',
      icon: <Heart className="w-6 h-6" />,
      items: [
        'Walk down the aisle to you waiting at the altar 👰‍♀️',
        'Honeymoon in a romantic destination 🌴',
        'Take thousands of photos of our perfect day 📸',
        'Celebrate with all our loved ones together 🎉',
      ],
    },
    {
      category: 'Life Goals',
      icon: <Star className="w-6 h-6" />,
      items: [
        'Keeping our love secret 💼',
        'Write our love story in a book 📖',
        'Celebrate our 50th wedding anniversary 💖',
        'After every fight either of us should pamper one another',
        'Always share small and big things with each other',
        'Never leave each other in any situation',
        'Never share any private thing with other persons',
      ],
    },
    {
      category: 'Simple Moments',
      icon: <MapPin className="w-6 h-6" />,
      items: [
        'Wake up next to you every single day ☀️',
        'Never have to say goodbye through a screen again 📱',
        'Hold hands while walking everywhere 👫',
        'Fall asleep in your arms every night 🌙',
        'Create a million inside jokes together 😂',
      ],
    },
    {
      category: 'Family Dreams',
      icon: <Heart className="w-6 h-6" />,
      items: [
        'Build a beautiful family together 👨‍👩‍👧‍👦',
        'Teach our kids about how to be kind with everyone 💕',
        'Create family traditions and holiday memories 🎄',
        'Watch our children grow up in a home full of love 🏠',
        'Grow old together and tell our grandkids our story 👴👵',
      ],
    },
  ];

  const toggleDream = (categoryIndex: number, itemIndex: number) => {
    const dreamId = categoryIndex * 100 + itemIndex;
    const isCurrentlyChecked = checkedDreams.includes(dreamId);
    
    setCheckedDreams((prev) =>
      isCurrentlyChecked
        ? prev.filter((id) => id !== dreamId)
        : [...prev, dreamId]
    );
    
    tracker.trackDreamSelection(dreamId, !isCurrentlyChecked);
  };

  const isDreamChecked = (categoryIndex: number, itemIndex: number) => {
    const dreamId = categoryIndex * 100 + itemIndex;
    return checkedDreams.includes(dreamId);
  };

  const saveDreamsData = () => {
    const dreamsData = {
      checkedDreams,
      totalDreams: dreams.reduce((total, category) => total + category.items.length, 0),
      checkedCount: checkedDreams.length,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem('birthdayDreamsData', JSON.stringify(dreamsData));
    tracker.trackDreamsData(dreamsData);
  };

  const handleComplete = () => {
    saveDreamsData();
    tracker.trackClick('dreams_complete', { 
      totalSelected: checkedDreams.length 
    });
    onComplete();
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-sky-100 via-purple-50 to-pink-100">
      <div className="max-w-6xl mx-auto py-8">
        <div className="text-center mb-8">
          <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-dancing text-pink-600 mb-4">
            Our Dreams Together
          </h1>
          <p className="text-lg font-poppins text-gray-600">
            All the amazing things we'll do when we're finally together! Check off the ones that excite you most 💫
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
          {dreams.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-pink-200"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-pink-400 to-purple-400 text-white p-3 rounded-full mr-3">
                  {category.icon}
                </div>
                <h3 className="text-xl font-dancing text-pink-600">
                  {category.category}
                </h3>
              </div>

              <div className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className={`flex items-center p-3 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      isDreamChecked(categoryIndex, itemIndex)
                        ? 'bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-pink-300'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => toggleDream(categoryIndex, itemIndex)}
                  >
                    <input
                      type="checkbox"
                      checked={isDreamChecked(categoryIndex, itemIndex)}
                      readOnly
                      className="w-4 h-4 text-pink-500 rounded mr-3"
                    />
                    <span
                      className={`font-poppins text-sm ${
                        isDreamChecked(categoryIndex, itemIndex)
                          ? 'text-pink-600 font-medium'
                          : 'text-gray-700'
                      }`}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto border border-pink-200 mb-8">
            <div className="text-6xl mb-4">✨</div>
            <h3 className="text-2xl font-dancing text-pink-600 mb-4">
              Dreams are Better When Shared
            </h3>
            <p className="text-lg font-poppins text-gray-700 leading-relaxed">
              Every dream on this list becomes more beautiful because I get to share it with you. The distance has taught us to dream bigger, love deeper, and appreciate every moment. Soon we'll start checking these off together, one beautiful memory at a time! 💖
            </p>
            <div className="mt-6">
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-2 rounded-full font-poppins text-sm">
                Dreams Checked: {checkedDreams.length}
              </span>
            </div>
          </div>

          <button
            onClick={handleComplete}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 px-8 rounded-full font-poppins font-medium text-lg hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Final Surprises
            <ArrowRight className="w-5 h-5 inline ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FutureDreams;