import React from 'react';

export function SummaryMemberItem({ name, amount }: { name: string; amount: number }) {
    return (
        <div className="flex items-center justify-between p-2">
            <div className="flex items-center space-x-3">
                <span className="text-black font-medium">{name}</span>
            </div>
            <div className="flex items-center space-x-1">
                <span className="text-black font-bold">R$ {amount.toFixed(2)}</span>
            </div>
        </div>
    );
}