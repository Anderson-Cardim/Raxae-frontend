// src/components/AddedMemberItem.tsx

import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

type AddedMemberItemProps = {
  name: string;
  contact: string;
  onRemove: () => void;
};

const AddedMemberItem: React.FC<AddedMemberItemProps> = ({ name, contact, onRemove }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
      <div className="flex-grow">
        <p className="text-[#14879E] font-bold">{name}</p>
        <p className="text-[#F34403] text-sm">{contact}</p>
      </div>
      <button onClick={onRemove} className="text-gray-400 hover:text-[#000] transition-colors">
        <XMarkIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

export default AddedMemberItem;