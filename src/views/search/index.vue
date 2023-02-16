<template>
  <el-row>
    <el-col class="sidebar-container hidden-xs-only" :span="6">
      <Sidebar/>
    </el-col>
    <el-col :span="16" :xs="{span: 20, offset: 2}">
      <SearchResultList/>
    </el-col>
  </el-row>
</template>

<script>
import SearchResultList from "./components/SearchResultList";
import Sidebar from "../../components/index/Sidebar";
export default {
  name: "Search",
  components: {Sidebar, SearchResultList}
}
</script>

<style scoped>

</style>
