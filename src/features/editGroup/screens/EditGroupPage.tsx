import { useEffect, useState } from "react";
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
import { expenseService } from "../../../services/expenseService";

// ... (existing code)



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
    getValues,
    formState: { errors },
  } = useForm<CreateGroupFormInputs>();

  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();
  const [loading, setLoading] = useState(false);
  const [memberCount, setMemberCount] = useState(0);

  useEffect(() => {
    if (groupId) {
      setLoading(true);
      groupService.obterGrupo(groupId)
        .then(group => {
          setValue("groupName", group.nomeGrupo);
          setValue("description", group.descricao);

          setMemberCount(group.membros?.length || 0);
        })
        .catch(err => console.error("Failed to load group:", err))
        .finally(() => setLoading(false));
    }
  }, [groupId, setValue]);

  const handleGenerateExpense = async () => {
    if (!groupId) return;

    if (memberCount <= 1) {
      alert("Necessário ter mais de 1 membro para gerar despesa.");
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
      alert("Grupo atualizado com sucesso!");
      navigate("/home");
    } catch (error) {
      console.error("Failed to update group:", error);
      alert("Erro ao atualizar grupo.");
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
      className="flex flex-col min-h-screen bg-white pb-20"
    >
      <HeaderForm title="Editar Grupo" onBack={handleGoBack} />
      <div className="flex-grow p-6 lg:ml-35 lg:mr-35 mb-10">
        <div className="flex-grow p-0.90">
          <FileUploadButton {...register("groupImage")} />
        </div>

        <FormSection title="Nome do grupo">
          <Input
            placeholder="Ex: Netflix Família, Aluguel do AP..."
            {...register("groupName", {
              required: "Nome do grupo é obrigatório",
            })}
            type="text"
            className="w-full py-3 px-4 border-2 border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500 hover:translate-y-[1px] hover:shadow-lg"
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
            className="w-full py-3 px-4 border-2 border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500 hover:translate-y-[1px] hover:shadow-lg"
          />
        </FormSection>





        {groupId && <MembersLink memberCount={memberCount} groupId={groupId} />}

        <FormSection title="">
          <div className="mt-8 flex justify-end gap-4 flex-wrap">
            <ActionButton
              text="ADICIONAR PARTICIPANTES"
              type="button"
              onClick={() => navigate(`/grupo/${groupId}/participantes`)}
              className="py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-xl font-bold transition-colors duration-300 shadow-2xl hover:translate-y-[1px] hover:shadow-lg"
            />
            <ActionButton
              text="GERAR DESPESA"
              type="button"
              onClick={handleGenerateExpense}
              className="py-3 px-6 text-white bg-green-600 hover:bg-green-700 rounded-lg text-xl font-bold transition-colors duration-300 shadow-2xl hover:translate-y-[1px] hover:shadow-lg"
            />
            <ActionButton
              text="SALVAR"
              type="submit"
              className="py-3 px-10 text-white bg-[#14879E] hover:bg-[#106a8c] rounded-lg text-xl font-bold transition-colors duration-300 shadow-2xl hover:translate-y-[1px] hover:shadow-lg"
            />
          </div>
        </FormSection>
      </div>
      <FooterNav />
    </form>
  );
}

export default EditGroupPage;
