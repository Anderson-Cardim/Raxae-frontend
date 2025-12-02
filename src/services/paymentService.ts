import api from './api';

export interface PagamentoResponse {
    pagamentoId: string;
    cobrancaId: string;
    status: 'ENVIADO' | 'CONFIRMADO';
}

export const paymentService = {
    registrarPagamento: async (expenseId: string, comprovante: File): Promise<PagamentoResponse> => {
        const formData = new FormData();
        formData.append('comprovante', comprovante);

        const response = await api.post<PagamentoResponse>(`/v1/expenses/${expenseId}/pay`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    buscarComprovante: async (cobrancaId: string): Promise<Blob> => {
        const response = await api.get(`/v1/expenses/${cobrancaId}/comprovante`, {
            responseType: 'blob',
        });
        return response.data;
    }
};
