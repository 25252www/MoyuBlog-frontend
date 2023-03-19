<template>
  <el-row>
    <!--width<768时隐藏，平时为6 -->
    <el-col class="sidebar-container" :span="6">
      <Sidebar/>
    </el-col>
    <el-col :span="16" :xs="{span: 20, offset: 2}">
      <BlogList/>
    </el-col>
  </el-row>
</template>

<script>
import BlogList from "./components/BlogList";
import 'element-plus/theme-chalk/display.css'
import Sidebar from "../../components/index/Sidebar";

export default {
  name: "Dashboard",
  components: {Sidebar, BlogList}
}
</script>

<style lang="scss" scoped>

@media only screen and (max-width: 768px) {
  .sidebar-container {
    display: none;
  }
}
</style>
