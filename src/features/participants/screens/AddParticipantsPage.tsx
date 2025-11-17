import HeaderForm from "../../../components/layout/HeaderForm";
import GroupInfoCard from "../components/GroupInfoCard";
import FooterNav from "../../../components/layout/FooterNav";
import { GroupContext, type Member } from "../../context/GroupContext";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/ui/Input";
import { useForm } from "react-hook-form";
import ActionButton from "../../../components/ui/ActionButton";
import AddedMemberItem from "../../addGroup/components/AddedMemberItem";

type AddParticipantsFormInputs = {
  groupEmail: string;
  nome: string;
};

function AddParticipantsPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddParticipantsFormInputs>();

  const navigate = useNavigate();

  const context = useContext(GroupContext);

  const { group, setGroup } = context;

  const [members, setMembers] = useState<Member[]>([]);
  
  if (!context || !context.group || !context.setGroup) {
    console.error("dados:", context.group);
    return <div>Carregando...</div>;
  }
  

  const groupImageUrl =
    group.groupImage && group.groupImage.length > 0
      ? URL.createObjectURL(group.groupImage[0])
      : undefined;

  const handleGoBack = () => {
    navigate("/criar-novo-grupo");
  };

  const onAddMember = (data: AddParticipantsFormInputs) => {
    if (data.groupEmail) {
      const newMember: Member = {
        id: Date.now(),
        contact: data.groupEmail,
        nome: data.nome,
        amount: 0,
      };

      console.log("Dados do formulário:", data);

      setMembers((prev) => [...prev, newMember]);
      reset();
    }
  };

  const handleRemoveMember = (id: number) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const handleNext = () => {
    const updatedGroup = {
      ...group,
      members: members,
    };

    setGroup(updatedGroup);
    console.log("Grupo atualizado com membros:");
    navigate("/adicionar-despesas");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white pb-20 ">
      <HeaderForm title="Adicionar Participantes" onBack={handleGoBack} />
      <div className="flex-grow p-4 lg:ml-50 lg:mr-50 md:ml-40 lg:mb-10 md:mr-40 ">
        <GroupInfoCard
          className={"flex items-center mt-9 mb-15"}
          groupName={group.groupName}
          description={group.description ?? ""}
          imageUrl={groupImageUrl}
        />

        <form onSubmit={handleSubmit(onAddMember)}>
          <Input
            placeholder="Nome Completo"
            {...register("nome")}
            type="text"
            className="w-full flex-grow py-3 px-4 border-2 border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500 hover:translate-y-[1px] hover:shadow-lg"
          />
          {errors.nome && (
            <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>
          )}

          <div className="w-full flex items-center space-x-2 pt-2">
            <Input
              placeholder="E-mail"
              {...register("groupEmail")}
              type="email"
              className="flex-grow py-3 px-4 border-2 border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500 hover:translate-y-[1px] hover:shadow-lg"
            />
            {errors.groupEmail && (
              <p className="text-red-500 text-sm mt-1">
                {errors.groupEmail.message}
              </p>
            )}

            <ActionButton
              text="Adicionar"
              type="submit"
              className="w-full py-3 text-white  bg-[#F34403] hover:bg-[#e44005] rounded-xl font-bold transition-colors duration-300 hover:translate-y-[1px] hover:shadow-lg"
            />
          </div>
        </form>

        <h3 className="text-lg font-semibold text-[#F34403] mt-6 mb-2">
          Adicionados
        </h3>

        {members.map((member) => (
          <AddedMemberItem
            key={member.id}
            name={member.nome}
            contact={member.contact}
            onRemove={() => handleRemoveMember(member.id)}
          />
        ))}

        <form className="pt-4" onSubmit={handleSubmit(handleNext)}>
          <ActionButton
            text="Próximo"
            type="submit"
            onClick={handleNext}
            className="w-full py-3 text-white  bg-[#F34403] hover:bg-[#e44005] rounded-xl font-bold transition-colors duration-300 hover:translate-y-[1px] hover:shadow-lg"
          />
        </form>
      </div>
      <FooterNav />
    </div>
  );
}

export default AddParticipantsPage;
