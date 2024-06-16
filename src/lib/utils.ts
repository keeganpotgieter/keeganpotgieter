import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function html(strings: TemplateStringsArray, ...values: any[]): string {
  let result = '';

  strings.forEach((str, i) => {
    result += str + (values[i] !== undefined ? values[i] : '');
  });

  return result;
}
