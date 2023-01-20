import React, { useRef, useState } from "react";
import { Layer } from "react-konva";
import Ball from "./Ball";
import Car from "./Car";

const ball_radius = 5;
const car_size = { height: 20, width: 10 };

function Game({ angle, center }) {
  const carRef = useRef();
  const ball1Ref = useRef();
  const ball2Ref = useRef();
  const ball3Ref = useRef();
  const ballOneFill = useState(true);
  const ballTwoFill = useState(false);
  const ballThreeFill = useState(false);

  const car_pos = (center, size) => ({
    x: center.x - size.width / 2,
    y: center.y - size.height / 2,
  });
  const ball1_pos = (center, angle, radius) => {
    var angleRad = degreesToRad(angle);
    const x = center.x + radius * Math.cos(angleRad);
    const y = center.y + radius * Math.sin(angleRad);
    return { x, y };
  };
  const ball2_pos = (center, angle, radius) => {
    var angleRad = degreesToRad(angle);
    const x = center.x + radius * Math.cos(angleRad + Math.PI / 3);
    const y = center.y + radius * Math.sin(angleRad + Math.PI / 3);
    return { x, y };
  };
  const ball3_pos = (center, angle, radius) => {
    var angleRad = degreesToRad(angle);
    const x = center.x + radius * Math.cos(angleRad + (2 * Math.PI) / 3);
    const y = center.y + radius * Math.sin(angleRad + (2 * Math.PI) / 3);
    return { x, y };
  };

  function degreesToRad(degrees) {
    return (degrees * Math.PI) / 180;
  }

  return (
      <Layer>
        <Car
          ref={carRef}
          angle={angle}
          pos={car_pos(center, car_size)}
          size={car_size}
        />
        <Ball
          ref={ball1Ref}
          pos={ball1_pos(center, angle, ball_radius)}
          radius={ball_radius}
          fill={ballOneFill}
        />
        <Ball
          ref={ball2Ref}
          pos={ball2_pos(center, angle, ball_radius)}
          radius={ball_radius}
          fill={ballTwoFill}
        />
        <Ball
          ref={ball3Ref}
          pos={ball3_pos(center, angle, ball_radius)}
          radius={ball_radius}
          fill={ballThreeFill}
        />
      </Layer>
  );
}

export default Game;
