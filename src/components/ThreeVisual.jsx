import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeVisual() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Get container dimensions
    let width = container.clientWidth || 300;
    let height = container.clientHeight || 300;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true, // transparent background to blend with glassmorphism
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Geometry (Torus Knot)
    const geometry = new THREE.TorusKnotGeometry(1.2, 0.35, 120, 12, 3, 4);

    // 5. Materials & Points
    // Create points (particles) for a futuristic sci-fi look
    const material = new THREE.PointsMaterial({
      size: 0.035,
      color: 0xa855f7, // purple base
      transparent: true,
      opacity: 0.85,
    });

    // Create a color attribute to blend purple to blue
    const count = geometry.attributes.position.count;
    const colors = new Float32Array(count * 3);
    const position = geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      // Color coordinates mapping: map geometry positions to RGB gradients
      const x = position.getX(i);
      const y = position.getY(i);
      const z = position.getZ(i);

      // Purple (168, 85, 247) to Blue (59, 130, 246)
      const mixRatio = (x + 1.5) / 3.0; // Normalised -1.5 -> 1.5 to 0 -> 1
      colors[i * 3] = THREE.MathUtils.lerp(0.65, 0.23, mixRatio); // R
      colors[i * 3 + 1] = THREE.MathUtils.lerp(0.33, 0.51, mixRatio); // G
      colors[i * 3 + 2] = THREE.MathUtils.lerp(0.97, 0.96, mixRatio); // B
    }

    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    material.vertexColors = true; // Enable vertex coloring

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // 6. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // 7. Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      // Calculate normalized mouse coords (-1 to 1) relative to container
      mouseX = ((e.clientX - rect.left) / width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / height) * 2 + 1;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    let animationFrameId;
    
    const tick = () => {
      // Slow auto-rotation
      particleSystem.rotation.y += 0.003;
      particleSystem.rotation.x += 0.001;

      // Mouse interactive tilt (smooth interpolation)
      targetX = mouseX * 0.8;
      targetY = mouseY * 0.8;

      particleSystem.rotation.y += (targetX - particleSystem.rotation.y) * 0.05;
      particleSystem.rotation.x += (-targetY - particleSystem.rotation.x) * 0.05;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // Cleanup
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="three-container"
      style={{
        width: '100%',
        height: '320px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'grab',
      }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
