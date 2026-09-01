import React, { useState, useRef, useEffect } from 'react';
import StarryBackground from './StarryBackground';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [isWritingModalOpen, setIsWritingModalOpen] = useState(false);

  // Audio setup
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/YumuDT main theme by ayumudt.mp3');
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleEnterRealm = () => {
    setHasEntered(true);
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlayingMusic(true))
        .catch((err) => console.log('Playback error:', err));
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlayingMusic) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => console.log('Audio playback error:', err));
    }
    setIsPlayingMusic(!isPlayingMusic);
  };

  // Fairy Pet State
  const [fairyEnergy, setFairyEnergy] = useState(70);
  const [fairyXp, setFairyXp] = useState(20);
  const [fairyLevel, setFairyLevel] = useState(1);
  const [actionText, setActionText] = useState('');
  const [accessory, setAccessory] = useState('wand');

  const triggerFairyAction = (text, energyDelta, xpDelta) => {
    setActionText(text);
    setTimeout(() => setActionText(''), 1200);

    setFairyEnergy((prev) => Math.min(100, Math.max(0, prev + energyDelta)));
    setFairyXp((prev) => {
      const nextXp = prev + xpDelta;
      if (nextXp >= 100) {
        setFairyLevel((l) => l + 1);
        setActionText('✨ LEVEL UP! ✨');
        return 0;
      }
      return nextXp;
    });
  };

  const getFairySprite = () => {
    if (fairyEnergy < 30) return '😴 🧚‍♀️';
    if (fairyEnergy > 80) return '✨🧚‍♀️✨';
    return '🧚‍♀️';
  };

  const getAccessoryIcon = () => {
    if (accessory === 'wand') return '🪄';
    if (accessory === 'crown') return '👑';
    return '🌟';
  };

  return (
    <div className="min-h-screen bg-[#0f0c24] text-[#4a3b32] p-4 md:p-8 flex flex-col items-center gap-6 relative selection:bg-[#f3c4fb]">
      <StarryBackground />      
      
      {/* Welcome Overlay */}
      {!hasEntered && (
        <div className="fixed inset-0 bg-[#0f0c24]/95 z-50 flex flex-col items-center justify-center p-4 backdrop-blur-md text-[#f6ede0]">
          <div className="border-4 border-[#d8c29d] bg-[#1a1438] p-8 rounded-2xl shadow-[0_0_30px_rgba(243,196,251,0.3)] flex flex-col items-center max-w-sm text-center">
            <span className="text-4xl mb-3 animate-bounce">✨</span>
            <h2 className="text-2xl font-serif text-[#f3c4fb] font-bold mb-2">Welcome to DreamyToo</h2>
            <p className="text-xs text-[#d8c29d] font-serif italic mb-6">
              Click below to enter the realm with ambient music enabled.
            </p>
            <button
              onClick={handleEnterRealm}
              className="px-6 py-2.5 rounded-xl border-2 border-[#d8c29d] bg-[#372a63] text-[#f3c4fb] font-serif text-sm font-bold shadow-lg hover:bg-[#483777] hover:border-[#f3c4fb] transition cursor-pointer"
            >
              ✦ Enter Realm ✦
            </button>
          </div>
        </div>
      )}

      {/* Writing Log Modal / Reader View */}
      {isWritingModalOpen && (
        <div className="fixed inset-0 bg-[#0f0c24]/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="border-4 border-[#d8c29d] bg-[#f6ede0] text-[#33261d] p-6 md:p-8 rounded-2xl max-w-2xl w-full shadow-2xl relative font-serif max-h-[85vh] overflow-y-auto">
            <button 
              onClick={() => setIsWritingModalOpen(false)}
              className="absolute top-4 right-4 text-xl text-[#8c6d58] hover:text-[#2a204a] cursor-pointer font-bold"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold text-[#2a204a] border-b-2 border-[#d8c29d]/60 pb-3 mb-4 flex items-center gap-2">
              <span>📖</span> YumuDT's Story Vault
            </h3>

            <div className="flex flex-col gap-4 text-sm">
              {/* Story Item 1 */}
              <div className="bg-[#eddcc4] p-4 rounded-xl border border-[#d8c29d]/70 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h4 className="font-bold text-base text-[#2a204a]">Trick or Truth: Elysian</h4>
                  <p className="text-xs text-[#5a483c] italic mt-0.5">Speculative fiction saga • Tapas Series</p>
                </div>
                <a 
                  href="https://tapas.io/series/Trick-or-Truth-Elysian/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-[#2a204a] text-[#f3c4fb] rounded-lg border border-[#d8c29d] text-xs font-bold hover:bg-[#372a63] transition shrink-0"
                >
                  Read on Tapas ↗
                </a>
              </div>

              {/* Story Item 2 */}
              <div className="bg-[#eddcc4] p-4 rounded-xl border border-[#d8c29d]/70 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h4 className="font-bold text-base text-[#2a204a]">The Circles of Wyrds</h4>
                  <p className="text-xs text-[#5a483c] italic mt-0.5">High-fantasy & elemental lore saga • Tapas Series</p>
                </div>
                <a 
                  href="https://tapas.io/series/The-Circles-of-Wyrds/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-[#2a204a] text-[#f3c4fb] rounded-lg border border-[#d8c29d] text-xs font-bold hover:bg-[#372a63] transition shrink-0"
                >
                  Read on Tapas ↗
                </a>
              </div>

              {/* Story Item 3 */}
              <div className="bg-[#eddcc4] p-4 rounded-xl border border-[#d8c29d]/70 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h4 className="font-bold text-base text-[#2a204a]">A Tale That Never Known</h4>
                  <p className="text-xs text-[#5a483c] italic mt-0.5">Novel serial • Webnovel</p>
                </div>
                <a 
                  href="https://www.webnovel.com/book/a-tale-that-never-known_31427890608044405" 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-[#2a204a] text-[#f3c4fb] rounded-lg border border-[#d8c29d] text-xs font-bold hover:bg-[#372a63] transition shrink-0"
                >
                  Read on Webnovel ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1. Header Banner */}
      <header className="w-full max-w-5xl h-36 border-4 border-[#d8c29d] bg-linear-to-r from-[#2a2254] via-[#483777] to-[#2a2254] rounded-2xl flex flex-col items-center justify-center shadow-[0_0_20px_rgba(243,196,251,0.2)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f3c4fb_1px,transparent_1px)] bg-size-[16px_16px]"></div>
        <h1 className="text-3xl md:text-5xl font-serif text-[#f6ede0] tracking-wide drop-shadow-[0_2px_10px_rgba(243,196,251,0.6)] z-10">
          DreamyToo
        </h1>
        <p className="text-[#f3c4fb] text-sm font-serif italic z-10 mt-1">
          ✦ Where Night Skies & Stories Meet ✦
        </p>
      </header>

      {/* 2. Navigation Bar */}
      <nav className="w-full max-w-5xl border-2 border-[#d8c29d] bg-[#1a1438] rounded-xl p-2 flex justify-around items-center text-[#f6ede0] shadow-md z-10">
        {['home', 'about', 'Project', 'Game', 'Others'].map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-lg border transition-all cursor-pointer capitalize font-serif text-sm md:text-base ${
              activeTab === tab 
                ? 'border-[#f3c4fb] bg-[#2a204a] text-[#f3c4fb] shadow-[0_0_10px_rgba(243,196,251,0.3)]' 
                : 'border-[#d8c29d]/30 text-[#f6ede0]/80 hover:border-[#d8c29d] hover:text-[#f6ede0]'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* 3. Main Content Switching */}
      <main className="w-full max-w-5xl z-10">
        {activeTab === 'home' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <section className="md:col-span-5 border-2 border-[#d8c29d] bg-[#f6ede0] rounded-2xl p-6 shadow-lg flex flex-col items-center justify-between">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-28 h-28 rounded-full border-4 border-[#d8c29d] bg-[#2a204a] mb-3 flex items-center justify-center shadow-md overflow-hidden">
                  <img 
                    src="/YumuDT.jpeg" 
                    alt="YumuDT Profile" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute -bottom-2 bg-[#d8c29d] text-[#1a1438] text-xs px-2 py-0.5 rounded-full font-bold z-10">
                    Lvl. 1
                  </div>
                </div>
                
                <h2 className="text-xl font-bold font-serif text-[#33261d]">YumuDT (AyumuDT)</h2>
                <span className="text-xs text-[#8c6d58] font-serif italic mb-3">
                  Systems Architect, Fiction Writer, & Creative Technologist
                </span>
                
                <p className="text-xs text-[#5a483c] leading-relaxed font-serif bg-[#eddcc4] p-3 rounded-xl border border-[#d8c29d]/50 text-left">
                  I build intelligent tools for storytellers and engineer lore-rich digital experiences. As the developer behind Ruwa—a multi-model AI workspace designed for complex, long-form novel architecture—and the author of speculative fiction sagas, my work bridges the gap between software systems, interactive UI/UX, and expansive worldbuilding. Otherwise, I'm a random passerby you may never notice in the sea of techs and internet.
                </p>
              </div>

              <div className="w-full mt-4 pt-3 border-t border-[#d8c29d]/60 flex justify-around text-xs font-serif text-[#6b584c]">
                <span>✦ Ruwa Architect</span>
                <span>✦ Worldbuilder</span>
              </div>
            </section>

            <div className="md:col-span-7 flex flex-col gap-6">
              <section className="border-2 border-[#d8c29d] bg-[#2a204a] text-[#f6ede0] rounded-2xl p-5 shadow-lg flex flex-col justify-between relative overflow-hidden">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-serif text-[#f3c4fb]">✦ Celestial Fairy</h3>
                    <span className="text-[10px] bg-[#f3c4fb]/20 text-[#f3c4fb] px-2 py-0.5 rounded-full font-serif border border-[#f3c4fb]/40">
                      Lvl {fairyLevel}
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      const nextAcc = accessory === 'wand' ? 'crown' : accessory === 'crown' ? 'star' : 'wand';
                      setAccessory(nextAcc);
                    }}
                    className="text-xs text-[#d8c29d] hover:text-[#f3c4fb] transition cursor-pointer"
                  >
                    {getAccessoryIcon()} Swap Gear
                  </button>
                </div>

                <div className="h-28 bg-[#1a1438] rounded-xl border border-[#d8c29d]/30 flex flex-col items-center justify-center relative overflow-hidden my-2 shadow-inner">
                  {actionText && (
                    <span className="absolute top-2 text-xs font-serif font-bold text-[#f3c4fb] animate-bounce z-10 bg-[#2a204a]/80 px-2 py-0.5 rounded-md border border-[#f3c4fb]/30">
                      {actionText}
                    </span>
                  )}

                  <div 
                    className="relative text-4xl select-none transition-all duration-300 transform hover:scale-125 cursor-pointer flex items-center justify-center gap-1"
                    onClick={() => triggerFairyAction('💖 *Tinkle*', 5, 5)}
                  >
                    <span className="text-sm absolute -top-2 right-0 animate-spin">{getAccessoryIcon()}</span>
                    <span className={fairyEnergy < 30 ? 'opacity-70' : 'animate-bounce'}>{getFairySprite()}</span>
                  </div>

                  <div className="w-3/4 bg-[#0f0c24] h-1.5 rounded-full mt-3 overflow-hidden border border-[#d8c29d]/20">
                    <div className="bg-[#f3c4fb] h-full transition-all duration-300" style={{ width: `${fairyXp}%` }}></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-serif text-[#d8c29d] mb-2">
                  <div className="flex justify-between bg-[#1a1438]/60 px-2 py-1 rounded border border-[#d8c29d]/20">
                    <span>Mana/Energy</span>
                    <span className={fairyEnergy < 30 ? 'text-red-400 font-bold' : 'text-[#f6ede0]'}>{fairyEnergy}%</span>
                  </div>
                  <div className="flex justify-between bg-[#1a1438]/60 px-2 py-1 rounded border border-[#d8c29d]/20">
                    <span>Star Affinity</span>
                    <span className="text-[#f3c4fb]">{fairyXp}/100</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => triggerFairyAction('🫐 +15 Mana', 15, 10)}
                    className="flex-1 py-1 text-xs font-serif bg-[#372a63] border border-[#d8c29d]/40 rounded-lg hover:border-[#f3c4fb] hover:bg-[#483777] transition cursor-pointer"
                  >
                    🫐 Moonberries
                  </button>
                  <button 
                    onClick={() => triggerFairyAction('🎶 +20 XP', -10, 20)}
                    className="flex-1 py-1 text-xs font-serif bg-[#372a63] border border-[#d8c29d]/40 rounded-lg hover:border-[#f3c4fb] hover:bg-[#483777] transition cursor-pointer"
                  >
                    🎶 Sing Song
                  </button>
                  <button 
                    onClick={() => triggerFairyAction('✨ +30 XP', -20, 30)}
                    className="flex-1 py-1 text-xs font-serif bg-[#372a63] border border-[#d8c29d]/40 rounded-lg hover:border-[#f3c4fb] hover:bg-[#483777] transition cursor-pointer"
                  >
                    🪄 Cast Spell
                  </button>
                </div>
              </section>

              <section className="border-2 border-[#d8c29d] bg-[#f6ede0] rounded-2xl p-5 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm">📜</span>
                    <h3 className="text-base font-serif font-bold text-[#33261d]">Latest Announcement</h3>
                  </div>
                  <p className="text-xs text-[#5a483c] leading-relaxed font-serif">
                    Welcome to the launch of <strong>DreamyToo</strong>! Layout updates, Ruwa system notes, and story archives will be updated regularly.
                  </p>
                </div>
                <span className="text-[10px] text-[#8c6d58] font-serif italic text-right mt-2">Posted: Today</span>
              </section>
            </div>
          </div>
        )}

        {/* About View */}
        {activeTab === 'about' && (
          <section className="border-2 border-[#d8c29d] bg-[#f6ede0] rounded-2xl p-6 md:p-8 shadow-xl flex flex-col gap-6 text-[#33261d]">
            <div className="border-b-2 border-[#d8c29d]/60 pb-4">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2a204a] flex items-center gap-2">
                <span>📜</span> About YumuDT
              </h2>
              <p className="text-xs md:text-sm text-[#8c6d58] font-serif italic mt-1">
                Systems Architect, Fiction Author, & Interactive Worldbuilder
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-serif">
              <div className="bg-[#eddcc4] p-4 rounded-xl border border-[#d8c29d]/60 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#2a204a] mb-2 flex items-center gap-1.5">
                    <span>⚡</span> Technical Focus
                  </h3>
                  <p className="text-xs text-[#5a483c] leading-relaxed">
                    Engineering Multi-Agent AI orchestration hubs, long-term memory persistence, edge AI, and rapid prototyping with React & Tailwind CSS.
                  </p>
                </div>
              </div>

              <div className="bg-[#eddcc4] p-4 rounded-xl border border-[#d8c29d]/60 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#2a204a] mb-2 flex items-center gap-1.5">
                    <span>📚</span> Fiction Universe
                  </h3>
                  <p className="text-xs text-[#5a483c] leading-relaxed">
                    Author of <em>Trick or Truth: Elysian</em>, <em>The Circles of Wyrds</em>, and <em>A Tale That Never Known</em>.
                  </p>
                </div>
              </div>

              <div className="bg-[#eddcc4] p-4 rounded-xl border border-[#d8c29d]/60 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#2a204a] mb-2 flex items-center gap-1.5">
                    <span>🛠️</span> Platform Architecture
                  </h3>
                  <p className="text-xs text-[#5a483c] leading-relaxed">
                    Creator of Ruwa: a specialized workspace connecting novel architecture, lore tracking, and multi-model AI workflows.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#f0e3d2] p-5 rounded-xl border border-[#d8c29d]/80 font-serif leading-relaxed text-xs md:text-sm text-[#4a3b32]">
              <h3 className="font-bold text-base text-[#2a204a] mb-2">The DreamyToo Vision</h3>
              <p className="mb-3">
                DreamyToo serves as a cozy, starry refuge where creative technology meets high-fantasy aesthetic. It is both a showcase of ongoing software prototypes and an open library for fictional universes.
              </p>
              <p className="italic text-[#6b584c]">
                "Otherwise, I'm just a random passerby you may never notice in the sea of tech and the internet."
              </p>
            </div>
          </section>
        )}

        {/* Game View */}
        {activeTab === 'Game' && (
          <section className="border-2 border-[#d8c29d] bg-[#f6ede0] rounded-2xl p-6 md:p-8 shadow-xl flex flex-col gap-6 text-[#33261d]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-[#d8c29d]/60 pb-4 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2a204a] flex items-center gap-2">
                  <span>🎮</span> Find Me Game
                </h2>
                <p className="text-xs md:text-sm text-[#8c6d58] font-serif italic mt-1">
                  An interactive game entry by YumuDT
                </p>
              </div>

              <a 
                href="https://yumudt.itch.io/find-me-game" 
                target="_blank" 
                rel="noreferrer"
                className="px-4 py-2 bg-[#2a204a] text-[#f3c4fb] rounded-xl border border-[#d8c29d] text-xs font-serif font-bold hover:bg-[#372a63] transition shadow flex items-center gap-2"
              >
                <span>🚀 Play on itch.io</span>
              </a>
            </div>

            <div className="w-full bg-[#1a1438] rounded-xl border-2 border-[#d8c29d]/70 overflow-hidden shadow-inner flex flex-col items-center justify-center p-2 min-h-[500px]">
              <iframe 
                title="Find Me Game"
                src="https://itch.io/embed-upload/15989658?color=e53b44" 
                className="w-full h-[520px] rounded-lg border-0"
                allow="autoplay; fullscreen"
              ></iframe>
            </div>

            <p className="text-xs text-[#6b584c] font-serif italic text-center">
              ✦ Note: If the embedded player above is restricted by your browser settings, click the button top-right to play directly on itch.io! ✦
            </p>
          </section>
        )}

        {/* Placeholder Views for Other Tabs */}
        {(activeTab === 'Project' || activeTab === 'Others') && (
          <section className="border-2 border-[#d8c29d] bg-[#f6ede0] rounded-2xl p-8 shadow-xl text-center font-serif text-[#33261d]">
            <h2 className="text-2xl font-bold capitalize mb-2">{activeTab} Realm</h2>
            <p className="text-xs text-[#8c6d58] italic">This spellbook chapter is currently being written...</p>
          </section>
        )}
      </main>

      {/* 4. Bottom 4-Column Grid */}
      <footer className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 z-10">
        
        {/* Writing Card with Modal Trigger */}
        <div className="border-2 border-[#d8c29d] bg-[#f6ede0] rounded-xl p-4 min-h-40 flex flex-col justify-between shadow-md">
          <div>
            <h4 className="font-serif font-bold text-sm mb-1 text-[#33261d]">📖 Writing Log</h4>
            <p className="text-xs text-[#6b584c] font-serif italic line-clamp-3">
              "Trick or Truth: Elysian", "The Circles of Wyrds", and more...
            </p>
          </div>
          <button 
            onClick={() => setIsWritingModalOpen(true)}
            className="text-left text-xs text-[#483777] font-serif font-bold hover:underline cursor-pointer"
          >
            Read entries →
          </button>
        </div>

        <div className="border-2 border-[#d8c29d] bg-[#f6ede0] rounded-xl p-4 min-h-40 flex flex-col justify-between shadow-md">
          <h4 className="font-serif font-bold text-sm text-[#33261d]">🖼️ Gallery</h4>
          <div className="grid grid-cols-2 gap-1.5 my-1">
            <div className="h-12 bg-[#d8c29d]/40 rounded flex items-center justify-center text-xs">🌌</div>
            <div className="h-12 bg-[#d8c29d]/40 rounded flex items-center justify-center text-xs">🏰</div>
          </div>
          <span className="text-[10px] text-[#8c6d58] font-serif italic">2 photos preview</span>
        </div>

        <div className="border-2 border-[#d8c29d] bg-[#2a204a] text-[#f6ede0] rounded-xl p-4 min-h-40 flex flex-col justify-between shadow-md">
          <div>
            <h4 className="font-serif font-bold text-sm text-[#f3c4fb] mb-1">🎵 Ambient Track</h4>
            <p className="text-xs text-[#f6ede0]/70 font-serif">YumuDT main theme by ayumudt</p>
          </div>
          <button 
            onClick={toggleMusic}
            className="w-full py-1 text-xs font-serif bg-[#1a1438] border border-[#d8c29d]/40 rounded-md hover:border-[#f3c4fb] transition cursor-pointer"
          >
            {isPlayingMusic ? '⏸ Pause' : '▶ Play Music'}
          </button>
        </div>

        <div className="border-2 border-[#d8c29d] bg-[#f6ede0] rounded-xl p-4 min-h-40 flex flex-col justify-between shadow-md">
          <div>
            <h4 className="font-serif font-bold text-sm text-[#33261d] mb-1">💬 Guestbook</h4>
            <p className="text-xs text-[#6b584c] font-serif italic">
              "Love the starry aesthetic!"
            </p>
          </div>
          <button className="text-left text-xs text-[#483777] font-serif font-bold hover:underline cursor-pointer">
            Leave a note →
          </button>
        </div>

      </footer>
    </div>
  );
}