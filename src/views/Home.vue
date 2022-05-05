<template>
  <div class="home">
    <div class="header-container">
      <Header/>
    </div>
    <el-row>
      <el-col class="sidebar-container" :span="4" :offset="2">
        <Sidebar/>
      </el-col>
      <el-col class="appmain-container" :span="16" :xs="{span: 20, offset: 2}">
        <AppMain/>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import AppMain from "../components/AppMain";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default {
  name: "Home",
  components: {
    AppMain, Sidebar, Header
  }
}
</script>

<style scoped>

.header-container {
  width: 100%;
}

/*sidebar的响应式布局，当小于768px时隐藏，与.appmain-container对应*/
@media all and (max-width: 768px) {
  .sidebar-container {
    display: none;
  }
}


</style>
