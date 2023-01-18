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
          <v-md-editor v-model="ruleForm.description" height="200px"></v-md-editor>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <v-md-editor v-model="ruleForm.content" height="800px"></v-md-editor>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm">重置</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {ElMessageBox} from 'element-plus'
import {editBlog, getBlogById} from "../api/blog";

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
    fetchData() {
      const blogId = this.$route.params.blogId
      if (blogId) {
        getBlogById(blogId).then(res => {
          const blog = res.data.data
          this.ruleForm.id = blog.id
          this.ruleForm.title = blog.title
          this.ruleForm.description = blog.description
          this.ruleForm.content = blog.content
        })
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editBlog(this.ruleForm).then(() => {
            ElMessageBox.alert('操作成功', '提示', {
              confirmButtonText: '确定',
              callback: () => {
                this.$router.push("/form")
              },
            })
          });
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.fetchData()
    },
    cancel() {
      this.$router.push('/form')
    }
  },
  created() {
    this.fetchData()
  }
}
</script>

<style scoped>

</style>
