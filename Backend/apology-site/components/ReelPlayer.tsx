// components/ReelPlayer.tsx
"use client";
import React, { useState } from "react";
import { Play } from "lucide-react";

export default function ReelPlayer({ src }: { src: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="my-[32px] flex justify-center relative w-full max-w-[320px] mx-auto">
      {!isPlaying ? (
        <div 
          onClick={() => setIsPlaying(true)}
          className="w-full h-[540px] bg-slate-100 border-2 border-dashed border-[#1f3a6e]/40 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors shadow-lg"
        >
          <Play className="w-12 h-12 text-[#1f3a6e] mb-4 opacity-70" />
          <span className="font-bold text-[#1f3a6e] text-center px-4 leading-[24px]">
            Click to Play Reel
          </span>
        </div>
      ) : (
        <iframe 
          src={`${src}embed`} 
          width="320" 
          height="540" 
          frameBorder="0" 
          scrolling="no" 
          allowTransparency={true}
          className="rounded-xl shadow-lg border border-[#1f3a6e]/20 bg-white"
          suppressHydrationWarning
        />
      )}
    </div>
  );
}