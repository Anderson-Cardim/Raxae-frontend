
import React from 'react';
import { TbBellPlus } from "react-icons/tb";


export interface HistoryEntry {
  id: string;
  month: string;
  date?: string; 
  memberName: string;
  memberAvatarUrl: string;
  status: PaymentStatus;
  groupName: string;
}

export type PaymentStatus = 'PENDENTE' | 'PAGO' | 'NÃO PAGO';

export interface HistoryItemProps {
  entry: HistoryEntry;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ entry }) => {

  let statusColor: string;

  switch (entry.status) {
    case 'PAGO':
      statusColor = 'bg-green-400 text-green-900';
      break;
    case 'NÃO PAGO':
      statusColor = 'bg-red-500 text-white'; 
      break;
    case 'PENDENTE':
    default:
      statusColor = 'bg-yellow-400 text-yellow-900';
      break;
  }

  const showDate = entry.status === 'PAGO' && entry.date;
  const isNotPaid = entry.status === 'NÃO PAGO';

  return (
    <div className="flex items-center justify-between p-3 bg-white border-b border-gray-100 last:border-b-0">
      
      <div className="flex items-center space-x-3">
        <img 
          src={entry.memberAvatarUrl}
          alt={entry.memberName}
          className="w-12 h-12 rounded-full object-cover"
        />
        
        <div className="font-medium text-gray-800 flex items-center space-x-2">
            <span>{entry.memberName}</span>
            {showDate && (
                <span className="text-xs text-gray-500">{entry.date}</span>
            )}
        </div>
      </div>

      <div>
        {isNotPaid &&  (
            <span title="Notificar"><TbBellPlus size="24px" /></span> 
        )}
      </div>

      <div className={`px-3 py-1 text-xs font-bold rounded-lg ${statusColor}`}>
        {entry.status}
      </div>

    </div>
  );
};

export default HistoryItem;