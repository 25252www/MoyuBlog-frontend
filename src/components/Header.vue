<template>
  <div class="header">
    <div class="divider">
      <el-link :underline=false :href="'/home'">🏠首页</el-link>
      <el-divider direction="vertical"></el-divider>
      <el-link :underline=false>🏷️分类</el-link>
      <el-divider direction="vertical"></el-divider>
      <el-link :underline=false :href="'/login'">❤️登录</el-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
.header {
  position: fixed;
  background-color: #ffffff;
  top: 0;
  margin: 0 auto;
  padding: 0% 2%;
}
.divider{
  display: flex;
}


</style>