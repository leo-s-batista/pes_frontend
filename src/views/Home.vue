<template>
  <section class="home">

    <div class="home--title">
      <span>SIGAXS</span> -  Sistema de Gerenciamento de Auxílio Social
    </div>

    <ul class="home--infos">
      <li>9332222541 - Juan Silva Gonçalves de Souza</li>
      <li>9332323844 - Leonardo de Souza Batista</li>
    </ul>

    <a href="/general/ers.pdf" target="_blank" class="home--ers">
      <font-awesome-icon icon="file-pdf" />
      <span>ERS</span>
    </a>

  </section>
</template>

<script>

export default {
  name: 'home'
}
</script>

<style lang="scss">

.home {
  @apply grid gap-y-6 px-6 content-start pt-8;

  &--title {
    @apply flex items-center gap-x-1 text-xl;
    span {
      @apply font-bold;
    }
  }
  &--infos {
    li {
      @apply text-sm;
    }
  }

  &--ers {
    @apply flex items-center gap-x-1 text-blue-500;
  }

}

</style>