import React, { useRef, useState, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Component for the hanging bulb (cable + sphere)
function Bulb({ position }: { position: THREE.Vector3 }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const cableRef = useRef<THREE.Group | null>(null);;
  const bulbSphereRef = useRef<THREE.Group | null>(null);;

  // State for drag-based sway animation
  const [isDragging, setIsDragging] = useState(false);
  
  // Physics for sway: current rotation, velocity
  const rotation = useRef(new THREE.Euler(0,0,0)); // Current actual rotation
  const velocity = useRef(new THREE.Euler(0,0,0)); // Speed of rotation change
  
  const { mouse, viewport } = useThree();

  // Cable parameters
  const cableHeight = 1.3; // Cable length
  const cableRadius = 0.025;

  // Bulb parameters
  const bulbRadius = 0.25;

  // Event handlers for dragging
const onPointerDown = useCallback((event: React.PointerEvent<THREE.Group>) => {
    event.stopPropagation();
    setIsDragging(true);
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
    // When dragging starts, we can reduce the influence of existing velocity
    // or set the target rotation directly based on mouse to make it more responsive.
}, []);

const onPointerUp = useCallback((event: React.PointerEvent<THREE.Group>) => {
    event.stopPropagation();
    setIsDragging(false);
    (event.target as HTMLElement).releasePointerCapture(event.pointerId);
}, []);

const onPointerOut = useCallback((event: React.PointerEvent<THREE.Group>) => {
    if (isDragging) {
            event.stopPropagation();
            setIsDragging(false);
            (event.target as HTMLElement).releasePointerCapture(event.pointerId);
    }
}, [isDragging]);


  // Animation loop for swaying with improved physics
  useFrame((state) => {
    if (groupRef.current) {
      let targetX = 0;
      let targetZ = 0;

      if (isDragging) {
        // When dragging, set the target rotation based on mouse
        const swayIntensity = 0.4; 
        targetX = (mouse.y * viewport.height / 2) * swayIntensity * 0.1;
        targetZ = (mouse.x * viewport.width / 2) * swayIntensity * 0.1;
        
        // Smoothly interpolate towards the mouse target during drag
        rotation.current.x = THREE.MathUtils.lerp(rotation.current.x, targetX, 0.2);
        rotation.current.z = THREE.MathUtils.lerp(rotation.current.z, targetZ, 0.2);
        // Dampen velocity quickly when actively dragging to avoid "fighting" the mouse
        velocity.current.x *= 0.8; 
        velocity.current.z *= 0.8;

      } else {
        // When not dragging, spring back to center (0,0,0)
        const springStiffness = 0.01; // Softer spring
        const dampingFactor = 0.82;  // Slightly more damping

        // Calculate spring force towards resting position (0,0,0 for x and z)
        const forceX = (0 - rotation.current.x) * springStiffness;
        const forceZ = (0 - rotation.current.z) * springStiffness;

        // Apply force to velocity
        velocity.current.x += forceX;
        velocity.current.z += forceZ;

        // Apply damping to velocity
        velocity.current.x *= dampingFactor;
        velocity.current.z *= dampingFactor;

        // Update rotation based on velocity
        rotation.current.x += velocity.current.x;
        rotation.current.z += velocity.current.z;
      }

      // Apply the calculated rotation to the group
      groupRef.current.rotation.x = rotation.current.x;
      groupRef.current.rotation.z = rotation.current.z;

      // Subtle up/down bobbing motion for the bulb
      if (bulbSphereRef.current && cableRef.current) {
         const bobbleFactor = Math.sin(state.clock.elapsedTime * 1.5) * 0.015;
         cableRef.current.position.set(0, -cableHeight / 2, 0);
         bulbSphereRef.current.position.set(0, -cableHeight + bobbleFactor, 0);
      }
    }
  });

  return (
    <group 
        ref={groupRef} 
        position={position} 
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerOut={onPointerOut}
    >
      {/* Cable */}
      <mesh ref={cableRef} castShadow>
        <cylinderGeometry args={[cableRadius, cableRadius, cableHeight, 8]} />
        <meshStandardMaterial color="#404040" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* Bulb Sphere - Increased emissiveIntensity */}
      <mesh ref={bulbSphereRef} castShadow>
        <sphereGeometry args={[bulbRadius, 32, 32]} />
        <meshStandardMaterial emissive="#FFFFE0" emissiveIntensity={2.8} color="#FFFFE0" roughness={0.4}/>
      </mesh>
      
      {/* PointLight parented to the bulb for local glow - Increased intensity */}
      <pointLight 
        color="#FFFFE0" 
        intensity={isDragging ? 22 : 18} // Brighter point light
        distance={7.5} // Slightly larger reach
        decay={2} 
        position={[0, -cableHeight, 0]} 
      />
    </group>
  );
}


// Component for the floor plane
function Floor() {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
      <planeGeometry args={[100, 100]} />
      {/* Slightly lighter floor to catch more of the ambient light */}
      <meshStandardMaterial color="#181828" metalness={0.1} roughness={0.9} />
    </mesh>
  );
}

// Main Scene Component
export default function LandingScene() {
  const bulbPosition = useMemo(() => new THREE.Vector3(0, 3.0, 0.5), []);
  const sceneBackgroundColor = useMemo(() => new THREE.Color('#0A0A18'), []); // Kept dark for contrast

  return (
    <Canvas
      shadows 
      camera={{ position: [0, 2.5, 8], fov: 50, near: 0.5, far: 100 }} // Camera slightly adjusted
      style={{ background: sceneBackgroundColor.getStyle(), position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      onCreated={({ scene}) => {
        scene.background = sceneBackgroundColor;
        scene.fog = new THREE.FogExp2(sceneBackgroundColor, 0.060); // Slightly less dense fog
        // gl.shadowMap.type = THREE.PCFSoftShadowMap; // Optional: for softer shadows
      }}
    >
      {/* Ambient light: Increased intensity for softer corners and overall brightness */}
      <ambientLight intensity={0.35} color="#E0E0FF" /> 

      {/* Directional light: casts main shadows, increased intensity */}
      <directionalLight
        castShadow
        position={[1.5, 4.5, 3.5]} 
        intensity={2.5} 
        color="#FFFFFF"
        shadow-mapSize-width={2048} 
        shadow-mapSize-height={2048}
        shadow-camera-far={60} 
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-bias={-0.0005}
      />
      
      <Bulb position={bulbPosition} />
   
      <Floor />

    </Canvas>
  );
}
