// components/QuestionCard.tsx
"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

interface QuestionCardProps {
  id: string;
  question: string;
  options?: string[];
  hideInput?: boolean;
}

export default function QuestionCard({ id, question, options = [], hideInput = false }: QuestionCardProps) {
  const [selectedChip, setSelectedChip] = useState<string | null>(null);
  const [answer, setAnswer] = useState("");
  
  // Track if this specific question is fully answered
  const isComplete = 
    (options && options.length > 0 ? selectedChip !== null : true) && 
    (!hideInput ? answer.trim().length > 0 : true);

  // Slight delay ensures the parent page is fully loaded and listening before sending the status
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('question-status', { 
        detail: { id, isComplete } 
      }));
    }, 50);
    return () => clearTimeout(timer);
  }, [id, isComplete]);

  // Fetch existing data on mount
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('dipali_answers').select('*').eq('question_id', id).single();
      if (data) {
        if (data.selected_chip) setSelectedChip(data.selected_chip);
        if (data.typed_answer) setAnswer(data.typed_answer);
      }
    };
    fetchData();
  }, [id]);

  // Silent Auto-Save Logic (Triggers 1 second after she stops typing/clicking)
  useEffect(() => {
    if (!selectedChip && !answer) return; 
    
    const timer = setTimeout(async () => {
      await supabase.from('dipali_answers').upsert({
        question_id: id,
        selected_chip: selectedChip,
        typed_answer: answer,
        updated_at: new Date().toISOString()
      }, { onConflict: 'question_id' });
    }, 1000);

    return () => clearTimeout(timer);
  }, [answer, selectedChip, id]);

  return (
    <div 
      className={`my-[24px] p-4 bg-white/40 border-[1.5px] transition-colors relative z-10 ${isComplete ? 'border-[#1f8a5b]' : 'border-[#1f3a6e]'}`}
      style={{ borderRadius: '255px 12px 225px 12px/12px 225px 12px 255px' }}
    >
      <div className="flex justify-between items-start mb-3">
        <b className="block font-bold text-[15.5px] leading-[24px] indent-0 text-[#1f3a6e] whitespace-pre-wrap flex-1">
          {question}
          {!isComplete && <span className="text-red-500 ml-1">*</span>}
        </b>
      </div>
      
      {options && options.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4 indent-0">
          {options.map((chip) => (
            <button
              key={chip}
              onClick={() => setSelectedChip(chip)}
              className={`px-4 py-1 rounded-full border-[1.5px] font-bold text-sm transition-colors ${
                selectedChip === chip 
                  ? 'bg-[#1f3a6e] text-[#fffaf0] border-[#1f3a6e]' 
                  : 'bg-transparent text-[#1f3a6e] border-[#1f3a6e]'
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {!hideInput && (
        <textarea 
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Your answer, straight please 🙂"
          className="w-full min-h-[48px] p-2 rounded-lg border border-dashed border-[#1f3a6e] bg-transparent text-[#1f3a6e] placeholder-[#1f3a6e]/50 focus:outline-none focus:ring-1 focus:ring-[#1f3a6e] resize-y indent-0 text-[15px]"
          style={{ lineHeight: '24px' }}
        />
      )}
    </div>
  );
}