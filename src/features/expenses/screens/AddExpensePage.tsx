import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderForm from "../../../components/layout/HeaderForm";
import FooterNav from "../../../components/layout/FooterNav";
import { FormProvider, useForm } from "react-hook-form";
import { GroupContext, type Member, type SplitMethod, type SplitType } from "../../context/GroupContext";
import { ExpenseSplitter } from "../components/ExpenseSplitter";
import { expenseService } from "../../../services/expenseService";
import { groupService } from "../../../services/groupService";
import DateInput from "../../../components/ui/DateInput";
import Input from "../../../components/ui/Input";

export type AddExpenseFormInputs = {
  description: string;
  value: number;
  dueDate: string;
  adminPix: string;
};

function AddExpensePage() {
  const methods = useForm<AddExpenseFormInputs>();
  const { handleSubmit, watch, register, formState: { errors } } = methods;
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();
  const context = useContext(GroupContext);

  const [members, setMembers] = useState<Member[]>([]);
  const [splitType, setSplitType] = useState<SplitType>("equally");
  const [splitMethod, setSplitMethod] = useState<SplitMethod>("percentage");
  const [recurrence, setRecurrence] = useState<"UNICA" | "MENSAL">("UNICA");

  useEffect(() => {
    if (groupId) {
      groupService.obterGrupo(groupId).then(group => {
        if (group.membros) {
          const mappedMembers: Member[] = group.membros.map(m => ({
            id: parseInt(m.idUsuario) || Date.now(),
            userId: m.idUsuario,
            memberId: m.idMembro,
            nome: m.nomeUsuario,
            contact: "",
            amount: 0,
            isManager: m.idUsuario === group.adminId,
            isCurrentUser: false,
            canDelete: false
          }));
          setMembers(mappedMembers);
        }
      }).catch(console.error);
    } else if (context?.group?.members) {
      setMembers(context.group.members);
    }
  }, [groupId, context]);

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
    if (groupId) {
      navigate(`/editar-grupo/${groupId}`);
    } else {
      navigate("/adicionar-participantes");
    }
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

  const onClickSalvarDespesa = async () => {
    if (groupId) {
      const data = methods.getValues();
      try {
        const divisoesEspecificas: Record<string, number> = {};

        if (splitType !== "equally") {
          members.forEach(m => {
            const key = m.memberId || m.userId || m.id.toString();
            divisoesEspecificas[key] = m.amount;
          });
        }

        // Parse day from dueDate (YYYY-MM-DD)
        const diaVencimento = data.dueDate ? parseInt(data.dueDate.split('-')[2]) : new Date().getDate();

        await expenseService.registrarDespesa(groupId, {
          nome: data.description,
          valor: data.value,
          tipoRecorrencia: recurrence,
          tipoDivisao: splitType === "equally" ? "IGUALITARIA" : "POR_VALOR",
          diaVencimento: diaVencimento,
          divisoesEspecificas: divisoesEspecificas,
          dataVencimentoAvulsa: recurrence === "UNICA" ? data.dueDate : undefined,
          pixBeneficiado: data.adminPix
        });
        alert("Despesa salva com sucesso!");
        navigate(`/editar-grupo/${groupId}`);
      } catch (error) {
        console.error("Erro ao salvar despesa:", error);
        alert("Erro ao salvar despesa.");
      }
    } else if (context?.group) {
      // Legacy flow
      const data = methods.getValues();
      const updatedGroup = {
        ...context.group,
        expense: {
          description: data.description,
          totalValue: data.value,
          members: members,
        },
      };
      context.setGroup(updatedGroup);
      console.log("Grupo atualizado com despesa:", updatedGroup);
      navigate("/resumo-despesa");
    }
  };

  const onSubmit = () => {
    onClickSalvarDespesa();
  };

  return (
    <div className="flex flex-col min-h-screen bg-white pb-20">
      <HeaderForm title="Adicionar Despesas" onBack={handleGoBack} />
      <div className="flex-grow p-4 lg:ml-50 lg:mr-50 md:ml-40 lg:mb-10 md:mr-40">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Recorrência
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setRecurrence("UNICA")}
                  className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all font-medium ${recurrence === "UNICA"
                      ? "border-[#F34403] bg-[#F34403] text-white"
                      : "border-gray-300 text-gray-600 hover:border-gray-400 bg-white"
                    }`}
                >
                  Única
                </button>
                <button
                  type="button"
                  onClick={() => setRecurrence("MENSAL")}
                  className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all font-medium ${recurrence === "MENSAL"
                      ? "border-[#F34403] bg-[#F34403] text-white"
                      : "border-gray-300 text-gray-600 hover:border-gray-400 bg-white"
                    }`}
                >
                  Mensal
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Data de Vencimento
              </label>
              <DateInput
                className="w-full py-3 px-4 border-2 border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500 hover:translate-y-[1px] hover:shadow-lg"
                {...register("dueDate", {
                  required: "Data de vencimento é obrigatória",
                })}
              />
              {errors.dueDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dueDate.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Pix do Administrador
              </label>
              <Input
                placeholder="Chave Pix"
                type="text"
                className="w-full py-3 px-4 border-2 border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500 hover:translate-y-[1px] hover:shadow-lg"
                {...register("adminPix", {
                  required: "Pix do administrador é obrigatório"
                })}
              />
              {errors.adminPix && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.adminPix.message}
                </p>
              )}
            </div>

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
