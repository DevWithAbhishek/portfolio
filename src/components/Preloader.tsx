import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 1800; // 1.8 seconds
    const interval = 20;
    const increment = (100 * interval) / duration;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  // SVG circle properties
  const size = 280;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center bg-background transition-all duration-600',
        isExiting && 'preloader-exit'
      )}
    >
      {/* Outer ambient glow layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-orb-breathe" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-[80px] animate-orb-breathe" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-accent/20 rounded-full blur-[60px] animate-orb-breathe" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main circular loader container */}
      <div className="relative flex items-center justify-center">
        {/* Outer rotating gradient ring */}
        <div className="absolute w-[320px] h-[320px] animate-ring-rotate">
          <div className="absolute inset-0 rounded-full border-2 border-transparent" 
               style={{ 
                 background: 'linear-gradient(hsl(var(--background)), hsl(var(--background))) padding-box, linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)), hsl(var(--primary))) border-box',
                 opacity: 0.4
               }} 
          />
        </div>

        {/* Second rotating ring (opposite direction) */}
        <div className="absolute w-[340px] h-[340px] animate-ring-rotate-reverse">
          <div className="absolute inset-0 rounded-full border border-primary/20" />
        </div>

        {/* Inner pulsing orb */}
        <div className="absolute w-[180px] h-[180px] rounded-full bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/10 blur-2xl animate-orb-breathe" />
        <div className="absolute w-[120px] h-[120px] rounded-full bg-gradient-to-tr from-accent/20 via-primary/15 to-secondary/10 blur-xl animate-orb-breathe" style={{ animationDelay: '0.7s' }} />

        {/* SVG Progress Ring */}
        <svg
          width={size}
          height={size}
          className="relative z-10 -rotate-90 animate-progress-glow"
        >
          {/* Background ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth={strokeWidth}
            opacity={0.3}
          />
          {/* Progress ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-100 ease-out"
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="50%" stopColor="hsl(var(--secondary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <h1 
            className={cn(
              'font-display text-xl md:text-2xl font-bold gradient-text transition-all duration-500 text-center leading-tight',
              isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            )}
          >
            CodeWith<br/>Abhishek
          </h1>
          <span 
            className={cn(
              'text-muted-foreground text-sm font-mono mt-3 transition-all duration-300',
              isExiting && 'opacity-0'
            )}
          >
            {Math.round(progress)}%
          </span>
        </div>

        {/* Decorative dots on the ring */}
        <div className="absolute w-[280px] h-[280px] animate-ring-rotate" style={{ animationDuration: '12s' }}>
          {[0, 90, 180, 270].map((angle) => (
            <div
              key={angle}
              className="absolute w-1.5 h-1.5 bg-primary rounded-full glow-purple"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${angle}deg) translateY(-140px) translateX(-50%)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
