import Vue from 'vue'
import App from './App.vue'

import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VeeValidate, { Validator } from 'vee-validate'
import ptBR from 'vee-validate/dist/locale/pt_BR'

Validator.localize('pt_BR', ptBR)

Validator.localize('pt_BR', {
  attributes: {
    nome: 'Nome',
    cpf: 'CPF',
    email: 'E-mail',
    senha: 'Senha',
    telefone: 'Telefone',
    data_cadastro: 'Data de Cadastro'
  },
  custom: {
    nome: {
      required: 'Informe o Nome.'
    },
    cpf: {
      required: 'Informe o CPF.',
      cpf: 'Informe um CPF válido.'
    },
    email: {
      required: 'Informe o E-mail.',
      email: 'Informe um e-mail válido.'
    },
    senha: {
      required: 'Informe a Senha.'
    },
    telefone: {
      required: 'Informe o Telefone.',
      phone: 'Informe um telefone válido no formato (99) 99999-9999.'
    },
    data_cadastro: {
      required: 'Informe a Data de Cadastro.'
    }
  }
})

Vue.use(VeeValidate, {
    mode: 'eager',
    locale: 'pt_BR'
})

import VMask from 'v-mask'
Vue.use(VMask)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import pt_BR from 'element-ui/lib/locale/lang/pt-br';
Vue.use(ElementUI, { locale: pt_BR });

import './assets/tailwind.css';
import './assets/base.scss';
import './plugins/fontawesome'
import moment from 'moment'

moment.locale('pt');

const i18n = new VueI18n({
  locale: 'pt',
  fallbackLocale: 'pt',
  messages: {
    pt: require('../locales/pt.json'),
  },
});

Vue.config.productionTip = false

Vue.prototype.$moment = moment

import router from '../router';
import store from './store/store.js'

new Vue({
  store,
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')