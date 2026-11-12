import React, { Component, ReactNode } from 'react';
import { Lottie, LottieHandle } from 'lottie-react';

interface LottiePlayerProps {
  animationData: any;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
  lottieRef?: React.Ref<LottieHandle>;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class LottieErrorBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('Lottie player encountered error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="w-full h-full flex items-center justify-center p-4 text-xs text-[#706B62] bg-[#E8DCC8]/30 rounded-2xl">
          Animation placeholder
        </div>
      );
    }
    return this.props.children;
  }
}

export const LottiePlayer: React.FC<LottiePlayerProps> = ({
  animationData,
  loop = true,
  autoplay = true,
  className = '',
  style,
  onComplete,
  lottieRef,
  fallback,
}) => {
  return (
    <LottieErrorBoundary fallback={fallback}>
      <div className={`relative flex items-center justify-center overflow-hidden ${className}`} style={style}>
        <Lottie
          lottieRef={lottieRef}
          src={animationData}
          loop={loop}
          autoplay={autoplay}
          subscriptions={onComplete ? { complete: onComplete } : undefined}
          className="w-full h-full object-contain"
        />
      </div>
    </LottieErrorBoundary>
  );
};
