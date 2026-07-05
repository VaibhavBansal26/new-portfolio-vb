import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

/*
 * ParticleLogo — hundreds of particles assemble into "<vb/>".
 * Move the cursor through them and they scatter, then flow back.
 * Colors come from the active theme's CSS variables.
 */
function ParticleLogo({ theme, text = '<vb/>' }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        const css = getComputedStyle(document.documentElement);
        const colors = [
            css.getPropertyValue('--primary-color').trim() || '#2DE0A5',
            css.getPropertyValue('--accent-2').trim() || '#38BDF8',
            css.getPropertyValue('--white-color').trim() || '#F4F7FB',
        ];

        let particles = [];
        let raf;
        const mouse = { x: -9999, y: -9999 };
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const build = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;

            // sample the text from an offscreen canvas
            const off = document.createElement('canvas');
            off.width = canvas.width;
            off.height = canvas.height;
            const octx = off.getContext('2d');
            const fontSize = Math.min(canvas.width / (text.length * 0.62), canvas.height * 0.52);
            octx.font = `bold ${fontSize}px 'JetBrains Mono', monospace`;
            octx.textAlign = 'center';
            octx.textBaseline = 'middle';
            octx.fillStyle = '#fff';
            octx.fillText(text, off.width / 2, off.height / 2);

            const data = octx.getImageData(0, 0, off.width, off.height).data;
            const step = Math.max(4, Math.floor(4 * dpr));
            const targets = [];
            for (let y = 0; y < off.height; y += step) {
                for (let x = 0; x < off.width; x += step) {
                    if (data[(y * off.width + x) * 4 + 3] > 128) {
                        targets.push({ x, y });
                    }
                }
            }

            particles = targets.map((t) => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                tx: t.x,
                ty: t.y,
                vx: 0,
                vy: 0,
                size: (Math.random() * 1.4 + 1) * dpr,
                color: colors[Math.floor(Math.random() * colors.length)],
            }));
        };

        const tick = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const repelR = 90 * dpr;
            for (const p of particles) {
                // spring toward target
                p.vx += (p.tx - p.x) * 0.045;
                p.vy += (p.ty - p.y) * 0.045;
                // mouse repulsion
                if (!reduced) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < repelR * repelR && d2 > 0.01) {
                        const d = Math.sqrt(d2);
                        const f = ((repelR - d) / repelR) * 3.2 * dpr;
                        p.vx += (dx / d) * f;
                        p.vy += (dy / d) * f;
                    }
                }
                p.vx *= 0.86;
                p.vy *= 0.86;
                p.x += p.vx;
                p.y += p.vy;
                ctx.fillStyle = p.color;
                ctx.globalAlpha = 0.92;
                ctx.fillRect(p.x, p.y, p.size, p.size);
            }
            ctx.globalAlpha = 1;
            raf = requestAnimationFrame(tick);
        };

        const onPointer = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = (e.clientX - rect.left) * dpr;
            mouse.y = (e.clientY - rect.top) * dpr;
        };
        const onLeave = () => {
            mouse.x = -9999;
            mouse.y = -9999;
        };
        const onResize = () => build();

        build();
        tick();
        canvas.addEventListener('pointermove', onPointer);
        canvas.addEventListener('pointerleave', onLeave);
        window.addEventListener('resize', onResize);

        return () => {
            cancelAnimationFrame(raf);
            canvas.removeEventListener('pointermove', onPointer);
            canvas.removeEventListener('pointerleave', onLeave);
            window.removeEventListener('resize', onResize);
        };
    }, [theme, text]);

    return (
        <Stage aria-hidden="true">
            <canvas ref={canvasRef} />
        </Stage>
    );
}

const Stage = styled.div`
    width: 100%;
    height: 100%;
    min-height: 320px;
    canvas{
        display: block;
        width: 100%;
        height: 100%;
    }
`;

export default ParticleLogo;
