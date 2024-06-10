import { cn } from '@/lib/utils';
import { useTheme } from '@/utils/themeProvider';
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
  return (
    <div
      className={cn(
        'flex w-full flex-col transition-colors ease-linear',
        className,
      )}
    >
      <div className='bg-gray-950 border-border/20 hidden h-12 w-full items-center justify-between space-x-1.5 rounded-t-lg border-2 p-2 px-4 sm:flex'>
        <div className='flex w-full flex-1 items-center justify-start space-x-1.5'>
          <span className='dark:border-red-400 bg-red-400 hover:bg-red-500 h-3 w-3 rounded-full border border-transparent'></span>
          <span className='dark:border-yellow-400 bg-yellow-400 hover:bg-yellow-500 h-3 w-3 rounded-full border border-transparent'></span>
          <span className='dark:border-green-400 bg-green-400 hover:bg-green-500 h-3 w-3 rounded-full border border-transparent'></span>
        </div>
        <div className='flex-1'>
          {searchBar && (
            <div className='border-muted-background text-muted-foreground h-full w-full rounded-md border p-1 text-center text-xs'>
              {searchBar}
            </div>
          )}
        </div>
        <div className='flex-1'></div>
      </div>
      <div
        className='border-border/20 flex h-full min-w-full max-w-2xl flex-1 flex-col overflow-clip rounded-b-lg border-2 border-t-0'
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
