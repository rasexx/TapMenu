
'use client'

import type { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import cardApproach from '@/assets/lottie/nfc-card-approach.json';
import pulseEffect from '@/assets/lottie/nfc-pulse.json';

interface CardLoaderProps {
  isLoading: boolean;
}

const CardLoader: FC<CardLoaderProps> = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-metal-base"
          initial={{ opacity: 1 }} // As per prompt, though 0 might be more typical for fade-in
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1 } }} // 1s exit duration
          aria-live="polite"
          aria-busy={isLoading}
          role="status"
        >
          <motion.div
            className="relative w-80 h-80" // w-64 h-64 in previous, now w-80 h-80
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: [1, 1.05, 1], opacity: [0, 1, 1] }}
            transition={{ duration: 2 }} // 2s animation for scale and opacity
          >
            <Lottie
              animationData={cardApproach}
              loop={false} // cardApproach is not looped
              className="absolute z-10 w-full h-full"
              aria-label="NFC card approaching animation"
            />
            <div className="absolute inset-0 z-0">
              <Lottie 
                animationData={pulseEffect} 
                loop // pulseEffect is looped
                className="w-full h-full drop-shadow-[0_0_15px_#4FD1C5]" // Apply drop shadow to pulse
                aria-label="Data pulse effect animation"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CardLoader;
