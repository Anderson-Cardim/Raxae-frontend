import { useState } from "react";
import { groupService } from "../../../services/groupService";
import { useToast } from "../../../contexts/ToastContext";

interface JoinGroupSectionProps {
    onJoinSuccess: () => void;
}

export function JoinGroupSection({ onJoinSuccess }: JoinGroupSectionProps) {
    const [joinGroupId, setJoinGroupId] = useState("");
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleJoinGroup = async () => {
        if (!joinGroupId.trim()) {
            toast.warning("Por favor, insira o ID do grupo.");
            return;
        }

        try {
            setLoading(true);
            await groupService.entrarNoGrupo(joinGroupId);
            toast.success("Entrou no grupo com sucesso!");
            setJoinGroupId("");
            onJoinSuccess();
        } catch (error) {
            console.error("Erro ao entrar no grupo:", error);
            toast.error("Erro ao entrar no grupo. Verifique o ID e tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-[#27272a] p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 mb-6">
            <p className="text-gray-800 dark:text-gray-200 font-bold mb-3">Entrar em um grupo existente</p>
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Cole o ID do grupo aqui"
                    value={joinGroupId}
                    onChange={(e) => setJoinGroupId(e.target.value)}
                    className="flex-grow py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-[#18181b] focus:outline-none focus:ring-2 focus:ring-[#14879E] transition-all"
                />
                <button
                    onClick={handleJoinGroup}
                    disabled={loading}
                    className={`px-6 py-2 bg-[#14879E] text-white font-bold rounded-lg hover:bg-[#106a8c] transition-colors whitespace-nowrap ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Entrando...' : 'ENTRAR'}
                </button>
            </div>
        </div>
    );
}
