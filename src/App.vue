<template>
  <div class="layout">
    <CustomMenu />
    <router-view />
    <CustomFooter />
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
        ...mapGetters(['loading'])
    }
}
</script>

<style lang="scss">
.layout {
  @apply grid min-h-screen;
  grid-template-rows: auto 1fr auto;
}
</style>
