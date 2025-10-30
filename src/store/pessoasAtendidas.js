import pessoasAtendidas_ from '../services/pessoasAtendidas';

const pessoasAtendidas = {
    namespaced: true,
    state: {
        list: []
    },
    getters: {
        list: state => state.list
    },
    mutations: {
        SET_VOLUNTARIOS(state, value) {
            state.list = value;
        },
        ADD_VOLUNTARIO(state, pessoaAtendida) {
            state.list.unshift(pessoaAtendida);
        },
        UPDATE_VOLUNTARIO(state, pessoaAtendida) {
            const index = state.list.findIndex(v => v.id === pessoaAtendida.id);
            state.list[index] = pessoaAtendida;
        },
        DELETE_VOLUNTARIO(state, id) {
            const index = state.list.findIndex(v => v.id === id);
            state.list.splice(index, 1);
        }
    },
    actions: {
        async all({ commit }) {
            const pessoasAtendidas = await pessoasAtendidas_.all();

            commit('SET_VOLUNTARIOS', pessoasAtendidas.data);
        },
        async search({ commit }, payload) {
            const pessoasAtendidas = await pessoasAtendidas_.search(payload);

            commit('SET_VOLUNTARIOS', pessoasAtendidas.data);
        },
        async get(id) {
            const pessoaAtendida = await pessoasAtendidas_.get(id);

            return pessoaAtendida;
        },
        async create({ commit }, payload) {
            const pessoaAtendida = await pessoasAtendidas_.create(payload);

            commit('ADD_VOLUNTARIO', pessoaAtendida.data);

            return pessoaAtendida;
        },
        async update({ commit }, payload) {
            await pessoasAtendidas_.update(payload);

            commit('UPDATE_VOLUNTARIO', payload);
        },
        async delete({ commit }, id) {
            await pessoasAtendidas_.delete(id);

            commit('DELETE_VOLUNTARIO', id);
        }
    },
}

export default pessoasAtendidas;