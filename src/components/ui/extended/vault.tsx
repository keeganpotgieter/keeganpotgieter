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
    const str = generateRandomString(2000);
    setRandomString(str);
  }, []);

  function onMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: {
    currentTarget: HTMLDivElement;
    clientX: number;
    clientY: number;
  }) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    let str = generateRandomString(2000);
    setRandomString(str);
  }

  return (
    <div
      className={cn(
        'group/card relative flex h-full w-full items-center justify-center sm:p-2',
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
  const maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6), rgba(0, 0, 0, 0.2), transparent)`;
  const xVel = Math.abs(mouseX.getVelocity());
  const yVel = Math.abs(mouseY.getVelocity());
  const avgVel = (xVel + yVel) / 2;
  const opacity =
    Math.round(100 * Math.max(Math.min(avgVel / 2000, 0.8), 0.4)) / 100;

  const style = {
    maskImage,
    WebkitMaskImage: maskImage,
  };

  return (
    <div className='pointer-events-none z-0'>
      <motion.div
        className='absolute inset-0 bg-gradient-to-r from-green-500/50 to-blue-700/50 backdrop-blur-2xl transition duration-500 group-hover/card:opacity-100'
        style={style}
      >
        <motion.div
          className='absolute inset-0 h-fit w-fit translate-y-1/2 mix-blend-overlay group-hover/card:opacity-100'
          style={{
            opacity,
            x: mouseX,
            y: mouseY,
          }}
        >
          <p className='absolute inset-x-0 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 whitespace-pre-wrap break-words font-mono text-sm font-bold text-white transition duration-500'>
            {randomString}
          </p>
        </motion.div>
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
