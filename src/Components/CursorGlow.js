import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

function CursorGlow() {
    const glowRef = useRef(null);
    const pos = useRef({ x: 0, y: 0 });
    const rendered = useRef({ x: 0, y: 0 });
    const raf = useRef(null);

    useEffect(() => {
        const onMove = (e) => {
            pos.current = { x: e.clientX, y: e.clientY };
        };

        const animate = () => {
            rendered.current.x += (pos.current.x - rendered.current.x) * 0.12;
            rendered.current.y += (pos.current.y - rendered.current.y) * 0.12;

            if (glowRef.current) {
                glowRef.current.style.transform = `translate(${rendered.current.x}px, ${rendered.current.y}px)`;
            }
            raf.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        raf.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(raf.current);
        };
    }, []);

    return <GlowStyled ref={glowRef} aria-hidden="true" />;
}

const GlowStyled = styled.div`
    position: fixed;
    top: -200px;
    left: -200px;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    background: radial-gradient(
        circle at center,
        var(--primary-glow) 0%,
        transparent 70%
    );
    opacity: 0.45;
    filter: blur(60px);
    will-change: transform;
    transition: opacity 0.3s ease;

    @media (hover: none) {
        display: none;
    }
`;

export default CursorGlow;
