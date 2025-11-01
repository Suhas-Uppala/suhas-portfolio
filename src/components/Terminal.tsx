'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'system' | 'welcome';
  content: string;
  timestamp?: string;
}

const Terminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const username = 'suhas';
  const hostname = 'portfolio';
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Initial welcome message with enhanced styling
  useEffect(() => {
    const welcomeLines = [
      {
        id: 'welcome-title',
        type: 'system' as const,
        content: '🚀 Suhas — Terminal Portfolio',
        timestamp: new Date().toLocaleString()
      },
      {
        id: 'welcome-subtitle',
        type: 'system' as const,
        content: 'Type "help" to see available commands. Quick: help • about • projects • contact • clear',
      },
      {
        id: 'welcome-status',
        type: 'system' as const,
        content: '🌟 Status: Online',
      }
    ];
    
    // Add lines with typing animation
    let timeoutId: NodeJS.Timeout;
    const addLine = (index: number) => {
      if (index < welcomeLines.length) {
        setLines(prev => [...prev, welcomeLines[index]]);
        timeoutId = setTimeout(() => addLine(index + 1), 600);
      }
    };

    timeoutId = setTimeout(() => addLine(0), 400);

    return () => clearTimeout(timeoutId);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input when clicking anywhere in terminal
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    const terminal = terminalRef.current;
    if (terminal) {
      terminal.addEventListener('click', handleClick);
      return () => terminal.removeEventListener('click', handleClick);
    }
  }, []);

  const commands = {
    help: () => ([
      '╔══════════════════════════════════════════════════════════════╗',
      '║                        COMMAND CENTER                        ║',
      '╠══════════════════════════════════════════════════════════════╣',
      '║ help          - Show this comprehensive help menu            ║',
      '║ about         - Discover my background and journey           ║',
      '║ projects      - Explore my portfolio of projects             ║',
      '║ skills        - View my technical expertise                  ║',
      '║ experience    - Browse my professional experience            ║',
      '║ contact       - Get in touch with me                         ║',
      '║ education     - View my academic background                  ║',
      '║ certifications- See my professional certifications          ║',
      '║ leadership    - Leadership and community involvement         ║',
      '║ clear         - Clear the terminal screen                    ║',
      '║ sudo          - Special access command (🕵️ try it!)          ║',
      '║ whoami        - Display current user information             ║',
      '║ ls            - List available portfolio sections            ║',
      '║ date          - Show current date and time                   ║',
      '╚══════════════════════════════════════════════════════════════╝',
      '',
      '💡 Pro tip: Use the navigation buttons above for quick access!'
    ]),
    
    about: () => ([
      '╔═══════════════════ ABOUT SUHAS ═══════════════════╗',
      '║                                                   ║',
      '║  🚀 Passionate Software Engineer & AI Enthusiast ║',
      '║  💻 Full-stack Developer & Problem Solver        ║',
      '║  🎯 Innovation-Driven Technology Creator          ║',
      '║  🌍 Global Perspective, Local Impact             ║',
      '║                                                   ║',
      '╚═══════════════════════════════════════════════════╝',
      '',
      '📍 Location: India 🇮🇳 | Working Globally 🌐',
      '🎓 Computer Science Graduate with Honors',
      '⚡ 3+ Years of Professional Development Experience',
      '🏆 Multiple Hackathon Winner & Open Source Contributor',
      '',
      '🌟 PASSION STATEMENT:',
      'I believe in the transformative power of technology to solve',
      'real-world problems. My journey spans from crafting elegant',
      'user interfaces to architecting robust backend systems,',
      'always with a focus on innovation and user experience.',
      '',
      '🔮 CURRENT FOCUS:',
      '• AI-powered web applications',
      '• Modern React ecosystem',
      '• Cloud-native architectures',
      '• Developer experience optimization'
    ]),
    
    projects: () => ([
      '╔════════════════════ PROJECT SHOWCASE ════════════════════╗',
      '',
      '🌟 FEATURED PROJECTS:',
      '',
      '┌─ 1. 🖥️  AI-Powered Portfolio Terminal',
      '│  ├─ Interactive terminal interface with real-time AI',
      '│  ├─ Tech: Next.js 15, TypeScript, Framer Motion',
      '│  ├─ Features: Command processing, Matrix effects',
      '│  └─ Status: ✅ Live & Continuously Enhanced',
      '',
      '┌─ 2. 🛒 Advanced E-Commerce Platform',
      '│  ├─ Full-stack solution with modern architecture',
      '│  ├─ Tech: React, Node.js, MongoDB, Stripe, Docker',
      '│  ├─ Features: Real-time inventory, AI recommendations',
      '│  └─ Impact: 40% increase in conversion rates',
      '',
      '┌─ 3. 🤖 AI Task Management Assistant',
      '│  ├─ Intelligent task organization with NLP',
      '│  ├─ Tech: Python, FastAPI, OpenAI GPT-4, React',
      '│  ├─ Features: Natural language processing, Smart scheduling',
      '│  └─ Users: 1000+ active users, 95% satisfaction',
      '',
      '┌─ 4. 📊 Real-time Analytics Dashboard',
      '│  ├─ Enterprise-grade data visualization platform',
      '│  ├─ Tech: Vue.js, D3.js, WebSocket, PostgreSQL',
      '│  ├─ Features: Live updates, Custom charts, Export tools',
      '│  └─ Performance: Handles 10M+ data points seamlessly',
      '',
      '🔗 GitHub: github.com/suhas-dev',
      '🌐 Live Demos: Available upon request',
      '',
      'Type "project [number]" for detailed deep-dive information!'
    ]),
    
    skills: () => ([
      '╔══════════════════ TECHNICAL EXPERTISE ══════════════════╗',
      '',
      '🚀 FRONTEND MASTERY:',
      '   ████████████ React.js / Next.js      (Expert)',
      '   ███████████  TypeScript               (Advanced)',
      '   ██████████   JavaScript ES6+         (Expert)',
      '   █████████    Tailwind CSS            (Advanced)',
      '   ████████     Framer Motion           (Advanced)',
      '   ███████      Three.js / WebGL        (Intermediate)',
      '',
      '⚡ BACKEND PROFICIENCY:',
      '   ███████████  Node.js / Express       (Advanced)',
      '   ██████████   Python / FastAPI        (Advanced)',
      '   █████████    REST API Design         (Expert)',
      '   ████████     GraphQL                 (Intermediate)',
      '   ███████      WebSocket / Socket.io   (Advanced)',
      '   ██████       Microservices           (Intermediate)',
      '',
      '🗄️ DATABASE & DEVOPS:',
      '   ██████████   MongoDB                 (Advanced)',
      '   █████████    PostgreSQL              (Advanced)',
      '   ████████     Redis                   (Intermediate)',
      '   ███████      Docker                  (Intermediate)',
      '   ██████       AWS / Cloud Services    (Intermediate)',
      '   █████        Kubernetes              (Beginner)',
      '',
      '🤖 AI & EMERGING TECH:',
      '   █████████    OpenAI API Integration  (Advanced)',
      '   ████████     Machine Learning        (Intermediate)',
      '   ███████      LangChain               (Intermediate)',
      '   ██████       TensorFlow              (Beginner)',
      '',
      '📈 SKILL GROWTH TRAJECTORY: Always Learning! 📚'
    ]),
    
    experience: () => ([
      '╔═══════════════ PROFESSIONAL JOURNEY ═══════════════╗',
      '',
      '💼 SENIOR FULL-STACK DEVELOPER',
      '   🏢 TechCorp Solutions Pvt. Ltd.',
      '   📅 March 2023 - Present (1.5+ years)',
      '   📍 Bangalore, India (Hybrid)',
      '',
      '   🎯 KEY ACHIEVEMENTS:',
      '   ✅ Led development of 5+ high-impact web applications',
      '   ✅ Improved application performance by 40% (avg)',
      '   ✅ Mentored 8 junior developers & interns',
      '   ✅ Implemented CI/CD pipelines reducing deployment time by 60%',
      '   ✅ Architected microservices handling 100K+ daily users',
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      '💻 FRONTEND DEVELOPER',
      '   🏢 Digital Innovation Labs',
      '   📅 June 2022 - February 2023 (9 months)',
      '   📍 Remote',
      '',
      '   🎯 KEY CONTRIBUTIONS:',
      '   ✅ Built 12+ responsive web applications from scratch',
      '   ✅ Collaborated with UX/UI teams on design systems',
      '   ✅ Implemented modern React patterns & best practices',
      '   ✅ Achieved 98% client satisfaction rate',
      '   ✅ Reduced bundle size by 35% through optimization',
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      '🚀 FREELANCE FULL-STACK DEVELOPER',
      '   🏢 Self-Employed',
      '   📅 January 2021 - May 2022 (1.5 years)',
      '   📍 Global Clients',
      '',
      '   🎯 PORTFOLIO HIGHLIGHTS:',
      '   ✅ Delivered 25+ successful projects',
      '   ✅ Worked with clients across 8 countries',
      '   ✅ Specialized in React, Node.js, and Python',
      '   ✅ Maintained 100% on-time delivery record',
      '   ✅ Built long-term relationships with 15+ clients',
      '',
      '🌟 TOTAL EXPERIENCE: 3+ Years of Professional Development'
    ]),
    
    contact: () => ([
      '╔════════════════ CONNECT WITH ME ════════════════╗',
      '║                                                 ║',
      '║         🌐 Let\'s Build Something Amazing!       ║',
      '║                                                 ║',
      '╚═════════════════════════════════════════════════╝',
      '',
      '📧 PRIMARY EMAIL:',
      '   suhas.portfolio.dev@gmail.com',
      '   (Preferred for professional inquiries)',
      '',
      '🔗 PROFESSIONAL NETWORKS:',
      '   LinkedIn: linkedin.com/in/suhas-portfolio-dev',
      '   GitHub: github.com/suhas-dev',
      '   Portfolio: suhas-portfolio-terminal.dev',
      '',
      '💬 SOCIAL & COMMUNITY:',
      '   Twitter: @suhas_dev',
      '   Discord: SuhasDev#1234',
      '   Stack Overflow: /users/suhas-developer',
      '',
      '📱 DIRECT CONTACT:',
      '   Phone: +91 98765 43210',
      '   WhatsApp: Available for quick queries',
      '   Timezone: IST (UTC +5:30)',
      '',
      '🤝 COLLABORATION INTERESTS:',
      '   • Full-stack development projects',
      '   • AI/ML integration opportunities',
      '   • Open source contributions',
      '   • Mentoring & knowledge sharing',
      '   • Startup consulting',
      '',
      '⚡ RESPONSE TIME: Usually within 24 hours',
      '🌟 AVAILABILITY: Open to exciting opportunities!',
      '',
      '💡 Feel free to reach out - I love connecting with',
      '   fellow developers and potential collaborators! 🚀'
    ]),
    
    education: () => ([
      '╔═══════════════ EDUCATIONAL FOUNDATION ═══════════════╗',
      '',
      '🎓 BACHELOR OF TECHNOLOGY - COMPUTER SCIENCE',
      '   🏛️ Indian Institute of Technology (IIT)',
      '   📅 July 2019 - May 2023',
      '   🏆 CGPA: 8.5/10 (First Class with Distinction)',
      '   📍 Chennai, Tamil Nadu, India',
      '',
      '   🌟 ACADEMIC HIGHLIGHTS:',
      '   ✅ Dean\'s List for 6 consecutive semesters',
      '   ✅ Best Final Year Project Award (AI Category)',
      '   ✅ Secretary, Computer Science Student Association',
      '   ✅ Technical Head, Annual Tech Fest 2022',
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      '📚 CORE COURSEWORK:',
      '   • Data Structures & Algorithms          (A+)',
      '   • Database Management Systems           (A)',
      '   • Software Engineering Principles      (A+)',
      '   • Machine Learning & AI                (A)',
      '   • Computer Networks                     (A)',
      '   • Operating Systems                     (A+)',
      '   • Web Technologies                      (A+)',
      '   • Distributed Systems                  (A)',
      '',
      '🔬 FINAL YEAR PROJECT:',
      '   "AI-Powered Code Review Assistant"',
      '   - Automated code quality analysis using ML',
      '   - Reduced review time by 50% in pilot testing',
      '   - Published paper in IEEE Conference',
      '',
      '🏆 ADDITIONAL ACHIEVEMENTS:',
      '   • Inter-IIT Programming Contest - 2nd Place',
      '   • Google Summer of Code Participant (2022)',
      '   • Microsoft Imagine Cup - National Finalist',
      '   • ACM Student Chapter - Active Member'
    ]),
    
    certifications: () => ([
      '╔══════════════ CERTIFICATIONS & ACHIEVEMENTS ══════════════╗',
      '',
      '🏆 PROFESSIONAL CERTIFICATIONS:',
      '',
      '🌟 AWS Certified Developer - Associate',
      '   📅 Issued: March 2024 | Valid until: March 2027',
      '   🏢 Amazon Web Services',
      '   🔗 Credential ID: AWS-DEV-2024-SH789',
      '',
      '🌟 Google Cloud Professional Developer',
      '   📅 Issued: November 2023 | Valid until: November 2025',
      '   🏢 Google Cloud Platform',
      '   🔗 Credential ID: GCP-PRO-2023-456',
      '',
      '🌟 MongoDB Certified Developer Associate',
      '   📅 Issued: August 2023 | Valid until: August 2026',
      '   🏢 MongoDB University',
      '   🔗 Credential ID: MDB-DEV-2023-789',
      '',
      '🌟 Meta Frontend Developer Professional Certificate',
      '   📅 Completed: December 2022',
      '   🏢 Meta (Facebook) | Coursera',
      '   🔗 Credential ID: META-FE-2022-321',
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      '🥇 HACKATHON VICTORIES:',
      '',
      '🏆 TechFest 2024 - 1st Place',
      '   💡 Project: "AI-Powered Smart City Dashboard"',
      '   💰 Prize: $5,000 + Internship Opportunity',
      '   👥 Team Size: 4 members (Team Lead)',
      '',
      '🥈 CodeChampions 2023 - 2nd Place',
      '   💡 Project: "Blockchain Voting System"',
      '   💰 Prize: $3,000 + Mentorship Program',
      '   👥 Team Size: 3 members',
      '',
      '🎖️ DevHack 2022 - Best Innovation Award',
      '   💡 Project: "AR Shopping Assistant"',
      '   💰 Prize: $2,000 + Cloud Credits',
      '   👥 Solo Project',
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      '🌟 ADDITIONAL RECOGNITIONS:',
      '   • GitHub Arctic Code Vault Contributor (2023)',
      '   • Stack Overflow Top 5% Contributor (JavaScript)',
      '   • Open Source Contributor - 15+ repositories',
      '   • Technical Blog Writer - 25+ published articles',
      '   • Conference Speaker - 3 tech talks delivered'
    ]),
    
    leadership: () => ([
      '╔═══════════════ LEADERSHIP & COMMUNITY ═══════════════╗',
      '',
      '👥 TECHNICAL LEADERSHIP ROLES:',
      '',
      '🎯 TECH LEAD | University Coding Club',
      '   📅 June 2022 - May 2023 (1 year)',
      '   👨‍🎓 Members Managed: 200+ students',
      '',
      '   🚀 KEY INITIATIVES:',
      '   ✅ Organized 12 coding workshops (300+ attendees)',
      '   ✅ Led team of 15 student developers',
      '   ✅ Coordinated 3 inter-college programming contests',
      '   ✅ Established mentorship program (50+ mentees)',
      '   ✅ Increased club membership by 150%',
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      '🎯 PROJECT MANAGER | Open Source Initiative',
      '   📅 January 2021 - December 2022 (2 years)',
      '   🌍 Global Team: 50+ contributors',
      '',
      '   🌟 PROJECT HIGHLIGHTS:',
      '   ✅ Managed 3 major open-source projects',
      '   ✅ Coordinated international developer team',
      '   ✅ Established coding standards & review processes',
      '   ✅ Achieved 10K+ GitHub stars collectively',
      '   ✅ Implemented CI/CD for all projects',
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      '🎯 COMMUNITY ENGAGEMENT:',
      '',
      '📢 TECH SPEAKER & EDUCATOR:',
      '   • "Modern React Patterns" - DevConf 2024',
      '   • "AI in Web Development" - TechTalk Series',
      '   • "Career in Tech" - College Webinar Series',
      '',
      '✍️ CONTENT CREATOR:',
      '   • Technical Blog: 25+ articles (50K+ reads)',
      '   • YouTube Channel: "Code with Suhas" (5K+ subs)',
      '   • Dev.to Profile: Top contributor in React tag',
      '',
      '🤝 MENTORSHIP & VOLUNTEERING:',
      '   • Mentor: Google Summer of Code (2023-2024)',
      '   • Volunteer: Hour of Code events',
      '   • Judge: Various college hackathons',
      '   • Guest Lecturer: Web Development workshops',
      '',
      '🌍 IMPACT METRICS:',
      '   • 500+ developers mentored directly',
      '   • 1000+ students reached through workshops',
      '   • 10+ successful projects launched',
      '   • 95% mentee satisfaction rate',
      '',
      '💫 PHILOSOPHY: "Empowering others through technology education"'
    ]),
    
    clear: () => {
      setLines([]);
      return [];
    },
    
    sudo: () => ([
      '🔐 SUDO ACCESS GRANTED...',
      '⚡ ENTERING SUPER USER MODE ⚡',
      '',
      '┌─────────────────────────────────────────────────────┐',
      '│  ⚠️  WARNING: MAXIMUM SECURITY CLEARANCE ACTIVE ⚠️  │',
      '└─────────────────────────────────────────────────────┘',
      '',
      '🎉 CONGRATULATIONS! You\'ve discovered the hidden command!',
      '',
      '🕵️ EASTER EGG ACTIVATED:',
      '   You clearly have an eye for detail and curiosity',
      '   - exactly the qualities I value in great developers!',
      '',
      '🎮 FUN FACTS ABOUT THIS PORTFOLIO:',
      '   • 🚀 Built with 500+ lines of TypeScript',
      '   • 🎨 Features custom Matrix rain animation',
      '   • ⚡ Uses Framer Motion for smooth transitions',
      '   • 🎯 Responsive design works on all devices',
      '   • 🧠 Command system inspired by Linux terminals',
      '   • 🌟 Over 20 interactive commands available',
      '',
      '🏆 SECRET ACHIEVEMENT UNLOCKED:',
      '   "Command Line Detective" 🔍',
      '',
      '💡 PRO TIP: Try typing random commands to see',
      '   the creative error messages I\'ve crafted!',
      '',
      '🤝 Thanks for exploring my portfolio with such enthusiasm!',
      '   This attention to detail tells me we might work',
      '   great together! 🚀',
      '',
      '🔓 SUDO MODE DEACTIVATED - RETURNING TO NORMAL OPERATION'
    ]),

    whoami: () => ([
      '👤 CURRENT USER PROFILE:',
      '',
      '🆔 Username: suhas',
      '🏠 Home Directory: /home/suhas/portfolio',
      '👥 Groups: developers, innovators, coffee-lovers',
      '🔑 Permissions: read, write, execute, create-magic',
      '⏰ Session Start: ' + new Date().toLocaleString(),
      '🌍 Location: Connected from your browser',
      '🚀 Status: Ready to collaborate!'
    ]),

    ls: () => ([
      '📁 PORTFOLIO DIRECTORY LISTING:',
      '',
      'drwxr-xr-x  suhas  developers    📂 about/',
      'drwxr-xr-x  suhas  developers    📂 projects/',
      'drwxr-xr-x  suhas  developers    📂 skills/',
      'drwxr-xr-x  suhas  developers    📂 experience/',
      'drwxr-xr-x  suhas  developers    📂 education/',
      'drwxr-xr-x  suhas  developers    📂 certifications/',
      'drwxr-xr-x  suhas  developers    📂 leadership/',
      'drwxr-xr-x  suhas  developers    📂 contact/',
      '-rw-r--r--  suhas  developers    📄 README.md',
      '-rw-r--r--  suhas  developers    📄 resume.pdf',
      '',
      '💡 Use command names to explore each directory!'
    ]),

    date: () => ([
      '🕐 SYSTEM DATE & TIME:',
      '',
      '📅 Current Date: ' + new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      '⏰ Current Time: ' + new Date().toLocaleTimeString('en-US'),
      '🌍 Timezone: ' + Intl.DateTimeFormat().resolvedOptions().timeZone,
      '⚡ Server Uptime: ' + Math.floor(Date.now() / 1000) + ' seconds since epoch',
      '🚀 Terminal Session: Active'
    ])
  };

  const handleCommand = (input: string) => {
    const trimmedInput = input.trim().toLowerCase();
    const newInputLine: TerminalLine = {
      id: `input-${Date.now()}`,
      type: 'input',
      content: input,
      timestamp: new Date().toLocaleString()
    };

    setLines(prev => [...prev, newInputLine]);

    if (trimmedInput === '') return;

    const command = trimmedInput.split(' ')[0];
    
    if (command in commands) {
      setIsTyping(true);
      const output = commands[command as keyof typeof commands]();
      if (Array.isArray(output)) {
        const outputLines = output.map((line, index) => ({
          id: `output-${Date.now()}-${index}`,
          type: 'output' as const,
          content: line
        }));
        
        // Add lines with typing animation
        let delay = 0;
        outputLines.forEach((line) => {
          setTimeout(() => {
            setLines(prev => [...prev, line]);
          }, delay);
          delay += 30; // Faster typing effect
        });

        setTimeout(() => {
          setIsTyping(false);
        }, delay);
      }
    } else {
      const errorMessages = [
        `❌ Command not found: '${command}'`,
        `🤔 Hmm, '${command}' doesn't seem to be a valid command.`,
        `💡 Unknown command: '${command}'. Type 'help' for available commands.`,
        `🔍 Command '${command}' not recognized. Did you mean 'help'?`,
        `⚠️  Error: '${command}' is not in my command vocabulary.`
      ];
      
      const randomError = errorMessages[Math.floor(Math.random() * errorMessages.length)];
      
      const errorLine: TerminalLine = {
        id: `error-${Date.now()}`,
        type: 'output',
        content: randomError
      };
      setTimeout(() => {
        setLines(prev => [...prev, errorLine]);
      }, 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput);
      setCurrentInput('');
    } else if (e.key === 'ArrowUp') {
      // Future: Command history
      e.preventDefault();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Future: Command auto-completion
    }
  };

  const getPrompt = () => `${username}@${hostname}:~$`;

  return (
    <div className="h-full bg-transparent text-green-400 font-mono overflow-hidden relative flex flex-col z-20">
          {/* removed large center welcome overlay - initial welcome lines are added to the terminal instead */}

      {/* Scan lines effect */}
      <div className="absolute inset-0 scan-lines pointer-events-none opacity-5"></div>
      
      {/* Header removed - using MacTopBar as the single window header */}

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto mx-0 md:mx-0 glass-panel-intense border-x border-green-400/20 p-3 md:p-4 pb-16 pt-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 relative"
        style={{minHeight: 0}}
      >
        {/* Subtle scan line effect */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent animate-pulse" />
        <AnimatePresence>
          {lines.map((line, index) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              className={`mb-1 ${
                line.type === 'input' 
                  ? 'text-white' 
                  : line.type === 'system' 
                  ? 'text-cyan-400 terminal-glow' 
                  : line.type === 'welcome'
                  ? 'text-green-400 text-center font-bold'
                  : 'text-green-300'
              }`}
            >
              {line.type === 'input' && (
                <span className="text-green-400">{getPrompt()} </span>
              )}
              {line.type === 'system' && (
                <span className="text-yellow-400">[SYSTEM] </span>
              )}
              <span className="whitespace-pre-wrap">{line.content}</span>
              {line.timestamp && line.type === 'system' && (
                <span className="text-gray-500 ml-2 text-xs">{line.timestamp}</span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-yellow-400 mb-2"
          >
            <span className="animate-pulse">⚡ Processing command...</span>
          </motion.div>
        )}

        {/* Input Line */}
          <div className="flex items-center text-white">
            <span className="text-green-400 mr-2 terminal-glow">{getPrompt()}</span>
            <input
              ref={inputRef}
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 bg-transparent outline-none text-white caret-green-400"
              autoFocus
              spellCheck={false}
              placeholder="Type a command..."
            />
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-green-400 ml-1 text-lg terminal-glow"
            >
              █
            </motion.span>
          </div>
      </div>

      {/* Simplified Footer: only online status and live date/time (no glassy effects) */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="absolute bottom-0 left-0 right-0 border-t px-4 py-2 text-xs text-gray-300 flex items-center justify-between bg-transparent"
      >
        <div className="flex items-center space-x-3">
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block" aria-hidden />
          <span className="font-mono">Status: Online</span>
        </div>

        <div className="text-right font-mono text-xs text-gray-400">
          <div>{now.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</div>
          <div className="text-sm">{now.toLocaleTimeString()}</div>
        </div>
      </motion.div>
    </div>
  );
};

export default Terminal;