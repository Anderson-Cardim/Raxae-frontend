import FooterNav from "../../../components/layout/FooterNav";
import { GroupCard } from '../components/GroupCard';
import { useNavigate } from 'react-router-dom'; // Para a navegação

// 1. Dados de exemplo (mock data)
const mockGroups = [
  {
    id: 'disney123',
    name: 'Disney',
    memberCount: 6,
    value: 'R$43,90',
    dueDate: 27,
    imageUrl: '/ImagemDisney.svg' // Supondo que as imagens estejam na pasta public
  },
  {
    id: 'aluguel456',
    name: 'Aluguel Mi Casita',
    memberCount: 2,
    value: 'R$800',
    dueDate: 5,
    imageUrl: '/ImagemAluguel.svg', // Supondo que as imagens estejam na pasta public
  },
];

export function GroupsPage() {
  const navigate = useNavigate();

  // Funções que serão passadas para os botões do card
  const handleEdit = (groupId: string) => {
    // Navega para a página de edição com o ID do grupo
    navigate(`/editar-grupo/${groupId}`);
  };

  const handleDelete = (groupId: string) => {
    alert(`Lógica para DELETAR o grupo ${groupId} aqui!`);
  };

  const handleHistory = (groupId: string) => {
    alert(`Lógica para ver o HISTÓRICO do grupo ${groupId} aqui!`);
  };

  return (
    // Contêiner principal da página
    <div className="bg-gray-50 min-h-screen">
      {/* Conteúdo da página */}
      <div className="p-4 pb-24"> {/* Padding no final para não sobrepor o FooterNav */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Grupos</h1>

        {/* Container para a lista de cards */}
        <div className="flex flex-col gap-6">
          {/* 2. Usando .map() para renderizar a lista */}
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

      {/* Navegação Fixa no Fim */}
      <FooterNav />
    </div>
  );
}

export function GroupPage() {

    return (
        <div className="flex flex-col min-h-screen bg-white pb-20">
            <div className="flex-grow p-6">
                <h1 className="text-5xl font-bold">Grupo</h1>
            </div>

            

            <FooterNav/>
        </div>
    );
}