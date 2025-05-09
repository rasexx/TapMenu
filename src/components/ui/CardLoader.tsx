
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
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }} // Ensures it stays visible until exit
          exit={{ opacity: 0, transition: { duration: 1 } }} // Main loader fade out
          aria-live="polite"
          aria-busy={isLoading}
          role="status"
        >
          <motion.div
            className="relative w-80 h-80" // Container for Lottie animations
            initial={{ scale: 1, opacity: 1 }} // Start visible and at normal scale
            animate={{ scale: [1, 1.2, 1], opacity: [1, 1, 0] }} // Card animation sequence: scale pulse and fade out
            transition={{ duration: 3 }} // Duration of the card animation sequence
          >
            <Lottie
              animationData={cardApproach}
              loop={false} // Card approach animation should not loop
              className="absolute inset-0 z-10 w-full h-full"
              aria-label="NFC card approaching animation"
            />
            <div className="absolute inset-0 z-0">
              <Lottie
                animationData={pulseEffect}
                loop // Pulse effect should loop
                className="w-full h-full drop-shadow-[0_0_15px_#4FD1C5]" // Pulse with glow
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
