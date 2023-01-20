import { useRef } from "react";
import { Group, Rect } from "react-konva";

function Car({ angle, pos, size }) {
  const carRef = useRef();

  return (
    <Group ref={carRef}>
      <Rect
        x={pos.x}
        y={pos.y}
        width={size.width}
        height={size.height}
        rotation={angle}
        fill="red"
      />
    </Group>
  );
}
export default Car;
