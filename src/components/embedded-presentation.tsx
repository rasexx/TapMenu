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
            style={{
              position: 'relative',
              width: '100%',
              height: 0,
              paddingTop: '56.25%',
              marginTop: '1.6em',
              marginBottom: '0.9em',
              boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
              borderRadius: '8px',
              overflow: 'hidden',
              willChange: 'transform',
            }}
            className="bg-card dark:bg-metal-soft/10"
          >
            <iframe
              loading="lazy"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                border: 'none',
              }}
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
            style={{
              position: 'relative',
              width: '100%',
              height: 0,
              paddingTop: '56.25%',
              marginTop: '1.6em',
              marginBottom: '0.9em',
              boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
              borderRadius: '8px',
              overflow: 'hidden',
              willChange: 'transform',
            }}
            className="bg-card dark:bg-metal-soft/10"
          >
            <iframe
              loading="lazy"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                border: 'none',
              }}
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
