/* =====================================================
   PhilipG — Character SVG Sprites
   Hand-drawn cartoon characters, scalable, no asset loading.
   Philip's likeness: brown tousled hair, black rectangular glasses,
   fair skin.
   ===================================================== */

const CHARACTERS = {

  // ============================================================
  // Philip the Wizard — main hero, floating on a purple club chair
  // ============================================================
  philipWizard: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="philipChairGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#a78bfa"/>
          <stop offset="100%" stop-color="#4c1d95"/>
        </radialGradient>
        <radialGradient id="philipGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fde68a" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#fde68a" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <!-- magical glow under chair -->
      <ellipse cx="100" cy="180" rx="70" ry="10" fill="url(#philipGlow)"/>
      <ellipse cx="100" cy="178" rx="55" ry="6" fill="#fbbf24" opacity="0.4"/>

      <!-- chair (big purple club chair) -->
      <!-- backrest -->
      <path d="M 50 100 Q 50 50, 100 50 Q 150 50, 150 100 L 150 160 L 50 160 Z"
            fill="url(#philipChairGrad)" stroke="#2e1065" stroke-width="3"/>
      <!-- chair tufting/buttons -->
      <circle cx="75" cy="85" r="3" fill="#2e1065"/>
      <circle cx="100" cy="75" r="3" fill="#2e1065"/>
      <circle cx="125" cy="85" r="3" fill="#2e1065"/>
      <circle cx="85" cy="110" r="3" fill="#2e1065"/>
      <circle cx="115" cy="110" r="3" fill="#2e1065"/>
      <!-- chair arms -->
      <ellipse cx="50" cy="130" rx="14" ry="30" fill="#5b21b6" stroke="#2e1065" stroke-width="3"/>
      <ellipse cx="150" cy="130" rx="14" ry="30" fill="#5b21b6" stroke="#2e1065" stroke-width="3"/>
      <!-- seat cushion -->
      <ellipse cx="100" cy="155" rx="55" ry="10" fill="#6d28d9" stroke="#2e1065" stroke-width="2"/>

      <!-- robe (sitting) -->
      <path d="M 75 145 Q 70 130, 80 120 L 120 120 Q 130 130, 125 145 L 130 165 L 70 165 Z"
            fill="#1e40af" stroke="#0f172a" stroke-width="2"/>
      <!-- robe stars -->
      <text x="85" y="140" font-size="8" fill="#fde68a">★</text>
      <text x="100" y="138" font-size="6" fill="#fde68a">★</text>
      <text x="113" y="142" font-size="7" fill="#fde68a">★</text>

      <!-- head/neck -->
      <ellipse cx="100" cy="110" rx="6" ry="4" fill="#f1c9a5"/>
      <ellipse cx="100" cy="95" rx="22" ry="24" fill="#f5d3b3" stroke="#a16207" stroke-width="1.5"/>

      <!-- hair: brown tousled, swept forward -->
      <path d="M 78 90 Q 75 70, 90 65 Q 100 60, 115 65 Q 125 70, 122 88 Q 120 80, 110 78
               L 108 86 L 102 76 L 96 86 L 90 78 L 86 88 Z"
            fill="#5d4037" stroke="#3e2723" stroke-width="1.2"/>
      <path d="M 82 80 Q 86 76, 92 80 Q 88 84, 82 82 Z" fill="#3e2723"/>
      <path d="M 110 80 Q 116 75, 122 82 Q 118 86, 112 84 Z" fill="#3e2723"/>

      <!-- glasses (black rectangular frames) -->
      <rect x="84" y="92" width="14" height="9" rx="1.5" fill="none" stroke="#0f172a" stroke-width="1.8"/>
      <rect x="102" y="92" width="14" height="9" rx="1.5" fill="none" stroke="#0f172a" stroke-width="1.8"/>
      <line x1="98" y1="96" x2="102" y2="96" stroke="#0f172a" stroke-width="1.8"/>

      <!-- eyes behind glasses -->
      <circle cx="91" cy="97" r="1.6" fill="#1e293b"/>
      <circle cx="109" cy="97" r="1.6" fill="#1e293b"/>

      <!-- nose -->
      <path d="M 100 100 Q 99 104, 100 106 Q 102 105, 102 104" fill="none" stroke="#a16207" stroke-width="1"/>

      <!-- mouth (small smile) -->
      <path d="M 94 109 Q 100 113, 106 109" fill="none" stroke="#7c2d12" stroke-width="1.6" stroke-linecap="round"/>

      <!-- wizard hat -->
      <path d="M 80 75 L 100 25 L 120 75 Z" fill="#5b21b6" stroke="#2e1065" stroke-width="2"/>
      <path d="M 75 75 Q 100 68, 125 75 L 125 80 Q 100 73, 75 80 Z" fill="#4c1d95" stroke="#2e1065" stroke-width="1.5"/>
      <!-- hat tip curl -->
      <path d="M 100 25 Q 105 22, 108 28" fill="none" stroke="#fbbf24" stroke-width="2"/>
      <!-- hat stars -->
      <text x="92" y="55" font-size="10" fill="#fde68a">★</text>
      <text x="103" y="45" font-size="7" fill="#fde68a">★</text>

      <!-- arms -->
      <!-- left arm holding wand -->
      <path d="M 78 130 Q 60 125, 50 110 Q 48 105, 52 102" fill="none" stroke="#1e40af" stroke-width="8" stroke-linecap="round"/>
      <circle cx="50" cy="100" r="5" fill="#f5d3b3" stroke="#a16207" stroke-width="1"/>
      <!-- wand -->
      <line x1="50" y1="100" x2="32" y2="78" stroke="#78350f" stroke-width="3" stroke-linecap="round"/>
      <polygon points="30,77 34,72 28,72" fill="#fbbf24" stroke="#b45309" stroke-width="1"/>
      <circle cx="31" cy="74" r="3" fill="#fde68a" opacity="0.9"/>

      <!-- right arm casual on armrest -->
      <path d="M 122 130 Q 138 130, 145 125" fill="none" stroke="#1e40af" stroke-width="8" stroke-linecap="round"/>
      <circle cx="146" cy="124" r="5" fill="#f5d3b3" stroke="#a16207" stroke-width="1"/>
    </svg>
  `,

  // ============================================================
  // Owen — simple silhouette/avatar (no photo reference). Friendly
  // older brother vibe. Different colors so kids can tell them apart.
  // ============================================================
  owenWizard: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="owenChairGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#5eead4"/>
          <stop offset="100%" stop-color="#134e4a"/>
        </radialGradient>
        <radialGradient id="owenGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#5eead4" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="#5eead4" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="180" rx="70" ry="10" fill="url(#owenGlow)"/>
      <ellipse cx="100" cy="178" rx="55" ry="6" fill="#14b8a6" opacity="0.4"/>
      <!-- chair -->
      <path d="M 50 100 Q 50 50, 100 50 Q 150 50, 150 100 L 150 160 L 50 160 Z"
            fill="url(#owenChairGrad)" stroke="#0f172a" stroke-width="3"/>
      <circle cx="75" cy="85" r="3" fill="#0f172a"/>
      <circle cx="100" cy="75" r="3" fill="#0f172a"/>
      <circle cx="125" cy="85" r="3" fill="#0f172a"/>
      <ellipse cx="50" cy="130" rx="14" ry="30" fill="#0f766e" stroke="#0f172a" stroke-width="3"/>
      <ellipse cx="150" cy="130" rx="14" ry="30" fill="#0f766e" stroke="#0f172a" stroke-width="3"/>
      <ellipse cx="100" cy="155" rx="55" ry="10" fill="#14b8a6" stroke="#0f172a" stroke-width="2"/>

      <!-- robe -->
      <path d="M 75 145 Q 70 130, 80 120 L 120 120 Q 130 130, 125 145 L 130 165 L 70 165 Z"
            fill="#7c2d12" stroke="#0f172a" stroke-width="2"/>
      <text x="85" y="140" font-size="8" fill="#fde68a">★</text>
      <text x="113" y="142" font-size="7" fill="#fde68a">★</text>

      <!-- head -->
      <ellipse cx="100" cy="110" rx="6" ry="4" fill="#f1c9a5"/>
      <ellipse cx="100" cy="95" rx="22" ry="24" fill="#f5d3b3" stroke="#a16207" stroke-width="1.5"/>

      <!-- hair: darker brown/black, short -->
      <path d="M 78 88 Q 76 68, 100 62 Q 124 68, 122 88 Q 110 80, 100 82 Q 90 80, 78 88 Z"
            fill="#1f2937" stroke="#0f172a" stroke-width="1"/>

      <!-- eyes (no glasses) -->
      <circle cx="91" cy="97" r="2" fill="#1e293b"/>
      <circle cx="109" cy="97" r="2" fill="#1e293b"/>
      <circle cx="91.5" cy="96.5" r="0.6" fill="#fff"/>
      <circle cx="109.5" cy="96.5" r="0.6" fill="#fff"/>

      <!-- mouth -->
      <path d="M 93 108 Q 100 113, 107 108" fill="none" stroke="#7c2d12" stroke-width="1.6" stroke-linecap="round"/>

      <!-- hat -->
      <path d="M 80 75 L 100 25 L 120 75 Z" fill="#0d9488" stroke="#134e4a" stroke-width="2"/>
      <path d="M 75 75 Q 100 68, 125 75 L 125 80 Q 100 73, 75 80 Z" fill="#0f766e" stroke="#134e4a" stroke-width="1.5"/>
      <text x="92" y="55" font-size="10" fill="#fde68a">★</text>

      <!-- arms with wand -->
      <path d="M 78 130 Q 60 125, 50 110 Q 48 105, 52 102" fill="none" stroke="#7c2d12" stroke-width="8" stroke-linecap="round"/>
      <circle cx="50" cy="100" r="5" fill="#f5d3b3" stroke="#a16207" stroke-width="1"/>
      <line x1="50" y1="100" x2="32" y2="78" stroke="#78350f" stroke-width="3" stroke-linecap="round"/>
      <polygon points="30,77 34,72 28,72" fill="#5eead4" stroke="#0f766e" stroke-width="1"/>
      <circle cx="31" cy="74" r="3" fill="#a7f3d0" opacity="0.9"/>

      <path d="M 122 130 Q 138 130, 145 125" fill="none" stroke="#7c2d12" stroke-width="8" stroke-linecap="round"/>
      <circle cx="146" cy="124" r="5" fill="#f5d3b3" stroke="#a16207" stroke-width="1"/>
    </svg>
  `,

  // ============================================================
  // Dark Philip — final boss. Same likeness, dark/evil styling.
  // ============================================================
  darkPhilip: `
    <svg viewBox="0 0 220 240" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="darkAura" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="#7f1d1d" stop-opacity="0.7"/>
          <stop offset="100%" stop-color="#7f1d1d" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <!-- dark aura -->
      <circle cx="110" cy="120" r="105" fill="url(#darkAura)"/>

      <!-- floating dark throne -->
      <path d="M 50 130 L 60 200 L 160 200 L 170 130
               Q 170 80, 110 70 Q 50 80, 50 130 Z"
            fill="#1e1b4b" stroke="#0f172a" stroke-width="3"/>
      <path d="M 60 100 L 50 60 L 70 70 Z" fill="#7f1d1d" stroke="#0f172a" stroke-width="2"/>
      <path d="M 160 100 L 170 60 L 150 70 Z" fill="#7f1d1d" stroke="#0f172a" stroke-width="2"/>

      <!-- robe -->
      <path d="M 75 160 Q 70 145, 80 130 L 140 130 Q 150 145, 145 160 L 155 195 L 65 195 Z"
            fill="#581c87" stroke="#0f172a" stroke-width="2"/>
      <text x="90" y="155" font-size="10" fill="#f87171">☠</text>
      <text x="115" y="160" font-size="10" fill="#f87171">☠</text>

      <!-- head -->
      <ellipse cx="110" cy="120" rx="6" ry="4" fill="#d4a373"/>
      <ellipse cx="110" cy="100" rx="26" ry="28" fill="#e9b894" stroke="#78350f" stroke-width="1.5"/>

      <!-- hair: brown, wild/spiky -->
      <path d="M 84 95 Q 80 65, 95 60 L 100 70 L 105 60 L 110 72 L 115 60 L 120 70 L 125 60
               Q 140 65, 136 95 Q 130 85, 120 82 L 116 90 L 108 80 L 100 90 L 92 80 L 88 90 Z"
            fill="#3e2723" stroke="#1c0c08" stroke-width="1.5"/>

      <!-- glasses: black, slightly more menacing -->
      <rect x="89" y="96" width="17" height="11" rx="1.5" fill="#1c0c08" stroke="#000" stroke-width="2"/>
      <rect x="110" y="96" width="17" height="11" rx="1.5" fill="#1c0c08" stroke="#000" stroke-width="2"/>
      <line x1="106" y1="101" x2="110" y2="101" stroke="#000" stroke-width="2"/>
      <!-- glowing red eyes through lenses -->
      <circle cx="97.5" cy="101" r="2" fill="#f87171"/>
      <circle cx="118.5" cy="101" r="2" fill="#f87171"/>

      <!-- mouth (smirk) -->
      <path d="M 100 116 Q 110 121, 122 114" fill="none" stroke="#7c2d12" stroke-width="2" stroke-linecap="round"/>

      <!-- wizard hat (dark) -->
      <path d="M 84 75 L 110 18 L 136 75 Z" fill="#1e1b4b" stroke="#0f172a" stroke-width="2"/>
      <path d="M 78 75 Q 110 68, 142 75 L 142 82 Q 110 74, 78 82 Z" fill="#0f172a" stroke="#000" stroke-width="1.5"/>
      <text x="98" y="55" font-size="14" fill="#f87171">☠</text>

      <!-- arms holding glowing dark wand -->
      <path d="M 80 145 Q 55 135, 42 115" fill="none" stroke="#581c87" stroke-width="9" stroke-linecap="round"/>
      <circle cx="40" cy="112" r="6" fill="#e9b894" stroke="#78350f" stroke-width="1"/>
      <line x1="40" y1="112" x2="20" y2="82" stroke="#0f172a" stroke-width="4" stroke-linecap="round"/>
      <polygon points="18,80 24,74 14,74" fill="#7f1d1d" stroke="#0f172a" stroke-width="1.5"/>
      <circle cx="19" cy="77" r="4" fill="#f87171" opacity="0.9"/>

      <path d="M 140 145 Q 160 140, 168 130" fill="none" stroke="#581c87" stroke-width="9" stroke-linecap="round"/>
      <circle cx="170" cy="128" r="6" fill="#e9b894" stroke="#78350f" stroke-width="1"/>
    </svg>
  `,

  // ============================================================
  // Dark Owen — final boss when Philip is playing
  // ============================================================
  darkOwen: `
    <svg viewBox="0 0 220 240" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="darkOwenAura" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="#134e4a" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#134e4a" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <!-- dark teal aura -->
      <circle cx="110" cy="120" r="105" fill="url(#darkOwenAura)"/>

      <!-- floating dark throne -->
      <path d="M 50 130 L 60 200 L 160 200 L 170 130
               Q 170 80, 110 70 Q 50 80, 50 130 Z"
            fill="#0f172a" stroke="#000" stroke-width="3"/>
      <path d="M 60 100 L 50 60 L 70 70 Z" fill="#134e4a" stroke="#0f172a" stroke-width="2"/>
      <path d="M 160 100 L 170 60 L 150 70 Z" fill="#134e4a" stroke="#0f172a" stroke-width="2"/>

      <!-- robe -->
      <path d="M 75 160 Q 70 145, 80 130 L 140 130 Q 150 145, 145 160 L 155 195 L 65 195 Z"
            fill="#7c2d12" stroke="#0f172a" stroke-width="2"/>
      <text x="90" y="155" font-size="10" fill="#5eead4">☠</text>
      <text x="115" y="160" font-size="10" fill="#5eead4">☠</text>

      <!-- head -->
      <ellipse cx="110" cy="120" rx="6" ry="4" fill="#d4a373"/>
      <ellipse cx="110" cy="100" rx="26" ry="28" fill="#e9b894" stroke="#78350f" stroke-width="1.5"/>

      <!-- hair: black, wild (Owen has darker hair, no glasses) -->
      <path d="M 84 92 Q 80 60, 95 56 L 100 68 L 105 56 L 110 70 L 115 56 L 120 68 L 125 56
               Q 140 60, 136 92 Q 130 84, 120 82 L 116 90 L 108 80 L 100 90 L 92 80 L 88 90 Z"
            fill="#0f172a" stroke="#000" stroke-width="1.5"/>

      <!-- glowing teal eyes (no glasses on Owen) -->
      <circle cx="97" cy="100" r="5" fill="#0f172a"/>
      <circle cx="97" cy="101" r="3" fill="#5eead4"/>
      <circle cx="97" cy="101" r="1.5" fill="#fff"/>
      <circle cx="123" cy="100" r="5" fill="#0f172a"/>
      <circle cx="123" cy="101" r="3" fill="#5eead4"/>
      <circle cx="123" cy="101" r="1.5" fill="#fff"/>

      <!-- mouth (smirk) -->
      <path d="M 100 116 Q 110 121, 122 114" fill="none" stroke="#7c2d12" stroke-width="2" stroke-linecap="round"/>

      <!-- wizard hat (dark teal) -->
      <path d="M 84 75 L 110 18 L 136 75 Z" fill="#134e4a" stroke="#042f2e" stroke-width="2"/>
      <path d="M 78 75 Q 110 68, 142 75 L 142 82 Q 110 74, 78 82 Z" fill="#042f2e" stroke="#000" stroke-width="1.5"/>
      <text x="98" y="55" font-size="14" fill="#5eead4">☠</text>

      <!-- arms holding glowing teal wand -->
      <path d="M 80 145 Q 55 135, 42 115" fill="none" stroke="#7c2d12" stroke-width="9" stroke-linecap="round"/>
      <circle cx="40" cy="112" r="6" fill="#e9b894" stroke="#78350f" stroke-width="1"/>
      <line x1="40" y1="112" x2="20" y2="82" stroke="#0f172a" stroke-width="4" stroke-linecap="round"/>
      <polygon points="18,80 24,74 14,74" fill="#134e4a" stroke="#0f172a" stroke-width="1.5"/>
      <circle cx="19" cy="77" r="4" fill="#5eead4" opacity="0.9"/>

      <path d="M 140 145 Q 160 140, 168 130" fill="none" stroke="#7c2d12" stroke-width="9" stroke-linecap="round"/>
      <circle cx="170" cy="128" r="6" fill="#e9b894" stroke="#78350f" stroke-width="1"/>
    </svg>
  `,

  // ============================================================
  // Island enemies — themed creatures
  // ============================================================

  // Math Mountain enemies
  numberGolem: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="60" y="80" width="80" height="90" rx="12" fill="#78716c" stroke="#1c1917" stroke-width="3"/>
      <rect x="55" y="60" width="90" height="40" rx="8" fill="#a8a29e" stroke="#1c1917" stroke-width="3"/>
      <rect x="70" y="70" width="18" height="18" rx="3" fill="#fde68a" stroke="#1c1917" stroke-width="1.5"/>
      <text x="74" y="86" font-size="18" font-weight="bold" fill="#1c1917">7</text>
      <rect x="112" y="70" width="18" height="18" rx="3" fill="#fde68a" stroke="#1c1917" stroke-width="1.5"/>
      <text x="116" y="86" font-size="18" font-weight="bold" fill="#1c1917">3</text>
      <rect x="80" y="120" width="40" height="6" fill="#fbbf24"/>
      <text x="84" y="148" font-size="20" font-weight="bold" fill="#fde68a">+ −</text>
      <rect x="45" y="90" width="14" height="50" rx="6" fill="#78716c" stroke="#1c1917" stroke-width="3"/>
      <rect x="141" y="90" width="14" height="50" rx="6" fill="#78716c" stroke="#1c1917" stroke-width="3"/>
      <rect x="70" y="170" width="20" height="22" rx="4" fill="#78716c" stroke="#1c1917" stroke-width="3"/>
      <rect x="110" y="170" width="20" height="22" rx="4" fill="#78716c" stroke="#1c1917" stroke-width="3"/>
    </svg>
  `,
  countingSlime: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="170" rx="70" ry="10" fill="#000" opacity="0.3"/>
      <path d="M 40 160 Q 30 100, 80 80 Q 100 50, 120 80 Q 170 100, 160 160 Z"
            fill="#22c55e" stroke="#14532d" stroke-width="3"/>
      <circle cx="80" cy="125" r="10" fill="#fff"/>
      <circle cx="80" cy="127" r="5" fill="#0f172a"/>
      <circle cx="120" cy="125" r="10" fill="#fff"/>
      <circle cx="120" cy="127" r="5" fill="#0f172a"/>
      <path d="M 85 145 Q 100 155, 115 145" fill="none" stroke="#14532d" stroke-width="2.5" stroke-linecap="round"/>
      <text x="65" y="100" font-size="14" font-weight="bold" fill="#fff">1 2 3</text>
    </svg>
  `,
  geometroBeast: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <polygon points="100,40 160,90 140,170 60,170 40,90" fill="#3b82f6" stroke="#1e3a8a" stroke-width="3"/>
      <polygon points="100,55 145,90 130,150 70,150 55,90" fill="#60a5fa"/>
      <circle cx="80" cy="100" r="9" fill="#fff"/>
      <circle cx="80" cy="102" r="4" fill="#0f172a"/>
      <circle cx="120" cy="100" r="9" fill="#fff"/>
      <circle cx="120" cy="102" r="4" fill="#0f172a"/>
      <path d="M 85 130 Q 100 138, 115 130" fill="none" stroke="#1e3a8a" stroke-width="2.5" stroke-linecap="round"/>
      <polygon points="100,20 110,40 90,40" fill="#fbbf24" stroke="#92400e" stroke-width="2"/>
    </svg>
  `,
  mathMasterBoss: `
    <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
      <circle cx="110" cy="115" r="85" fill="#1e3a8a" stroke="#0f172a" stroke-width="4"/>
      <circle cx="110" cy="115" r="65" fill="#3b82f6"/>
      <text x="60" y="100" font-size="22" font-weight="900" fill="#fde68a">+ −</text>
      <text x="125" y="100" font-size="22" font-weight="900" fill="#fde68a">× ÷</text>
      <circle cx="90" cy="125" r="8" fill="#fff"/>
      <circle cx="90" cy="127" r="4" fill="#0f172a"/>
      <circle cx="130" cy="125" r="8" fill="#fff"/>
      <circle cx="130" cy="127" r="4" fill="#0f172a"/>
      <path d="M 90 155 Q 110 145, 130 155" fill="none" stroke="#0f172a" stroke-width="3" stroke-linecap="round"/>
      <text x="92" y="175" font-size="14" fill="#fde68a">∞</text>
      <polygon points="110,25 120,55 100,55" fill="#fbbf24" stroke="#92400e" stroke-width="2"/>
    </svg>
  `,

  // Reading Reef enemies
  bookKraken: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="60" y="60" width="80" height="90" rx="4" fill="#92400e" stroke="#451a03" stroke-width="3"/>
      <rect x="65" y="65" width="35" height="80" fill="#fef3c7"/>
      <rect x="102" y="65" width="35" height="80" fill="#fde68a"/>
      <line x1="70" y1="80" x2="95" y2="80" stroke="#92400e" stroke-width="1.5"/>
      <line x1="70" y1="90" x2="95" y2="90" stroke="#92400e" stroke-width="1.5"/>
      <line x1="70" y1="100" x2="95" y2="100" stroke="#92400e" stroke-width="1.5"/>
      <line x1="105" y1="80" x2="130" y2="80" stroke="#92400e" stroke-width="1.5"/>
      <line x1="105" y1="90" x2="130" y2="90" stroke="#92400e" stroke-width="1.5"/>
      <!-- tentacles -->
      <path d="M 60 100 Q 30 110, 25 140 Q 30 160, 50 155" fill="none" stroke="#7c2d12" stroke-width="7" stroke-linecap="round"/>
      <path d="M 140 100 Q 170 110, 175 140 Q 170 160, 150 155" fill="none" stroke="#7c2d12" stroke-width="7" stroke-linecap="round"/>
      <path d="M 75 150 Q 65 175, 85 185" fill="none" stroke="#7c2d12" stroke-width="6" stroke-linecap="round"/>
      <path d="M 125 150 Q 135 175, 115 185" fill="none" stroke="#7c2d12" stroke-width="6" stroke-linecap="round"/>
      <!-- eyes on the book -->
      <circle cx="85" cy="115" r="7" fill="#fff"/>
      <circle cx="85" cy="117" r="3" fill="#0f172a"/>
      <circle cx="115" cy="115" r="7" fill="#fff"/>
      <circle cx="115" cy="117" r="3" fill="#0f172a"/>
      <path d="M 85 132 Q 100 138, 115 132" fill="none" stroke="#451a03" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,
  storyEel: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M 30 100 Q 60 60, 100 100 Q 140 140, 170 100 L 175 115 Q 145 155, 100 115 Q 60 75, 30 115 Z"
            fill="#0d9488" stroke="#134e4a" stroke-width="3"/>
      <circle cx="160" cy="100" r="9" fill="#fff"/>
      <circle cx="162" cy="100" r="4" fill="#0f172a"/>
      <polygon points="170,98 185,90 185,105" fill="#fbbf24" stroke="#92400e" stroke-width="1.5"/>
      <text x="80" y="105" font-size="11" font-weight="bold" fill="#fde68a">ABC</text>
    </svg>
  `,
  vocabSiren: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 170 Q 30 120, 50 80 Q 80 50, 100 50 Q 120 50, 150 80 Q 170 120, 140 170 Z"
            fill="#06b6d4" stroke="#0e7490" stroke-width="3"/>
      <circle cx="100" cy="90" r="22" fill="#f5d3b3" stroke="#92400e" stroke-width="2"/>
      <path d="M 78 80 Q 75 55, 100 50 Q 125 55, 122 80 Q 115 70, 100 70 Q 85 70, 78 80 Z"
            fill="#ec4899" stroke="#831843" stroke-width="1.5"/>
      <circle cx="92" cy="92" r="2" fill="#0f172a"/>
      <circle cx="108" cy="92" r="2" fill="#0f172a"/>
      <path d="M 95 102 Q 100 106, 105 102" fill="none" stroke="#831843" stroke-width="1.5" stroke-linecap="round"/>
      <!-- music notes -->
      <text x="40" y="100" font-size="18" fill="#fde68a">♪</text>
      <text x="155" y="120" font-size="18" fill="#fde68a">♫</text>
    </svg>
  `,
  readingTitanBoss: `
    <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="50" width="140" height="140" rx="8" fill="#7c2d12" stroke="#1c0c08" stroke-width="4"/>
      <rect x="50" y="60" width="55" height="120" fill="#fef3c7"/>
      <rect x="115" y="60" width="55" height="120" fill="#fde68a"/>
      <line x1="55" y1="75" x2="100" y2="75" stroke="#92400e" stroke-width="2"/>
      <line x1="55" y1="85" x2="100" y2="85" stroke="#92400e" stroke-width="2"/>
      <line x1="55" y1="95" x2="100" y2="95" stroke="#92400e" stroke-width="2"/>
      <line x1="55" y1="105" x2="100" y2="105" stroke="#92400e" stroke-width="2"/>
      <line x1="120" y1="75" x2="165" y2="75" stroke="#92400e" stroke-width="2"/>
      <line x1="120" y1="85" x2="165" y2="85" stroke="#92400e" stroke-width="2"/>
      <line x1="120" y1="95" x2="165" y2="95" stroke="#92400e" stroke-width="2"/>
      <!-- eyes & mouth -->
      <circle cx="80" cy="135" r="11" fill="#fff"/>
      <circle cx="80" cy="138" r="5" fill="#0f172a"/>
      <circle cx="140" cy="135" r="11" fill="#fff"/>
      <circle cx="140" cy="138" r="5" fill="#0f172a"/>
      <path d="M 75 165 Q 110 175, 145 165" fill="none" stroke="#1c0c08" stroke-width="3" stroke-linecap="round"/>
      <polygon points="110,25 120,55 100,55" fill="#fbbf24" stroke="#92400e" stroke-width="2"/>
    </svg>
  `,

  // Spelling Swamp enemies
  letterImp: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="180" rx="50" ry="6" fill="#000" opacity="0.3"/>
      <path d="M 60 150 L 60 100 Q 60 60, 100 60 Q 140 60, 140 100 L 140 150 Z" fill="#84cc16" stroke="#365314" stroke-width="3"/>
      <polygon points="60,60 70,40 80,60" fill="#84cc16" stroke="#365314" stroke-width="2"/>
      <polygon points="140,60 130,40 120,60" fill="#84cc16" stroke="#365314" stroke-width="2"/>
      <circle cx="85" cy="100" r="9" fill="#fff"/>
      <circle cx="85" cy="102" r="4" fill="#0f172a"/>
      <circle cx="115" cy="100" r="9" fill="#fff"/>
      <circle cx="115" cy="102" r="4" fill="#0f172a"/>
      <path d="M 85 128 Q 100 118, 115 128" fill="none" stroke="#365314" stroke-width="2.5" stroke-linecap="round"/>
      <text x="92" y="155" font-size="22" font-weight="bold" fill="#fde68a">Z</text>
      <text x="55" y="130" font-size="14" font-weight="bold" fill="#fef3c7">A</text>
      <text x="135" y="130" font-size="14" font-weight="bold" fill="#fef3c7">Q</text>
    </svg>
  `,
  silentEGoblin: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="170" rx="55" ry="20" fill="#16a34a" stroke="#14532d" stroke-width="3"/>
      <ellipse cx="100" cy="120" rx="45" ry="55" fill="#22c55e" stroke="#14532d" stroke-width="3"/>
      <polygon points="60,80 50,55 75,75" fill="#22c55e" stroke="#14532d" stroke-width="2"/>
      <polygon points="140,80 150,55 125,75" fill="#22c55e" stroke="#14532d" stroke-width="2"/>
      <circle cx="85" cy="115" r="9" fill="#fef3c7"/>
      <circle cx="85" cy="117" r="4" fill="#0f172a"/>
      <circle cx="115" cy="115" r="9" fill="#fef3c7"/>
      <circle cx="115" cy="117" r="4" fill="#0f172a"/>
      <path d="M 85 140 Q 100 150, 115 140" fill="none" stroke="#14532d" stroke-width="2.5" stroke-linecap="round"/>
      <text x="80" y="95" font-size="20" font-weight="bold" fill="#fde68a">e</text>
    </svg>
  `,
  punctuationGhost: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 70 Q 60 30, 100 30 Q 140 30, 140 70 L 140 170 L 125 155 L 110 170 L 95 155 L 80 170 L 60 155 Z"
            fill="#e0e7ff" stroke="#3730a3" stroke-width="3" opacity="0.95"/>
      <circle cx="85" cy="80" r="9" fill="#0f172a"/>
      <circle cx="115" cy="80" r="9" fill="#0f172a"/>
      <ellipse cx="100" cy="110" rx="14" ry="8" fill="#0f172a"/>
      <text x="55" y="125" font-size="18" font-weight="bold" fill="#3730a3">?</text>
      <text x="135" y="130" font-size="18" font-weight="bold" fill="#3730a3">!</text>
    </svg>
  `,
  spellingHydraBoss: `
    <svg viewBox="0 0 240 220" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="120" cy="200" rx="80" ry="14" fill="#000" opacity="0.3"/>
      <ellipse cx="120" cy="170" rx="70" ry="35" fill="#15803d" stroke="#052e16" stroke-width="3"/>
      <!-- three heads -->
      <g>
        <ellipse cx="60" cy="120" rx="24" ry="28" fill="#16a34a" stroke="#052e16" stroke-width="3"/>
        <circle cx="52" cy="115" r="6" fill="#fff"/><circle cx="52" cy="117" r="3" fill="#0f172a"/>
        <circle cx="68" cy="115" r="6" fill="#fff"/><circle cx="68" cy="117" r="3" fill="#0f172a"/>
        <path d="M 50 135 Q 60 142, 70 135" fill="none" stroke="#052e16" stroke-width="2"/>
        <text x="54" y="100" font-size="14" font-weight="bold" fill="#fde68a">A</text>
      </g>
      <g>
        <ellipse cx="120" cy="100" rx="28" ry="32" fill="#16a34a" stroke="#052e16" stroke-width="3"/>
        <circle cx="110" cy="95" r="7" fill="#fff"/><circle cx="110" cy="97" r="3.5" fill="#0f172a"/>
        <circle cx="130" cy="95" r="7" fill="#fff"/><circle cx="130" cy="97" r="3.5" fill="#0f172a"/>
        <path d="M 108 118 Q 120 128, 132 118" fill="none" stroke="#052e16" stroke-width="2"/>
        <text x="114" y="78" font-size="14" font-weight="bold" fill="#fde68a">B</text>
      </g>
      <g>
        <ellipse cx="180" cy="120" rx="24" ry="28" fill="#16a34a" stroke="#052e16" stroke-width="3"/>
        <circle cx="172" cy="115" r="6" fill="#fff"/><circle cx="172" cy="117" r="3" fill="#0f172a"/>
        <circle cx="188" cy="115" r="6" fill="#fff"/><circle cx="188" cy="117" r="3" fill="#0f172a"/>
        <path d="M 170 135 Q 180 142, 190 135" fill="none" stroke="#052e16" stroke-width="2"/>
        <text x="174" y="100" font-size="14" font-weight="bold" fill="#fde68a">C</text>
      </g>
    </svg>
  `,

  // Grammar Grove enemies
  verbVixen: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M 100 70 L 70 130 L 130 130 Z" fill="#ea580c" stroke="#7c2d12" stroke-width="3"/>
      <polygon points="80,80 70,55 90,75" fill="#ea580c" stroke="#7c2d12" stroke-width="2"/>
      <polygon points="120,80 130,55 110,75" fill="#ea580c" stroke="#7c2d12" stroke-width="2"/>
      <circle cx="90" cy="100" r="7" fill="#fef3c7"/>
      <circle cx="90" cy="102" r="3" fill="#0f172a"/>
      <circle cx="110" cy="100" r="7" fill="#fef3c7"/>
      <circle cx="110" cy="102" r="3" fill="#0f172a"/>
      <path d="M 95 118 Q 100 122, 105 118" fill="none" stroke="#7c2d12" stroke-width="2" stroke-linecap="round"/>
      <ellipse cx="100" cy="155" rx="40" ry="20" fill="#fb923c" stroke="#7c2d12" stroke-width="3"/>
      <path d="M 140 150 Q 165 130, 170 100" fill="none" stroke="#fb923c" stroke-width="10" stroke-linecap="round"/>
      <path d="M 168 95 Q 178 90, 180 100 Q 175 105, 165 100 Z" fill="#fef3c7" stroke="#7c2d12" stroke-width="2"/>
      <text x="90" y="142" font-size="11" font-weight="bold" fill="#fde68a">RUN</text>
    </svg>
  `,
  nounNymph: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="170" rx="40" ry="8" fill="#000" opacity="0.3"/>
      <path d="M 100 50 Q 70 80, 70 130 Q 70 170, 100 170 Q 130 170, 130 130 Q 130 80, 100 50 Z"
            fill="#a855f7" stroke="#581c87" stroke-width="3"/>
      <path d="M 100 60 Q 85 75, 80 95 L 120 95 Q 115 75, 100 60 Z" fill="#c084fc"/>
      <circle cx="90" cy="115" r="7" fill="#fff"/>
      <circle cx="90" cy="117" r="3" fill="#0f172a"/>
      <circle cx="110" cy="115" r="7" fill="#fff"/>
      <circle cx="110" cy="117" r="3" fill="#0f172a"/>
      <path d="M 92 135 Q 100 140, 108 135" fill="none" stroke="#581c87" stroke-width="2" stroke-linecap="round"/>
      <text x="75" y="160" font-size="9" font-weight="bold" fill="#fde68a">cat dog</text>
    </svg>
  `,
  adjectiveAxolotl: `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="170" rx="55" ry="8" fill="#000" opacity="0.3"/>
      <ellipse cx="100" cy="130" rx="55" ry="35" fill="#f9a8d4" stroke="#831843" stroke-width="3"/>
      <ellipse cx="100" cy="100" rx="35" ry="30" fill="#fbcfe8" stroke="#831843" stroke-width="3"/>
      <!-- gills -->
      <path d="M 65 100 Q 50 95, 45 105 Q 50 110, 65 105 Z" fill="#ec4899" stroke="#831843" stroke-width="1.5"/>
      <path d="M 135 100 Q 150 95, 155 105 Q 150 110, 135 105 Z" fill="#ec4899" stroke="#831843" stroke-width="1.5"/>
      <path d="M 60 110 Q 45 110, 42 120 Q 50 122, 62 115 Z" fill="#ec4899" stroke="#831843" stroke-width="1.5"/>
      <path d="M 140 110 Q 155 110, 158 120 Q 150 122, 138 115 Z" fill="#ec4899" stroke="#831843" stroke-width="1.5"/>
      <circle cx="88" cy="98" r="5" fill="#fff"/>
      <circle cx="88" cy="99" r="2" fill="#0f172a"/>
      <circle cx="112" cy="98" r="5" fill="#fff"/>
      <circle cx="112" cy="99" r="2" fill="#0f172a"/>
      <path d="M 92 112 Q 100 116, 108 112" fill="none" stroke="#831843" stroke-width="1.5" stroke-linecap="round"/>
      <text x="68" y="148" font-size="9" font-weight="bold" fill="#fff">cute • soft</text>
    </svg>
  `,
  grammarDragonBoss: `
    <svg viewBox="0 0 240 220" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="120" cy="200" rx="80" ry="12" fill="#000" opacity="0.3"/>
      <!-- body -->
      <ellipse cx="120" cy="140" rx="75" ry="50" fill="#dc2626" stroke="#7f1d1d" stroke-width="3"/>
      <!-- head -->
      <ellipse cx="120" cy="90" rx="42" ry="38" fill="#ef4444" stroke="#7f1d1d" stroke-width="3"/>
      <!-- horns -->
      <polygon points="95,60 85,30 105,55" fill="#fde68a" stroke="#92400e" stroke-width="2"/>
      <polygon points="145,60 155,30 135,55" fill="#fde68a" stroke="#92400e" stroke-width="2"/>
      <!-- snout -->
      <ellipse cx="120" cy="110" rx="20" ry="15" fill="#fca5a5"/>
      <circle cx="113" cy="108" r="2" fill="#0f172a"/>
      <circle cx="127" cy="108" r="2" fill="#0f172a"/>
      <!-- eyes -->
      <circle cx="103" cy="85" r="8" fill="#fff"/>
      <circle cx="103" cy="87" r="4" fill="#0f172a"/>
      <circle cx="137" cy="85" r="8" fill="#fff"/>
      <circle cx="137" cy="87" r="4" fill="#0f172a"/>
      <!-- wings -->
      <path d="M 50 120 Q 10 90, 20 60 Q 40 80, 50 110 Z" fill="#b91c1c" stroke="#7f1d1d" stroke-width="2"/>
      <path d="M 190 120 Q 230 90, 220 60 Q 200 80, 190 110 Z" fill="#b91c1c" stroke="#7f1d1d" stroke-width="2"/>
      <!-- mouth with letters -->
      <path d="M 100 122 Q 120 132, 140 122" fill="none" stroke="#7f1d1d" stroke-width="2.5" stroke-linecap="round"/>
      <text x="55" y="160" font-size="14" font-weight="bold" fill="#fde68a">. ? !</text>
      <text x="170" y="160" font-size="14" font-weight="bold" fill="#fde68a">"  "</text>
    </svg>
  `,

  // ============================================================
  // Island backgrounds
  // ============================================================
  bgMathMountain: `
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="600" fill="#0c4a6e"/>
      <rect y="350" width="800" height="250" fill="#92400e"/>
      <polygon points="0,400 200,150 400,400" fill="#475569" stroke="#1e293b" stroke-width="3"/>
      <polygon points="100,400 350,80 600,400" fill="#64748b" stroke="#1e293b" stroke-width="3"/>
      <polygon points="400,400 600,200 800,400" fill="#475569" stroke="#1e293b" stroke-width="3"/>
      <polygon points="320,150 360,90 400,150" fill="#fff"/>
      <polygon points="560,250 600,210 640,250" fill="#fff"/>
      <text x="100" y="100" font-size="60" fill="#fde68a" opacity="0.4">+</text>
      <text x="650" y="120" font-size="60" fill="#fde68a" opacity="0.4">×</text>
      <text x="400" y="60" font-size="50" fill="#fde68a" opacity="0.4">7</text>
    </svg>
  `,
  bgReadingReef: `
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="600" fill="#0e7490"/>
      <rect width="800" height="200" fill="#0891b2"/>
      <path d="M 0 400 Q 200 350, 400 400 T 800 400 L 800 600 L 0 600 Z" fill="#fde047"/>
      <ellipse cx="200" cy="500" rx="80" ry="20" fill="#facc15"/>
      <ellipse cx="600" cy="520" rx="100" ry="25" fill="#facc15"/>
      <text x="100" y="80" font-size="50" fill="#fff" opacity="0.5">A</text>
      <text x="650" y="100" font-size="50" fill="#fff" opacity="0.5">B</text>
      <text x="400" y="60" font-size="50" fill="#fff" opacity="0.5">C</text>
      <!-- bubbles -->
      <circle cx="150" cy="250" r="12" fill="#fff" opacity="0.4"/>
      <circle cx="500" cy="180" r="8" fill="#fff" opacity="0.4"/>
      <circle cx="700" cy="220" r="14" fill="#fff" opacity="0.4"/>
    </svg>
  `,
  bgSpellingSwamp: `
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="600" fill="#14532d"/>
      <rect y="400" width="800" height="200" fill="#365314"/>
      <ellipse cx="200" cy="430" rx="80" ry="14" fill="#84cc16" opacity="0.5"/>
      <ellipse cx="500" cy="450" rx="120" ry="18" fill="#84cc16" opacity="0.5"/>
      <ellipse cx="700" cy="420" rx="60" ry="10" fill="#84cc16" opacity="0.5"/>
      <text x="80" y="120" font-size="40" fill="#bef264" opacity="0.5">spell</text>
      <text x="500" y="80" font-size="40" fill="#bef264" opacity="0.5">write</text>
      <text x="300" y="200" font-size="40" fill="#bef264" opacity="0.5">word</text>
    </svg>
  `,
  bgGrammarGrove: `
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="600" fill="#365314"/>
      <rect y="380" width="800" height="220" fill="#84cc16"/>
      <!-- trees -->
      <rect x="80" y="280" width="20" height="120" fill="#78350f"/>
      <circle cx="90" cy="280" r="60" fill="#22c55e"/>
      <rect x="680" y="260" width="22" height="140" fill="#78350f"/>
      <circle cx="691" cy="260" r="70" fill="#16a34a"/>
      <rect x="400" y="300" width="18" height="100" fill="#78350f"/>
      <circle cx="409" cy="300" r="50" fill="#22c55e"/>
      <text x="200" y="100" font-size="40" fill="#fef3c7" opacity="0.4">noun</text>
      <text x="500" y="150" font-size="40" fill="#fef3c7" opacity="0.4">verb</text>
    </svg>
  `,
  bgFinalBoss: `
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bossRad" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#7f1d1d"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </radialGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bossRad)"/>
      <!-- lightning -->
      <polygon points="100,0 110,100 90,90 120,200" fill="#fde047" opacity="0.7"/>
      <polygon points="700,0 690,100 710,90 680,200" fill="#fde047" opacity="0.7"/>
      <!-- floor -->
      <ellipse cx="400" cy="550" rx="350" ry="60" fill="#1e1b4b"/>
      <ellipse cx="400" cy="550" rx="280" ry="40" fill="#312e81"/>
    </svg>
  `,

  // ============================================================
  // Island shapes for the world map
  // ============================================================
  islandMath: `
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="105" rx="40" ry="10" fill="#000" opacity="0.3"/>
      <ellipse cx="60" cy="95" rx="50" ry="14" fill="#fde047"/>
      <polygon points="60,30 30,90 90,90" fill="#475569" stroke="#1e293b" stroke-width="2"/>
      <polygon points="50,55 60,30 70,55" fill="#fff"/>
      <text x="35" y="80" font-size="14" font-weight="bold" fill="#fde68a">7+3</text>
    </svg>
  `,
  islandReading: `
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="105" rx="40" ry="10" fill="#000" opacity="0.3"/>
      <ellipse cx="60" cy="95" rx="50" ry="14" fill="#fde047"/>
      <rect x="35" y="50" width="50" height="40" rx="3" fill="#7c2d12" stroke="#1c0c08" stroke-width="2"/>
      <rect x="38" y="53" width="22" height="34" fill="#fef3c7"/>
      <rect x="60" y="53" width="22" height="34" fill="#fde68a"/>
      <line x1="42" y1="60" x2="56" y2="60" stroke="#92400e" stroke-width="1"/>
      <line x1="42" y1="66" x2="56" y2="66" stroke="#92400e" stroke-width="1"/>
      <line x1="64" y1="60" x2="78" y2="60" stroke="#92400e" stroke-width="1"/>
      <text x="50" y="42" font-size="13" font-weight="bold" fill="#fff">ABC</text>
    </svg>
  `,
  islandSpelling: `
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="105" rx="40" ry="10" fill="#000" opacity="0.3"/>
      <ellipse cx="60" cy="95" rx="50" ry="14" fill="#84cc16"/>
      <ellipse cx="60" cy="80" rx="35" ry="8" fill="#bef264" opacity="0.8"/>
      <text x="45" y="55" font-size="20" font-weight="bold" fill="#fef3c7">CAT</text>
      <text x="40" y="40" font-size="14" font-weight="bold" fill="#fde68a">K-A-T?</text>
    </svg>
  `,
  islandGrammar: `
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="105" rx="40" ry="10" fill="#000" opacity="0.3"/>
      <ellipse cx="60" cy="95" rx="50" ry="14" fill="#fde047"/>
      <rect x="55" y="50" width="10" height="45" fill="#78350f"/>
      <circle cx="60" cy="50" r="22" fill="#22c55e"/>
      <text x="38" y="40" font-size="11" font-weight="bold" fill="#fff">noun</text>
      <text x="68" y="80" font-size="11" font-weight="bold" fill="#fff">verb</text>
    </svg>
  `,
  islandBoss: `
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="105" rx="40" ry="10" fill="#000" opacity="0.4"/>
      <ellipse cx="60" cy="95" rx="55" ry="14" fill="#7f1d1d"/>
      <polygon points="60,15 30,85 90,85" fill="#1e1b4b" stroke="#0f172a" stroke-width="2"/>
      <circle cx="50" cy="60" r="3" fill="#f87171"/>
      <circle cx="70" cy="60" r="3" fill="#f87171"/>
      <text x="50" y="35" font-size="14" fill="#f87171">☠</text>
    </svg>
  `,
  favicon: `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#5b21b6"/>
      <polygon points="32,8 18,38 46,38" fill="#fbbf24"/>
      <circle cx="32" cy="44" r="10" fill="#fde68a"/>
      <text x="22" y="50" font-size="14" font-weight="bold" fill="#5b21b6">PG</text>
    </svg>
  `,

  // ============================================================
  // Walking avatars — chibi/compact wizard for the world map.
  // Two color variants so Philip and Owen look different.
  // ============================================================
  walkPhilip: `
    <svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="92" rx="22" ry="4" fill="#000" opacity="0.35"/>
      <!-- robe -->
      <path d="M 24 60 Q 22 50, 30 46 L 50 46 Q 58 50, 56 60 L 60 86 L 20 86 Z"
            fill="#1e40af" stroke="#0f172a" stroke-width="2"/>
      <text x="32" y="68" font-size="6" fill="#fde68a">★</text>
      <text x="44" y="74" font-size="5" fill="#fde68a">★</text>
      <!-- head -->
      <ellipse cx="40" cy="38" rx="13" ry="14" fill="#f5d3b3" stroke="#a16207" stroke-width="1"/>
      <!-- hair -->
      <path d="M 28 36 Q 26 22, 40 18 Q 54 22, 52 36 Q 46 30, 40 30 Q 34 30, 28 36 Z"
            fill="#5d4037" stroke="#3e2723" stroke-width="0.8"/>
      <!-- glasses -->
      <rect x="30" y="38" width="9" height="6" rx="1" fill="none" stroke="#0f172a" stroke-width="1.2"/>
      <rect x="41" y="38" width="9" height="6" rx="1" fill="none" stroke="#0f172a" stroke-width="1.2"/>
      <line x1="39" y1="41" x2="41" y2="41" stroke="#0f172a" stroke-width="1.2"/>
      <circle cx="34.5" cy="41" r="1" fill="#1e293b"/>
      <circle cx="45.5" cy="41" r="1" fill="#1e293b"/>
      <!-- mouth -->
      <path d="M 36 49 Q 40 51, 44 49" fill="none" stroke="#7c2d12" stroke-width="1" stroke-linecap="round"/>
      <!-- hat -->
      <path d="M 26 24 L 40 0 L 54 24 Z" fill="#5b21b6" stroke="#2e1065" stroke-width="1.5"/>
      <path d="M 22 24 Q 40 20, 58 24 L 58 28 Q 40 24, 22 28 Z" fill="#4c1d95" stroke="#2e1065" stroke-width="1"/>
      <!-- wand -->
      <line x1="58" y1="64" x2="70" y2="50" stroke="#78350f" stroke-width="2" stroke-linecap="round"/>
      <polygon points="69,49 73,46 67,46" fill="#fbbf24" stroke="#b45309" stroke-width="0.8"/>
      <!-- feet -->
      <ellipse cx="32" cy="86" rx="5" ry="3" fill="#1c0c08"/>
      <ellipse cx="48" cy="86" rx="5" ry="3" fill="#1c0c08"/>
    </svg>
  `,
  walkOwen: `
    <svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="92" rx="22" ry="4" fill="#000" opacity="0.35"/>
      <path d="M 24 60 Q 22 50, 30 46 L 50 46 Q 58 50, 56 60 L 60 86 L 20 86 Z"
            fill="#7c2d12" stroke="#0f172a" stroke-width="2"/>
      <text x="32" y="68" font-size="6" fill="#fde68a">★</text>
      <ellipse cx="40" cy="38" rx="13" ry="14" fill="#f5d3b3" stroke="#a16207" stroke-width="1"/>
      <path d="M 28 36 Q 26 22, 40 18 Q 54 22, 52 36 Q 46 30, 40 30 Q 34 30, 28 36 Z"
            fill="#1f2937" stroke="#0f172a" stroke-width="0.8"/>
      <circle cx="35" cy="41" r="1.5" fill="#1e293b"/>
      <circle cx="45" cy="41" r="1.5" fill="#1e293b"/>
      <path d="M 36 49 Q 40 51, 44 49" fill="none" stroke="#7c2d12" stroke-width="1" stroke-linecap="round"/>
      <path d="M 26 24 L 40 0 L 54 24 Z" fill="#0d9488" stroke="#134e4a" stroke-width="1.5"/>
      <path d="M 22 24 Q 40 20, 58 24 L 58 28 Q 40 24, 22 28 Z" fill="#0f766e" stroke="#134e4a" stroke-width="1"/>
      <line x1="58" y1="64" x2="70" y2="50" stroke="#78350f" stroke-width="2" stroke-linecap="round"/>
      <polygon points="69,49 73,46 67,46" fill="#5eead4" stroke="#0f766e" stroke-width="0.8"/>
      <ellipse cx="32" cy="86" rx="5" ry="3" fill="#1c0c08"/>
      <ellipse cx="48" cy="86" rx="5" ry="3" fill="#1c0c08"/>
    </svg>
  `,

  // ============================================================
  // Pet sprites — small companions
  // ============================================================
  petDrake: `
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="110" rx="30" ry="5" fill="#000" opacity="0.3"/>
      <!-- body -->
      <ellipse cx="60" cy="75" rx="36" ry="28" fill="#dc2626" stroke="#7f1d1d" stroke-width="2.5"/>
      <ellipse cx="60" cy="55" rx="24" ry="22" fill="#ef4444" stroke="#7f1d1d" stroke-width="2.5"/>
      <!-- wings -->
      <path d="M 28 60 Q 8 40, 14 25 Q 22 38, 30 55 Z" fill="#b91c1c" stroke="#7f1d1d" stroke-width="1.5"/>
      <path d="M 92 60 Q 112 40, 106 25 Q 98 38, 90 55 Z" fill="#b91c1c" stroke="#7f1d1d" stroke-width="1.5"/>
      <!-- horns -->
      <polygon points="50,38 44,22 56,34" fill="#fbbf24" stroke="#92400e" stroke-width="1"/>
      <polygon points="70,38 76,22 64,34" fill="#fbbf24" stroke="#92400e" stroke-width="1"/>
      <!-- eyes -->
      <circle cx="52" cy="52" r="4" fill="#fff"/>
      <circle cx="52" cy="54" r="2" fill="#0f172a"/>
      <circle cx="68" cy="52" r="4" fill="#fff"/>
      <circle cx="68" cy="54" r="2" fill="#0f172a"/>
      <!-- snout -->
      <ellipse cx="60" cy="66" rx="10" ry="6" fill="#fca5a5"/>
      <circle cx="56" cy="64" r="1" fill="#0f172a"/>
      <circle cx="64" cy="64" r="1" fill="#0f172a"/>
      <!-- tiny fire breath -->
      <path d="M 60 73 Q 64 78, 60 84 Q 56 78, 60 73 Z" fill="#fbbf24"/>
    </svg>
  `,
  petOwl: `
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="110" rx="28" ry="5" fill="#000" opacity="0.3"/>
      <!-- body -->
      <ellipse cx="60" cy="70" rx="34" ry="36" fill="#92400e" stroke="#451a03" stroke-width="2.5"/>
      <!-- belly feathers -->
      <ellipse cx="60" cy="78" rx="22" ry="22" fill="#fef3c7"/>
      <path d="M 48 70 Q 60 78, 72 70" fill="none" stroke="#a16207" stroke-width="1"/>
      <path d="M 48 82 Q 60 90, 72 82" fill="none" stroke="#a16207" stroke-width="1"/>
      <!-- eyes (big owl eyes) -->
      <circle cx="48" cy="58" r="12" fill="#fff" stroke="#451a03" stroke-width="2"/>
      <circle cx="72" cy="58" r="12" fill="#fff" stroke="#451a03" stroke-width="2"/>
      <circle cx="48" cy="60" r="6" fill="#0f172a"/>
      <circle cx="72" cy="60" r="6" fill="#0f172a"/>
      <circle cx="50" cy="58" r="1.5" fill="#fff"/>
      <circle cx="74" cy="58" r="1.5" fill="#fff"/>
      <!-- beak -->
      <polygon points="60,68 56,76 64,76" fill="#fbbf24" stroke="#92400e" stroke-width="1"/>
      <!-- ear tufts -->
      <polygon points="38,40 32,28 46,38" fill="#92400e" stroke="#451a03" stroke-width="1.5"/>
      <polygon points="82,40 88,28 74,38" fill="#92400e" stroke="#451a03" stroke-width="1.5"/>
      <!-- wee book held -->
      <rect x="40" y="92" width="14" height="10" rx="1" fill="#1e40af" stroke="#0f172a" stroke-width="1"/>
      <rect x="41" y="93" width="6" height="8" fill="#fef3c7"/>
    </svg>
  `,
  petToad: `
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="108" rx="36" ry="6" fill="#000" opacity="0.3"/>
      <!-- body -->
      <ellipse cx="60" cy="82" rx="42" ry="26" fill="#16a34a" stroke="#052e16" stroke-width="2.5"/>
      <!-- spots -->
      <circle cx="42" cy="80" r="5" fill="#22c55e"/>
      <circle cx="76" cy="76" r="6" fill="#22c55e"/>
      <circle cx="58" cy="92" r="4" fill="#22c55e"/>
      <!-- eyes (bulging) -->
      <circle cx="44" cy="56" r="12" fill="#16a34a" stroke="#052e16" stroke-width="2"/>
      <circle cx="76" cy="56" r="12" fill="#16a34a" stroke="#052e16" stroke-width="2"/>
      <circle cx="44" cy="56" r="8" fill="#fef3c7"/>
      <circle cx="76" cy="56" r="8" fill="#fef3c7"/>
      <circle cx="44" cy="58" r="4" fill="#0f172a"/>
      <circle cx="76" cy="58" r="4" fill="#0f172a"/>
      <!-- mouth -->
      <path d="M 42 86 Q 60 96, 78 86" fill="none" stroke="#052e16" stroke-width="2.5" stroke-linecap="round"/>
      <!-- legs -->
      <ellipse cx="22" cy="100" rx="10" ry="6" fill="#16a34a" stroke="#052e16" stroke-width="2"/>
      <ellipse cx="98" cy="100" rx="10" ry="6" fill="#16a34a" stroke="#052e16" stroke-width="2"/>
      <!-- heart symbol on belly -->
      <text x="55" y="88" font-size="10" fill="#dc2626">♥</text>
    </svg>
  `,
  petWolf: `
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="108" rx="32" ry="6" fill="#000" opacity="0.3"/>
      <!-- body -->
      <ellipse cx="60" cy="82" rx="34" ry="22" fill="#6b7280" stroke="#1f2937" stroke-width="2.5"/>
      <!-- head -->
      <ellipse cx="60" cy="56" rx="24" ry="22" fill="#9ca3af" stroke="#1f2937" stroke-width="2.5"/>
      <!-- ears -->
      <polygon points="42,40 36,22 48,38" fill="#9ca3af" stroke="#1f2937" stroke-width="2"/>
      <polygon points="78,40 84,22 72,38" fill="#9ca3af" stroke="#1f2937" stroke-width="2"/>
      <polygon points="44,34 40,26 46,34" fill="#fbbf24"/>
      <polygon points="76,34 80,26 74,34" fill="#fbbf24"/>
      <!-- snout -->
      <ellipse cx="60" cy="68" rx="14" ry="10" fill="#d1d5db"/>
      <ellipse cx="60" cy="64" rx="3" ry="2" fill="#0f172a"/>
      <!-- eyes -->
      <circle cx="50" cy="52" r="4" fill="#fff"/>
      <circle cx="50" cy="54" r="2" fill="#fbbf24"/>
      <circle cx="50" cy="54" r="1" fill="#0f172a"/>
      <circle cx="70" cy="52" r="4" fill="#fff"/>
      <circle cx="70" cy="54" r="2" fill="#fbbf24"/>
      <circle cx="70" cy="54" r="1" fill="#0f172a"/>
      <!-- mouth -->
      <path d="M 54 72 Q 60 76, 66 72" fill="none" stroke="#0f172a" stroke-width="1.5"/>
      <!-- lightning -->
      <polygon points="92,60 88,72 96,68 92,82" fill="#fde047" stroke="#a16207" stroke-width="1"/>
      <!-- legs -->
      <rect x="36" y="96" width="6" height="14" fill="#6b7280" stroke="#1f2937" stroke-width="1.5"/>
      <rect x="78" y="96" width="6" height="14" fill="#6b7280" stroke="#1f2937" stroke-width="1.5"/>
    </svg>
  `,
};

// Helper: get any sprite as DOM/HTML string
function getSprite(name) { return CHARACTERS[name] || ''; }
