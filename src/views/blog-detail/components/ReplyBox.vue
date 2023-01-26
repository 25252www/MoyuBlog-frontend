<template>
  <div v-if="token" class="reply-box">
    <div class="box-normal">
      <div class="reply-box-avatar">
        <div class="moyu-avatar" style="width: 48px; height: 49px">
          <el-avatar v-if="avatar" :size="48" :src="avatar"/>
          <img v-else style="height: 48px" src="https://cdn.moyusoldier.cn/avatar.svg"/>
        </div>
      </div>
      <div class="reply-box-warp">
        <el-input class="reply-box-textarea" v-model="input" :placeholder="model?'回复 @'+ model.username:'发一条友善的评论'"/>

      </div>
      <div class="reply-box-send">
        <div class="send-text" @click="sendReply">发布</div>
      </div>
    </div>
  </div>
  <div v-else class="reply-box disabled">
    <div class="box-normal">
      <div class="reply-box-avatar">
        <div class="moyu-avatar" style="width: 48px; height: 49px">
          <el-avatar v-if="avatar" :size="48" :src="avatar"/>
          <img v-else style="height: 48px" src="https://cdn.moyusoldier.cn/avatar.svg"/>
        </div>
      </div>
      <div class="reply-box-warp">
        <el-input class="reply-box-textarea" v-model="input" :placeholder="model?'回复 @'+ model.username:'发一条友善的评论'"/>
        <div class="disable-mask" data-v-11f17fb2="">
          <div class="no-login-mask">
            <span>请先</span>
            <span class="login-btn" @click="this.$router.push('/login')">登录</span>
            <span>后发表评论 (・ω・)</span>
          </div>
        </div>
      </div>
      <div class="reply-box-send">
        <span class="send-text" @click="sendReply">发布</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {sendReply} from "../../../api/blog";
import {ElNotification} from "element-plus";

export default {
  name: "ReplyBox",
  computed: {
    ...mapGetters([
      'token',
      'id',
      'avatar',
    ])
  },
  props: {
    model: Object
  },
  emits: ['sendReply'],
  inject: ['getReplyByBlogId'],
  data() {
    return {
      input: '',
    }
  },
  methods: {
    sendReply() {
      let reply = {}
      // 如果是一级评论
      if (this.model === null) {
        reply = {
          userId: this.id,
          blogId: this.$route.params.id,
          content: this.input
        }
      }
          // 如果是二级评论，两种情况
      // 1. 回复楼主
      else if (this.model.parentId === null) {
        reply = {
          parentId: this.model.id,
          parentUsername: this.model.username,
          rootId: this.model.id,
          userId: this.id,
          blogId: this.model.blogId,
          content: this.input,
        }
      }
      // 2. 回复评论者
      else {
        reply = {
          parentId: this.model.id,
          parentUsername: this.model.username,
          rootId: this.model.rootId,
          userId: this.id,
          blogId: this.model.blogId,
          content: this.input,
        }
      }
      sendReply(reply).then(res => {
        ElNotification({
          message: res.data.msg,
          type: 'info'
        })
        // 评论成功后，调用BlogDetail.vue中的方法刷新评论列表
        this.getReplyByBlogId(this.$route.params.id)
        // 清空输入框
        this.input = ''
      })
    },
  }
}
</script>

<style lang="scss" scoped>

.reply-box {
  display: flex;
  flex-direction: column;

  .box-normal {
    display: flex;
    height: 50px;
    transition: 0.2s;

    .reply-box-avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80px;
      height: 50px;
    }

    .reply-box-warp {
      position: relative;
      flex: 1;

      .reply-box-textarea {
        width: 100%;
        height: 100%;
        border-radius: 6px;
        background-color: #f1f2f3;
        font-family: inherit;
        line-height: 38px;
        color: #18191c;
        resize: none;
        outline: none;

        &::placeholder {
          color: #18191c;
        }

        &.focus,
        &:hover {
          background-color: #f1f2f3;
          border-color: #f1f2f3;
        }
      }
    }

    .reply-box-send {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      flex-basis: 70px;
      margin-left: 10px;
      border-radius: 4px;
      cursor: pointer;

      .send-text {
        position: absolute;
        z-index: 1;
        font-size: 16px;
        color: #ffffff;
      }

      &::after {
        content: '';
        position: absolute;
        opacity: .5;
        width: 100%;
        height: 100%;
        border-radius: 4px;
        background-color: #1890ff;
      }

      &:hover {
        &::after {
          opacity: 1;
        }
      }
    }
  }

  &.disabled {
    .box-normal {
      .reply-box-warp {
        .disable-mask {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          width: 100%;
          height: 100%;
          border-radius: 6px;
          font-size: 12px;
          color: #9499A0;
          background-color: #f1f2f3;

          .no-login-mask {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            cursor: pointer;


            .login-btn {
              padding: 4px 9px;
              margin: 0 3px;
              border-radius: 4px;
              color: #ffffff;
              background-color: #0078E7;

              &:hover {
                background-color: #3f95e0;
                cursor: pointer;
              }
            }
          }
        }
      }

      .reply-box-send {

        .send-text {
          color: #9499A0;
        }

        &::after {
          opacity: 1;
          background-color: #f1f2f3;
        }
      }

    }
  }
}


</style>
