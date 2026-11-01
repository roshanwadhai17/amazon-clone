// components/GlobalAudio.tsx
"use client";
import React, { useEffect, useRef } from "react";

export default function GlobalAudio() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleControl = (e: CustomEvent) => {
      if (!iframeRef.current?.contentWindow) return;
      if (e.detail === 'play') {
        iframeRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      } else if (e.detail === 'pause') {
        iframeRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      }
    };

    window.addEventListener('control-audio' as any, handleControl);
    return () => window.removeEventListener('control-audio' as any, handleControl);
  }, []);

  return (
    <iframe 
      ref={iframeRef}
      width="1" height="1" 
      src="https://www.youtube.com/embed/nzelzk2sVH8?enablejsapi=1&start=6" 
      allow="autoplay" 
      className="fixed opacity-0 pointer-events-none z-[-999]"
      suppressHydrationWarning
    />
  );
}