import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSave, 
  FaFolder, 
  FaTrash, 
  FaDownload, 
  FaUpload, 
  FaEdit, 
  FaCopy,
  FaHeart,
  FaEye,
  FaCalendar,
  FaUser
} from 'react-icons/fa';

const ProfileManager = ({ currentProfile, onLoadProfile, onSaveProfile }) => {
  const [savedProfiles, setSavedProfiles] = useState([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [profileDescription, setProfileDescription] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    loadSavedProfiles();
  }, []);

  const loadSavedProfiles = () => {
    const saved = localStorage.getItem('github-readme-profiles');
    if (saved) {
      setSavedProfiles(JSON.parse(saved));
    }
  };

  const saveProfile = () => {
    if (!profileName.trim()) return;

    const newProfile = {
      id: Date.now(),
      name: profileName,
      description: profileDescription,
      data: currentProfile,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      likes: 0
    };

    const updatedProfiles = [...savedProfiles, newProfile];
    setSavedProfiles(updatedProfiles);
    localStorage.setItem('github-readme-profiles', JSON.stringify(updatedProfiles));
    
    setShowSaveModal(false);
    setProfileName('');
    setProfileDescription('');
  };

  const deleteProfile = (profileId) => {
    const updatedProfiles = savedProfiles.filter(p => p.id !== profileId);
    setSavedProfiles(updatedProfiles);
    localStorage.setItem('github-readme-profiles', JSON.stringify(updatedProfiles));
  };

  const loadProfile = (profile) => {
    // Increment view count
    const updatedProfiles = savedProfiles.map(p => 
      p.id === profile.id ? { ...p, views: p.views + 1 } : p
    );
    setSavedProfiles(updatedProfiles);
    localStorage.setItem('github-readme-profiles', JSON.stringify(updatedProfiles));
    
    onLoadProfile(profile.data);
    setShowLoadModal(false);
  };

  const exportProfile = (profile) => {
    const dataStr = JSON.stringify(profile, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${profile.name.replace(/\s+/g, '-').toLowerCase()}-profile.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importProfile = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedProfile = JSON.parse(e.target.result);
        const newProfile = {
          ...importedProfile,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        const updatedProfiles = [...savedProfiles, newProfile];
        setSavedProfiles(updatedProfiles);
        localStorage.setItem('github-readme-profiles', JSON.stringify(updatedProfiles));
      } catch (error) {
        alert('Geçersiz profil dosyası!');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const duplicateProfile = (profile) => {
    const duplicatedProfile = {
      ...profile,
      id: Date.now(),
      name: `${profile.name} (Kopya)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const updatedProfiles = [...savedProfiles, duplicatedProfile];
    setSavedProfiles(updatedProfiles);
    localStorage.setItem('github-readme-profiles', JSON.stringify(updatedProfiles));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Profil Yöneticisi</h3>
        <p className="text-gray-300">README profillerinizi kaydedin ve yönetin</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowSaveModal(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
        >
          <FaSave />
          <span>Profil Kaydet</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowLoadModal(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
        >
          <FaFolder />
          <span>Profil Yükle</span>
        </motion.button>

        <label className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 cursor-pointer">
          <FaUpload />
          <span>İçe Aktar</span>
          <input
            type="file"
            accept=".json"
            onChange={importProfile}
            className="hidden"
          />
        </label>
      </div>

      {/* Saved Profiles Grid */}
      {savedProfiles.length > 0 && (
        <div className="glass-effect p-6 rounded-2xl">
          <h4 className="text-lg font-semibold text-white mb-4">Kayıtlı Profiller ({savedProfiles.length})</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedProfiles.map((profile) => (
              <motion.div
                key={profile.id}
                whileHover={{ y: -2 }}
                className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-primary-500/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h5 className="text-white font-semibold truncate">{profile.name}</h5>
                    {profile.description && (
                      <p className="text-gray-400 text-sm mt-1 line-clamp-2">{profile.description}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <FaEye />
                    <span>{profile.views}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <FaCalendar />
                    <span>{new Date(profile.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaUser />
                    <span>{profile.data?.name || 'Anonim'}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => loadProfile(profile)}
                    className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-1 px-2 rounded text-sm font-medium transition-colors"
                  >
                    Yükle
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => duplicateProfile(profile)}
                    className="p-1 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition-colors"
                    title="Kopyala"
                  >
                    <FaCopy className="text-xs" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => exportProfile(profile)}
                    className="p-1 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 transition-colors"
                    title="Dışa Aktar"
                  >
                    <FaDownload className="text-xs" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => deleteProfile(profile.id)}
                    className="p-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors"
                    title="Sil"
                  >
                    <FaTrash className="text-xs" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Save Modal */}
      <AnimatePresence>
        {showSaveModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSaveModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-effect p-6 rounded-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h4 className="text-xl font-bold text-white mb-4">Profil Kaydet</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Profil Adı *
                  </label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    placeholder="Örn: Kişisel Profil"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Açıklama
                  </label>
                  <textarea
                    value={profileDescription}
                    onChange={(e) => setProfileDescription(e.target.value)}
                    placeholder="Bu profil hakkında kısa bir açıklama..."
                    rows="3"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 resize-none"
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={saveProfile}
                  disabled={!profileName.trim()}
                  className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white py-2 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Kaydet
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowSaveModal(false)}
                  className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20 transition-colors"
                >
                  İptal
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Load Modal */}
      <AnimatePresence>
        {showLoadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowLoadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-effect p-6 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h4 className="text-xl font-bold text-white mb-4">Profil Yükle</h4>
              
              {savedProfiles.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-6xl text-gray-600 mb-4">📁</div>
                  <p className="text-gray-400">Henüz kayıtlı profil yok</p>
                  <p className="text-gray-500 text-sm">Önce bir profil kaydedin</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedProfiles.map((profile) => (
                    <motion.div
                      key={profile.id}
                      whileHover={{ scale: 1.01 }}
                      className="bg-white/5 p-4 rounded-lg border border-white/10 hover:border-primary-500/30 transition-all duration-300 cursor-pointer"
                      onClick={() => loadProfile(profile)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h5 className="text-white font-semibold">{profile.name}</h5>
                          {profile.description && (
                            <p className="text-gray-400 text-sm mt-1">{profile.description}</p>
                          )}
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                            <span>{new Date(profile.createdAt).toLocaleDateString()}</span>
                            <span>{profile.views} görüntülenme</span>
                            <span>{profile.data?.name || 'Anonim'}</span>
                          </div>
                        </div>
                        <div className="text-primary-400">
                          <FaFolder />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              <div className="flex justify-end mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowLoadModal(false)}
                  className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20 transition-colors"
                >
                  Kapat
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileManager;