import type { ReactNode } from "react";
import Economia from "../../../assets/Economia.svg";
import Membro from "../../../assets/membro.svg";
import Pasta from "../../../assets/pasta.svg";
import TotalPago from "../../../assets/totalPagoMes.svg";

const iconMap: Record<StatCardProps["type"], ReactNode> = {
  groups: (
    <img
      src={Pasta}
      alt="Ícone de números grupos"
      className="w-6 h-6 text-blue-400"
    />
  ),
  saved: <img src={Economia} alt="Ícone economia total" />,
  pending: <img src={Membro} alt="Ícone membro pendente" />,
  paid: <img src={TotalPago} alt="Ícone total pago" />,
};

interface StatCardProps {
  label: string;
  value: string | number;
  type: "groups" | "saved" | "pending" | "paid";
}

function StatCard({ label, value, type }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-4 flex flex-col items-start justify-between">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2">
          {iconMap[type]}
        </div>
        <p className="text-gray-500 text-xs font-semibold uppercase">{label}</p>
      </div>

      <div>
        <p className="text-black text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
}

export default StatCard;
