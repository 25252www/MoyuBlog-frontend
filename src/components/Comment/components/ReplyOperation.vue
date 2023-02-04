<template>
  <div class="reply-operation">
    <el-dropdown :hide-on-click="false" placement="bottom-end">
      <i class="svg-icon operation use-color operation-icon" style="width: 16px; height: 16px;">
        <svg t="1636097794549" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="5713">
          <path
              d="M586.624 234.624a74.624 74.624 0 1 1-149.184 0 74.624 74.624 0 0 1 149.12 0z m0 554.624a74.624 74.624 0 1 1-149.248 0 74.624 74.624 0 0 1 149.248 0zM512 586.624a74.624 74.624 0 1 0 0-149.248 74.624 74.624 0 0 0 0 149.248z"
              p-id="5714" fill="#9499a0"></path>
        </svg>
      </i>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="visible = true">
            <el-popover
                placement="top-end"
                trigger="click"
                :width="300"
                :visible="visible"

            >
              <div class="delete-reply-modal">
                <p>删除评论后，评论下所有回复都会被删除</p>
                <p>是否继续?</p>
                <div class="delete-reply-btn">
                  <el-button size="small" type="primary" @click="confirmDelete">确认</el-button>
                  <el-button size="small" @click="visible = false">取消</el-button>
                </div>
              </div>
              <template #reference>
                <span>删除</span>
              </template>
            </el-popover>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import {ElNotification} from "element-plus";
import {deleteReplyById} from "../../../api/reply";

export default {
  name: "ReplyOperation",
  props: {
    replyId: Number
  },
  inject: ['blogId', 'getRepliesByBlogId'],
  data() {
    return {
      visible: false
    }
  },
  methods: {
    confirmDelete() {
      deleteReplyById(this.replyId).then(() => {
        this.visible = false
        ElNotification({
          message: "删除成功",
          type: 'info'
        })
        this.getRepliesByBlogId(this.blogId)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.reply-operation {
  display: inline-flex;
  position: relative;
}

.operation-icon {
  color: #9499a0;
  cursor: pointer;
  font-style: normal;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: #00aeec;
  }
}

.delete-reply-modal {
  text-align: center;
}


</style>
