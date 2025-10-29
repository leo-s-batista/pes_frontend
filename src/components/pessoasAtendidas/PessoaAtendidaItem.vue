<template>
    <tr class="pessoaAtendida--item">
        <td class="pessoaAtendida--item__id">
            {{ pessoaAtendida.id }}
        </td>
        <td class="pessoaAtendida--item__status">
            {{ pessoaAtendida.status === 1 ? 'Ativo' : 'Inativo' }}
        </td>
        <td class="pessoaAtendida--item__name">
            {{ pessoaAtendida.nome }}
        </td>
        <td class="pessoaAtendida--item__cpf">
            {{ pessoaAtendida.cpf ? pessoaAtendida.cpf : '---' }}
        </td>
        <td class="pessoaAtendida--item__dataNascimento capitalize">
            {{ pessoaAtendida.data_nascimento ? $moment(pessoaAtendida.data_nascimento).format('DD/MMMM/YYYY'): '---' }}
        </td>
        <td class="pessoaAtendida--telefone">
            {{ pessoaAtendida.telefone ? pessoaAtendida.telefone : '---' }}
        </td>
        <td class="pessoaAtendida--item__data capitalize">
            {{ $moment(pessoaAtendida.data_cadastro).format('DD/MMMM/YYYY HH:mm') }}
        </td>
        <td class="pessoaAtendida--item__actions">
            <button @click="$emit('edit')">
                <font-awesome-icon icon="edit" />
                <span>Editar</span>
            </button>
            <button class="danger" @click="remove()">
                <template v-if="loading.delete">
                    <font-awesome-icon icon="circle-notch" spin />
                    <span>Apagando</span>
                </template>
                <template v-else>
                    <font-awesome-icon icon="trash" />
                    <span>Apagar</span>
                </template>
            </button>
        </td>
    </tr>
</template>

<script>
export default {
    name: 'pessoaAtendidaItem',
    props: {
        pessoaAtendida: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            loading: {
                delete: false
            }
        }
    },
    methods: {
        async remove() {
            this.loading.delete = true;

            await this.$store.dispatch('pessoasAtendidas/delete', this.pessoaAtendida.id);

            this.$notify({
                title: 'Sucesso',
                message: 'Pessoa Atendida excluída com sucesso.',
                type: 'success',
                duration: 1500
            });

        }
    }
}
</script>

<style lang="scss">

.pessoaAtendida--item {
    @apply text-sm;
    border-bottom: 1px solid #ccc;

    td {
        @apply py-4 px-2 text-center;
    }

    &__actions {
        @apply flex items-center gap-x-2;
    }
}

</style>