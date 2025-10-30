import api from './api';

export default {
    all() {
        return api.get('/pessoa-atendida');
    },
    search(payload) {
        return api.post(`/pessoa-atendida/search`, payload);
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