import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { CoordinateGrid, FunctionPlot } from './subComponents';

function FinerRiemannSumVisualization() {
  return (
    <group>
      {/* Reusable coordinate grid */}
      <CoordinateGrid 
        size={8}
        showZAxis={false}
        gridRotation={[Math.PI / 2, 0, 0]}
        axisLength={8}
        showLabels={true}
      />
      
      {/* Reusable function plot */}
      <FunctionPlot 
        functionType="linear"
        startX={0}
        endX={2}
        stepSize={0.05}
        color="#10b981"
        lineWidth={4}
        showLabel={true}
        labelPosition={[2.5, 2.5, 0]}
        labelSize={0.3}
      />
      
      {/* Eight rectangles like finer Riemann sum */}
      <mesh position={[0.125, 0.9375, 0]}>
        <boxGeometry args={[0.25, 1.875, 0.1]} />
        <meshStandardMaterial color="#6b7280" opacity={0.7} transparent={true} />
      </mesh>
      
      <mesh position={[0.375, 0.8125, 0]}>
        <boxGeometry args={[0.25, 1.625, 0.1]} />
        <meshStandardMaterial color="#6b7280" opacity={0.7} transparent={true} />
      </mesh>
      
      <mesh position={[0.625, 0.6875, 0]}>
        <boxGeometry args={[0.25, 1.375, 0.1]} />
        <meshStandardMaterial color="#6b7280" opacity={0.7} transparent={true} />
      </mesh>
      
      <mesh position={[0.875, 0.5625, 0]}>
        <boxGeometry args={[0.25, 1.125, 0.1]} />
        <meshStandardMaterial color="#6b7280" opacity={0.7} transparent={true} />
      </mesh>
      
      <mesh position={[1.125, 0.4375, 0]}>
        <boxGeometry args={[0.25, 0.875, 0.1]} />
        <meshStandardMaterial color="#6b7280" opacity={0.7} transparent={true} />
      </mesh>
      
      <mesh position={[1.375, 0.3125, 0]}>
        <boxGeometry args={[0.25, 0.625, 0.1]} />
        <meshStandardMaterial color="#6b7280" opacity={0.7} transparent={true} />
      </mesh>
      
      <mesh position={[1.625, 0.1875, 0]}>
        <boxGeometry args={[0.25, 0.375, 0.1]} />
        <meshStandardMaterial color="#6b7280" opacity={0.7} transparent={true} />
      </mesh>
      
      <mesh position={[1.875, 0.0625, 0]}>
        <boxGeometry args={[0.25, 0.125, 0.1]} />
        <meshStandardMaterial color="#6b7280" opacity={0.7} transparent={true} />
      </mesh>
    </group>
  );
}

function Step4_FinerRiemannSum() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2">
      <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden">
        <Canvas
          camera={{ position: [0, 0, 12], fov: 50 }}
          style={{ background: '#f8fafc' }}
        >
          <ambientLight intensity={0.6} />
          
          <FinerRiemannSumVisualization />
          
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={false}
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Canvas>
      </div>
    </div>
  );
}

export default Step4_FinerRiemannSum;
