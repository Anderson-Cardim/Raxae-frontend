import { Link } from 'react-router-dom'; 
import { BsThreeDots } from 'react-icons/bs'; 


interface MembersLinkProps {
  memberCount: number;
  groupId: string; 
}

export function MembersLink({ memberCount, groupId }: MembersLinkProps) {
  return (
    <div 
      className="
        flex justify-between items-center
        w-full p-4 bg-white
        border border-gray-200
        rounded-xl shadow-sm
      "
    >
      <p className="font-bold text-gray-800">
        Membros - {memberCount} nesse grupo
      </p>
      
      <Link 
        to={`/grupo/membro/admin`} 
        className="text-gray-500 hover:text-gray-900"
      >
        <BsThreeDots size={28}/> 
      </Link>
    </div>
  );
}