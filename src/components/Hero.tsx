import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="hero-section newsprint-texture">
      <div className="container">
        <div className="edition-bar">
          <span>Vol. 01 | Aerial Gazette</span>
          <span>Special Flight Edition</span>
          <span>Printed for Creators</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="masthead"
        >
          Drone Dispatch
        </motion.div>

        <div className="ticker" aria-label="Product highlights">
          <span><strong>Breaking</strong> 8K Hasselblad Camera</span>
          <span>45-Min Flight Window</span>
          <span>O4 Video Transmission</span>
          <span>Omnidirectional Avoidance</span>
        </div>

        <div className="hero-grid">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
            className="hero-copy"
          >
            <span className="section-label">Front Page</span>
            <h1 className="hero-title">
              The Future of <span className="text-gradient-accent">Aerial Cinema</span>
            </h1>
            <p className="hero-intro drop-cap">
              Unparalleled flight performance. Cinematic 8K resolution. Intelligent obstacle avoidance. Experience the world from above like never before.
            </p>
            <div className="hero-actions">
              <button className="btn-primary">Buy Now</button>
              <button className="btn-secondary">Explore Features</button>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18, ease: 'easeOut' }}
            className="hero-sidebar"
          >
            <div>
              <span className="section-label">Filed Under</span>
              <p style={{ marginTop: '18px', lineHeight: 1.8 }}>
                Professional creators, expedition teams, cinematic crews, and anyone chasing impossible angles.
              </p>
            </div>
            <div>
              <p>Fig. 1.1 | Fixed 3D craft on live scroll path</p>
              <p style={{ marginTop: '10px', color: 'var(--color-accent)' }}>Scroll to inspect the airframe</p>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default Hero;
