
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
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-metal-base" // Ensure high z-index
          initial={{ opacity: 0 }} // Start with opacity 0 for fade-in
          animate={{ opacity: 1, transition: { duration: 0.3 } }} // Animate to opacity 1
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <Lottie
            animationData={card3DAnimation}
            loop
            className="w-64 h-64 drop-shadow-[0_0_15px_#4FD1C5]" // metal.glow for shadow
            aria-label="Cargando animación"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CardLoader;
