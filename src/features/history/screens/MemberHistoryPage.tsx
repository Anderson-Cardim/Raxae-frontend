import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderForm from "../../../components/layout/HeaderForm";
import FooterNav from "../../../components/layout/FooterNav";
import { groupService, type HistoricoMembroResponse, type HistoricoItem } from "../../../services/groupService";
import { FaArrowUp, FaArrowDown, FaMoneyBillWave, FaUser } from "react-icons/fa";

export default function MemberHistoryPage() {
    const { groupId, memberId } = useParams<{ groupId: string; memberId: string }>();
    const navigate = useNavigate();
    const [historyData, setHistoryData] = useState<HistoricoMembroResponse | null>(null);
    const [memberName, setMemberName] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (groupId && memberId) {
            loadData();
        }
    }, [groupId, memberId]);

    const loadData = async () => {
        if (!groupId || !memberId) return;
        try {
            setLoading(true);
            const [history, group] = await Promise.all([
                groupService.buscarHistoricoMembro(groupId, memberId),
                groupService.obterGrupo(groupId)
            ]);

            setHistoryData(history);

            const member = group.membros.find(m => m.idMembro === memberId);
            if (member) {
                setMemberName(member.nomeUsuario);
            } else {
                setMemberName("Membro não encontrado");
            }

        } catch (error) {
            console.error("Failed to load data", error);
            alert("Erro ao carregar dados");
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen bg-white">
                <HeaderForm title="Histórico" onBack={handleGoBack} />
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-gray-500">Carregando...</p>
                </div>
                <FooterNav />
            </div>
        );
    }

    if (!historyData) {
        return (
            <div className="flex flex-col min-h-screen bg-white">
                <HeaderForm title="Histórico" onBack={handleGoBack} />
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-gray-500">Nenhum dado encontrado.</p>
                </div>
                <FooterNav />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-white pb-20">
            <HeaderForm title="Histórico do Membro" onBack={handleGoBack} />

            <div className="flex-grow p-4 lg:ml-10 lg:mr-10 mb-10 space-y-6">

                {/* Member Info */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="p-3 bg-gray-200 rounded-full text-gray-600">
                        <FaUser size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Membro</p>
                        <h2 className="text-xl font-bold text-gray-800">{memberName}</h2>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-red-50 p-4 rounded-xl border border-red-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 bg-red-100 rounded-full text-red-600">
                                <FaArrowUp />
                            </div>
                            <p className="text-sm text-gray-600 font-medium">Total Despesas</p>
                        </div>
                        <p className="text-2xl font-bold text-gray-800">
                            R$ {historyData.totalDespesasRealizadas.toFixed(2)}
                        </p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-xl border border-green-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 bg-green-100 rounded-full text-green-600">
                                <FaArrowDown />
                            </div>
                            <p className="text-sm text-gray-600 font-medium">Total Recebido</p>
                        </div>
                        <p className="text-2xl font-bold text-gray-800">
                            R$ {historyData.totalCobrancasRecebidas.toFixed(2)}
                        </p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                                <FaMoneyBillWave />
                            </div>
                            <p className="text-sm text-gray-600 font-medium">Saldo Atual</p>
                        </div>
                        <p className={`text-2xl font-bold ${historyData.saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            R$ {historyData.saldo.toFixed(2)}
                        </p>
                    </div>
                </div>

                {/* History List */}
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Atividades Recentes</h3>
                    <div className="space-y-3">
                        {historyData.historico.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">Nenhuma atividade registrada.</p>
                        ) : (
                            historyData.historico.map((item) => (
                                <HistoryItem key={item.id} item={item} />
                            ))
                        )}
                    </div>
                </div>

            </div>

            <FooterNav />
        </div>
    );
}

function HistoryItem({ item }: { item: HistoricoItem }) {
    const isExpense = item.tipo === 'DESPESA'; // Adjust based on actual API response types if needed

    return (
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex justify-between items-center">
            <div className="flex flex-col">
                <span className="font-semibold text-gray-800">{item.descricao}</span>
                <span className="text-xs text-gray-500">
                    {new Date(item.data).toLocaleDateString()} - {item.status}
                </span>
            </div>
            <div className={`font-bold ${isExpense ? 'text-red-500' : 'text-green-500'}`}>
                {isExpense ? '-' : '+'} R$ {Math.abs(item.valor).toFixed(2)}
            </div>
        </div>
    );
}
