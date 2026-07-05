import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

/* EDITH — "Even During Internships, Talented Hire" ;)
   Rule-based assistant with Web Speech voice in/out. */

const KB = [
    {
        keys: ['hello', 'hi', 'hey', 'namaste', 'yo'],
        reply: "Hello! I'm EDITH, Vaibhav's personal AI assistant. Ask me about his skills, experience, projects, education, or how to contact him.",
    },
    {
        keys: ['who are you', 'edith', 'your name', 'what are you'],
        reply: "I'm EDITH — Vaibhav's portfolio assistant, inspired by Tony Stark's AI. I know everything about Vaibhav Bansal: his work, skills, and how to reach him.",
    },
    {
        keys: ['skill', 'stack', 'technolog', 'tech', 'tools', 'languages'],
        reply: 'Vaibhav works with Python, JavaScript, Java, SQL, R and C++. Frontend: React, Next.js, Redux, Tailwind. Backend & cloud: Node, AWS, Docker, Kubernetes, Kafka. Data & ML: Spark, Airflow, MLflow, Snowflake, ETL pipelines. Check the Resume page for the full stream.',
    },
    {
        keys: ['experience', 'work', 'job', 'career', 'dashclicks', 'wipro'],
        reply: 'He has 5+ years of experience: Front-end Developer at Dashclicks (built a website builder with 200k+ lines of code and published an npm package), Project Engineer at Wipro, plus internships at JK Tyre, Smart Controls, and E-Biz Technocrats. Currently a Graduate Student Assistant at SUNY Buffalo.',
    },
    {
        keys: ['education', 'degree', 'study', 'university', 'buffalo', 'college'],
        reply: 'Vaibhav holds an M.S. in Data Science from SUNY Buffalo (GPA 3.83/4) and a B.Tech in Computer Science from VIT University, India (CGPA 8.62/10).',
    },
    {
        keys: ['project', 'portfolio', 'built', 'work samples'],
        reply: "He has shipped 40+ projects — full-stack apps, ML systems, and data pipelines. Highlights: the grapesjs-advance-components npm package, a published Springer research paper on stereo-vision obstacle avoidance, and an ML project featured in Times Square. Visit the Work page to browse them.",
    },
    {
        keys: ['times square', 'billboard', 'featured', 'nyc'],
        reply: 'Fun fact: his hospital-efficiency ML project (XGBoost) took the top spot and got him featured on a billboard in Times Square, New York. The video is on the About page.',
    },
    {
        keys: ['contact', 'email', 'reach', 'hire', 'phone', 'touch'],
        reply: 'You can reach Vaibhav at vaibhav.bansal945@gmail.com, or use the form on the Contact page. He is currently open to new opportunities.',
    },
    {
        keys: ['resume', 'cv', 'download'],
        reply: 'You can download his resume from the hero section on the home page, or the About page — look for the resume.pdf button.',
    },
    {
        keys: ['theme', 'color', 'dark', 'netflix', 'harry', 'iron man', 'potter'],
        reply: 'Try the palette icon in the navbar — this site ships with dark, light, Harry Potter, Iron Man, and Netflix themes. The Iron Man one is my personal favorite, for obvious reasons.',
    },
    {
        keys: ['paper', 'research', 'springer', 'publication'],
        reply: "His research paper 'Obstacle Avoidance Using Stereo Vision and Depth Maps for Visual Aid Devices' was published in Springer Nature Applied Sciences, 2020 (doi:10.1007/s42452-020-2815-z).",
    },
    {
        keys: ['leetcode', 'dsa', 'coding practice', 'algorithms'],
        reply: 'He grinds LeetCode as vaibhav_bansal26 — his stats and heatmap are on the Resume page.',
    },
];

const FALLBACK = "I'm not sure about that one. Try asking about Vaibhav's skills, experience, education, projects, resume, or how to contact him.";

const answer = (text) => {
    const t = text.toLowerCase();
    let best = null;
    let bestScore = 0;
    for (const item of KB) {
        const score = item.keys.filter((k) => t.includes(k)).length;
        if (score > bestScore) {
            bestScore = score;
            best = item;
        }
    }
    return best ? best.reply : FALLBACK;
};

function Edith() {
    const [open, setOpen] = useState(false);
    const [voiceOn, setVoiceOn] = useState(true);
    const [listening, setListening] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { from: 'edith', text: "Hi, I'm EDITH — Vaibhav's AI assistant. Ask me anything about him, by text or voice." },
    ]);
    const bodyRef = useRef(null);
    const recogRef = useRef(null);

    const speak = useCallback((text) => {
        if (!voiceOn || !window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.rate = 1.02;
        u.pitch = 1.05;
        const voices = window.speechSynthesis.getVoices();
        const preferred = voices.find((v) => /female|samantha|zira|google uk english female/i.test(v.name));
        if (preferred) u.voice = preferred;
        window.speechSynthesis.speak(u);
    }, [voiceOn]);

    const send = useCallback((raw) => {
        const text = (raw ?? '').trim();
        if (!text) return;
        const reply = answer(text);
        setMessages((m) => [...m, { from: 'user', text }]);
        setInput('');
        setTimeout(() => {
            setMessages((m) => [...m, { from: 'edith', text: reply }]);
            speak(reply);
        }, 450);
    }, [speak]);

    const toggleMic = () => {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR) {
            const note = 'Voice input is not supported in this browser — try Chrome. You can still type!';
            setMessages((m) => [...m, { from: 'edith', text: note }]);
            return;
        }
        if (listening) {
            recogRef.current?.stop();
            setListening(false);
            return;
        }
        const recog = new SR();
        recogRef.current = recog;
        recog.lang = 'en-US';
        recog.interimResults = false;
        recog.onresult = (e) => {
            const transcript = e.results[0][0].transcript;
            send(transcript);
        };
        recog.onend = () => setListening(false);
        recog.onerror = () => setListening(false);
        recog.start();
        setListening(true);
    };

    useEffect(() => {
        bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages, open]);

    useEffect(() => () => window.speechSynthesis?.cancel(), []);

    return (
        <EdithStyled>
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="panel"
                        initial={{ opacity: 0, y: 24, scale: .96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 24, scale: .96 }}
                        transition={{ duration: .25, ease: 'easeOut' }}
                    >
                        <div className="head">
                            <div className="id">
                                <span className="pulse" />
                                <div>
                                    <p className="name mono">EDITH</p>
                                    <p className="sub">vaibhav's ai assistant</p>
                                </div>
                            </div>
                            <div className="head-actions">
                                <button
                                    onClick={() => { setVoiceOn(!voiceOn); window.speechSynthesis?.cancel(); }}
                                    aria-label={voiceOn ? 'Mute voice' : 'Enable voice'}
                                >
                                    {voiceOn ? <VolumeUpIcon /> : <VolumeOffIcon />}
                                </button>
                                <button onClick={() => setOpen(false)} aria-label="Close EDITH">
                                    <CloseIcon />
                                </button>
                            </div>
                        </div>

                        <div className="body" ref={bodyRef}>
                            {messages.map((m, i) => (
                                <div className={`msg ${m.from}`} key={i}>
                                    {m.from === 'edith' && <span className="tag mono">edith</span>}
                                    <p>{m.text}</p>
                                </div>
                            ))}
                        </div>

                        <div className="suggestions">
                            {['skills', 'experience', 'projects', 'contact'].map((s) => (
                                <button key={s} className="mono" onClick={() => send(s)}>{s}</button>
                            ))}
                        </div>

                        <form
                            className="input-row"
                            onSubmit={(e) => { e.preventDefault(); send(input); }}
                        >
                            <button
                                type="button"
                                className={`mic ${listening ? 'live' : ''}`}
                                onClick={toggleMic}
                                aria-label={listening ? 'Stop listening' : 'Speak to EDITH'}
                            >
                                {listening ? <MicIcon /> : <MicOffIcon />}
                            </button>
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={listening ? 'listening…' : 'ask edith…'}
                                aria-label="Message EDITH"
                            />
                            <button type="submit" className="send" aria-label="Send message">
                                <SendIcon />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                className={`fab ${open ? 'hidden' : ''}`}
                onClick={() => setOpen(true)}
                aria-label="Open EDITH assistant"
            >
                <SmartToyIcon />
                <span className="ring" />
            </button>
        </EdithStyled>
    );
}

const EdithStyled = styled.div`
    position: fixed;
    right: 1.4rem;
    bottom: 1.4rem;
    z-index: 70;

    .fab{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3.4rem;
        height: 3.4rem;
        border-radius: 50%;
        border: 1px solid var(--glass-border);
        background: linear-gradient(140deg, var(--primary-color), var(--accent-2));
        color: var(--on-primary);
        cursor: pointer;
        box-shadow: 0 8px 30px var(--primary-glow);
        transition: transform .2s ease, opacity .2s ease;
        svg{
            font-size: 1.5rem;
        }
        .ring{
            position: absolute;
            inset: -4px;
            border-radius: 50%;
            border: 1px solid var(--primary-color);
            opacity: .5;
            animation: edith-ping 2.4s ease-out infinite;
        }
        &:hover{
            transform: translateY(-3px) scale(1.05);
        }
        &.hidden{
            opacity: 0;
            pointer-events: none;
        }
    }

    @keyframes edith-ping{
        0%{ transform: scale(1); opacity: .5; }
        80%, 100%{ transform: scale(1.45); opacity: 0; }
    }

    .panel{
        position: absolute;
        right: 0;
        bottom: 0;
        width: min(24rem, calc(100vw - 2rem));
        height: min(32rem, calc(100vh - 6rem));
        display: flex;
        flex-direction: column;
        border-radius: 18px;
        border: 1px solid var(--glass-border);
        background: var(--nav-bg);
        backdrop-filter: blur(24px) saturate(1.4);
        -webkit-backdrop-filter: blur(24px) saturate(1.4);
        box-shadow: 0 24px 70px rgba(0, 0, 0, .4);
        overflow: hidden;
    }

    .head{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: .9rem 1rem;
        border-bottom: 1px solid var(--glass-border);

        .id{
            display: flex;
            align-items: center;
            gap: .7rem;
            .pulse{
                width: .65rem;
                height: .65rem;
                border-radius: 50%;
                background: var(--primary-color);
                box-shadow: 0 0 12px var(--primary-color);
                animation: edith-pulse 2s ease-in-out infinite;
            }
            .name{
                font-size: .9rem;
                font-weight: 700;
                letter-spacing: .18em;
                color: var(--white-color);
            }
            .sub{
                font-size: .68rem;
                color: var(--font-light-color);
            }
        }

        .head-actions{
            display: flex;
            gap: .2rem;
            button{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 2rem;
                height: 2rem;
                border: none;
                border-radius: 8px;
                background: transparent;
                color: var(--font-light-color);
                cursor: pointer;
                transition: color .15s ease, background-color .15s ease;
                svg{ font-size: 1.05rem; }
                &:hover{
                    color: var(--primary-color);
                    background: var(--background-light-color-2);
                }
            }
        }
    }

    @keyframes edith-pulse{
        0%, 100%{ opacity: 1; }
        50%{ opacity: .4; }
    }

    .body{
        flex: 1;
        overflow-y: auto;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: .7rem;

        .msg{
            max-width: 88%;
            p{
                font-size: .85rem;
                line-height: 1.55;
                padding: .6rem .85rem;
                border-radius: 12px;
            }
            .tag{
                display: block;
                font-size: .6rem;
                letter-spacing: .15em;
                color: var(--primary-color);
                margin: 0 0 .2rem .2rem;
            }
            &.edith p{
                background: var(--background-dark-grey);
                border: 1px solid var(--glass-border);
                color: var(--font-light-color);
                border-bottom-left-radius: 4px;
            }
            &.user{
                align-self: flex-end;
                p{
                    background: var(--background-light-color-2);
                    border: 1px solid var(--primary-color);
                    color: var(--white-color);
                    border-bottom-right-radius: 4px;
                }
            }
        }
    }

    .suggestions{
        display: flex;
        gap: .4rem;
        padding: 0 1rem .6rem;
        flex-wrap: wrap;
        button{
            font-size: .68rem;
            padding: .3rem .7rem;
            border-radius: 999px;
            border: 1px solid var(--glass-border);
            background: transparent;
            color: var(--font-light-color);
            cursor: pointer;
            transition: color .15s ease, border-color .15s ease;
            &:hover{
                color: var(--primary-color);
                border-color: var(--primary-color);
            }
        }
    }

    .input-row{
        display: flex;
        align-items: center;
        gap: .5rem;
        padding: .7rem;
        border-top: 1px solid var(--glass-border);

        input{
            flex: 1;
            border: 1px solid var(--glass-border);
            border-radius: 10px;
            background: var(--background-dark-grey);
            padding: .6rem .8rem;
            color: var(--white-color);
            font-size: .85rem;
            outline: none;
            transition: border-color .2s ease;
            &::placeholder{
                color: var(--font-light-color);
                opacity: .6;
            }
            &:focus{
                border-color: var(--primary-color);
            }
        }

        .mic, .send{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2.4rem;
            height: 2.4rem;
            border-radius: 10px;
            border: 1px solid var(--glass-border);
            background: transparent;
            color: var(--font-light-color);
            cursor: pointer;
            transition: color .15s ease, border-color .15s ease, background-color .15s ease;
            svg{ font-size: 1.1rem; }
            &:hover{
                color: var(--primary-color);
                border-color: var(--primary-color);
            }
        }
        .mic.live{
            color: var(--on-primary);
            background: var(--primary-color);
            border-color: var(--primary-color);
            animation: edith-pulse 1.2s ease-in-out infinite;
        }
        .send{
            color: var(--on-primary);
            background: linear-gradient(120deg, var(--primary-color), var(--accent-2));
            border: none;
        }
    }
`;

export default Edith;
