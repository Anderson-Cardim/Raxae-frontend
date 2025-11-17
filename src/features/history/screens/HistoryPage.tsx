import { FaUpload } from "react-icons/fa";
import HeaderForm from "../../../components/layout/HeaderForm";
import FooterNav from "../../../components/layout/FooterNav";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import HistoryItem, { type HistoryEntry } from "../components/HistoryItem";
import Button from "../../../components/ui/Button";
import DropdownFilter from "../components/DropdownFilter";
import GroupHeaderInfo from "../../member/components/GroupHeaderInfo";


const mockHistory: HistoryEntry[] = [
  {
    id: "j1",
    month: "Julho 2025",
    memberName: "Alice",
    memberAvatarUrl: "/alice.png",
    status: "PENDENTE",
    groupName: "Disney+",
  },
  {
    id: "j2",
    month: "Julho 2025",
    memberName: "José",
    memberAvatarUrl: "/pedro.png",
    status: "PENDENTE",
    groupName: "Disney+",
  },
  {
    id: "j3",
    month: "Julho 2025",
    memberName: "Liz",
    memberAvatarUrl: "/liz.png",
    status: "PENDENTE",
    groupName: "Disney+",
  },
  {
    id: "j4",
    month: "Julho 2025",
    memberName: "Pedro",
    memberAvatarUrl: "/pedro.png",
    status: "PENDENTE",
    groupName: "Disney+",
  },
  {
    id: "j5",
    month: "Julho 2025",
    memberName: "João",
    memberAvatarUrl: "/joao.png",
    status: "NÃO PAGO",
    date: "18/07",
    groupName: "Disney+",
  },

  {
    id: "j6",
    month: "Junho 2025",
    memberName: "Valentina",
    memberAvatarUrl: "/valentina.png",
    status: "PAGO",
    date: "13/06",
    groupName: "Disney+",
  },
];

interface Group {
  name: string;
  imageUrl: string;
}

const mockGroup: Group = {
  name: "Disney",
  imageUrl: "/ImagemDisney.svg",
};

const GROUP_OPTIONS = ["Disney+", "Netflix", "Spotify"];
const STATUS_OPTIONS = ["PENDENTE", "PAGO", "Todos"];
const PERIOD_OPTIONS = ["Julho 2025", "Junho 2025", "Todos"];

export default function HistoryPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState(mockHistory);

  const [selectedGroup, setSelectedGroup] = useState(GROUP_OPTIONS[0]);
  const [selectedStatus, setSelectedStatus] = useState(STATUS_OPTIONS[2]);
  const [selectedPeriod, setSelectedPeriod] = useState(PERIOD_OPTIONS[0]);

  const [group] = useState(mockGroup);

  const handleGoBack = () => {
    navigate("/home");
  };

  const groupedHistory = useMemo(() => {
    return history.reduce((acc, entry) => {
      (acc[entry.month] = acc[entry.month] || []).push(entry);
      return acc;
    }, {} as Record<string, HistoryEntry[]>);
  }, [history]);

  const handleUpload = () => {
    alert("Exportar histórico acionado!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white pb-20">
      <HeaderForm title="Histórico" onBack={handleGoBack} />

      <Button
        onClick={handleUpload}
        texto={""}
        type={"button"}
        className="text-blue-500 hover:text-blue-700 p-2"
      >
        <FaUpload size={24} />
      </Button>

      <div className="flex-grow p-4 lg:ml-10 lg:mr-10 mb-10">

        <GroupHeaderInfo groupName={group.name} imageUrl={group.imageUrl}/>

        <div className="flex space-x-2 mb-6">
          <DropdownFilter
            label="Grupo"
            options={GROUP_OPTIONS}
            activeValue={selectedGroup}
            onSelect={setSelectedGroup}
          />

          <DropdownFilter
            label="Status"
            options={STATUS_OPTIONS}
            activeValue={selectedStatus}
            onSelect={setSelectedStatus}
          />

          <DropdownFilter
            label="Período"
            options={PERIOD_OPTIONS}
            activeValue={selectedPeriod}
            onSelect={setSelectedPeriod}
          />
        </div>

        {Object.keys(groupedHistory).map((month) => (
          <div key={month} className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b-2 border-dashed border-gray-200 pb-1">
              {month}
            </h3>

            <div className="shadow-sm rounded-lg overflow-hidden">
              {groupedHistory[month].map((entry) => (
                <HistoryItem key={entry.id} entry={entry} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <FooterNav />
    </div>
  );
}
