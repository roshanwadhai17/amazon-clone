// components/FightTimer.tsx
"use client";
import React from "react";
import { Kalam } from "next/font/google";

const kalam = Kalam({ subsets: ["latin"], weight: ["400", "700"] });

export default function FightTimer() {
  return (
    <nav className={`sticky top-0 z-50 w-full bg-[#cfb594]/95 backdrop-blur-md text-[#3a2a1e] px-4 py-3 flex justify-center items-center border-b border-[#3a2a1e]/20 shadow-sm ${kalam.className}`}>
      <div className="text-center max-w-4xl">
        <span className="font-bold text-[14px] md:text-[15.5px] leading-[24px] text-[#c0392b]">
          Solution : - To bas bakin sobt jasa wagto tasach tuja sobt wagla asta tr kadich ha problem nasta jhala... Kahi Garaj Nohti Special Treatment chi
        </span>
      </div>
    </nav>
  );
}