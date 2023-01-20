<template>
  <div class="layout">
    <Header/>
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

.layout {
  height: 100%;
}


</style>
