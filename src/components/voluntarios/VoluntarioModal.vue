<template>
    <div class="voluntario--modal">
        <div class="voluntario--modal__mask" @click="close()" />
        <div class="voluntario--modal__wrapper">

            <div class="voluntario--modal__wrapper--header">
                <div class="voluntario--modal__wrapper--header__title">
                    <font-awesome-icon icon="user" />
                    <span>{{ modalTitle }}</span>
                </div>
                <div class="voluntario--modal__wrapper--header__close" @click="close()">
                    <font-awesome-icon icon="xmark" />
                </div>
            </div>

            <div class="voluntario--modal__wrapper--body">

                <div class="voluntario--modal__wrapper--body__row">
                    <div class="label">
                        {{ $t('voluntarios.form.status') }}
                    </div>
                    <div class="field">
                        <select v-model="voluntario_.status">
                            <option value="1">Ativo</option>
                            <option value="0">Inativo</option>
                        </select>
                    </div>
                </div>
                <div class="voluntario--modal__wrapper--body__row">
                    <div class="label">
                        {{ $t('voluntarios.form.nome') }}
                    </div>
                    <div class="field">
                        <input v-validate="`required`" name="nome" type="text" v-model="voluntario_.nome" />
                        <small>{{ errors.first('nome') }}</small>
                    </div>
                </div>
                <div class="voluntario--modal__wrapper--body__row">
                    <div class="label">
                        {{ $t('voluntarios.form.cpf') }}
                    </div>
                    <div class="field">
                        <input v-validate="`required|cpf`" name="cpf" type="text" v-mask="'###.###.###-##'" v-model="voluntario_.cpf" />
                        <small>{{ errors.first('cpf') }}</small>
                    </div>
                </div>
                <div class="voluntario--modal__wrapper--body__row">
                    <div class="label">
                        {{ $t('voluntarios.form.email') }}
                    </div>
                    <div class="field">
                        <input v-validate="`required|email`" name="email" type="text" v-model="voluntario_.email" />
                        <small>{{ errors.first('email') }}</small>
                    </div>
                </div>
                <div class="voluntario--modal__wrapper--body__row">
                    <div class="label">
                        {{ $t('voluntarios.form.senha') }}
                    </div>
                    <div class="field">
                        <input v-validate="`required`" name="senha" type="password" v-model="voluntario_.senha" />
                        <small>{{ errors.first('senha') }}</small>
                    </div>
                </div>
                <div class="voluntario--modal__wrapper--body__row">
                    <div class="label">
                        {{ $t('voluntarios.form.telefone') }}
                    </div>
                    <div class="field">
                        <input v-validate="`required|phone`" v-mask="'(##) #####-####'" name="telefone" type="text" v-model="voluntario_.telefone" />
                        <small>{{ errors.first('telefone') }}</small>
                    </div>
                </div>
                <div class="voluntario--modal__wrapper--body__row">
                    <div class="label">
                        {{ $t('voluntarios.form.data_cadastro') }}
                    </div>
                    <div class="field">
                        <el-date-picker
                            v-validate="`required`"
                            name="data_cadastro"
                            v-model="voluntario_.data_cadastro"
                            type="datetime"
                            format="dd/MM/yyyy HH:mm"    
                            value-format="yyyy-MM-dd HH:mm:ss"
                        >
                        </el-date-picker>
                        <small>{{ errors.first('data_cadastro') }}</small>
                    </div>
                </div>



            </div>
            <div class="voluntario--modal__wrapper--footer">

                <template v-if="editing">
                    <button class="danger" v-if="loading.delete">
                        <font-awesome-icon icon="circle-notch" spin />
                        <span>Apagando</span>
                    </button>
                    <button v-else class="danger" @click="remove()">
                        <font-awesome-icon icon="trash" />
                        <span>Apagar</span>
                    </button>
                    <button v-if="loading.save">
                        <font-awesome-icon icon="circle-notch" spin />
                        <span>Salvando</span>
                    </button>
                    <button v-else @click="save()">
                        <font-awesome-icon icon="save" />
                        <span>Salvar</span>
                    </button>
                </template>
                <template v-else>
                    <button v-if="loading.save">
                        <font-awesome-icon icon="circle-notch" spin />
                        <span>Salvando</span>
                    </button>
                    <button v-else @click="save()">
                        <font-awesome-icon icon="save" />
                        <span>Adicionar</span>
                    </button>
                </template>

            </div>

        </div>
    </div>
</template>

<script>

import { Validator  } from 'vee-validate';

function isValidCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false;
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;

    return resto === parseInt(cpf.charAt(10));
}

Validator.extend('cpf', {
  validate: value => {
    const regex = /^\d{3}.\d{3}.\d{3}-\d{2}$/
    return { valid: regex.test(value) && isValidCPF(value) };
  }
});

Validator.extend('phone', {
  validate: value => {
    const regex = /\(\d{2}\) \d{5}-\d{4}$/
    return { valid: regex.test(value) };
  }
});

export default {
    name: 'VoluntarioModal',
    data() {
        return {
            editing: false,
            loading: {
                save: false,
                delete: false
            },
            voluntario_: {
                status: 1,
                nome: '',
                cpf: '',
                email: '',
                senha: '',
                telefone: '',
                data_cadastro: ''
            }
        }
    },
    computed: {
        modalTitle() {
            return this.$t(`voluntarios.modal.title.${this.editing ? 'edit' : 'add'}`);
        }
    },
    created() {
        this.voluntario_.data_cadastro = this.$moment().format('YYYY-MM-DD HH:mm:ss');
    },
    methods: {
        close() {

            this.editing = false

            this.$emit('close');
        },
        edit(voluntario) {
            this.voluntario_ = { ...voluntario, senha: 'same@password' }
            this.editing = true
        },
        save() {
            this.$validator.validateAll().then(async (isValid) => {
                if (isValid) {

                    this.loading.save = true;

                    const message = this.editing ? 'Voluntário atualizado com sucesso.' : 'Voluntário criado com sucesso.';
                    
                    const voluntario = { ...this.voluntario_ }
                    
                    if (this.editing) {


                        delete voluntario.created_at;
                        voluntario.updated_at = this.$moment().format('YYYY-MM-DD HH:mm:ss');

                        if (voluntario.senha === 'same@password') {
                            delete voluntario.senha
                        }

                        await this.$store.dispatch('voluntarios/update', voluntario);
                    } else {
                        await this.$store.dispatch('voluntarios/create', voluntario);
                    }

                    this.$notify({
                        title: 'Sucesso',
                        message,
                        type: 'success',
                        duration: 1500
                    });

                    this.close();
                }
            })
        },
        async remove() {
            this.loading.delete = true;

            await this.$store.dispatch('voluntarios/delete', this.voluntario_.id);

            this.$notify({
                title: 'Sucesso',
                message: 'Voluntário excluído com sucesso.',
                type: 'success',
                duration: 1500
            });

            this.close()
        }
    }
}
</script>

<style lang="scss">

.voluntario--modal {
    @apply fixed top-0 left-0 w-full h-full z-40 flex items-center justify-center;
    &__mask {
        @apply absolute top-0 left-0 w-full h-full bg-black opacity-50;
    }
    &__wrapper {
        @apply relative bg-white rounded-lg shadow-lg px-10 py-6 w-10/12 grid gap-y-12;

        width: 450px;

        grid-template-rows: auto 1fr auto;

        &--header {
            @apply flex justify-between relative leading-none;
            &__title {
                @apply flex items-center gap-x-1;
            }
            &__close {
                @apply bg-primary text-white text-xs h-6 w-6 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300;
                &:hover {
                    @apply bg-primary-dark;
                }
            }
        }
        &--body {
            @apply grid gap-y-4;

            &__row {
                @apply grid gap-y-1;
                .label {
                    @apply uppercase;
                    font-size: 10px;
                }
                small {
                    @apply text-xs text-red-500;
                }
            }
        }
        &--footer {
            @apply flex justify-center items-center gap-x-2;
        }
    }
}

</style>