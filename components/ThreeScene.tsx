
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  MeshDistortMaterial, 
  Sphere, 
  OrbitControls, 
  Stars, 
  PerspectiveCamera, 
  Grid, 
  Text, 
  Environment,
  ContactShadows,
  MeshWobbleMaterial
} from '@react-three/drei';
import * as THREE from 'three';

interface SceneProps {
  primaryColor: string;
  secondaryColor: string;
}

const FloatingCubes = ({ color }: { color: string }) => {
  const count = 40;
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -10 + Math.random() * 20;
      const yFactor = -10 + Math.random() * 20;
      const zFactor = -10 + Math.random() * 20;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={color} roughness={0} metalness={1} transparent opacity={0.6} />
    </instancedMesh>
  );
};

const CentralCore: React.FC<SceneProps> = ({ primaryColor, secondaryColor }) => {
  const coreRef = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    coreRef.current.rotation.y = time * 0.5;
    coreRef.current.position.y = Math.sin(time) * 0.2;
  });

  return (
    <group ref={coreRef}>
      <Float speed={5} rotationIntensity={2} floatIntensity={2}>
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color={primaryColor}
            emissive={primaryColor}
            emissiveIntensity={0.5}
            speed={4}
            distort={0.4}
            radius={1}
          />
        </Sphere>
      </Float>
      
      {/* Outer Rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.02, 16, 100]} />
        <meshStandardMaterial color={secondaryColor} emissive={secondaryColor} emissiveIntensity={2} />
      </mesh>
      <mesh rotation={[Math.PI / 2.5, Math.PI / 4, 0]}>
        <torusGeometry args={[2.2, 0.01, 16, 100]} />
        <meshStandardMaterial color={primaryColor} emissive={primaryColor} emissiveIntensity={1} />
      </mesh>
    </group>
  );
};

const ThreeScene: React.FC<SceneProps> = ({ primaryColor, secondaryColor }) => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 2, 8], fov: 45 }}>
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 5, 20]} />
        
        <ambientLight intensity={0.2} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={2} 
          castShadow 
          color={primaryColor}
        />
        <pointLight position={[-10, -5, -10]} color={secondaryColor} intensity={3} />
        
        <CentralCore primaryColor={primaryColor} secondaryColor={secondaryColor} />
        <FloatingCubes color={secondaryColor} />
        
        {/* Infinite Grid to show 3D perspective */}
        <Grid
          renderOrder={-1}
          position={[0, -2, 0]}
          infiniteGrid
          cellSize={1}
          cellThickness={1}
          sectionSize={3}
          sectionThickness={1.5}
          sectionColor={primaryColor}
          fadeDistance={30}
        />

        <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />
        
        <ContactShadows 
          position={[0, -2, 0]} 
          opacity={0.4} 
          scale={20} 
          blur={2} 
          far={4.5} 
          color={primaryColor}
        />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.5}
        />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
