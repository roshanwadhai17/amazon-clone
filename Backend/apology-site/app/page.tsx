// app/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Headphones, Gift, AlertCircle, Info, Lock } from "lucide-react";
import FightTimer from "../components/FightTimer";
import { useRouter } from "next/navigation";
import { Kalam, Caveat } from "next/font/google";

const kalam = Kalam({ subsets: ["latin"], weight: ["400", "700"] });
const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });

export default function Page1() {
  const router = useRouter();
  const [isLocked, setIsLocked] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('control-audio', { detail: 'pause' }));
    window.dispatchEvent(new CustomEvent('sync-audio-ui', { detail: 'pause' }));
  }, []);

  const deskStyle = { background: 'repeating-linear-gradient(90deg, rgba(0,0,0,.035) 0 2px, transparent 2px 9px), #cfb594' };
  
  const paperStyle = {
    backgroundColor: '#fffaf0',
    backgroundImage: 'linear-gradient(90deg, transparent 34px, rgba(192,57,43,.45) 34px, rgba(192,57,43,.45) 36px, transparent 36px)',
    boxShadow: '0 2px 3px rgba(0,0,0,.2), 0 12px 28px rgba(0,0,0,.25)',
  };
  
  const linesStyle = {
    lineHeight: '28px',
    paddingLeft: '48px', paddingRight: '24px', paddingTop: '32px', paddingBottom: '48px',
  };
  
  const textClass = "font-bold text-[16px] text-[#1f3a6e] indent-0 mb-[20px] leading-[28px]";

  const handleUnlock = () => {
    if (password === "DipuDidi") {
      setIsLocked(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleStart = () => {
    window.dispatchEvent(new CustomEvent('control-audio', { detail: 'play' }));
    window.dispatchEvent(new CustomEvent('sync-audio-ui', { detail: 'play' }));
    router.push('/page-4');
  };

  // PASSWORD SCREEN
  if (isLocked) {
    return (
      <div className={`min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 ${kalam.className}`}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#cfb594] p-8 rounded-2xl max-w-sm w-full shadow-2xl border-4 border-[#3a2a1e] flex flex-col items-center"
        >
          <div className="w-16 h-16 bg-[#3a2a1e] rounded-full flex items-center justify-center mb-6">
            <Lock className="w-8 h-8 text-[#cfb594]" />
          </div>
          <h2 className={`${caveat.className} text-3xl font-bold text-[#3a2a1e] mb-2`}>Top Secret Letter</h2>
          <p className="text-[#3a2a1e] text-center font-bold text-sm mb-6">Enter the password to unlock.</p>
          
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
            placeholder="Password..."
            className={`w-full p-3 rounded-lg border-2 mb-4 bg-[#fffaf0] text-[#3a2a1e] font-bold focus:outline-none ${error ? 'border-red-600 animate-pulse' : 'border-[#3a2a1e]'}`}
          />
          
          <button 
            onClick={handleUnlock} 
            className="w-full py-3 bg-[#3a2a1e] hover:bg-[#1f3a6e] text-[#fffaf0] font-bold rounded-lg transition-all shadow-lg"
          >
            Unlock
          </button>
        </motion.div>
      </div>
    );
  }

  // LETTER SCREEN
  return (
    <div className={`min-h-screen flex flex-col text-[#1f3a6e] ${kalam.className}`} style={deskStyle}>
      <FightTimer />

      <main className="flex-1 flex justify-center items-center py-12 px-4 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-4xl rounded-sm relative z-10 mb-20"
          style={paperStyle}
        >
          <div style={linesStyle}>
            
            <h1 className={`${caveat.className} text-[2.5rem] font-bold mb-[32px] text-[#3a2a1e] text-center leading-tight`}>
              Apology Letter for My Offended Friend 🫩❤️
            </h1>

            <div className="bg-[#fff1a0]/70 p-4 border border-[#e6d990] mb-[24px] rounded-lg flex items-start gap-4 shadow-sm">
              <Headphones className="w-6 h-6 text-red-600 shrink-0 mt-1" />
              <p className="font-bold text-[15.5px] text-red-600 leading-[24px] m-0">
                Note: Use headphones for the best experience! The background song later in this letter beautifully represents the bond between a brother and sister.
              </p>
            </div>

            <div className="bg-red-50 p-4 border border-red-200 mb-[32px] rounded-lg flex items-start gap-4 shadow-sm">
              <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-1" />
              <div className="flex flex-col gap-1">
                <p className="font-bold text-[16px] text-red-600 mb-2">⚠️ Important Instructions:</p>
                <ul className="list-disc pl-5 font-bold text-[#1f3a6e] text-[15px] space-y-1">
                  <li>Every option needs to be ticked.</li>
                  <li>Every text field needs to be filled in.</li>
                  <li>Please answer all the questions honestly and straightforwardly.</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-2 mt-8">
              <Info className="w-5 h-5 text-indigo-600" />
              <h2 className="font-bold text-xl text-indigo-800">A Little Disclaimer:</h2>
            </div>
            <p className={textClass}>
              What you're about to read is only <span className="text-red-600 text-xl mx-1">25%</span> of the complete letter I've written for you.
            </p>
            <p className={textClass}>
              I've written the entire story, but I'll share the remaining 75% with you another time. The remaining part contains our story, while this 25% is all about Tillu. 😂
            </p>

            <div className="flex items-center gap-2 mb-2 mt-8">
              <Gift className="w-5 h-5 text-indigo-600" />
              <h2 className="font-bold text-xl text-indigo-800">What's Coming Next?</h2>
            </div>
            <p className="font-bold text-[16px] text-[#1f3a6e] mb-2">The complete letter will include:</p>
            <ul className="list-disc pl-8 font-bold text-[#1f3a6e] text-[15.5px] space-y-1 mb-6">
              <li>Comedy and funny videos</li>
              <li>Photos and memories</li>
              <li>AI-generated drama</li>
              <li>Reels and memes</li>
              <li>Gifts and a few surprises</li>
            </ul>
            <p className={textClass}>
              I've genuinely tried to make this experience fun, emotional, and interesting.
            </p>
            <p className={textClass}>
              I've explained my entire side of the story and included a few questions. All I ask is that you answer them honestly and directly so that we can clear up any misunderstandings once and for all.
            </p>

            <div className="my-[48px] border-y-2 border-dashed border-[#1f3a6e]/20 py-6 text-center">
              <p className={`${caveat.className} text-[28px] text-[#3a2a1e] leading-[36px]`}>
                "I always wanted to be the best temporary person in everyone's life, but I'm honestly not liking the way things are ending with you. 🥲"
              </p>
            </div>

            <p className="font-bold text-lg mb-[16px] text-[#1f3a6e] text-center">
              I don't want to leave things this way, with misunderstandings and unanswered questions.
            </p>

            <div className="text-right mt-[64px] mb-4">
              <p className={`${caveat.className} text-[40px] font-bold text-[#3a2a1e] leading-[24px]`}>Roshan ❤️</p>
            </div>

          </div>
        </motion.div>
      </main>

      <div className="fixed bottom-0 left-0 w-full bg-[#cfb594]/90 backdrop-blur-md border-t border-[#3a2a1e]/20 p-3 z-40 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="max-w-5xl mx-auto flex items-center justify-end font-sans">
          <button 
            onClick={handleStart}
            className="flex items-center space-x-2 px-8 py-3 bg-[#1f3a6e] text-[#fffaf0] hover:bg-[#3a2a1e] rounded-full font-bold transition-all text-sm shadow-xl"
          >
            <span>Proceed to Chapter</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}