import FooterNav from "../../../components/layout/FooterNav";
import { GroupCard } from '../components/GroupCard';
import { useNavigate } from 'react-router-dom'; // Para a navegação

const mockGroups = [
  {
    id: 'disney123',
    name: 'Disney',
    memberCount: 6,
    value: 'R$43,90',
    dueDate: 27,
    imageUrl: '/ImagemDisney.svg' 
  },
  {
    id: 'aluguel456',
    name: 'Aluguel Mi Casita',
    memberCount: 2,
    value: 'R$800',
    dueDate: 5,
    imageUrl: '/ImagemAluguel.svg', 
  },
  {
    id: 'netflix456',
    name: 'Aluguel Mi Casita',
    memberCount: 2,
    value: 'R$800',
    dueDate: 3,
    imageUrl: '/ImagemAluguel.svg', 
  },
  {
    id: 'netflix456',
    name: 'Aluguel Mi Casita',
    memberCount: 2,
    value: 'R$800',
    dueDate: 3,
    imageUrl: '/ImagemAluguel.svg', 
  },
  {
    id: 'netflix456',
    name: 'Aluguel Mi Casita',
    memberCount: 2,
    value: 'R$800',
    dueDate: 3,
    imageUrl: '/ImagemAluguel.svg', 
  },
  {
    id: 'netflix456',
    name: 'Aluguel Mi Casita',
    memberCount: 2,
    value: 'R$800',
    dueDate: 3,
    imageUrl: '/ImagemAluguel.svg', 
  },
  
];

export function GroupsPage() {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/editar-grupo`);
  };

  const handleDelete = (groupId: string) => {
    alert(`Lógica para DELETAR o grupo ${groupId} aqui!`);
  };

  const handleHistory = (groupId: string) => {
    alert(`Lógica para ver o HISTÓRICO do grupo ${groupId} aqui!`);
    navigate(`/history`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-4 pb-24 lg:ml-5 lg:mr-5 md:ml-5 md:mr-5"> 
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Grupos</h1>

        <div className=" grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 justify-center gap-8 mb-5">
          {mockGroups.map((group) => (
            <GroupCard
              key={group.id}
              id={group.id}
              name={group.name}
              memberCount={group.memberCount}
              value={group.value}
              dueDate={group.dueDate}
              imageUrl={group.imageUrl}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onHistory={handleHistory}
            />
          ))}
        </div>
      </div>

      <FooterNav />
    </div>
  );
}
