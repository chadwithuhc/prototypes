import { useState, useEffect } from 'react';
import fakeService from '../fakeService';

function useUser() {
  const [user, setUser] = useState(null)

  function updateUser(user) {
    setUser(user)
  }

  useEffect(() => {
    // Listening for login/logout actions
    fakeService.addListener('login', updateUser)
    fakeService.addListener('logout', updateUser)

    return () => {
      fakeService.removeListener('login', updateUser)
      fakeService.removeListener('logout', updateUser)
    }
  })

  return user
}

export default useUser;
