import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ── Multi-octave noise for blob deformation ──
function noise3D(x: number, y: number, z: number, t: number): number {
  return (
    Math.sin(x * 1.5 + t * 0.5) * Math.cos(y * 1.8 + t * 0.4) * Math.sin(z * 2.0 + t * 0.3) * 0.5 +
    Math.sin(x * 3.2 - t * 0.55) * Math.cos(z * 2.6 + t * 0.45) * 0.3 +
    Math.cos(y * 3.8 + t * 0.35) * Math.sin(x * 2.3 - t * 0.5) * 0.2
  ) * 0.25;
}

// ── Morphing wireframe blob (Stripe / Vercel inspired) ──
function MorphingBlob() {
  const meshRef = useRef<THREE.Mesh>(null);
  const origPos = useRef<Float32Array | null>(null);

  const geo = useMemo(() => {
    const g = new THREE.SphereGeometry(2.6, 64, 48);
    origPos.current = new Float32Array(g.attributes.position.array);
    return g;
  }, []);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh || !origPos.current) return;
    const t = state.clock.elapsedTime;
    const posAttr = mesh.geometry.attributes.position;
    const orig = origPos.current;

    for (let i = 0; i < posAttr.count; i++) {
      const ix = i * 3;
      const x = orig[ix], y = orig[ix + 1], z = orig[ix + 2];
      const len = Math.sqrt(x * x + y * y + z * z) || 0.001;
      const d = noise3D(x, y, z, t);
      posAttr.array[ix] = x + (x / len) * d;
      posAttr.array[ix + 1] = y + (y / len) * d;
      posAttr.array[ix + 2] = z + (z / len) * d;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} geometry={geo}>
      <meshBasicMaterial color="#F28A57" wireframe transparent opacity={0.09} />
    </mesh>
  );
}

// ── Inner solid-ish orb (subtle glow inside the blob) ──
function InnerOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.06;
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.25) * 0.15;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={meshRef} position={[0, 0.3, -0.5]}>
        <icosahedronGeometry args={[1.7, 5]} />
        <MeshDistortMaterial
          color="#F28A57"
          distort={0.35}
          speed={1.8}
          transparent
          opacity={0.05}
          wireframe
        />
      </mesh>
    </Float>
  );
}

// ── Thin orbit ring ──
function OrbitRing() {
  const ringRef = useRef<THREE.Mesh>(null);
  const ringGeo = useMemo(() => new THREE.TorusGeometry(5.5, 0.012, 16, 180), []);

  useFrame((state) => {
    if (!ringRef.current) return;
    const t = state.clock.elapsedTime;
    ringRef.current.rotation.x = 1.1 + Math.sin(t * 0.12) * 0.25;
    ringRef.current.rotation.y = t * 0.07;
    ringRef.current.rotation.z = Math.cos(t * 0.15) * 0.3;
  });

  return (
    <mesh ref={ringRef} position={[0, 0, -4]}>
      <primitive object={ringGeo} attach="geometry" />
      <meshBasicMaterial color="#5F7F9A" transparent opacity={0.06} />
    </mesh>
  );
}

// ── Floating accent shapes ──
interface AccentCfg {
  type: 'icosahedron' | 'octahedron' | 'torusKnot' | 'torus';
  position: [number, number, number];
  scale: number;
  color: string;
  opacity: number;
  floatSpeed: number;
  floatRotation: number;
}

const ACCENTS: AccentCfg[] = [
  { type: 'torusKnot', position: [5, 2, -3], scale: 1.0, color: '#F28A57', opacity: 0.07, floatSpeed: 1.0, floatRotation: 0.3 },
  { type: 'icosahedron', position: [-4.5, -1.5, -2.5], scale: 0.9, color: '#5F7F9A', opacity: 0.08, floatSpeed: 1.3, floatRotation: 0.25 },
  { type: 'octahedron', position: [4, -3.5, -3], scale: 0.75, color: '#6C8AA3', opacity: 0.07, floatSpeed: 1.5, floatRotation: 0.35 },
  { type: 'torus', position: [-3.5, 4.5, -1.5], scale: 0.85, color: '#F28A57', opacity: 0.06, floatSpeed: 0.9, floatRotation: 0.2 },
  { type: 'icosahedron', position: [5.5, -5.5, -3.5], scale: 0.6, color: '#5F7F9A', opacity: 0.07, floatSpeed: 1.6, floatRotation: 0.4 },
];

function AccentShape({ type, position: pos, scale, color, opacity, floatSpeed, floatRotation }: AccentCfg) {
  const edgeGeo = useMemo(() => {
    let geo: THREE.BufferGeometry;
    switch (type) {
      case 'torusKnot':
        geo = new THREE.TorusKnotGeometry(1, 0.28, 80, 12);
        break;
      case 'icosahedron':
        geo = new THREE.IcosahedronGeometry(1, 0);
        break;
      case 'octahedron':
        geo = new THREE.OctahedronGeometry(1, 0);
        break;
      case 'torus':
        geo = new THREE.TorusGeometry(1, 0.28, 16, 48);
        break;
    }
    return new THREE.EdgesGeometry(geo);
  }, [type]);

  return (
    <Float speed={floatSpeed} rotationIntensity={floatRotation} floatIntensity={0.4}>
      <group position={pos} scale={scale}>
        <lineSegments geometry={edgeGeo}>
          <lineBasicMaterial color={color} transparent opacity={opacity} />
        </lineSegments>
        <lineSegments geometry={edgeGeo} scale={[1.22, 1.22, 1.22]}>
          <lineBasicMaterial color={color} transparent opacity={opacity * 0.3} />
        </lineSegments>
      </group>
    </Float>
  );
}

// ── Mouse parallax camera ──
function MouseParallax() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(({ camera }) => {
    camera.position.x += (mouse.current.x * 0.7 - camera.position.x) * 0.025;
    camera.position.y += (mouse.current.y * 0.4 + 0.3 - camera.position.y) * 0.025;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ── Scene ──
function Scene() {
  return (
    <>
      <Stars radius={30} depth={20} count={400} factor={3} saturation={0} fade speed={0.3} />
      <MorphingBlob />
      <InnerOrb />
      <OrbitRing />
      {ACCENTS.map((a, i) => (
        <AccentShape key={i} {...a} />
      ))}
      <MouseParallax />
    </>
  );
}

// ── Export ──
export default function ThreeBackground() {
  return (
    <Canvas
      className="three-canvas pointer-events-none fixed inset-0 z-0"
      camera={{ position: [0, 0, 12], fov: 60, near: 0.5, far: 60 }}
      gl={{ alpha: true, antialias: true, stencil: false, depth: false }}
      dpr={[1, 2]}
    >
      <Scene />
    </Canvas>
  );
}
