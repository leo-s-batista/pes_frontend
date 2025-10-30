<template>
  <section class="pessoasAtendidas">
    <transition name="fade" mode="out-in">
      <div v-if="loading" class="pessoasAtendidas--loading">
        <font-awesome-icon icon="circle-notch" spin />
      </div>
      <div v-else class="pessoasAtendidas--container">
        <div class="pessoasAtendidas--container__title">
          <font-awesome-icon :icon="routeIcon.pessoas_atendidas" />
          <span>{{ $t('pessoasAtendidas.title') }}</span>
          <button @click="showModal = true">
            <font-awesome-icon icon="plus" />
            <span>{{ $t('pessoasAtendidas.add') }}</span>
          </button>
        </div>
        <div class="pessoasAtendidas--container__filter">
          <div class="pessoasAtendidas--container__filter--order">
            <span>{{ $t('pessoasAtendidas.order_by') }}</span>
            <font-awesome-icon icon="arrow-up-z-a" />
            <select v-model="filter.order">
              <option value="id">ID</option>
              <option value="nome">Nome</option>
              <option value="data_cadastro">Data de Cadastro</option>
            </select>
            <select v-model="filter.order_mode">  
              <option value="asc">Crescente</option>
              <option value="desc">Decrescente</option>
            </select>
          </div>
          <div class="pessoasAtendidas--container__filter--search">
            <span>Filtrar por</span>
            <font-awesome-icon icon="filter" />
             <select v-model="filter.column">
                <option value="nome">Nome</option>
                <option value="cpf">CPF</option>
                <option value="genero">Gênero</option>
                <option value="telefone">Telefone</option>
                <option value="observacoes">Observações</option>
                <option value="endereco">Endereço</option>
              </select>
            <input v-model="filter.term" type="text" :placeholder="$t('pessoasAtendidas.search.placeholder')" />
            <button>
              <font-awesome-icon icon="search" />
              <span>{{ $t('pessoasAtendidas.search') }}</span>
            </button>
          </div>
        </div>
        <table class="pessoasAtendidas--container__list">
          <tr class="pessoasAtendidas--container__list--item">
            <td>ID</td>
            <td>Status</td>
            <td>Nome</td>
            <td>CPF</td>
            <td>Data de Nascimento</td>
            <td>Telefone</td>
            <td>Data de Cadastro</td>
            <td>Ações</td>
          </tr>
          <tr v-if="pessoasAtendidas.length === 0" class="pessoasAtendidas--container__list--empty">
            <td colspan="8">
              Nenhum registro encontrado.
            </td>
          </tr>
          <PessoaAtendidaItem v-for="(pessoaAtendida, index) in pessoasAtendidas" :key="`pessoaAtendida-${pessoaAtendida.id}`" :pessoaAtendida="pessoaAtendida"  @edit="edit(index)" @remove="remove(pessoaAtendida.id)" />
        </table>
      </div>

    </transition>

    <transition name="fade" mode="out-in">
      <PessoaAtendidaModal ref="modal" v-if="showModal" @close="showModal = false" @saved="pessoaAtendidaSaved()" />
    </transition>


  </section>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';
import PessoaAtendidaItem from '@/components/pessoasAtendidas/PessoaAtendidaItem.vue';
import PessoaAtendidaModal from '@/components/pessoasAtendidas/PessoaAtendidaModal.vue';

export default {
  name: 'pessoasAtendidas',
  components: {
    PessoaAtendidaItem,
    PessoaAtendidaModal
  },
  data() {
    return {
      loading: true,
      showModal: false,
      filter: {
        order: 'id',
        order_mode: 'desc',
        column: 'nome',
        term: ''
      },
      debounce: null
    }
  },
  computed: {
    ...mapGetters({
      pessoasAtendidas: 'pessoasAtendidas/list',
      routeIcon: 'routeIcon'
    }),
  },
  async created() {
    this.searchPessoasAtendidas(this.filter).then(() => {
      this.loading = false;
    })
  },
  watch: {
    // debounce scheme only for filter.term
    'filter.term': {
      handler() {
        if (this.debounce) {
          clearTimeout(this.debounce);
        }
        this.debounce = setTimeout(() => {
          this.searchPessoasAtendidas(this.filter);
        }, 100);
      },
      deep: true
    },
    'filter.order': {
      handler() {
        this.searchPessoasAtendidas(this.filter);
      },
      deep: true
    },
    'filter.order_mode': {
      handler() {
        this.searchPessoasAtendidas(this.filter);
      },
      deep: true
    }
  },
  methods: {
    ...mapActions({
      searchPessoasAtendidas: 'pessoasAtendidas/search'
    }),
    pessoaAtendidaSaved() {
      this.searchPessoasAtendidas(this.filter);
    },
    edit(index) {
      this.showModal = true;
      
      this.$nextTick(() => {
        this.$refs.modal.edit(this.pessoasAtendidas[index]);
      })
    }
  },
  

}
</script>

<style lang="scss">
.pessoasAtendidas {
  &--loading {
    @apply flex justify-center pt-20;
    svg {
      @apply text-2xl text-primary;
    }
  }
  &--container {
    @apply grid gap-y-8 pt-8 px-6 pb-20;

    max-width: 1360px;

    &__title {
      @apply flex items-center gap-x-1 text-xl;
      button {
        @apply ml-2;
      }
    }

    &__filter {
      @apply grid gap-x-2 items-center;
      grid-template-columns: auto 1fr;
      &--order {
        @apply text-sm inline-flex gap-x-2 items-center h-full;
        span {
          @apply whitespace-nowrap;
        }
        select {
          @apply  gap-x-1 bg-gray-100 px-3 py-2 rounded-lg shadow-sm outline-none border-none h-full;
        }
      }
      &--search {
        @apply text-sm grid items-center gap-x-2;
        grid-template-columns: auto auto auto 1fr auto;
        select {
          @apply  gap-x-1 bg-gray-100 px-3 py-2 rounded-lg shadow-sm outline-none border-none h-full;
        }
        button {
          @apply h-full;
        }
      }
    }

    &__list {
      @apply rounded-lg shadow overflow-hidden;
      border: 1px solid #ccc;
      &--item {
        @apply bg-primary text-white text-sm font-bold text-left rounded-lg;

        td {
          @apply px-6 py-4 text-center;
        }
      }

      &--empty {
        td {
          @apply py-10 bg-gray-100 text-center text-sm text-gray-500;
        }
      }

    }

  }
}
</style>