import { cn } from '@/lib/utils';
import config from '~/config.json';

const SecretGreeting = () => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-md border border-transparent p-[1.5px] shadow-sm transition',
      )}
    >
      <div className={cn('group z-50 rounded-sm bg-black p-2 transition-all')}>
        <p>Hello there! It's nice to meet you.</p>
        <p>I am Keegan</p>
        <a
          href={`https://www.linkedin.com/in/${config.social.linkedin}/`}
          target='_blank'
          className='group-hover:gradient-text group-hover:animate-rotate-bg'
        >
          Let's get in touch
        </a>
      </div>
      <div
        className={cn(
          'animate-rotate absolute inset-0 -z-10 block h-full w-full rounded-full bg-[conic-gradient(transparent_0deg,hsl(var(--secondary))_60deg,#22c55e_90deg,hsl(var(--primary))_120deg,transparent_0deg)]',
        )}
      ></div>
    </div>
  );
};

export default SecretGreeting;
