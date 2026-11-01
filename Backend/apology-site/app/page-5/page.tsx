// app/page-5/page.tsx
"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import FightTimer from "../../components/FightTimer";
import QuestionCard from "../../components/QuestionCard";
import { useRouter } from "next/navigation";
import { Kalam, Caveat } from "next/font/google";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const kalam = Kalam({ subsets: ["latin"], weight: ["400", "700"] });
const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });

export default function Page5() {
  const router = useRouter();
  const ytPlayerRef = useRef<HTMLIFrameElement>(null);
  const [destroyVideo, setDestroyVideo] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const { width, height } = useWindowSize();
  
  // TRACKER FOR 1 QUESTION
  const [questionStatus, setQuestionStatus] = useState<Record<string, boolean>>({});
  const TOTAL_QUESTIONS = 1;

  useEffect(() => {
    const handleStatus = (e: any) => {
      setQuestionStatus(prev => ({ ...prev, [e.detail.id]: e.detail.isComplete }));
    };
    window.addEventListener('question-status', handleStatus);
    return () => window.removeEventListener('question-status', handleStatus);
  }, []);

  const navigateSafely = (path: string) => {
    if (ytPlayerRef.current?.contentWindow) {
      ytPlayerRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
    setDestroyVideo(true);
    router.push(path);
  };

  const handleFinalSubmit = () => {
    const completedCount = Object.values(questionStatus).filter(status => status === true).length;
    
    if (completedCount < TOTAL_QUESTIONS) {
      alert("⚠️ Please answer the final question before submitting! 🙂");
      return;
    }
    
    if (ytPlayerRef.current?.contentWindow) {
      ytPlayerRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
    setIsFinished(true);
  };

  useEffect(() => {
    return () => {
      if (ytPlayerRef.current?.contentWindow) {
        ytPlayerRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      }
    };
  }, []);

  const deskStyle = { background: 'repeating-linear-gradient(90deg, rgba(0,0,0,.035) 0 2px, transparent 2px 9px), #cfb594' };
  const paperStyle = {
    backgroundColor: '#fffaf0',
    backgroundImage: 'linear-gradient(90deg, transparent 34px, rgba(192,57,43,.45) 34px, rgba(192,57,43,.45) 36px, transparent 36px)',
    boxShadow: '0 2px 3px rgba(0,0,0,.2), 0 12px 28px rgba(0,0,0,.25)',
  };
  const linesStyle = {
    backgroundImage: 'repeating-linear-gradient(transparent 0 23px, rgba(80,120,190,.26) 23px 24px)',
    backgroundAttachment: 'local', backgroundPosition: '0 -2px', lineHeight: '24px',
    paddingLeft: '48px', paddingRight: '24px', paddingTop: '24px', paddingBottom: '48px',
  };
  const textClass = "font-bold text-[15.5px] text-[#1f3a6e] indent-0 mb-[24px] leading-[24px]";

  if (isFinished) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white ${kalam.className}`}>
        <Confetti width={width} height={height} recycle={false} numberOfPieces={800} gravity={0.15} />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-slate-900 p-10 rounded-2xl border border-slate-700 shadow-2xl max-w-md z-10"
        >
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className={`${caveat.className} text-4xl font-bold mb-4`}>Response Submitted!</h1>
          <p className="text-slate-400 font-bold">Thank you for taking the time to read everything, Didi. I have received your answers.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col text-[#1f3a6e] ${kalam.className}`} style={deskStyle}>
      <FightTimer />

      <main className="flex-1 flex justify-center items-start py-12 px-4 md:px-8 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-4xl rounded-sm relative z-10 mb-24"
          style={paperStyle}
        >
          <div style={linesStyle}>
            
            <h1 className={`${caveat.className} text-4xl font-bold mb-[48px] text-[#3a2a1e] leading-[24px] pt-1`}>
              Diwali Gift 🎇
            </h1>

            {!destroyVideo && (
              <div className="my-[48px] flex justify-center">
                <iframe 
                  ref={ytPlayerRef}
                  width="100%" 
                  height="450" 
                  src="https://www.youtube.com/embed/xeE2SXz_gbc?enablejsapi=1&autoplay=1&controls=0&playsinline=1" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  className="rounded-xl shadow-lg border border-[#1f3a6e]/20 max-w-full"
                  suppressHydrationWarning
                ></iframe>
              </div>
            )}

            <p className={textClass}>Didi tula mi khara yevda vait wato ki mi tula ek sada Bhau Bijela Gift pn nahi deu shakat. Majhi tr kahi chuk pn nahi yaar, Bas tula warn karat hoto… Disat hota Future mala samjat hota he sarv samor tumchya dogana tras denar. </p>
            <p className={textClass}>Bolte aadhi dila asta tr ghetla asta… teva tr swata magaychi Gift de mhnun ata khara yevda Problem ahe maja. Mi tr Raksha Bandhan la pn Denar hoto but nahi deu shaklo reason tula pn mahit ahe.</p>
            <p className={textClass}>Bhai 2 months Adhi Chori jhali majya ghari… Still Jevda Gold chori Gela tyacha 2x Aai la prt karun dila…Purna Gharala Metal Doors ani CCTV Lavle,  Ghari yevda Solar wagera ch kaam kela, Swatachya Room sathi AC pn ghetla, Ani Bahini la Bhau beej la Gadi pn gheun det ahe.</p>
            <p className={textClass}>Ani tula khara wata ki tula ek chotasa Gift Dilyane Maja Kahi kami Honar… bas thoda Guilt kami jhala asta…Khup dilay Deva ni ani detach rahanar.</p>

            <p className={`${textClass} font-extrabold text-[#c0392b] bg-[#fff1a0] p-4 shadow-sm border border-[#e6d990] my-[32px]`}>
              Aai Bolte ki Bahin hi Laxmi sarkhi aste aaj jevda denar udya 100x waps bhetnar, mi pn hech manto, khup lalchi ahe mi. Khup pure Intent ni alo hoto Didi…Mala Mahit ahe tu kashi ahes… You are the most kind hearted Soul I have ever met in my life. You have a Golden heart, Didi, and that's something I will always admire about you.
            </p>

            <QuestionCard 
              id="final_answer" 
              question="Yevd Kharab Treat nako karu Didi ekdam stranger sarkha, Yevda vait nahi mi, nehmi tuja sathi ubha hoto in all ur ups and downs, Bas Kaljhi keli ahe tujhi..." 
              options={["Nahi Karnar", "tu hech Deserve karto"]} 
            />

            <div className="my-[48px] bg-gradient-to-r from-orange-100 via-amber-50 to-orange-100 p-6 rounded-2xl border border-orange-300 shadow-md">
              <h2 className={`${caveat.className} text-3xl font-bold text-orange-600 text-center mb-4`}>
                Happy Diwali ! 🪔❤️
              </h2>
              <p className="font-bold text-[15.5px] text-[#1f3a6e] text-center leading-[28px]">
                May Goddess Lakshmi bless you and your family with endless happiness, good health, prosperity, and success. May all your dreams come true, and may you always have a thousand reasons to smile.
              </p>
              <p className="font-bold text-[15.5px] text-[#1f3a6e] text-center leading-[28px] mt-4">
                Stay blessed, keep shining, and never lose your beautiful, kind-hearted soul.<br/>
                You deserve all the happiness in the world. ❤️
              </p>
              <p className={`${caveat.className} text-2xl text-orange-600 text-center font-bold mt-4`}>
                Stay blessed, keep smiling, and keep shining.<br/> Happy Diwali, Dipu Didi! 🙏
              </p>
            </div>

            
            
            <div className="mt-[48px] text-center indent-0">
              <p className={`${caveat.className} text-3xl text-right mb-[24px] text-[#3a2a1e] font-bold leading-[24px]`}>
                — Roshan
              </p>
            </div>

          </div>
        </motion.div>
      </main>
      
      <div className="fixed bottom-0 left-0 w-full bg-[#cfb594]/90 backdrop-blur-md border-t border-[#3a2a1e]/20 p-3 z-40 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="max-w-5xl mx-auto flex items-center justify-between font-sans">
          
          <button 
            onClick={() => navigateSafely('/page-4')}
            className="flex items-center space-x-2 px-3 py-1.5 text-[#3a2a1e] border border-transparent hover:border-[#3a2a1e] rounded-full transition-all text-sm font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden md:inline">Previous</span>
          </button>

          <button 
            onClick={handleFinalSubmit}
            className="flex items-center space-x-2 px-8 py-3 bg-[#1f3a6e] text-[#fffaf0] hover:bg-[#3a2a1e] rounded-full font-bold transition-all text-sm shadow-xl animate-pulse"
          >
            <span>Finish & Submit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
        </div>
      </div>
    </div>
  );
}