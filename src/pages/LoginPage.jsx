import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { fadeIn } from '../utils/motion';
import { supabase } from '../lib/supabase';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      navigate('/admin/blog');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-0 bg-primary min-h-screen">
      <div className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
        <div className="flex items-center justify-center min-h-screen">
          <motion.div
            variants={fadeIn("up", "spring", 0.1, 1)}
            className="bg-tertiary p-8 rounded-2xl w-full max-w-md"
          >
            <h1 className={styles.sectionHeadText}>Administration</h1>
            <p className="mt-4 text-secondary">
              Connectez-vous pour gérer le blog
            </p>

            {error && (
              <div className="mt-4 bg-red-900/50 text-red-200 p-4 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="mt-8 flex flex-col gap-6">
              <div>
                <label className="text-white font-medium mb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black-100 py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium w-full"
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <div>
                <label className="text-white font-medium mb-2 block">
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black-100 py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium w-full"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 py-3 px-8 rounded-xl outline-none w-full text-white font-bold shadow-md shadow-primary disabled:opacity-50"
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
