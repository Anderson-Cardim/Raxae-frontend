import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FooterNav from "../../../components/layout/FooterNav";
import MemberItem from "../components/MemberItem";
import HeaderForm from "../../../components/layout/HeaderForm";
import { FaPlus } from "react-icons/fa6";
import GroupHeaderInfo from "../components/GroupHeaderInfo";
import { groupService } from "../../../services/groupService";


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

      setGroup({
        name: groupData.nomeGrupo,
        imageUrl: groupData.icone || "/ImagemDisney.svg",
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
      alert("Erro ao carregar dados do grupo");
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
        console.log(`Membro ${memberId} removido.`);
      } catch (error) {
        console.error("Failed to remove member", error);
        alert("Erro ao remover membro");
      }
    }
  };

  const handleChat = (memberId: string) => {
    console.log(`Abrir chat com membro ${memberId}`);
    // Implement chat logic here if needed
  };

  const handleAddMember = () => {
    if (groupId) {
      navigate(`/grupo/${groupId}/convite`); // Or whatever route for adding members
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Carregando...</div>;
  }

  if (!group) {
    return <div className="p-4 text-center">Grupo não encontrado</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white pb-20">
      <HeaderForm title="Membros" onBack={handleGoBack} />

      <div className="flex-grow p-4 lg:ml-10 lg:mr-10 mb-10">
        <GroupHeaderInfo groupName={group.name} imageUrl={group.imageUrl} />

        <div className="flex space-y-3 mb-8 gap-5 flex-col">
          {members.map((member) => (
            <MemberItem
              key={member.id}
              member={member}
              onChat={handleChat}
              onRemove={handleRemoveMember}
            />
          ))}
        </div>

        <button
          onClick={handleAddMember}
          className="w-full flex justify-center items-center p-8 border-2 border-gray-300 rounded-xl cursor-pointer hover:bg-gray-100 hover:shadow-lg transition duration-200"
        >
          <FaPlus />
        </button>

      </div>

      <FooterNav />
    </div>
  );
}

