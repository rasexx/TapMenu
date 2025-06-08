"use client";

import React from 'react';
import { motion } from 'framer-motion';

export function EmbeddedPresentation() {
  return (
    <section className="bg-background dark:bg-metal-base py-8 md:py-16">
      <div className="container mx-auto max-w-5xl px-4 md:px-8 lg:px-16 space-y-16">
        {/* Presentación 1: NFC */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 text-primary dark:text-metal-accent">
            Descubre el Poder del NFC
          </h2>
          <p className="text-center text-base text-muted-foreground dark:text-metal-soft/80 mb-6 leading-relaxed">
            Explora en esta presentación interactiva cómo la tecnología NFC va a transformar la industria Colombiana.
          </p>
          <div
            className="bg-card dark:bg-metal-soft/10 presentation-embed-box"
          >
            <iframe
              loading="lazy"
              className="presentation-iframe"
              src="https://www.canva.com/design/DAGnERsj8Lw/ISdlw_1U86AstIOvKuaUyw/view?embed"
              allow="fullscreen"
              title="Presentación sobre el Poder del NFC"
              aria-label="Presentación embebida de Canva sobre NFC"
            />
          </div>
        </motion.div>

        {/* Presentación 2: Marketing */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 text-primary dark:text-metal-accent">
            Marketing en Circuito Inteligente
          </h2>
          <p className="text-center text-base text-muted-foreground dark:text-metal-soft/80 mb-6 leading-relaxed">
            Descubre cómo nuestra agencia aliada de IA y Marketing potencia las experiencias digitales y transforma las estrategias de negocio.
          </p>
          <div
            className="bg-card dark:bg-metal-soft/10 presentation-embed-box"
          >
            <iframe
              loading="lazy"
              className="presentation-iframe"
              src="https://www.canva.com/design/DAGo_M_odCQ/jFJe1_PAHWPlpOXSpTI8zA/view?embed"
              allow="fullscreen"
              title="Presentación de Aliada Marketing"
              aria-label="Presentación embebida de Canva sobre marketing inteligente"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
