<template>
  <div class="blog-list">
    <el-skeleton :loading="loading" animated>
      <template #template>
        <div class="block" v-for="index of 7" :key="index">
          <div class="skeleton-container">
          <el-skeleton class="loading-skeleton" :rows="4" animated/>
          </div>
        </div>
      </template>
      <template #default>
        <div class="block" v-for="blog in blogs" :key="blog">
          <p class="blog-title">
            <router-link class="blog-title-link" :to="'/blogs/'+ blog.id">
              {{ blog.title }}
            </router-link>
          </p>
          <p class="blog-createTime-hits" v-if="blog.createTime">📅{{ blog.createTime }} 🔍{{ blog.hits }}</p>
          <div class="markdown-body" v-html="blog.description"/>
        </div>
        <el-pagination id="blog-list-pagination"
                       background
                       layout="prev, pager, next"
                       :current-page="current"
                       :page-size="size"
                       :total="total"
                       @current-change="page"

        >
        </el-pagination>
      </template>
    </el-skeleton>
  </div>
</template>

<script>

import {getCurrentPage} from "../../../api/blog";

export default {
  name: "BlogList",
  data() {
    return {
      loading: true,
      blogs: [],
      current: 1,
      total: 0,
      size: 7
    }
  },
  created() {
    this.page(1)
  },
  methods: {
    page(current) {
      getCurrentPage(current).then(res => {
        this.current = res.data.data.current
        this.total = res.data.data.total
        this.size = res.data.data.size
        this.blogs = res.data.data.records
        const MarkdownIt = require("markdown-it");
        const md = new MarkdownIt();
        for (let i = 0; i < this.blogs.length; i++) {
          this.blogs[i].description = md.render(this.blogs[i].description)
        }
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.blog-list {
  height: 100%;
  overflow: auto;
  margin: 0 auto;
  padding: 0 2%;

  .skeleton-container {
    align-items: center;
    margin: auto;
    width: 80%;

    .loading-skeleton {
      margin-top: 10px;
      padding-top: 10px;
      padding-bottom: 7px;
    }
  }

}

.block {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  margin: auto;
}

.blog-title {
  text-align: center;
}

.blog-title-link {
  margin: 0;
  padding: 10px;
  font-size: 1.5rem;
  font-weight: 900;
  font-family: 'Songti SC', 'Noto Serif SC', STZhongsong, STKaiti, KaiTi, Roboto, serif;
  color: #0078E7;
  text-decoration: none;
  transition: color .1s;
}

.blog-title-link:hover {
  color: #CC0000;
}

.blog-createTime-hits {
  text-align: center;
  font-size: 14px;
  color: #555555;
}

.markdown-body {
  margin: 0 5%;
  padding: 2% 5%;
}

#blog-list-pagination {
  margin-top: 10px;
  justify-content: center;
}


</style>
