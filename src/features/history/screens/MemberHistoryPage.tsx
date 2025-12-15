import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderForm from "../../../components/layout/HeaderForm";
import FooterNav from "../../../components/layout/FooterNav";
import { groupService, type HistoricoMembroResponse, type GrupoResponse } from "../../../services/groupService";
import { FaArrowUp, FaArrowDown, FaMoneyBillWave, FaUser } from "react-icons/fa";
import groupIcon from "../../../assets/group_icon.png";
import AuthenticatedImage from "../../../components/ui/AuthenticatedImage";
import { useToast } from "../../../contexts/ToastContext";

export default function MemberHistoryPage() {
    const { groupId, memberId } = useParams<{ groupId: string; memberId: string }>();
    const navigate = useNavigate();
    const [historyData, setHistoryData] = useState<HistoricoMembroResponse | null>(null);
    const [group, setGroup] = useState<GrupoResponse | null>(null);
    const [memberName, setMemberName] = useState<string>("");

    // Group name is in group object
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        if (groupId && memberId) {
            loadData();
        }
    }, [groupId, memberId]);

    const loadData = async () => {
        if (!groupId || !memberId) return;
        try {
            setLoading(true);
            const [history, groupData] = await Promise.all([
                groupService.buscarHistoricoMembro(groupId, memberId),
                groupService.obterGrupo(groupId)
            ]);

            setHistoryData(history);
            setGroup(groupData);

            const member = groupData.membros.find(m => m.idMembro === memberId);
            if (member) {
                setMemberName(member.nomeUsuario);
            } else {
                setMemberName("Membro não encontrado");
            }

        } catch (error) {
            console.error("Failed to load data", error);
            toast.error("Erro ao carregar dados");
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen bg-white dark:bg-[#18181b] transition-colors duration-300">
                <HeaderForm title="Histórico" onBack={handleGoBack} />
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400">Carregando...</p>
                </div>
                <FooterNav />
            </div>
        );
    }

    if (!historyData || !group) {
        return (
            <div className="flex flex-col min-h-screen bg-white dark:bg-[#18181b] transition-colors duration-300">
                <HeaderForm title="Histórico" onBack={handleGoBack} />
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400">Nenhum dado encontrado.</p>
                </div>
                <FooterNav />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#18181b] pb-20 transition-colors duration-300">
            <HeaderForm title="Histórico do Membro" onBack={handleGoBack} />

            <div className="flex-grow p-6 lg:ml-35 lg:mr-35">
                {/* Header Profile */}
                <div className="flex flex-col items-center mb-8">
                    <AuthenticatedImage
                        url={(group.icone && group.icone !== 'default-icon') ? `/v1/grupo/${group.id}/icone` : ''}
                        alt="Group Icon"
                        className="w-16 h-16 rounded-full mb-3 shadow-md object-cover bg-white dark:bg-gray-800"
                        fallbackIcon={groupIcon}
                    />
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">{group.nomeGrupo}</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Histórico de {memberName}</p>
                </div>

                {/* Member Info Card */}
                <div className="flex items-center gap-3 p-4 bg-white dark:bg-[#27272a] rounded-xl border border-gray-200 dark:border-gray-700 mb-6 shadow-sm transition-colors duration-300">
                    <div className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">
                        <FaUser size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold uppercase">Membro</p>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">{memberName}</h2>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-100 dark:border-red-900/30 shadow-sm transition-colors duration-300">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 bg-red-100 dark:bg-red-900/40 rounded-full text-red-600 dark:text-red-400">
                                <FaArrowUp />
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Total Despesas</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-800 dark:text-white">
                            R$ {historyData.totalDespesasRealizadas.toFixed(2)}
                        </p>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-100 dark:border-green-900/30 shadow-sm transition-colors duration-300">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-full text-green-600 dark:text-green-400">
                                <FaArrowDown />
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Total Recebido</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-800 dark:text-white">
                            R$ {historyData.totalCobrancasRecebidas.toFixed(2)}
                        </p>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 shadow-sm transition-colors duration-300">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-full text-blue-600 dark:text-blue-400">
                                <FaMoneyBillWave />
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Saldo Atual</span>
                        </div>
                        <p className={`text-2xl font-bold ${historyData.saldo >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            R$ {historyData.saldo.toFixed(2)}
                        </p>
                    </div>
                </div>

                {/* History List */}
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Atividades Recentes</h3>

                <div className="space-y-3">
                    {historyData.historico.length === 0 ? (
                        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                            Nenhuma atividade registrada
                        </div>
                    ) : (
                        historyData.historico.map((item) => (
                            <div key={item.id} className="bg-white dark:bg-[#27272a] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex justify-between items-center transition-colors duration-300">
                                <div>
                                    <p className="font-bold text-gray-800 dark:text-white text-sm">{item.descricao}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {new Date(item.data).toLocaleDateString('pt-BR')} - <span className="uppercase">{item.status}</span>
                                    </p>
                                </div>
                                <div className={`font-bold ${item.tipo === 'DESPESA' ? 'text-red-500 dark:text-red-400' : 'text-green-500 dark:text-green-400'}`}>
                                    {item.tipo === 'DESPESA' ? '-' : '+'} R$ {item.valor.toFixed(2)}
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>
            <FooterNav />
        </div>
    );
}
