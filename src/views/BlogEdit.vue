<template>
  <div>
    <div class="m-content">
      <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>

        <el-form-item label="摘要" prop="description">
          <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <v-md-editor v-model="ruleForm.content" height="400px"></v-md-editor>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {ElMessageBox} from 'element-plus'

export default {
  name: "BlogEdit",
  data() {
    return {
      ruleForm: {
        id: '',
        title: '',
        description: '',
        content: ''
      },
      rules: {
        title: [
          {required: true, message: '请输入标题', trigger: 'blur'},
        ],
        description: [
          {required: true, message: '请输入摘要', trigger: 'blur'}
        ],
        content: [
          {required: true, message: '请输入内容', trigger: 'blur'}
        ]
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          this.axios.post('/blogs/edit', this.ruleForm, {
            headers: {
              "Authorization": localStorage.getItem("token")
            }
          }).then(res => {
            console.log(res)
            ElMessageBox.alert('操作成功', '提示', {
              confirmButtonText: '确定',
              callback: () => {
                _this.$router.push("/")
              },
            })
          });
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
  created() {
    const blogId = this.$route.params.blogId
    console.log(blogId)
    const _this = this
    if (blogId) {
      this.axios.get('/blogs/' + blogId).then(res => {
        const blog = res.data.data
        _this.ruleForm.id = blog.id
        _this.ruleForm.title = blog.title
        _this.ruleForm.description = blog.description
        _this.ruleForm.content = blog.content
      })
    }
  }
}
</script>

<style scoped>

</style>