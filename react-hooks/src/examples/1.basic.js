import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <h1 onClick={() => setCount(count + 1)}>Clicked {count} times</h1>
    </main>
  );
}

export default App;
