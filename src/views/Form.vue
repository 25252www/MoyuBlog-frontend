<template>
  <Header/>
  <div class="form">
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
              :formatter="dateFormat"
              label="发布时间"
          >
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">Edit
              </el-button>
              <el-popconfirm title="确定要删除吗?" @confirm="handleDelete(scope.$index, scope.row)">
                <template #reference>
                  <el-button
                      size="mini"
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
import moment from "moment";
import Header from "../components/Header";

export default {
  name: "Form",
  components: {Header},
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
      this.axios.get('/blogs/all').then(res => {
        this.tableData = res.data.data
      }).catch(function (error) {
        console.log(error);
      });
    },
    //时间格式化
    dateFormat: function (row, column) {
      const date = row[column.property];
      if (date === undefined) {
        return ''
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss")
    },
    handleEdit(index, row) {
      console.log(index, row)
      this.$router.push('/blogs/edit/' + row.id)
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.axios.get('/blogs/delete/' + row.id).then(() => {
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
.form {
  margin-top: 100px;
}

</style>