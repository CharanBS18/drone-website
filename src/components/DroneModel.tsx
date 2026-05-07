import React, { useRef, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const DroneModel: React.FC = () => {
  // Load the GLB (Suspense handles loading state automatically)
  const modelPath = `${import.meta.env.BASE_URL}drone.glb`;
  const gltf = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null);

  // Pre-calculate explosion vectors for all child meshes
  const explosionData = useMemo(() => {
    const data = new Map<THREE.Object3D, { originalPos: THREE.Vector3, explodeDir: THREE.Vector3 }>();
    
    // We clone the scene so we don't mutate the cached GLTF globally in unexpected ways
    const scene = gltf.scene.clone();
    
    // Calculate bounding box center of the whole model
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Enable shadows
        child.castShadow = true;
        child.receiveShadow = true;

        // Enhance material for studio lighting
        if (child.material) {
          child.material.envMapIntensity = 2.0;
          child.material.needsUpdate = true;
        }

        // Calculate a bounding box for this specific mesh
        const meshBox = new THREE.Box3().setFromObject(child);
        const meshCenter = new THREE.Vector3();
        meshBox.getCenter(meshCenter);
        
        // Direction vector from the global center to the mesh center
        const dir = new THREE.Vector3().subVectors(meshCenter, center).normalize();
        
        // If the mesh is perfectly centered, give it a default upward explosion
        if (dir.lengthSq() === 0) {
          dir.set(0, 1, 0);
        }

        // Save its original local position and its explosion direction
        data.set(child, {
          originalPos: child.position.clone(),
          explodeDir: dir,
        });
      }
    });
    
    return { scene, data };
  }, [gltf]);

  // Smooth target variables for eased animation
  const targetState = useRef({ progress: 0, rotationY: 0 });
  const explosionOffset = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Calculate scroll progress (0 to 1)
    const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
    const scrollProgress = Math.max(0, Math.min(1, window.scrollY / maxScroll));

    // Smoothly interpolate the target progress
    targetState.current.progress = THREE.MathUtils.damp(targetState.current.progress, scrollProgress, 4, delta);
    const ctaSection = document.getElementById('ready-to-fly');
    const ctaRestoreProgress = ctaSection
      ? THREE.MathUtils.clamp(
          (window.scrollY + window.innerHeight - ctaSection.offsetTop) / (window.innerHeight * 0.7),
          0,
          1,
        )
      : 0;
    
    // Smooth continuous rotation plus scroll-based rotation
    targetState.current.rotationY += delta * 0.1;
    const scrollRotY = targetState.current.progress * Math.PI * 2;
    
    groupRef.current.rotation.y = targetState.current.rotationY + scrollRotY;
    
    // Subtle float effect + move to the right as we scroll
    const shiftX = Math.min(2.5, targetState.current.progress * 4); // Max shift 2.5 units to the right
    const ctaX = -3.2;
    const ctaY = -1.35;
    groupRef.current.position.x = (shiftX * (1 - ctaRestoreProgress)) + (ctaX * ctaRestoreProgress);
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1 - (targetState.current.progress * 1.5 * (1 - ctaRestoreProgress)) + (ctaY * ctaRestoreProgress);

    // Apply explosion logic
    if (explosionData.scene) {
      // Define how much the model explodes based on scroll
      // Let's say it starts exploding after 10% scroll, reaches max at 70%
      const rawExplodeProgress = Math.max(0, Math.min(1, (targetState.current.progress - 0.1) / 0.6));
      
      // Use an easing function for cinematic feel (easeOutExpo)
      const easedExplode = rawExplodeProgress === 1 ? 1 : 1 - Math.pow(2, -10 * rawExplodeProgress);
      const restoredExplode = easedExplode * (1 - ctaRestoreProgress);
      
      // Maximum explosion distance
      const maxDistance = 4.0;

      explosionData.data.forEach((meta, child) => {
        // Calculate new position
        explosionOffset.copy(meta.explodeDir).multiplyScalar(restoredExplode * maxDistance);
        
        // Add subtle random rotation to parts as they explode
        if (restoredExplode > 0) {
           child.rotation.x = restoredExplode * meta.explodeDir.x * 0.5;
           child.rotation.z = restoredExplode * meta.explodeDir.z * 0.5;
        } else {
           child.rotation.set(0,0,0);
        }

        child.position.copy(meta.originalPos).add(explosionOffset);
      });
    }
  });

  return (
    <group ref={groupRef} dispose={null} scale={0.9}>
      <primitive object={explosionData.scene} />
    </group>
  );
};

// Preload the model
useGLTF.preload(`${import.meta.env.BASE_URL}drone.glb`);

export default DroneModel;
