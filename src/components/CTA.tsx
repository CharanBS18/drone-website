import React from 'react';
import { motion } from 'framer-motion';

const CTA: React.FC = () => {
  return (
    <section id="ready-to-fly" className="cta-section newsprint-texture">
      <div className="container">
        <div className="ornament" aria-hidden="true">✧ ✧ ✧</div>

        <div className="cta-grid">
          <div className="cta-drone-column">
            <span className="section-label">Airframe</span>
            <p style={{ marginTop: '18px', maxWidth: '260px', color: 'var(--color-accent)', fontSize: '15px', lineHeight: 1.7 }}>
              The craft resolves back into its assembled state as this final dispatch comes into view.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="cta-content"
          >
            <span className="section-label">Final Edition</span>
            <h2 className="cta-title">
              Ready to <span className="text-gradient">Fly?</span>
            </h2>
            <p className="cta-copy">
              Elevate your creative potential. Order today and get a complimentary ND filter set.
            </p>

            <div className="cta-actions" style={{ marginTop: '32px' }}>
              <button className="btn-primary">Buy Now</button>
              <button className="btn-secondary">Watch Full Reel</button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
