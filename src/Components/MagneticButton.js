import React, { useRef, useCallback } from 'react';
import styled from 'styled-components';

function MagneticButton({ children, strength = 0.35 }) {
    const ref = useRef(null);

    const handleMove = useCallback(
        (e) => {
            const el = ref.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) * strength;
            const dy = (e.clientY - cy) * strength;
            el.style.transform = `translate(${dx}px, ${dy}px)`;
        },
        [strength]
    );

    const handleLeave = useCallback(() => {
        if (ref.current) {
            ref.current.style.transform = 'translate(0, 0)';
        }
    }, []);

    return (
        <Wrapper
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
        >
            {children}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: inline-block;
    transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: transform;
`;

export default MagneticButton;
