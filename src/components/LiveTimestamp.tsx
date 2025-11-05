'use client';

import { useState, useEffect } from 'react';

const LiveTimestamp = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: '2-digit' 
    });
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US');
  };

  return (
    <div className="flex items-center gap-4 text-sm text-gray-500">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        <span>live</span>
      </div>
      <div>
        {formatDate()}, {formatTime()}
      </div>
    </div>
  );
};

export default LiveTimestamp;
