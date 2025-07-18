import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { 
  FaGripVertical, 
  FaEye, 
  FaEyeSlash, 
  FaCog, 
  FaTrash,
  FaPlus,
  FaUser,
  FaCode,
  FaChartLine,
  FaTrophy,
  FaQuoteLeft,
  FaProjectDiagram
} from 'react-icons/fa';

const DragDropEditor = ({ sections, onSectionsChange, onSectionToggle, onSectionDelete }) => {
  const [selectedSection, setSelectedSection] = useState(null);

  const sectionTypes = {
    header: {
      name: 'Başlık',
      icon: FaUser,
      color: 'from-blue-500 to-blue-600',
      description: 'İsim, başlık ve typing animasyonu'
    },
    social: {
      name: 'Sosyal Medya',
      icon: FaCode,
      color: 'from-purple-500 to-purple-600',
      description: 'Sosyal medya bağlantıları'
    },
    skills: {
      name: 'Yetenekler',
      icon: FaCode,
      color: 'from-green-500 to-green-600',
      description: 'Teknoloji rozetleri ve yetenekler'
    },
    stats: {
      name: 'GitHub İstatistikleri',
      icon: FaChartLine,
      color: 'from-orange-500 to-orange-600',
      description: 'GitHub stats, diller, streak'
    },
    trophies: {
      name: 'Başarılar',
      icon: FaTrophy,
      color: 'from-yellow-500 to-yellow-600',
      description: 'GitHub trophies ve rozetler'
    },
    projects: {
      name: 'Projeler',
      icon: FaProjectDiagram,
      color: 'from-red-500 to-red-600',
      description: 'Öne çıkan projeler'
    },
    quotes: {
      name: 'Sözler',
      icon: FaQuoteLeft,
      color: 'from-indigo-500 to-indigo-600',
      description: 'Rastgele geliştirici sözleri'
    },
    activity: {
      name: 'Aktivite',
      icon: FaChartLine,
      color: 'from-teal-500 to-teal-600',
      description: 'Commit aktivite grafiği'
    }
  };

  const addSection = (type) => {
    const newSection = {
      id: Date.now(),
      type,
      enabled: true,
      order: sections.length,
      config: {}
    };
    onSectionsChange([...sections, newSection]);
  };

  const SectionCard = ({ section }) => {
    const sectionInfo = sectionTypes[section.type];
    if (!sectionInfo) return null;

    return (
      <motion.div
        layout
        className={`glass-effect p-4 rounded-xl border-2 transition-all duration-300 ${
          section.enabled 
            ? 'border-white/20 hover:border-primary-500/50' 
            : 'border-white/10 opacity-50'
        }`}
      >
        <div className="flex items-center space-x-4">
          {/* Drag Handle */}
          <div className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-white transition-colors">
            <FaGripVertical />
          </div>

          {/* Section Icon */}
          <div className={`p-3 rounded-lg bg-gradient-to-r ${sectionInfo.color}`}>
            <sectionInfo.icon className="text-white text-lg" />
          </div>

          {/* Section Info */}
          <div className="flex-1">
            <h4 className="text-white font-semibold">{sectionInfo.name}</h4>
            <p className="text-gray-400 text-sm">{sectionInfo.description}</p>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onSectionToggle(section.id)}
              className={`p-2 rounded-lg transition-colors ${
                section.enabled
                  ? 'text-green-400 hover:bg-green-400/20'
                  : 'text-gray-400 hover:bg-gray-400/20'
              }`}
            >
              {section.enabled ? <FaEye /> : <FaEyeSlash />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedSection(section)}
              className="p-2 rounded-lg text-blue-400 hover:bg-blue-400/20 transition-colors"
            >
              <FaCog />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onSectionDelete(section.id)}
              className="p-2 rounded-lg text-red-400 hover:bg-red-400/20 transition-colors"
            >
              <FaTrash />
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Sürükle & Bırak Editör</h3>
        <p className="text-gray-300">README bölümlerini sürükleyerek yeniden düzenleyin</p>
      </div>

      {/* Add Section Buttons */}
      <div className="glass-effect p-6 rounded-2xl">
        <h4 className="text-lg font-semibold text-white mb-4">Bölüm Ekle</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(sectionTypes).map(([type, info]) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addSection(type)}
              className={`p-3 rounded-xl bg-gradient-to-r ${info.color} text-white font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2`}
            >
              <info.icon className="text-sm" />
              <span className="text-sm">{info.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Sections List */}
      <div className="glass-effect p-6 rounded-2xl">
        <h4 className="text-lg font-semibold text-white mb-4">README Bölümleri</h4>
        
        {sections.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl text-gray-600 mb-4">📝</div>
            <p className="text-gray-400">Henüz bölüm eklenmemiş</p>
            <p className="text-gray-500 text-sm">Yukarıdaki butonları kullanarak bölüm ekleyin</p>
          </div>
        ) : (
          <Reorder.Group
            axis="y"
            values={sections}
            onReorder={onSectionsChange}
            className="space-y-3"
          >
            {sections.map((section) => (
              <Reorder.Item
                key={section.id}
                value={section}
                className="cursor-grab active:cursor-grabbing"
              >
                <SectionCard section={section} />
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
      </div>

      {/* Section Configuration Modal */}
      {selectedSection && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedSection(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass-effect p-6 rounded-2xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-xl font-bold text-white mb-4">
              {sectionTypes[selectedSection.type]?.name} Ayarları
            </h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Bölüm Adı
                </label>
                <input
                  type="text"
                  defaultValue={sectionTypes[selectedSection.type]?.name}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="section-enabled"
                  checked={selectedSection.enabled}
                  onChange={(e) => onSectionToggle(selectedSection.id)}
                  className="w-4 h-4 text-primary-500 bg-transparent border-2 border-white/20 rounded focus:ring-primary-500"
                />
                <label htmlFor="section-enabled" className="text-white">
                  Bu bölümü göster
                </label>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedSection(null)}
                className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white py-2 px-4 rounded-lg font-medium"
              >
                Kaydet
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedSection(null)}
                className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20 transition-colors"
              >
                İptal
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Preview Order */}
      <div className="glass-effect p-6 rounded-2xl">
        <h4 className="text-lg font-semibold text-white mb-4">Önizleme Sırası</h4>
        <div className="flex flex-wrap gap-2">
          {sections
            .filter(section => section.enabled)
            .map((section, index) => (
              <div
                key={section.id}
                className="flex items-center space-x-2 bg-primary-500/20 text-primary-400 px-3 py-1 rounded-full text-sm"
              >
                <span>{index + 1}.</span>
                <span>{sectionTypes[section.type]?.name}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DragDropEditor;