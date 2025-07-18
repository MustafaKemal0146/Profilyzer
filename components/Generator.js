import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, 
  FaCode, 
  FaGithub, 
  FaDownload, 
  FaCopy, 
  FaEye,
  FaRocket,
  FaCheck,
  FaPalette,
  FaSave,
  FaEdit
} from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

const Generator = () => {
  const [formData, setFormData] = useState({
    // Temel bilgiler
    name: '',
    username: '',
    title: '',
    description: '',
    currentWork: '',
    theme: 'tokyonight',
    
    // Seçenekler
    includeStats: true,
    includeTopLangs: true,
    includeStreak: true,
    includeTrophies: false,
    includeActivity: false,
    includeSnake: false,
    includeVisitors: true,
    includeTyping: true,
    includeQuotes: false,
    
    // Sosyal medya linkleri
    linkedin: '',
    twitter: '',
    instagram: '',
    youtube: '',
    website: '',
    
    // Teknoloji rozetleri
    frontendTechs: [],
    backendTechs: [],
    databaseTechs: [],
    aiTechs: [],
    devToolsTechs: [],
    mobileTechs: [],
    cloudTechs: [],
    osTechs: [],
    blockchainTechs: [],
    gameTechs: [],
    cybersecurityTechs: []
  });

  const [activeTab, setActiveTab] = useState('form');
  const [generatedReadme, setGeneratedReadme] = useState('');
  const [copied, setCopied] = useState(false);

  // Dinamik yükseklik hesaplama
  const calculatePreviewHeight = () => {
    const baseHeight = 400; // Minimum yükseklik
    const contentLength = generatedReadme.length;
    const additionalHeight = Math.min(contentLength / 10, 800); // Her 10 karakter için 1px, max 800px
    return Math.max(baseHeight, baseHeight + additionalHeight);
  };

  const themes = [
    { name: 'tokyonight', label: 'Tokyo Night', colors: ['#1a1b27', '#70a5fd'] },
    { name: 'dracula', label: 'Dracula', colors: ['#282a36', '#bd93f9'] },
    { name: 'github-dark', label: 'GitHub Dark', colors: ['#0d1117', '#58a6ff'] },
    { name: 'radical', label: 'Radical', colors: ['#141321', '#fe428e'] },
    { name: 'merko', label: 'Merko', colors: ['#0a0f0d', '#abd200'] },
    { name: 'gruvbox', label: 'Gruvbox', colors: ['#282828', '#fabd2f'] },
    { name: 'onedark', label: 'One Dark', colors: ['#282c34', '#61dafb'] },
    { name: 'cobalt', label: 'Cobalt', colors: ['#193549', '#ffc600'] }
  ];

  const techCategories = {
    frontendTechs: {
      title: '🎨 Frontend Teknolojileri',
      techs: [
        { name: 'React', icon: 'react' },
        { name: 'Vue.js', icon: 'vuejs' },
        { name: 'Angular', icon: 'angular' },
        { name: 'Next.js', icon: 'nextjs' },
        { name: 'Nuxt.js', icon: 'nuxtjs' },
        { name: 'Svelte', icon: 'svelte' },
        { name: 'HTML5', icon: 'html' },
        { name: 'CSS3', icon: 'css' },
        { name: 'JavaScript', icon: 'js' },
        { name: 'TypeScript', icon: 'ts' },
        { name: 'Tailwind CSS', icon: 'tailwind' },
        { name: 'Bootstrap', icon: 'bootstrap' },
        { name: 'Sass', icon: 'sass' },
        { name: 'jQuery', icon: 'jquery' },
        { name: 'Webpack', icon: 'webpack' },
        { name: 'Vite', icon: 'vite' }
      ]
    },
    backendTechs: {
      title: '⚙️ Backend Teknolojileri',
      techs: [
        { name: 'Node.js', icon: 'nodejs' },
        { name: 'Python', icon: 'py' },
        { name: 'Java', icon: 'java' },
        { name: 'C#', icon: 'cs' },
        { name: 'PHP', icon: 'php' },
        { name: 'Go', icon: 'go' },
        { name: 'Rust', icon: 'rust' },
        { name: 'C++', icon: 'cpp' },
        { name: 'C', icon: 'c' },
        { name: 'Ruby', icon: 'ruby' },
        { name: 'Express.js', icon: 'express' },
        { name: 'Django', icon: 'django' },
        { name: 'Flask', icon: 'flask' },
        { name: 'Spring', icon: 'spring' },
        { name: 'Laravel', icon: 'laravel' },
        { name: 'FastAPI', icon: 'fastapi' },
        { name: '.NET', icon: 'dotnet' },
        { name: 'Nest.js', icon: 'nestjs' }
      ]
    },
    databaseTechs: {
      title: '🗄️ Veritabanı Teknolojileri',
      techs: [
        { name: 'MySQL', icon: 'mysql' },
        { name: 'PostgreSQL', icon: 'postgres' },
        { name: 'MongoDB', icon: 'mongodb' },
        { name: 'Redis', icon: 'redis' },
        { name: 'SQLite', icon: 'sqlite' },
        { name: 'Oracle', icon: 'oracle' },
        { name: 'Firebase', icon: 'firebase' },
        { name: 'Supabase', icon: 'supabase' },
        { name: 'Elasticsearch', icon: 'elasticsearch' },
        { name: 'DynamoDB', icon: 'dynamodb' },
        { name: 'Cassandra', icon: 'cassandra' },
        { name: 'Neo4j', icon: 'neo4j' }
      ]
    },
    aiTechs: {
      title: '🤖 AI/ML Teknolojileri',
      techs: [
        { name: 'TensorFlow', icon: 'tensorflow' },
        { name: 'PyTorch', icon: 'pytorch' },
        { name: 'Keras', icon: 'keras' },
        { name: 'Scikit-learn', icon: 'sklearn' },
        { name: 'OpenCV', icon: 'opencv' },
        { name: 'Pandas', icon: 'pandas' },
        { name: 'NumPy', icon: 'numpy' },
        { name: 'Jupyter', icon: 'jupyter' },
        { name: 'Anaconda', icon: 'anaconda' },
        { name: 'Hugging Face', icon: 'huggingface' },
        { name: 'OpenAI', icon: 'openai' },
        { name: 'LangChain', icon: 'langchain' }
      ]
    },
    devToolsTechs: {
      title: '🛠️ Geliştirme Araçları',
      techs: [
        { name: 'Git', icon: 'git' },
        { name: 'GitHub', icon: 'github' },
        { name: 'GitLab', icon: 'gitlab' },
        { name: 'Docker', icon: 'docker' },
        { name: 'Kubernetes', icon: 'kubernetes' },
        { name: 'Jenkins', icon: 'jenkins' },
        { name: 'VS Code', icon: 'vscode' },
        { name: 'IntelliJ IDEA', icon: 'idea' },
        { name: 'Vim', icon: 'vim' },
        { name: 'Postman', icon: 'postman' },
        { name: 'Figma', icon: 'figma' },
        { name: 'Adobe XD', icon: 'xd' },
        { name: 'Notion', icon: 'notion' },
        { name: 'Slack', icon: 'slack' }
      ]
    },
    mobileTechs: {
      title: '📱 Mobil Geliştirme',
      techs: [
        { name: 'React Native', icon: 'react' },
        { name: 'Flutter', icon: 'flutter' },
        { name: 'Swift', icon: 'swift' },
        { name: 'Kotlin', icon: 'kotlin' },
        { name: 'Java', icon: 'java' },
        { name: 'Xamarin', icon: 'xamarin' },
        { name: 'Ionic', icon: 'ionic' },
        { name: 'Cordova', icon: 'cordova' },
        { name: 'Unity', icon: 'unity' },
        { name: 'Unreal Engine', icon: 'unrealengine' }
      ]
    },
    cloudTechs: {
      title: '☁️ Cloud Teknolojileri',
      techs: [
        { name: 'AWS', icon: 'aws' },
        { name: 'Google Cloud', icon: 'gcp' },
        { name: 'Microsoft Azure', icon: 'azure' },
        { name: 'Heroku', icon: 'heroku' },
        { name: 'Vercel', icon: 'vercel' },
        { name: 'Netlify', icon: 'netlify' },
        { name: 'DigitalOcean', icon: 'digitalocean' },
        { name: 'Cloudflare', icon: 'cloudflare' },
        { name: 'Railway', icon: 'railway' },
        { name: 'Supabase', icon: 'supabase' }
      ]
    },
    osTechs: {
      title: '💻 İşletim Sistemleri',
      techs: [
        { name: 'Linux', icon: 'linux' },
        { name: 'Ubuntu', icon: 'ubuntu' },
        { name: 'Debian', icon: 'debian' },
        { name: 'CentOS', icon: 'centos' },
        { name: 'Red Hat', icon: 'redhat' },
        { name: 'Windows', icon: 'windows' },
        { name: 'macOS', icon: 'apple' },
        { name: 'Android', icon: 'android' },
        { name: 'iOS', icon: 'apple' },
        { name: 'Kali Linux', icon: 'kali' }
      ]
    },
    blockchainTechs: {
      title: '⛓️ Blockchain & Web3',
      techs: [
        { name: 'Solidity', icon: 'solidity' },
        { name: 'Ethereum', icon: 'ethereum' },
        { name: 'Bitcoin', icon: 'bitcoin' },
        { name: 'Web3.js', icon: 'web3js' },
        { name: 'Hardhat', icon: 'hardhat' },
        { name: 'Truffle', icon: 'truffle' },
        { name: 'MetaMask', icon: 'metamask' },
        { name: 'IPFS', icon: 'ipfs' }
      ]
    },
    gameTechs: {
      title: '🎮 Oyun Geliştirme',
      techs: [
        { name: 'Unity', icon: 'unity' },
        { name: 'Unreal Engine', icon: 'unrealengine' },
        { name: 'Godot', icon: 'godot' },
        { name: 'Blender', icon: 'blender' },
        { name: 'C#', icon: 'cs' },
        { name: 'C++', icon: 'cpp' },
        { name: 'Lua', icon: 'lua' },
        { name: 'GameMaker', icon: 'gamemaker' }
      ]
    },
    cybersecurityTechs: {
      title: '🛡️ Siber Güvenlik',
      techs: [
        { name: 'Kali Linux', icon: 'kali' },
        { name: 'Metasploit', icon: 'metasploit' },
        { name: 'Wireshark', icon: 'wireshark' },
        { name: 'Burp Suite', icon: 'burpsuite' },
        { name: 'Nmap', icon: 'nmap' },
        { name: 'OWASP', icon: 'owasp' },
        { name: 'Splunk', icon: 'splunk' },
        { name: 'Snort', icon: 'snort' }
      ]
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleTechToggle = (category, tech) => {
    const currentTechs = formData[category] || [];
    const isSelected = currentTechs.some(t => t.name === tech.name);
    
    if (isSelected) {
      setFormData({
        ...formData,
        [category]: currentTechs.filter(t => t.name !== tech.name)
      });
    } else {
      setFormData({
        ...formData,
        [category]: [...currentTechs, tech]
      });
    }
  };

  const generateReadme = () => {
    let readme = '';

    // Typing animasyonu
    if (formData.includeTyping && formData.name) {
      readme += `<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=24&duration=3000&pause=1000&color=00D9FF&center=true&vCenter=true&width=1000&lines=Merhaba%2C+Ben+${encodeURIComponent(formData.name)}+%F0%9F%91%8B;${encodeURIComponent(formData.title || 'Developer')}" alt="Typing SVG" />
</div>

`;
    }

    // Ana başlık
    if (formData.name && !formData.includeTyping) {
      readme += `# Merhaba, Ben ${formData.name} 👋

`;
    }

    // Açıklama
    if (formData.description) {
      readme += `## 🚀 ${formData.description}

`;
    }

    // Sosyal medya linkleri
    const socialLinks = [];
    if (formData.username) socialLinks.push(`[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/${formData.username})`);
    if (formData.linkedin) socialLinks.push(`[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/${formData.linkedin})`);
    if (formData.twitter) socialLinks.push(`[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/${formData.twitter})`);

    if (socialLinks.length > 0) {
      readme += `---

## 🔗 Bağlantılar

<div align="center">

${socialLinks.join('\n')}

</div>

`;
    }

    // Teknoloji yığını
    const allTechs = [
      ...(formData.frontendTechs || []),
      ...(formData.backendTechs || []),
      ...(formData.databaseTechs || []),
      ...(formData.aiTechs || []),
      ...(formData.devToolsTechs || []),
      ...(formData.mobileTechs || []),
      ...(formData.cloudTechs || []),
      ...(formData.osTechs || []),
      ...(formData.blockchainTechs || []),
      ...(formData.gameTechs || []),
      ...(formData.cybersecurityTechs || [])
    ];

    if (allTechs.length > 0) {
      readme += `---

## 🛠️ Teknoloji Yığını

<div align="center">

`;
      allTechs.forEach(tech => {
        readme += `<img src="https://skillicons.dev/icons?i=${tech.icon}" alt="${tech.name}" width="50" height="50"/> `;
      });
      readme += `

</div>

`;
    }

    // GitHub İstatistikleri
    if (formData.username && (formData.includeStats || formData.includeTopLangs)) {
      readme += `---

## 📊 GitHub İstatistikleri

<div align="center">

`;
      if (formData.includeStats) {
        readme += `<img height="180em" src="https://github-readme-stats.vercel.app/api?username=${formData.username}&show_icons=true&theme=${formData.theme}&include_all_commits=true&count_private=true"/>
`;
      }
      if (formData.includeTopLangs) {
        readme += `<img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username=${formData.username}&layout=compact&langs_count=8&theme=${formData.theme}"/>
`;
      }
      readme += `
</div>

`;
    }

    // Şu anda çalıştığım
    if (formData.currentWork) {
      readme += `---

## 🔭 Şu Anda Üzerinde Çalıştığım

- ${formData.currentWork}
- 🌱 Sürekli öğrenmeye devam ediyorum
- 💬 Benimle iletişime geçmekten çekinmeyin!

`;
    }

    // Ziyaretçi sayacı
    if (formData.username && formData.includeVisitors) {
      readme += `---

<div align="center">
  <img src="https://komarev.com/ghpvc/?username=${formData.username}&color=blueviolet&style=for-the-badge&label=Profile+Views" />
</div>

`;
    }

    // Footer
    if (formData.name) {
      readme += `<div align="center">
  
  **Made with ❤️ by ${formData.name}**
  
</div>`;
    }

    setGeneratedReadme(readme);
    setActiveTab('preview');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedReadme);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadReadme = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedReadme], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = 'README.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const generateVisualPreview = () => {
    if (!formData.name && !formData.username) {
      return `
        <div style="text-align: center; padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 20px; color: white; margin-bottom: 20px;">
          <h1 style="font-size: 2.5rem; margin-bottom: 20px;">👋 Canlı Önizleme</h1>
          <p style="font-size: 1.2rem; opacity: 0.9;">README'nizi oluşturmak için formu doldurun ve "README Oluştur" butonuna tıklayın.</p>
        </div>
        <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
          <h2 style="color: #4f46e5; margin-bottom: 20px;">✨ Özellikler:</h2>
          <ul style="list-style: none; padding: 0;">
            <li style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">🔄 Gerçek zamanlı güncelleme</li>
            <li style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">🎨 Tema desteği</li>
            <li style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">📊 GitHub entegrasyonu</li>
            <li style="padding: 10px 0;">🏷️ Teknoloji rozetleri</li>
          </ul>
          <div style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); padding: 20px; border-radius: 10px; margin-top: 20px; text-align: center;">
            <strong>Form dolduruldukça bu önizleme otomatik olarak güncellenecek!</strong>
          </div>
        </div>
      `;
    }

    let html = '';

    // Header with Typing Animation
    if (formData.name) {
      if (formData.includeTyping) {
        html += `
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=24&duration=3000&pause=1000&color=00D9FF&center=true&vCenter=true&width=600&lines=Merhaba%2C+Ben+${encodeURIComponent(formData.name)}+%F0%9F%91%8B;${encodeURIComponent(formData.title || 'Developer')}" alt="Typing SVG" style="border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); max-width: 100%;" />
          </div>
        `;
      } else {
        html += `
          <div style="text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; border-radius: 20px; color: white; margin-bottom: 30px;">
            <h1 style="font-size: 3rem; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">Merhaba, Ben ${formData.name} 👋</h1>
          </div>
        `;
      }
    }

    // Description
    if (formData.description) {
      html += `
        <div style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); padding: 30px; border-radius: 15px; margin-bottom: 30px; text-align: center;">
          <h2 style="font-size: 2rem; margin: 0; color: #8b5cf6;">🚀 ${formData.description}</h2>
        </div>
      `;
    }

    // Social Media Links
    const socialLinks = [];
    if (formData.username) socialLinks.push(`<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" style="margin: 5px;" />`);
    if (formData.linkedin) socialLinks.push(`<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" style="margin: 5px;" />`);
    if (formData.twitter) socialLinks.push(`<img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" style="margin: 5px;" />`);
    if (formData.instagram) socialLinks.push(`<img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" style="margin: 5px;" />`);
    if (formData.youtube) socialLinks.push(`<img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube" style="margin: 5px;" />`);
    if (formData.website) socialLinks.push(`<img src="https://img.shields.io/badge/Website-1A1A1A?style=for-the-badge&logo=About.me&logoColor=white" alt="Website" style="margin: 5px;" />`);

    if (socialLinks.length > 0) {
      html += `
        <div style="background: white; padding: 30px; border-radius: 15px; margin-bottom: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
          <h2 style="color: #4f46e5; margin-bottom: 20px; text-align: center;">🔗 Bağlantılar</h2>
          <div style="text-align: center;">
            ${socialLinks.join('\n')}
          </div>
        </div>
      `;
    }

    // Tech Stack
    const allTechs = [
      ...(formData.frontendTechs || []),
      ...(formData.backendTechs || []),
      ...(formData.databaseTechs || []),
      ...(formData.aiTechs || []),
      ...(formData.devToolsTechs || []),
      ...(formData.mobileTechs || []),
      ...(formData.cloudTechs || [])
    ];

    if (allTechs.length > 0) {
      html += `
        <div style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 30px; border-radius: 15px; margin-bottom: 30px;">
          <h2 style="color: #6366f1; margin-bottom: 20px; text-align: center;">🛠️ Teknoloji Yığını</h2>
          <div style="text-align: center; display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;">
      `;
      
      allTechs.slice(0, 16).forEach(tech => {
        html += `<img src="https://skillicons.dev/icons?i=${tech.icon}" alt="${tech.name}" width="50" height="50" style="border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); transition: transform 0.3s;" />`;
      });
      
      if (allTechs.length > 16) {
        html += `<div style="background: #6366f1; color: white; padding: 15px; border-radius: 10px; font-weight: bold;">+${allTechs.length - 16} daha</div>`;
      }
      
      html += `
          </div>
        </div>
      `;
    }

    // GitHub Stats
    if (formData.username && (formData.includeStats || formData.includeTopLangs || formData.includeStreak)) {
      html += `
        <div style="background: white; padding: 30px; border-radius: 15px; margin-bottom: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
          <h2 style="color: #4f46e5; margin-bottom: 20px; text-align: center;">📊 GitHub İstatistikleri</h2>
          <div style="text-align: center; display: flex; flex-direction: column; align-items: center; gap: 20px;">
      `;
      
      // Stats and Languages in a row
      if (formData.includeStats || formData.includeTopLangs) {
        html += `<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px;">`;
        
        if (formData.includeStats) {
          html += `<img src="https://github-readme-stats.vercel.app/api?username=${formData.username}&show_icons=true&theme=${formData.theme}&include_all_commits=true&count_private=true" alt="GitHub Stats" style="border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); max-width: 100%;" />`;
        }
        
        if (formData.includeTopLangs) {
          html += `<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${formData.username}&layout=compact&langs_count=8&theme=${formData.theme}" alt="Top Languages" style="border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); max-width: 100%;" />`;
        }
        
        html += `</div>`;
      }
      
      // Streak separately
      if (formData.includeStreak) {
        html += `<img src="https://github-readme-streak-stats.herokuapp.com/?user=${formData.username}&theme=${formData.theme}" alt="GitHub Streak" style="border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); max-width: 100%;" />`;
      }
      
      html += `
          </div>
        </div>
      `;
    }

    // GitHub Trophies
    if (formData.username && formData.includeTrophies) {
      html += `
        <div style="background: linear-gradient(135deg, #ffd89b 0%, #19547b 100%); padding: 30px; border-radius: 15px; margin-bottom: 30px;">
          <h2 style="color: white; margin-bottom: 20px; text-align: center;">🏆 GitHub Trophies</h2>
          <div style="text-align: center;">
            <img src="https://github-profile-trophy.vercel.app/?username=${formData.username}&theme=${formData.theme}&no-frame=true&no-bg=false&margin-w=4&row=1" alt="GitHub Trophies" style="border-radius: 10px; max-width: 100%;" />
          </div>
        </div>
      `;
    }

    // Activity Graph
    if (formData.username && formData.includeActivity) {
      html += `
        <div style="background: white; padding: 30px; border-radius: 15px; margin-bottom: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
          <h2 style="color: #4f46e5; margin-bottom: 20px; text-align: center;">📈 Kodlama Aktivitesi</h2>
          <div style="text-align: center;">
            <img src="https://github-readme-activity-graph.vercel.app/graph?username=${formData.username}&bg_color=ffffff&color=4f46e5&line=00d9ff&point=4f46e5&area=true&hide_border=true" alt="Activity Graph" style="border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); max-width: 100%;" />
          </div>
        </div>
      `;
    }

    // Snake Animation
    if (formData.username && formData.includeSnake) {
      html += `
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 15px; margin-bottom: 30px;">
          <h2 style="color: white; margin-bottom: 20px; text-align: center;">🐍 Katkı Yılanı</h2>
          <div style="text-align: center;">
            <img src="https://raw.githubusercontent.com/${formData.username}/${formData.username}/output/github-contribution-grid-snake-dark.svg" alt="Snake Animation" style="border-radius: 10px; max-width: 100%;" />
          </div>
        </div>
      `;
    }

    // Random Quotes
    if (formData.includeQuotes) {
      html += `
        <div style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 30px; border-radius: 15px; margin-bottom: 30px;">
          <h2 style="color: #6366f1; margin-bottom: 20px; text-align: center;">💭 Rastgele Geliştirici Sözü</h2>
          <div style="text-align: center;">
            <img src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=${formData.theme}" alt="Random Quote" style="border-radius: 10px; max-width: 100%;" />
          </div>
        </div>
      `;
    }

    // Current Work
    if (formData.currentWork) {
      html += `
        <div style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); padding: 30px; border-radius: 15px; margin-bottom: 30px;">
          <h2 style="color: #8b5cf6; margin-bottom: 20px;">🔭 Şu Anda Üzerinde Çalıştığım</h2>
          <ul style="list-style: none; padding: 0;">
            <li style="padding: 10px 0; border-bottom: 1px solid rgba(139, 92, 246, 0.2);">📌 ${formData.currentWork}</li>
            <li style="padding: 10px 0; border-bottom: 1px solid rgba(139, 92, 246, 0.2);">🌱 Sürekli öğrenmeye devam ediyorum</li>
            <li style="padding: 10px 0;">💬 Benimle iletişime geçmekten çekinmeyin!</li>
          </ul>
        </div>
      `;
    }

    // Visitor Counter
    if (formData.username && formData.includeVisitors) {
      html += `
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://komarev.com/ghpvc/?username=${formData.username}&color=blueviolet&style=for-the-badge&label=Profile+Views" alt="Profile Views" style="border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);" />
        </div>
      `;
    }

    // Footer
    if (formData.name) {
      html += `
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 15px; text-align: center; color: white;">
          <h3 style="margin: 0; font-size: 1.5rem;">Made with ❤️ by ${formData.name}</h3>
        </div>
      `;
    }

    return html || `
      <div style="text-align: center; padding: 40px;">
        <h1 style="color: #6366f1;">📝 README Önizlemesi</h1>
        <p style="color: #6b7280;">Form dolduruldukça burada önizleme görünecek...</p>
      </div>
    `;
  };

  return (
    <section id="generator" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Profilyzer</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Profesyonel GitHub README dosyanızı oluşturun
          </p>
        </motion.div>

        <div className="glass-effect rounded-3xl p-8 shadow-2xl">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-8 gap-2">
            {[
              { id: 'form', label: 'Form', icon: FaUser },
              { id: 'preview', label: 'Önizleme', icon: FaEye },
              { id: 'code', label: 'Kod', icon: FaCode }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <tab.icon />
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Form Tab */}
            {activeTab === 'form' && (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Temel Bilgiler */}
                <div className="glass-effect p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-white mb-6">📝 Temel Bilgiler</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        İsim Soyisim *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                        placeholder="Mustafa Kemal Çıngıl"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        GitHub Kullanıcı Adı *
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                        placeholder="MustafaKemal0146"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Başlık/Meslek
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                        placeholder="AI & Cybersecurity Developer"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Kısa Açıklama
                      </label>
                      <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                        placeholder="Yapay Zeka, Siber Güvenlik ve Teknoloji Tutkunu"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Şu Anda Üzerinde Çalıştığım
                      </label>
                      <input
                        type="text"
                        name="currentWork"
                        value={formData.currentWork}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                        placeholder="AI-powered GitHub README Generator"
                      />
                    </div>
                  </div>
                </div>

                {/* Sosyal Medya */}
                <div className="glass-effect p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-white mb-6">🔗 Sosyal Medya Linkleri</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        LinkedIn Kullanıcı Adı
                      </label>
                      <input
                        type="text"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                        placeholder="mustafakemal0146"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Twitter Kullanıcı Adı
                      </label>
                      <input
                        type="text"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                        placeholder="mustafakemal0146"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Instagram Kullanıcı Adı
                      </label>
                      <input
                        type="text"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                        placeholder="mustafakemal0146"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        YouTube Kanal Adı
                      </label>
                      <input
                        type="text"
                        name="youtube"
                        value={formData.youtube}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                        placeholder="mustafakemalcingil"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Website URL
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                        placeholder="https://mustafakemalcingil.site"
                      />
                    </div>
                  </div>
                </div>

                {/* Seçenekler */}
                <div className="glass-effect p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-white mb-6">⚙️ README Seçenekleri</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { key: 'includeTyping', label: 'Typing Animasyonu', icon: '⌨️' },
                      { key: 'includeStats', label: 'GitHub İstatistikleri', icon: '📊' },
                      { key: 'includeTopLangs', label: 'En Çok Kullanılan Diller', icon: '💻' },
                      { key: 'includeStreak', label: 'GitHub Streak', icon: '🔥' },
                      { key: 'includeTrophies', label: 'GitHub Trophies', icon: '🏆' },
                      { key: 'includeActivity', label: 'Aktivite Grafiği', icon: '📈' },
                      { key: 'includeSnake', label: 'Yılan Oyunu', icon: '🐍' },
                      { key: 'includeVisitors', label: 'Ziyaretçi Sayacı', icon: '👁️' },
                      { key: 'includeQuotes', label: 'Rastgele Sözler', icon: '💭' }
                    ].map((option) => (
                      <motion.label
                        key={option.key}
                        whileHover={{ scale: 1.02 }}
                        className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                          formData[option.key]
                            ? 'border-primary-500 bg-primary-500/20'
                            : 'border-white/10 hover:border-white/20'
                        }`}
                      >
                        <span className="text-2xl">{option.icon}</span>
                        <span className="font-medium text-white flex-1">{option.label}</span>
                        <input
                          type="checkbox"
                          name={option.key}
                          checked={formData[option.key]}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-primary-500 bg-transparent border-2 border-white/20 rounded focus:ring-primary-500 focus:ring-2"
                        />
                      </motion.label>
                    ))}
                  </div>
                </div>

                {/* Tema Seçimi */}
                <div className="glass-effect p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-white mb-6">🎨 Tema Seçin</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {themes.map((theme) => (
                      <motion.button
                        key={theme.name}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormData({ ...formData, theme: theme.name })}
                        className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                          formData.theme === theme.name
                            ? 'border-primary-500 bg-primary-500/20'
                            : 'border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex space-x-1">
                            {theme.colors.map((color, index) => (
                              <div
                                key={index}
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium">{theme.label}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Teknoloji Rozetleri */}
                <div className="glass-effect p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-white mb-6">🏷️ Teknoloji Rozetleri</h3>
                  {Object.entries(techCategories).map(([categoryKey, category]) => (
                    <div key={categoryKey} className="mb-8">
                      <h4 className="text-lg font-semibold text-primary-500 mb-4">{category.title}</h4>
                      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-3">
                        {category.techs.map((tech) => {
                          const isSelected = (formData[categoryKey] || []).some(t => t.name === tech.name);
                          return (
                            <motion.button
                              key={tech.name}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleTechToggle(categoryKey, tech)}
                              className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-300 ${
                                isSelected
                                  ? 'border-primary-500 bg-primary-500/20'
                                  : 'border-white/10 hover:border-white/20'
                              }`}
                            >
                              <img 
                                src={`https://skillicons.dev/icons?i=${tech.icon}`} 
                                alt={tech.name}
                                className="w-8 h-8 mb-2"
                              />
                              <span className="text-xs text-center text-white font-medium">{tech.name}</span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Generate Button */}
                <div className="text-center pt-8">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 217, 255, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={generateReadme}
                    className="bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-4 rounded-full text-white font-bold text-lg flex items-center space-x-3 mx-auto hover:shadow-2xl transition-all duration-300"
                  >
                    <FaRocket className="text-xl" />
                    <span>README Oluştur</span>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Preview Tab */}
            {activeTab === 'preview' && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-white">README Önizleme</h3>
                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={copyToClipboard}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition-colors duration-300"
                    >
                      {copied ? <FaCheck /> : <FaCopy />}
                      <span>{copied ? 'Kopyalandı!' : 'Kopyala'}</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={downloadReadme}
                      className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg text-white font-medium transition-colors duration-300"
                    >
                      <FaDownload />
                      <span>İndir</span>
                    </motion.button>
                  </div>
                </div>
                
                <div 
                  className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 overflow-y-auto shadow-2xl border-2 border-primary-500/20"
                  style={{ 
                    minHeight: `${calculatePreviewHeight()}px`,
                    maxHeight: '90vh'
                  }}
                >
                  <div dangerouslySetInnerHTML={{ __html: generateVisualPreview() }} />
                </div>
              </motion.div>
            )}

            {/* Code Tab */}
            {activeTab === 'code' && (
              <motion.div
                key="code"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-white">Markdown Kodu</h3>
                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={copyToClipboard}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition-colors duration-300"
                    >
                      {copied ? <FaCheck /> : <FaCopy />}
                      <span>{copied ? 'Kopyalandı!' : 'Kopyala'}</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={downloadReadme}
                      className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg text-white font-medium transition-colors duration-300"
                    >
                      <FaDownload />
                      <span>İndir</span>
                    </motion.button>
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-xl p-8 min-h-[700px] max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-green-500/20">
                  <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap leading-relaxed">
                    {generatedReadme || '// README oluşturmak için formu doldurun'}
                  </pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Generator;