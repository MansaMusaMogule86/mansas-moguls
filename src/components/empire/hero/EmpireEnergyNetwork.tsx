"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { QuadraticBezierLine, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Generate random points on a sphere
function getPointsOnSphere(count: number, radius: number) {
  const points = [];
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    
    // Convert spherical to cartesian
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    
    points.push(new THREE.Vector3(x, y, z));
  }
  return points;
}

export function EmpireEnergyNetwork() {
  const radius = 3.02; // Slightly above planet surface
  const nodes = useMemo(() => getPointsOnSphere(15, radius), []);
  
  // Create connections
  const connections = useMemo(() => {
    const lines = [];
    for (let i = 0; i < nodes.length; i++) {
      // Connect to 2 random other nodes
      for (let j = 0; j < 2; j++) {
        const targetIdx = Math.floor(Math.random() * nodes.length);
        if (targetIdx !== i) {
          lines.push({ start: nodes[i], end: nodes[targetIdx] });
        }
      }
    }
    return lines;
  }, [nodes]);

  const groupRef = useRef<THREE.Group>(null);

  // Slowly pulse network
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.children.forEach((child, i) => {
        if (child.type === "Line") {
           // Basic pulsing material could go here if accessed
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {nodes.map((pos, i) => (
        <Sphere key={i} args={[0.03, 8, 8]} position={pos}>
          <meshBasicMaterial color="#d6aa38" toneMapped={false} />
        </Sphere>
      ))}

      {/* Connection Arcs */}
      {connections.map((conn, i) => {
        // Calculate a mid point that arches above the surface
        const mid = conn.start.clone().lerp(conn.end, 0.5).normalize().multiplyScalar(radius + 0.5);
        return (
          <QuadraticBezierLine
            key={i}
            start={conn.start}
            end={conn.end}
            mid={mid}
            color="#3b82f6"
            lineWidth={0.5}
            transparent
            opacity={0.6}
            dashed
            dashScale={5}
            dashSize={2}
            dashOffset={i} // We can animate this in useFrame for moving packets
          />
        );
      })}
    </group>
  );
}
