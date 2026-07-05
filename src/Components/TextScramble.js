import { useState, useEffect, useRef } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#_abcdefghijklmnopqrstuvwxyz';

function TextScramble({ text, className, delay = 0 }) {
    const [display, setDisplay] = useState('');
    const frameRef = useRef(0);
    const started = useRef(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (started.current) return;
            started.current = true;

            let frame = 0;
            const totalFrames = 28;
            const queue = [];

            for (let i = 0; i < text.length; i++) {
                const start = Math.floor(Math.random() * (totalFrames * 0.35));
                const end = start + Math.floor(Math.random() * (totalFrames * 0.55)) + 4;
                queue.push({ from: '', to: text[i], start, end });
            }

            const update = () => {
                let output = '';
                let complete = 0;

                for (let i = 0; i < queue.length; i++) {
                    const { from, to, start, end } = queue[i];
                    if (frame >= end) {
                        complete++;
                        output += to;
                    } else if (frame >= start) {
                        output += CHARS[Math.floor(Math.random() * CHARS.length)];
                    } else {
                        output += from;
                    }
                }

                setDisplay(output);

                if (complete < queue.length) {
                    frame++;
                    frameRef.current = requestAnimationFrame(update);
                }
            };

            frameRef.current = requestAnimationFrame(update);
        }, delay);

        return () => {
            clearTimeout(timeout);
            cancelAnimationFrame(frameRef.current);
        };
    }, [text, delay]);

    return <span className={className}>{display}</span>;
}

export default TextScramble;
