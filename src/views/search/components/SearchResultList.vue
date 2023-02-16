<template>
  <div class="block" v-for="blog in searchResults" :key="blog">
    <p class="blog-title-box">
      <router-link class="blog-title-link" :to="'/blogs/'+ blog.id">
        <span class="blog-title" v-html="blog.title"></span>
      </router-link>
    </p>
    <p class="blog-createTime-hits">📅{{ blog.create_time.substring(0, 10) }} 🔍{{ blog.hits }}</p>
    <p class="blog-content" v-html="blog.content"></p>
  </div>
</template>

<script>
import {searchBlog} from "../../../api/search";

export default {
  name: "SearchResultList",
  data() {
    return {
      searchResults: []
    }
  },
  created() {
    // 从路由中获取中文keyword
    const keyword = this.$route.params.keyword
    this.searchBlog(keyword)
  },
  methods: {
    searchBlog(keyword) {
      searchBlog(keyword).then(res => {
        this.searchResults = res.data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  margin: auto;
}

.blog-title-box {
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

.blog-createTime-hits {
  text-align: center;
  font-size: 14px;
  color: #555555;
}

.blog-content {
  margin: 0 5%;
  padding: 2% 5%;
}

</style>
