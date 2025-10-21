import React, { useState } from 'react';

interface DropdownFilterProps {
    label: string; 
    options: string[]; 
    onSelect: (value: string) => void;
    activeValue: string; 
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({ 
    label, 
    options, 
    onSelect, 
    activeValue 
}) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const isActive = activeValue !== ''; 
    
    const baseClasses = "flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 border relative";
    const activeClasses = "bg-[#00788A] text-white border-[#00788A]"; 
    const inactiveClasses = "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200";

    const handleItemClick = (value: string) => {
        onSelect(value);
        setIsOpen(false);
    };

    return (
        <div className="relative"> 
            
            <button 
                className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                {label}
                <span className="ml-1">▼</span>
            </button>

            {isOpen && (
                <div 
                    className="absolute z-10 mt-2 w-48 rounded-lg shadow-xl bg-white border border-gray-200"
                    style={{ top: '100%', left: 0 }} 
                >
                    {options.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleItemClick(option)}
                            className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 
                                ${option === activeValue ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropdownFilter;