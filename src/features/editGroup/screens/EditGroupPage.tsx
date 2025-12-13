import { useEffect, useState } from "react";
import groupIcon from "../../../assets/group_icon.png";
import HeaderForm from "../../../components/layout/HeaderForm";
import FormSection from "../components/FormSection";
import { MembersLink } from '../components/linkMembros';
import Input from "../../../components/ui/Input";
import FooterNav from "../../../components/layout/FooterNav";
import ActionButton from "../../../components/ui/ActionButton";
import FileUploadButton from "../../../components/ui/FileUploadButton";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { groupService, type GrupoRequest } from "../../../services/groupService";
import { useToast } from "../../../contexts/ToastContext";

type CreateGroupFormInputs = {
  groupImage: FileList;
  groupName: string;
  description: string;
};

function EditGroupPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateGroupFormInputs>();

  const currentGroupName = watch("groupName");

  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();
  const [loading, setLoading] = useState(false);
  const [memberCount, setMemberCount] = useState(0);
  const [mockImageUrl, setMockImageUrl] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    if (groupId) {
      setLoading(true);
      groupService.obterGrupo(groupId)
        .then(group => {
          setValue("groupName", group.nomeGrupo);
          setValue("description", group.descricao);

          setMemberCount(group.membros?.length || 0);
          setMockImageUrl(groupIcon);
        })
        .catch(err => console.error("Failed to load group:", err))
        .finally(() => setLoading(false));
    }
  }, [groupId, setValue]);

  const handleGenerateExpense = async () => {
    if (!groupId) return;

    if (memberCount <= 1) {
      toast.warning("Necessário ter mais de 1 membro para gerar despesa.");
      return;
    }

    navigate(`/grupo/${groupId}/despesas/nova`);
  };

  const onSubmit = async (data: CreateGroupFormInputs) => {
    if (!groupId) return;

    setLoading(true);
    try {
      const updateData: GrupoRequest = {
        nomeGrupo: data.groupName,
        descricao: data.description,
        icone: "default-icon", // Keeping the mock icon as requested
      };

      await groupService.editarGrupo(groupId, updateData);
      toast.success("Grupo atualizado com sucesso!");
      navigate("/home");
    } catch (error) {
      console.error("Failed to update group:", error);
      toast.error("Erro ao atualizar grupo.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate("/home");
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col min-h-screen bg-white dark:bg-[#18181b] pb-20 transition-colors duration-300"
    >
      <HeaderForm title="Editar Grupo" onBack={handleGoBack} />
      <div className="flex-grow p-6 lg:ml-35 lg:mr-35 mb-10">
        <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-[#27272a] rounded-2xl p-6 mb-8 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <FileUploadButton
            initialPreviewUrl={mockImageUrl || undefined}
            {...register("groupImage")}
            className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-600 shadow-lg bg-gray-200 dark:bg-gray-800 mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
            {currentGroupName || "Nome do Grupo"}
          </h2>
        </div>

        <FormSection title="Nome do grupo">
          <Input
            placeholder="Ex: Netflix Família, Aluguel do AP..."
            {...register("groupName", {
              required: "Nome do grupo é obrigatório",
            })}
            type="text"
            className="w-full py-3 px-4 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-[#27272a] rounded-xl text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-gray-500 hover:translate-y-[1px] hover:shadow-lg"
          />
          {errors.groupName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.groupName.message}
            </p>
          )}
        </FormSection>

        <FormSection title="Descrição do grupo">
          <Input
            placeholder="Opcional"
            type="text"
            {...register("description")}
            className="w-full py-3 px-4 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-[#27272a] rounded-xl text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:border-gray-500 hover:translate-y-[1px] hover:shadow-lg"
          />
        </FormSection>





        {groupId && <MembersLink memberCount={memberCount} groupId={groupId} />}

        <FormSection title="">
          <div className="mt-8 flex flex-col md:flex-row justify-end gap-4">
            <ActionButton
              text="ADICIONAR PARTICIPANTES"
              type="button"
              onClick={() => navigate(`/grupo/${groupId}/participantes`)}
              className="py-3 px-6 w-full md:w-auto text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-xl font-bold transition-colors duration-300 shadow-2xl hover:translate-y-[1px] hover:shadow-lg"
            />
            <ActionButton
              text="GERAR DESPESA"
              type="button"
              onClick={handleGenerateExpense}
              className="py-3 px-6 w-full md:w-auto text-white bg-green-600 hover:bg-green-700 rounded-lg text-xl font-bold transition-colors duration-300 shadow-2xl hover:translate-y-[1px] hover:shadow-lg"
            />
            <ActionButton
              text="SALVAR"
              type="submit"
              className="py-3 px-10 w-full md:w-auto text-white bg-[#14879E] hover:bg-[#106a8c] rounded-lg text-xl font-bold transition-colors duration-300 shadow-2xl hover:translate-y-[1px] hover:shadow-lg"
            />
          </div>
        </FormSection>
      </div>
      <FooterNav />
    </form>
  );
}

export default EditGroupPage;
