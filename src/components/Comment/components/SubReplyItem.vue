<template>
  <div class="sub-reply-item">
    <div class="sub-user-info">
      <div class="sub-reply-avatar">
        <div class="avatar">
          <el-avatar v-if="model.avatar" :size="30" :src="model.avatar"/>
          <img v-else style="height: 30px" src="https://cdn.moyusoldier.cn/avatar.svg"/>
        </div>
      </div>
      <div class="sub-user-name">
        {{ model.username }}
      </div>
    </div>
    <span class="reply-content-container">
      <span class="reply-content" v-if="model.parentId === model.rootId">
        {{ model.content }}
      </span>
      <span v-else>
        回复
        <span class="reply-to">{{ ' @' + model.parentUsername }}</span>
        {{ ' : ' + model.content }}
      </span>
    </span>
    <div class="sub-reply-info">
      <span class="sub-reply-time">{{ model.createTime.slice(0, 16) }}</span>
      <span class="sub-reply-btn" @click="$emit('setReplyTo', model)">回复</span>
      <div v-if="this.roles.includes('admin') || this.model.userId === this.userId" class="sub-reply-operation-warp">
        <ReplyOperation :reply-id="model.id"/>
      </div>
    </div>
  </div>

</template>

<script>
import {mapGetters} from "vuex";
import ReplyOperation from "./ReplyOperation";


export default {
  name: "SubReplyItem",
  components: {ReplyOperation},
  props: {
    model: Object
  },
  computed: {
    ...mapGetters([
      'token',
      'roles',
      'userId'
    ])
  },
  emits: ['setReplyTo']
}
</script>

<style lang="scss" scoped>

.sub-reply-item {
  @media screen and (max-width: 1681px) {
    font-size: 15px;
    line-height: 24px;
  }
  @media screen and (min-width: 1681px) {
    font-size: 16px;
    line-height: 26px;
  }
  position: relative;
  padding: 8px 0 8px 42px; // 左边的内间距为头像宽度+10px + 8px
  border-radius: 4px;

  .sub-user-info {
    display: inline-flex;
    align-items: center;

    margin-right: 9px; // inline-flex中img的宽度会有点问题,设置margin时需要手动再加一点
    line-height: 12px; // 如果想要居中,这里的行高需要和内容行高一致
    vertical-align: baseline;
    white-space: nowrap;

    .sub-reply-avatar {
      position: absolute;
      left: 8px;
      cursor: pointer;
    }

    .sub-user-name {
      @media screen and (max-width: 1681px) {
        font-size: 13px;
        line-height: 24px;
      }
      @media screen and (min-width: 1681px) {
        font-size: 14px;
        line-height: 26px;
      }
      margin-right: 5px;
      color: #0078E7;
      cursor: pointer;
    }
  }

  .sub-reply-info {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 2px;
    font-size: 13px;
    color: #9499A0;

    .sub-reply-time {
      margin-right: 20px;
    }

    .sub-reply-btn {
      cursor: pointer;

      &:hover {
        color: #0078E7;
      }
    }

    .sub-reply-operation-warp {
      position: absolute;
      right: 20px;
      height: 100%;
    }
  }
}

.reply-to {
  @media screen and (max-width: 1681px) {
    font-size: 13px;
    line-height: 24px;
  }
  @media screen and (min-width: 1681px) {
    font-size: 14px;
    line-height: 26px;
  }
  margin-right: 5px;
  color: #0078E7;
  cursor: pointer;
}

</style>
