import React, { useEffect } from 'react';
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';

function AnimatedNumber({ value, pad = 0, className, duration = .75 }) {
  const reduceMotion = useReducedMotion();
  const count = useMotionValue(reduceMotion ? value : 0);
  const display = useTransform(count, latest => String(Math.round(latest)).padStart(pad, '0'));

  useEffect(() => {
    if (reduceMotion) {
      count.set(value);
      return undefined;
    }
    const controls = animate(count, value, {
      duration,
      ease: [.22, 1, .36, 1],
    });
    return () => controls.stop();
  }, [count, duration, reduceMotion, value]);

  return <motion.span className={className} aria-label={String(value)}>{display}</motion.span>;
}

export default AnimatedNumber;
