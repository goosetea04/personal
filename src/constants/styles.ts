// --- CSS ANIMATIONS ---
export const styles = `
  /* 1. Mask Wipe - NOW SETS OPACITY TO 1 */

  @keyframes mask-wipe-right {

    0% { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); opacity: 1; }

    100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); opacity: 1; }

  }



  /* 2. Kinetic Slam - EXPLICIT OPACITY AT 100% */

  @keyframes kinetic-slam {

    0% { transform: scale(3) rotate(-10deg); opacity: 0; }

    60% { transform: scale(0.9) rotate(2deg); opacity: 1; }

    80% { transform: scale(1.05) rotate(-1deg); }

    100% { transform: scale(1) rotate(0deg); opacity: 1; }

  }



  /* 3. Staggered Slide Up */

  @keyframes slide-up-stagger {

    0% { transform: translateY(100px) skewX(20deg); opacity: 0; }

    100% { transform: translateY(0) skewX(0deg); opacity: 1; }

  }



  /* 4. Card Deal */

  @keyframes card-deal {

    0% { transform: translateY(200%) rotate(30deg); opacity: 0; }

    100% { transform: translateY(0) rotate(0); opacity: 1; }

  }



  /* 5. Glitch Shake */

  @keyframes glitch-shake {

    0% { transform: translate(0); }

    20% { transform: translate(-2px, 2px); }

    40% { transform: translate(-2px, -2px); }

    60% { transform: translate(2px, 2px); }

    80% { transform: translate(2px, -2px); }

    100% { transform: translate(0); }

  }

 

  /* 6. Spin In */

  @keyframes spin-stick {

    0% { transform: scale(0) rotate(720deg); opacity: 0; }

    100% { transform: scale(1) rotate(2deg); opacity: 1; }

  }



  .animate-mask-wipe { animation: mask-wipe-right 0.6s cubic-bezier(0.8, 0, 0.2, 1) forwards; }

  .animate-slam { animation: kinetic-slam 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }

  .animate-spin-stick { animation: spin-stick 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards; }

  .hover-glitch:hover { animation: glitch-shake 0.3s infinite; }

  /* NEW: Floating / Twinkling Animation */
  @keyframes float-twinkle {
    0% { transform: translateY(0) rotate(0deg) scale(0.5); opacity: 0; }
    50% { transform: translateY(-20px) rotate(180deg) scale(1); opacity: 0.8; }
    100% { transform: translateY(-40px) rotate(360deg) scale(0.5); opacity: 0; }
  }

  /* NEW: CRT Scanline Animation */
  @keyframes scanline {
    0% { background-position: 0% 0%; }
    100% { background-position: 0% 100%; }
  }

  /* NEW: Text Glitch Effect */
  .glitch-text {
    position: relative;
  }
  .glitch-text::before,
  .glitch-text::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #0a2e1f; /* Match bg color */
  }
  .glitch-text::before {
    left: 2px;
    text-shadow: -1px 0 #ff00c1;
    clip: rect(44px, 450px, 56px, 0);
    animation: glitch-anim 5s infinite linear alternate-reverse;
  }
  .glitch-text::after {
    left: -2px;
    text-shadow: -1px 0 #39ff14;
    clip: rect(44px, 450px, 56px, 0);
    animation: glitch-anim2 5s infinite linear alternate-reverse;
  }

  @keyframes glitch-anim {
    0% { clip: rect(11px, 9999px, 81px, 0); }
    20% { clip: rect(68px, 9999px, 7px, 0); }
    40% { clip: rect(18px, 9999px, 57px, 0); }
    60% { clip: rect(4px, 9999px, 84px, 0); }
    80% { clip: rect(32px, 9999px, 26px, 0); }
    100% { clip: rect(9px, 9999px, 11px, 0); }
  }
  @keyframes glitch-anim2 {
    0% { clip: rect(65px, 9999px, 100px, 0); }
    20% { clip: rect(22px, 9999px, 8px, 0); }
    40% { clip: rect(89px, 9999px, 46px, 0); }
    60% { clip: rect(2px, 9999px, 32px, 0); }
    80% { clip: rect(60px, 9999px, 73px, 0); }
    100% { clip: rect(35px, 9999px, 88px, 0); }
  }

  /* ... KEEP YOUR EXISTING UTILITY CLASSES ... */
  .animate-mask-wipe { animation: mask-wipe-right 0.6s cubic-bezier(0.8, 0, 0.2, 1) forwards; }
  .animate-slam { animation: kinetic-slam 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
  .animate-spin-stick { animation: spin-stick 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards; }
  .hover-glitch:hover { animation: glitch-shake 0.3s infinite; }
`;