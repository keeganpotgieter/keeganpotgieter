'use client';

import { cn } from '@/lib/utils';
import { MotionValue, useMotionValue } from 'framer-motion';
import { useMotionTemplate, motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';

export const EvervaultCard = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  const [randomString, setRandomString] = useState('');

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;

    let str = generateRandomString((width * height) / 100);
    setRandomString(str);
  }, []);

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();
    const { innerWidth: width, innerHeight: height } = window;

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    const str = generateRandomString((width * height) / 100);
    setRandomString(str);
  }

  return (
    <div
      className={cn(
        'group/card relative flex h-full w-full items-center justify-center',
        className,
      )}
      onMouseMove={onMouseMove}
    >
      {children}
      <CardPattern
        mouseX={mouseX}
        mouseY={mouseY}
        randomString={randomString}
      />
    </div>
  );
};

export function CardPattern({
  mouseX,
  mouseY,
  randomString,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  randomString: string;
}) {
  let maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const xVel = Math.abs(mouseX.getVelocity());
  const yVel = Math.abs(mouseY.getVelocity());
  const avgVel = (xVel + yVel) / 2;
  const opacity =
    Math.round(100 * Math.max(Math.min(avgVel / 2000, 0.5), 0.1)) / 100;

  let style = {
    maskImage,
    WebkitMaskImage: maskImage,
    opacity: opacity,
  };

  return (
    <div className='pointer-events-none z-0'>
      {/* <div className='absolute inset-0 rounded-2xl [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-0'></div> */}
      <motion.div
        className='from-green-500 to-blue-700 absolute inset-0 bg-gradient-to-r opacity-0 backdrop-blur-xl transition duration-500 group-hover/card:opacity-100'
        style={style}
      />
      <motion.div
        className='absolute inset-0 opacity-0 mix-blend-overlay group-hover/card:opacity-100'
        style={style}
      >
        <p className='text-white absolute inset-x-0 h-full w-full whitespace-pre-wrap break-words font-mono text-sm font-bold transition duration-500'>
          {randomString}
        </p>
      </motion.div>
    </div>
  );
}

const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#';
export const generateRandomString = (length: number) => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke='currentColor'
      className={className}
      {...rest}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v12m6-6H6' />
    </svg>
  );
};
