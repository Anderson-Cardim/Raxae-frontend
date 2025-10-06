import React, { useContext } from "react";
import HeaderForm from "../../../components/layout/HeaderForm";
import FormSection from "../components/FormSection";
import { MembersLink } from '../components/linkMembros';
import Input from "../../../components/ui/Input";
import FooterNav from "../../../components/layout/FooterNav";
import SelectInput from "../../../components/ui/SelectInput";
import DateInput from "../../../components/ui/DateInput";
import ActionButton from "../../../components/ui/ActionButton";
import FileUploadButton from "../../../components/ui/FileUploadButton";
import { useForm } from "react-hook-form";
import { GroupContext } from "../../context/GroupContext";
import { useNavigate } from "react-router-dom";

type CreateGroupFormInputs = {
  groupImage: FileList;
  groupName: string;
  description: string;
  periodicity: string;
  dueDate: string;
  adminPix: string;
};

const periodicidadeOptions = [
  { value: "mensal", label: "Mensal" },
  { value: "quinzenal", label: "Quinzenal" },
  { value: "semanal", label: "Semanal" },
];

function EditGroupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateGroupFormInputs>();

  const navigate = useNavigate();
  const context = useContext(GroupContext);

  const onSubmit = (data: CreateGroupFormInputs) => {
    if (context) {
      console.log("Dados do formulário:", data);
      context.setGroup(data);

      navigate("/adicionar-participantes");
    } else {
      console.error("GroupContext não está disponível.");
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
      <HeaderForm title="Editar Grupo" onBack={handleGoBack} />
      <div className="flex-grow p-6 ">
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
            className="w-full py-3 px-4 border-2 border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500"
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
            className="w-full py-3 px-4 border-2 border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500"
          />
        </FormSection>

        <FormSection title="Periodicidade">
          <SelectInput
            options={periodicidadeOptions}
            className="w-full py-3 px-4 border-2 border-gray-300 bg-white rounded-xl text-gray-700 appearance-none
                        focus:outline-none focus:border-gray-500"
            {...register("periodicity", {
              required: "Periodicidade é obrigatória",
            })}
          />
          {errors.periodicity && (
            <p className="text-red-500 text-sm mt-1">
              {errors.periodicity.message}
            </p>
          )}
        </FormSection>

        <FormSection title="Data de vencimento">
          <DateInput
            className="w-full py-3 px-4 border-2 border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500"
            {...register("dueDate", {
              required: "Data de vencimento é obrigatória",
            })}
          />
          {errors.dueDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dueDate.message}
            </p>
          )}
        </FormSection>

        <FormSection title="Pix do administrador">
          <Input
            placeholder=""
            type="text"
            {...register("adminPix", {
              required: "Pix do administrador é obrigatório",
            })}
            className="w-full py-3 px-4 border-2 border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500"
          />
          {errors.adminPix && (
            <p className="text-red-500 text-sm mt-1">
              {errors.adminPix.message}
            </p>
          )}
        </FormSection>

        <MembersLink memberCount={6} groupId="123-abc-xyz" />

        <FormSection title="">
            <div className="mt-8 flex justify-end">
              <ActionButton
                text="SALVAR"
                type="submit"
                className="py-3 px-10 text-white bg-[#14879E] hover:bg-[#106a8c] rounded-lg text-xl font-bold transition-colors duration-300"
              />
            </div>
        </FormSection>
      </div>
      <FooterNav />
    </form>
  );
}

export default EditGroupPage;
