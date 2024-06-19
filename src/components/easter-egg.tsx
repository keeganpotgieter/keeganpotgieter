import React from 'react';

const EasterEgg = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: `<!-- Hmmm, looks like you found something interesting.... try typing in the command 'im_a_nerd' -->`,
    }}
  />
);

export default EasterEgg;
