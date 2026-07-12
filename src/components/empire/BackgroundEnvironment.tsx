"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Float, Stars } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

function VolumetricFog() {
  const fogRef = useRef<THREE.Mesh>(null);

  // Rotate slowly
  useFrame((state, delta) => {
    if (fogRef.current) {
      fogRef.current.rotation.y += delta * 0.05;
      fogRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <mesh ref={fogRef} scale={1.5}>
      <sphereGeometry args={[15, 64, 64]} />
      <meshStandardMaterial
        color="#0a0e1a"
        transparent
        opacity={0.3}
        roughness={1}
        depthWrite={false}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

function FloatingEnergyRivers() {
  const linesRef = useRef<THREE.Group>(null);
  
  const [lines, setLines] = useState<THREE.Vector3[][]>([]);
  
  useEffect(() => {
    const generatedLines = new Array(5).fill(0).map(() => {
      const points = [];
      for (let i = 0; i < 50; i++) {
        points.push(
          new THREE.Vector3(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 10 - 5
          )
        );
      }
      const curve = new THREE.CatmullRomCurve3(points);
      return curve.getPoints(100);
    });
    setTimeout(() => setLines(generatedLines), 0);
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={linesRef}>
      {lines.map((points, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color={i % 2 === 0 ? "#d4af37" : "#2b54f0"} transparent opacity={0.1} />
        </line>
      ))}
    </group>
  );
}

export function BackgroundEnvironment() {
  return (
    <div className="absolute inset-0 -z-10 bg-[#04050a] overflow-hidden">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <color attach="background" args={["#04050a"]} />
        <fog attach="fog" args={["#04050a", 5, 20]} />
        
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} color="#d4af37" />
        <directionalLight position={[-5, -10, -5]} intensity={1} color="#2b54f0" />
        
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
          <VolumetricFog />
        </Float>
        
        <FloatingEnergyRivers />
        
        {/* Golden dust */}
        <Sparkles count={300} scale={15} size={2} speed={0.4} color="#f4dd9e" opacity={0.2} />
        {/* Blue light leaks / particles */}
        <Sparkles count={200} scale={20} size={4} speed={0.2} color="#4f73ff" opacity={0.1} />
        
        <Stars radius={20} depth={50} count={1000} factor={4} saturation={0} fade speed={0.5} />
      </Canvas>
      
      {/* CSS overlay for extra cinematic grading */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(4,5,10,0)_0%,rgba(4,5,10,0.8)_100%)] pointer-events-none" />
    </div>
  );
}
