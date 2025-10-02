import { useFormContext } from "react-hook-form";
import ActionButton from "../../../components/ui/ActionButton";
import { RadioOption } from "../../../components/ui/RadioOption";
import ExpenseForm from "./ExpenseForm";
import ExpenseMemberItem from "./ExpenseMemberItemProps ";
import type { AddExpenseFormInputs } from "../screens/AddExpensePage";
import type {
  Member,
  SplitMethod,
  SplitType,
} from "../../context/GroupContext";

interface ExpenseSplitterProps {
  splitType: SplitType;
  handleSplitTypeChange: (type: SplitType) => void;
  splitMethod: SplitMethod;
  handleSplitMethodChange: (method: SplitMethod) => void;
  expenseMembers: Member[];
  handleAmountChange: (memberId: number, value: number) => void;
  onClickSalvarDespesa: () => void;
}

export function ExpenseSplitter({
  splitType,
  handleSplitTypeChange,
  splitMethod,
  handleSplitMethodChange,
  expenseMembers,
  handleAmountChange,
  onClickSalvarDespesa,
}: ExpenseSplitterProps) {
  const { register, formState } = useFormContext<AddExpenseFormInputs>();

  return (
    <div className="flex-grow p-4">
      <ExpenseForm register={register} errors={formState.errors} />

      <div className="space-y-2 pt-10">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Dividir despesas:
        </h3>
        <RadioOption
          label="Dividir Igualmente"
          name="splitType"
          value="equally"
          checked={splitType === "equally"}
          onChange={() => handleSplitTypeChange("equally")}
        />
        <RadioOption
          label="Divisão Personalizada"
          name="splitType"
          value="custom"
          checked={splitType === "custom"}
          onChange={() => handleSplitTypeChange("custom")}
        />
      </div>

      {splitType === "custom" && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Dividir por:
          </h3>
          <div className="space-y-2">
            <RadioOption
              label="Valor"
              name="splitMethod"
              value="value"
              checked={splitMethod === "value"}
              onChange={() => handleSplitMethodChange("value")}
            />

            <RadioOption
              label="Por porcentagem"
              name="splitMethod"
              value="percentage"
              checked={splitMethod === "percentage"}
              onChange={() => handleSplitMethodChange("percentage")}
            />
          </div>

          <div className="mt-6 space-y-4">
            {expenseMembers.map((member) => (
              <ExpenseMemberItem
                key={member.id}
                name={member.nome}
                contact={member.contact}
                amount={member.amount}
                splitType={splitType}
                splitMethod={splitMethod}
                onAmountChange={(value) => handleAmountChange(member.id, value)}
              />
              
            ))}
          </div>
        </div>
      )}

      <div className="pt-10">
        <ActionButton
          text="Salvar Divisão"
          className="w-full py-3 text-white bg-[#F34403] hover:bg-orange-600 rounded-xl font-bold transition-colors duration-300"
          type="button"
          onClick={onClickSalvarDespesa}
        />
      </div>
    </div>
  );
}
