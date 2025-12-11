import { BsTrash } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

export interface FriendListItemProps {
  friend: Friend;
  onDelete: (id: string) => void;
}

export interface Friend {
  id: string;
  name: string;
}

export default function FriendListItem({ friend, onDelete }: FriendListItemProps) {
    return (
        <div className="flex items-center justify-between py-3 border-b border-gray-100 hover:translate-y-[1px] hover:shadow-lg">
        
        <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <FaUser className="text-[#106a8c]" size={18} />
            </div>
            
            <span className="text-gray-800 text-base">{friend.name}</span>
        </div>
        
        <button 
            onClick={() => onDelete(friend.id)}
            className="p-2  hover:text-[#106a8c] text-[#14879E] transition-colors"
            aria-label={`Excluir amigo ${friend.name}`}
        >
            <BsTrash size={20} />
        </button>
        </div>
    );
}
