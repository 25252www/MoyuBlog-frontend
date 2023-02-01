<template>
  <div id="sidebar-container">
    <div id="me-div">
      <el-avatar :size="140" src="https://cdn.moyusoldier.cn/me.jpg"></el-avatar>
      <p>
        <router-link id="about-me" title="关于我" to="/about">摸鱼战士</router-link>
      </p>
      <p>
        <router-link id="about-station" title="关于小站" to="/about/site">摸鱼战士的小站</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar"
}
</script>

<style lang="scss" scoped>

a {
  text-decoration: none;
}

#sidebar-container {
  position: fixed;
  top: 300px;
  left: 12.5%;
  transform: translate(-50%, -50%);
  text-align: center;

  p {
    margin-top: 30px;

    #about-me {
      color: #0078E7;
      font-size: 16px;
      &:hover {
        color: #CC0000;
      }
    }

    #about-station {
      color: #555555;
      &:hover {
        color: #CC0000;
      }
    }
  }

}


</style>
