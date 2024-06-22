import { useTheme } from '@/context/theme-provider';
import { cn } from '@/lib/utils';

const BorderAnimate: React.FC<{
  children: React.ReactNode;
  backgroundColour?: string;
  className?: string;
}> = ({ backgroundColour, className, children }) => {
  const { theme } = useTheme();
  return (
    <div
      className={cn(
        '_bg-red-100 relative overflow-hidden rounded-md border border-transparent bg-transparent p-[1.5px] shadow-sm transition',
        className,
      )}
    >
      <div
        className={cn(
          'animate-rotate absolute inset-0 z-0 block h-full w-full rounded-full bg-[conic-gradient(transparent_0deg,hsl(var(--secondary))_60deg,#22c55e_90deg,hsl(var(--primary))_120deg,transparent_0deg)]',
        )}
      ></div>
      <div
        className={cn(
          'group relative z-10 h-full w-full rounded-sm bg-black p-2 transition-all',
        )}
        style={{ backgroundColor: backgroundColour ?? theme.background }}
      >
        {children}
      </div>
    </div>
  );
};

export default BorderAnimate;
