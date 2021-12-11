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
      <span title="登录"><el-link :underline=false :href="'/login'">🎄</el-link></span>
      <el-divider direction="vertical"></el-divider>
      <span class="category" title="分类"><el-link :underline=false>🏷️</el-link></span>
      <el-divider direction="vertical"></el-divider>
      <span class="about-me" title="关于我"><el-link :underline=false>❤️</el-link></span>
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
  overflow-y: auto;
  top: 0;
  bottom: 0;
  left: 0;
  width: 20%;
  background-color: #fff;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom 1rem center;
  text-align: center;
  z-index: 10;
  transition-property: all;
  transition-duration: .3s;
  transition-delay: 0s;
}

.avatar {
  margin-top: 90px;
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
  margin-top: 30px;
  text-align: center;
}
</style>
