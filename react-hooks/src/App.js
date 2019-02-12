import React from 'react';
import Header from './Header';
import Footer from './Footer';
import useClickCount from './examples/useClickCount';
import useUser from './examples/useUser';
import fakeService from './fakeService';

function App() {
  const count = useClickCount()
  const user = useUser()

  function login() {
    fakeService.emit('login', { name: 'cheddar' })
  }
  function logout() {
    fakeService.emit('logout', null)
  }

  return (
    <main>
      <Header />
      <h2>Clicked {count} times</h2>
      {!user && <button onClick={login}>Login</button>}
      {user && <button onClick={logout}>Logout of {user.name}</button>}
      <Footer />
    </main>
  );
}

export default App;
