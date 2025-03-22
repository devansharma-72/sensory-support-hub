
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedTransitionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  type?: 'fade' | 'slide' | 'scale' | 'blur';
}

const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  },
  scale: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
  },
  blur: {
    initial: { filter: 'blur(10px)', opacity: 0 },
    animate: { filter: 'blur(0px)', opacity: 1 },
    exit: { filter: 'blur(10px)', opacity: 0 },
  },
};

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({
  children,
  className,
  delay = 0,
  duration = 0.5,
  type = 'fade',
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className={className}>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={cn(className)}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants[type]}
        transition={{ 
          duration, 
          delay,
          ease: [0.19, 1, 0.22, 1] // Expo ease
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedTransition;
