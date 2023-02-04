<template>
  <div class="reply-item">
    <div class="root-reply-container">
      <div class="root-reply-avatar">
        <div class="avatar">
          <el-avatar v-if="model.avatar" :size="48" :src="model.avatar"/>
          <img v-else style="height: 48px" src="https://cdn.moyusoldier.cn/avatar.svg"/>
        </div>
      </div>
      <div class="content-warp">
        <div class="user-info">
          <div class="user-name">{{ model.username }}</div>
        </div>
        <div class="root-reply">
        <span class="reply-content-container">
          <span class="reply-content">{{ model.content }}</span>
        </span>
          <div class="reply-info">
            <span class="reply-time">{{ model.createTime.slice(0, 16) }}</span>
            <span class="reply-btn" @click="toggleReplyBox">回复</span>
            <div v-if="this.roles.includes('admin') || this.model.userId === this.userId" class="reply-operation-warp">
              <ReplyOperation :reply-id="model.id"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sub-reply-container">
      <div class="sub-reply-list">
        <SubReplyItem v-for="(reply, index) in model.children" :key="index" :model="reply" @setReplyTo="setReplyTo"/>
      </div>
    </div>
    <div v-if="showReplyBox" class="reply-box-container">
      <ReplyBox :model="replyTo"/>
    </div>
    <div class="bottom-line"/>
  </div>
</template>

<script>
import SubReplyItem from "./SubReplyItem";
import ReplyBox from "./ReplyBox";
import {mapGetters} from "vuex";
import ReplyOperation from "./ReplyOperation";

export default {
  name: "ReplyItem",
  components: {ReplyOperation, ReplyBox, SubReplyItem},
  props: {
    model: Object,
  },
  computed: {
    ...mapGetters([
      'token',
      'roles',
      'userId'
    ])
  },
  data() {
    return {
      replyTo: this.model,
      showReplyBox: false,
    }
  },
  methods: {
    setReplyTo(reply) {
      if (!this.token) {
        this.$router.push('/login')
        return
      }
      if (!this.showReplyBox) {
        this.showReplyBox = true
      }
      this.replyTo = reply
    },
    toggleReplyBox() {
      if (!this.token) {
        this.$router.push('/login')
        return
      }
      this.showReplyBox = !this.showReplyBox
      this.replyTo = this.model
    }
  },
}
</script>

<style lang="scss" scoped>
.reply-item {
  position: relative;

  .root-reply-container {
    padding: 22px 0 0 80px;

    .root-reply-avatar {
      display: flex;
      justify-content: center;
      position: absolute;
      left: 0;
      width: 80px;
      cursor: pointer;
    }

    .content-warp {
      flex: 1;
      position: relative;

      .user-info {
        @media screen and (max-width: 1681px) {
          font-size: 13px;
        }
        @media screen and (min-width: 1681px) {
          font-size: 14px;
        }
        display: flex;
        align-items: center;
        margin-bottom: 4px;

        .user-name {
          font-weight: 500;
          margin-right: 5px;
          color: #0078E7;
          cursor: pointer;
        }
      }

      .root-reply {
        @media screen and (max-width: 1681px) {
          font-size: 15px;
          line-height: 24px;
        }
        @media screen and (min-width: 1681px) {
          font-size: 16px;
          line-height: 26px;
        }

        position: relative;
        padding: 2px 0;

        .reply-info {
          display: flex;
          align-items: center;
          position: relative;
          margin-top: 2px;
          font-size: 13px;
          color: #9499A0;

          .reply-time {
            margin-right: 20px;
          }

          .reply-btn {
            cursor: pointer;

            &:hover {
              color: #0078E7;
            }
          }

          .reply-operation-warp {
            position: absolute;
            right: 20px;
            height: 100%;
          }
        }
      }
    }
  }

  .bottom-line {
    margin-left: 80px;
    border-bottom: 1px solid #E3E5E7;
    margin-top: 14px;
  }

  .sub-reply-container {
    padding-left: calc(80px - 8px);
  }

  .reply-box-container {
    padding: 25px 0 10px 80px;
  }
}

</style>
