import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FooterNav from '../../../components/layout/FooterNav';
import HeaderForm from '../../../components/layout/HeaderForm';
import Input from '../../../components/ui/Input';
import GroupInviteModal from '../components/GroupInviteModal';
import ActionButton from '../../../components/ui/ActionButton';
import { GroupContext } from '../../context/GroupContext';


interface GroupDetails {
    id: string;
    name: string;
    description: string;
    adminName: string;
    cod: string;
}

export default function FriendsPage() {

  const [groupCode, setGroupCode] = useState(''); // Armazena o código digitado
  const [foundGroup, setFoundGroup] = useState<GroupDetails | null>(null); // Armazena o grupo encontrado
  const [isLoading, setIsLoading] = useState(false); // Para desabilitar o botão durante a busca
  const [searchError, setSearchError] = useState(''); // Para exibir erros de busca

  const context = useContext(GroupContext);
  
  const { isModalOpen, closeModalConvite, openModalConvite } = context;
  
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem('usuarioId');

  useEffect(() => {
    loadFriendsFromGroups();
  }, []);

  const loadFriendsFromGroups = async () => {
    try {
      const groups = await groupService.listarMeusGrupos();
      const uniqueFriends = new Map<string, Friend>();

      groups.forEach(group => {
        group.membros.forEach(member => {
          if (member.idUsuario !== currentUserId) {
            uniqueFriends.set(member.idUsuario, {
              id: member.idUsuario,
              name: member.nomeUsuario
            });
          }
        });
      });

      setFriends(Array.from(uniqueFriends.values()));
    } catch (error) {
      console.error("Failed to load friends from groups", error);
    }
  };

  const handleGoBack = () => {
    navigate("/home");
  };

  const handleSearchGroup = async () => {
    if (groupCode.trim() === '') {
        setSearchError("O código do grupo não pode ser vazio.");
        return;
    }

    setIsLoading(true);
    setSearchError('');
    
    try {
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        const mockDetails: GroupDetails = {
            id: 'DISNEY123',
            name: 'Disney Plus - Família',
            description: 'Grupo para dividir a assinatura de streaming.',
            adminName: 'Gustavo Santana',
            cod: "123456",
        };
        
        setFoundGroup(mockDetails);
        openModalConvite(); 
        setGroupCode(''); 

      } catch (error) {
          setSearchError("Grupo não encontrado ou erro de conexão.");
          setFoundGroup(null);
      } finally {
          setIsLoading(false);
      }
  };

    const handleJoinGroup = async () => {
        if (!foundGroup) return;

        console.log(`Usuário entrou no grupo: ${foundGroup.name}`);

        navigate(`/grupo/${foundGroup.id}`); 
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // Impede o recarregamento da página
      handleSearchGroup(); // Chama a função de busca
    };

  return (
    <div className="flex flex-col min-h-screen bg-white pb-20">
      
      <HeaderForm title="Convite" onBack={handleGoBack} />
      
      <div className="flex-grow p-4 lg:ml-50 lg:mr-50 md:ml-40 lg:mb-10 md:mr-40">

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Buscar Grupo</h2>
          <form onSubmit={handleSubmit} className="flex items-center space-x-3">
            
            <Input
              placeholder="Inserir código do grupo"
              type="text"
              value={groupCode}
              onChange={(e) => setGroupCode(e.target.value)}
              className="flex-grow py-3 px-4 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none hover:translate-y-[1px] hover:shadow-lg" 
            />
            
            <ActionButton
              type='submit'
              text={isLoading ? "Buscando..." : "Buscar"}
              disabled={isLoading}
              className="hover:bg-[#106a8c] bg-[#14879E] text-white p-3 rounded-lg transition-colors duration-200 hover:translate-y-[1px] hover:shadow-lg">
                Buscar
            </ActionButton>

          </form>
            {searchError && (
              <p className="text-red-500 text-sm mt-2">{searchError}</p>
          )}
        </div>

            {isModalOpen && foundGroup && (
                <GroupInviteModal
                    isOpen={isModalOpen}
                    group={foundGroup}
                    onClose={closeModalConvite} 
                    onConfirm={handleJoinGroup} 
                />
            )}
        
      </div>

      <FooterNav />
    </div>
  );
}
