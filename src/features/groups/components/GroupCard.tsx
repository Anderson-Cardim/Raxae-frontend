import { BsTrash, BsPencilSquare, BsEye, BsWallet2 } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import AuthenticatedImage from '../../../components/ui/AuthenticatedImage';
import defaultGroupIcon from '../../../assets/group_icon.png';

export interface GroupCardProps {
  id: string;
  name: string;
  memberCount: number;
  value: string;

  imageUrl: string;
  onEdit: (groupId: string) => void;
  onDelete: (groupId: string) => void;
  isAdmin?: boolean;
}

export function GroupCard({
  id,
  name,
  memberCount,
  value,

  imageUrl,
  onEdit,
  onDelete,
  isAdmin = false,
}: GroupCardProps) {
  const navigate = useNavigate();

  // Decide whether to fetch the real image or show default
  // Assuming 'default-icon' or null/empty means no custom image.
  // We can also just try to fetch if we are not sure, but 'default-icon' check is safer.
  const shouldFetch = imageUrl && imageUrl !== 'default-icon';
  const targetUrl = shouldFetch ? `/v1/grupo/${id}/icone` : '';

  return (
    <div className="bg-white dark:bg-[#27272a] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-md transition-shadow">
      <AuthenticatedImage
        url={targetUrl}
        alt={name}
        className="w-full h-40 object-cover"
        fallbackIcon={defaultGroupIcon}
      />

      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{name}</h2>

        <div className="flex justify-between items-center mt-4 text-center">
          <div className="flex flex-col">
            <span className="font-bold text-lg dark:text-gray-200">{memberCount}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">Membros</span>
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-lg dark:text-gray-200">{value}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">Valor</span>
          </div>


        </div>

        <div className="flex items-center gap-2 mt-6">


          {isAdmin && (
            <>
              <button
                onClick={() => navigate(`/grupo/${id}/pagamentos`)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                title="Pagamentos"
              >
                <BsWallet2 size={20} className="text-green-600 cursor-pointer" />
              </button>
              <button onClick={() => onDelete(id)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <BsTrash size={20} className="text-red-500 cursor-pointer" />
              </button>
            </>
          )}

          <button
            onClick={() => onEdit(id)}
            className={`flex-grow flex justify-center items-center gap-2 ${isAdmin ? 'bg-[#14879E] hover:bg-[#106a8c]' : 'bg-gray-600 hover:bg-gray-700'} text-white font-bold py-2 px-4 rounded-lg transition-colors cursor-pointer`}
          >
            {isAdmin ? <BsPencilSquare size={16} /> : <BsEye size={16} />}
            {isAdmin ? 'Editar grupo' : 'Ver grupo'}
          </button>
        </div>
      </div>
    </div>
  );
}