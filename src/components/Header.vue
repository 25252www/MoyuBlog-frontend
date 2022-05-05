<template>
  <div class="header">
    <el-row class="el-row">
      <el-col :span="4">
        <el-link class="home-el-link" :underline=false :href="'/home'">
          <img class="logo" :src="require('../assets/logo.svg')">
        </el-link>
      </el-col>
      <el-col :span="4" :offset="16">
        <el-link class="login-el-link" :underline=false :href="'/login'">
          <img class="login" :src="require('../assets/login.svg')">
        </el-link>
      </el-col>
    </el-row>
    <el-divider class="el-divider"/>
  </div>
</template>


<script>
export default {
  name: "Header"
}

</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #FFFFFF;
  z-index: 10;
}

.el-divider {
  margin: 5px 0;
}

.el-row {
  margin: 10px 0 5px 0;
}

.home-el-link {
  width: 100%;
  margin: auto;
}

.login-el-link {
  width: 100%;
  margin: auto;
}

.logo, .login {
  height: 30px;
}

</style>