import api from './api';

export type TipoRecorrencia = 'UNICA' | 'MENSAL';
export type TipoDivisao = 'IGUALITARIA' | 'POR_VALOR';

export interface DespesaRequest {
    nome: string;
    valor: number;
    tipoRecorrencia: TipoRecorrencia;
    tipoDivisao: TipoDivisao;
    diaVencimento: number;
    divisoesEspecificas?: Record<string, number>;
    pixBeneficiado?: string;
    dataVencimentoAvulsa?: string; // YYYY-MM-DD
}

export interface DespesaResponse {
    id: string;
    nome: string;
    valor: number;
    tipoRecorrencia: TipoRecorrencia;
    tipoDivisao: TipoDivisao;
    momentoCriacao: string;
    grupoId: string;
    adminId: string;
}

export const expenseService = {
    registrarDespesa: async (grupoId: string, data: DespesaRequest): Promise<DespesaResponse> => {
        const response = await api.post<DespesaResponse>(`/v1/grupos/${grupoId}/despesas`, data);
        return response.data;
    },

    excluirDespesa: async (grupoId: string, despesaId: string): Promise<void> => {
        await api.delete(`/v1/grupos/${grupoId}/despesas/${despesaId}`);
    }
};
