import React, { useState } from "react";

interface CounterProps {
  count?: Number;
}

function Counter(props: CounterProps) {
  const [clickCount, setClickCount] = useState(0);
  return (
    <div>
      <p
        onClick={() => {
          setClickCount(clickCount + 1);
        }}
      >
        This Item was clicked by {clickCount} times.
      </p>
      <button
        onClick={() => {
          setClickCount(0);
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default Counter;
