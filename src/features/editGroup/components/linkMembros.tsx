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
        w-full p-4 bg-white dark:bg-[#27272a]
        border border-gray-200 dark:border-gray-700
        rounded-xl shadow-sm transition-colors duration-300
      "
    >
      <p className="font-bold text-gray-800 dark:text-gray-100">
        Membros - {memberCount} nesse grupo
      </p>

      <Link
        to={`/grupo/membro/admin/${groupId}`}
        className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      >
        <BsThreeDots size={28} />
      </Link>
    </div>
  );
}