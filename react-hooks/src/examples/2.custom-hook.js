import React from 'react';
import useClickCount from './useClickCount';

function App() {
  const count = useClickCount()

  return (
    <main>
      <h1>Clicked {count} times</h1>
    </main>
  );
}

export default App;
