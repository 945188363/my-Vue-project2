<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="../assets/index.png">
        <span>微服务网关管理后台</span>
      </div>
    </el-header>
    <el-container>
      <!-- 侧边 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!--收缩按钮-->
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!--侧边栏菜单区域-->
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <el-menu-item index="/index">
            <i class="el-icon-s-home"></i>
            <span>首页</span>
          </el-menu-item>

          <el-menu-item index="/apiManager">
            <i class="el-icon-s-operation"></i>
            <span>API管理</span>
          </el-menu-item>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-help"></i>
              <span>注册方式与负载</span>
            </template>
            <el-menu-item index="/registryManager">服务注册方式</el-menu-item>
            <el-menu-item index="/loadBalanceManager">负载均衡</el-menu-item>
          </el-submenu>

          <el-menu-item index="/monitorManager">
            <i class="el-icon-aim"></i>
            <span>API监控</span>
          </el-menu-item>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>网关设置</span>
            </template>
            <el-menu-item index="/ipRestriction">黑白名单设置</el-menu-item>
            <el-menu-item index="/logManager">日志设置</el-menu-item>
            <el-menu-item index="/elkSearch">ELK日志查询</el-menu-item>
          </el-submenu>

          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>插件设置</span>
            </template>
            <el-menu-item index="/pluginManager">
              <span>扩展插件</span>
            </el-menu-item>
            <el-menu-item index="/apiPluginManager">
              <span>api插件管理</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Index',
  data: function () {
    return {
      isCollapse: false
    }
  },
  // 存放 方法
  methods: {
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }

}
</script>

<style lang="less" scoped>
  .home-container{
    height: 100%;
  }
  .el-header{
    background-color: cadetblue;
    display: flex;
    justify-content: space-between;
    padding: 0;
    color: honeydew;
    font-size: 20px;
    align-items: center;
    > div{
      display: flex;
      align-items: center;
      span{
        margin-left: 15px;
      }
    }
  }
  .el-aside{
    background-color: #545c64;
    .el-menu{
      border-right: 0;
    }
  }
  .el-main{
    background-color: azure;
  }
  .toggle-button{
    background-color: lightslategray;
    font-size: 10px;
    line-height: 24px;
    color: white;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
</style>
