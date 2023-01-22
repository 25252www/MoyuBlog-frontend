<template>
  <div id="header-container">
    <el-row justify="center" align="middle">
      <el-col :span="6">
        <router-link id="logo-link" to="/">
          <img style="height: 30px" :src="require('../../assets/logo.svg')"/>
        </router-link>
      </el-col>
      <el-col :span="4" :offset="14">
        <router-link v-if="!token" to="/login">
          登录/注册
        </router-link>
        <el-dropdown trigger="click" size="large">
          <el-avatar v-if="token && avatar" :size="30" :src="avatar"/>
          <img v-if="token && !avatar" style="height: 30px" :src="require('../../assets/avatar.svg')"/>
          <template #dropdown>

            <router-link to="/userSpace">
              <el-dropdown-item>个人中心</el-dropdown-item>
            </router-link>

            <router-link to="/lab">
              <el-dropdown-item v-if="token && roles.includes('admin')" divided>实验室</el-dropdown-item>
            </router-link>

            <router-link to="/form">
              <el-dropdown-item v-if="token && roles.includes('admin')" divided>文章管理</el-dropdown-item>
            </router-link>

            <el-dropdown-item divided @click="logout">
              <span>退出</span>
            </el-dropdown-item>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
    <el-divider class="el-divider"/>
  </div>
</template>


<script>
import {mapGetters} from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapGetters([
      'token',
      'avatar',
      'roles',
    ])
  },
  methods: {
    async logout() {
      console.log("logout in Header.vue");
      await this.$store.dispatch('user/logout')
      this.$router.push('/')
    },
  }
}

</script>

<style lang="scss" scoped>

#header-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #FFFFFF;
  z-index: 10;

  > .el-row {
    margin: 10px 0 5px 0;
    text-align: center;
  }

  > .el-divider {
    margin: 5px 0 0 0;
  }

}

a {
  text-decoration: none;
  color: #555555;

  &:hover {
    color: var(--el-color-primary);
  }
}


</style>
