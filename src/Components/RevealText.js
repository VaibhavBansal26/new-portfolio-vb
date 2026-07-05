import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const wordContainer = {
    hidden: {},
    visible: (delay = 0) => ({
        transition: {
            staggerChildren: 0.045,
            delayChildren: delay,
        },
    }),
};

const wordVariant = {
    hidden: {
        y: '110%',
        rotateX: -80,
        opacity: 0,
    },
    visible: {
        y: '0%',
        rotateX: 0,
        opacity: 1,
        transition: {
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

function RevealText({ children, as = 'h2', className = '', delay = 0 }) {
    const Tag = motion[as] || motion.h2;
    const text = typeof children === 'string' ? children : '';

    if (!text) {
        return (
            <Tag
                className={className}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                {children}
            </Tag>
        );
    }

    const words = text.split(' ');

    return (
        <RevealWrapper
            as={Tag}
            className={className}
            variants={wordContainer}
            custom={delay}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            {words.map((word, i) => (
                <span className="word-clip" key={`${word}-${i}`}>
                    <motion.span className="word" variants={wordVariant}>
                        {word}
                    </motion.span>
                    {i < words.length - 1 && ' '}
                </span>
            ))}
        </RevealWrapper>
    );
}

const RevealWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;

    .word-clip {
        display: inline-flex;
        overflow: hidden;
        perspective: 600px;
    }

    .word {
        display: inline-block;
        transform-origin: bottom center;
        will-change: transform, opacity;
    }
`;

export default RevealText;
