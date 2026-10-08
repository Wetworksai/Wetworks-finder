import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import TernaryCodeCanvas from './components/TernaryCodeCanvas.tsx';
import ContactModal from './components/ContactModal.tsx';
import eraseBgLogo from './assets/images/erasebg-transformed.png';
import bgImage from './assets/images/Bg.png';

// Visual assets
const ROBOT_HUMAN_HANDS = bgImage;
const MARBLE_TEXTURE = '/src/assets/images/marble_grunge_bg_1791172878650.jpg';
const DRAGONFLY_LOGO = eraseBgLogo;

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="relative w-screen h-screen min-h-[640px] bg-[#f4f4f4] text-neutral-900 font-sans flex flex-col justify-between overflow-hidden select-none">
      {/* ──────────────── 1. BACKGROUND LAYERS ──────────────── */}
      {/* Pale Arctic/Concrete Grunge Marble Texture */}
      <img
        src={MARBLE_TEXTURE}
        alt="Atmospheric background texture"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-multiply pointer-events-none z-0"
      />

      {/* Micro-halftone & Computational Grain Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-35 z-[1]"
        style={{
          backgroundImage: `radial-gradient(#111 0.75px, transparent 0.75px)`,
          backgroundSize: '9px 9px',
        }}
      />

      {/* ──────────────── 2. TERNARY CODE LAYER (0, 1, 2 ONLY) ──────────────── */}
      {/* 60FPS Canvas, Satin Gold, Front-Most Data Streams at z-[35] */}
      <TernaryCodeCanvas />

      {/* ──────────────── 3. CENTER DRAGONFLY LOGO LAYER ──────────────── */}
      <div
        className="logo-layer pointer-events-none select-none z-[25]"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 'var(--logo-top, clamp(26%, 30vh, 34%))',
          left: 'var(--logo-left, 50%)',
          transform: 'translate(-50%, -50%)',
          width: 'var(--logo-width, clamp(540px, 62vw, 980px))',
          height: 'var(--logo-height, clamp(320px, 40vh, 580px))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={DRAGONFLY_LOGO}
          alt="WETWORKSAI Golden Dragonfly Logo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain filter drop-shadow-[0_12px_45px_rgba(0,0,0,0.22)] select-none pointer-events-none transition-transform duration-300"
        />
      </div>

      {/* ──────────────── 4. BRAND HEADER ──────────────── */}
      <header className="relative z-40 w-full px-4 sm:px-8 md:px-12 pt-4 sm:pt-6 md:pt-8 flex items-center justify-center sm:justify-between">
        {/* Left: WETWORKSAI Brand + 9.12.2026.12:50 Timestamp */}
        <div className="flex items-center gap-3 sm:gap-6 bg-white/90 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl md:rounded-2xl border border-white/80 shadow-[0_4px_24px_rgba(0,0,0,0.05)] transition-all duration-300">
          <span className="text-lg sm:text-2xl md:text-[28px] font-black tracking-tight text-black select-none">
            WETWORKSAI
          </span>
          <span className="font-digital text-sm sm:text-lg md:text-xl font-bold tracking-wider text-black select-none">
            9.12.2026.12:50
          </span>
        </div>

        {/* Right: Waitlist Starting soon ↗ Interactive Button (Desktop/Tablet) */}
        <button
          onClick={() => setIsContactOpen(true)}
          className="hidden sm:flex group bg-black hover:brightness-110 active:scale-[0.985] hover:scale-[1.015] text-white font-medium text-xs sm:text-sm md:text-[15px] px-5 sm:px-6 py-2 sm:py-2.5 rounded-full items-center gap-1.5 sm:gap-2 shadow-lg shadow-black/15 transition-all duration-200 cursor-pointer"
          aria-haspopup="dialog"
          aria-expanded={isContactOpen}
        >
          <span>Waitlist Starting soon</span>
          <ArrowUpRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </header>

      {/* ──────────────── 5. CORE HERO COMPOSITION: HANDS OF CREATION ──────────────── */}
      <main className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-hidden">
        {/* Center Artwork: Full-bleed image continuity filling top to bottom, with hands positioned lower */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
            <img
              src={ROBOT_HUMAN_HANDS}
              alt="WetWorksAi Creation: Chrome Robotic Hand and Human Hand"
              referrerPolicy="no-referrer"
              className="absolute -top-[16%] sm:-top-[20%] left-0 w-full h-[132%] sm:h-[140%] object-cover object-[center_70%] mix-blend-multiply filter contrast-110 select-none pointer-events-none"
            />
          </div>
        </div>
      </main>

      {/* ──────────────── 6. BOTTOM HEADLINE BANNER ──────────────── */}
      <footer className="relative z-40 w-full px-4 sm:px-8 md:px-12 pb-6 sm:pb-8 flex flex-col items-center">
        {/* Phone Version: Waitlist button placed in the center between the logo and "Trusted by teams of every scale" */}
        <div className="flex sm:hidden mb-3.5 z-40">
          <button
            onClick={() => setIsContactOpen(true)}
            className="group bg-black hover:brightness-110 active:scale-[0.985] hover:scale-[1.015] text-white font-medium text-xs sm:text-sm px-5 py-2.5 rounded-full flex items-center gap-1.5 shadow-xl shadow-black/25 transition-all duration-200 cursor-pointer"
            aria-haspopup="dialog"
            aria-expanded={isContactOpen}
          >
            <span>Waitlist Starting soon</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Subtle Credibility Line */}
        <p className="text-neutral-800 text-xs sm:text-sm md:text-[14px] font-medium tracking-normal text-center mb-2.5 sm:mb-3 select-none">
          Trusted by teams of every scale
        </p>

        {/* Frosted Glass Headline Banner */}
        <div className="w-full max-w-4xl bg-white/90 backdrop-blur-md border border-white/80 shadow-[0_4px_30px_rgba(0,0,0,0.06)] rounded-xl sm:rounded-2xl px-6 sm:px-10 md:px-14 py-3 sm:py-4 md:py-4.5 text-center transition-all">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[38px] font-black text-black tracking-tight leading-tight select-none">
            The New Heirarchy of Artificial Intelligence
          </h1>
        </div>
      </footer>

      {/* ──────────────── 7. CONTACT / WAITLIST TERMINAL TILE ──────────────── */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
