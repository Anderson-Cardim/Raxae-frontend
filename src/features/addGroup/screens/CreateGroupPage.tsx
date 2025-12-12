import HeaderForm from "../../../components/layout/HeaderForm";
import FormSection from "../components/FormSection";
import Input from "../../../components/ui/Input";
import FooterNav from "../../../components/layout/FooterNav";
import ActionButton from "../../../components/ui/ActionButton";
import FileUploadButton from "../../../components/ui/FileUploadButton";
import { useForm, useWatch } from "react-hook-form";
import { groupService, type GrupoRequest } from "../../../services/groupService";
import { useNavigate } from "react-router-dom";

function CreateGroupPage() {
  const { register, handleSubmit, setValue, control, formState: { errors }, } = useForm<GrupoRequest>();

  const navigate = useNavigate();

  const iconeValue = useWatch({ control, name: 'icone', defaultValue: '' });

  const onSubmit = async (data: GrupoRequest) => {
    try {

      const iconeParaEnvio = data.icone || "abc";

      const grupoRequest: GrupoRequest = {
        nomeGrupo: data.nomeGrupo,
        descricao: data.descricao || "",
        icone: iconeParaEnvio,
      };

      await groupService.criarGrupo(grupoRequest);
      alert("Grupo criado com sucesso!");
      navigate("/home");
    } catch (error) {
      console.error("Erro ao criar grupo:", error);
      alert("Erro ao criar grupo.");
    }
  };

  const handleGoBack = () => {
    navigate("/home");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col min-h-screen bg-white pb-20"
    >
      <HeaderForm title="Criar Novo Grupo" onBack={handleGoBack} />
      <div className="flex-grow p-6 lg:ml-35 lg:mr-35">

        <FileUploadButton 
          name="icone" 
          value={iconeValue as string} 
          onChange={(e) => setValue("icone", e.target.value as string)}
        />

        <FormSection title="Nome do grupo">
          <Input
            placeholder="Ex: Netflix Família, Aluguel do AP..."
            {...register("nomeGrupo", {
              required: "Nome do grupo é obrigatório",
            })}
            type="text"
            className="w-full py-3 px-4 border-2 border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500"
          />
          {errors.nomeGrupo && (
            <p className="text-red-500 text-sm mt-1">
              {errors.nomeGrupo.message}
            </p>
          )}
        </FormSection>

        <FormSection title="Descrição do grupo">
          <Input
            placeholder="Opcional"
            type="text"
            {...register("descricao")}
            className="w-full py-3 px-4 border-2 border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500"
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
