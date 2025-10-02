import React, { forwardRef } from 'react';

import type { SelectHTMLAttributes, DetailedHTMLProps } from 'react';

interface SelectInputProps extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  options: { value: string; label: string }[];
}

const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(({ options, className, ...props }, ref) => {
  return (
    <div className="relative">
      <select
        className={` ${className} appearance-none focus:outline-none focus:border-blue-500 `} ref={ref}  {...props}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
});

export default SelectInput;