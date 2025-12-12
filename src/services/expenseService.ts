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
        
        const token = "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUEkgUmF4YWUiLCJzdWIiOiJyaWNrbGVlQGdtYWlsLmNvbSIsIm5vbWVDb21wbGV0byI6IlJpY2sgTGVlIiwiaWF0IjoxNzY1NDc5ODYxLCJleHAiOjE3NjU1MjMwNjF9.R4lyj5SeWJ58NNZirFgBYJBtQkSO78caEK5F_AuxuUk"; 
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await api.post<DespesaResponse>(`/v1/grupos/${grupoId}/despesas`, data, config);
        return response.data;
    },
}
