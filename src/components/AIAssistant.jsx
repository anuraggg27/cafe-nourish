import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, AlertCircle } from 'lucide-react';
// fix #3 — use the shared service so safety logic is identical to MealFinder
import { localRecommend } from '../services/localRecommend';

// Expanded safety patterns — matches localRecommend.js exactly
const REFUSED_TOPICS = [
  /diabet/i, /cancer/i, /disease/i, /diagnos/i, /treat/i,
  /medic/i, /prescri/i, /cure/i, /symptom/i, /lose weight/i,
  /weight.?loss/i, /calorie.?deficit/i, /eating.?disorder/i,
  /blood.?sugar/i, /cholesterol/i, /blood.?pressure/i,
  /heart.?condition/i, /allerg/i, /intoleran/i,
  /celiac/i, /ibs/i, /crohn/i, /anemia/i, /thyroid/i, /pcos/i, /kidney/i,
];

const SAFETY_RESPONSE =
  "I can help you explore the Café Nourish menu, but I'm not able to provide medical or dietary advice for health conditions. Please speak to a qualified healthcare professional for personal guidance. I'm happy to help you find something on our menu based on your general preferences!";

function isSafeQuery(text) {
  return !REFUSED_TOPICS.some(re => re.test(text));
}

// Parse free text into preference params for the shared localRecommend service
function parseQueryToParams(text) {
  const t = text.toLowerCase();
  let mealTime = 'any', preference = 'any', priority = 'any';

  if (/breakfast/i.test(t))              mealTime = 'breakfast';
  else if (/lunch/i.test(t))             mealTime = 'lunch';
  else if (/snack/i.test(t))             mealTime = 'snack';
  else if (/drink|tea|coffee|chai/i.test(t)) mealTime = 'drink';

  if (/plant.?forward|vegan/i.test(t))   preference = 'plant-forward';
  else if (/vegetarian|veg\b/i.test(t))  preference = 'vegetarian';

  if (/light/i.test(t))                  priority = 'light';
  else if (/fill|heavy/i.test(t))        priority = 'filling';
  else if (/budget|cheap|affordable/i.test(t)) priority = 'budget-friendly';
  else if (/less.?sweet|no.?sugar/i.test(t))   priority = 'less-sweet';
  else if (/vegetable|veggie/i.test(t))  priority = 'more-vegetables';
  else if (/protein/i.test(t))           priority = 'protein';
  else if (/fresh/i.test(t))             priority = 'fresh';

  // Extract budget if mentioned
  const budgetMatch = text.match(/₹?\s*(\d+)/);
  const budget = budgetMatch ? Math.min(parseInt(budgetMatch[1], 10), 250) : 250;

  return { mealTime, preference, priority, budget, freeText: null };
}

const INITIAL_MESSAGES = [
  {
    role: 'assistant',
    text: "Hi! I'm the Café Nourish assistant. Tell me what you're looking for — a filling lunch, a light snack, something budget-friendly — and I'll explore the menu for you.",
  },
];

export default function AIAssistant() {
  const [open,     setOpen]     = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input,    setInput]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text }]);
    setLoading(true);

    setTimeout(() => {
      if (!isSafeQuery(text)) {
        setMessages(prev => [...prev, { role: 'assistant', text: SAFETY_RESPONSE, isSafety: true }]);
      } else {
        const params = parseQueryToParams(text);
        const result = localRecommend(params);
        const recs   = result.items.slice(0, 3);

        if (recs.length === 0) {
          setMessages(prev => [...prev, {
            role: 'assistant',
            text: "I couldn't find anything matching that exactly — try the AI Meal Finder for more detailed options.",
          }]);
        } else {
          const recText = recs
            .map(i => `• **${i.name}** — ${i.shortDesc} — ₹${i.price}`)
            .join('\n');
          setMessages(prev => [...prev, {
            role: 'assistant',
            text: `Here are a few options from our menu:\n\n${recText}\n\nVisit the Menu page for full details on any of these.`,
            recs,
          }]);
        }
      }
      setLoading(false);
    }, 700);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  }

  function renderText(text) {
    return text.split('\n').map((line, i) => (
      <p key={i} className="text-sm leading-relaxed mb-1 last:mb-0">
        {line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
          j % 2 === 1 ? <strong key={j}>{part}</strong> : part
        )}
      </p>
    ));
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2
          bg-[#26382C] text-white px-4 py-3 rounded-full shadow-xl
          hover:bg-[#1c2a20] hover:shadow-2xl transition-all duration-200 hover:-translate-y-0.5
          ${open ? 'hidden' : 'flex'}`}
        aria-label="Open AI assistant"
      >
        <Bot size={18} />
        <span className="text-sm font-medium">Ask Café Nourish</span>
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)]
            bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#EDE6D8]"
          style={{ maxHeight: '520px' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-[#26382C] text-white">
            <div className="flex items-center gap-2">
              <Bot size={18} />
              <div>
                <p className="text-sm font-semibold">Café Nourish AI</p>
                <p className="text-xs text-white/60">Menu suggestions only</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)}
              className="text-white/60 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Safety disclaimer */}
          <div className="bg-[#fef9f0] border-b border-[#EDE6D8] px-4 py-2 flex gap-2 items-start">
            <AlertCircle size={13} className="text-[#C77A45] mt-0.5 shrink-0" />
            <p className="text-xs text-[#707870] leading-relaxed">
              Not medical advice. For health conditions, consult a professional.
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ minHeight: 0 }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                  msg.role === 'user'
                    ? 'bg-[#26382C] text-white rounded-br-sm'
                    : msg.isSafety
                    ? 'bg-[#fef9f0] border border-[#C77A45]/20 text-[#26302A] rounded-bl-sm'
                    : 'bg-[#F7F5EF] text-[#26302A] rounded-bl-sm'
                }`}>
                  {renderText(msg.text)}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#F7F5EF] rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1 items-center">
                    {[0, 150, 300].map(delay => (
                      <span key={delay}
                        className="w-1.5 h-1.5 bg-[#91A38E] rounded-full animate-bounce"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-[#EDE6D8] flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. Something light for lunch…"
              className="flex-1 text-sm px-4 py-2.5 rounded-full bg-[#F7F5EF] text-[#26302A]
                placeholder-[#707870] border border-transparent
                focus:outline-none focus:border-[#91A38E] transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-full bg-[#26382C] text-white
                disabled:opacity-40 hover:bg-[#1c2a20] transition-colors"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
