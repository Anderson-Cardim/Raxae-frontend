
import React from "react";
import Input from "../../../components/ui/Input";
import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import {
  DocumentTextIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

type ExpenseFormInputs = {
  description: string;
  value: number;
};

type ExpenseFormProps = {
  register: UseFormRegister<ExpenseFormInputs>;
  errors: FieldErrors<ExpenseFormInputs>;
};

const ExpenseForm: React.FC<ExpenseFormProps> = ({ register, errors }) => {

  return (
    <div className="space-y-8 pt-6">
      
      <div className="flex items-center space-x-2 border-b border-gray-300 pb-2">
        <DocumentTextIcon className="h-12 w-12 text-black" />
        <Input
          placeholder="Insira a descrição"
          type="text"
          {...register("description", {
            required: "A descrição é obrigatória",
          })}
          className="w-full text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500 border-none"
        />
      </div>

      {errors.description && ( <p className="text-red-500 text-sm mt-1"> {errors.description.message} </p>)}

      <div className="flex items-center space-x-2 border-b border-gray-300 pb-2">
        <CurrencyDollarIcon className="h-12 w-12 text-black" />
        <Input
          placeholder="0,00"
          type="number"
          step="0.01"
          {...register("value", {
            required: "O valor é obrigatório",
            valueAsNumber: true,
            min: { value: 0.01, message: "O valor deve ser maior que zero" },
          })}
          className="w-full text-xl font-bold text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500 border-none"
        />
      </div>

      {errors.value && (
        <p className="text-red-500 text-sm mt-1">{errors.value.message}</p>
      )}
    </div>
  );
};

export default ExpenseForm;
