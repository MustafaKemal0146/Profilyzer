import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaCode, FaRocket } from 'react-icons/fa';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'glass-effect backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="relative">
              <FaCode className="text-3xl text-primary-500 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full animate-ping"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Profilyzer</h1>
              <p className="text-xs text-gray-400">GitHub Profile Builder</p>
            </div>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-8">
            {['Ana Sayfa', 'Özellikler', 'Generator', 'Hakkında'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                whileHover={{ scale: 1.1, color: '#00D9FF' }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-300 hover:text-primary-500 transition-colors duration-300 font-medium"
              >
                {item}
              </motion.a>
            ))}
          </nav>

          <motion.a
            href="https://github.com/MustafaKemal0146/Profilyzer"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-2 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300"
          >
            <FaGithub className="text-lg" />
            <span className="hidden sm:inline">GitHub</span>
          </motion.a>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;