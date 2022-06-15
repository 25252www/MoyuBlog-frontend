<template>
  <div class="layout">
    <div class="header-container">
      <Header/>
    </div>
    <AppMain/>
  </div>
</template>


<script>
import Header from "./components/Header";
import AppMain from "./components/AppMain";

export default {
  name: "Layout",
  components: {
    AppMain,
    Header
  }
}
</script>

<style scoped>

.header-container {
  width: 100%;
}


</style>
