import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/*
 * SmokeSection — sections materialize out of smoke as they enter the
 * viewport and dissolve/disintegrate as they leave. Wrap any section.
 */
function SmokeSection({ children, className = '' }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start 92%', 'start 45%', 'end 55%', 'end 8%'],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
    const blur = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [14, 0, 0, 14]);
    const filter = useTransform(blur, (b) => `blur(${b}px)`);
    const y = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [60, 0, 0, -60]);
    const scale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.96, 1, 1, 0.97]);

    return (
        <motion.div ref={ref} className={className} style={{ opacity, filter, y, scale }}>
            {children}
        </motion.div>
    );
}

export default SmokeSection;
