import gestores_ from '../services/gestores';

const gestores = {
    namespaced: true,
    state: {
        list: []
    },
    getters: {
        list: state => state.list
    },
    mutations: {
        SET_GESTORES(state, value) {
            state.list = value;
        },
        ADD_GESTOR(state, gestor) {
            state.list.unshift(gestor);
        },
        UPDATE_GESTOR(state, gestor) {
            const index = state.list.findIndex(g => g.id === gestor.id);
            state.list[index] = gestor;
        },
        DELETE_GESTOR(state, id) {
            const index = state.list.findIndex(g => g.id === id);
            state.list.splice(index, 1);
        }
    },
    actions: {
        async all({ commit }) {
            const gestores = await gestores_.all();

            commit('SET_GESTORES', gestores.data);
        },
        async search({ commit }, payload) {
            const gestores = await gestores_.search(payload);

            commit('SET_GESTORES', gestores.data);
        },
        async get(id) {
            const gestor = await gestores_.get(id);

            return gestor;
        },
        async create({ commit }, payload) {
            const gestor = await gestores_.create(payload);

            commit('ADD_GESTOR', gestor.data);

            return gestor;
        },
        async update({ commit }, payload) {
            await gestores_.update(payload);

            commit('UPDATE_GESTOR', payload);
        },
        async delete({ commit }, id) {
            await gestores_.delete(id);

            commit('DELETE_GESTOR', id);
        }
    },
}

export default gestores;

