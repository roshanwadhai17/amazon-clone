// components/ClickTracker.tsx
"use client";
import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { usePathname } from "next/navigation";

export default function ClickTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const handleClick = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const elementTag = target.tagName;
      const elementText = target.innerText?.substring(0, 50) || target.id || "Icon/Empty";

      // Save click to Supabase silently
      await supabase.from('dipali_clicks').insert([
        { element_tag: elementTag, element_text: elementText, page_url: pathname }
      ]);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [pathname]);

  return null;
}