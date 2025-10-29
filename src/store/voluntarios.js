import voluntarios_ from '../services/voluntarios';

const voluntarios = {
    namespaced: true,
    state: {
        list: []
    },
    getters: {
        list: state => state.list
    },
    mutations: {
        SET_VOLUNTARIOS(state, value) {
            console.log('value', value);
            state.list = value;
        },
        ADD_VOLUNTARIO(state, voluntario) {
            state.list.push(voluntario);
        },
        UPDATE_VOLUNTARIO(state, voluntario) {
            const index = state.list.findIndex(v => v.id === voluntario.id);
            state.list[index] = voluntario;
        },
        DELETE_VOLUNTARIO(state, id) {
            const index = state.list.findIndex(v => v.id === id);
            state.list.splice(index, 1);
        }
    },
    actions: {
        async all({ commit }) {
            const voluntarios = await voluntarios_.all();

            commit('SET_VOLUNTARIOS', voluntarios.data);
        },
        async search({ commit }, { term, order }) {
            const voluntarios = await voluntarios_.search(term, order);

            commit('SET_VOLUNTARIOS', voluntarios.data);
        },
        async get(id) {
            const voluntario = await voluntarios_.get(id);

            return voluntario;
        },
        async create({ commit }, payload) {
            const voluntario = await voluntarios_.create(payload);

            commit('ADD_VOLUNTARIO', voluntario.data);

            return voluntario;
        },
        async update({ commit }, payload) {
            await voluntarios_.update(payload);

            commit('UPDATE_VOLUNTARIO', payload);
        },
        async delete({ commit }, id) {
            await voluntarios_.delete(id);

            commit('DELETE_VOLUNTARIO', id);
        }
    },
}

export default voluntarios;