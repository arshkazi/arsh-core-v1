// Matrix Digital Rain & CRT Controller Engine
(function() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
  
    let matrixInterval = null;
    let isMatrixActive = false;
  
    // Characters for Matrix Rain
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    const alphabet = katakana + latin;
  
    const fontSize = 14;
    let columns = 0;
    let rainDrops = [];
  
    function initMatrixCanvas() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      rainDrops = Array(columns).fill(1);
    }
  
    function drawMatrixRain() {
      if (!ctx) return;
      ctx.fillStyle = 'rgba(2, 11, 6, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      ctx.fillStyle = '#10b981'; // Emerald Green
      ctx.font = fontSize + 'px monospace';
  
      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
  
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    }
  
    // Explicitly expose functions to global scope so inline onclick="toggleMatrixRain()" works
    window.toggleMatrixRain = function() {
      const statusText = document.getElementById('matrix-status-text');
      const targetCanvas = document.getElementById('matrix-canvas');
  
      if (!targetCanvas) {
        console.warn("Matrix Canvas element (#matrix-canvas) not found in DOM.");
        return;
      }
  
      if (!isMatrixActive) {
        targetCanvas.classList.remove('hidden');
        initMatrixCanvas();
        matrixInterval = setInterval(drawMatrixRain, 33);
        isMatrixActive = true;
        if (statusText) {
          statusText.innerText = "ON";
          statusText.className = "text-emerald-400 font-bold";
        }
      } else {
        clearInterval(matrixInterval);
        if (ctx) ctx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
        targetCanvas.classList.add('hidden');
        isMatrixActive = false;
        if (statusText) {
          statusText.innerText = "OFF";
          statusText.className = "text-slate-500";
        }
      }
    };
  
    window.toggleCrtEffect = function() {
      const statusText = document.getElementById('crt-status-text');
      const isCrtOn = document.body.classList.toggle('crt-overlay');
  
      if (statusText) {
        statusText.innerText = isCrtOn ? "ON" : "OFF";
        statusText.className = isCrtOn ? "text-cyan-400 font-bold" : "text-slate-500";
      }
    };
  
    window.addEventListener('resize', () => {
      if (isMatrixActive) initMatrixCanvas();
    });
  })();