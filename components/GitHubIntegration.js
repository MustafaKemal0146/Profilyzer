import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaSync, FaCheck, FaExclamationTriangle, FaUser, FaCode, FaStar } from 'react-icons/fa';

const GitHubIntegration = ({ onDataFetch }) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState('');
  const [connected, setConnected] = useState(false);

  const fetchGitHubData = async () => {
    if (!username.trim()) {
      setError('Lütfen GitHub kullanıcı adınızı girin');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Fetch user data
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!userResponse.ok) {
        throw new Error('Kullanıcı bulunamadı');
      }
      const user = await userResponse.json();

      // Fetch repositories
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=10`);
      const repositories = await reposResponse.json();

      // Fetch languages
      const languagesData = {};
      for (const repo of repositories.slice(0, 5)) {
        try {
          const langResponse = await fetch(repo.languages_url);
          const languages = await langResponse.json();
          Object.keys(languages).forEach(lang => {
            languagesData[lang] = (languagesData[lang] || 0) + languages[lang];
          });
        } catch (err) {
          console.log('Language fetch error for', repo.name);
        }
      }

      const processedData = {
        user: {
          name: user.name || user.login,
          username: user.login,
          bio: user.bio,
          location: user.location,
          company: user.company,
          blog: user.blog,
          twitter: user.twitter_username,
          followers: user.followers,
          following: user.following,
          publicRepos: user.public_repos,
          avatar: user.avatar_url,
          createdAt: user.created_at
        },
        repositories: repositories.map(repo => ({
          name: repo.name,
          description: repo.description,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
          url: repo.html_url,
          topics: repo.topics || []
        })),
        languages: languagesData,
        stats: {
          totalStars: repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0),
          totalForks: repositories.reduce((sum, repo) => sum + repo.forks_count, 0),
          totalRepos: user.public_repos
        }
      };

      setUserData(processedData.user);
      setRepos(processedData.repositories);
      setConnected(true);
      
      // Pass data to parent component
      onDataFetch(processedData);

    } catch (err) {
      setError(err.message || 'Veri alınırken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchGitHubData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">GitHub Entegrasyonu</h3>
        <p className="text-gray-300">GitHub hesabınızdan otomatik veri çekin</p>
      </div>

      {/* GitHub Username Input */}
      <div className="glass-effect p-6 rounded-2xl">
        <div className="flex space-x-4">
          <div className="flex-1">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="GitHub kullanıcı adınızı girin"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchGitHubData}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {loading ? (
              <FaSync className="animate-spin" />
            ) : (
              <FaGithub />
            )}
            <span>{loading ? 'Yükleniyor...' : 'Bağlan'}</span>
          </motion.button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center space-x-2 text-red-400"
          >
            <FaExclamationTriangle />
            <span>{error}</span>
          </motion.div>
        )}

        {connected && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center space-x-2 text-green-400"
          >
            <FaCheck />
            <span>GitHub hesabınız başarıyla bağlandı!</span>
          </motion.div>
        )}
      </div>

      {/* User Data Preview */}
      {userData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect p-6 rounded-2xl"
        >
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <FaUser />
            <span>Kullanıcı Bilgileri</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <img 
                  src={userData.avatar} 
                  alt={userData.name}
                  className="w-16 h-16 rounded-full border-2 border-primary-500"
                />
                <div>
                  <h5 className="text-white font-semibold">{userData.name}</h5>
                  <p className="text-gray-400">@{userData.username}</p>
                </div>
              </div>
              
              {userData.bio && (
                <p className="text-gray-300 text-sm">{userData.bio}</p>
              )}
              
              <div className="flex space-x-4 text-sm text-gray-400">
                <span>{userData.followers} takipçi</span>
                <span>{userData.following} takip</span>
                <span>{userData.publicRepos} repo</span>
              </div>
            </div>

            <div className="space-y-3">
              {userData.company && (
                <div className="text-sm">
                  <span className="text-gray-400">Şirket: </span>
                  <span className="text-white">{userData.company}</span>
                </div>
              )}
              
              {userData.location && (
                <div className="text-sm">
                  <span className="text-gray-400">Konum: </span>
                  <span className="text-white">{userData.location}</span>
                </div>
              )}
              
              {userData.blog && (
                <div className="text-sm">
                  <span className="text-gray-400">Website: </span>
                  <a href={userData.blog} className="text-primary-400 hover:underline">{userData.blog}</a>
                </div>
              )}
              
              {userData.twitter && (
                <div className="text-sm">
                  <span className="text-gray-400">Twitter: </span>
                  <span className="text-white">@{userData.twitter}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Top Repositories */}
      {repos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect p-6 rounded-2xl"
        >
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <FaCode />
            <span>Popüler Repolar</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {repos.slice(0, 6).map((repo, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-primary-500/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-2">
                  <h5 className="text-white font-medium truncate">{repo.name}</h5>
                  <div className="flex items-center space-x-1 text-yellow-400 text-sm">
                    <FaStar className="text-xs" />
                    <span>{repo.stars}</span>
                  </div>
                </div>
                
                {repo.description && (
                  <p className="text-gray-400 text-sm mb-2 line-clamp-2">{repo.description}</p>
                )}
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-primary-400">{repo.language}</span>
                  <span className="text-gray-500">{repo.forks} forks</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Auto-fill Button */}
      {connected && (
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDataFetch({ user: userData, repositories: repos })}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
          >
            Formu Otomatik Doldur
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default GitHubIntegration;