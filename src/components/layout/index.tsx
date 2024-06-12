import { EvervaultCard } from '../ui/extended/vault';
import WindowDisplay from '../ui/extended/window';
import React from 'react';
import packageJson from '~/package.json';

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
        <WindowDisplay
          searchBar={`keeganpotgieter — zsh — ${packageJson.version}`}
          className='z-10 h-full w-full max-w-4xl sm:max-h-[80%]'
        >
          {children}
        </WindowDisplay>
      </EvervaultCard>
    </div>
  );
};

export default Layout;
