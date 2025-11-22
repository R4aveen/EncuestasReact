import axios from 'axios';


const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Token ${token}`,
        },
    };
};

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export const CuadrillaService = {
    getIncidencias: async (estado?: string) => {
        try {
            const url = estado ? `${BASE_API_URL}?estado=${estado}` : BASE_API_URL;
            const response = await axios.get(url, getAuthConfig());
            return response.data;
        } catch (error: any) {
            handleAuthError(error);
            throw error;
        }
    },

    getIncidenciaById: async (id: number) => {
        try {
            const response = await axios.get(`${BASE_API_URL}${id}/`, getAuthConfig());
            return response.data;
        } catch (error: any) {
            handleAuthError(error);
            throw error;
        }
    },

    iniciarIncidencia: async (id: number) => {
        try {
            const response = await axios.post(`${BASE_API_URL}${id}/iniciar/`, {}, getAuthConfig());
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    subirEvidencia: async (id: number, formData: FormData) => {
        try {
            const config = getAuthConfig();

            const response = await axios.post(
                `${BASE_API_URL}${id}/subir-evidencia/`,
                formData,
                {
                    headers: {
                        ...config.headers,
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    finalizarIncidencia: async (id: number, comentario: string) => {
        try {
            const response = await axios.post(
                `${BASE_API_URL}${id}/finalizar/`,
                { comentario },
                getAuthConfig()
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    rechazarIncidencia: async (id: number, data: { motivo_rechazo: string }) => {
        try {
            const response = await axios.post(`${BASE_API_URL}${id}/rechazar/`, data, getAuthConfig());
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getEstadisticas: async () => {
        try {
            const response = await axios.get(BASE_API_URL, getAuthConfig());
            const incidencias = response.data;
            return {
                total: incidencias.length,
                pendientes: incidencias.filter((i: any) => i.estado === 'en_proceso').length,
                resueltas: incidencias.filter((i: any) => i.estado === 'finalizada').length
            };
        } catch (error: any) {
            handleAuthError(error);
            throw error;
        }
    }
};

const handleAuthError = (error: any) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
};
