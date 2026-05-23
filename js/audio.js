/* =====================================================
   PhilipG — Audio
   Synthesized SFX via Web Audio API. No external files.
   Auto-creates context on first user interaction (browser policy).
   ===================================================== */

const Audio = (() => {
  let ctx = null;
  let masterGain = null;
  let muted = false;

  function ensure() {
    if (ctx) return ctx;
    try {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      if (!Ctor) return null;
      ctx = new Ctor();
      masterGain = ctx.createGain();
      masterGain.gain.value = 0.5;
      masterGain.connect(ctx.destination);
    } catch (e) {
      console.warn('Audio init failed:', e);
    }
    return ctx;
  }

  // Resume on first user gesture (Chrome autoplay policy)
  function unlock() {
    const c = ensure();
    if (c && c.state === 'suspended') c.resume().catch(() => {});
  }
  ['pointerdown', 'keydown', 'touchstart'].forEach(ev =>
    window.addEventListener(ev, unlock, { once: false, passive: true })
  );

  function tone({ freq = 440, dur = 0.2, type = 'sine', vol = 0.4, slideTo = null, attack = 0.005, release = 0.05 }) {
    if (muted) return;
    const c = ensure();
    if (!c) return;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, c.currentTime);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, c.currentTime + dur);
    gain.gain.setValueAtTime(0, c.currentTime);
    gain.gain.linearRampToValueAtTime(vol, c.currentTime + attack);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur + release);
    osc.connect(gain).connect(masterGain);
    osc.start();
    osc.stop(c.currentTime + dur + release + 0.02);
  }

  function noise({ dur = 0.2, vol = 0.3, filterFreq = 1500 } = {}) {
    if (muted) return;
    const c = ensure();
    if (!c) return;
    const bufSize = Math.floor(c.sampleRate * dur);
    const buf = c.createBuffer(1, bufSize, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufSize);
    const src = c.createBufferSource();
    src.buffer = buf;
    const filt = c.createBiquadFilter();
    filt.type = 'lowpass';
    filt.frequency.value = filterFreq;
    const g = c.createGain();
    g.gain.value = vol;
    src.connect(filt).connect(g).connect(masterGain);
    src.start();
  }

  return {
    setMuted(m) { muted = !!m; },
    isMuted() { return muted; },

    spellCast() {
      tone({ freq: 280, slideTo: 880, dur: 0.18, type: 'sawtooth', vol: 0.18 });
      setTimeout(() => tone({ freq: 660, slideTo: 1320, dur: 0.18, type: 'triangle', vol: 0.18 }), 60);
    },
    correct() {
      tone({ freq: 523, dur: 0.12, type: 'triangle', vol: 0.3 });   // C5
      setTimeout(() => tone({ freq: 659, dur: 0.12, type: 'triangle', vol: 0.3 }), 110);  // E5
      setTimeout(() => tone({ freq: 784, dur: 0.18, type: 'triangle', vol: 0.3 }), 220);  // G5
    },
    wrong() {
      tone({ freq: 220, slideTo: 110, dur: 0.3, type: 'sawtooth', vol: 0.25 });
    },
    hit() {
      noise({ dur: 0.15, vol: 0.35, filterFreq: 800 });
      tone({ freq: 180, slideTo: 80, dur: 0.12, type: 'square', vol: 0.18 });
    },
    enemyHit() {
      tone({ freq: 660, slideTo: 220, dur: 0.18, type: 'square', vol: 0.22 });
    },
    victory() {
      const notes = [523, 659, 784, 1047]; // C E G C
      notes.forEach((f, i) =>
        setTimeout(() => tone({ freq: f, dur: 0.18, type: 'triangle', vol: 0.32 }), i * 130)
      );
    },
    defeat() {
      const notes = [392, 349, 311, 261]; // descending
      notes.forEach((f, i) =>
        setTimeout(() => tone({ freq: f, dur: 0.3, type: 'triangle', vol: 0.28 }), i * 180)
      );
    },
    levelUp() {
      [523, 659, 784, 1047, 1319].forEach((f, i) =>
        setTimeout(() => tone({ freq: f, dur: 0.12, type: 'triangle', vol: 0.32 }), i * 80)
      );
    },
    click() {
      tone({ freq: 720, dur: 0.04, type: 'square', vol: 0.12 });
    },
    heal() {
      tone({ freq: 440, slideTo: 880, dur: 0.2, type: 'sine', vol: 0.3 });
      setTimeout(() => tone({ freq: 660, slideTo: 1100, dur: 0.25, type: 'sine', vol: 0.28 }), 120);
    },
  };
})();
