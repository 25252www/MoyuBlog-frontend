<template>
  <div class="blog">
    <el-skeleton :loading="loading" animated>
      <template #template>
        <div class="skeleton-container">
          <el-skeleton class="loading-skeleton" :rows="20" animated/>
        </div>
      </template>
      <template #default>
        <p class="blog-title">{{ blog.title }}</p>
        <p class="blog-createTime-hits" v-if="blog.createTime">📅{{ blog.createTime }} 🔍{{ blog.hits }}</p>
        <div class="markdown-body">
          <v-md-editor class="markdown-body" :model-value="blog.content" mode="preview"></v-md-editor>
        </div>
      </template>
    </el-skeleton>
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
      loading: true,
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
        this.loading = false
      })
    },
  }
}
</script>

<style lang="scss" scoped>

.skeleton-container {
  align-items: center;
  margin: auto;
  padding: 0 2%;

  .loading-skeleton {
    padding-top: 20px;
  }
}

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

.blog-createTime-hits {
  text-align: center;
  font-size: 14px;
  color: #555555;
}

</style>
