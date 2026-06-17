import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function GridBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    // Dimensions
    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup (Perspective)
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    // Position camera slightly above the grid plane looking forward/down
    camera.position.set(0, 1.2, 5);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true, // transparent background to blend with CSS HSL gradients
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Tilted 3D Waving Grid Plane
    const gridSize = 45;
    const gridSegments = 45;
    const gridGeometry = new THREE.PlaneGeometry(gridSize, gridSize, gridSegments, gridSegments);
    
    // Wireframe material with Indigo/Purple glow
    const gridMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6, // Purple accent matching design HSL
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });

    const gridMesh = new THREE.Mesh(gridGeometry, gridMaterial);
    // Align grid flat on the floor and position it slightly below the view line
    gridMesh.rotation.x = -Math.PI / 2;
    gridMesh.position.set(0, -1.8, -10);
    scene.add(gridMesh);

    // 5. Starfield / Floating Particle System
    const particlesCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particlesCount * 3);
    const particleSpeeds = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      // Scatter particles in a large 3D space volume
      particlePositions[i * 3] = (Math.random() - 0.5) * 25; // X
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 8; // Y
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 8; // Z (mostly in front/behind grid)
      
      particleSpeeds[i] = Math.random() * 0.003 + 0.001; // Vertical drift speed
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.035,
      color: 0x3b82f6, // Blue accents
      transparent: true,
      opacity: 0.5,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 6. Interactive Parallax Control
    let mouse = { x: 0, y: 0 };
    let targetCamera = { x: 0, y: 1.2 };

    const handleMouseMove = (e) => {
      // Map mouse coordinates to normalized device coordinates (-1 to 1)
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // 7. Render Loop with Ripples & Drift
    const clock = new THREE.Clock();
    let animationFrameId;

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // A. Animate Wave ripples in the grid vertices
      const posAttr = gridGeometry.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i);
        const y = posAttr.getY(i); // represents Y grid plane coords (flat Z)

        // Mathematical ripple originating from grid center
        const distance = Math.sqrt(x * x + y * y);
        const waveZ = Math.sin(distance * 0.16 - elapsedTime * 1.5) * 0.28;
        
        posAttr.setZ(i, waveZ);
      }
      posAttr.needsUpdate = true;

      // B. Animate Floating Particles upwards
      const pPosAttr = particleGeometry.attributes.position;
      for (let i = 0; i < particlesCount; i++) {
        let currentY = pPosAttr.getY(i);
        currentY += particleSpeeds[i];
        
        // Wrap particles back to bottom when drifting out of range
        if (currentY > 4) {
          currentY = -4;
        }
        pPosAttr.setY(i, currentY);
      }
      pPosAttr.needsUpdate = true;

      // C. Apply mouse parallax tilt (lerping coordinates for maximum smoothness)
      targetCamera.x = mouse.x * 1.8;
      targetCamera.y = 1.2 + mouse.y * 0.8;

      camera.position.x += (targetCamera.x - camera.position.x) * 0.05;
      camera.position.y += (targetCamera.y - camera.position.y) * 0.05;
      
      // Keep looking slightly down-center towards grid depth
      camera.lookAt(new THREE.Vector3(0, -0.6, -8));

      // D. Render Frame
      renderer.render(scene, camera);

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      gridGeometry.dispose();
      gridMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -2,
        pointerEvents: 'none',
        background: '#040407', // Sleek space backdrop
      }}
    />
  );
}
