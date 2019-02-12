import React from 'react';
import useUser from './examples/useUser';

function Footer() {
  const user = useUser()

  return (
    <footer>
      {user && <p>Thanks for visiting, {user.name}</p>}
    </footer>
  );
}

export default Footer;
