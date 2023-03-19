<template>
  <div id="header-container">
    <el-row justify="center" align="middle">
      <el-col :span="6">
        <router-link class="logo-link" to="/">
          <img style="height: 30px" src="https://cdn.moyusoldier.cn/logo.svg"/>
        </router-link>
        <el-dropdown trigger="click" size="large">
          <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar"/>
          <template #dropdown>
            <router-link to="/about">
              <el-dropdown-item>摸鱼战士</el-dropdown-item>
            </router-link>
            <router-link to="/about/site">
              <el-dropdown-item>摸鱼战士的小站</el-dropdown-item>
            </router-link>
          </template>
        </el-dropdown>
      </el-col>
      <el-col :span="6" :offset="3">
        <el-input
            class="search-input"
            v-model="keyword"
            placeholder="搜索你感兴趣的内容..."
            size="large"
            :suffix-icon="Search"
            @keyup.enter="() => $router.push('/search/' + keyword)"
        >
          <template #suffix>
            <el-icon
                class="el-input__icon"
                @click="() => $router.push('/search/' + keyword)"
            >
              <search/>
            </el-icon>
          </template>
        </el-input>
      </el-col>
      <el-col :span="4" :offset="3">
        <router-link v-if="!token" to="/login" class="login-register-link">
          登录/注册
        </router-link>
        <el-dropdown trigger="click" size="large">
          <el-avatar v-if="token && avatar" :size="30" :src="avatar"/>
          <img v-if="token && !avatar" style="height: 30px" src="https://cdn.moyusoldier.cn/avatar.svg"/>
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
import {Search} from "@element-plus/icons";
import Hamburger from "@/components/Hamburger";

export default {
  name: "Header",
  components: {
    Hamburger,
    Search
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'token',
      'avatar',
      'roles',
    ])
  },
  data() {
    return {
      keyword: '',
    }
  },
  methods: {
    toggleSideBar() {
      // todo: 后续对sidebar的折叠进行优化
      this.$store.dispatch('app/toggleSideBar')
    },
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
    width: 100%;

    > .el-col {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
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

//::v-deep .search-input{
//  border-radius: 10px;
//}

::v-deep .el-input--large .el-input__wrapper {
  border-radius: 30px;
  height: 35px;
}

.hamburger-container {
  height: 100%;
  cursor: pointer;
  transition: background .3s;

  &:hover {
    background: rgba(0, 0, 0, .025)
  }
}

@media only screen and (max-width: 768px) {
  .logo-link {
    display: none;
  }
}

@media only screen and (min-width: 769px) {
  .hamburger-container {
    display: none;
  }
}

.login-register-link {
  display: block;
}


</style>
