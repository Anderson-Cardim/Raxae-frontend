import { useEffect, useState } from "react";
import FooterNav from "../../../components/layout/FooterNav";
import { GroupCard } from '../components/GroupCard';
import { JoinGroupSection } from '../components/JoinGroupSection';
import { useNavigate } from 'react-router-dom';
import { groupService } from "../../../services/groupService";
import type { GrupoResponse } from "../../../services/groupService";
import { useToast } from "../../../contexts/ToastContext";
import groupIcon from "../../../assets/group_icon.png";

export function GroupsPage() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<GrupoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUserId = localStorage.getItem('usuarioId');
  const toast = useToast();

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
    console.log(`Navigating group ${groupId} as admin: ${isAdmin}`);
    if (isAdmin) {
      navigate(`/editar-grupo/${groupId}`);
    } else {
      navigate(`/ver-grupo/${groupId}`);
    }
  };

  const handleDelete = async (groupId: string) => {
    if (window.confirm("Tem certeza que deseja excluir este grupo?")) {
      try {
        await groupService.deletarGrupo(groupId);
        toast.success("Grupo excluído com sucesso!");
        loadGroups(); // Reload list
      } catch (error) {
        console.error("Failed to delete group", error);
        toast.error("Erro ao excluir grupo");
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
    <div className="bg-gray-50 dark:bg-[#18181b] min-h-screen transition-colors duration-300">
      <div className="p-4 pb-24 lg:ml-5 lg:mr-5 md:ml-5 md:mr-5">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Grupos</h1>


        <JoinGroupSection onJoinSuccess={loadGroups} />

        <div className=" grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 justify-center gap-8 mb-5">
          {groups.map((group) => {
            const isAdmin = String(group.adminId) === String(currentUserId);
            return (
              <GroupCard
                key={group.id}
                id={group.id}
                name={group.nomeGrupo}
                memberCount={group.membros.length}
                value={group.valorTotal !== undefined ? `R$ ${group.valorTotal.toFixed(2).replace('.', ',')}` : "R$ 0,00"}

                imageUrl={(!group.icone || group.icone === "default-icon") ? groupIcon : group.icone}
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

