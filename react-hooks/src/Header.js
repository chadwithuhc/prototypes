import React from 'react';
import useClickCount from './examples/useClickCount';

function Header() {
  const count = useClickCount()

  return (
    <header>
      <h1>Clicked {count} times</h1>
    </header>
  );
}

export default Header;
