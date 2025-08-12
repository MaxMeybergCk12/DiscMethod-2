import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, Text } from '@react-three/drei';

function FunctionCurve() {
  // Create points for the function y = 2 - x from x = 0 to x = 2
  // This creates a straight line that when rotated makes a cone - perfect for beginners!
  const points = [];
  for (let x = 0; x <= 2; x += 0.05) {
    const y = 2 - x; // Linear function: starts at y=2, goes down to y=0
    points.push(x, y, 0);
  }

  return (
    <group>
      {/* Grid for reference - facing X-Y plane */}
      <Grid 
        args={[8, 8]} 
        cellSize={1} 
        cellThickness={0.5} 
        cellColor="#e5e7eb" 
        sectionSize={1} 
        sectionThickness={1} 
        sectionColor="#d1d5db"
        fadeDistance={25}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={true}
        rotation={[Math.PI / 2, 0, 0]}  // Rotate 90° around X-axis to face X-Y plane
      />
      
      {/* X axis (red) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[20, 0.02, 0.02]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      
      {/* Y axis (blue) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.02, 20, 0.02]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      
      {/* Function curve (parabola) using Line */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length / 3}
            array={new Float32Array(points)}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#10b981" linewidth={2} />
      </line>
      
      {/* Axis labels */}
      <Text position={[3, -0.5, 0]} fontSize={0.5} color="#ef4444">
        x
      </Text>
      <Text position={[-0.5, 3, 0]} fontSize={0.5} color="#3b82f6">
        y
      </Text>
      
      {/* Function label */}
      <Text position={[2.5, 2.5, 0]} fontSize={0.3} color="#10b981">
        y = 2 - x
      </Text>
    </group>
  );
}

function Step1_2DFunction() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2">
      <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden">
        <Canvas
          style={{ background: '#f8fafc' }}
        >
          <ambientLight intensity={0.6} />
          
          
          <FunctionCurve />
          
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={0}
          />
        </Canvas>
      </div>
    </div>
  );
}

export default Step1_2DFunction;
