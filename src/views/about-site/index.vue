<template>
  <div class="about-site">
    <el-row>
      <el-col class="sidebar-container" :span="6">
        <Sidebar/>
      </el-col>
      <el-col :span="16" :xs="{span: 24}">
        <div class="blog-container">
          <Blog :blogId="2"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Blog from "../../components/Blog";
import Sidebar from "../../components/index/Sidebar";

export default {
  name: "Aboutsite",
  components: {Sidebar, Blog}
}
</script>

<style lang="scss" scoped>
.blog-container {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  box-sizing: border-box;
  margin: 60px auto 0 auto;
  padding: 0 2%;
}

@media only screen and (max-width: 768px) {
  .sidebar-container {
    display: none;
  }
}
</style>
