import { useEffect, useState } from "react";
import HeaderForm from "../../../components/layout/HeaderForm";
import FooterNav from "../../../components/layout/FooterNav";
import { useParams, useNavigate } from "react-router-dom";
import { groupService, type GrupoResponse } from "../../../services/groupService";
import { expenseService, type CobrancaResponse } from "../../../services/expenseService";
import FormSection from "../../editGroup/components/FormSection";
import groupIcon from "../../../assets/group_icon.png";
import PaymentModal from "../../expenses/components/PaymentModal";

export default function ViewGroupPage() {
    const { groupId } = useParams<{ groupId: string }>();
    const navigate = useNavigate();
    const [group, setGroup] = useState<GrupoResponse | null>(null);
    const [charges, setCharges] = useState<CobrancaResponse[]>([]);
    const [loading, setLoading] = useState(true);

    // Payment Modal State
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState<{ id: string, name: string, value: string } | null>(null);

    useEffect(() => {
        if (groupId) {
            loadData();
        }
    }, [groupId]);

    const loadData = async () => {
        try {
            setLoading(true);
            const [groupData, chargesData] = await Promise.all([
                groupService.obterGrupo(groupId!),
                expenseService.listarMinhasCobrancas()
            ]);

            setGroup(groupData);

            // Filter charges for this group
            const groupCharges = chargesData.filter(c => c.grupoId === groupId);
            setCharges(groupCharges);

        } catch (error) {
            console.error("Failed to load data", error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        navigate("/home");
    };

    const handleOpenPayment = (charge: CobrancaResponse) => {
        setSelectedExpense({
            id: charge.despesaId, // Use despesaId for payment
            name: charge.despesaNome,
            value: `R$ ${charge.valor.toFixed(2).replace('.', ',')}`
        });
        setIsPaymentModalOpen(true);
    };

    const handleConfirmPayment = async (file: File) => {
        if (!selectedExpense) return;

        try {
            await expenseService.pagarDespesa(selectedExpense.id, file);
            alert("Comprovante enviado com sucesso!");
            setIsPaymentModalOpen(false);
            // Reload data to reflect status change if needed (API assumes status update might take time or manual approval)
            loadData();
        } catch (error) {
            console.error("Error paying expense:", error);
            alert("Erro ao enviar pagamento.");
        }
    };

    if (loading) return <div className="p-4 text-center">Carregando...</div>;
    if (!group) return <div className="p-4 text-center">Grupo não encontrado</div>;

    return (
        <div className="flex flex-col min-h-screen bg-white pb-20">
            <HeaderForm title="Detalhes do Grupo" onBack={handleGoBack} />

            <div className="flex-grow p-6 lg:ml-35 lg:mr-35 mb-10">

                {/* Header with Icon and Name */}
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={group.icone === 'default-icon' ? groupIcon : (group.icone || groupIcon)}
                        alt="Grupo"
                        className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white mb-4"
                    />
                    <h2 className="text-2xl font-bold text-gray-800">{group.nomeGrupo}</h2>
                    <p className="text-gray-500">{group.membros.length} membros</p>
                </div>

                <FormSection title="Descrição do grupo">
                    <p className="w-full py-3 px-4 border-2 border-gray-100 bg-gray-50 rounded-xl text-gray-700">
                        {group.descricao || "Sem descrição"}
                    </p>
                </FormSection>

                {/* Real Charges Section */}
                <div className="mt-8">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 px-1">Minhas Cobranças</h3>
                    <div className="space-y-3">
                        {charges.length === 0 ? (
                            <p className="text-gray-500 text-sm p-2">Nenhuma cobrança encontrada para este grupo.</p>
                        ) : (
                            charges.map(charge => (
                                <div key={charge.id} className="bg-white border text-left border-gray-200 rounded-xl p-4 shadow-sm flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-gray-800">{charge.despesaNome}</p>
                                        <p className="text-sm text-gray-500">
                                            Vence em: {new Date(charge.dataVencimento).toLocaleDateString('pt-BR')}
                                        </p>
                                    </div>
                                    <div className="text-right flex flex-col items-end gap-1">
                                        <p className="font-bold text-blue-600">
                                            R$ {charge.valor.toFixed(2).replace('.', ',')}
                                        </p>
                                        <span className={`text-xs px-2 py-1 rounded-full ${charge.status === 'PAGA' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {charge.status}
                                        </span>

                                        {charge.status === 'PENDENTE' && (
                                            <button
                                                onClick={() => handleOpenPayment(charge)}
                                                className="mt-1 text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition-colors"
                                            >
                                                Pagar
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Members List Read-Only */}
                <div className="mt-8">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 px-1">Participantes</h3>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <div className="grid grid-cols-1 gap-3">
                            {group.membros.map(member => (
                                <div key={member.idMembro} className="flex items-center space-x-3 p-2 bg-white rounded-lg shadow-sm">
                                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs font-bold">
                                        {member.nomeUsuario.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-gray-700 font-medium">{member.nomeUsuario}</span>
                                    {member.idUsuario === group.adminId && (
                                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded ml-auto">Admin</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
            <FooterNav />

            {/* Payment Modal */}
            {selectedExpense && (
                <PaymentModal
                    isOpen={isPaymentModalOpen}
                    onClose={() => setIsPaymentModalOpen(false)}
                    expenseName={selectedExpense.name}
                    expenseValue={selectedExpense.value}
                    onConfirm={handleConfirmPayment}
                />
            )}
        </div>
    );
}
