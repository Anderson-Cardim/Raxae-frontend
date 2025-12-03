import api from './api';

export interface MembroGrupo {
    idMembro: string;
    idUsuario: string;
    nomeUsuario: string;
    status: 'ATIVO' | 'PENDENTE' | 'REMOVIDO';
}

export interface GrupoResponse {
    id: string;
    nomeGrupo: string;
    descricao: string;
    icone: string;
    adminId: string;
    dataCriacao: string;
    membros: MembroGrupo[];
}

export interface MembroRequest {
    email: string;
    nome: string;
    funcao: string;
}

export interface ConfiguracaoGrupo {
    juros: number;
    multa: number;
}

export interface GrupoRequest {
    nomeGrupo: string;
    descricao: string;
    icone: string;
}

export interface MembroSimples {
    nomeCompleto: string;
    status: 'ATIVO' | 'PENDENTE' | 'REMOVIDO';
}

export interface HistoricoItem {
    id: string;
    tipo: string;
    descricao: string;
    valor: number;
    data: string;
    status: string;
}

export interface HistoricoMembroResponse {
    grupoId: string;
    membroId: string;
    totalDespesasRealizadas: number;
    totalCobrancasRecebidas: number;
    saldo: number;
    historico: HistoricoItem[];
}

export const groupService = {
    criarGrupo: async (data: GrupoRequest): Promise<GrupoResponse> => {
        const response = await api.post<GrupoResponse>('/v1/grupo', data);
        return response.data;
    },

    deletarGrupo: async (idDoGrupo: string): Promise<void> => {
        await api.delete(`/v1/grupo/${idDoGrupo}`);
    },

    obterGrupo: async (idDoGrupo: string): Promise<GrupoResponse> => {
        const response = await api.get<GrupoResponse>(`/v1/grupo/${idDoGrupo}`);
        return response.data;
    },

    editarGrupo: async (idDoGrupo: string, data: GrupoRequest): Promise<GrupoResponse> => {
        const response = await api.patch<GrupoResponse>(`/v1/grupo/${idDoGrupo}`, data);
        return response.data;
    },

    removerMembro: async (idDoGrupo: string, idDoMembro: string): Promise<void> => {
        await api.patch(`/v1/grupo/${idDoGrupo}/membro/${idDoMembro}/remover`);
    },

    gerarConvite: async (idDoGrupo: string): Promise<string> => {
        const response = await api.post<string>(`/v1/grupo/${idDoGrupo}/convite`);
        return response.data;
    },

    entrarNoGrupo: async (idDoGrupo: string): Promise<void> => {
        await api.get(`/v1/grupo/${idDoGrupo}/join`);
    },

    listarMeusGrupos: async (): Promise<GrupoResponse[]> => {
        const response = await api.get<GrupoResponse[]>('/v1/grupo/meus-grupos');
        return response.data;
    },

    listarMembros: async (idDoGrupo: string): Promise<MembroSimples[]> => {
        const response = await api.get<MembroSimples[]>(`/v1/grupo/${idDoGrupo}/membros`);
        return response.data;
    },

    buscarHistoricoMembro: async (idDoGrupo: string, idDoMembro: string): Promise<HistoricoMembroResponse> => {
        const response = await api.get<HistoricoMembroResponse>(`/v1/grupo/${idDoGrupo}/historico/${idDoMembro}`);
        return response.data;
    }
};
