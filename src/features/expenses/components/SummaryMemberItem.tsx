
export function SummaryMemberItem({ name, amount }: { name: string; amount: number }) {
    return (
        <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
            <span className="text-gray-700 font-medium">{name}</span>
            <span className="text-gray-900 font-bold">R$ {amount.toFixed(2)}</span>
        </div>
    );
}