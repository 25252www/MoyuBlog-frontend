<template>
  <el-row>
    <el-col class="sidebar-container hidden-xs-only" :span="6">
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

<style scoped>

</style>
