<template>
  <div class="app-main">
    <BlogList></BlogList>
  </div>
</template>

<script>
import BlogList from "@/views/BlogList";

export default {
  name: "AppMain",
  components:{
    BlogList
  }
}
</script>

<style scoped>
.app-main{
  margin-top: 55px;
}
</style>
