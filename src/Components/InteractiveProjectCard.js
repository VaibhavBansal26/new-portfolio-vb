import React from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import DragHandleRoundedIcon from '@mui/icons-material/DragHandleRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded';

const cardMotion = {
  hidden: { opacity: 0, y: 44, scale: .96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 112, damping: 18 } },
  hover: { y: -11, transition: { type: 'spring', stiffness: 320, damping: 23 } },
};

function InteractiveProjectCard({ project, index, total }) {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(.5);
  const pointerY = useMotionValue(.5);
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [5.5, -5.5]), { stiffness: 220, damping: 24 });
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-4.5, 4.5]), { stiffness: 220, damping: 24 });
  const imageX = useSpring(useTransform(pointerX, [0, 1], [-6, 6]), { stiffness: 180, damping: 22 });
  const imageY = useSpring(useTransform(pointerY, [0, 1], [-4, 4]), { stiffness: 180, damping: 22 });
  const signals = project.signals || [];

  const updatePointer = (event) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width);
    pointerY.set((event.clientY - rect.top) / rect.height);
  };

  const resetPointer = () => {
    pointerX.set(.5);
    pointerY.set(.5);
  };

  return (
    <motion.article
      className="project project-interactive"
      custom={index}
      variants={reduceMotion ? undefined : cardMotion}
      whileHover={reduceMotion ? undefined : 'hover'}
      onPointerMove={updatePointer}
      onPointerLeave={resetPointer}
      style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
    >
      <div className="project-media-shell">
        <motion.div className="image-frame" variants={reduceMotion ? undefined : { hover: { scale: .985 } }}>
          <motion.img
            src={project.image}
            alt={`${project.title} interface`}
            loading="eager"
            decoding="async"
            style={reduceMotion ? undefined : { x: imageX, y: imageY }}
            variants={reduceMotion ? undefined : { hover: { scale: 1.095 } }}
          />
          <motion.div className="project-image-shade" variants={reduceMotion ? undefined : { hover: { opacity: .06 } }} />
          <div className="project-image-meta mono">
            <span>/ {project.category || project.tags[0] || 'Product build'}</span>
            <span>{project.no} / {String(total).padStart(2, '0')}</span>
          </div>
          <motion.div className="project-signal-note" variants={reduceMotion ? undefined : { hover: { y: -5, rotate: -1.2, scale: 1.025 } }}>
            <RadioButtonCheckedRoundedIcon />
            <span><strong className="mono">{signals[0]?.value || 'Production build'}</strong><small className="mono">{signals[0]?.label || 'Project signal'}</small></span>
          </motion.div>
        </motion.div>
      </div>

      <div className="project-body project-case-body">
        <div className="project-index-rail">
          <motion.b variants={reduceMotion ? undefined : { hover: { x: 4, color: 'var(--blue)' } }}>{project.no}</motion.b>
          <DragHandleRoundedIcon aria-hidden="true" />
        </div>
        <div className="project-content">
          <h3>{project.displayTitle || project.title}</h3>
          <p className="project-eyebrow mono">{project.tags.slice(0, 3).join(' / ')}</p>
          <p className="project-summary">{project.copy}</p>
        </div>
      </div>

      <motion.div className="project-proof-grid" variants={reduceMotion ? undefined : { hover: { y: -3 } }}>
        {signals.slice(0, 2).map(signal => <div key={`${signal.value}-${signal.label}`}><InsightsRoundedIcon /><span><strong>{signal.value}</strong><small className="mono">{signal.label}</small></span></div>)}
      </motion.div>

      <motion.div className="project-tags-row tags" variants={reduceMotion ? undefined : { hover: { y: -3 } }}>
        {project.tags.map(tag => <span className="pill" key={tag}>{tag}</span>)}
      </motion.div>

      <motion.a
        className="project-cta"
        href={project.href}
        target="_blank"
        rel="noreferrer"
        aria-label={`View ${project.title} project`}
        variants={reduceMotion ? undefined : { hover: { backgroundColor: 'var(--ink)', color: 'var(--on-ink)' } }}
      >
        <span>View case study</span>
        <motion.span className="project-cta-arrow" variants={reduceMotion ? undefined : { hover: { x: 7, rotate: -12 } }}><ArrowForwardRoundedIcon /></motion.span>
      </motion.a>
    </motion.article>
  );
}

export default InteractiveProjectCard;
