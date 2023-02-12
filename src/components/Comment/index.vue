<template>
  <div class="comment">
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
</template>

<script>
import {getRepliesByBlogId} from "../../api/reply";
import ReplyBox from "./components/ReplyBox";
import ReplyItem from "./components/ReplyItem";


export default {
  name: "Comment",
  components: {ReplyItem, ReplyBox},
  props: {
    blogId: {
      type: [String, Number],
      required: true
    }
  },
  provide() {
    return {
      blogId: this.blogId,
      getRepliesByBlogId: this.getRepliesByBlogId,
    }
  },
  data() {
    return {
      replies: []
    }
  },
  created() {
    this.getRepliesByBlogId(this.blogId)
  },
  methods: {
    getRepliesByBlogId(id) {
      getRepliesByBlogId(id).then(res => {
        this.replies = res.data.data.replies
      })
    }
  },
}
</script>

<style lang="scss" scoped>

.comment {
  margin-top: 20px;
  z-index: 0;
  position: relative;
  font-weight: 400;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;
}

.reply-navigation{
  margin-bottom: 22px;
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
