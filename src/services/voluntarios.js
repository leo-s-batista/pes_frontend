import api from './api';

export default {
    all() {
        return api.get('/voluntario');
    },
    search(payload) {
        return api.post(`/voluntario/search`, payload);
    },
    get(id) {
        return api.get(`/voluntario/${id}`);
    },
    create(voluntario) {
        return api.post('/voluntario', voluntario);
    },
    update(voluntario) {
        return api.put(`/voluntario`, voluntario);
    },
    delete(id) {
        return api.delete(`/voluntario/${id}`);
    }
};