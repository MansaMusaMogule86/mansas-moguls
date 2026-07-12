"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

export function EmpirePlanet() {
  const groupRef = useRef<THREE.Group>(null);
  const shouldReduceMotion = useReducedMotion();

  useFrame((state, delta) => {
    if (groupRef.current && !shouldReduceMotion) {
      // "Rotation duration between 80 and 140 seconds" -> approx 0.05 rad/s
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Base dark sphere */}
      <Sphere args={[3, 64, 64]}>
        <meshStandardMaterial 
          color="#020308" 
          roughness={0.8}
          metalness={0.2}
        />
      </Sphere>

      {/* Wireframe / Grid Layer */}
      <Sphere args={[3.01, 32, 32]}>
        <meshBasicMaterial 
          color="#101828" 
          wireframe
          transparent
          opacity={0.3}
        />
      </Sphere>

      {/* Atmospheric Rim Glow */}
      <Sphere args={[3.15, 64, 64]}>
        <meshBasicMaterial 
          color="#3b82f6"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
    </group>
  );
}
