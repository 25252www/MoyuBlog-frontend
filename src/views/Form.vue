<template>
  <div class="form">
    <h1 class="title">Blog List</h1>
    <el-row class="line-display">
      <el-col :span="22" :offset="1">
        <el-button type="primary" @click="addBlog">写博客</el-button>
        <el-table
            class="el-table-tableData"
            :data="tableData"
            stripe
            style="width: 100%">

          <el-table-column
              prop="id"
              label="ID"
          >
          </el-table-column>
          <el-table-column
              prop="title"
              label="标题"
          >
          </el-table-column>
          <el-table-column
              prop="hits"
              label="点击量"
          >
          </el-table-column>
          <el-table-column
              prop="date"
              label="发布时间"
          >
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                  @click="handleEdit(scope.$index, scope.row)">Edit
              </el-button>
              <el-popconfirm title="确定要删除吗?" @confirm="handleDelete(scope.$index, scope.row)">
                <template #reference>
                  <el-button
                      type="danger"
                  >Delete
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {deleteBlogById, getBlogList} from "../api/blog";

export default {
  name: "Form",
  data() {
    return {
      tableData: [],
    }
  },
  //VUE生命周期钩子
  created() {
    this.getTableData()
  },
  //VUE实例里的方法
  methods: {
    getTableData() {
      getBlogList().then(res => {
        this.tableData = res.data.data
      })
    },
    handleEdit(index, row) {
      this.$router.push('/blogs/edit/' + row.id)
    },
    handleDelete(index, row) {
      deleteBlogById(row.id).then(() => {
        this.getTableData()
      })
    },
    addBlog() {
      this.$router.push('/blogs/add')
    }
  }
}
</script>

<style scoped>
.title{
  text-align: center;
  margin-top: 70px;
}

</style>
