import { useTheme } from '../../utils/themeProvider';
import { EvervaultCard } from '../ui/extended/vault';
import WindowDisplay from '../ui/extended/window';
import React from 'react';

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

const Layout: React.FC<Props> = ({ children, onClick }) => {
  return (
    <div
      className='bg-black flex h-dvh w-dvw items-center justify-center overflow-hidden overscroll-none text-xs md:text-base'
      onClick={onClick}
    >
      <EvervaultCard>
        <WindowDisplay className='z-10 h-full w-full max-w-4xl sm:max-h-[80%]'>
          {children}
        </WindowDisplay>
      </EvervaultCard>
    </div>
  );
};

export default Layout;
