import auth_ from '../services/auth';
import api from '../services/api';

const auth = {
    namespaced: true,
    state: {
        user: null,
        token: null,
        tipo: null,
        isAuthenticated: false
    },
    getters: {
        user: state => state.user,
        token: state => state.token,
        tipo: state => state.tipo,
        isAuthenticated: state => state.isAuthenticated
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
        },
        SET_TOKEN(state, token) {
            state.token = token;
            if (token) {
                localStorage.setItem('auth_token', token);
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } else {
                localStorage.removeItem('auth_token');
                delete api.defaults.headers.common['Authorization'];
            }
        },
        SET_TIPO(state, tipo) {
            state.tipo = tipo;
            if (tipo) {
                localStorage.setItem('auth_tipo', tipo);
            } else {
                localStorage.removeItem('auth_tipo');
            }
        },
        SET_AUTHENTICATED(state, value) {
            state.isAuthenticated = value;
        },
        CLEAR_AUTH(state) {
            state.user = null;
            state.token = null;
            state.tipo = null;
            state.isAuthenticated = false;
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_tipo');
            delete api.defaults.headers.common['Authorization'];
        }
    },
    actions: {
        async login({ commit }, payload) {
            try {
                const response = await auth_.login(payload);
                const { user, token, tipo } = response.data;

                commit('SET_USER', user);
                commit('SET_TOKEN', token);
                commit('SET_TIPO', tipo);
                commit('SET_AUTHENTICATED', true);

                return response;
            } catch (error) {
                commit('CLEAR_AUTH');
                throw error;
            }
        },
        async logout({ commit }) {
            try {
                await auth_.logout();
            } catch (error) {
                console.error('Logout error:', error);
            } finally {
                commit('CLEAR_AUTH');
            }
        },
        async checkAuth({ commit }) {
            const token = localStorage.getItem('auth_token');
            const tipo = localStorage.getItem('auth_tipo');

            if (token && tipo) {
                commit('SET_TOKEN', token);
                commit('SET_TIPO', tipo);
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                try {
                    const response = await auth_.me();
                    commit('SET_USER', response.data);
                    commit('SET_AUTHENTICATED', true);
                    return true;
                } catch (error) {
                    commit('CLEAR_AUTH');
                    return false;
                }
            }

            return false;
        }
    },
}

export default auth;

