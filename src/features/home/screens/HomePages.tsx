import Header from "../components/Header";
import StatsSection from "../components/StatsSection";
import groupIcon from "../../../assets/group_icon.png";
import ActionButton from "../../../components/ui/ActionButton";
import FooterNav from "../../../components/layout/FooterNav";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { groupService, type GrupoResponse } from "../../../services/groupService";
import { authService, type UsuarioInfoResponse } from "../../../services/authService";
import { GroupCard } from "../../groups/components/GroupCard";
import { FaPlus } from "react-icons/fa";
import { useToast } from "../../../contexts/ToastContext";

function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [groups, setGroups] = useState<GrupoResponse[]>([]);
  const [stats, setStats] = useState<UsuarioInfoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [myGroups, myStats] = await Promise.all([
          groupService.listarMeusGrupos(),
          authService.getMe()
        ]);
        setGroups(myGroups);
        setStats(myStats);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const userData = {
    name: stats?.nomeUsuario || user?.name || "Usuário",
    profilePic: "https://avatars.githubusercontent.com/u/9919?s=200&v=4", // Placeholder
    pendingMembers: 0,
    totalGroups: stats?.numeroDeGrupo || groups.length,
    totalSaved: stats?.economiaTotal || 0,
    totalPaid: stats?.totalPagoNoMes || 0,
  };

  const handleCreateGroup = () => {
    navigate("/criar-novo-grupo");
  };

  const handleGroupAction = (groupId: string) => {
    // In HomePage, "Edit" or "View" will just go to View Group page usually for non-admins,
    // but GroupCard logic handles redirect based on passed ID. 
    // Actually GroupCard takes onEdit, onHistory, onDelete props.
    // For Home, we primarily want to View.
    // We will duplicate logic: "Editar" -> /editar-grupo/id (if admin) or View if we change it.
    // But GroupCard redirects to /editar-grupo/${id} on edit.
    navigate(`/editar-grupo/${groupId}`);
  };

  const handleViewHistory = (groupId: string) => {
    // Need memberId? GroupCard doesn't seem to pass memberId, just groupId.
    // The onHistory prop in GroupCard expects a function (groupId).
    // Let's assume we want to view *current user's* history in that group.
    // We need to know current user ID.
    const currentUserId = user?.id || localStorage.getItem('usuarioId');
    if (currentUserId) {
      navigate(`/grupo/${groupId}/historico/${currentUserId}`);
    }
  };

  const handleDeleteGroup = async (groupId: string) => {
    // We probably shouldn't allow delete directly from Home without confirmation, 
    // but GroupCard asks for onDelete.
    // Maybe we can pass a dummy function or handle it? 
    // Let's passed undefined or empty function if we don't want it, 
    // OR implement it if we want full power on Home.
    // Let's IMPLEMENT it for consistency.
    if (window.confirm("Tem certeza que deseja excluir este grupo?")) {
      try {
        await groupService.deletarGrupo(groupId);
        setGroups(groups.filter(g => g.id !== groupId));
        toast.success("Grupo excluído com sucesso");
      } catch (error) {
        console.error("Erro ao deletar grupo", error);
        toast.error("Erro ao deletar grupo");
      }
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#18181b] flex flex-col pb-24 transition-colors duration-300">
      <Header userName={userData.name} profilePic={userData.profilePic} />

      <StatsSection stats={userData} />

      <main className="flex-grow px-6 container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Meus Grupos</h3>
          <button
            onClick={handleCreateGroup}
            className="flex items-center gap-2 text-[#F34403] font-bold text-sm bg-orange-50 dark:bg-orange-900/20 dark:text-[#F34403] px-4 py-2 rounded-full hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors"
          >
            <FaPlus /> Novo Grupo
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#14879E]"></div>
          </div>
        ) : (
          <>
            {groups.length === 0 ? (
              <div className="text-center py-10 bg-white dark:bg-[#27272a] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                <img src={groupIcon} alt="Empty" className="w-16 h-16 mx-auto opacity-30 mb-4" />
                <p className="text-gray-500 dark:text-gray-400 mb-4">Você ainda não possui grupos.</p>
                <ActionButton
                  text="CRIAR PRIMEIRO GRUPO"
                  onClick={handleCreateGroup}
                  className="px-6 py-3 text-white bg-[#F34403] hover:bg-[#e44005] rounded-xl font-bold mx-auto inline-block"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.map(group => (
                  <GroupCard
                    key={group.id}
                    id={group.id}
                    name={group.nomeGrupo}
                    memberCount={group.membros.length}
                    value={"R$ 0,00"} // Default since API doesn't provide
                    dueDate={10} // Default
                    imageUrl={(group.icone && group.icone !== 'default-icon') ? group.icone : groupIcon}
                    onEdit={handleGroupAction}
                    onDelete={handleDeleteGroup}
                    onHistory={handleViewHistory}
                    isAdmin={group.adminId === (user?.id || localStorage.getItem('usuarioId'))}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <FooterNav />
    </div>
  );
}

export default HomePage;
