import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderForm from "../../../components/layout/HeaderForm";
import FooterNav from "../../../components/layout/FooterNav";
import { expenseService, type CobrancaResponse } from "../../../services/expenseService";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useToast } from "../../../contexts/ToastContext";

export default function GroupPaymentsPage() {
    const { groupId } = useParams<{ groupId: string }>();
    const navigate = useNavigate();
    const [charges, setCharges] = useState<CobrancaResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    // Proof Modal State
    const [selectedProofUrl, setSelectedProofUrl] = useState<string | null>(null);
    const [proofingCobranca, setProofingCobranca] = useState<string | null>(null); // ID of charge being viewed

    useEffect(() => {
        if (groupId) {
            loadCharges();
        }
    }, [groupId]);

    const loadCharges = async () => {
        try {
            setLoading(true);
            const data = await expenseService.listarCobrancasDoGrupo(groupId!);

            // Sort by status (PAGA first, then PENDENTE)
            const sorted = data.sort((a, b) => {
                if (a.status === 'PAGA' && b.status !== 'PAGA') return -1;
                if (a.status !== 'PAGA' && b.status === 'PAGA') return 1;
                return 0;
            });

            setCharges(sorted);
        } catch (error) {
            console.error("Failed to load group charges", error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewProof = async (cobrancaId: string) => {
        try {
            setProofingCobranca(cobrancaId);
            const blob = await expenseService.obterComprovante(cobrancaId);
            const url = URL.createObjectURL(blob);
            setSelectedProofUrl(url);
        } catch (error) {
            console.error("Failed to load proof", error);
            toast.error("Erro ao carregar comprovante. Pode não haver comprovante enviado.");
            setProofingCobranca(null);
        }
    };

    const handleCloseModal = () => {
        if (selectedProofUrl) {
            URL.revokeObjectURL(selectedProofUrl);
        }
        setSelectedProofUrl(null);
        setProofingCobranca(null);
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    if (loading) return <div className="p-4 text-center">Carregando pagamentos...</div>;

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-[#18181b] pb-20 transition-colors duration-300">
            <HeaderForm title="Pagamentos do Grupo" onBack={handleGoBack} />

            <div className="flex-grow p-4 lg:ml-35 lg:mr-35 mb-10">
                <div className="space-y-4">
                    {charges.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400 text-center mt-10">Nenhuma cobrança encontrada.</p>
                    ) : (
                        charges.map(charge => (
                            <div key={charge.id} className="bg-white dark:bg-[#27272a] border text-left border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-gray-800 dark:text-gray-100">{charge.despesaNome}</h3>
                                        {/* Display member name */}
                                        <p className="text-sm text-gray-600 dark:text-gray-300 font-medium mb-1">
                                            {charge.nome}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Vencimento: {new Date(charge.dataVencimento).toLocaleDateString('pt-BR')}
                                        </p>
                                        {charge.dataPagamento && (
                                            <p className="text-xs text-green-600 dark:text-green-400 mt-0.5">
                                                Pago em: {new Date(charge.dataPagamento).toLocaleDateString('pt-BR')}
                                            </p>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-blue-600 dark:text-blue-400">R$ {charge.valor.toFixed(2).replace('.', ',')}</p>
                                        <span className={`text-xs px-2 py-1 rounded-full ${charge.status === 'PAGA' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                                            charge.status === 'VENCIDA' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                                                'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                                            }`}>
                                            {charge.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Action for Paid Charges */}
                                {charge.status === 'PAGA' && (
                                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                                        <button
                                            onClick={() => handleViewProof(charge.id)}
                                            disabled={proofingCobranca === charge.id}
                                            className="text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                                        >
                                            {proofingCobranca === charge.id ? 'Carregando...' : 'Ver Comprovante'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            <FooterNav />

            {/* Proof Viewer Modal */}
            {selectedProofUrl && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4" onClick={handleCloseModal}>
                    <div className="relative max-w-lg w-full max-h-[90vh] bg-transparent flex flex-col items-center" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={handleCloseModal}
                            className="absolute -top-12 right-0 text-white p-2 hover:bg-white/20 rounded-full"
                        >
                            <XMarkIcon className="w-8 h-8" />
                        </button>
                        <img
                            src={selectedProofUrl}
                            alt="Comprovante"
                            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl bg-white"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
