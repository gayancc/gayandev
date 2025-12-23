'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, OrbitControls, Stars } from '@react-three/drei';
import { useLayoutEffect, useMemo, useRef } from 'react';
import type { Group, Mesh } from 'three';

function ResizeSync() {
  const { gl, camera } = useThree();

  useLayoutEffect(() => {
    const parent = gl.domElement.parentElement;
    if (!parent) return;

    const resize = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (!width || !height) return;
      gl.setPixelRatio(window.devicePixelRatio);
      gl.setSize(width, height, false);
      if ('aspect' in camera) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    window.addEventListener('resize', resize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, [gl, camera]);

  return null;
}

function TechOrb() {
  const coreRef = useRef<Mesh | null>(null);
  const ringRef = useRef<Mesh | null>(null);
  const group = useRef<Group | null>(null);

  const nodes = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => {
        const phi = Math.acos(1 - 2 * (index + 1) / 19);
        const theta = Math.PI * (1 + Math.sqrt(5)) * (index + 1);
        return {
          x: 1.4 * Math.cos(theta) * Math.sin(phi),
          y: 1.4 * Math.sin(theta) * Math.sin(phi),
          z: 1.4 * Math.cos(phi),
        };
      }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.4;
      coreRef.current.rotation.x = t * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.35;
      ringRef.current.rotation.x = t * 0.15;
    }
    if (group.current) {
      group.current.rotation.y = t * 0.18;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.9, 40, 40]} />
        <meshStandardMaterial color="#60a5fa" wireframe emissive="#1e3a8a" emissiveIntensity={0.35} />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[1.2, 0.02, 16, 100]} />
        <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={0.6} />
      </mesh>
      <mesh rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[1.15, 0.02, 16, 100]} />
        <meshStandardMaterial color="#93c5fd" emissive="#0ea5e9" emissiveIntensity={0.4} />
      </mesh>
      {nodes.map((node, index) => (
        <mesh key={index} position={[node.x, node.y, node.z]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#e0f2fe" emissive="#38bdf8" emissiveIntensity={1.2} />
        </mesh>
      ))}
    </group>
  );
}

export function SceneCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 55 }} dpr={[1, 1.5]} className="h-full w-full">
      <ResizeSync />
      <color attach="background" args={["#0b1020"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 4, 4]} intensity={1.4} />
      <pointLight position={[-3, -2, 3]} intensity={1.1} color="#60a5fa" />
      <Stars radius={60} depth={30} count={900} factor={3} fade speed={0.5} />
      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.9}>
        <TechOrb />
      </Float>
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
