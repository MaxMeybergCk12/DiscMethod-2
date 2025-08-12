import React from 'react';
import { Text } from '@react-three/drei';

function FunctionPlot({ 
  functionType = 'linear',
  startX = 0, 
  endX = 2, 
  stepSize = 0.05,
  color = '#10b981',
  lineWidth = 2,
  showLabel = true,
  labelPosition = [2.5, 2.5, 0],
  labelSize = 0.3
}) {
  
  // Generate function points based on type
  const generatePoints = () => {
    const points = [];
    
    switch (functionType) {
      case 'linear':
        // y = 2 - x (default cone function)
        for (let x = startX; x <= endX; x += stepSize) {
          const y = 2 - x;
          points.push(x, y, 0);
        }
        break;
        
      case 'parabola':
        // y = x²
        for (let x = startX; x <= endX; x += stepSize) {
          const y = x * x;
          points.push(x, y, 0);
        }
        break;
        
      case 'semicircle':
        // y = √(4 - x²) from x = -2 to x = 2
        for (let x = startX; x <= endX; x += stepSize) {
          const y = Math.sqrt(4 - x * x);
          points.push(x, y, 0);
        }
        break;
        
      case 'custom':
        // For custom functions, you can pass a function as a prop
        break;
        
      default:
        // Default linear function
        for (let x = startX; x <= endX; x += stepSize) {
          const y = 2 - x;
          points.push(x, y, 0);
        }
    }
    
    return points;
  };

  const points = generatePoints();
  const functionLabel = getFunctionLabel(functionType);

  return (
    <group>
      {/* Function curve */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length / 3}
            array={new Float32Array(points)}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={color} linewidth={lineWidth} />
      </line>
      
      {/* Function label */}
      {showLabel && (
        <Text position={labelPosition} fontSize={labelSize} color={color}>
          {functionLabel}
        </Text>
      )}
    </group>
  );
}

// Helper function to get function labels
function getFunctionLabel(functionType) {
  switch (functionType) {
    case 'linear':
      return 'y = 2 - x';
    case 'parabola':
      return 'y = x²';
    case 'semicircle':
      return 'y = √(4 - x²)';
    default:
      return 'y = 2 - x';
  }
}

export default FunctionPlot;
