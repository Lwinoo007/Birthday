/**
 * ENGINE & STATE CONTROLLER
 */
document.addEventListener('DOMContentLoaded', () => {
  // CONFIGURATION CONSTANTS
  const START_DATE = new Date('2021-04-21T00:00:00'); // Edit relationship start date here
  const LETTER_CONTENT = `Happy Birthday, Bae❤️.\n\nThank you for making my world brighter.\nFor the past five beautiful years,\nyou have been my happiness,\nmy peace,\nand my favorite person.\n\nYour smile is my home.\nYour laugh is my favorite melody.\nNo matter where life takes us,\nI will always choose you.\n\nပျော်ရွှင်သော နေ့ရက်တိုင်းကို ရရှိနိုင်ပါစေ...✨\n\nHappy Birthday.\nI love you forever.\n\nLove,\nOPPA ❤️`;

  // APP STATE
  let currentScene = 1;
  let canvas, ctx;
  let particles = [];
  let fxMode = 'stars'; // 'stars', 'aurora', 'fireworks', 'finale'
  let isAudioPlaying = false;

  // DOM ELEMENTS
  const bgMusic = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-btn');

  /* ==========================================================================
     AUDIO CONTROLLER
     ========================================================================== */
//   function toggleAudio() {
//     if (isAudioPlaying) {
//       bgMusic.pause();
//       musicBtn.querySelector('.music-label').textContent = 'Play Music';
//       isAudioPlaying = false;
//     } else {
//       bgMusic.play().then(() => {
//         musicBtn.querySelector('.music-label').textContent = 'Pause Music';
//         isAudioPlaying = true;
//       }).catch(err => console.log("Audio playback deferred user gesture:", err));
//     }
//   }
//   musicBtn.addEventListener('click', toggleAudio);

  /* ==========================================================================
     AUDIO CONTROLLER & AUTOPLAY TRIGGER
     ========================================================================== */
  function toggleAudio() {
    if (isAudioPlaying) {
      bgMusic.pause();
      musicBtn.querySelector('.music-label').textContent = 'Play Music';
      isAudioPlaying = false;
    } else {
      bgMusic.play().then(() => {
        musicBtn.querySelector('.music-label').textContent = 'Pause Music';
        isAudioPlaying = true;
      }).catch(err => console.log("Audio play deferred:", err));
    }
  }
  musicBtn.addEventListener('click', toggleAudio);

  /* ==========================================================================
     SCENE MANAGEMENT
     ========================================================================== */
  function switchScene(sceneNumber) {
    const activeScene = document.querySelector('.scene.active');
    if (activeScene) activeScene.classList.remove('active');

    currentScene = sceneNumber;
    const targetScene = document.getElementById(`scene-${sceneNumber}`);
    
    setTimeout(() => {
      targetScene.classList.add('active');
      onSceneActivate(sceneNumber);
    }, 500);
  }

  function onSceneActivate(sceneNumber) {
    switch(sceneNumber) {
      case 1:
        runScene1();
        break;
      case 2:
        fxMode = 'aurora';
        runScene2();
        break;
      case 3:
        // Envelope stage ready
        break;
      case 4:
        init3DCarousel();
        break;
      case 5:
        initLoveCounter();
        break;
      case 6:
        // Cake stage ready
        break;
      case 7:
        fxMode = 'finale';
        break;
    }
  }

  /* ==========================================================================
     SCENE 1: CINEMATIC FADE IN
     ========================================================================== */
//   function runScene1() {
//     const textEl = document.getElementById('scene1-text');
//     setTimeout(() => {
//       textEl.classList.add('in');
//     }, 500);

//     setTimeout(() => {
//       textEl.classList.remove('in');
//       setTimeout(() => switchScene(2), 2000);
//     }, 4500);
//   }

  /* ==========================================================================
     SCENE 1: CINEMATIC INTRO (TAP TO START & PLAY MUSIC)
     ========================================================================== */
  function runScene1() {
    const startTrigger = document.getElementById('scene-1');
    const textEl = document.getElementById('scene1-text');
    let started = false;

    function startExperience() {
      if (started) return;
      started = true;

      if (!isAudioPlaying) {
        toggleAudio();
      }

      textEl.classList.remove('in');

      setTimeout(() => {
        textEl.textContent = "Tonight, every star shines a little brighter...";
        textEl.classList.add('in');
      }, 1000);

      setTimeout(() => {
        textEl.classList.remove('in');
        setTimeout(() => switchScene(2), 2000);
      }, 5000);
    }

    startTrigger.addEventListener('click', startExperience, { once: true });
    startTrigger.addEventListener('touchstart', startExperience, { once: true });
  }

  /* ==========================================================================
     SCENE 2: GALAXY TITLE REVEAL
     ========================================================================== */
  function runScene2() {
    setTimeout(() => document.getElementById('scene2-sub').classList.add('show-element'), 300);
    setTimeout(() => document.getElementById('scene2-h1').classList.add('show-element'), 1200);
    setTimeout(() => document.getElementById('scene2-h2').classList.add('show-element'), 2200);
  }

  document.getElementById('to-scene-3').addEventListener('click', () => switchScene(3));

  /* ==========================================================================
     SCENE 3: INTERACTIVE LOVE LETTER & TYPEWRITER
     ========================================================================== */
//   const envelope = document.getElementById('envelope');
//   const typewriterText = document.getElementById('typewriter-text');
//   let typewriterStarted = false;

//   envelope.addEventListener('click', () => {
//     if (!envelope.classList.contains('open')) {
//       envelope.classList.add('open');
//       document.getElementById('envelope-hint').style.display = 'none';
//       if (!typewriterStarted) {
//         typewriterStarted = true;
//         setTimeout(startTypewriter, 800);
//       }
//     }
//   });

  /* ==========================================================================
   SCENE 3: INTERACTIVE LOVE LETTER & TYPEWRITER EFFECT
   ========================================================================== */
    const envelope = document.getElementById('envelope');
    const typewriterText = document.getElementById('typewriter-text');
    let typewriterStarted = false;

    envelope.addEventListener('click', () => {
    if (!envelope.classList.contains('open')) {
        envelope.classList.add('open');

        const hint = document.getElementById('envelope-hint');
        if (hint) {
        hint.style.display = 'none';
        }

        setTimeout(() => {
        envelope.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        }, 300);

        if (!typewriterStarted) {
        typewriterStarted = true;
        setTimeout(startTypewriter, 800);
        }
    }
    });

  function startTypewriter() {
    let index = 0;
    typewriterText.textContent = '';
    
    function type() {
      if (index < LETTER_CONTENT.length) {
        typewriterText.textContent += LETTER_CONTENT.charAt(index);
        index++;
        setTimeout(type, 35);
      } else {
        document.getElementById('to-scene-4').classList.remove('hidden');
      }
    }
    type();
  }

  document.getElementById('to-scene-4').addEventListener('click', () => switchScene(4));

  /* ==========================================================================
     SCENE 4: 3D CAROUSEL
     ========================================================================== */
  let carouselAngle = 0;
  const carouselNode = document.getElementById('carousel-3d');

  function init3DCarousel() {
    const cards = carouselNode.querySelectorAll('.carousel-card');
    const count = cards.length;
    const radius = Math.round((cards[0].offsetWidth / 2) / Math.tan(Math.PI / count)) + 20;

    cards.forEach((card, i) => {
      const angle = (360 / count) * i;
      card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    });
  }

  function rotateCarousel(direction) {
    carouselAngle += direction * 36; // 360 deg / 10 cards
    carouselNode.style.transform = `rotateY(${carouselAngle}deg)`;
  }

  document.getElementById('prev-photo').addEventListener('click', () => rotateCarousel(1));
  document.getElementById('next-photo').addEventListener('click', () => rotateCarousel(-1));
  document.getElementById('to-scene-5').addEventListener('click', () => switchScene(5));

  /* ==========================================================================
     SCENE 5: LIVE LOVE COUNTER
     ========================================================================== */
  function initLoveCounter() {
    function updateCounter() {
      const now = new Date();
      const diff = now - START_DATE;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      document.getElementById('timer-days').textContent = String(days).padStart(4, '0');
      document.getElementById('timer-hours').textContent = String(hours).padStart(2, '0');
      document.getElementById('timer-minutes').textContent = String(minutes).padStart(2, '0');
      document.getElementById('timer-seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    updateCounter();
    setInterval(updateCounter, 1000);
  }

  document.getElementById('to-scene-6').addEventListener('click', () => switchScene(6));

  /* ==========================================================================
     SCENE 6: CAKE CANDLE & SMOKE
     ========================================================================== */
  const flame = document.getElementById('flame');
  
  flame.addEventListener('click', () => {
    if (!flame.classList.contains('extinguished')) {
      flame.classList.add('extinguished');
      createSmoke();
      fxMode = 'fireworks';
      
      setTimeout(() => {
        document.getElementById('to-scene-7').classList.remove('hidden');
      }, 1500);
    }
  });

  function createSmoke() {
    const container = document.getElementById('smoke-container');
    for (let i = 0; i < 12; i++) {
      const smoke = document.createElement('div');
      smoke.style.cssText = `
        position: absolute;
        width: 8px;
        height: 8px;
        background: rgba(200,200,200,0.6);
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(200,200,200,0.5);
        animation: rise ${1 + Math.random()}s cubic-bezier(0,0,0.2,1) forwards;
        animation-delay: ${Math.random() * 0.3}s;
      `;
      container.appendChild(smoke);
    }
  }

  // Inject smoke keyframe dynamically
  const styleSheet = document.createElement("style");
  styleSheet.innerText = `
    @keyframes rise {
      0% { transform: translate(0, 0) scale(1); opacity: 0.8; }
      100% { transform: translate(${(Math.random() - 0.5) * 60}px, -80px) scale(3); opacity: 0; }
    }
  `;
  document.head.appendChild(styleSheet);

  document.getElementById('to-scene-7').addEventListener('click', () => switchScene(7));

  /* ==========================================================================
     HARDWARE-ACCELERATED CANVAS PHYSICS SYSTEM (STARS, AURORA, PETALS, FIREWORKS)
     ========================================================================== */
  function initCanvas() {
    canvas = document.getElementById('fx-canvas');
    ctx = canvas.getContext('2d');
    
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Populate Background Entities
    for(let i = 0; i < 150; i++) {
      particles.push(new Star());
    }

    requestAnimationFrame(renderLoop);
  }

  class Star {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5;
      this.alpha = Math.random();
      this.speed = 0.005 + Math.random() * 0.015;
    }
    update() {
      this.alpha += this.speed;
      if (this.alpha > 1 || this.alpha < 0) this.speed = -this.speed;
    }
    draw() {
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(this.alpha)})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  class FireworkParticle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 1;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.alpha = 1;
      this.friction = 0.98;
      this.gravity = 0.05;
    }
    update() {
      this.vx *= this.friction;
      this.vy *= this.friction;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= 0.012;
    }
    draw() {
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  let activeFireworks = [];

  function spawnFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * (canvas.height * 0.5);
    const colors = ['#ff2a85', '#ffd700', '#ffffff', '#8a2be2', '#00ffff'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < 50; i++) {
      activeFireworks.push(new FireworkParticle(x, y, color));
    }
  }

  function renderLoop() {
    // Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Aurora gradient background layer if applicable
    if (fxMode === 'aurora' || fxMode === 'fireworks' || fxMode === 'finale') {
      let grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#030308');
      grad.addColorStop(0.5, '#0a0b1e');
      grad.addColorStop(1, '#160a29');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Render twinkling stars
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    // Render Fireworks active mode
    if (fxMode === 'fireworks' || fxMode === 'finale') {
      if (Math.random() < 0.05) spawnFirework();

      activeFireworks.forEach((fw, index) => {
        fw.update();
        fw.draw();
        if (fw.alpha <= 0) activeFireworks.splice(index, 1);
      });
    }

    requestAnimationFrame(renderLoop);
  }

  // Initialize Canvas Systems & First Scene
  initCanvas();
  runScene1();
});

