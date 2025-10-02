
import React, { forwardRef } from 'react';
import type { InputHTMLAttributes, DetailedHTMLProps } from 'react';

const DateInput = forwardRef<HTMLInputElement, DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>(({ className, ...props }, ref) => {
  return (
    <div className="relative">
      <input type="date" className={` ${className} appearance-none focus:outline-none focus:border-blue-500`} ref={ref}  {...props}/>
    </div>
  );
});

export default DateInput;