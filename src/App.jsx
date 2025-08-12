import React, { useState } from 'react';
import Template from './template/Template.jsx';
import Flexi from './template/assets/Flexi.js';
import { TwoDSteps, defaultFunctions } from './components';

function App() {
  const [current_step, set_current_step] = useState(1);

// ==========================================
// 🔴 DO NOT MODIFY ANYTHING ABOVE THIS LINE
// ==========================================

  // ==========================================
  // 🟢 MODIFY THE SECTION BELOW THIS LINE
  // ==========================================
  
  const total_steps = 6; // Now we have 6 steps
  
  const flexi_steps = [
    { pose: Flexi.teacher, message: "Let's start with the 2D function! This is y = 2 - x" },
    { pose: Flexi.excited, message: "Now see how we can approximate with rectangles!" },
    { pose: Flexi.thumbs_up, message: "More rectangles give us a better approximation!" },
    { pose: Flexi.stars, message: "Even more rectangles give us an even better approximation!" },
    { pose: Flexi.idea, message: "16 rectangles give us an even finer approximation!" },
    { pose: Flexi.wizard, message: "32 rectangles - we're getting very close to the real area!" }
  ];

  // ==========================================
  // 🟢 MODIFY THE SECTION ABOVE THIS LINE
  // ==========================================

// ==========================================
// 🔴 DO NOT MODIFY ANYTHING BELOW THIS LINE  
// ==========================================
  
  return (
    <Template 
      current_step={current_step}
      total_steps={total_steps}
      flexi_steps={flexi_steps}
      on_next={() => set_current_step(prev => prev + 1)}
      on_prev={() => set_current_step(prev => prev - 1)}
    >
      
      {/* ================================================= */}
      {/* 🟢 HEY CURSUR! VIBE CODE INSIDE THIS AREA BELOW! */}
      {/* ================================================= */}
      
      <TwoDSteps 
        functionConfig={defaultFunctions.linear}
        currentStep={current_step}
      />
      
      {/* ================================================= */}
      {/* 🟢 HEY CURSUR! VIBE CODE INSIDE THIS AREA ABOVE! */}
      {/* ================================================= */}

    </Template>
  );
}

// ==========================================
// 🔴 DO NOT MODIFY ANYTHING BELOW THIS LINE  
// ==========================================

export default App;