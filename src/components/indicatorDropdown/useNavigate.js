import React, { useState, useEffect } from 'react';

const useNavigate = (indicator, state) => {
  const [isNavigationEnabled, setIsNavigationEnabled] = useState(false);
  const [url, setUrl] = useState();

  function slugify(string) {
    return string
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

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
