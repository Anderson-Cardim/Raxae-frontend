import { useContext, useEffect, useState } from "react";
import FooterNav from "../../../components/layout/FooterNav";
import { GroupCard } from '../components/GroupCard';
import { useNavigate } from 'react-router-dom';
import { groupService } from "../../../services/groupService";
import type { GrupoResponse } from "../../../services/groupService";
import { useAuth } from "../../context/AuthContext";

export function GroupsPage() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<GrupoResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  const currentUserId = user?.id;
  
  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    try {
      setLoading(true);
      const data = await groupService.listarMeusGrupos();
      setGroups(data);
    } catch (error) {
      console.error("Failed to load groups", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (groupId: string, isAdmin: boolean) => {
    if (isAdmin) {
      navigate(`/editar-grupo/${groupId}`);
    } else {
      navigate(`/grupo/${groupId}/membro`);
    }
  };

  const handleDelete = async (groupId: string) => {
    if (window.confirm("Tem certeza que deseja excluir este grupo?")) {
      try {
        await groupService.deletarGrupo(groupId);
        loadGroups(); 
      } catch (error) {
        console.error("Failed to delete group", error);
        alert("Apenas o admin pode excluir grupo");
      }
    }
  };

  const handleHistory = (groupId: string) => {
    navigate(`/grupo/${groupId}/historico`);
  };

  if (loading) {
    return <div className="p-4 text-center">Carregando grupos...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-4 pb-24 lg:ml-5 lg:mr-5 md:ml-5 md:mr-5">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Grupos</h1>

        <div className=" grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 justify-center gap-8 mb-5">
          {groups.map((group) => {
            const isAdmin = group.adminId === currentUserId;
            return (
              <GroupCard
                key={group.id}
                id={group.id}
                name={group.nomeGrupo}
                memberCount={group.membros.length}
                value={'R$ 0,00'} 
                dueDate={10}
                imageUrl={group.icone || '/ImagemDisney.svg'}
                adminId={group.adminId}
                currentUserId={currentUserId || ''}
                onEdit={() => handleEdit(group.id, isAdmin)}
                onDelete={() => handleDelete(group.id)}
                onHistory={() => handleHistory(group.id)}
                isAdmin={isAdmin}
              />
            );
          })}
          {groups.length === 0 && (
            <p className="text-gray-500 col-span-full text-center">Nenhum grupo encontrado.</p>
          )}
        </div>
      </div>

      <FooterNav />
    </div>
  );
}

