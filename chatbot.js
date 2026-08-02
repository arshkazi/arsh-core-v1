/**
 * chatbot.js - Interactive Command-Line Agent (arsh-cli)
 * Powered by GitHub REST API & Real-time Parsing
 */

(function () {
    const GITHUB_USERNAME = 'arsh-lakers'; // Replace with your exact GitHub handle
  
    let userGithubRepos = [];
    let isGithubLoaded = false;
  
    const ARSH_PROFILE = {
      name: "Kazi Mohammed Arsh",
      role: "Junior AI Engineer | MLOps Specialist",
      location: "Mumbai, India",
      education: {
        degree: "MSc Artificial Intelligence (Distinction)",
        university: "University of East London, UK",
        undergrad: "BSc Information Technology (CGPI: 7.22) - Mumbai University"
      },
      experience: [
        { role: "AI Engineer (GenAI)", org: "Vibrant Minds", period: "2024-2026", details: "FAISS/Chroma vector DBs, Agentic LLM workflows" },
        { role: "Python Dev & Data Engineer", org: "TCS", period: "2021-2023", details: "Enterprise LLM integration, >95% SLA compliance" }
      ],
      contact: {
        email: "arsh.lakers@gmail.com",
        phone: "+91 91671 91639",
        github: "https://github.com",
        linkedin: "https://linkedin.com"
      }
    };
  
    // Fetch GitHub Repos
    async function fetchGithubKnowledge() {
      try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`);
        if (response.ok) {
          const repos = await response.json();
          userGithubRepos = repos.filter(repo => !repo.fork);
          isGithubLoaded = true;
        }
      } catch (err) {
        console.warn("CLI Agent: GitHub API sync offline.", err);
      }
    }
  
    // Inject Floating CLI Widget
    const widgetContainer = document.createElement('div');
    widgetContainer.id = 'terminal-chatbot-widget';
    widgetContainer.innerHTML = 
    
    `

    <!-- Quick Action Suggestion Chips -->
<div class="flex flex-wrap gap-1.5 pt-1" id="cli-chips">
  <button onclick="executeQuickCmd('arsh --skills')" class="px-2 py-1 rounded bg-slate-900 border border-slate-800 hover:border-emerald-500 text-emerald-400 transition text-[10px]">arsh --skills</button>
  <button onclick="executeQuickCmd('arsh --projects')" class="px-2 py-1 rounded bg-slate-900 border border-slate-800 hover:border-cyan-500 text-cyan-400 transition text-[10px]">arsh --projects</button>
  <button onclick="executeQuickCmd('arsh --exp')" class="px-2 py-1 rounded bg-slate-900 border border-slate-800 hover:border-amber-500 text-amber-400 transition text-[10px]">arsh --exp</button>
  
  <!-- NEW: Quick Download CV Button -->
  <button onclick="executeQuickCmd('arsh --download-cv')" class="px-2 py-1 rounded bg-slate-900 border border-slate-800 hover:border-purple-500 text-purple-400 transition text-[10px]">arsh --download-cv</button>
</div>

      <!-- Floating Action Button -->
      <button id="chat-toggle-btn" class="fixed bottom-6 right-6 bg-slate-950 border border-emerald-500/60 text-emerald-400 p-4 rounded-full chat-fab-pulse transition-all duration-300 flex items-center justify-center cursor-pointer">
        <i class="fas fa-terminal text-lg"></i>
      </button>
  
      <!-- CLI Terminal Window -->
      <div id="chat-window" class="fixed bottom-24 right-6 w-[420px] max-w-[calc(100vw-2rem)] bg-slate-950 border border-slate-800 rounded-lg shadow-2xl hidden flex-col overflow-hidden transition-all duration-300 font-mono">
        
        <!-- Top Window Titlebar -->
        <div class="bg-slate-900 px-4 py-2 border-b border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span class="font-bold text-slate-200">arsh-cli v2.4.0 --daemon</span>
          </div>
          <button id="chat-close-btn" class="hover:text-white"><i class="fas fa-times"></i></button>
        </div>
  
        <!-- Command Output Log -->
        <div id="chat-messages" class="p-4 h-88 max-h-[360px] overflow-y-auto chat-body-scroll text-[11px] space-y-3 bg-slate-950/90 text-slate-300">
          <div class="text-slate-500">$ arsh-cli --init-session</div>
          <div class="p-2.5 border border-slate-800 rounded bg-slate-900/60 space-y-1">
            <div class="text-emerald-400 font-bold">SYSTEM BOOT SUCCESSFUL [OK]</div>
            <div class="text-slate-400">Type <span class="text-cyan-400">arsh --help</span> or use prompt suggestions below:</div>
          </div>
  
          <!-- Quick Action Suggestion Chips -->
          <div class="flex flex-wrap gap-1.5 pt-1" id="cli-chips">
            <button onclick="executeQuickCmd('arsh --skills')" class="px-2 py-1 rounded bg-slate-900 border border-slate-800 hover:border-emerald-500 text-emerald-400 transition text-[10px]">arsh --skills</button>
            <button onclick="executeQuickCmd('arsh --projects')" class="px-2 py-1 rounded bg-slate-900 border border-slate-800 hover:border-cyan-500 text-cyan-400 transition text-[10px]">arsh --projects</button>
            <button onclick="executeQuickCmd('arsh --exp')" class="px-2 py-1 rounded bg-slate-900 border border-slate-800 hover:border-amber-500 text-amber-400 transition text-[10px]">arsh --exp</button>
          </div>
        </div>
  
        <!-- Command Line Input with Voice Button -->
      <div class="p-2.5 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2 text-xs">
        <span class="text-emerald-400 font-bold">arsh@cli:~$</span>
        <input type="text" id="chat-user-input" class="bg-transparent flex-1 focus:outline-none text-slate-200 font-mono" placeholder="type or speak command..." />
        
        <!-- Voice Input Mic Button -->
        <button id="mic-btn" title="Voice Input" class="text-slate-400 hover:text-emerald-400 px-1 transition cursor-pointer">
          <i class="fas fa-microphone"></i>
        </button>

        <button id="chat-send-btn" class="text-emerald-400 hover:text-emerald-300 px-1">
          <i class="fas fa-level-down-alt rotate-90"></i>
        </button>
      </div>
      </div>
    `;
    document.body.appendChild(widgetContainer);
  
    // Setup References
    const toggleBtn = document.getElementById('chat-toggle-btn');
    const closeBtn = document.getElementById('chat-close-btn');
    const chatWindow = document.getElementById('chat-window');
    const userInput = document.getElementById('chat-user-input');
    const sendBtn = document.getElementById('chat-send-btn');
    const messagesContainer = document.getElementById('chat-messages');
  
    toggleBtn.addEventListener('click', () => chatWindow.classList.toggle('hidden'));
    closeBtn.addEventListener('click', () => chatWindow.classList.add('hidden'));
  
    window.executeQuickCmd = function(cmdText) {
      userInput.value = cmdText;
      handleSend();
    };
  
    function appendCommandOutput(cmd, outputHtml) {
      const entry = document.createElement('div');
      entry.className = "space-y-1.5 border-l-2 border-slate-800 pl-2.5 my-2";
      entry.innerHTML = `
        <div class="text-slate-400"><span class="text-emerald-400 font-bold">guest@arsh-cli:~$</span> ${cmd}</div>
        <div class="text-slate-300 leading-relaxed">${outputHtml}</div>
      `;
      messagesContainer.appendChild(entry);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    function triggerTerminalDownload(filePath) {
        let percent = 0;
        
        const interval = setInterval(() => {
          percent += 20;
          const progressEl = document.getElementById('cv-download-progress');
      
          if (progressEl) {
            const blocks = '█'.repeat(percent / 5);
            const spaces = '░'.repeat(20 - (percent / 5));
            progressEl.innerHTML = `[${blocks}${spaces}] ${percent}%`;
          }
      
          if (percent >= 100) {
            clearInterval(interval);
            if (progressEl) {
              progressEl.innerHTML = `<span class="text-emerald-400">[████████████████████] 100% SUCCESSFUL</span>`;
            }
      
            // Trigger standard browser download
            setTimeout(() => {
              const link = document.createElement('a');
              link.href = filePath;
              link.download = 'Kazi_Mohammed_Arsh_Resume.pdf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }, 300);
          }
        }, 150);
      }
    // Pure CLI Command Parser Engine
    function processCliCommand(query) {
      const q = query.trim().toLowerCase();
  // Add this inside processCliCommand(query) in chatbot.js

// 8. DOWNLOAD CV / RESUME COMMAND
if (q.includes('cv') || q.includes('resume') || q.includes('--download-cv')) {
    // Path to your actual PDF resume file in your project folder
    const RESUME_FILE_PATH = 'assets/Kazi_Mohammed_Arsh_Resume.pdf'; // Update with your actual file path!
  
    // Trigger simulated CLI download stream
    triggerTerminalDownload(RESUME_FILE_PATH);
  
    return `
      <div class="text-purple-400 font-bold">[INITIATING FILE TRANSFER]</div>
      <div class="text-slate-400 text-[10px]">Target: <span class="text-slate-200">Kazi_Mohammed_Arsh_Resume.pdf</span></div>
      <div id="cv-download-progress" class="text-emerald-400 font-bold font-mono text-[10px] mt-1">
        [░░░░░░░░░░░░░░░░░░░░] 0%
      </div>
    `;
  }

  // 1. HELP COMMAND
  if (q === 'arsh --help' || q === 'help') {
    return `
      <div class="text-amber-400 font-bold">[AVAILABLE ARSH COMMANDS]</div>
      <div class="text-slate-400 space-y-0.5">
        <div><span class="text-emerald-400">arsh --skills</span>     : Print technical AI/ML & MLOps stack matrix</div>
        <div><span class="text-cyan-400">arsh --projects</span>   : Query live GitHub repos & dissertation details</div>
        <div><span class="text-amber-400">arsh --exp</span>        : View enterprise history (TCS & Vibrant Minds)</div>
        <div><span class="text-purple-400">arsh --edu</span>        : Print academic credentials (MSc UEL Distinction)</div>
        <div><span class="text-blue-400">arsh --contact</span>    : Print email, phone, and social endpoints</div>
        <div><span class="text-pink-400">arsh --download-cv</span>: Stream & download PDF Resume</div>
        <div><span class="text-red-400">clear</span>           : Purge command line buffer</div>
      </div>
      <div class="text-slate-500 text-[10px] pt-1">
        💡 <span class="text-slate-300">Tip:</span> Click the <i class="fas fa-microphone text-emerald-400"></i> icon to issue commands using your voice!
      </div>
    `;
  }


      // 1. HELP COMMAND
      if (q === 'arsh --help' || q === 'help') {
        return `
          <div class="text-amber-400 font-bold">[AVAILABLE ARSH COMMANDS]</div>
          <div class="text-slate-400 space-y-0.5">
            <div><span class="text-emerald-400">arsh --skills</span>    : Print technical AI/ML & MLOps stack matrix</div>
            <div><span class="text-cyan-400">arsh --projects</span>  : Query live GitHub repos & dissertation details</div>
            <div><span class="text-amber-400">arsh --exp</span>       : View enterprise history (TCS & Vibrant Minds)</div>
            <div><span class="text-purple-400">arsh --edu</span>       : Print academic credentials (MSc UEL Distinction)</div>
            <div><span class="text-blue-400">arsh --contact</span>   : Print email, phone, and social endpoints</div>
            <div><span class="text-red-400">clear</span>          : Purge command line buffer</div>
          </div>
        `;
      }
  
      // 2. SKILLS MATRIX
      if (q.includes('skill') || q.includes('--skills') || q.includes('stack')) {
        return `
          <div class="text-emerald-400 font-bold">RUNNING: arsh --get-skills-matrix</div>
          <pre class="text-slate-400 text-[10px]">
  +-----------------------+----------------------------------+
  | DOMAIN                | CORE TECHNOLOGIES                |
  +-----------------------+----------------------------------+
  | GenAI & LLMs          | OpenAI, LangChain, RAG, FAISS    |
  | ML & Neural Nets      | PyTorch, XGBoost, Scikit-learn   |
  | MLOps & Azure         | Azure AI Foundry, Docker, FastAPI|
  | Explainable AI        | SHAP, LIME, ROC-AUC Metrics      |
  +-----------------------+----------------------------------+</pre>
        `;
      }
  
      // 3. PROJECTS & GITHUB COMMAND
      if (q.includes('project') || q.includes('--projects') || q.includes('repo') || q.includes('github')) {
        if (isGithubLoaded && userGithubRepos.length > 0) {
          let list = `<div class="text-cyan-400 font-bold">FETCHING REPOSITORIES FROM GITHUB REST API:</div>`;
          userGithubRepos.slice(0, 4).forEach(repo => {
            list += `
              <div class="p-1.5 bg-slate-900/80 rounded border border-slate-800 my-1">
                <div class="text-emerald-300 font-bold">${repo.name} <span class="text-slate-500 text-[9px]">(${repo.language || 'Python'})</span></div>
                <div class="text-slate-400 text-[10px]">${repo.description || 'No description provided.'}</div>
                <a href="${repo.html_url}" target="_blank" class="text-cyan-400 text-[10px] underline">🔗 ${repo.html_url}</a>
              </div>
            `;
          });
          return list;
        } else {
          return `
            <div class="text-cyan-400 font-bold">PRIMARY FEATURED PROJECTS:</div>
            <div>1. <span class="text-emerald-300">Customer Churn Prediction (XAI Pipeline)</span> - XGBoost, SMOTE, SHAP/LIME</div>
            <div>2. <span class="text-cyan-300">Domain Name Price Prediction</span> - 6.8M records, NLP Feature Extraction, MLP Neural Net</div>
          `;
        }
      }
  
      // 4. EXPERIENCE COMMAND
      if (q.includes('exp') || q.includes('--exp') || q.includes('work') || q.includes('tcs')) {
        return `
          <div class="text-amber-400 font-bold">ENTERPRISE LOGS:</div>
          <div>• <span class="text-emerald-400">AI Engineer @ Vibrant Minds</span> (May 2024 - Jun 2026)</div>
          <div class="text-slate-400 text-[10px] pl-3">Built FAISS/Chroma vector DB pipelines & agentic query automation.</div>
          <div class="pt-1">• <span class="text-amber-400">Python Dev & Data Engineer @ TCS</span> (Sep 2021 - Sep 2023)</div>
          <div class="text-slate-400 text-[10px] pl-3">Integrated LLM automation scripts into cloud infrastructure with >95% SLA.</div>
        `;
      }
  
      // 5. EDUCATION COMMAND
      if (q.includes('edu') || q.includes('--edu') || q.includes('msc') || q.includes('degree')) {
        return `
          <div class="text-purple-400 font-bold">ACADEMIC CREDENTIALS:</div>
          <div>🎓 <span class="text-white">MSc Artificial Intelligence (Passed with Distinction)</span></div>
          <div class="text-slate-400 text-[10px] pl-4">University of East London, UK (2024 - 2025)</div>
          <div class="pt-1">🎓 <span class="text-white">BSc Information Technology (CGPI: 7.22)</span></div>
          <div class="text-slate-400 text-[10px] pl-4">Lala Lajpat Rai College, Mumbai University (2018 - 2021)</div>
        `;
      }
  
      // 6. CONTACT ENDPOINTS
      if (q.includes('contact') || q.includes('--contact') || q.includes('email') || q.includes('hire')) {
        return `
          <div class="text-blue-400 font-bold">COMMUNICATION ENDPOINTS:</div>
          <div>📧 Email : <a href="mailto:${ARSH_PROFILE.contact.email}" class="text-emerald-400 underline">${ARSH_PROFILE.contact.email}</a></div>
          <div>📞 Phone : <span class="text-amber-400">${ARSH_PROFILE.contact.phone}</span></div>
          <div>📍 Loc   : <span class="text-slate-300">Mumbai, India</span></div>
        `;
      }
  
      // 7. CLEAR COMMAND
      if (q === 'clear') {
        messagesContainer.innerHTML = '<div class="text-slate-500">// Buffer cleared. Ready.</div>';
        return null;
      }
  
      // FALLBACK RESPONSE
      return `
        <div class="text-slate-400">Command not recognized: '<span class="text-red-400">${query}</span>'.</div>
        <div>Type <span class="text-emerald-400 font-bold">arsh --help</span> to list valid commands.</div>
      `;
    }
  
    function handleSend() {
      const text = userInput.value.trim();
      if (!text) return;
  
      userInput.value = '';
      const output = processCliCommand(text);
  
      if (output !== null) {
        appendCommandOutput(text, output);
      }
    }
  
    sendBtn.addEventListener('click', handleSend);
    userInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSend();
    });

   // Web Speech API Voice Recognition (Robust Version)
  const micBtn = document.getElementById('mic-btn');
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = true; // Capture intermediate speech so you see it typing live!

    let isListening = false;

    micBtn.addEventListener('click', () => {
      if (isListening) {
        recognition.stop();
      } else {
        try {
          recognition.start();
        } catch (err) {
          console.warn("Mic already active or blocked:", err);
        }
      }
    });

    recognition.onstart = () => {
      isListening = true;
      micBtn.classList.add('mic-listening');
      userInput.value = '';
      userInput.placeholder = "Listening... Speak now!";
    };

    recognition.onend = () => {
      isListening = false;
      micBtn.classList.remove('mic-listening');
      userInput.placeholder = "type 'arsh --help' or query...";
    };

    // Fires continuously as you speak
    recognition.onresult = (event) => {
      let speechResult = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        speechResult += event.results[i][0].transcript;
      }

      const cleanSpeech = speechResult.trim().toLowerCase();
      userInput.value = cleanSpeech; // Show real-time transcript in the input box

      // Execute command only when speech is finalized
      if (event.results[0].isFinal) {
        let mappedCommand = cleanSpeech;

        // Intent Mapping
        if (cleanSpeech.includes('skill') || cleanSpeech.includes('stack')) mappedCommand = 'arsh --skills';
        else if (cleanSpeech.includes('project') || cleanSpeech.includes('repo')) mappedCommand = 'arsh --projects';
        else if (cleanSpeech.includes('experience') || cleanSpeech.includes('work') || cleanSpeech.includes('tcs')) mappedCommand = 'arsh --exp';
        else if (cleanSpeech.includes('education') || cleanSpeech.includes('degree')) mappedCommand = 'arsh --edu';
        else if (cleanSpeech.includes('contact') || cleanSpeech.includes('email') || cleanSpeech.includes('phone')) mappedCommand = 'arsh --contact';

        userInput.value = mappedCommand;

        // Slight delay to ensure DOM updates input value before running
        setTimeout(() => {
          handleSend();
        }, 100);
      }
    };

    recognition.onerror = (event) => {
      console.warn("Speech recognition error:", event.error);
      isListening = false;
      micBtn.classList.remove('mic-listening');

      if (event.error === 'not-allowed') {
        appendCommandOutput('voice --status', '<span class="text-red-400">[MIC ERROR] Microphone access blocked by browser. Please allow microphone permissions in your URL bar.</span>');
      } else if (event.error === 'no-speech') {
        userInput.placeholder = "No speech detected. Try again...";
      } else {
        userInput.placeholder = "Voice error (" + event.error + "). Try typing...";
      }
    };
  } else {
    // Hide mic button if browser doesn't support Web Speech API
    if (micBtn) micBtn.style.display = 'none';
  }
  
    fetchGithubKnowledge();

    // Add these cases inside processCliCommand(query) in chatbot.js

// Secret Command: arsh --hire
if (q.includes('--hire') || q.includes('hire arsh')) {
    setTimeout(() => {
      window.location.href = 'mailto:arsh.lakers@gmail.com?subject=Job%20Offer%20-%20AI%20Engineer&body=Hi%20Arsh,%0A%0AWe%20loved%20your%20portfolio!';
    }, 1200);
  
    return `
      <div class="text-emerald-400 font-bold animate-pulse">[INITIATING RECRUITMENT PROTOCOL]</div>
      <div class="text-slate-300 text-[10px]">
        Launching default email client for <span class="text-cyan-400">arsh.lakers@gmail.com</span>...
      </div>
      <pre class="text-emerald-500 text-[8px] leading-none my-1">
    __  __ ___ ___  ___ ___  
   |  \/  |_ _/ __|/ __|_ _| 
   | |\/| || |\__ \ (__ | |  
   |_|  |_|___|___/\___|___| 
      </pre>
    `;
  }
  
  // Secret Command: arsh --sudo
  if (q.includes('--sudo') || q.includes('sudo')) {
    return `
      <div class="text-red-400 font-bold">[SECURITY ALERT] ACCESS DENIED</div>
      <div class="text-slate-400 text-[10px]">Guest user is not in the sudoers file. Incident reported to <span class="text-amber-400">arsh@security.sys</span>.</div>
    `;
  }
  
  // Secret Command: arsh --game (Mini Terminal Number Guessing Challenge)
  if (q.includes('--game') || q === 'game') {
    return `
      <div class="text-amber-400 font-bold">[MINI TERMINAL CHALLENGE]</div>
      <div class="text-slate-300 text-[10px]">Decode the binary: What is <span class="text-cyan-400 font-bold">01000001</span> in ASCII?</div>
      <div class="text-slate-400 text-[10px] pl-2">Type your 1-character answer in the CLI prompt!</div>
    `;
  }
  
  if (q === 'a') {
    return `<div class="text-emerald-400 font-bold">ACCESS GRANTED! Correct answer (01000001 = 'A'). You think like an AI.</div>`;
  }
  
  })();
