<template>
    <header>
        <nav class="navbar">
            <div class="navbar--logo">
                <img src="/general/logo.png" alt="logo">
            </div>
            <div class="navbar--routes">
                <router-link :to="$t(`routes.${route}`)" class="navbar--routes__item" v-for="route in routes" :key="route">
                    <font-awesome-icon :icon="routeIcon[route]" />
                    {{ $t(`navbar.${route}`) }}
                </router-link>
                <button @click="handleLogout" class="navbar--routes__item navbar--routes__logout">
                    <font-awesome-icon icon="sign-out-alt" />
                    Sair
                </button>
            </div>
        </nav>
    </header>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'CustomMenu',
    data() {
        return {
            allRoutes: ['home', 'voluntarios', 'pessoas_atendidas', 'gestores']
        }
    },
    computed: {
        ...mapState({
            routeIcon: 'routeIcon',
        }),
        ...mapGetters({
            userTipo: 'auth/tipo'
        }),
        routes() {
            if (this.userTipo === 'voluntario') {
                return this.allRoutes.filter(route => route !== 'gestores')
            }
            return this.allRoutes
        }
    },
    methods: {
        async handleLogout() {
            await this.$store.dispatch('auth/logout');
            this.$router.push('/login');
        }
    }
}
</script>

<style lang="scss">

header {
    .navbar {
        @apply flex items-center justify-between px-6 py-4 bg-primary;
        &--logo {
            img {
                height: 24px;
            }
        }
            &--routes {
                @apply grid gap-y-1;
                &__item {
                    @apply text-white px-2 py-1 text-sm text-right transition-all duration-300 ease-in-out rounded-lg;

                    &.router-link-exact-active,
                    &:hover {
                        @apply bg-primary-dark shadow;
                    }
                }
                &__logout {
                    @apply cursor-pointer;
                    border: none;
                    background: transparent;
                    &:hover {
                        @apply bg-primary-dark shadow;
                    }
                }
        }
    }
}

@screen lg {
    header {
        .navbar {
            @apply flex items-center justify-start px-8 py-6 gap-x-14;
            &--logo {
                img {
                    height: 32px;
                }
            }
            &--routes {
                @apply flex gap-x-1;
                &__item {
                    @apply text-base px-2 py-2;
                }
                &__logout {
                    @apply cursor-pointer;
                    border: none;
                    background: transparent;
                }
            }
        }
    }

}

</style>