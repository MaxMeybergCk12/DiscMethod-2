import React from 'react';
import { Grid, Text } from '@react-three/drei';

function CoordinateGrid({ 
  size = 8, 
  showZAxis = false, 
  gridRotation = [Math.PI / 2, 0, 0],
  axisLength = 8,
  showLabels = true 
}) {
  return (
    <group>
      {/* Grid for reference - facing X-Y plane by default */}
      <Grid 
        args={[size, size]} 
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
        rotation={gridRotation}
      />
      
      {/* X axis (red) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[axisLength, 0.02, 0.02]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      
      {/* Y axis (blue) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.02, axisLength, 0.02]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      
      {/* Z axis (purple) - optional */}
      {showZAxis && (
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.02, 0.02, axisLength]} />
          <meshStandardMaterial color="#8b5cf6" />
        </mesh>
      )}
      
      {/* Axis labels - optional */}
      {showLabels && (
        <>
          <Text position={[axisLength/2, -0.5, 0]} fontSize={0.5} color="#ef4444">
            x
          </Text>
          <Text position={[-0.5, axisLength/2, 0]} fontSize={0.5} color="#3b82f6">
            y
          </Text>
          {showZAxis && (
            <Text position={[-0.5, 0, axisLength/2]} fontSize={0.5} color="#8b5cf6">
              z
            </Text>
          )}
        </>
      )}
    </group>
  );
}

export default CoordinateGrid;
