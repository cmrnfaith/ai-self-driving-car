import { useRef, useState } from "react";
import { Group, Rect } from "react-konva";

function Car({ angle, pos, size }) {
  const carRef = useRef();
  const longueur = 800;
  const largeur = 600;

  // const [angle, setAngle] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [velocityX, setVelocityX] = useState(0);
  const [velocityY, setVelocityY] = useState(0);
  const [sensor1X, setSensor1X] = useState(0);
  const [sensor1Y, setSensor1Y] = useState(0);
  const [sensor2X, setSensor2X] = useState(0);
  const [sensor2Y, setSensor2Y] = useState(0);
  const [sensor3X, setSensor3X] = useState(0);
  const [sensor3Y, setSensor3Y] = useState(0);
  const [signal1, setSignal1] = useState(0);
  const [signal2, setSignal2] = useState(0);
  const [signal3, setSignal3] = useState(0);
  const [sensor1, setSensor1] = useState({ sensor1X, sensor1Y });
  const [sensor2, setSensor2] = useState({ sensor2X, sensor2Y });
  const [sensor3, setSensor3] = useState({ sensor3X, sensor3Y });

  function move(rotation) {
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
    this.rotation = rotation;
    this.angle += this.rotation;

    // sensor positions
    this.sensor1.x = 30 * Math.cos(this.angle) + this.pos.x;
    this.sensor1.y = 30 * Math.sin(this.angle) + this.pos.y;
    this.sensor2.x = 30 * Math.cos((this.angle + 30) % 360) + this.pos.x;
    this.sensor2.y = 30 * Math.sin((this.angle + 30) % 360) + this.pos.y;
    this.sensor3.x = 30 * Math.cos((this.angle - 30) % 360) + this.pos.x;
    this.sensor3.y = 30 * Math.sin((this.angle - 30) % 360) + this.pos.y;

    // signal calculation
    this.signal1 = getSignal(this.sensor1.x, this.sensor1.y);
    this.signal2 = getSignal(this.sensor2.x, this.sensor2.y);
    this.signal3 = getSignal(this.sensor3.x, this.sensor3.y);

    if (
      this.sensor1.x > longueur - 10 ||
      this.sensor1.x < 10 ||
      this.sensor1.y > largeur - 10 ||
      this.sensor1.y < 10
    ) {
      this.signal1 = 1;
    }
    if (
      this.sensor2.x > longueur - 10 ||
      this.sensor2.x < 10 ||
      this.sensor2.y > largeur - 10 ||
      this.sensor2.y < 10
    ) {
      this.signal2 = 1;
    }
    if (
      this.sensor3.x > longueur - 10 ||
      this.sensor3.x < 10 ||
      this.sensor3.y > largeur - 10 ||
      this.sensor3.y < 10
    ) {
      this.signal3 = 1;
    }
  }
  function getSignal(sensorX, sensorY) {
    // assuming "sand" is a 2D array
    let sum = 0;
    for (let i = sensorX - 10; i < sensorX + 10; i++) {
      for (let j = sensorY - 10; j < sensorY + 10; j++) {
        if (i >= 0 && i < longueur && j >= 0 && j < largeur) {
          // sum += sand[i][j];
        }
      }
    }
    return sum / 400;
  }

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
