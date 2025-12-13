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

export interface CobrancaResponse {
    id: string;
    despesaId: string;
    despesaNome: string;
    grupoId: string;
    grupoNome: string;
    valor: number;
    status: 'PENDENTE' | 'PAGA' | 'VENCIDA' | 'CANCELADA';
    dataVencimento: string;
    dataPagamento: string | null;
    momentoCriacao: string;
    mesReferencia: string;
}

export const expenseService = {
    registrarDespesa: async (grupoId: string, data: DespesaRequest): Promise<DespesaResponse> => {
        const response = await api.post<DespesaResponse>(`/v1/grupos/${grupoId}/despesas`, data);
        return response.data;
    },

    excluirDespesa: async (grupoId: string, despesaId: string): Promise<void> => {
        await api.delete(`/v1/grupos/${grupoId}/despesas/${despesaId}`);
    },

    pagarDespesa: async (despesaId: string, comprovante: File): Promise<void> => {
        const formData = new FormData();
        formData.append('comprovante', comprovante);

        await api.post(`/v1/expenses/${despesaId}/pay`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    listarMinhasCobrancas: async (): Promise<CobrancaResponse[]> => {
        const response = await api.get<CobrancaResponse[]>('/cobrancas/minhas-cobrancas');
        return response.data;
    },

    listarCobrancasDoGrupo: async (grupoId: string): Promise<CobrancaResponse[]> => {
        const response = await api.get<CobrancaResponse[]>(`/cobrancas/grupo/${grupoId}`);
        return response.data;
    },

    obterComprovante: async (cobrancaId: string): Promise<Blob> => {
        const response = await api.get(`/v1/expenses/${cobrancaId}/comprovante`, {
            responseType: 'blob'
        });
        return response.data;
    }
};
