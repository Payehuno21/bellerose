// Archivo: src/components/LoginPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import WelcomeAnimation from './WelcomeAnimation';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setShowWelcome(true);
      setTimeout(() => navigate('/dashboard'), 5000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (showWelcome) {
    return <WelcomeAnimation user="Rossy" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #fbd5e5, #fdeaf2, #fbcfe8, #f7bba6, #ffdee4, #f8e6c1, #f4d7a1, #b68d40)',
          backgroundSize: '400% 400%',
        }}
        animate={{
          backgroundPosition: [
            '0% 50%',
            '25% 75%',
            '50% 100%',
            '75% 25%',
            '100% 50%',
            '75% 75%',
            '50% 0%',
            '25% 25%',
            '0% 50%',
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="relative z-10 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 w-full max-w-sm mx-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="mb-6 text-center">
          <img src="/logo.png" alt="Belle Rose Logo" className="mx-auto h-20 w-auto drop-shadow-md" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}

          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Correo Electrónico
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 border-gray-300 focus-within:ring-2 focus-within:ring-pink-300">
              <AiOutlineMail className="text-pink-400 mr-2 text-lg" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tucorreo@ejemplo.com"
                className="w-full focus:outline-none bg-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Contraseña
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 border-gray-300 focus-within:ring-2 focus-within:ring-pink-300">
              <AiOutlineLock className="text-pink-400 mr-2 text-lg" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="w-full focus:outline-none bg-transparent"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg font-semibold text-white bg-[#b68d40] hover:bg-[#a57d36] transition disabled:opacity-50"
          >
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
