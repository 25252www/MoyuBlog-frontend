<template>
  <div class="blog-list">
    <div class="block" v-for="blog in blogs" :key="blog">
      <p class="blog-title">
        <router-link class="blog-title-link" :to="'/blogs/'+ blog.id">
          {{ blog.title }}
        </router-link>
      </p>
      <p class="blog-date-hits" v-if="blog.date">📅{{ blog.date }} 🔍{{ blog.hits }}</p>
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
  </div>
</template>

<script>

import {getCurrentPage} from "../../../api/blog";

export default {
  name: "BlogList",
  data() {
    return {
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
        // 根据id删除不想展示的博客 54-关于我 55-关于站点
        for (let i = 0; i < res.data.data.records.length; i++) {
          if (res.data.data.records[i].id === 54 || res.data.data.records[i].id === 55) {
            this.size--
            continue
          }
          this.blogs.push(res.data.data.records[i])
        }
        const MarkdownIt = require("markdown-it");
        const md = new MarkdownIt();
        for (let i = 0; i < this.blogs.length; i++) {
          const result = md.render(this.blogs[i].description);
          this.blogs[i].description = result
        }
      })
    }
  }
}
</script>

<style scoped>
.blog-list {
  height: 100%;
  overflow: auto;
  margin: 0 auto;
  padding: 0% 2%;
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

.blog-date-hits {
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
