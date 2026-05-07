import { useSmoothScroll } from './hooks/useSmoothScroll';
import Hero from './components/Hero';
import Specifications from './components/Specifications';
import Gallery from './components/Gallery';
import Features from './components/Features';
import CTA from './components/CTA';

// Three.js
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import DroneModel from './components/DroneModel';

function App() {
  useSmoothScroll();

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: 'var(--color-bg)' }}>
      {/* 3D Canvas Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
        <Canvas dpr={[1, 1.5]} performance={{ min: 0.5 }}>
          <color attach="background" args={['#f9f9f7']} />
          {/* 100mm equivalent lens look (narrow FOV, further back) */}
          <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={20} />
          
          <ambientLight intensity={0.8} color="#ffffff" />
          <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          <Environment preset="studio" />
          
          <Suspense fallback={null}>
            <DroneModel />
          </Suspense>
        </Canvas>
      </div>

      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <Specifications />
        <Features />
        <Gallery />
        <CTA />
      </main>
    </div>
  );
}

export default App;
