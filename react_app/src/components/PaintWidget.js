import { useState, useRef } from "react";
import { Layer, Line, Stage, Text } from "react-konva";

function PaintWidget({ barriers, setBarriers, width, height }) {
    const [tool, setTool] = useState('pen');
    
    const isDrawing = useRef(false);
  
    const handleMouseDown = (e) => {
      isDrawing.current = true;
      const pos = e.target.getStage().getPointerPosition();
      setBarriers([...barriers, { tool, points: [pos.x, pos.y] }]);
    };
  
    const handleMouseMove = (e) => {
      // no drawing - skipping
      if (!isDrawing.current) {
        return;
      }
      const stage = e.target.getStage();
      const point = stage.getPointerPosition();
      let lastLine = barriers[barriers.length - 1];
      // add point
      lastLine.points = lastLine.points.concat([point.x, point.y]);
  
      // replace last
      barriers.splice(barriers.length - 1, 1, lastLine);
      setBarriers(barriers.concat());
    };
  
    const handleMouseUp = () => {
      isDrawing.current = false;
    };

    const ClearCanvas = () => {
        setBarriers([]);
    }
  
    return (
      <div>
       <select
          value={tool}
          onChange={(e) => {
            setTool(e.target.value);
          }}
        >
          <option value="pen">Pen</option>
          <option value="eraser">Eraser</option>
        </select>
        <button onClick={ClearCanvas}>Clear Canvas</button>
        <div className="stage-wrapper">
        <Stage
          width={width}
          height={height}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          className="stage"
        >
          <Layer>
            {barriers.map((barriers, i) => (
              <Line
                key={i}
                points={barriers.points}
                stroke="#df4b26"
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={
                    barriers.tool === 'eraser' ? 'destination-out' : 'source-over'
                }
              />
            ))}
          </Layer>
        </Stage>
        </div> 
      </div>
      );
}

export default PaintWidget;
