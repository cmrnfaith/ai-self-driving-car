import React, { useRef, useState } from "react";
import { Layer, Stage } from "react-konva";
import Ball from "./Ball";
import Car from "./Car";

const ball_radius = 5;
const car_size = { height: 20, width: 10 };

function Game({ angle, center }) {
  const carRef = useRef();
  const ball1Ref = useRef();
  const ball2Ref = useRef();
  const ball3Ref = useRef();
  const ballOneFill = useState("red");
  const ballTwoFill = useState("cyan");
  const ballThreeFill = useState("red");

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Car
          ref={carRef}
          angle={angle}
          pos={{ x: center.x - 25, y: center.y - 5 }}
          size={car_size}
        />
        <Ball
          ref={ball1Ref}
          pos={{ x: center.x - 17.5, y: center.y - 7.5 }}
          radius={ball_radius}
          fill={ballOneFill}
        />
        <Ball
          ref={ball2Ref}
          pos={{ x: center.x - 5, y: center.y - 12.5 }}
          radius={ball_radius}
          fill={ballTwoFill}
        />
        <Ball
          ref={ball3Ref}
          pos={{ x: center.x + 7.5, y: center.y - 7.5 }}
          radius={ball_radius}
          fill={ballThreeFill}
        />
      </Layer>
    </Stage>
  );
}

export default Game;
