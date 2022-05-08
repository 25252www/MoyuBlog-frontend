<template>
  <Header/>
  <div class="lab">
    <el-container class="el-container">
      <el-aside width="200px">
        <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
        >
          <img class="upload-img" :src="require('../assets/upload.svg')" :width="50">
          <div class="el-upload__text">
            拖拽图片到此处 <p>或 <em>点击选择</em></p>>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              *请上传tiff格式图片
            </div>
          </template>
        </el-upload>
      </el-aside>
      <el-main class="el-main">
        <div class="img-before-div">
          <img class="img-before" :src="require('../assets/img-before-demo.png')">
        </div>
        <div class="img-after-div">
          <img class="img-after" :src="require('../assets/img-after-demo.png')">
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from "../components/Header";

export default {
  name: "Lab",
  components: {Header},
  // data() {
  //   return {
  //     labelMap: {}
  //   }
  // },
  // created() {
  //   this.axios.get('/python/hello').then(res => {
  //     this.labelMap = res.data.data;
  //   })
  // }
}
</script>

<style scoped>

.el-container {
  margin: 100px auto 0 auto;
  width: 1220px;
  height: 520px;
  background-color: lightgray;
  border-radius: 5px;
}

.img-before {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}

.img-after-div, .img-before-div {
  margin: 10px 10px 10px 0;
  height: 500px;
  width: 500px;
  background-color: #ffffff;
  border-radius: 5px;
}

.img-after, .img-before {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}

.upload-demo {
  margin: 10px;
}

::v-deep .el-upload-dragger {
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 180px;
  height: 180px;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
}

.upload-img {
  margin: 50px 0 10px 0;
}

.el-main {
  padding: 0;
  display: flex;
}
</style>