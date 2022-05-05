<template>
  <div class="blog-list">
    <div class="block" v-for="blog in blogs" :key="blog">
      <p class="blog-title">
        <el-link class="blog-title-link" :underline="false" :href="'/blogs/'+ blog.id">
          {{ blog.title }}
        </el-link>
      </p>
      <p class="blog-date-hits" v-if="blog.date">📅{{ blog.date }} 🔍{{ blog.hits }}</p>
      <div class="markdown-body" v-html="blog.description"/>
    </div>
    <el-pagination class="mpage"
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
import "star-markdown-css";

export default {
  name: "BlogList",
  data() {
    return {
      blogs: {},
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
      const _this = this
      _this.axios.get("/blogs?currentPage=" + current).then(res => {
        _this.blogs = res.data.data.records
        _this.current = res.data.data.current
        _this.total = res.data.data.total
        _this.size = res.data.data.size
        const MarkdownIt = require("markdown-it");
        const md = new MarkdownIt();
        for (let i = 0; i < this.blogs.length; i++) {
          const result = md.render(this.blogs[i].description);
          this.blogs[i].description = result
        }
      }).catch(function (error) {
        console.log(error);
      });
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
  /*cursor: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn/css/md-cursors/link.cur),pointer;*/
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
  margin: 0% 5%;
  padding: 2% 5%;
}

.mpage {
  margin-top: 10px;
  text-align: center;
}

::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #0078E7;
  color: #FFF;
}

</style>
