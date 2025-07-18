import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaEye, FaDownload, FaHeart, FaCode, FaGamepad, FaBriefcase, FaPalette } from 'react-icons/fa';

const TemplateGallery = ({ onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState([]);

  const templates = [
    {
      id: 1,
      name: 'Minimal Developer',
      category: 'minimal',
      author: 'DevMaster',
      rating: 4.8,
      downloads: 1250,
      views: 5420,
      preview: '/templates/minimal-dev.png',
      description: 'Clean and minimal design for professional developers',
      features: ['GitHub Stats', 'Skills', 'Contact'],
      config: {
        theme: 'github-dark',
        includeStats: true,
        includeTopLangs: true,
        includeStreak: false,
        layout: 'minimal'
      }
    },
    {
      id: 2,
      name: 'Creative Designer',
      category: 'creative',
      author: 'DesignPro',
      rating: 4.9,
      downloads: 890,
      views: 3210,
      preview: '/templates/creative-designer.png',
      description: 'Colorful and creative template for designers',
      features: ['Portfolio', 'Skills', 'Social Media', 'Projects'],
      config: {
        theme: 'radical',
        includeStats: true,
        includeTopLangs: true,
        includeActivity: true,
        layout: 'creative'
      }
    },
    {
      id: 3,
      name: 'Gaming Profile',
      category: 'gaming',
      author: 'GameDev',
      rating: 4.7,
      downloads: 2100,
      views: 8750,
      preview: '/templates/gaming-profile.png',
      description: 'Perfect for game developers and gaming enthusiasts',
      features: ['Snake Game', 'Trophies', 'Activity Graph', 'Gaming Stats'],
      config: {
        theme: 'tokyonight',
        includeSnake: true,
        includeTrophies: true,
        includeActivity: true,
        layout: 'gaming'
      }
    },
    {
      id: 4,
      name: 'Professional Business',
      category: 'professional',
      author: 'BizDev',
      rating: 4.6,
      downloads: 1580,
      views: 4320,
      preview: '/templates/professional-business.png',
      description: 'Corporate and professional template',
      features: ['Experience', 'Certifications', 'Skills', 'Contact'],
      config: {
        theme: 'github-dark',
        includeStats: true,
        includeVisitors: true,
        layout: 'professional'
      }
    },
    {
      id: 5,
      name: 'AI/ML Specialist',
      category: 'tech',
      author: 'AIExpert',
      rating: 4.9,
      downloads: 950,
      views: 2890,
      preview: '/templates/ai-ml-specialist.png',
      description: 'Specialized template for AI/ML developers',
      features: ['Research Papers', 'Models', 'Datasets', 'Publications'],
      config: {
        theme: 'dracula',
        includeStats: true,
        includeTopLangs: true,
        includeQuotes: true,
        layout: 'research'
      }
    },
    {
      id: 6,
      name: 'Full Stack Hero',
      category: 'tech',
      author: 'FullStackDev',
      rating: 4.8,
      downloads: 1750,
      views: 6540,
      preview: '/templates/fullstack-hero.png',
      description: 'Complete template for full-stack developers',
      features: ['Tech Stack', 'Projects', 'Experience', 'Blog'],
      config: {
        theme: 'onedark',
        includeStats: true,
        includeTopLangs: true,
        includeStreak: true,
        includeActivity: true,
        layout: 'fullstack'
      }
    }
  ];

  const categories = [
    { id: 'all', name: 'Tümü', icon: FaPalette },
    { id: 'minimal', name: 'Minimal', icon: FaCode },
    { id: 'creative', name: 'Yaratıcı', icon: FaPalette },
    { id: 'gaming', name: 'Oyun', icon: FaGamepad },
    { id: 'professional', name: 'Profesyonel', icon: FaBriefcase },
    { id: 'tech', name: 'Teknoloji', icon: FaCode }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const toggleFavorite = (templateId) => {
    setFavorites(prev => 
      prev.includes(templateId) 
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold gradient-text mb-4">Şablon Galerisi</h2>
        <p className="text-gray-300">Hazır şablonlardan birini seçin ve kişiselleştirin</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            <category.icon className="text-sm" />
            <span>{category.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="glass-effect rounded-2xl overflow-hidden group"
          >
            {/* Template Preview */}
            <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="text-6xl text-gray-600">📄</div>
              <div className="absolute top-4 right-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleFavorite(template.id)}
                  className={`p-2 rounded-full transition-colors duration-300 ${
                    favorites.includes(template.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:text-red-400'
                  }`}
                >
                  <FaHeart className="text-sm" />
                </motion.button>
              </div>
            </div>

            {/* Template Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{template.name}</h3>
                  <p className="text-sm text-gray-400">by {template.author}</p>
                </div>
                <div className="flex items-center space-x-1 text-yellow-400">
                  <FaStar className="text-xs" />
                  <span className="text-sm font-medium">{template.rating}</span>
                </div>
              </div>

              <p className="text-sm text-gray-300 mb-4">{template.description}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-4">
                {template.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary-500/20 text-primary-400 text-xs rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <FaEye className="text-xs" />
                    <span>{template.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaDownload className="text-xs" />
                    <span>{template.downloads}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectTemplate(template)}
                  className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                >
                  Kullan
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20 transition-colors duration-300"
                >
                  Önizle
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Upload Template */}
      <div className="text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
        >
          + Kendi Şablonunu Paylaş
        </motion.button>
      </div>
    </div>
  );
};

export default TemplateGallery;