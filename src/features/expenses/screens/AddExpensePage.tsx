import { useContext, useEffect, useState } from "react";
import HeaderForm from "../../../components/layout/HeaderForm";
import FooterNav from "../../../components/layout/FooterNav";
import { FormProvider, useForm } from "react-hook-form";
import { GroupContext, type Member, type SplitMethod, type SplitType } from "../../context/GroupContext";
import { useNavigate } from "react-router-dom";
import { ExpenseSplitter } from "../components/ExpenseSplitter";

export type AddExpenseFormInputs = {
  description: string;
  value: number;
};

function AddExpensePage() {
  const methods = useForm<AddExpenseFormInputs>();
  const { handleSubmit, watch } = methods;
  const navigate = useNavigate();
  const context = useContext(GroupContext);

  if (!context) {
    return <div>Carregando...</div>;
  }

  const {
    group,
    setGroup,
    splitType,
    setSplitType,
    splitMethod,
    setSplitMethod,
  } = context;

  const [members, setMembers] = useState<Member[]>(group?.members || []);

  // Update local members state when group members change
  useEffect(() => {
    if (group?.members) {
      setMembers(group.members);
    }
  }, [group?.members]);

  const value = watch("value");

  // Recalculate amounts when value, splitType, or splitMethod changes
  useEffect(() => {
    if (!value || members.length === 0) return;

    if (splitType === "equally") {
      const equalShare = value / members.length;
      setMembers((prev) =>
        prev.map((m) => ({ ...m, amount: equalShare }))
      );
    }
  }, [value, splitType, members.length]);

  const handleGoBack = () => {
    navigate("/adicionar-participantes");
  };

  const handleSplitTypeChange = (type: SplitType) => {
    setSplitType(type);
  };

  const handleSplitMethodChange = (method: SplitMethod) => {
    setSplitMethod(method);
  };

  const handleAmountChange = (memberId: number, newValue: number) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, amount: newValue } : m))
    );
  };

  const onClickSalvarDespesa = () => {
    if (group) {
      const data = methods.getValues();
      const updatedGroup = {
        ...group,
        expense: {
          description: data.description,
          totalValue: data.value,
          members: members,
        },
      };
      setGroup(updatedGroup);
      console.log("Grupo atualizado com despesa:", updatedGroup);
      navigate("/resumo-despesa");
    }
  };

  const onSubmit = () => {
    // This is handled by onClickSalvarDespesa for now, but we keep it for form submission
    onClickSalvarDespesa();
  };

  return (
    <div className="flex flex-col min-h-screen bg-white pb-20">
      <HeaderForm title="Adicionar Despesas" onBack={handleGoBack} />
      <div className="flex-grow p-4 lg:ml-50 lg:mr-50 md:ml-40 lg:mb-10 md:mr-40">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ExpenseSplitter
              splitType={splitType}
              handleSplitTypeChange={handleSplitTypeChange}
              splitMethod={splitMethod}
              handleSplitMethodChange={handleSplitMethodChange}
              expenseMembers={members}
              handleAmountChange={handleAmountChange}
              onClickSalvarDespesa={onClickSalvarDespesa}
            />
          </form>
        </FormProvider>
      </div>
      <FooterNav />
    </div>
  );
}

export default AddExpensePage;
