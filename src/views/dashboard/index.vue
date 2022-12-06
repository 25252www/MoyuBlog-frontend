<template>
  <el-row>
    <el-col class="sidebar-container" :span="4" :offset="2">
      <Sidebar/>
    </el-col>
    <el-col :span="16" :xs="{span: 20, offset: 2}">
      <BlogList/>
    </el-col>
  </el-row>
</template>

<script>
import Sidebar from "../Sidebar";
import BlogList from "../BlogList";

export default {
  name: "index",
  components: {BlogList, Sidebar}
}
</script>

<style scoped>

/*sidebar的响应式布局，当小于768px时隐藏，与.appmain-container对应*/
@media all and (max-width: 768px) {
  .sidebar-container {
    display: none;
  }
}

</style>