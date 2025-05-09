
'use client'

import type { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import card3DAnimation from '@/assets/lottie/card-loader.json';

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
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          aria-live="polite"
          aria-busy={isLoading}
          role="status"
        >
          <Lottie
            animationData={card3DAnimation}
            loop
            className="w-64 h-64 drop-shadow-[0_0_15px_#4FD1C5]"
            aria-label="Loading animation: 3D card rotating"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CardLoader;
