<template>
  <div class="layout">
    <CustomMenu v-if="showMenu" />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <CustomFooter v-if="showMenu" />
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import CustomMenu from './components/CustomMenu'
import CustomFooter from './components/CustomFooter'

export default {
  name: 'App',
  components: {
    CustomMenu,
    CustomFooter,
  },
  computed: {
    ...mapGetters(['loading']),
    showMenu() {
      return this.$route.path !== '/login';
    }
  }
}
</script>

<style lang="scss">
.layout {
  @apply grid min-h-screen;
  grid-template-rows: auto 1fr auto;
}
</style>
