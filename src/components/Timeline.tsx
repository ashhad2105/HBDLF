import React, { useState } from 'react';
import { Heart, Calendar, ArrowRight, Video, Plane } from 'lucide-react';
import { tracker } from '../utils/interactionTracker';

interface TimelineProps {
  onComplete: () => void;
}

const Timeline: React.FC<TimelineProps> = ({ onComplete }) => {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  const timelineEvents = [
    {
      date: 'January 01, 2022',
      title: "First 'I Love You'",
      description: 'The moment we both said those three little words',
      emoji: '💖',
      icon: <Heart className="w-6 h-6" />,
      memory: 'We were texting at 11:55 PM, and it just felt so right. Finally said the three magical words at 12AM',
    },
    {
      date: 'August 17, 2024',
      title: 'First Video Call',
      description: 'Seeing your beautiful face for the first time in video call',
      emoji: '📹',
      icon: <Video className="w-6 h-6" />,
      memory: 'We were so nervous, but your smile lit up my entire screen and my heart.',
    },
    {
      date: '2024',
      title: 'Planning Our Future',
      description: 'When we started seriously talking about closing the distance',
      emoji: '✈️',
      icon: <Plane className="w-6 h-6" />,
      memory: 'That night we stayed up until 2AM planning our life together. Every dream felt possible with you.',
    },
    {
      date: 'June 14, 2025',
      title: 'The Proposal',
      description: 'When my parents came to your house',
      emoji: '💍',
      icon: <Heart className="w-6 h-6" />,
      memory: 'Even though I was not there with you but that day was very special for us. After that day my love for you increased more and more',
    },
    {
      date: 'Today',
      title: 'Your Birthday',
      description: 'Celebrating the most amazing person in my world',
      emoji: '🎂',
      icon: <Heart className="w-6 h-6" />,
      memory: 'Today we celebrate you, and every day I get to love you sooooo much, even from miles away.',
    },
    {
      date: '2026/2027',
      title: 'Our Wedding Day',
      description: 'The day we finally become husband and wife',
      emoji: '👰‍♀️',
      icon: <Heart className="w-6 h-6" />,
      memory: "The day I've been dreaming about - when distance becomes just a memory and forever begins.",
    },
  ];

  const handleEventClick = (index: number) => {
    setSelectedEvent(selectedEvent === index ? null : index);
    tracker.trackTimelineEvent(index);
  };

  const handleContinue = () => {
    tracker.trackClick('continue_timeline', { 
      eventsViewed: selectedEvent !== null ? 1 : 0 
    });
    onComplete();
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      <div className="max-w-6xl mx-auto py-8">
        <div className="text-center mb-12">
          <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-dancing text-pink-600 mb-4">
            Our Love Story Across the Miles
          </h1>
          <p className="text-lg font-poppins text-gray-600">
            Every moment has led us to this beautiful love story, despite the distance
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-300 to-purple-300"></div>

          {timelineEvents.map((event, index) => (
            <div key={index} className="relative mb-8 md:mb-12">
              <div className="md:hidden">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-pink-200">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-4">{event.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center text-pink-500 font-poppins text-sm mb-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        {event.date}
                      </div>
                      <h3 className="text-xl font-dancing text-gray-800 mb-2">
                        {event.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-600 font-poppins mb-4">
                    {event.description}
                  </p>

                  <button
                    onClick={() => handleEventClick(index)}
                    className="w-full bg-gradient-to-r from-pink-100 to-purple-100 hover:from-pink-200 hover:to-purple-200 text-pink-600 py-2 px-4 rounded-full font-poppins text-sm transition-all duration-300"
                  >
                    {selectedEvent === index ? 'Hide Memory' : 'Read Memory'}
                  </button>

                  {selectedEvent === index && (
                    <div className="mt-4 p-4 bg-pink-50 rounded-2xl animate-fade-in">
                      <p className="text-gray-700 font-poppins italic">
                        "{event.memory}"
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className={`hidden md:flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full border-4 border-white shadow-lg z-10 flex items-center justify-center">
                  <div className="text-white text-xs">{event.icon}</div>
                </div>

                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div
                    className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-pink-200 cursor-pointer transform transition-all duration-300 hover:scale-105"
                    onClick={() => handleEventClick(index)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`${index % 2 === 0 ? 'order-2' : 'order-1'}`}>
                        <span className="text-3xl">{event.emoji}</span>
                      </div>
                      <div className={`${index % 2 === 0 ? 'order-1 text-right' : 'order-2 text-left'}`}>
                        <div className="flex items-center text-pink-500 font-poppins text-sm mb-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          {event.date}
                        </div>
                        <h3 className="text-xl font-dancing text-gray-800 mb-2">
                          {event.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-600 font-poppins">
                      {event.description}
                    </p>

                    {selectedEvent === index && (
                      <div className="mt-4 p-4 bg-pink-50 rounded-2xl animate-fade-in">
                        <p className="text-gray-700 font-poppins italic">
                          "{event.memory}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto border border-pink-200 mb-8">
            <h3 className="text-2xl font-dancing text-pink-600 mb-4">
              Distance Means Nothing When Love Means Everything
            </h3>
            <p className="text-lg font-poppins text-gray-700 leading-relaxed">
              Every video call, every text message, every 'good morning' and
              'good night' has been building towards our forever. Soon we'll
              never have to say goodbye through a screen again. Here's to
              closing the distance and opening our hearts to a lifetime
              together! 💖
            </p>
          </div>

          <button
            onClick={handleContinue}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 px-8 rounded-full font-poppins font-medium text-lg hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Continue Our Adventure
            <ArrowRight className="w-5 h-5 inline ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timeline;