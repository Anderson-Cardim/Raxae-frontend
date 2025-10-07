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
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
        
        <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <FaUser className="text-blue-500" size={18} />
            </div>
            
            <span className="text-gray-800 text-base">{friend.name}</span>
        </div>
        
        <button 
            onClick={() => onDelete(friend.id)}
            className="p-2 text-blue-500 hover:text-blue-700 transition-colors"
            aria-label={`Excluir amigo ${friend.name}`}
        >
            <BsTrash size={20} />
        </button>
        </div>
    );
}
