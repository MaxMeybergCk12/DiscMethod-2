import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { CoordinateGrid, FunctionPlot, RiemannSum } from './subComponents';

// Type definitions
interface Disc {
  key: string;
  position: [number, number, number];
  radius: number;
  height: number;
}

interface FunctionConfig {
  functionType: 'linear' | 'parabola' | 'semicircle';
  startX: number;
  endX: number;
  stepSize: number;
}

interface StepConfig {
  stepNumber: number;
  mode: '2D' | '3D';
  numberOfRectangles: number;
  description: string;
  cameraTilt?: [number, number, number]; // Camera position for this step
}

// Function configurations
export const functionConfigs = {
  linear: {
    functionType: 'linear' as const,
    startX: 0,
    endX: 2,
    stepSize: 0.05
  }
};

// Step configurations for all 12 steps
export const allStepConfigs: StepConfig[] = [
  // 2D Steps (1-6) - Show on X-Z plane (React Three Drei convention)
  { stepNumber: 1, mode: '2D', numberOfRectangles: 0, description: '2D Function', cameraTilt: [0, 0, 8] },
  { stepNumber: 2, mode: '2D', numberOfRectangles: 2, description: '2 Rectangles', cameraTilt: [0, 0, 8] },
  { stepNumber: 3, mode: '2D', numberOfRectangles: 4, description: '4 Rectangles', cameraTilt: [0, 0, 8] },
  { stepNumber: 4, mode: '2D', numberOfRectangles: 8, description: '8 Rectangles', cameraTilt: [0, 0, 8] },
  { stepNumber: 5, mode: '2D', numberOfRectangles: 16, description: '16 Rectangles', cameraTilt: [0, 0, 8] },
  { stepNumber: 6, mode: '2D', numberOfRectangles: 32, description: '32 Rectangles', cameraTilt: [0, 0, 8] },
  
  // 3D Steps (7-12) - Show on X-Z plane with Y-axis for height
  { stepNumber: 7, mode: '3D', numberOfRectangles: 0, description: '3D Function', cameraTilt: [8, 6, 8] },
  { stepNumber: 8, mode: '3D', numberOfRectangles: 2, description: '2 Discs', cameraTilt: [10, 8, 10] },
  { stepNumber: 9, mode: '3D', numberOfRectangles: 4, description: '4 Discs', cameraTilt: [12, 10, 12] },
  { stepNumber: 10, mode: '3D', numberOfRectangles: 8, description: '8 Discs', cameraTilt: [14, 12, 14] },
  { stepNumber: 11, mode: '3D', numberOfRectangles: 16, description: '16 Discs', cameraTilt: [16, 14, 16] },
  { stepNumber: 12, mode: '3D', numberOfRectangles: 32, description: '32 Discs', cameraTilt: [18, 16, 18] }
];

// 3D Riemann Sum component for discs
function ThreeDRiemannSum({ 
  numberOfRectangles, 
  startX, 
  endX, 
  functionType, 
  color = '#6b7280', 
  opacity = 0.7 
}: {
  numberOfRectangles: number;
  startX: number;
  endX: number;
  functionType: string;
  color?: string;
  opacity?: number;
}) {
  const rectangleWidth = (endX - startX) / numberOfRectangles;
  
  const calculateY = (x: number) => {
    switch (functionType) {
      case 'linear':
        return 2 - x;
      case 'parabola':
        return x * x;
      case 'semicircle':
        return Math.sqrt(4 - x * x);
      default:
        return 2 - x;
    }
  };

  const generateDiscs = (): Disc[] => {
    const discs: Disc[] = [];
    for (let i = 0; i < numberOfRectangles; i++) {
      const x = startX + i * rectangleWidth;
      const y = calculateY(x);
      const radius = y;
      const height = rectangleWidth;
      
      discs.push({
        key: `disc-${i}`,
        position: [x + rectangleWidth / 2, 0, 0],
        radius,
        height
      });
    }
    return discs;
  };

  const discs = generateDiscs();

  return (
    <group>
      {discs.map((disc) => (
        <mesh 
          key={disc.key} 
          position={disc.position}
          rotation={[Math.PI/2, 0, Math.PI / 2] } // DO NOT CHANGE, Cylindeders work hewre :D
        >
          <cylinderGeometry args={[disc.radius, disc.radius, disc.height, 32]} />
          <meshStandardMaterial color={color} opacity={opacity} transparent={true} />
        </mesh>
      ))}
    </group>
  );
}

// Main visualization component
function StepVisualization({ stepConfig, functionConfig }: { stepConfig: StepConfig; functionConfig: FunctionConfig }) {
  const is3D = stepConfig.mode === '3D';
  
  return (
    <group>
      <CoordinateGrid 
        size={8} 
        showZAxis={true} 
        gridRotation={[Math.PI / 2, 0, 0]} 
        axisLength={8} 
        showLabels={true} 
      />
      
      <FunctionPlot 
        functionType={functionConfig.functionType}
        startX={functionConfig.startX}
        endX={functionConfig.endX}
        stepSize={functionConfig.stepSize}
        color="#10b981"
        lineWidth={3}
        showLabel={true}
        labelPosition={[2, 2, 0]} // IMPORTANT: This is the position of the wequation itself
        labelSize={0.3}
      />
      
      {stepConfig.numberOfRectangles > 0 && (
        is3D ? (
          <ThreeDRiemannSum 
            numberOfRectangles={stepConfig.numberOfRectangles}
            startX={functionConfig.startX}
            endX={functionConfig.endX}
            functionType={functionConfig.functionType}
            color="#6b7280"
            opacity={0.7}
          />
        ) : (
          <RiemannSum 
            numberOfRectangles={stepConfig.numberOfRectangles}
            startX={functionConfig.startX}
            endX={functionConfig.endX}
            functionType={functionConfig.functionType}
            color="#6b7280"
            opacity={0.7}
          />
        )
      )}
    </group>
  );
}

// Main StepManager component
function StepManager({ 
  functionConfig = functionConfigs.linear, 
  currentStep = 1 
}: {
  functionConfig?: FunctionConfig;
  currentStep?: number;
}) {
  const currentStepConfig = allStepConfigs.find(step => step.stepNumber === currentStep) || allStepConfigs[0];
  const is3D = currentStepConfig.mode === '3D';
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2">
      <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden">
        <Canvas 
          camera={{ 
            position: currentStepConfig.cameraTilt || [0, 0, 8], 
            fov: 60
          }} 
          style={{ background: '#f8fafc' }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          
          <StepVisualization 
            stepConfig={currentStepConfig} 
            functionConfig={functionConfig} 
          />
          
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={true} 
            enableDamping={true} 
            dampingFactor={0.05} 
          />
        </Canvas>
      </div>
    </div>
  );
}

export default StepManager;
