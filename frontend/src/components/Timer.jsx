import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

const Timer = forwardRef((props, ref) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    let interval;
    
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isRunning]);
  
  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };
  
  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };
  
  // Format time to display as HH:MM:SS.MS
  const formatTime = () => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    
    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0'),
      milliseconds: milliseconds.toString().padStart(2, '0')
    };
  };
  
  const { hours, minutes, seconds, milliseconds } = formatTime();
  
  // Expose methods to parent component through ref
  useImperativeHandle(ref, () => ({
    handleStartStop,
    handleReset,
    getTime: () => time
  }));

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 rounded-2xl shadow-2xl max-w-md mx-auto border border-indigo-400/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-300 rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="relative z-10 w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Response Time</h2>
          <div className="flex items-center">
            <div className={`h-3 w-3 rounded-full mr-2 ${isRunning ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
            <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
              {isRunning ? 'Recording' : 'Idle'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-center w-full mb-8">
          <div className="grid grid-flow-col gap-3 text-center auto-cols-max">
            <div className="flex flex-col p-3 bg-white/10 backdrop-blur-lg rounded-xl text-white border border-white/20 shadow-lg">
              <span className="font-mono text-5xl font-bold">{hours}</span>
              <span className="text-xs mt-1 text-indigo-200">hours</span>
            </div>
            <div className="flex flex-col p-3 bg-white/10 backdrop-blur-lg rounded-xl text-white border border-white/20 shadow-lg">
              <span className="font-mono text-5xl font-bold">{minutes}</span>
              <span className="text-xs mt-1 text-indigo-200">min</span>
            </div>
            <div className="flex flex-col p-3 bg-white/10 backdrop-blur-lg rounded-xl text-white border border-white/20 shadow-lg">
              <span className="font-mono text-5xl font-bold">{seconds}</span>
              <span className="text-xs mt-1 text-indigo-200">sec</span>
            </div>
            <div className="flex flex-col p-3 bg-white/10 backdrop-blur-lg rounded-xl text-white border border-white/20 shadow-lg">
              <span className="font-mono text-5xl font-bold">{milliseconds}</span>
              <span className="text-xs mt-1 text-indigo-200">ms</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 justify-center">
          <button 
            onClick={handleStartStop} 
            className={`px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg flex items-center ${isRunning 
              ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border border-red-400/30' 
              : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border border-green-400/30'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isRunning ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              ) : (
                <>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </>
              )}
            </svg>
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button 
            onClick={handleReset} 
            className="px-8 py-3 rounded-xl bg-gray-700 hover:bg-gray-800 font-semibold text-white transition-all duration-300 shadow-lg border border-gray-600/30 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
});


export default Timer;