/* =====================================================
   PhilipG — Battle Effects Engine
   Spell projectiles, impact bursts, screen shake, enemy lunges.
   Pure DOM + CSS keyframes for GPU-accelerated effects.
   ===================================================== */

const Effects = (() => {
  let layer = null;

  function ensure() {
    if (!layer) layer = document.getElementById('battle-fx-layer');
    return layer;
  }

  // ============================================================
  // Spell-specific visuals
  // ============================================================
  const SPELL_FX = {
    spark:    { emoji: '✨', color: '#fde68a', particle: '✦', particleColor: '#fbbf24', traj: 'arc',     impact: 'sparkle', shake: 4  },
    fireball: { emoji: '🔥', color: '#f97316', particle: '🔥', particleColor: '#fb923c', traj: 'arc',     impact: 'explode', shake: 8  },
    wave:     { emoji: '🌊', color: '#3b82f6', particle: '💧', particleColor: '#60a5fa', traj: 'sweep',   impact: 'splash',  shake: 6  },
    leaf:     { emoji: '🍃', color: '#22c55e', particle: '🍃', particleColor: '#4ade80', traj: 'swirl',   impact: 'burst',   shake: 5  },
    thunder:  { emoji: '⚡', color: '#fde047', particle: '⚡', particleColor: '#facc15', traj: 'strike',  impact: 'shock',   shake: 12 },
    meteor:   { emoji: '☄️', color: '#dc2626', particle: '🔥', particleColor: '#f87171', traj: 'crash',   impact: 'crater',  shake: 16 },
    heal:     { emoji: '💚', color: '#22c55e', particle: '✚',  particleColor: '#bbf7d0', traj: 'self',    impact: 'glow',    shake: 0  },
  };

  // ============================================================
  // Cast a spell — returns a promise that resolves after impact
  // ============================================================
  function castSpell(spellId, fromEl, toEl, onImpact) {
    ensure();
    const fx = SPELL_FX[spellId] || SPELL_FX.spark;
    const from = elCenter(fromEl);
    const to   = elCenter(toEl);

    // 1) Wind-up: glow at player position
    const windup = spawn('fx-windup', from.x, from.y, fx.color);
    setTimeout(() => windup.remove(), 400);

    // 2) After windup, launch projectile
    setTimeout(() => {
      launchProjectile(fx, from, to, () => {
        impactAt(fx, to);
        screenShake(fx.shake);
        if (onImpact) onImpact();
      });
    }, 350);
  }

  function launchProjectile(fx, from, to, onArrive) {
    const proj = document.createElement('div');
    proj.className = 'fx-projectile traj-' + fx.traj;
    proj.textContent = fx.emoji;
    proj.style.color = fx.color;
    proj.style.left = from.x + 'px';
    proj.style.top  = from.y + 'px';

    // Compute travel deltas as CSS custom properties so keyframes can use them
    proj.style.setProperty('--dx', (to.x - from.x) + 'px');
    proj.style.setProperty('--dy', (to.y - from.y) + 'px');

    layer.appendChild(proj);

    // Self-spell (heal): no travel, just stay on player
    const dur = fx.traj === 'self' ? 600 : (fx.traj === 'crash' ? 700 : 500);
    setTimeout(() => {
      proj.remove();
      onArrive && onArrive();
    }, dur);
  }

  // ============================================================
  // Impact burst at the target
  // ============================================================
  function impactAt(fx, pos) {
    // Central flash
    const flash = spawn('fx-impact-' + fx.impact, pos.x, pos.y, fx.color);
    setTimeout(() => flash.remove(), 600);

    // Particle ring (8 particles outward)
    const count = fx.impact === 'crater' ? 14 : (fx.impact === 'splash' ? 10 : 8);
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
      const dist  = 60 + Math.random() * 40;
      const p = document.createElement('div');
      p.className = 'fx-particle';
      p.textContent = fx.particle;
      p.style.color = fx.particleColor;
      p.style.left = pos.x + 'px';
      p.style.top  = pos.y + 'px';
      p.style.setProperty('--px', Math.cos(angle) * dist + 'px');
      p.style.setProperty('--py', Math.sin(angle) * dist + 'px');
      p.style.animationDelay = (Math.random() * 100) + 'ms';
      layer.appendChild(p);
      setTimeout(() => p.remove(), 900);
    }

    // Thunder gets an extra lightning bolt from sky
    if (fx.impact === 'shock') {
      const bolt = document.createElement('div');
      bolt.className = 'fx-lightning';
      bolt.style.left = pos.x + 'px';
      layer.appendChild(bolt);
      setTimeout(() => bolt.remove(), 350);
    }
  }

  // ============================================================
  // Enemy attack — dramatic lunge + slash + screen shake
  // ============================================================
  function enemyAttack(enemyEl, playerEl, onHit) {
    ensure();
    // 1) Wind-up: enemy crouches/grows
    enemyEl.classList.add('fx-enemy-windup');
    setTimeout(() => {
      enemyEl.classList.remove('fx-enemy-windup');
      // 2) Lunge: enemy zips toward player
      enemyEl.classList.add('fx-enemy-lunge');
      setTimeout(() => {
        enemyEl.classList.remove('fx-enemy-lunge');
        // 3) Strike: slash effect on player, shake, flash
        const pos = elCenter(playerEl);
        const slash = spawn('fx-slash', pos.x, pos.y, '#ef4444');
        setTimeout(() => slash.remove(), 500);

        // Red impact ring
        const ring = spawn('fx-hit-ring', pos.x, pos.y, '#ef4444');
        setTimeout(() => ring.remove(), 500);

        // Red flash overlay
        hitFlash('#ef4444', 220);
        screenShake(10);
        playerEl.classList.add('fx-player-stagger');
        setTimeout(() => playerEl.classList.remove('fx-player-stagger'), 500);

        if (onHit) onHit();
      }, 250);
    }, 280);
  }

  // ============================================================
  // Screen shake — adds a class to the battle screen
  // ============================================================
  function screenShake(intensity = 8) {
    const screen = document.getElementById('screen-battle');
    if (!screen) return;
    screen.style.setProperty('--shake-px', intensity + 'px');
    screen.classList.add('fx-shake');
    clearTimeout(screenShake._t);
    screenShake._t = setTimeout(() => screen.classList.remove('fx-shake'), 420);
  }

  // ============================================================
  // Hit flash — full-screen color flash
  // ============================================================
  function hitFlash(color = '#ef4444', dur = 200) {
    ensure();
    const f = document.createElement('div');
    f.className = 'fx-hitflash';
    f.style.background = color;
    layer.appendChild(f);
    setTimeout(() => f.remove(), dur);
  }

  // ============================================================
  // Defeat burst — when enemy goes down
  // ============================================================
  function defeatBurst(enemyEl) {
    ensure();
    const pos = elCenter(enemyEl);
    // Many bright stars exploding outward
    for (let i = 0; i < 18; i++) {
      const angle = (Math.PI * 2 * i) / 18 + (Math.random() - 0.5) * 0.2;
      const dist = 80 + Math.random() * 60;
      const p = document.createElement('div');
      p.className = 'fx-particle fx-particle-victory';
      p.textContent = ['⭐', '✨', '💫'][i % 3];
      p.style.left = pos.x + 'px';
      p.style.top  = pos.y + 'px';
      p.style.setProperty('--px', Math.cos(angle) * dist + 'px');
      p.style.setProperty('--py', Math.sin(angle) * dist + 'px');
      p.style.animationDelay = (Math.random() * 200) + 'ms';
      layer.appendChild(p);
      setTimeout(() => p.remove(), 1400);
    }
    screenShake(6);
  }

  // ============================================================
  // Helpers
  // ============================================================
  function elCenter(el) {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }

  function spawn(className, x, y, color) {
    const d = document.createElement('div');
    d.className = className;
    d.style.left = x + 'px';
    d.style.top  = y + 'px';
    if (color) d.style.color = color;
    layer.appendChild(d);
    return d;
  }

  return { castSpell, enemyAttack, screenShake, hitFlash, defeatBurst };
})();
