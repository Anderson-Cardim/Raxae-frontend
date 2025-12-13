import React from 'react';

interface RadioOptionProps {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}

export const RadioOption: React.FC<RadioOptionProps> = ({
  label,
  name,
  value,
  checked,
  onChange,
}) => {
  return (
    <label className="flex items-center space-x-3 p-4 bg-gray-100 dark:bg-[#27272a] rounded-lg cursor-pointer transition-colors duration-200">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="form-radio h-5 w-5 text-orange-500 border-gray-300 dark:border-gray-600 focus:ring-orange-500 bg-white dark:bg-[#18181b]"
      />
      <span className="text-gray-700 dark:text-gray-200 font-medium">{label}</span>
    </label>
  );
};