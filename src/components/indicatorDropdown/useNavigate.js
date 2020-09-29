import { useState, useEffect } from 'react';
import { slugify } from '../../utils/slugify';

const useNavigate = (indicator, state) => {
  const [isNavigationEnabled, setIsNavigationEnabled] = useState(false);
  const [url, setUrl] = useState();

  useEffect(() => {
    if (indicator && state) {
      setIsNavigationEnabled(true);
      setUrl(`/${slugify(indicator)}/${slugify(state)}`);
    } else {
      setIsNavigationEnabled(false);
    }
  }, [indicator, state]);

  return [isNavigationEnabled, url];
};

export default useNavigate;
