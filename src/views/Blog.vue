<template>
  <div class="blog">
    <span class="go-home" title="回到首页"><el-link :underline=false :href="'/'">🏠</el-link></span>
    <p class="blog-title">{{ blog.title }}</p>
    <p class="blog-date-hits" v-if="blog.date">📅{{ blog.date.substr(0, 10) }} 🔍{{ blog.hits }}</p>
    <!--    <div class="markdown-body" v-html="blog.content"/>-->
    <div class="markdown-body">
      <v-md-editor class="markdown-body" v-model="blog.content" mode="preview"></v-md-editor>
    </div>
  </div>
</template>

<script>
// import 'star-markdown-css'

export default {
  name: "Blog",
  data() {
    return {
      blog: {}
    }
  },
  created() {
    const blogId = this.$route.params.id;
    this.axios.get('/blogs/' + blogId).then(res => {
      this.blog = res.data.data;
      // const MarkdownIt = require("markdown-it");
      // const md = new MarkdownIt();
      // const result = md.render(this.blog.content);
      // this.blog.content = result;
    })
  }
}


</script>

<style scoped>
.blog {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 0% 2%;
}

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 0% 2%;
}

.blog-title {
  text-align: center;
  margin: 0;
  padding: 10px;
  font-size: 1.5rem;
  font-weight: 900;
  font-family: 'Songti SC', 'Noto Serif SC', STZhongsong, STKaiti, KaiTi, Roboto, serif;
}

.blog-date-hits {
  text-align: center;
  font-size: 14px;
  color: #555555;
}

.go-home {
  position: fixed;
}

</style>
