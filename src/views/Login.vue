<template>
  <Header/>
  <div class="login-container">
    <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="login-el-form"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>

      <el-form-item class="el-form-item">
        <el-button class="login-button" type="primary" @click="submitForm('ruleForm')"
        >登录
        </el-button
        >
        <el-button @click="register('ruleForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import Header from "../components/Header";
import {ElNotification} from "element-plus";

export default {
  name: "Login",
  components: {Header},
  data() {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          }
        ],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          this.axios.post('/login', this.ruleForm).then(res => {
            const jwt = res.headers['authorization']
            const userInfo = res.data.data
            // 把数据共享出去
            _this.$store.commit("SET_TOKEN", jwt)
            _this.$store.commit("SET_USERINFO", userInfo)
            // 如果成功则跳转
            if (this.$route.query.redirect) {
              this.$router.push(this.$route.query.redirect)
            } else {
              this.$router.push('/')
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    register() {
      // this.$refs[formName].resetFields()
      ElNotification({
        title: 'Info',
        message: '暂未开放注册',
        type: 'info',
      })
    },
  }
}
</script>

<style scoped>

.login-container {
  margin-top: 120px;
}

.login-el-form {
  max-width: 500px;
  margin: auto;
}

.el-form-item {
  text-align: center;
}

</style>