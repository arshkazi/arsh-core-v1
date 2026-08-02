/* ==========================================================================
   ARSH-CLI & JARVIS CHATBOT ENGINE
   Candidate: Kazi Mohammed Arsh
   ========================================================================== */

// 1. CONFIGURATION
// Replace with your live Vercel deployment endpoint once deployed!
const GEMINI_API_ENDPOINT = 'https://arsh-jarvis-cli.vercel.app/api/chat';

// DOM Element References (Ensure these IDs match your index.html)
const userInput = document.getElementById('cli-input');
const terminalBuffer = document.getElementById('cli-output-buffer');
const voiceBtn = document.getElementById('voice-input-btn');

/* ==========================================================================
   2. MAIN CLI & GEMINI COMMAND PROCESSOR
   ========================================================================== */
async function processCliCommand(query) {
  const q = query.trim().toLowerCase();

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
        💡 <span class="text-slate-300">Tip:</span> Click the <i class="fas fa-microphone text-emerald-400"></i> icon or ask custom open-ended questions to speak with JARVIS!
      </div>
    `;
  }

  // 2. SKILLS MATRIX COMMAND
  if (q.includes('--skills') || q === 'skills') {
    return `
      <div class="text-emerald-400 font-bold">[TECHNICAL STACK MATRIX]</div>
      <div class="text-slate-300 space-y-1 text-[11px]">
        <div><span class="text-slate-500">> Languages:</span> Python (Advanced), SQL, Bash, JavaScript</div>
        <div><span class="text-slate-500">> Frameworks:</span> PyTorch, FastAPI, Flask, Scikit-Learn, LangChain, LangGraph</div>
        <div><span class="text-slate-500">> MLOps & DBs:</span> Docker, Azure AI Foundry, FAISS, ChromaDB, Git, CI/CD</div>
        <div><span class="text-slate-500">> XAI & Analytics:</span> SHAP, LIME, XGBoost, Feature Engineering</div>
      </div>
    `;
  }

  // 3. PROJECTS COMMAND
  if (q.includes('--projects') || q === 'projects') {
    return `
      <div class="text-cyan-400 font-bold">[FEATURED AI PROJECTS]</div>
      <div class="space-y-1.5 text-[11px]">
        <div>
          <span class="text-slate-200 font-bold">1. Customer Churn Prediction (XAI)</span>
          <div class="text-slate-400">XGBoost model optimized with SMOTE & explained using SHAP/LIME feature attributions.</div>
        </div>
        <div>
          <span class="text-slate-200 font-bold">2. Domain Name Valuation Engine</span>
          <div class="text-slate-400">Deep Learning MLP trained on 6.8M records for accurate price prediction.</div>
        </div>
        <div>
          <span class="text-slate-200 font-bold">3. Multi-Agent RAG Pipeline</span>
          <div class="text-slate-400">LangGraph-driven agent workflow with FAISS vector retrieval & fallback routing.</div>
        </div>
      </div>
    `;
  }

  // 4. EXPERIENCE COMMAND
  if (q.includes('--exp') || q === 'experience') {
    return `
      <div class="text-amber-400 font-bold">[ENTERPRISE HISTORY]</div>
      <div class="space-y-1.5 text-[11px]">
        <div>
          <span class="text-emerald-400 font-bold">AI Engineer @ Vibrant Minds</span> <span class="text-slate-500">(2024 - 2026)</span>
          <div class="text-slate-400">Engineered Agentic GenAI workflows, integrated FAISS vector databases, and deployed LLM backend APIs.</div>
        </div>
        <div>
          <span class="text-cyan-400 font-bold">Python Dev & Data Engineer @ TCS</span> <span class="text-slate-500">(2021 - 2023)</span>
          <div class="text-slate-400">Maintained enterprise data pipelines with >95% SLA compliance & built core Python automation scripts.</div>
        </div>
      </div>
    `;
  }

  // 5. EDUCATION COMMAND
  if (q.includes('--edu') || q === 'education') {
    return `
      <div class="text-purple-400 font-bold">[ACADEMIC CREDENTIALS]</div>
      <div class="space-y-1 text-[11px]">
        <div><span class="text-slate-200 font-bold">MSc Artificial Intelligence (Distinction)</span></div>
        <div class="text-slate-400">University of East London (2024 - 2025)</div>
        <div class="text-slate-500 text-[10px]">Specialization: Deep Learning, NLP, Ethics in AI, Explainable AI</div>
        <div class="mt-1"><span class="text-slate-200 font-bold">BSc Information Technology (CGPI 7.22)</span></div>
        <div class="text-slate-400">Mumbai University (2018 - 2021)</div>
      </div>
    `;
  }

  // 6. CONTACT COMMAND
  if (q.includes('--contact') || q === 'contact') {
    return `
      <div class="text-blue-400 font-bold">[COMMUNICATION ENDPOINTS]</div>
      <div class="text-slate-300 space-y-0.5 text-[11px]">
        <div>📧 Email: <a href="mailto:arsh.lakers@gmail.com" class="text-cyan-400 underline">arsh.lakers@gmail.com</a></div>
        <div>🌐 LinkedIn: <a href="https://linkedin.com" target="_blank" class="text-cyan-400 underline">linkedin.com/in/kazi-arsh</a></div>
        <div>💻 GitHub: <a href="https://github.com" target="_blank" class="text-cyan-400 underline">github.com/kazi-arsh</a></div>
        <div>📍 Location: Mumbai, India</div>
      </div>
    `;
  }

  // 7. DOWNLOAD CV COMMAND
  if (q.includes('cv') || q.includes('resume') || q.includes('--download-cv')) {
    const RESUME_FILE_PATH = 'Kazi_Mohammed_Arsh_Resume.pdf';
    triggerTerminalDownload(RESUME_FILE_PATH);

    return `
      <div class="text-purple-400 font-bold">[INITIATING FILE TRANSFER]</div>
      <div class="text-slate-400 text-[10px]">Target: <span class="text-slate-200">Kazi_Mohammed_Arsh_Resume.pdf</span></div>
      <div id="cv-download-progress" class="text-emerald-400 font-bold font-mono text-[10px] mt-1">
        [░░░░░░░░░░░░░░░░░░░░] 0%
      </div>
    `;
  }

  // 8. CLEAR BUFFER COMMAND
  if (q === 'clear' || q === 'cls') {
    if (terminalBuffer) terminalBuffer.innerHTML = '';
    return '';
  }

  // 9. SECRET EASTER EGGS
  if (q.includes('--hire') || q.includes('hire arsh')) {
    setTimeout(() => {
      window.location.href = 'mailto:arsh.lakers@gmail.com?subject=Job%20Offer%20-%20AI%20Engineer&body=Hi%20Arsh,%0A%0AWe%20loved%20your%20portfolio!';
    }, 1200);

    return `
      <div class="text-emerald-400 font-bold animate-pulse">[INITIATING RECRUITMENT PROTOCOL]</div>
      <div class="text-slate-300 text-[10px]">Launching email client for <span class="text-cyan-400">arsh.lakers@gmail.com</span>...</div>
    `;
  }

  if (q.includes('--sudo') || q.includes('sudo')) {
    return `
      <div class="text-red-400 font-bold">[SECURITY ALERT] ACCESS DENIED</div>
      <div class="text-slate-400 text-[10px]">Guest user is not in the sudoers file. Incident reported.</div>
    `;
  }

  if (q.includes('--game') || q === 'game') {
    return `
      <div class="text-amber-400 font-bold">[MINI TERMINAL CHALLENGE]</div>
      <div class="text-slate-300 text-[10px]">Decode the binary: What is <span class="text-cyan-400 font-bold">01000001</span> in ASCII?</div>
      <div class="text-slate-400 text-[10px] pl-2">Type your 1-character answer in the CLI prompt!</div>
    `;
  }

  if (q === 'a') {
    return `<div class="text-emerald-400 font-bold">ACCESS GRANTED! Correct answer (01000001 = 'A').</div>`;
  }

  // 10. DYNAMIC GEMINI JARVIS FALLBACK FOR OPEN-ENDED QUESTIONS
  try {
    const response = await fetch(GEMINI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: query })
    });

    if (!response.ok) throw new Error('API unreachable');

    const data = await response.json();
    return `<div class="text-slate-200">${data.reply}</div>`;
  } catch (err) {
    return `
      <div class="text-amber-400 font-bold">[JARVIS OFFLINE / LOCAL MODE]</div>
      <div class="text-slate-400 text-[10px]">Could not establish link to remote AI core. Run <span class="text-emerald-400">arsh --help</span> to view all local terminal commands.</div>
    `;
  }
}

/* ==========================================================================
   3. TERMINAL UI RENDERERS & EVENT HANDLERS
   ========================================================================== */

// Appends user input line to buffer
function appendUserQuery(cmdText) {
  if (!terminalBuffer) return;

  const userLine = document.createElement('div');
  userLine.className = 'text-slate-400 font-mono text-xs mt-2';
  userLine.innerHTML = `<span class="text-emerald-400">guest@arsh-cli:~$</span> ${escapeHtml(cmdText)}`;
  terminalBuffer.appendChild(userLine);
}

// Appends CLI/JARVIS output to buffer
function appendCommandOutput(outputHtml) {
  if (!terminalBuffer || !outputHtml) return;

  const outputLine = document.createElement('div');
  outputLine.className = 'font-mono text-xs mb-2 pl-2 border-l border-slate-800';
  outputLine.innerHTML = outputHtml;
  terminalBuffer.appendChild(outputLine);

  terminalBuffer.scrollTop = terminalBuffer.scrollHeight;
}

// Main Send Trigger
async function handleSend() {
  if (!userInput) return;
  const input = userInput.value.trim();
  if (!input) return;

  userInput.value = '';
  appendUserQuery(input);

  // Render temporary processing state for long API calls
  const tempId = 'proc-' + Date.now();
  const tempLine = document.createElement('div');
  tempLine.id = tempId;
  tempLine.className = 'text-slate-500 font-mono text-[10px] pl-2 animate-pulse';
  tempLine.innerText = '[PROCESSING COMMAND...]';
  if (terminalBuffer) {
    terminalBuffer.appendChild(tempLine);
    terminalBuffer.scrollTop = terminalBuffer.scrollHeight;
  }

  // AWAIT async result
  const outputHtml = await processCliCommand(input);

  // Remove processing placeholder and print output
  const tempEl = document.getElementById(tempId);
  if (tempEl) tempEl.remove();

  appendCommandOutput(outputHtml);
}

// Quick Suggestion Chips Trigger
async function executeQuickCmd(cmdText) {
  if (userInput) userInput.value = cmdText;
  await handleSend();
}

// Enter Key Listener
if (userInput) {
  userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSend();
  });
}

/* ==========================================================================
   4. FILE DOWNLOAD ANIMATION
   ========================================================================== */
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
        progressEl.innerHTML = `<span class="text-emerald-400">[████████████████████] 100% TRANSFER COMPLETE</span>`;
      }

      setTimeout(() => {
        const link = document.createElement('a');
        link.href = filePath;
        link.target = '_blank';
        link.download = 'Kazi_Mohammed_Arsh_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 300);
    }
  }, 150);
}

/* ==========================================================================
   5. VOICE RECOGNITION (SPEECH-TO-TEXT)
   ========================================================================== */
if (voiceBtn) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      voiceBtn.classList.add('text-red-500', 'animate-pulse');
    };

    recognition.onend = () => {
      voiceBtn.classList.remove('text-red-500', 'animate-pulse');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (userInput) {
        userInput.value = transcript;
        handleSend();
      }
    };

    voiceBtn.addEventListener('click', () => recognition.start());
  } else {
    voiceBtn.style.display = 'none'; // Hide if browser doesn't support webkitSpeechRecognition
  }
}

// Utility HTML escaper
function escapeHtml(text) {
  const div = document.createElement('div');
  div.innerText = text;
  return div.innerHTML;
}
<script src="matrix_fx.js"></script>
    <script src="chatbot.js"></script>
  </body>
</html>
