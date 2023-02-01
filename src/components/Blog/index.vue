<template>
  <div class="blog">
    <p class="blog-title">{{ blog.title }}</p>
    <p class="blog-date-hits" v-if="blog.date">📅{{ blog.date.substr(0, 10) }} 🔍{{ blog.hits }}</p>
    <div class="markdown-body">
      <v-md-editor class="markdown-body" :model-value="blog.content" mode="preview"></v-md-editor>
    </div>
  </div>
</template>

<script>
import {getBlogById} from "../../api/blog";

export default {
  name: "Blog",
  props: {
    blogId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      blog: {},
    }
  },
  created() {
    this.getBlogById(this.blogId)
  },
  methods: {
    getBlogById(id) {
      getBlogById(id).then(res => {
        this.blog = res.data.data
      })
    },
  }
}
</script>

<style scoped>

.markdown-body {
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0 2%;
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

</style>
