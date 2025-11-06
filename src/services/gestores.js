import api from './api';

export default {
    all() {
        return api.get('/gestor');
    },
    search(payload) {
        return api.post(`/gestor/search`, payload);
    },
    get(id) {
        return api.get(`/gestor/${id}`);
    },
    create(gestor) {
        return api.post('/gestor', gestor);
    },
    update(gestor) {
        return api.put(`/gestor`, gestor);
    },
    delete(id) {
        return api.delete(`/gestor/${id}`);
    }
};

