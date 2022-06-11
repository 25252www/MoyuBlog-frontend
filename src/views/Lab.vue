<template>
  <Header/>
  <div class="lab">
    <div class="image-header-div">
      <div class="wpb_wrapper">
        <h1 class="title">SAR图像中的建筑物检测与分割</h1>
      </div>
    </div>
    <div class="ai-module-introduce">
      <div class="ai-module-header">
        功能介绍
        <!---->
      </div>
      <div class="ai-layout-a-item">
        <div class="ai-layout-a-icon"></div>
        <div class="ai-layout-a-info">
          <div class="ai-layout-a-title">
            建筑物检测与分割
          </div>
          <div class="ai-layout-a-des">
            检测SAR图像中的建筑物并分割，返回RGB合成图及分割后的二值图，实现像素级高精度分割
          </div>
        </div>
      </div>
    </div>
    <div class="ai-module-header">
      功能演示
      <!---->
    </div>
    <el-container class="el-container">
      <el-aside class="el-aside" width="200px">
        <el-upload
            class="upload-demo"
            drag
            action="https://upload-z2.qiniup.com"
            :data="postData"
            :before-upload="beforeUpload"
            :on-success="onSuccess"
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
        <el-skeleton :loading="loading" animated>
          <template #template>
            <div class="template-template">
            <div class="img-before-div">
              <el-skeleton-item class="img-before" variant="image" style="width: 500px; height: 500px"/>
            </div>
            <div class="img-after-div">
              <el-skeleton-item class="img-after" variant="image" style="width: 500px; height: 500px"/>
            </div>
            </div>
          </template>
          <template #default>
            <div class="img-before-div">
              <img class="img-before" :src="responseData.outputImgSARUrl" alt="">
            </div>
            <div class="img-after-div">
              <img class="img-after" :src="responseData.outputImgBinaryUrl" alt="">
            </div>
          </template>
        </el-skeleton>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from "../components/Header";

export default {
  name: "Lab",
  components: {Header},
  data() {
    return {
      loading: false,
      postData: {
        key: "", //文件名
        token: ""
      },
      requestData: {
        inputImgUrl: ""
      },
      responseData: {
        outputImgSARUrl: "https://cdn.moyusoldier.cn/outputImgSAR.png",
        outputImgBinaryUrl: "https://cdn.moyusoldier.cn/outputImgBinary.png"
      }
    }
  },
  methods: {
    beforeUpload(file) {
      this.postData.key = `inputImg_${Math.round(new Date() / 1000)}_${file.name}`
    },
    onSuccess(res) {
      console.log("上传成功")
      console.log(res)
      this.requestData.inputImgUrl = "https://cdn.moyusoldier.cn/" + res.key
      this.loading = true
      this.axios.post('/python/doSegmentation', this.requestData).then(res => {
        console.log(res)
        this.responseData.outputImgSARUrl = res.data.data.outputImgSARUrl
        this.responseData.outputImgBinaryUrl = res.data.data.outputImgBinaryUrl
        this.loading = false
      })
    }
  },
  created() {
    this.axios.get('/python/getQiniuUploadToken').then(res => {
      console.log(res)
      this.postData.token = res.data.data
    })
  }
}
</script>

<style scoped>

.lab {
  width: 100%;
}

.image-header-div {
  width: 100%;
  background-image: url("../assets/SN6-challenge-image-header.jpg");
  background-repeat: repeat-x;
  height: 300px;
}

.wpb_wrapper {
  position: absolute;
  top: 150px;
  left: 15%;
  width: 70%;
  background-color: rgba(0, 0, 0, 0.5);
}

.title {
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -webkit-box-direction: normal;
  box-sizing: inherit;
  font-family: "prometo", sans-serif;
  line-height: 1.2;
  margin: 0 0 20px;
  font-size: 2rem;
  font-weight: 400;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  margin-bottom: 0;
}

.ai-module-introduce {
  font: 14px BlinkMacSystemFont, Roboto, Helvetica Neue, Helvetica, PingFangSC-Regular, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
  -webkit-font-smoothing: antialiased;
  max-width: 1180px;
  margin: 0 auto;
  padding-top: 70px;
}

.ai-module-header {
  font: 14px BlinkMacSystemFont, Roboto, Helvetica Neue, Helvetica, PingFangSC-Regular, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
  -webkit-font-smoothing: antialiased;
  line-height: 46px;
  font-size: 30px;
  color: #000;
  letter-spacing: 0;
  text-align: center;
}

.ai-layout-a-item {
  font: 14px BlinkMacSystemFont, Roboto, Helvetica Neue, Helvetica, PingFangSC-Regular, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
  -webkit-font-smoothing: antialiased;
  display: table-cell;
  position: relative;
  width: 1000px;
  padding-right: 120px;
}

.ai-layout-a-icon {
  font: 14px BlinkMacSystemFont, Roboto, Helvetica Neue, Helvetica, PingFangSC-Regular, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
  -webkit-font-smoothing: antialiased;
  float: left;
  width: 30px;
  height: 38px;
  background: no-repeat 50%;
  background-size: 30px 30px;
  background-image: url("../assets/ai-icon.png");
}

.ai-layout-a-info {
  font: 14px BlinkMacSystemFont, Roboto, Helvetica Neue, Helvetica, PingFangSC-Regular, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
  -webkit-font-smoothing: antialiased;
  position: relative;
  margin-left: 50px;
  color: #000;
  letter-spacing: 0;
  padding-bottom: 34px;
}

.ai-layout-a-title {
  font: 14px BlinkMacSystemFont, Roboto, Helvetica Neue, Helvetica, PingFangSC-Regular, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
  -webkit-font-smoothing: antialiased;
  color: #000;
  letter-spacing: 0;
  font-size: 22px;
  height: 38px;
  line-height: 38px;
  font-weight: 700;
}

.ai-layout-a-des {
  font: 14px BlinkMacSystemFont, Roboto, Helvetica Neue, Helvetica, PingFangSC-Regular, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
  -webkit-font-smoothing: antialiased;
  color: #000;
  letter-spacing: 0;
  font-size: 14px;
  line-height: 24px;
  margin-top: 10px;
}


.el-container {
  margin: 30px auto 0 auto;
  max-width: 1220px;
  max-height: 520px;
  background-color: lightgray;
  border-radius: 5px;
}

.el-aside {
  overflow: hidden;
}

.img-before {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}

.img-after-div, .img-before-div {
  margin: 10px 10px 10px 0;
  max-height: 500px;
  max-width: 500px;
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
  width: 90%;
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

.template-template{
  display: flex;
}
</style>