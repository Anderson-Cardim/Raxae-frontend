import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { expenseService, type DespesaResponse } from "../../../services/expenseService";
import { groupService } from "../../../services/groupService";
import HeaderForm from "../../../components/layout/HeaderForm";
import FooterNav from "../../../components/layout/FooterNav";
import { useToast } from "../../../contexts/ToastContext";
import { BsTrash, BsCalendarEvent, BsCashCoin, BsBell } from "react-icons/bs";

export default function GroupExpensesPage() {
    const { groupId } = useParams<{ groupId: string }>();
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState<DespesaResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const currentUserId = localStorage.getItem('usuarioId');
    const toast = useToast();

    useEffect(() => {
        if (groupId) {
            loadExpenses();
            checkAdminStatus();
        }
    }, [groupId]);

    const checkAdminStatus = async () => {
        try {
            const group = await groupService.obterGrupo(groupId!);
            setIsAdmin(group.adminId === currentUserId);
        } catch (error) {
            console.error("Failed to check admin status", error);
        }
    };

    const loadExpenses = async () => {
        try {
            setLoading(true);
            const data = await expenseService.listarDespesasGrupo(groupId!);
            setExpenses(data);
        } catch (error) {
            console.error("Failed to load expenses", error);
            toast.error("Erro ao carregar despesas.");
        } finally {
            setLoading(false);
        }
    };

    const handleSendReminders = async (despesaId: string) => {
        try {
            await expenseService.enviarLembretesAutomaticos(despesaId);
            toast.success("Lembretes enviados com sucesso!");
        } catch (error) {
            console.error("Failed to send reminders", error);
            toast.error("Erro ao enviar lembretes.");
        }
    };

    const handleDelete = async (despesaId: string) => {
        if (window.confirm("Tem certeza que deseja excluir esta despesa?")) {
            try {
                await expenseService.deletarDespesa(groupId!, despesaId);
                toast.success("Despesa excluída com sucesso!");
                setExpenses(expenses.filter(e => e.id !== despesaId));
            } catch (error) {
                console.error("Failed to delete expense", error);
                toast.error("Erro ao excluir despesa.");
            }
        }
    };

    const handleBack = () => {
        navigate(`/editar-grupo/${groupId}`);
    };

    if (loading) return <div className="p-4 text-center text-gray-500 dark:text-gray-400">Carregando despesas...</div>;

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-[#18181b] pb-20 transition-colors duration-300">
            <HeaderForm title="Gerenciar Despesas" onBack={handleBack} />

            <div className="flex-grow p-4 lg:ml-5 lg:mr-5">
                {expenses.length === 0 ? (
                    <div className="text-center mt-10">
                        <p className="text-gray-500 dark:text-gray-400">Nenhuma despesa encontrada neste grupo.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {expenses.map((expense) => (
                            <div key={expense.id} className="bg-white dark:bg-[#27272a] rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 flex justify-between items-center transition-colors duration-300">
                                <div>
                                    <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg mb-1">{expense.nome}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <BsCashCoin />
                                        <span>R$ {expense.valor.toFixed(2).replace('.', ',')}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <BsCalendarEvent />
                                        <span>{expense.tipoRecorrencia === 'UNICA' ? 'Única' : 'Mensal'}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {isAdmin && (
                                        <button
                                            onClick={() => handleSendReminders(expense.id)}
                                            className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                                            title="Enviar lembretes"
                                        >
                                            <BsBell size={20} />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(expense.id)}
                                        className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                                        title="Excluir despesa"
                                    >
                                        <BsTrash size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <FooterNav />
        </div>
    );
}
