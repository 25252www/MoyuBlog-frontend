<template>
  <div class="blog">
    <p class="blog-title">{{ blog.title }}</p>
    <p class="blog-date-hits" v-if="blog.date">📅{{ blog.date.substr(0, 10) }} 🔍{{ blog.hits }}</p>
    <div class="markdown-body">
      <v-md-editor class="markdown-body" :model-value="blog.content" mode="preview"></v-md-editor>
    </div>
    <el-divider />
    <div id="comment">
      <div class="comment-container">
        <div class="reply-header">
          <div class="reply-navigation">
            <span class="nav-title-text">评论</span>
            <span class="total-reply">{{replies.length}}</span>
          </div>
        </div>
        <div class="reply-warp">
          <div class="main-reply-box">
            <ReplyBox :model="null"/>
          </div>
          <div class="reply-list">
            <ReplyItem v-for="(reply, index) in replies" :key="index" :model="reply"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getBlogById, getReplyByBlogId} from "../../api/blog";
import ReplyBox from "./components/ReplyBox";
import ReplyItem from "./components/ReplyItem";

export default {
  name: "Blog",
  components: {ReplyItem, ReplyBox},
  data() {
    return {
      blog: {},
      replies: []
    }
  },
  provide() {
    return {
      getReplyByBlogId: this.getReplyByBlogId
    }
  },
  methods: {
    getBlogById(id) {
      getBlogById(id).then(res => {
        this.blog = res.data.data
      })
    },
    getReplyByBlogId(id) {
      getReplyByBlogId(id).then(res => {
        this.replies = res.data.data.replies
      })
    }
  },
  created() {
    const blogId = this.$route.params.id;
    this.getBlogById(blogId)
    this.getReplyByBlogId(blogId)
  }
}


</script>

<style lang="scss" scoped>

.blog {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 60px auto 0 auto;
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

#comment {
  margin-top: 20px;
  z-index: 0;
  position: relative;
  font-weight: 400;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

.reply-navigation{
  margin-bottom: 22px;
  font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;
  display: flex;
  align-items: center;

  > .nav-title-text{
    color: #18191C;
    font-weight: 500;
    font-size: 24px;
  }

  > .total-reply{
    font-size: 14px;
    margin: 0 36px 0 6px;
    font-weight: normal;
    color: #9499A0;
  }
}

.reply-list{
  margin-top: 14px;
  padding-bottom: 100px;
}


</style>
