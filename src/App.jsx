import React, { useState } from 'react';
import Template from './template/Template.jsx';
import Flexi from './template/assets/Flexi.js';
import { StepManager, functionConfigs, allStepConfigs } from './components';

function App() {
  const [current_step, set_current_step] = useState(1);
  const total_steps = 12; // Now we have 12 steps total
  
  const flexi_steps = [
    // 2D Steps (1-6)
    { pose: Flexi.teacher, message: "Let's start with the 2D function! This is y = 2 - x (drag your mouse to see in 3D)" },
    { pose: Flexi.excited, message: "Now see how we can approximate with 2 rectangles!" },
    { pose: Flexi.thumbs_up, message: "4 rectangles give us a better approximation!" },
    { pose: Flexi.stars, message: "8 rectangles give us an even better approximation!" },
    { pose: Flexi.idea, message: "16 rectangles give us an even finer approximation!" },
    { pose: Flexi.wizard, message: "32 rectangles - we're getting very close to the real area!" },
    
    // 3D Steps (7-12) - with actual calculated VOLUMES
    { pose: Flexi.telescope, message: "Now let's see this in 3D! The function becomes a surface." },
    { pose: Flexi.holding_square, message: "2 discs: Est. 1.5π, Actual 2π" },
    { pose: Flexi.megaphone, message: "4 discs: Est. 1.75π, Actual 2π" },
    { pose: Flexi.reading, message: "8 discs: Est. 1.875π, Actual 2π" },
    { pose: Flexi.super, message: "16 discs: Est. 1.9375π, Actual 2π" },
    { pose: Flexi.confident, message: "32 discs: Est. 1.96875π, Actual 2π" }
  ];

  return (
    <Template 
      current_step={current_step}
      total_steps={total_steps}
      flexi_steps={flexi_steps}
      on_next={() => set_current_step(prev => prev + 1)}
      on_prev={() => set_current_step(prev => prev - 1)}
    >
      <StepManager 
        functionConfig={functionConfigs.linear}
        currentStep={current_step}
      />
    </Template>
  );
}

export default App;