// Archivo: src/components/WelcomeAnimation.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function WelcomeAnimation({ user }: { user: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-yellow-100 text-center p-6 animate-gradient-x">
      <motion.img
        src="/logo.png"
        alt="Belle Rose Logo"
        className="h-40 w-auto mb-8 drop-shadow-2xl"
        initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
        animate={{ scale: [0.5, 1.2, 1], rotate: [0, 10, -5, 0], opacity: 1 }}
        transition={{ duration: 2.5, ease: 'easeInOut' }}
      />

      <motion.h1
        className="text-5xl font-extrabold text-rose-500"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        ¡Bienvenida, {user}!
      </motion.h1>

      <motion.p
        className="mt-3 text-lg text-rose-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        Nos alegra tenerte de regreso 💖
      </motion.p>

      <motion.div
        className="mt-8 flex items-center gap-2 text-rose-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.6, 1] }}
        transition={{ delay: 3, duration: 1.5, repeat: Infinity }}
      >
        <AiOutlineLoading3Quarters className="text-2xl animate-spin" />
        <p className="text-sm">Cargando panel...</p>
      </motion.div>
    </div>
  );
}
