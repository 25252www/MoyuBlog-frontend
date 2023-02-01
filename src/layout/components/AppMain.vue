<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <keep-alive :include="['Dashboard']">
        <component :is="Component" :key="key"/>
      </keep-alive>
    </router-view>
  </section>
</template>

<script>

export default {
  name: "AppMain",
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  margin-top: 55px;
  height: 100%;
}
</style>
