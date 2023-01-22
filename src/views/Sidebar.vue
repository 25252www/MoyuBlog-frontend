<template>
  <div id="sidebar-container">
    <div id="me-div">
      <el-avatar :size="140" :src="require('../assets/me.jpg')"></el-avatar>
      <p>
        <router-link id="about-me" title="关于我" to="/">摸鱼战士</router-link>
      </p>
      <p>
        <router-link id="about-station" title="关于小站" to="/">摸鱼战士的小站</router-link>
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

a{
  text-decoration: none;
}

#sidebar-container {
  position: fixed;
  margin-top: 120px;

  > #me-div {
    text-align: center;
  }

  > #divider {
    width: 70%;
    margin: 70px auto;
    text-align: center;

    > span {
      > a {
        text-decoration: none;
        color: #555555;
      }
    }
  }
}

#about-me{
  color: #0078E7;
  font-size: 16px;

  &:hover{
    color: #CC0000;
  }
}

#about-station{
  color: #555555
;

  &:hover{
    color: #CC0000;
  }
}


</style>
