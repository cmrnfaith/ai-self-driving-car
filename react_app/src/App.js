
import PaintWidget from "./components/PaintWidget";
import { useState } from "react";

function App() {
  const angle = 100;
  const center = { x: 50, y: 50 };
  var width = 1000;
  var height = 500;
  const [barriers, setBarriers] = useState([]);
  return (
    <div className="App">
      <header className="App-header">
        <h1>TensorFlow Ai powered car simulator.</h1>
      </header>
        <p>Start drawing and the AI will attempt to drive around your 'barriers'</p>
      <PaintWidget  barriers={barriers} setBarriers={setBarriers} width={width} height={height} angle={angle} center={center}/>
      
    </div>
  );
}

export default App;
