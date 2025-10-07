import { BsClockHistory, BsTrash, BsPencilSquare } from 'react-icons/bs';

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
}: GroupCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <img src={imageUrl} alt={name} className="w-full h-40 object-cover" />

      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>

        {/* Seção com os 3 detalhes (Membros, Valor, Vencimento) */}
        <div className="flex justify-between items-center mt-4 text-center">
          {/* Membros */}
          <div className="flex flex-col">
            <span className="font-bold text-lg">{memberCount}</span>
            <span className="text-sm text-gray-500">Membros</span>
          </div>

          {/* Valor */}
          <div className="flex flex-col">
            <span className="font-bold text-lg">{value}</span>
            <span className="text-sm text-gray-500">Valor</span>
          </div>

          {/* Vencimento */}
          <div className="flex flex-col">
            <span className="font-bold text-lg">Dia {dueDate}</span>
            <span className="text-sm text-gray-500">Vencimento</span>
          </div>
        </div>

        {/* Seção dos botões de ação */}
        <div className="flex items-center gap-2 mt-6">
          {/* Botões de ícone (Histórico e Excluir) */}
          <button onClick={() => onHistory(id)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <BsClockHistory size={20} className="text-gray-600" />
          </button>
          <button onClick={() => onDelete(id)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <BsTrash size={20} className="text-red-500" />
          </button>

          {/* Botão principal (Editar Grupo) - flex-grow faz ele ocupar o espaço restante */}
          <button 
            onClick={() => onEdit(id)}
            className="flex-grow flex justify-center items-center gap-2 bg-[#14879E] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#106a8c] transition-colors"
          >
            <BsPencilSquare size={16} />
            Editar grupo
          </button>
        </div>
      </div>
    </div>
  );
}