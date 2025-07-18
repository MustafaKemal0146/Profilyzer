import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaGithub, FaCode, FaStar, FaUsers, FaDownload } from 'react-icons/fa';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Profilyzer ile README Oluşturun';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    { icon: FaStar, value: '1.2K+', label: 'GitHub Stars' },
    { icon: FaUsers, value: '500+', label: 'Kullanıcı' },
    { icon: FaDownload, value: '10K+', label: 'İndirme' },
  ];

  return (
    <section id="ana-sayfa" className="min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <FaRocket className="text-6xl md:text-8xl text-primary-500 animate-bounce" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full animate-ping"></div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-4xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="gradient-text">{typedText}</span>
            <span className="animate-pulse text-primary-500">|</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Profesyonel, modern ve etkileyici GitHub profil README dosyaları oluşturun. 
            <span className="gradient-text font-semibold"> AI destekli</span> araçlarla 
            dakikalar içinde harika profiller yaratın!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 217, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-4 rounded-full text-white font-bold text-lg flex items-center space-x-3 hover:shadow-2xl transition-all duration-300 animate-glow"
            >
              <FaCode className="text-xl" />
              <span>Hemen Başla</span>
            </motion.button>

            <motion.a
              href="https://github.com/MustafaKemal0146/Profilyzer"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-effect px-8 py-4 rounded-full text-white font-bold text-lg flex items-center space-x-3 neon-border hover:bg-white/10 transition-all duration-300"
            >
              <FaGithub className="text-xl" />
              <span>GitHub'da Görüntüle</span>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, y: -10 }}
                className="glass-effect p-6 rounded-xl text-center hover:shadow-lg hover:shadow-primary-500/20 transition-all duration-300"
              >
                <stat.icon className="text-3xl text-primary-500 mx-auto mb-3" />
                <div className="text-2xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.8 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-primary-500 text-2xl cursor-pointer"
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;