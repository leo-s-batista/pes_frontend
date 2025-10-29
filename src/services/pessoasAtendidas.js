import api from './api';

export default {
    all() {
        return api.get('/pessoa-atendida');
    },
    search(term, order) {
        return api.get(`/pessoa-atendida/search?term=${term}&order=${order}`);
    },
    get(id) {
        return api.get(`/pessoa-atendida/${id}`);
    },
    create(pessoaAtendida) {
        return api.post('/pessoa-atendida', pessoaAtendida);
    },
    update(pessoaAtendida) {
        return api.put(`/pessoa-atendida`, pessoaAtendida);
    },
    delete(id) {
        return api.delete(`/pessoa-atendida/${id}`);
    }
};