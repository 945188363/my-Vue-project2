<template>
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>网关设置</el-breadcrumb-item>
        <el-breadcrumb-item>ELK日志查询</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <iframe class="iframe" src="http://localhost:5601/app/logs/" frameborder="0" align="left" width="85%" height="85%"  scrolling="auto" marginWidth=0 marginHeight=0  style="position:absolute;top:105px;">
      <p class="tip">你的浏览器不支持iframe标签</p>
    </iframe>
  </div>
</template>

<script>
export default {
  name: 'LogSearch'
}
</script>

<style scoped>

</style>
