import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { CoordinateGrid, FunctionPlot, RiemannSum } from './subComponents';

// Interface for 3D function configuration
interface ThreeDFunctionConfig {
  functionType: 'linear' | 'parabola' | 'semicircle';
  startX: number;
  endX: number;
  stepSize?: number;
  color?: string;
  lineWidth?: number;
  labelPosition?: [number, number, number];
  labelSize?: number;
}

// Interface for 3D step configuration
interface ThreeDStepConfig {
  numberOfRectangles: number;
  stepNumber: number;
  description: string;
  show3D?: boolean;
}

// Default 3D function configurations
const default3DFunctions = {
  linear: { functionType: 'linear' as const, startX: 0, endX: 2, stepSize: 0.05 }
};

// 3D Step configurations - same as 2D but with 3D option
const threeDStepConfigs: ThreeDStepConfig[] = [
  { numberOfRectangles: 0, stepNumber: 1, description: "3D Function Visualization", show3D: false },
  { numberOfRectangles: 2, stepNumber: 2, description: "2 Discs Approximation", show3D: true },
  { numberOfRectangles: 4, stepNumber: 3, description: "4 Discs Approximation", show3D: true },
  { numberOfRectangles: 8, stepNumber: 4, description: "8 Discs Approximation", show3D: true },
  { numberOfRectangles: 16, stepNumber: 5, description: "16 Discs Approximation", show3D: true },
  { numberOfRectangles: 32, stepNumber: 6, description: "32 Discs Approximation", show3D: true }
];

// 3D Riemann Sum component that creates spinning discs
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
  functionType: 'linear' | 'parabola' | 'semicircle';
  color?: string;
  opacity?: number;
}) {
  // Calculate rectangle width based on number of rectangles
  const rectangleWidth = (endX - startX) / numberOfRectangles;
  
  // Function to calculate y value based on type
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
  
  // Generate 3D discs automatically
  const generateDiscs = () => {
    const discs = [];
    
    for (let i = 0; i < numberOfRectangles; i++) {
      // Calculate x position (center of rectangle)
      const x = startX + (i * rectangleWidth) + (rectangleWidth / 2);
      
      // Calculate y value from the selected function
      const y = calculateY(x);
      
      // Create a disc (cylinder) at this position
      discs.push({
        position: [x, 0, 0],
        radius: y,
        height: rectangleWidth,
        key: i
      });
    }
    
    return discs;
  };

  const discs = generateDiscs();

  return (
    <group>
      {discs.map((disc) => (
        <mesh key={disc.key} position={disc.position}>
          <cylinderGeometry args={[disc.radius, disc.radius, disc.height, 32]} />
          <meshStandardMaterial color={color} opacity={opacity} transparent={true} />
        </mesh>
      ))}
    </group>
  );
}

// Main 3D visualization component
function ThreeDVisualization({ 
  functionConfig, 
  stepConfig 
}: { 
  functionConfig: ThreeDFunctionConfig; 
  stepConfig: ThreeDStepConfig; 
}) {
  return (
    <group>
      {/* 3D coordinate grid - note: X-Y plane becomes X-Z in 3D */}
      <CoordinateGrid 
        size={8}
        showZAxis={true}  // Show Z-axis for 3D
        gridRotation={[Math.PI / 2, 0, 0]}  // Keep X-Z plane
        axisLength={8}
        showLabels={true}
      />
      
      {/* Function plot - still 2D but positioned in 3D space */}
      <FunctionPlot 
        functionType={functionConfig.functionType}
        startX={functionConfig.startX}
        endX={functionConfig.endX}
        stepSize={functionConfig.stepSize || 0.05}
        color={functionConfig.color || '#10b981'}
        lineWidth={functionConfig.lineWidth || 4}
        showLabel={true}
        labelPosition={functionConfig.labelPosition || [2.5, 2.5, 0]}
        labelSize={functionConfig.labelSize || 0.3}
      />
      
      {/* Show 3D discs if stepConfig specifies them */}
      {stepConfig.show3D && stepConfig.numberOfRectangles > 0 && (
        <ThreeDRiemannSum 
          numberOfRectangles={stepConfig.numberOfRectangles}
          startX={functionConfig.startX}
          endX={functionConfig.endX}
          functionType={functionConfig.functionType}
          color={color}
          opacity={0.7}
        />
      )}
    </group>
  );
}

// Main ThreeDSteps component
function ThreeDSteps({ 
  functionConfig = default3DFunctions.linear,
  currentStep = 1 
}: { 
  functionConfig?: ThreeDFunctionConfig; 
  currentStep?: number; 
}) {
  // Find the current step configuration
  const currentStepConfig = threeDStepConfigs.find(step => step.stepNumber === currentStep) || threeDStepConfigs[0];
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2">
      <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden">
        <Canvas
          camera={{ position: [8, 6, 8], fov: 50 }}  // 3D camera angle
          style={{ background: '#f8fafc' }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          
          <ThreeDVisualization 
            functionConfig={functionConfig}
            stepConfig={currentStepConfig}
          />
          
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}  // Enable rotation for 3D
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Canvas>
      </div>
    </div>
  );
}

export default ThreeDSteps;
export { default3DFunctions, threeDStepConfigs };
export type { ThreeDFunctionConfig, ThreeDStepConfig };
