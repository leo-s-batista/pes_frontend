<template>
    <tr class="gestor--item">
        <td class="gestor--item__id">
            {{ gestor.id }}
        </td>
        <td class="gestor--item__status">
            {{ parseInt(gestor.status) === 1 ? 'Ativo' : 'Inativo' }}
        </td>
        <td class="gestor--item__name">
            {{ gestor.nome }}
        </td>
        <td class="gestor--item__cpf">
            {{ gestor.cpf }}
        </td>
        <td class="gestor--item__email">
            {{ gestor.email }}
        </td>
        <td class="gestor--telefone">
            {{ gestor.telefone }}
        </td>
        <td class="gestor--item__data capitalize">
            {{ $moment(gestor.data_cadastro).format('DD/MMMM/YYYY HH:mm') }}
        </td>
        <td class="gestor--item__actions">
            <button @click="$emit('edit')">
                <font-awesome-icon icon="edit" />
                <span>Editar</span>
            </button>

            <button class="danger">
                <template v-if="loading.delete">
                    <font-awesome-icon icon="circle-notch" spin />
                    <span>Apagando</span>
                </template>
                <template v-else>
                    <el-popconfirm
                        confirm-button-text='Sim'
                        cancel-button-text='Cancelar'
                        icon="el-icon-warning"
                        icon-color="red"
                        title="Tem certeza que deseja excluir este registro?"
                        @confirm="remove()"
                    >
                        <div slot="reference">
                            <font-awesome-icon icon="trash" />
                            <span>Apagar</span>
                        </div>
                    </el-popconfirm>
                </template>
            </button>
        </td>
    </tr>
</template>

<script>
export default {
    name: 'GestorItem',
    props: {
        gestor: {
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

            await this.$store.dispatch('gestores/delete', this.gestor.id);

            this.$notify({
                title: 'Sucesso',
                message: 'Gestor excluído com sucesso.',
                type: 'success',
                duration: 1500
            });

        }
    }
}
</script>

<style lang="scss">

.gestor--item {
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

