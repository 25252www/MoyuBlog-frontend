<template>
  <div class="home">
    <el-container class="container">
      <el-aside width="16vw">
        <Sidebar></Sidebar>
      </el-aside>
      <el-main>
        <AppMain class = "container"></AppMain>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import AppMain from "@/components/AppMain";
import Sidebar from "@/components/Sidebar";

export default {
  name: "Home",
  components: {
    AppMain, Sidebar
  }
}
</script>

<style scoped>
.home{
  max-height:100vh;
  /*cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/pointer.cur),auto;*/
}
.container{
  max-height: 100%;
}

</style>
