import React, { useCallback, useMemo } from 'react';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';

const palettes = {
  porcelain: { node: '#5b5bd6', link: '#9b9bdc', accent: '#39bd82' },
  midnight: { node: '#8f91ff', link: '#48547b', accent: '#58dcb0' },
  clay: { node: '#c2553f', link: '#caa98f', accent: '#5b9667' },
  arctic: { node: '#147d91', link: '#8ab5b8', accent: '#27a17d' },
};

function HeroField({ theme = 'porcelain' }) {
  const colors = palettes[theme] || palettes.porcelain;
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const particlesInit = useCallback(async engine => loadSlim(engine), []);
  const options = useMemo(() => ({
    fullScreen: { enable: false },
    fpsLimit: 50,
    detectRetina: true,
    interactivity: {
      events: {
        onHover: { enable: !reduceMotion, mode: 'grab' },
        resize: true,
      },
      modes: {
        grab: { distance: 145, links: { opacity: .28 } },
      },
    },
    particles: {
      color: { value: [colors.node, colors.accent] },
      links: {
        color: colors.link,
        distance: 132,
        enable: true,
        opacity: .14,
        width: .7,
      },
      move: {
        enable: !reduceMotion,
        direction: 'none',
        outModes: { default: 'bounce' },
        random: true,
        speed: .32,
        straight: false,
      },
      number: {
        density: { enable: true, area: 820 },
        value: 42,
      },
      opacity: { value: { min: .12, max: .38 } },
      shape: { type: 'circle' },
      size: { value: { min: 1, max: 2.7 } },
    },
  }), [colors, reduceMotion]);

  return (
    <div className="hero-field" aria-hidden="true">
      <Particles id={`hero-field-${theme}`} init={particlesInit} options={options} />
    </div>
  );
}

export default HeroField;
