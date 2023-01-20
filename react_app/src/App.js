import Game from "./components/Game";

function App() {
  const angle = 0;
  const center = { x: 50, y: 50 };
  return (
    <div className="App">
      <header className="App-header">
        <p>TensorFlow Ai powered car simulator.</p>
      </header>
      <Game angle={angle} center={center}></Game>
    </div>
  );
}

export default App;
