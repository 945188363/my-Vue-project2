<template>
  <div>
    <div style="height: 620px;">
      <!--面包屑导航-->
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>网关设置</el-breadcrumb-item>
          <el-breadcrumb-item>黑白名单设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--全局黑白名单设置-->
      <div  style="margin-top: 25px;margin-bottom: 20px">
        <el-card class="box-card">
          <!--prometheus监控-->
          <div class="monitor">
            <span>开启全局黑白名单</span>
            <el-switch
              v-model="ipRestrictionGlobal"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="showGlobalSettings">
            </el-switch>
            <!--隐藏配置区域-->
            <div>
              <div :style="globalVisualAble">
                <div style="margin-top: 25px;margin-bottom: 20px;" >
                  <!--全局黑白名单-->
                  <el-card class="box-card">
                    <div class="monitor">
                      <span>全局</span>
                    </div><hr>
                    <div>
                      <span>白名单</span><br>
                      <el-input
                        style="width: 450px;margin-top: 15px;"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入ip白名单,以逗号隔开. eg:127.0.0.1,localhost,192.168.1.1"
                        v-model="globalWhiteIps">
                      </el-input>
                    </div>
                    <div style="margin-top: 15px">
                      <span>黑名单</span><br>
                      <el-input
                        style="width: 450px;margin-top: 15px;"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入ip黑名单,以逗号隔开. eg:127.0.0.1,localhost,192.168.1.1"
                        v-model="globalBlackIps">
                      </el-input>
                    </div>
                    <div>
                      <el-row style="margin-top: 15px;">
                        <el-button type="primary" @click="SaveIpRestrictionSettings('global')" >保存</el-button>
                        <el-button type="info" @click="CancelSettings('global')">取消</el-button>
                      </el-row>
                    </div>
                  </el-card>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <!--接口粒度黑白名单设置-->
      <div  style="margin-top: 25px;margin-bottom: 20px">
        <el-card class="box-card">
          <!--prometheus监控-->
          <div class="monitor">
            <span>开启接口黑白名单</span>
            <el-switch
              v-model="ipRestrictionInterface"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="showInterfaceSettings">
            </el-switch>
            <!--隐藏配置区域-->
            <div>
              <div :style="interfaceVisualAble">
                <div style="margin-top: 25px;margin-bottom: 20px;" >
                  <!--全局黑白名单-->
                  <el-card class="box-card">
                    <div class="monitor">
                      <span>全局</span>
                    </div><hr>
                    <div>
                      <span>白名单</span><br>
                      <el-input
                        style="width: 450px;margin-top: 15px;"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入ip白名单,以逗号隔开. eg:127.0.0.1,localhost,192.168.1.1"
                        v-model="interfaceWhiteIps">
                      </el-input>
                    </div>
                    <div style="margin-top: 15px">
                      <span>黑名单</span><br>
                      <el-input
                        style="width: 450px;margin-top: 15px;"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入ip黑名单,以逗号隔开. eg:127.0.0.1,localhost,192.168.1.1"
                        v-model="interfaceBlackIps">
                      </el-input>
                    </div>
                    <div>
                      <el-row style="margin-top: 15px;">
                        <el-button type="primary" @click="SaveIpRestrictionSettings('interface')" >保存</el-button>
                        <el-button type="info" @click="CancelSettings('interface')">取消</el-button>
                      </el-row>
                    </div>
                  </el-card>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IpRestriction',
  data () {
    return {
      ipRestrictionGlobal: false,
      ipRestrictionInterface: false,
      globalWhiteIps: '',
      globalBlackIps: '',
      interfaceWhiteIps: '',
      interfaceBlackIps: '',
      interfaceApiList: '',
      interfaceApiGroupList: '',
      globalVisualAble: 'display:none',
      interfaceVisualAble: 'display:none'
    }
  },
  methods: {
    showGlobalSettings () {
      if (this.ipRestrictionGlobal) {
        this.globalVisualAble = 'display:block'
      } else {
        this.globalVisualAble = 'display:none'
        this.SaveIpRestrictionSettings('global')
      }
    },
    showInterfaceSettings () {
      if (this.ipRestrictionInterface) {
        this.interfaceVisualAble = 'display:block'
      } else {
        this.interfaceVisualAble = 'display:none'
        this.SaveIpRestrictionSettings('interface')
      }
    },
    async SaveIpRestrictionSettings (type) {
      let IpRestrictionForm = {}
      if (type === 'global') {
        IpRestrictionForm = {
          Name: 'globalIpRestriction',
          Global: 1,
          Status: this.ipRestrictionGlobal,
          IpWhiteList: this.globalWhiteIps,
          IpBlackList: this.globalBlackIps,
          ApiList: '',
          ApiGroupList: ''
        }
      } else if (type === 'interface') {
        IpRestrictionForm = {
          Name: 'globalIpRestriction',
          Global: 0,
          Status: this.ipRestrictionInterface,
          IpWhiteList: this.globalWhiteIps,
          IpBlackList: this.globalBlackIps,
          ApiList: this.interfaceApiList,
          ApiGroupList: this.interfaceApiGroupList
        }
      }
      console.log(IpRestrictionForm)
      const response = await this.$http.post('/saveIpRestriction', IpRestrictionForm)
      this.$message.success('保存成功！')
      console.log(response)
    },
    async QueryIpRestriction () {
      const response = await this.$http.get('/queryIpRestriction')
      console.log(response)
      // 处理ips
      response.data['data'].forEach((item) => {
        if (item['Global'] === 1) {
          this.ipRestrictionGlobal = item['Status'] === 1
          this.globalWhiteIps = item['IpWhiteList']
          this.globalBlackIps = item['IpBlackList']
          if (this.ipRestrictionGlobal) {
            this.globalVisualAble = 'display:block'
          } else {
            this.globalVisualAble = 'display:none'
          }
        } else if (item['Global'] === 0) {
          this.ipRestrictionInterface = item['Status'] === 1
          this.interfaceWhiteIps = item['IpWhiteList']
          this.interfaceBlackIps = item['IpBlackList']
          this.interfaceApiList = item['ApiList']
          this.interfaceApiGroupList = item['ApiGroupList']
          if (this.ipRestrictionInterface) {
            this.interfaceVisualAble = 'display:block'
          } else {
            this.interfaceVisualAble = 'display:none'
          }
        }
      })
    },
    async CancelSettings (type) {
      let IpRestrictionForm = {}
      if (type === 'global') {
        this.ipRestrictionGlobal = false
        this.globalVisualAble = 'display:none'
        IpRestrictionForm = {
          Name: 'globalIpRestriction',
          Global: 1,
          Status: this.ipRestrictionGlobal
        }
      } else if (type === 'interface') {
        this.ipRestrictionInterface = false
        this.interfaceVisualAble = 'display:none'
        IpRestrictionForm = {
          Name: 'globalIpRestriction',
          Global: 0,
          Status: this.ipRestrictionInterface
        }
      }
      console.log(IpRestrictionForm)
      const response = await this.$http.post('/saveIpRestriction', IpRestrictionForm)
      console.log(response)
    }
  },
  created: function () {
  },
  mounted: function () {
    this.QueryIpRestriction()
  }
}
</script>

<style scoped>

</style>
