import { useTheme } from '../../utils/themeProvider';
import React, { useEffect, useState } from 'react';

const Username = () => {
  const [hostname, setHostname] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    if (window !== undefined) {
      setHostname(window.location.hostname);
    }
  }, []);

  return (
    <div className='whitespace-nowrap'>
      <span
        style={{
          color: theme.cyan,
        }}
      >
        guest
      </span>
      <span
        style={{
          color: theme.white,
        }}
      >
        @
      </span>
      <span
        style={{
          color: theme.green,
        }}
      >
        {hostname}
      </span>
      <span
        style={{
          color: theme.white,
        }}
      >
        :$ ~&nbsp;
      </span>
    </div>
  );
};

export default Username;
