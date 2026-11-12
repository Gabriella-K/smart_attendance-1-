import React, { useState, useRef, useEffect } from 'react';

interface StudentWalkingVideoProps {
  className?: string;
  fallbackImage?: string;
}

export const StudentWalkingVideo: React.FC<StudentWalkingVideoProps> = ({
  className = '',
  fallbackImage = '/src/assets/images/student_walking_fullbody_1794405683542.jpg',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setVideoLoaded(true);
      setHasError(false);
      video.play().catch(() => {
        // Autoplay policy fallback: muted is set so this usually passes
      });
    };

    const handleError = () => {
      setHasError(true);
      setVideoLoaded(false);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <div className={`relative w-full overflow-hidden flex items-end justify-center ${className}`}>
      {/* HTML5 Native Video Tag for /videos/student-walking.mp4 */}
      <video
        ref={videoRef}
        src="/videos/student-walking.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        className={`w-full h-full object-contain object-bottom select-none pointer-events-none transition-opacity duration-500 ${
          videoLoaded && !hasError ? 'opacity-100 z-10' : 'opacity-0 absolute inset-0'
        }`}
      />

      {/* Head-to-toe full-body grounded walking character when video asset is pending */}
      {(!videoLoaded || hasError) && fallbackImage && (
        <div className="relative w-full h-full flex flex-col items-center justify-end">
          <img
            src={fallbackImage}
            alt="African university student walking forward on campus"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain object-bottom select-none"
          />

          {/* Natural ground shadow */}
          <div className="absolute bottom-0 inset-x-8 h-4 bg-black/25 rounded-full blur-md pointer-events-none" />

          {/* Subtle asset path indicator tag (non-distracting, professional) */}
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-xs text-[10px] text-white/80 font-mono tracking-tight pointer-events-none">
            MP4 Video: /videos/student-walking.mp4
          </div>
        </div>
      )}
    </div>
  );
};
