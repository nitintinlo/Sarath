/**
 * Fireflies & River Mist Particle Engine
 * Creates realistic, organic bio-luminescent fireflies and rolling river fog across all sections
 */

class BackwaterAtmosphere {
  constructor() {
    this.fireflyCanvas = document.getElementById('fireflies-canvas');
    this.fogCanvas = document.getElementById('fog-canvas');
    if (!this.fireflyCanvas || !this.fogCanvas) return;

    this.fCtx = this.fireflyCanvas.getContext('2d');
    this.fogCtx = this.fogCanvas.getContext('2d');

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.fireflies = [];
    this.fogPuffs = [];

    this.mouse = { x: -1000, y: -1000, vx: 0, vy: 0 };
    this.lastMouse = { x: -1000, y: -1000 };

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));

    // Generous firefly count for full-screen immersive green shining particles across the entire background
    const fireflyCount = Math.min(Math.floor((this.width * this.height) / 7000), 150);
    for (let i = 0; i < fireflyCount; i++) {
      this.fireflies.push(this.createFirefly());
    }

    // Spawn River Fog Puffs
    const fogCount = 22;
    for (let i = 0; i < fogCount; i++) {
      this.fogPuffs.push(this.createFogPuff());
    }

    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.fireflyCanvas.width = this.width;
    this.fireflyCanvas.height = this.height;
    this.fogCanvas.width = this.width;
    this.fogCanvas.height = this.height;
  }

  onMouseMove(e) {
    this.mouse.vx = e.clientX - this.lastMouse.x;
    this.mouse.vy = e.clientY - this.lastMouse.y;
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
    this.lastMouse.x = e.clientX;
    this.lastMouse.y = e.clientY;
  }

  createFirefly() {
    // Variety of luminous Kerala backwater colors:
    // 85% vivid glowing emerald & lime fireflies, 15% warm golden temple lamp embers
    const rand = Math.random();
    let color, glowRadiusMult;
    if (rand < 0.55) {
      color = '13, 242, 148'; // Signature vibrant emerald
      glowRadiusMult = 10.0;
    } else if (rand < 0.85) {
      color = '55, 255, 175'; // Intense shining lime-emerald
      glowRadiusMult = 11.0;
    } else {
      color = '245, 210, 95'; // Warm ancestral gold ember
      glowRadiusMult = 9.0;
    }

    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      radius: Math.random() * 2.8 + 1.4,
      baseAlpha: Math.random() * 0.4 + 0.6, // Highly visible vivid alpha
      alpha: 0,
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.045 + 0.018,
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: -Math.random() * 0.6 - 0.15, // Natural upward floating drift from water
      wander: Math.random() * 0.05 + 0.02,
      color: color,
      glowRadiusMult: glowRadiusMult
    };
  }

  createFogPuff() {
    return {
      x: Math.random() * (this.width + 400) - 200,
      y: Math.random() * this.height,
      radius: Math.random() * 260 + 180,
      vx: Math.random() * 0.22 + 0.07,
      alpha: Math.random() * 0.055 + 0.02,
      scaleY: Math.random() * 0.35 + 0.3
    };
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // 1. Draw Fireflies
    this.fCtx.clearRect(0, 0, this.width, this.height);

    for (let f of this.fireflies) {
      // Natural harmonic sine pulse
      f.phase += f.pulseSpeed;
      const pulse = Math.sin(f.phase);
      f.alpha = Math.max(0, pulse) * f.baseAlpha;

      // Organic wandering motion
      f.speedX += (Math.random() - 0.5) * f.wander;
      f.speedY += (Math.random() - 0.5) * f.wander;
      f.speedX = Math.max(-1.1, Math.min(1.1, f.speedX));
      f.speedY = Math.max(-0.9, Math.min(0.2, f.speedY)); // Kept with gentle upward bias

      f.x += f.speedX;
      f.y += f.speedY;

      // Mouse gentle interaction (swirl/repel)
      const dx = f.x - this.mouse.x;
      const dy = f.y - this.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 140) {
        const force = (140 - dist) / 140;
        f.x += (dx / dist) * force * 2.8;
        f.y += (dy / dist) * force * 2.8;
      }

      // Seamless screen wrapping
      if (f.x < -30) f.x = this.width + 30;
      if (f.x > this.width + 30) f.x = -30;
      if (f.y < -30) {
        f.y = this.height + 30;
        f.x = Math.random() * this.width;
      }
      if (f.y > this.height + 30) f.y = -30;

      // Render glowing particle with multi-stage luminous radial halo
      if (f.alpha > 0.01) {
        const haloR = f.radius * f.glowRadiusMult;
        const gradient = this.fCtx.createRadialGradient(
          f.x, f.y, 0,
          f.x, f.y, haloR
        );
        gradient.addColorStop(0, `rgba(${f.color}, ${f.alpha * 0.95})`);
        gradient.addColorStop(0.25, `rgba(${f.color}, ${f.alpha * 0.55})`);
        gradient.addColorStop(0.65, `rgba(${f.color}, ${f.alpha * 0.18})`);
        gradient.addColorStop(1, `rgba(${f.color}, 0)`);

        this.fCtx.beginPath();
        this.fCtx.arc(f.x, f.y, haloR, 0, Math.PI * 2);
        this.fCtx.fillStyle = gradient;
        this.fCtx.fill();

        // Intense radiant core
        this.fCtx.beginPath();
        this.fCtx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        this.fCtx.fillStyle = `rgba(255, 255, 255, ${f.alpha * 0.95})`;
        this.fCtx.shadowColor = `rgba(${f.color}, 1)`;
        this.fCtx.shadowBlur = 12;
        this.fCtx.fill();
        this.fCtx.shadowBlur = 0; // Reset
      }
    }

    // 2. Draw Rolling River Fog
    this.fogCtx.clearRect(0, 0, this.width, this.height);

    for (let p of this.fogPuffs) {
      p.x += p.vx;
      if (p.x - p.radius > this.width) {
        p.x = -p.radius * 2;
        p.y = Math.random() * this.height;
      }

      this.fogCtx.save();
      this.fogCtx.translate(p.x, p.y);
      this.fogCtx.scale(1, p.scaleY);

      const fogGrad = this.fogCtx.createRadialGradient(0, 0, 0, 0, 0, p.radius);
      fogGrad.addColorStop(0, `rgba(30, 85, 60, ${p.alpha * 1.3})`);
      fogGrad.addColorStop(0.5, `rgba(15, 55, 38, ${p.alpha * 0.6})`);
      fogGrad.addColorStop(1, 'rgba(5, 20, 14, 0)');

      this.fogCtx.fillStyle = fogGrad;
      this.fogCtx.beginPath();
      this.fogCtx.arc(0, 0, p.radius, 0, Math.PI * 2);
      this.fogCtx.fill();

      this.fogCtx.restore();
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.backwaterAtmosphere = new BackwaterAtmosphere();
  });
} else {
  window.backwaterAtmosphere = new BackwaterAtmosphere();
}
