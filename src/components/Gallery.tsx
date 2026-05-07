import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1654360415114-262143f0573e?q=80&w=2070&auto=format&fit=crop', category: 'fpv' },
  { id: 2, src: 'https://images.unsplash.com/photo-1506501139174-099022df5260?q=80&w=2071&auto=format&fit=crop', category: 'city' },
  { id: 3, src: 'https://images.unsplash.com/photo-1654360415114-262143f0573e?q=80&w=2139&auto=format&fit=crop', category: 'action' },
  { id: 4, src: 'https://images.unsplash.com/photo-1504681869696-d977211a5f4c?q=80&w=1952&auto=format&fit=crop', category: 'landscape' },
  { id: 5, src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop', category: 'nature' },
  { id: 6, src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070&auto=format&fit=crop', category: 'city' },
];

const categories = ['all', 'nature', 'city', 'action', 'landscape'];

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const filteredImages = galleryImages.filter(img => filter === 'all' || img.category === filter);

  return (
    <section className="section-block newsprint-texture">
      <div className="container">
        <div className="gallery-header">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
          >
            <span className="section-label">Photo Desk</span>
            <h2 className="section-heading">Shot on <span className="text-gradient">Drone</span></h2>
            <p className="gallery-intro">Explore the world through a cinematic lens, printed here in stark monochrome.</p>
          </motion.div>

          <div className="filter-bar" aria-label="Gallery filters">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`filter-button ${filter === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div className="gallery-grid">
          <AnimatePresence>
            {filteredImages.map((img, index) => (
              <motion.button
                type="button"
                key={img.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="gallery-card"
                onClick={() => setSelectedImg(img.src)}
                aria-label={`Open aerial image ${index + 1}`}
              >
                <img src={img.src} alt={`Aerial ${img.category} scene`} loading="lazy" />
                <span className="fig-caption">Fig. 4.{index + 1}</span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox"
            onClick={() => setSelectedImg(null)}
          >
            <button className="lightbox-close" aria-label="Close image" onClick={() => setSelectedImg(null)}>
              <X size={28} strokeWidth={1.5} />
            </button>
            <motion.img
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              src={selectedImg}
              alt="Fullscreen aerial scene"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
