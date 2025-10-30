<template>
    <tr class="voluntario--item">
        <td class="voluntario--item__id">
            {{ voluntario.id }}
        </td>
        <td class="voluntario--item__status">
            {{ parseInt(voluntario.status) === 1 ? 'Ativo' : 'Inativo' }}
        </td>
        <td class="voluntario--item__name">
            {{ voluntario.nome }}
        </td>
        <td class="voluntario--item__cpf">
            {{ voluntario.cpf }}
        </td>
        <td class="voluntario--item__email">
            {{ voluntario.email }}
        </td>
        <td class="voluntario--telefone">
            {{ voluntario.telefone }}
        </td>
        <td class="voluntario--item__data capitalize">
            {{ $moment(voluntario.data_cadastro).format('DD/MMMM/YYYY HH:mm') }}
        </td>
        <td class="voluntario--item__actions">
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
    name: 'VoluntarioItem',
    props: {
        voluntario: {
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

            await this.$store.dispatch('voluntarios/delete', this.voluntario.id);

            this.$notify({
                title: 'Sucesso',
                message: 'Voluntário excluído com sucesso.',
                type: 'success',
                duration: 1500
            });

        }
    }
}
</script>

<style lang="scss">

.voluntario--item {
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