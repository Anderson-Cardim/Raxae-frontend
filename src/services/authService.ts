import api from './api';

export interface CadastroRequest {
    nomeCompleto: string;
    whatsapp: string;
    email: string;
    senha: string;
}

export interface LoginRequest {
    email: string;
    senha: string;
}

export interface LoginResponse {
    tipo: string;
    token: string;
    usuarioId: string;
}

export interface UsuarioInfoResponse {
    numeroDeGrupo: number;
    economiaTotal: number;
    totalPagoNoMes: number;
    nomeUsuario: string;
    whatsAppUsuario: string;
    emailUsuario: string;
}

export const authService = {
    cadastrar: async (data: CadastroRequest): Promise<void> => {
        await api.post('/v1/auth/cadastro', data);
    },

    login: async (data: LoginRequest): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>('/v1/auth/login', data);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('usuarioId', response.data.usuarioId);
        }
        return response.data;
    },

    getMe: async (mes?: string): Promise<UsuarioInfoResponse> => {
        const params = mes ? { mes } : {};
        const response = await api.get<UsuarioInfoResponse>('/v1/auth/info', { params });
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuarioId');
    }
};
