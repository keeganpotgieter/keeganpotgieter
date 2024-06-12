import { cn } from '@/lib/utils';
import { useTheme } from '@/utils/themeProvider';
import { PanelBottomOpenIcon } from 'lucide-react';
import React from 'react';
import { ReactNode } from 'react';
import { useAsciiText, ansiRegular as font } from 'react-ascii-text';

function BaseBanner() {
  const asciiTextRef = useAsciiText({
    animationCharacters: '▒░█',
    animationCharacterSpacing: 1,
    animationDelay: 2000,
    animationDirection: 'down',
    animationInterval: 100,
    animationLoop: true,
    animationSpeed: 30,
    font: font,
    text: ['Keegan Potgieter', 'Software Engineer'],
  });

  return (
    <pre
      ref={asciiTextRef as React.MutableRefObject<HTMLPreElement | null>}
    ></pre>
  );
}

function MobileBanner() {
  const asciiTextRef = useAsciiText({
    animationCharacters: '▒░█',
    animationCharacterSpacing: 1,
    animationDelay: 2000,
    animationDirection: 'vertical',
    animationInterval: 100,
    animationLoop: true,
    animationSpeed: 30,
    font: font,
    text: [`Keegan\nPotgieter`, 'Software\nEngineer'],
  });

  return (
    <pre
      ref={asciiTextRef as React.MutableRefObject<HTMLPreElement | null>}
    ></pre>
  );
}

interface WindowDisplayProps {
  searchBar?: string;
  className?: string;
  children?: ReactNode;
}

const WindowDisplay = ({
  searchBar,
  className,
  children,
}: WindowDisplayProps) => {
  const { theme } = useTheme();
  const [minify, setMinify] = React.useState<boolean>(false);

  const handleClose = () => {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  };

  const handleMinify = () => {
    setMinify((prev) => !prev);
  };

  return (
    <div
      className={cn(
        'flex w-full flex-col transition-all ease-linear',
        className,
        { 'sm:h-0 sm:w-auto': minify },
      )}
      style={{ color: theme.foreground }}
    >
      <div
        className={cn(
          'bg-gray-950 border-border/20 hidden h-12 w-full items-center justify-between space-x-1.5 rounded-t-lg border-2 p-2 px-4 sm:flex',
          { 'sm:rounded-lg': minify },
        )}
      >
        <div className={cn('flex-1')}>
          <div
            className={cn(
              'flex w-full items-center justify-start space-x-1.5',
              { 'sm:hidden': minify },
            )}
          >
            <span
              onClick={handleClose}
              className='dark:border-red-400 bg-red-400 hover:bg-red-500 h-3 w-3 cursor-pointer rounded-full border border-transparent'
            ></span>
            <span
              onClick={handleMinify}
              className='dark:border-yellow-400 bg-yellow-400 hover:bg-yellow-500 h-3 w-3 cursor-pointer rounded-full border border-transparent'
            ></span>
            <span
              className={cn(
                'dark:border-green-400 bg-green-400 hover:bg-green-500 h-3 w-3 cursor-pointer rounded-full border border-transparent',
              )}
            ></span>
          </div>
        </div>
        <div className='flex min-w-fit flex-1 flex-row justify-between text-nowrap'>
          {searchBar && (
            <div
              className={cn(
                'border-border/20 text-muted-foreground h-full w-full rounded-md border p-1 text-center text-xs',
                { 'sm:border-none': minify },
              )}
            >
              {searchBar}
            </div>
          )}
        </div>
        <div className='text-border/20 group flex flex-1 items-center justify-end p-1'>
          <PanelBottomOpenIcon
            onClick={handleMinify}
            className={cn(
              'm-1 h-4 w-4 scale-90 cursor-pointer transition-transform group-hover:scale-95',
              {
                'sm:hidden': !minify,
              },
            )}
          />
        </div>
      </div>
      <div
        className={cn(
          'border-border/20 flex h-full min-w-full max-w-2xl flex-1 flex-col overflow-clip rounded-b-lg border-2 border-t-0',
          { 'sm:hidden': minify },
        )}
        style={{
          color: theme.foreground,
          background: theme.background,
        }}
      >
        <div className='flex h-fit w-full items-center justify-center pt-2 text-center text-[6px] leading-[0.375rem] md:hidden'>
          <MobileBanner />
        </div>

        <div className='hidden h-fit w-full items-center justify-center pt-2 text-center text-[8px] leading-[0.5rem] md:flex'>
          <BaseBanner />
        </div>
        <div className='overflow-clip'>{children}</div>
      </div>
    </div>
  );
};
export default WindowDisplay;
