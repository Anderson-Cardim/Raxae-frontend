import React from 'react';

interface ExpenseMemberItemProps {
    name: string;
    contact: string;
    amount: number;
    splitType: 'equally' | 'custom';
    splitMethod: 'value' | 'percentage';
    onAmountChange: (value: number) => void;
}

const ExpenseMemberItem: React.FC<ExpenseMemberItemProps> = ({name, amount, splitType, splitMethod, onAmountChange }) => {
    const isEditable = splitType === 'custom';

    return (
        <div className="flex items-center justify-between p-2">
            <div className="flex items-center space-x-3">
                <span className="text-black font-medium">{name}</span>
            </div>
            
            <div className="flex items-center space-x-1">
                {splitMethod === 'value' && <span className="text-black">R$</span>}
                <input
                    type="number"
                    step="0.01"
                    value={isEditable ? amount : (amount).toFixed(2)}
                    readOnly={!isEditable}
                    onChange={(e) => onAmountChange(parseFloat(e.target.value))}
                    className={`
                        w-20 text-right font-bold text-black placeholder-gray-400 
                        border-b-2 border-gray-300 focus:outline-none 
                        ${isEditable ? 'border-black' : 'border-transparent'}
                    `}
                />
                {splitMethod === 'percentage' && <span className="text-black">%</span>}
            </div>
        </div>
    );
};

export default ExpenseMemberItem;