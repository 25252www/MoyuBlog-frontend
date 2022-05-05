<template>
  <div class="sidebar">
    <div class="avatar">
      <el-avatar :size="140" :src="require('../assets/me.jpg')"></el-avatar>
    </div>
    <div class="link">
      <p>
        <el-link class="about-me" title="关于我" :underline=false>摸鱼战士</el-link>
      </p>
      <p>
        <el-link class="about-station" title="关于小站" :underline=false>摸鱼战士的小站</el-link>
      </p>
    </div>
    <div class="divider">
      <span title="首页"><el-link :underline=false :href="'/home'">🏠首页</el-link></span>
      <el-divider/>
      <span title="实验室"><el-link :underline=false :href="'/lab'">🗺️实验室</el-link></span>
      <el-divider/>
      <span title="登录"><el-link :underline=false :href="'/login'">❤️登录</el-link></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar"
}
</script>

<style scoped>

.sidebar {
  position: fixed;
  margin-top: 120px;
}

.avatar {
  text-align: center;
}

.link {
  text-align: center;
}

.about-me {
  color: #0078E7;
  font-size: 16px;
  text-align: center;
}

.about-me:hover {
  color: #CC0000;
}

.about-station {
  color: #555555;
}

.about-station:hover {
  color: #CC0000;
}

.divider {
  width: 70%;
  margin: 70px auto;
  text-align: center;
}

</style>
