import Vue from 'vue';
import Vuex from 'vuex';

import voluntarios from './voluntarios';
import pessoasAtendidas from './pessoasAtendidas';
import gestores from './gestores';

Vue.use(Vuex);

export default new Vuex.Store({
   state: {
      routeIcon: {
         home: 'home',
         voluntarios: 'users',
         pessoas_atendidas: 'people-group',
         gestores: 'users-gear',
      }
   },
   getters: {
      routeIcon: state => state.routeIcon
   },
   modules: {
      voluntarios,
      pessoasAtendidas,
      gestores
   }
});