import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaRocket, 
  FaPalette, 
  FaCode, 
  FaGithub, 
  FaDownload, 
  FaMagic,
  FaChartLine,
  FaShield,
  FaCog
} from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: FaMagic,
      title: 'AI Destekli Oluşturma',
      description: 'Yapay zeka ile otomatik olarak profesyonel README içeriği oluşturun',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FaPalette,
      title: 'Özelleştirilebilir Temalar',
      description: 'Farklı renk şemaları ve tasarım stilleri ile kişiselleştirin',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FaChartLine,
      title: 'GitHub İstatistikleri',
      description: 'Otomatik GitHub stats, contribution graphs ve activity widgets',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: FaCode,
      title: 'Kod Snippet\'leri',
      description: 'Hazır kod blokları ve teknoloji badge\'leri ile zenginleştirin',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: FaRocket,
      title: 'Hızlı Kurulum',
      description: 'Dakikalar içinde profesyonel README dosyanızı oluşturun',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: FaDownload,
      title: 'Anında İndirme',
      description: 'Oluşturduğunuz README\'yi anında Markdown formatında indirin',
      color: 'from-teal-500 to-blue-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="özellikler" className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Güçlü Özellikler</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            GitHub profilinizi bir sonraki seviyeye taşıyacak modern araçlar ve özellikler
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="glass-effect p-8 rounded-2xl hover:shadow-2xl hover:shadow-primary-500/20 transition-all duration-300 group"
            >
              <div className="relative mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} shadow-lg`}
                >
                  <feature.icon className="text-3xl text-white" />
                </motion.div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary-500 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary-500 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className={`h-1 bg-gradient-to-r ${feature.color} rounded-full mt-6`}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 0 30px rgba(0, 217, 255, 0.5)" 
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-4 rounded-full text-white font-bold text-lg flex items-center space-x-3 mx-auto hover:shadow-2xl transition-all duration-300"
          >
            <FaGithub className="text-xl" />
            <span>Tüm Özellikleri Keşfet</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;