import React from 'react';
import { motion } from 'framer-motion';

const specifications = [
  { id: 'camera', title: '8K Hasselblad Camera', desc: 'Capture cinematic footage with stunning dynamic range and 1 billion colors.' },
  { id: 'battery', title: '45-Min Flight Time', desc: 'Extended dual-battery system ensures you never miss the perfect shot.' },
  { id: 'sensors', title: 'Omnidirectional Avoidance', desc: 'Advanced LiDAR sensors detect obstacles in all directions for safe flights.' },
  { id: 'transmission', title: '15km O4 Video Transmission', desc: 'Crystal clear 1080p/60fps live feed up to 15 kilometers away.' },
];

const Specifications: React.FC = () => {
  return (
    <section className="section-block newsprint-texture">
      <div className="container">
        <div className="spec-grid">
          <div className="spec-copy">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.35 }}
              className="section-label"
            >
              Technical Register
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4 }}
              className="section-heading"
            >
              Engineered for <span className="text-gradient">Perfection</span>
            </motion.h2>
            <p className="drop-cap" style={{ color: 'var(--color-text-muted)', fontSize: '17px', lineHeight: 1.75, textAlign: 'justify' }}>
              Every primary system is arranged around one editorial promise: keep the shot clean, the craft stable, and the operator focused on the frame.
            </p>
          </div>

          <div className="spec-drone-space" aria-hidden="true" />
        </div>

        <div className="spec-list">
          {specifications.map((spec, index) => (
            <motion.article
              key={spec.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="spec-card hard-shadow-hover"
            >
              <span className="spec-index">Fig. 2.{index + 1}</span>
              <h3>{spec.title}</h3>
              <p>{spec.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specifications;
