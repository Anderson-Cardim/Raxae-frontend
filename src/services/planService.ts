import api from './api';

export interface Plano {
    id: string;
    tipo: string;
    descricao: string;
    precoMensal: number;
    limiteGrupos: number;
    limiteMembrosPorGrupo: number;
    limiteDespesaPorGrupo: number;
}

export interface PlanoUsuarioResponse {
    id: string;
    statusAdesao: 'ATIVO' | 'PENDENTE' | 'CANCELADO' | 'EXPIRADO';
    momentoAdesao: string;
    diaExpiracao: number;
    usuarioId: string;
    planoId: string;
}

export const planService = {
    listarPlanos: async (): Promise<Plano[]> => {
        const response = await api.get<Plano[]>('/v1/planos');
        return response.data;
    },

    atualizarPlano: async (planoId: string): Promise<PlanoUsuarioResponse> => {
        const response = await api.patch<PlanoUsuarioResponse>('/v1/planos/atualizar', { planoId });
        return response.data;
    }
};
