import React, { useContext, useEffect, useState } from "react";
import HeaderForm from "../../../components/layout/HeaderForm";
import FooterNav from "../../../components/layout/FooterNav";
import { FormProvider, useForm } from "react-hook-form";
import {
  GroupContext,
  type Member,
  type SplitMethod,
  type SplitType,
} from "../../context/GroupContext";
import { useNavigate } from "react-router-dom";
import { ExpenseSplitter } from "../components/ExpenseSplitter";
import { ExpenseSummaryPage } from "../components/ExpenseSummaryPage";

export type AddExpenseFormInputs = {
  description: string;
  value: number;
};

function AddExpensePage() {
  const { register, handleSubmit, formState, watch, ...rest } =
    useForm<AddExpenseFormInputs>();

  const { group, splitType, setSplitMethod, setSplitType, splitMethod } =
    useContext(GroupContext);

  const [isResumo, setIsResumo] = useState(false);

  const navigate = useNavigate();

  const initialMembers = group?.members || [];

  const totalValue = watch("value") || 0;

  const [expenseMembers, setExpenseMembers] = useState<Member[]>(
    initialMembers.map((member) => ({
      ...member,
    }))
  );

  useEffect(() => {
    if (splitType === "equally" && totalValue > 0) {
      const numMembers = expenseMembers.length;
      const equalShare = numMembers > 0 ? totalValue / numMembers : 0;
      setExpenseMembers((prevMembers) =>
        prevMembers.map((member) => ({
          ...member,
          amount: equalShare,
        }))
      );
    }
  }, [splitType, totalValue]);

  const handleSplitTypeChange = (type: SplitType) => {
    setSplitType(type);
  };

  const handleSplitMethodChange = (method: SplitMethod) => {
    setSplitMethod(method);
  };

  const handleAmountChange = (memberId: number, value: number) => {
    setExpenseMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === memberId ? { ...member, amount: value } : member
      )
    );
  };

  return (
    <FormProvider {...{ register, handleSubmit, formState, watch, ...rest }}>
      <div className="flex flex-col min-h-screen bg-white pb-20">
        <HeaderForm
          title={isResumo ? "Resumo" : "Adicionar Despesa"}
          onBack={() => {
            isResumo
              ? setIsResumo(false)
              : navigate("/adicionar-participantes");
          }}
        />

        {isResumo ? (
          <>
            <ExpenseSummaryPage/>
          </>
        ) : (
          <ExpenseSplitter 
            expenseMembers={expenseMembers} 
            handleAmountChange={handleAmountChange} 
            handleSplitMethodChange={handleSplitMethodChange} 
            handleSplitTypeChange={handleSplitTypeChange} 
            onClickSalvarDespesa={() => setIsResumo(true)} 
            splitMethod={splitMethod} splitType={splitType} 
          />
        )}

        <FooterNav />
      </div>
    </FormProvider>
  );
}

export default AddExpensePage;
