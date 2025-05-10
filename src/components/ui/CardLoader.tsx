
'use client'

import type { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import cardApproachAnimation from '@/assets/lottie/nfc-card-approach.json';
import pulseEffectAnimation from '@/assets/lottie/nfc-pulse.json';

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
          animate={{ opacity: 1 }} // Keep opacity 1 while visible
          exit={{ opacity: 0, transition: { duration: 1, delay: 0.5 } }} // Added delay for smoother exit after internal animations
          aria-live="polite"
          aria-busy={isLoading}
          role="status"
        >
          <motion.div
            className="relative w-80 h-80 flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [0.8, 1.05, 1], // Initial small, grow slightly, then normal
              opacity: [0, 1, 1]    // Fade in
            }}
            exit={{
                scale: 1.5, // Zoom out effect
                opacity: 0,
                transition: { duration: 0.5, ease: "easeIn" }
            }}
            transition={{ duration: 2,  times: [0, 0.5, 1] }} // Control timing of keyframes
          >
            {/* Card Approach Animation - plays once */}
            <motion.div
              className="absolute z-10 w-full h-full"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 1 } }}
            >
              <Lottie
                animationData={cardApproachAnimation}
                loop={false}
                className="w-full h-full drop-shadow-[0_0_15px_#4FD1C5]"
                aria-label="NFC card approaching animation"
              />
            </motion.div>

            {/* Pulse Effect Animation - loops, starts slightly later */}
            <motion.div
              className="absolute inset-0 z-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 1, duration: 0.5 } }} // Start pulse after card is visible
            >
              <Lottie
                animationData={pulseEffectAnimation}
                loop={true}
                className="w-full h-full opacity-70" // Slightly transparent pulse
                aria-label="NFC data pulse animation"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CardLoader;
