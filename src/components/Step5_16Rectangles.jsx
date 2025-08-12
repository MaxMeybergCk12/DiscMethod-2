import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { CoordinateGrid, FunctionPlot, RiemannSum } from './subComponents';

function Step5Visualization() {
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
      
      {/* 16 rectangles using automated component */}
      <RiemannSum 
        numberOfRectangles={16}
        startX={0}
        endX={2}
        color="#6b7280"
        opacity={0.7}
      />
    </group>
  );
}

function Step5_16Rectangles() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2">
      <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden">
        <Canvas
          camera={{ position: [0, 0, 12], fov: 50 }}
          style={{ background: '#f8fafc' }}
        >
          <ambientLight intensity={0.6} />
          
          <Step5Visualization />
          
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

export default Step5_16Rectangles;
