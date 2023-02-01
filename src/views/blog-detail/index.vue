<template>
  <div class="blog-detail">
    <Blog :blogId="$route.params.id"/>
    <el-divider />
    <Comment :blogId="$route.params.id"/>
  </div>
</template>

<script>
import Blog from "../../components/Blog";
import Comment from "../../components/Comment";
export default {
  name: "Blogdetail",
  components: {Comment, Blog},
}
</script>

<style lang="scss" scoped>
.blog-detail {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 60px auto 0 auto;
  padding: 0 2%;
}

</style>
