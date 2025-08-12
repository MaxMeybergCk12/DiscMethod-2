import React from 'react';

function RiemannSum({ 
  numberOfRectangles = 2,
  startX = 0,
  endX = 2,
  color = '#6b7280',
  opacity = 0.7
}) {
  // Calculate rectangle width based on number of rectangles
  const rectangleWidth = (endX - startX) / numberOfRectangles;
  
  // Generate rectangles automatically
  const generateRectangles = () => {
    const rectangles = [];
    
    for (let i = 0; i < numberOfRectangles; i++) {
      // Calculate x position (center of rectangle)
      const x = startX + (i * rectangleWidth) + (rectangleWidth / 2);
      
      // Calculate y value from function y = 2 - x
      const y = 2 - x;
      
      // Rectangle height is the y value
      const height = y;
      
      // Position rectangle at center of its segment
      const position = [x, height / 2, 0];
      
      rectangles.push({
        position,
        size: [rectangleWidth, height, 0.1],
        key: i
      });
    }
    
    return rectangles;
  };

  const rectangles = generateRectangles();

  return (
    <group>
      {rectangles.map((rect) => (
        <mesh key={rect.key} position={rect.position}>
          <boxGeometry args={rect.size} />
          <meshStandardMaterial color={color} opacity={opacity} transparent={true} />
        </mesh>
      ))}
    </group>
  );
}

export default RiemannSum;
