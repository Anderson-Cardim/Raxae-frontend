import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderForm from "../../../components/layout/HeaderForm";
import GroupInfoCard from "../components/GroupInfoCard";
import FooterNav from "../../../components/layout/FooterNav";
import { GroupContext } from "../../context/GroupContext";
import ActionButton from "../../../components/ui/ActionButton";
import { groupService } from "../../../services/groupService";
import { useToast } from "../../../contexts/ToastContext";

function AddParticipantsPage() {
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();
  const context = useContext(GroupContext);
  const toast = useToast();

  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupImage, setGroupImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (groupId) {
      groupService.obterGrupo(groupId).then(group => {
        setGroupName(group.nomeGrupo);
        setGroupDescription(group.descricao);
        // setGroupImage(group.icone); // Handle icon/image if needed
        // setMembers(group.membros); // If we want to show existing members
      }).catch(console.error);
    } else if (context?.group) {
      setGroupName(context.group.groupName);
      setGroupDescription(context.group.description || "");
    }
  }, [groupId, context]);


  const handleGoBack = () => {
    if (groupId) {
      navigate(`/editar-grupo/${groupId}`);
    } else {
      navigate("/criar-novo-grupo");
    }
  };

  const onGenerateInvite = async () => {
    if (groupId) {
      try {
        const link = await groupService.gerarConvite(groupId);
        navigator.clipboard.writeText(link);
        toast.success("Link de convite copiado para a área de transferência!");
      } catch (error) {
        console.error("Erro ao gerar convite:", error);
        toast.error("Erro ao gerar convite.");
      }
    } else {
      toast.warning("Salve o grupo primeiro para gerar convites.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#18181b] pb-20 transition-colors duration-300">
      <HeaderForm title="Adicionar Participantes" onBack={handleGoBack} />
      <div className="flex-grow p-4 lg:ml-50 lg:mr-50 md:ml-40 lg:mb-10 md:mr-40 ">
        <GroupInfoCard
          className={"flex items-center mt-9 mb-15"}
          groupName={groupName}
          description={groupDescription}
          imageUrl={groupImage}
        />

        <div className="mt-6">
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
            Para adicionar participantes, gere um link de convite e compartilhe com eles.
          </p>
          <ActionButton
            text="GERAR LINK DE CONVITE"
            type="button"
            onClick={onGenerateInvite}
            className="w-full py-3 text-white  bg-[#F34403] hover:bg-[#e44005] rounded-xl font-bold transition-colors duration-300 hover:translate-y-[1px] hover:shadow-lg"
          />
        </div>

        <div className="pt-10">
          <ActionButton
            text="VOLTAR"
            type="button"
            onClick={handleGoBack}
            className="w-full py-3 text-white  bg-gray-500 hover:bg-gray-600 rounded-xl font-bold transition-colors duration-300 hover:translate-y-[1px] hover:shadow-lg"
          />
        </div>
      </div>
      <FooterNav />
    </div>
  );
}

export default AddParticipantsPage;
