import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FooterNav from "../../../components/layout/FooterNav";
import MemberItem from "../components/MemberItem";
import HeaderForm from "../../../components/layout/HeaderForm";
import { FaCopy } from "react-icons/fa6";
import GroupHeaderInfo from "../components/GroupHeaderInfo";
import { groupService } from "../../../services/groupService";
import { useToast } from "../../../contexts/ToastContext";
import groupIcon from "../../../assets/group_icon.png";


interface Group {
  name: string;
  imageUrl: string;
  adminId: string;
}

interface Member {
  id: string;
  name: string;
  isCurrentUser: boolean;
  isManager: boolean;
  canDelete: boolean;
  imageUrl: string;
}

export default function MemberAdmin() {
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();
  const [group, setGroup] = useState<Group | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUserId = localStorage.getItem('usuarioId');
  const toast = useToast();

  useEffect(() => {
    if (groupId) {
      loadGroupData();
    }
  }, [groupId]);

  const loadGroupData = async () => {
    if (!groupId) return;
    try {
      setLoading(true);
      const groupData = await groupService.obterGrupo(groupId);

      const imageUrl = (groupData.icone && groupData.icone !== "default-icon") ? groupData.icone : groupIcon;

      setGroup({
        name: groupData.nomeGrupo,
        imageUrl: imageUrl,
        adminId: groupData.adminId
      });

      const mappedMembers: Member[] = groupData.membros.map(m => ({
        id: m.idMembro,
        name: m.nomeUsuario,
        isCurrentUser: m.idUsuario === currentUserId,
        isManager: m.idUsuario === groupData.adminId,
        canDelete: groupData.adminId === currentUserId && m.idUsuario !== currentUserId, // Only admin can delete others
        imageUrl: "/liz.png" // Placeholder as API doesn't return avatar yet
      }));

      setMembers(mappedMembers);
    } catch (error) {
      console.error("Failed to load group data", error);
      toast.error("Erro ao carregar dados do grupo");
      navigate("/home");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate("/home");
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!groupId) return;
    if (window.confirm("Tem certeza que deseja remover este membro?")) {
      try {
        await groupService.removerMembro(groupId, memberId);
        setMembers(members.filter((m) => m.id !== memberId));
        toast.success("Membro removido com sucesso");
        console.log(`Membro ${memberId} removido.`);
      } catch (error) {
        console.error("Failed to remove member", error);
        toast.error("Erro ao remover membro");
      }
    }
  };

  const handleChat = (memberId: string) => {
    console.log(`Abrir chat com membro ${memberId}`);
    // Implement chat logic here if needed
  };

  const handleCopyGroupId = async () => {
    if (groupId) {
      try {
        await navigator.clipboard.writeText(groupId);
        toast.success("Código do grupo copiado!");
      } catch (err) {
        console.error("Failed to copy:", err);
        toast.error("Erro ao copiar código");
      }
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Carregando...</div>;
  }

  if (!group) {
    return <div className="p-4 text-center">Grupo não encontrado</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#18181b] pb-20 transition-colors duration-300">
      <HeaderForm title="Membros" onBack={handleGoBack} />

      <div className="flex-grow p-4 lg:ml-10 lg:mr-10 mb-10">
        <GroupHeaderInfo groupName={group.name} />

        <div className="flex space-y-3 mb-8 gap-5 flex-col">
          {members.map((member) => (
            <MemberItem
              key={member.id}
              member={member}
              groupId={groupId!}
              onChat={handleChat}
              onRemove={handleRemoveMember}
              viewerIsAdmin={group.adminId === currentUserId}
            />
          ))}
        </div>

        <button
          onClick={handleCopyGroupId}
          className="w-full flex justify-center items-center gap-2 p-4 border-2 border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-lg transition duration-200 text-gray-500 dark:text-gray-400 font-bold"
        >
          <FaCopy />
          <span>Copiar código do grupo</span>
        </button>

      </div>

      <FooterNav />
    </div>
  );
}

