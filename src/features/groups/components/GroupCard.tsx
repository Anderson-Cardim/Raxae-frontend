import { BsClockHistory, BsTrash, BsPencilSquare, BsEye, BsWallet2 } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export interface GroupCardProps {
  id: string;
  name: string;
  memberCount: number;
  value: string;
  dueDate: number;
  imageUrl: string;
  onEdit: (groupId: string) => void;
  onDelete: (groupId: string) => void;
  onHistory: (groupId: string) => void;
  isAdmin?: boolean;
}

export function GroupCard({
  id,
  name,
  memberCount,
  value,
  dueDate,
  imageUrl,
  onEdit,
  onDelete,
  onHistory,
  isAdmin = false,
}: GroupCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <img src={imageUrl} alt={name} className="w-full h-40 object-cover" />

      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>

        <div className="flex justify-between items-center mt-4 text-center">
          <div className="flex flex-col">
            <span className="font-bold text-lg">{memberCount}</span>
            <span className="text-sm text-gray-500">Membros</span>
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-lg">{value}</span>
            <span className="text-sm text-gray-500">Valor</span>
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-lg">Dia {dueDate}</span>
            <span className="text-sm text-gray-500">Vencimento</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-6">
          <button onClick={() => onHistory(id)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <BsClockHistory size={20} className="text-gray-600 cursor-pointer" />
          </button>

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