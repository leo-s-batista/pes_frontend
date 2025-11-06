<template>
  <section class="voluntarios">
    <transition name="fade" mode="out-in">
      <div v-if="loading" class="voluntarios--loading">
        <font-awesome-icon icon="circle-notch" spin />
      </div>
      <div v-else class="voluntarios--container">
        <div class="voluntarios--container__title">
          <font-awesome-icon :icon="routeIcon.voluntarios" />
          <span>{{ $t('voluntarios.title') }}</span>
          <button @click="showModal = true">
            <font-awesome-icon icon="plus" />
            <span>{{ $t('voluntarios.add') }}</span>
          </button>
        </div>
        <div class="voluntarios--container__filter">
          <div class="voluntarios--container__filter--order">
            <span>{{ $t('voluntarios.order_by') }}</span>
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
          <div class="voluntarios--container__filter--search">
            <span>Filtrar por</span>
            <font-awesome-icon icon="filter" />
            <select v-model="filter.column">
              <option value="nome">Nome</option>
              <option value="cpf">CPF</option>
              <option value="email">Email</option>
              <option value="telefone">Telefone</option>
              <option value="endereco">Endereço</option>
              <option value="status">Status</option>
            </select>
            <input v-if="filter.column !== 'status'" v-model="filter.term" type="text" :placeholder="$t('voluntarios.search.placeholder')" />
            <select v-else v-model="filter.term" class="status-select">
              <option value="">Todos</option>
              <option value="1">Ativo</option>
              <option value="0">Inativo</option>
            </select>
            <button>
              <font-awesome-icon icon="search" />
              <span>{{ $t('voluntarios.search') }}</span>
            </button>
          </div>
        </div>
        <table class="voluntarios--container__list">
          <tr class="voluntarios--container__list--item">
            <td>ID</td>
            <td>Status</td>
            <td>Nome</td>
            <td>CPF</td>
            <td>Email</td>
            <td>Telefone</td>
            <td>Data de Cadastro</td>
            <td>Ações</td>
          </tr>
          <tr v-if="voluntarios.length === 0" class="voluntarios--container__list--empty">
            <td colspan="8">
              Nenhum registro encontrado.
            </td>
          </tr>
          <VoluntarioItem v-for="(voluntario, index) in voluntarios" :key="`voluntario-${voluntario.id}`" :voluntario="voluntario"  @edit="edit(index)" @remove="remove(voluntario.id)" />
        </table>
      </div>

    </transition>

    <transition name="fade" mode="out-in">
      <VoluntarioModal ref="modal" v-if="showModal" @close="showModal = false" @saved="voluntarioSaved()" />
    </transition>


  </section>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';
import VoluntarioItem from '@/components/voluntarios/VoluntarioItem.vue';
import VoluntarioModal from '@/components/voluntarios/VoluntarioModal.vue';

export default {
  name: 'voluntarios',
  components: {
    VoluntarioItem,
    VoluntarioModal
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
      voluntarios: 'voluntarios/list',
      routeIcon: 'routeIcon'
    }),
  },
  async created() {
    this.searchVoluntarios(this.filter).then(() => {
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
          this.searchVoluntarios(this.filter);
        }, 100);
      },
      deep: true
    },
    'filter.order': {
      handler() {
        this.searchVoluntarios(this.filter);
      },
      deep: true
    },
    'filter.order_mode': {
      handler() {
        this.searchVoluntarios(this.filter);
      },
      deep: true
    },
    'filter.column': {
      handler() {
        this.filter.term = '';
      }
    }
  },
  methods: {
    ...mapActions({
      searchVoluntarios: 'voluntarios/search'
    }),
    voluntarioSaved() {
      this.searchVoluntarios(this.filter);
    },
    edit(index) {
      this.showModal = true;
      
      this.$nextTick(() => {
        this.$refs.modal.edit(this.voluntarios[index]);
      })
    }
  },
  

}
</script>

<style lang="scss">
.voluntarios {
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
        @apply text-sm grid items-center gap-x-1;
        grid-template-columns: auto auto auto 1fr auto;
        select:not(.status-select) {
          @apply  gap-x-1 bg-gray-100 px-3 py-2 rounded-lg shadow-sm outline-none border-none h-full;
        }
        input, select.status-select {
          @apply px-3 py-2 rounded-lg shadow-sm bg-transparent outline-none w-full;
          border: 1px solid #ccc;
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