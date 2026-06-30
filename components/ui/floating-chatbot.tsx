"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, Bot, Flame } from "lucide-react";
import { useStorefront } from "@/context/storefront-context";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
};

const SUGGESTIONS = [
  "أيه أحسن عرض عندكم؟",
  "فروعكم وين؟",
  "عندكم توصيل؟",
];

const BOT_RESPONSES: Record<string, string> = {
  "أيه أحسن عرض عندكم؟": "أكيد! جرب شاورما عربي دبل، مكسر الدنيا عندنا! 🍔🔥",
  "فروعكم وين؟": "احنا في مصر الجديدة، مدينة نصر، والتجمع الخامس! وتقدر تطلب ديليفري لأي مكان. 📍",
  "عندكم توصيل؟": "أكيد يافندم، التوصيل شغال لكل مناطق القاهرة والجيزة في أسرع وقت. 🛵💨",
  default: "أهلاً بك في بيج شاورما! معاك كابتن شاورما، أقدر أساعدك إزاي؟ 😎",
};

export default function FloatingChatbot() {
  const { chatbotOpen, setChatbotOpen } = useStorefront();
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "bot", text: BOT_RESPONSES.default },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatbotOpen]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate bot reply
    setTimeout(() => {
      const response = BOT_RESPONSES[text] || "معلش مفهمتش قصدك، ممكن توضح أكتر؟ 😅";
      const botMsg: Message = { id: (Date.now() + 1).toString(), sender: "bot", text: response };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <>
      <div className="fixed bottom-40 left-5 z-40 md:bottom-24 md:left-5">
        <button
          type="button"
          onClick={() => setChatbotOpen(true)}
          className="grid h-14 w-14 place-items-center rounded-bl-[16px] rounded-tr-[16px] border-2 border-white bg-[#E11D48] text-white shadow-[4px_4px_0_#FFB800] transition hover:-translate-y-1 hover:shadow-[6px_6px_0_#FFB800] active:scale-95"
          aria-label="مساعدة"
        >
          <Flame size={28} className="animate-pulse" />
        </button>
      </div>

      <AnimatePresence>
        {chatbotOpen && (
          <motion.div
            className="fixed inset-0 z-[100] grid place-items-center bg-black/60 p-4 backdrop-blur-sm sm:items-end sm:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.section
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 22 }}
              className="flex w-full max-w-sm flex-col overflow-hidden rounded-bl-[40px] rounded-tr-[40px] border-[3px] border-[#FFB800] bg-[#111] shadow-[10px_10px_0_#E11D48] sm:mb-24 sm:ml-5 sm:h-[500px]"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 bg-[#191919] p-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-[#E11D48]">
                    <Flame size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="font-black text-white">كابتن شاورما</h2>
                    <p className="text-xs font-bold text-[#25D366]">متاح الآن 🟢</p>
                  </div>
                </div>
                <button
                  onClick={() => setChatbotOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition hover:bg-[#E11D48]"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-bl-[18px] rounded-tr-[18px] px-4 py-2 text-sm font-bold leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-[#FFB800] text-black"
                          : "border border-white/10 bg-white/5 text-white"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions */}
              <div className="flex gap-2 overflow-x-auto border-t border-white/10 bg-[#191919] p-3 pb-2 scrollbar-hide">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="shrink-0 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-bold text-white transition hover:border-[#FFB800] hover:text-[#FFB800]"
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <div className="bg-[#191919] p-3 pt-0">
                <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black p-1 pl-3 pr-1">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                    placeholder="اكتب رسالتك هنا..."
                    className="flex-1 bg-transparent px-3 py-2 text-sm font-bold text-white outline-none placeholder:text-white/40"
                  />
                  <button
                    onClick={() => handleSend(input)}
                    disabled={!input.trim()}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#FFB800] text-black transition hover:scale-105 disabled:opacity-50"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
