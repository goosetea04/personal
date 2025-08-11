// app/page.tsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useMemo } from "react";

function WavyRibbonGroup() {
  const groupRef = useRef<THREE.Group>(null);

  // Slowly rotate the whole group
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.rotation.x += 0.0015;
    }
  });

  const ribbons = useMemo(() => {
    const numRibbons = 10;
    const segments = 300;
    const a = 1.8; // horizontal radius
    const b = 0.8; // vertical radius
    const waveFrequency = 4;
    const waveAmplitude = 0.15;

    const color1 = new THREE.Color("red");
    const color2 = new THREE.Color("skyblue");

    const allRibbons = [];

    for (let j = 0; j < numRibbons; j++) {
      const offsetY = (j - numRibbons / 2) * 0.15;

      const points: THREE.Vector3[] = [];

      for (let i = 0; i <= segments; i++) {
        const t = (i / segments) * Math.PI * 2;
        const x = a * Math.cos(t);
        const y = offsetY + waveAmplitude * Math.sin(waveFrequency * t);
        const z = b * Math.sin(t);
        points.push(new THREE.Vector3(x, y, z));
      }

      const curve = new THREE.CatmullRomCurve3(points, true);
      const geometry = new THREE.TubeGeometry(curve, 800, 0.015, 6, true);

      const colors = [];
      for (let i = 0; i < geometry.attributes.position.count; i++) {
        const t = i / geometry.attributes.position.count;
        const color = color1.clone().lerp(color2, t);
        colors.push(color.r, color.g, color.b);
      }

      geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors, 3)
      );

      const material = new THREE.MeshBasicMaterial({
        vertexColors: true,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);
      allRibbons.push(mesh);
    }

    return allRibbons;
  }, []);

  return <group ref={groupRef}>{ribbons.map((mesh, i) => <primitive key={i} object={mesh} />)}</group>;
}

export default function Page() {
  return (
    <main className="h-screen w-screen bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight />
        <WavyRibbonGroup />
      </Canvas>
    </main>
  );
}
