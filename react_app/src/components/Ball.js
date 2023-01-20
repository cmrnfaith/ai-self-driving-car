import { Circle } from "react-konva";

function Ball({ pos, radius, fill }) {
  const fill_color = fill ? "green" : "red";
  return <Circle x={pos.x} y={pos.y} radius={radius} fill={fill_color} />;
}
export default Ball;
