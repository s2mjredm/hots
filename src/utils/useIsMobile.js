import { useState, useEffect } from 'react';

const useIsMobile = () => {
  const [width, setWidth] = useState();
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;
  return isMobile;
};

export default useIsMobile;
