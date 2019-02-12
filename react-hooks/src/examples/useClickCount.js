import { useState, useEffect } from 'react';

function useClickCount() {
  const [count, setCount] = useState(0)

  function incrementCount() {
    setCount(count + 1)
  }

  // BUG: On some clicks, this logs out 3 instances instead of 4
  useEffect(() => {
    document.addEventListener('click', incrementCount)
    console.log('Listening for clicks')
    return () => {
      document.removeEventListener('click', incrementCount)
      console.log('END Listening for clicks')
    }
  })

  return count
}

export default useClickCount