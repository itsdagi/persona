'use client';
import { useState, useRef, useEffect } from 'react';
import styles from './ChatBot.module.css';

const MOCK_ANSWERS = [
  { q: "pricing", a: "Our projects are uniquely tailored to each client's vision and requirements. For high-end design assets, our Marketplace has transparent pricing starting at $45." },
  { q: "services", a: "We specialize in futuristic, modern architectural design, 3D visualization, master planning, and interior architecture." },
  { q: "contact", a: "You can initiate an inquiry via our contact form in the 'Inquiry' section of the homepage, or via email at hello@personastudio.com." },
  { q: "location", a: "Our primary studio is based in Addis Ababa, but our architectural footprint is global, with projects spanning across Africa, the Middle East, and Europe." }
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ sender: 'bot', text: 'Hi! I am the Persona Studio AI. How can I assist you with our architectural services or marketplace today?' }]);
  const [inp, setInp] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, open]);

  const handleSend = () => {
    if(!inp.trim()) return;
    const userText = inp;
    setMsgs(prev => [...prev, { sender: 'user', text: userText }]);
    setInp('');
    
    setTimeout(() => {
      const lower = userText.toLowerCase();
      const matched = MOCK_ANSWERS.find(ans => lower.includes(ans.q));
      
      let botResponse = "Thanks for reaching out! Our team is currently reviewing your inquiry. Feel free to explore our Marketplace or Projects sections in the meantime.";
      if (matched) botResponse = matched.a;
      if (lower.includes("hello") || lower.includes("hi")) botResponse = "Hello! What can we build together today?";

      setMsgs(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 800);
  };

  return (
    <div className={styles.botContainer}>
      {open && (
        <div className={styles.botWindow}>
          <div className={styles.header}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e' }} />
              Persona AI
            </div>
            <button className={styles.closeBtn} onClick={() => setOpen(false)}>✕</button>
          </div>
          <div className={styles.messages}>
            {msgs.map((m, i) => <div key={i} className={`${styles.msg} ${m.sender === 'bot' ? styles.msgBot : styles.msgUser}`}>{m.text}</div>)}
            <div ref={bottomRef} />
          </div>
          <div className={styles.inputArea}>
            <input className={styles.input} value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e => e.key==='Enter' && handleSend()} placeholder="Ask something..." />
            <button className={styles.send} onClick={handleSend} aria-label="Send">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
            </button>
          </div>
        </div>
      )}
      {!open && (
        <div className={styles.botBtn} onClick={() => setOpen(true)} title="Chat with Persona AI">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
        </div>
      )}
    </div>
  );
}
