import HeaderForm from "../../../components/layout/HeaderForm";
import FooterNav from "../../../components/layout/FooterNav";
import { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HistoryItem, { type HistoryEntry, type PaymentStatus } from "../components/HistoryItem";
import DropdownFilter from "../components/DropdownFilter";
import GroupHeaderInfo from "../../member/components/GroupHeaderInfo";
import { LuUpload } from "react-icons/lu";
import { groupService } from "../../../services/groupService";

interface Group {
  name: string;
  imageUrl: string;
}

const GROUP_OPTIONS = ["Todos"]; // Dynamic later
const STATUS_OPTIONS = ["PENDENTE", "PAGO", "Todos"];
const PERIOD_OPTIONS = ["Todos"]; // Dynamic later

export default function HistoryPage() {
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedGroup, setSelectedGroup] = useState(GROUP_OPTIONS[0]);
  const [selectedStatus, setSelectedStatus] = useState(STATUS_OPTIONS[2]);
  const [selectedPeriod, setSelectedPeriod] = useState(PERIOD_OPTIONS[0]);

  const currentUserId = localStorage.getItem('usuarioId');

  useEffect(() => {
    if (groupId && currentUserId) {
      loadData();
    }
  }, [groupId, currentUserId]);

  const loadData = async () => {
    if (!groupId || !currentUserId) return;
    try {
      setLoading(true);
      const groupData = await groupService.obterGrupo(groupId);
      setGroup({
        name: groupData.nomeGrupo,
        imageUrl: groupData.icone || "/ImagemDisney.svg",
      });

      // Fetch history for current user
      try {
        const historyData = await groupService.buscarHistoricoMembro(groupId, currentUserId);

        const mappedHistory: HistoryEntry[] = historyData.historico.map(item => {
          const dateObj = new Date(item.data);
          const month = dateObj.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
          const dateStr = dateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

          let status: PaymentStatus = 'PENDENTE';
          if (item.status === 'PAGO' || item.status === 'CONFIRMADO') status = 'PAGO';
          else if (item.status === 'ATRASADO' || item.status === 'NAO_PAGO') status = 'NÃO PAGO';
          else status = 'PENDENTE';

          return {
            id: item.id,
            month: month.charAt(0).toUpperCase() + month.slice(1),
            memberName: "Você",
            memberAvatarUrl: "/liz.png",
            status: status,
            groupName: groupData.nomeGrupo,
            date: dateStr
          };
        });
        setHistory(mappedHistory);
      } catch (err) {
        console.warn("Could not fetch history", err);
        setHistory([]);
      }

    } catch (error) {
      console.error("Failed to load history page data", error);
      alert("Erro ao carregar dados.");
      navigate("/home");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate("/home");
  };

  const groupedHistory = useMemo(() => {
    return history.reduce((acc, entry) => {
      if (selectedStatus !== "Todos" && entry.status !== selectedStatus) return acc;

      (acc[entry.month] = acc[entry.month] || []).push(entry);
      return acc;
    }, {} as Record<string, HistoryEntry[]>);
  }, [history, selectedStatus]);

  if (loading) {
    return <div className="p-4 text-center">Carregando...</div>;
  }

  if (!group) {
    return <div className="p-4 text-center">Grupo não encontrado</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white pb-20">
      <HeaderForm title="Histórico" onBack={handleGoBack} />

      <button className="flex justify-end mr-15 ">
        <LuUpload size={35} color="#FFF" className="bg-[#14879E] hover:bg-[#106a8c] p-1 rounded-lg" />
      </button>

      <div className="flex-grow p-4 lg:ml-10 lg:mr-10 mb-10">

        <GroupHeaderInfo groupName={group.name} imageUrl={group.imageUrl} />

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

        {Object.keys(groupedHistory).length === 0 && (
          <p className="text-center text-gray-500">Nenhum histórico encontrado.</p>
        )}

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
