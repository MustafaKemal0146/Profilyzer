import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram, 
  FaHeart,
  FaCode,
  FaRocket,
  FaStar
} from 'react-icons/fa';

const Footer = () => {
  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/MustafaKemal0146', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/mustafakemal0146', label: 'LinkedIn' },
    { icon: FaTwitter, href: 'https://twitter.com/mustafakemal0146', label: 'Twitter' },
    { icon: FaInstagram, href: 'https://instagram.com/mustafakemal0146', label: 'Instagram' }
  ];

  const quickLinks = [
    { name: 'Ana Sayfa', href: '#ana-sayfa' },
    { name: 'Özellikler', href: '#özellikler' },
    { name: 'Generator', href: '#generator' },
    { name: 'GitHub', href: 'https://github.com/MustafaKemal0146/Profilyzer' }
  ];

  return (
    <footer className="relative py-20 px-6 mt-20">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/50 to-transparent"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <FaCode className="text-4xl text-primary-500" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold gradient-text">Profilyzer</h3>
                <p className="text-gray-400 text-sm">GitHub Profile Builder</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              Profesyonel GitHub profil README dosyaları oluşturmak için modern, 
              AI destekli araçlar sunan açık kaynak platform.
            </p>

            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center space-x-2 text-primary-500"
              >
                <FaStar className="text-lg" />
                <span className="font-semibold">1.2K+ Stars</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center space-x-2 text-green-500"
              >
                <FaRocket className="text-lg" />
                <span className="font-semibold">Open Source</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h4 className="text-xl font-bold text-white mb-4">Hızlı Bağlantılar</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary-500 transition-colors duration-300 flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 bg-primary-500 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                    <span>{link.name}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h4 className="text-xl font-bold text-white mb-4">Beni Takip Et</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-gradient-to-r from-primary-500/20 to-primary-600/20 rounded-full flex items-center justify-center text-primary-500 hover:text-white hover:from-primary-500 hover:to-primary-600 transition-all duration-300 border border-primary-500/30 hover:border-primary-500"
                  title={social.label}
                >
                  <social.icon className="text-xl" />
                </motion.a>
              ))}
            </div>

            <div className="glass-effect p-4 rounded-xl">
              <p className="text-sm text-gray-300 mb-2">⭐ Projeyi beğendiyseniz GitHub'da yıldızlamayı unutmayın!</p>
              <motion.a
                href="https://github.com/MustafaKemal0146/Profilyzer"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-2 rounded-lg text-white font-medium text-sm hover:shadow-lg transition-all duration-300"
              >
                <FaGithub />
                <span>Star on GitHub</span>
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-300">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <FaHeart className="text-red-500" />
              </motion.div>
              <span>by</span>
              <a
                href="https://github.com/MustafaKemal0146"
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-text font-semibold hover:underline"
              >
                Mustafa Kemal Çıngıl
              </a>
            </div>

            <div className="text-gray-400 text-sm">
              © 2025 Profilyzer. Tüm hakları saklıdır.
            </div>
          </div>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 2, delay: 0.8 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-primary-500 via-purple-500 to-primary-500 rounded-full mt-8"
          />
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary-500/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '-2s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '-4s' }}></div>
    </footer>
  );
};

export default Footer;