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
        <el-dropdown trigger="click">
          <el-avatar v-if="token && avatar" :size="30" :src="avatar"/>
          <img v-if="token && !avatar" style="height: 30px" :src="require('../../assets/avatar.svg')"/>
          <template #dropdown>
            <el-dropdown-item>
              <router-link to="/userSpace">
                个人中心
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <p id="logout-p" @click="logout">退出</p>
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
    ])
  },
  methods: {
    async logout() {
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

#logout-p {
  margin: 0;

  &:hover {
    color: var(--el-color-primary);
  }
}

</style>
