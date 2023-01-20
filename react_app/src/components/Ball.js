import { Circle } from "react-konva";

function Ball({ pos, radius, fill }) {
  return (
    <Circle x={pos.x} y={pos.y} radius={radius} fill={fill ?? "cyan"} />
  );
}
export default Ball;
