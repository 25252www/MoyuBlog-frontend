<template>
  <div class="sidebar">
    <div class="avatar">
      <el-avatar :size="140" :src="require('../assets/me.jpg')"></el-avatar>
    </div>
    <div class="link">
      <p>
        <el-link id="about-me" :underline=false>摸鱼战士</el-link>
      </p>
      <p>
        <el-link id="about-station" :underline=false>摸鱼战士的小站</el-link>
      </p>
    </div>
    <div class="divider">
      <span><el-link :underline=false>🏠</el-link></span>
      <el-divider direction="vertical"></el-divider>
      <span><el-link :underline=false>🏷️</el-link></span>
      <el-divider direction="vertical"></el-divider>
      <span><el-link :underline=false>❤️</el-link></span>
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
  /*visibility:hidden;*/
  position: fixed;
  overflow-y: auto;
  top: 0;
  bottom: 0;
  left: 0;
  width: 20rem;
  background-color: #fff;
  /*background-image: url(https://cdn.jsdelivr.net/gh/YunYouJun/cdn@master/img/bg/alpha-stars-timing-1.webp);*/
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom 1rem center;
  text-align: center;
  z-index: 10;
  transition-property: all;
  transition-duration: .3s;
  transition-delay: 0s;
  /*box-shadow: 0 0 2px rgb(0 0 0 / 20%);*/
}

.avatar {
  margin-top: 90px;
  text-align: center;
}

.link {
  text-align: center;
}

#about-me {
  color: #0078E7;
  font-size: 16px;
  text-align: center;
}

#about-me:hover {
  color: #CC0000;
}

#about-station {
  color: #555555;
}

#about-station:hover {
  color: #CC0000;
}

.divider {
  margin-top: 30px;
  text-align: center;
}
</style>
