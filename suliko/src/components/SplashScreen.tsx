import { useState, useEffect } from 'react';
import sukiLogo from '../assets/suki.png';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(0.8);

  useEffect(() => {
    // Анимация появления
    const appearTimeout = setTimeout(() => {
      setScale(1);
    }, 100);

    // Показываем загрузочный экран минимум 2 секунды
    const minDisplayTime = setTimeout(() => {
      setOpacity(0);
    }, 2000);

    // Полностью скрываем через 2.5 секунды
    const hideTimeout = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(appearTimeout);
      clearTimeout(minDisplayTime);
      clearTimeout(hideTimeout);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500"
      style={{ opacity, backgroundColor: '#DC143C' }}
    >
      <div 
        className="flex flex-col items-center justify-center gap-6 transition-transform duration-500"
        style={{ transform: `scale(${scale})` }}
      >
        <img
          src={sukiLogo}
          alt="Сулико"
          className="w-40 h-40 object-contain"
          style={{
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}
        />
        <div className="flex gap-2">
          <div 
            className="w-2 h-2 rounded-full bg-white"
            style={{
              animation: 'loadingDot 1.4s ease-in-out infinite',
              animationDelay: '0s'
            }}
          />
          <div 
            className="w-2 h-2 rounded-full bg-white"
            style={{
              animation: 'loadingDot 1.4s ease-in-out infinite',
              animationDelay: '0.2s'
            }}
          />
          <div 
            className="w-2 h-2 rounded-full bg-white"
            style={{
              animation: 'loadingDot 1.4s ease-in-out infinite',
              animationDelay: '0.4s'
            }}
          />
        </div>
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        @keyframes loadingDot {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.7;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

