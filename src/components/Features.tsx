import React from 'react';
import { motion } from 'framer-motion';
import fpvDroneImage from '../../image .png';

const features = [
  {
    title: 'Intelligent Flight Modes',
    desc: 'Master complex shots effortlessly. ActiveTrack Pro keeps subjects framed perfectly even in challenging environments.',
    image: fpvDroneImage
  },
  {
    title: 'Nightography Redefined',
    desc: 'A massive 1-inch CMOS sensor captures breathtaking low-light footage with reduced noise and incredible clarity.',
    image: 'https://images.unsplash.com/photo-1506501139174-099022df5260?q=80&w=2071&auto=format&fit=crop'
  },
  {
    title: 'Built to Endure',
    desc: 'Carbon fiber construction and IP43 rating mean you can fly in rain, snow, or harsh winds without hesitation.',
    image: 'drone.png'
  }
];

const Features: React.FC = () => {
  return (
    <section className="section-block">
      <div className="container">
        <span className="section-label">Field Reports</span>
        <h2 className="section-heading">Three reasons this craft makes the front page</h2>

        <div className="features-list">
          {features.map((feature, index) => (
            <FeatureRow key={feature.title} feature={feature} index={index} reverse={index % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureRow: React.FC<{ feature: typeof features[0], index: number, reverse: boolean }> = ({ feature, index, reverse }) => {
  const copy = (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.35 }}
      className="feature-copy"
    >
      <span className="spec-index">Column {index + 1}</span>
      <h3>{feature.title}</h3>
      <p>{feature.desc}</p>
    </motion.div>
  );

  const image = (
    <div className="feature-image">
      <img src={feature.image} alt={feature.title} loading="lazy" />
      <span className="fig-caption">Fig. 3.{index + 1}</span>
    </div>
  );

  return (
    <article className={`feature-row ${reverse ? 'reverse' : ''}`}>
      {reverse ? image : copy}
      {reverse ? copy : image}
    </article>
  );
};

export default Features;
