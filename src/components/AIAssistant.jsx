import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, AlertCircle } from 'lucide-react';
import { menuItems } from '../data/menu';

// Safety rules — topics the assistant refuses
const REFUSED_TOPICS = [
  /diabet/i, /cancer/i, /disease/i, /diagnos/i, /treat/i,
  /medic/i, /prescri/i, /cure/i, /symptom/i, /lose weight/i,
  /weight loss/i, /calorie deficit/i, /eating disorder/i,
];

const SAFETY_RESPONSE =
  "I can help you explore the Café Nourish menu, but I'm not able to provide medical or dietary advice for health conditions. Please speak to a qualified healthcare professional for personal guidance. I'm happy to help you find something on our menu based on your general preferences!";

function isSafeQuery(text) {
  return !REFUSED_TOPICS.some(re => re.test(text));
}

// Very simple local matching — maps keywords to menu tags/categories
function localRecommend(userText) {
  const t = userText.toLowerCase();
  let filtered = [...menuItems];

  if (/breakfast/i.test(t)) filtered = filtered.filter(i => i.category === 'Breakfast');
  else if (/lunch/i.test(t)) filtered = filtered.filter(i => i.category === 'Lunch');
  else if (/snack/i.test(t)) filtered = filtered.filter(i => i.category === 'Snacks');
  else if (/drink|tea|coffee|chai/i.test(t)) filtered = filtered.filter(i => i.category === 'Drinks');

  if (/light/i.test(t)) filtered = filtered.filter(i => i.tags.includes('light'));
  if (/fill|heavy|substantial/i.test(t)) filtered = filtered.filter(i => i.tags.includes('filling'));
  if (/budget|cheap|affordable|inexpensive/i.test(t)) filtered = filtered.filter(i => i.tags.includes('budget-friendly'));
  if (/sweet|sugar/i.test(t)) filtered = filtered.filter(i => i.tags.includes('less-sweet'));
  if (/vegetable|veggie|veg/i.test(t)) filtered = filtered.filter(i => i.tags.includes('more-vegetables'));
  if (/plant|vegan/i.test(t)) filtered = filtered.filter(i => i.tags.includes('plant-forward'));
  if (/protein/i.test(t)) filtered = filtered.filter(i => i.tags.includes('protein'));
  if (/fresh/i.test(t)) filtered = filtered.filter(i => i.tags.includes('fresh'));

  if (filtered.length === 0) filtered = menuItems.slice(0, 3);
  return filtered.slice(0, 3);
}

const INITIAL_MESSAGES = [
  {
    role: 'assistant',
    text: "Hi! I'm the Café Nourish assistant. Tell me what you're looking for — a filling lunch, a light snack, something budget-friendly — and I'll explore the menu for you.",
  },
];

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    setInput('');

    const userMsg = { role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    setTimeout(() => {
      if (!isSafeQuery(text)) {
        setMessages(prev => [...prev, { role: 'assistant', text: SAFETY_RESPONSE, isSafety: true }]);
      } else {
        const recs = localRecommend(text);
        const recText = recs
          .map(i => `• **${i.name}** — ${i.shortDesc} — ₹${i.price}`)
          .join('\n');
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            text: `Here are a few options from our menu:\n\n${recText}\n\nVisit the Menu page for full details on any of these.`,
            recs,
          },
        ]);
      }
      setLoading(false);
    }, 900);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function renderText(text) {
    // Render basic markdown bold
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
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#24352A] text-white px-4 py-3 rounded-full shadow-xl hover:bg-[#1a2820] hover:shadow-2xl transition-all duration-200 hover:-translate-y-0.5 ${open ? 'hidden' : 'flex'}`}
        aria-label="Open AI assistant"
      >
        <Bot size={18} />
        <span className="text-sm font-medium">Ask Café Nourish</span>
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#EFE9DD]"
          style={{ maxHeight: '520px' }}>
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-[#24352A] text-white">
            <div className="flex items-center gap-2">
              <Bot size={18} />
              <div>
                <p className="text-sm font-semibold">Café Nourish AI</p>
                <p className="text-xs text-white/60">Menu suggestions only</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Safety disclaimer */}
          <div className="bg-[#fef9f0] border-b border-[#EFE9DD] px-4 py-2 flex gap-2 items-start">
            <AlertCircle size={13} className="text-[#C87941] mt-0.5 shrink-0" />
            <p className="text-xs text-[#6F776F] leading-relaxed">
              Not medical advice. For health conditions, consult a professional.
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ minHeight: 0 }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                    msg.role === 'user'
                      ? 'bg-[#24352A] text-white rounded-br-sm'
                      : msg.isSafety
                      ? 'bg-[#fef9f0] border border-[#C87941]/20 text-[#263029] rounded-bl-sm'
                      : 'bg-[#F8F6F1] text-[#263029] rounded-bl-sm'
                  }`}
                >
                  {renderText(msg.text)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#F8F6F1] rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-[#8FA58C] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#8FA58C] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#8FA58C] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-[#EFE9DD] flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. Something light for lunch…"
              className="flex-1 text-sm px-4 py-2.5 rounded-full bg-[#F8F6F1] text-[#263029] placeholder-[#6F776F] border border-transparent focus:outline-none focus:border-[#8FA58C] transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-full bg-[#24352A] text-white disabled:opacity-40 hover:bg-[#1a2820] transition-colors"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
