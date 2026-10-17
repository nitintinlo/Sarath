/**
 * Atmospheric Audio Engine for SP Sharath Website
 * Generates dark Kerala backwaters river ambience, nocturnal cicadas,
 * and low psychological horror drones entirely with Web Audio API.
 * Zero external audio file dependencies needed!
 */

class BackwaterAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.riverGain = null;
    this.cricketGain = null;
    this.droneGain = null;
    this.isMuted = false;
    this.nodes = [];
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // River Sub-Engine
    this.createRiverSoundscape();

    // Night Insects / Cicadas Engine
    this.createCicadaSoundscape();

    // Low Dark Drone Engine
    this.createDarkDrone();
  }

  createRiverSoundscape() {
    // Generate pink noise buffer for realistic water current
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.06;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Bandpass filter to simulate gentle water lap
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.8, this.ctx.currentTime);

    // LFO for slow undulating river currents
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // very slow breath

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(180, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    this.riverGain = this.ctx.createGain();
    this.riverGain.gain.setValueAtTime(0.24, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(this.riverGain);
    this.riverGain.connect(this.masterGain);

    whiteNoise.start();
    lfo.start();
    this.nodes.push(whiteNoise, lfo);
  }

  createCicadaSoundscape() {
    // High-pitched nocturnal pulses
    this.cricketGain = this.ctx.createGain();
    this.cricketGain.gain.setValueAtTime(0.02, this.ctx.currentTime);

    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(4600, this.ctx.currentTime);

    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(4620, this.ctx.currentTime);

    const pulseLfo = this.ctx.createOscillator();
    pulseLfo.type = 'square';
    pulseLfo.frequency.setValueAtTime(5, this.ctx.currentTime); // rapid cricket chirp

    const pulseDepth = this.ctx.createGain();
    pulseDepth.gain.setValueAtTime(0.018, this.ctx.currentTime);

    const cricketAmp = this.ctx.createGain();
    cricketAmp.gain.setValueAtTime(0.02, this.ctx.currentTime);

    pulseLfo.connect(pulseDepth);
    pulseDepth.connect(cricketAmp.gain);

    osc1.connect(cricketAmp);
    osc2.connect(cricketAmp);
    cricketAmp.connect(this.cricketGain);
    this.cricketGain.connect(this.masterGain);

    osc1.start();
    osc2.start();
    pulseLfo.start();
    this.nodes.push(osc1, osc2, pulseLfo);
  }

  createDarkDrone() {
    // Low frequency mysterious horror drone
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.09, this.ctx.currentTime);

    const droneFilter = this.ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(95, this.ctx.currentTime);

    const oscA = this.ctx.createOscillator();
    oscA.type = 'triangle';
    oscA.frequency.setValueAtTime(48.99, this.ctx.currentTime); // G1 note

    const oscB = this.ctx.createOscillator();
    oscB.type = 'sine';
    oscB.frequency.setValueAtTime(49.35, this.ctx.currentTime); // subtle binaural detune

    oscA.connect(droneFilter);
    oscB.connect(droneFilter);
    droneFilter.connect(this.droneGain);
    this.droneGain.connect(this.masterGain);

    oscA.start();
    oscB.start();
    this.nodes.push(oscA, oscB);
  }

  toggle() {
    if (!this.ctx) {
      this.init();
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (!this.isPlaying) {
      this.play();
    } else {
      this.pause();
    }
    return this.isPlaying;
  }

  play() {
    if (!this.ctx) this.init();
    this.isPlaying = true;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0.55, now + 2.5);
  }

  pause() {
    if (!this.ctx) return;
    this.isPlaying = false;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0, now + 1.5);
  }

  // Eerie singing bell / water ripple chime on interactive click
  triggerChime(pitch = 587.33) { // D5
    if (!this.ctx || !this.isPlaying) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, now);
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.98, now + 1.8);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 1.9);
    } catch (e) {
      // safe fallback
    }
  }
}

window.backwaterAudio = new BackwaterAudioEngine();
