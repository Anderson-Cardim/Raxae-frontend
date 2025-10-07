// src/features/groups/components/MemberItem.tsx

import React from 'react';
import { BsFillTrashFill } from "react-icons/bs";
import { FaCrown } from 'react-icons/fa'; 
import { BsClockFill } from "react-icons/bs";

interface MemberItemProps {
  member: Member;
  onChat: (memberId: string) => void;
  onRemove: (memberId: string) => void;
}

interface Member {
  id: string;
  name: string;
  isCurrentUser: boolean; 
  isManager: boolean; 
  canDelete: boolean;
  imageUrl: string;
}

const MemberItem: React.FC<MemberItemProps> = ({ member, onRemove }) => {
  return (
    <div className={`flex items-cente justify-between p-3 rounded-lg shadow-xl `}>
      
      <div className="flex items-center space-x-3">
        <img 
          src={member.imageUrl} 
          alt={member.name}
          className="w-12 h-12 rounded-full object-cover border border-gray-200"
        />
        
        <div className="font-bold text-gray-800 flex items-center space-x-2">
            <span>{member.name}</span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {member.isManager && (
            <FaCrown className="text-[#FECB00]" size={20} title="Gerente do Grupo" />
        )}
        {!member.isManager && (
            <FaCrown className="text-[#D9D9D9]" size={20} title="Gerente do Grupo" />
        )}

        <BsClockFill size={20} color='#14879E'/>

        {member.canDelete && (
            <button onClick={() => onRemove(member.id)}>
                <BsFillTrashFill size={20} color='#F50F0F'/>
            </button>
        )}
      </div>
    </div>
  );
};

export default MemberItem;