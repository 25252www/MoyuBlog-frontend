<template>
  <div>
    <el-container>
      <el-header>
        <img class="mlogo" src="http://cdn.moyusoldier.cloud/icons8-whale-48.png">
      </el-header>
      <el-main>
        <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="120px"
            class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
            >登录
            </el-button
            >
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>

</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: 'moyu',
        password:'lxy200131'
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
          const _this=this
          this.axios.post('/login',this.ruleForm).then(res=>{
            const jwt = res.headers['authorization']
            const userInfo = res.data.data
            // 把数据共享出去
            _this.$store.commit("SET_TOKEN", jwt)
            _this.$store.commit("SET_USERINFO", userInfo)
            //如果成功则跳转
            _this.$router.push("/")
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  }
}
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #0078E7;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #0078E7;
  text-align: center;
  line-height: 200px;
}

.el-main {
  /*background-color: #e9eef3;*/
  color: #0078E7;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.mlogo {
  height: 100%;
}

.demo-ruleForm{
  max-width: 500px;
  margin: 0 auto ;
}
</style>