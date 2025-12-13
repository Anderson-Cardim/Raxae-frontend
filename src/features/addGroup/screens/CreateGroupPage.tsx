import { useContext } from "react";
import HeaderForm from "../../../components/layout/HeaderForm";
import FormSection from "../components/FormSection";
import Input from "../../../components/ui/Input";
import FooterNav from "../../../components/layout/FooterNav";

import ActionButton from "../../../components/ui/ActionButton";
import FileUploadButton from "../../../components/ui/FileUploadButton";
import { useForm } from "react-hook-form";

import { groupService, type GrupoRequest } from "../../../services/groupService";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../contexts/ToastContext";

type CreateGroupFormInputs = {
  groupImage: FileList;
  groupName: string;
  description: string;

};



function CreateGroupPage() {
  const { register, handleSubmit, formState: { errors }, } = useForm<CreateGroupFormInputs>();

  const navigate = useNavigate();
  const toast = useToast();



  const onSubmit = async (data: CreateGroupFormInputs) => {
    try {
      const grupoRequest: GrupoRequest = {
        nomeGrupo: data.groupName,
        descricao: data.description || "",
        icone: "default-icon",
      };

      await groupService.criarGrupo(grupoRequest);
      toast.success("Grupo criado com sucesso!");
      navigate("/home");
    } catch (error) {
      console.error("Erro ao criar grupo:", error);
      toast.error("Erro ao criar grupo.");
    }
  };

  const handleGoBack = () => {
    navigate("/home");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col min-h-screen bg-white dark:bg-[#18181b] pb-20 transition-colors duration-300"
    >
      <HeaderForm title="Criar Novo Grupo" onBack={handleGoBack} />
      <div className="flex-grow p-6 lg:ml-35 lg:mr-35">
        <FileUploadButton  {...register("groupImage")} />

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



        <FormSection title="">
          <div className="p-0.90 pt-4">
            <ActionButton
              text="CRIAR GRUPO"
              type="submit"
              className="w-full py-4 text-white bg-[#F34403] hover:bg-[#e44005] rounded-2xl font-bold transition-colors duration-300 transition-colors duration-300 cursor-pointer hover:translate-y-[1px] hover:shadow-lg"
            />
          </div>
        </FormSection>
      </div>
      <FooterNav />
    </form>
  );
}

export default CreateGroupPage;
