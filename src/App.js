import React, { useState } from "react";
import "./App.css";

function App() {
  const [array, setArray] = useState([]);
  const [comparing, setComparing] = useState([]);
  const [sortedIndex, setSortedIndex] = useState(-1);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(300);

  const generateArray = () => {
    if (isSorting) return;
    const size = Math.floor(Math.random() * 11) + 10;
    const newArray = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 90) + 10
    );
    setArray(newArray);
    setSortedIndex(-1);
    setComparing([]);
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    setIsSorting(true);
    let arr = [...array];

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setComparing([j, j + 1]);
        await sleep(speed);

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await sleep(speed);
        }
      }
      setSortedIndex(arr.length - i - 1);
    }

    setComparing([]);
    setIsSorting(false);
  };

  return (
    <div className="container">
      <h1>Bubble Sort Visualizer</h1>

      <div className="controls">
        <button onClick={generateArray} disabled={isSorting}>
          Generate Array
        </button>
        <button onClick={bubbleSort} disabled={isSorting}>
          Start Sorting
        </button>

        <div>
          <label>Speed: </label>
          <input
            type="range"
            min="50"
            max="1000"
            value={speed}
            onChange={(e) => setSpeed(+e.target.value)}
            disabled={isSorting}
          />
          <span>{speed} ms</span>
        </div>
      </div>

      <div className="bars">
        {array.map((value, index) => (
          <div
            key={index}
            className={`bar ${
              comparing.includes(index)
                ? "comparing"
                : index >= sortedIndex && sortedIndex !== -1
                ? "sorted"
                : ""
            }`}
            style={{ height: value * 3 }}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
