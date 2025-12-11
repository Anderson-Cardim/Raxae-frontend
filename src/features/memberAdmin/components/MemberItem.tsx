import React from 'react';
import { BsFillTrashFill, BsJournalText } from "react-icons/bs";
import { FaCrown } from 'react-icons/fa';
import { BsClockFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

interface MemberItemProps {
  member: Member;
  groupId: string;
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

const MemberItem: React.FC<MemberItemProps> = ({ member, groupId, onRemove }) => {
  return (
    <div className={`flex items-cente justify-between p-3 rounded-lg shadow-2xl hover:translate-y-[1px] hover:shadow-lg `}>

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
        <input type='checkbox' className="w-5 h-5 text-green-800" />
        {member.isManager && (
          <FaCrown className="text-[#FECB00]" size={20} title="Gerente do Grupo" />

        )}
        {!member.isManager && (
          <FaCrown className="text-[#D9D9D9]" size={20} title="Gerente do Grupo" />
        )}

        <BsClockFill size={20} color='#14879E' />

        <Link to={`/grupo/${groupId}/historico/${member.id}`} title="Ver Histórico">
          <BsJournalText size={20} color='#14879E' />
        </Link>

        {member.canDelete && (
          <button onClick={() => onRemove(member.id)}>
            <BsFillTrashFill size={20} color='#F50F0F' />
          </button>
        )}
      </div>
    </div>
  );
};

export default MemberItem;