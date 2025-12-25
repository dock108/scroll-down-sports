import { useCallback, useState } from 'react';

const useSpoilerState = () => {
  const [spoilersAllowed, setSpoilersAllowed] = useState(false);

  const revealSpoilers = useCallback(() => {
    setSpoilersAllowed(true);
  }, []);

  return { spoilersAllowed, revealSpoilers };
};

export default useSpoilerState;
