import React, { useContext } from "react";
import HeaderForm from "../../../components/layout/HeaderForm";
import FormSection from "../components/FormSection";
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

function CreateGroupPage() {
  const { register, handleSubmit, formState: { errors }, } = useForm<CreateGroupFormInputs>();

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

        <FormSection title="">
          <div className="p-0.90 pt-4">
            <ActionButton
              text="ADICIONAR PARTICIPANTES"
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
