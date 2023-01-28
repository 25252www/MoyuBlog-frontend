<template>
  <el-tabs v-model="activeName" id="login-register-el-tabs" :stretch=true>
    <el-tab-pane label="登录" name="login">
      <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          label-width="120px"
          id="login-el-form"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item id="login-button-el-form-item">
          <el-button id="login-button" @click="login('loginForm')" color="#0078E7">登录</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="注册" name="register">
      <el-form
          ref="registerForm"
          :model="registerForm"
          :rules="registerRules"
          label-width="120px"
          id="register-el-form"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="registerForm.confirmPassword"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="registerForm.phone"></el-input>
        </el-form-item>
        <el-form-item id="register-code-el-form-item" label="验证码" prop="code">
          <el-input v-model="registerForm.code"></el-input>
          <el-image :src="captchaImageUrl" @click="refreshCaptchaImage" id="captcha-image"></el-image>
        </el-form-item>
        <el-form-item id="register-button-el-form-item">
          <el-button id="register-button" @click="register('registerForm')" color="#0078E7">注册</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>

export default {
  name: "Login",
  data() {
    return {
      activeName: 'login',
      captchaImageUrl: 'https://www.moyusoldier.cn/api/user/captcha.jpg',
      loginForm: {
        username: null,
        password: null
      },
      loginRules: {
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
      registerForm: {
        username: null,
        password: null,
        confirmPassword: null,
        phone: null,
        code: null
      },
      registerRules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
          },
          {
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9-]{1,16}$/,
            message: '用户名只能由中文、英文、数字、下划线、减号组成，长度为1-16个字符',
            trigger: 'blur',
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/,
            message: '密码必须包含字母和数字，且长度不小于6位',
            trigger: 'blur',
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: '请再次输入密码',
            trigger: 'blur',
          },
          {
            validator: (rule, value, callback) => {
              if (value !== this.registerForm.password) {
                callback(new Error('两次输入密码不一致!'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ],
        phone: [
          {
            pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
            message: '请输入正确的手机号',
            trigger: 'blur',
          }
        ],
        code: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur',
          },
        ],
      }
    }
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/login', this.loginForm)
              .then(() => {
                this.$router.push({path: this.$route.query.redirect || '/'})
              })
        } else {
          return false
        }
      })
    },
    register(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 若为blank，转为null
          if (this.registerForm.phone !== null && this.registerForm.phone.trim() === '') {
            this.registerForm.phone = null
          }
          this.$store.dispatch('user/register', this.registerForm)
              .then(() => {
                this.$router.push({path: this.$route.query.redirect || '/'})
              })
              .catch(() => {
                this.refreshCaptchaImage()
              })
        } else {
          return false
        }
      })
    },
    refreshCaptchaImage() {
      this.captchaImageUrl = 'https://www.moyusoldier.cn/api/user/captcha.jpg?time=' + new Date().getTime()
    },
  },
  mounted() {
    this.refreshCaptchaImage()
  }
}
</script>

<style lang="scss" scoped>

#login-register-el-tabs {
  max-width: 500px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 10px;
  padding: 40px 20px 20px 20px;
  /*todo: 占满宽度时左右margin=10px，否则居中*/
  margin: 200px auto;
}

#login-el-form {
  margin-top: 18px;

  > .el-form-item {
    > .el-form-item__content {
      > .el-input {
        width: 300px;
      }
    }
  }

  > #login-button-el-form-item {
    > .el-form-item__content {
      > #login-button {
        width: 300px;
      }
    }
  }
}

#register-el-form {
  margin-top: 18px;

  > .el-form-item {
    > .el-form-item__content {
      > .el-input {
        width: 300px;
      }
    }
  }

  > #register-button-el-form-item {
    > .el-form-item__content {
      > #register-button {
        width: 300px;
      }
    }
  }

  > #register-code-el-form-item {
    > .el-form-item__content {
      > .el-input {
        max-width: 120px;
        margin-right: 60px;
      }
    }
  }

}


</style>
