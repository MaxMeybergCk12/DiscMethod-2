import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { CoordinateGrid, FunctionPlot, RiemannSum } from './subComponents';

// Interface for function configuration
interface FunctionConfig {
  functionType: 'linear' | 'parabola' | 'semicircle' | 'custom';
  startX: number;
  endX: number;
  stepSize?: number;
  color?: string;
  lineWidth?: number;
  labelPosition?: [number, number, number];
  labelSize?: number;
}

// Interface for step configuration
interface StepConfig {
  numberOfRectangles: number;
  stepNumber: number;
  description: string;
}

// Default function configurations
const defaultFunctions = {
  linear: { functionType: 'linear' as const, startX: 0, endX: 2, stepSize: 0.05 },
  parabola: { functionType: 'parabola' as const, startX: -2, endX: 2, stepSize: 0.05 },
  semicircle: { functionType: 'semicircle' as const, startX: -2, endX: 2, stepSize: 0.05 }
};

// Step configurations for the 6 steps
const stepConfigs: StepConfig[] = [
  { numberOfRectangles: 0, stepNumber: 1, description: "2D Function Visualization" },
  { numberOfRectangles: 2, stepNumber: 2, description: "2 Rectangles Approximation" },
  { numberOfRectangles: 4, stepNumber: 3, description: "4 Rectangles Approximation" },
  { numberOfRectangles: 8, stepNumber: 4, description: "8 Rectangles Approximation" },
  { numberOfRectangles: 16, stepNumber: 5, description: "16 Rectangles Approximation" },
  { numberOfRectangles: 32, stepNumber: 6, description: "32 Rectangles Approximation" }
];

// Main visualization component
function TwoDVisualization({ 
  functionConfig, 
  stepConfig 
}: { 
  functionConfig: FunctionConfig; 
  stepConfig: StepConfig; 
}) {
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
      
      {/* Show rectangles only if stepConfig specifies them */}
      {stepConfig.numberOfRectangles > 0 && (
        <RiemannSum 
          numberOfRectangles={stepConfig.numberOfRectangles}
          startX={functionConfig.startX}
          endX={functionConfig.endX}
          functionType={functionConfig.functionType}
          color="#6b7280"
          opacity={0.7}
        />
      )}
    </group>
  );
}

// Main TwoDSteps component
function TwoDSteps({ 
  functionConfig = defaultFunctions.linear,
  currentStep = 1 
}: { 
  functionConfig?: FunctionConfig; 
  currentStep?: number; 
}) {
  // Find the current step configuration
  const currentStepConfig = stepConfigs.find(step => step.stepNumber === currentStep) || stepConfigs[0];
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2">
      <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden">
        <Canvas
          camera={{ position: [0, 0, 12], fov: 50 }}
          style={{ background: '#f8fafc' }}
        >
          <ambientLight intensity={0.6} />
          
          <TwoDVisualization 
            functionConfig={functionConfig}
            stepConfig={currentStepConfig}
          />
          
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

export default TwoDSteps;
export { defaultFunctions, stepConfigs };
export type { FunctionConfig, StepConfig };
