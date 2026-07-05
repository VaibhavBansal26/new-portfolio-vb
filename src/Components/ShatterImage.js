import React, { useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

const ROWS = 6;
const COLS = 5;

/*
 * ShatterImage — the image is sliced into a grid of shards.
 * On hover the shards explode outward in 3D (each with its own
 * trajectory + spin), and reassemble when the cursor leaves.
 * The whole board also tilts in 3D following the cursor.
 */
function ShatterImage({ src, alt = '' }) {
    const ref = useRef(null);
    const [shattered, setShattered] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const pieces = useMemo(
        () =>
            Array.from({ length: ROWS * COLS }, (_, i) => ({
                r: Math.floor(i / COLS),
                c: i % COLS,
                tx: (Math.random() - 0.5) * 180,
                ty: (Math.random() - 0.5) * 180,
                tz: 60 + Math.random() * 280,
                rx: (Math.random() - 0.5) * 80,
                ry: (Math.random() - 0.5) * 80,
                rz: (Math.random() - 0.5) * 60,
                delay: Math.random() * 0.12,
            })),
        []
    );

    const onMove = (e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setTilt({ x: x * 9, y: -y * 9 });
    };

    return (
        <ShatterStyled
            ref={ref}
            onPointerMove={onMove}
            onPointerEnter={() => setShattered(true)}
            onPointerLeave={() => {
                setShattered(false);
                setTilt({ x: 0, y: 0 });
            }}
            role="img"
            aria-label={alt}
        >
            <div
                className={`board ${shattered ? 'shattered' : ''}`}
                style={{ transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
            >
                {pieces.map((p, i) => (
                    <span
                        key={i}
                        className="piece"
                        style={{
                            left: `${(p.c * 100) / COLS}%`,
                            top: `${(p.r * 100) / ROWS}%`,
                            backgroundImage: `url(${src})`,
                            backgroundPosition: `${(p.c * 100) / (COLS - 1)}% ${(p.r * 100) / (ROWS - 1)}%`,
                            transitionDelay: `${p.delay}s`,
                            '--tx': `${p.tx}px`,
                            '--ty': `${p.ty}px`,
                            '--tz': `${p.tz}px`,
                            '--rx': `${p.rx}deg`,
                            '--ry': `${p.ry}deg`,
                            '--rz': `${p.rz}deg`,
                        }}
                    />
                ))}
            </div>
        </ShatterStyled>
    );
}

const ShatterStyled = styled.div`
    perspective: 1100px;
    width: 100%;
    aspect-ratio: 721 / 1124;
    max-height: 540px;
    touch-action: manipulation;

    .board{
        position: relative;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        transition: transform .25s ease-out;
    }

    .piece{
        position: absolute;
        width: calc(100% / ${COLS} + .5px);
        height: calc(100% / ${ROWS} + .5px);
        background-size: ${COLS * 100}% ${ROWS * 100}%;
        background-repeat: no-repeat;
        backface-visibility: hidden;
        transform: translate3d(0, 0, 0) rotateX(0) rotateY(0) rotateZ(0);
        transition: transform .65s cubic-bezier(.2, .7, .3, 1), opacity .65s ease;
        will-change: transform;
    }

    .board.shattered .piece{
        transform:
            translate3d(var(--tx), var(--ty), var(--tz))
            rotateX(var(--rx)) rotateY(var(--ry)) rotateZ(var(--rz));
        opacity: .92;
    }

    @media (prefers-reduced-motion: reduce){
        .board.shattered .piece{
            transform: none;
        }
    }
`;

export default ShatterImage;
