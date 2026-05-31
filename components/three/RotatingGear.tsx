"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Torus } from "@react-three/drei";
import * as THREE from "three";

function Gear() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z += 0.01;
    }
  });

  return (
    <Torus ref={ref} args={[1.2, 0.35, 16, 32]}>
      <meshStandardMaterial color="#ed1d24" metalness={0.8} roughness={0.3} />
    </Torus>
  );
}

export default function RotatingGear({ className }: { className?: string }) {
  return (
    <div className={className ?? "h-32 w-32"}>
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Gear />
      </Canvas>
    </div>
  );
}
