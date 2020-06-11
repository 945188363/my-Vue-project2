<template>
  <div>
    <el-scrollbar>
      <div style="height: 620px;">
        <div>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>网关设置</el-breadcrumb-item>
            <el-breadcrumb-item>日志设置</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div style="margin-top: 30px;" >
          <el-tabs v-model="LogActiveName" type="card">
            <el-tab-pane label="请求日志" name="first">
              <!--卡片视图-->
              <el-card class="box-card">
                <div>
                  <!--日志名称-->
                  <div style="margin-top: 20px;">
                    <p class="lh_15"><span >请求日志名称&nbsp;:&nbsp;</span><br></p>
                    <el-input style="width: 300px;" v-model="AccessLogName" :disabled="accessEditAble"></el-input><span>.log</span>
                  </div>
                  <!--记录状态-->
                  <div style="margin-top: 20px;">
                    <p class="lh_15"><span >记录状态&nbsp;:&nbsp;</span><br></p>
                    <el-switch
                      v-model="AccessLogRecordStatus"
                      :disabled="accessEditAble"
                      active-color="#13ce66"
                      inactive-color="#ff4949">
                    </el-switch>
                  </div>
                  <!--日志存放路径-->
                  <div style="margin-top: 20px;">
                    <p class="lh_15"><span >日志存放路径&nbsp;:&nbsp;</span><br></p>
                    <el-input style="width: 300px;" v-model="AccessLogAddress" :disabled="accessEditAble"></el-input>
                  </div>
                  <!--记录周期-->
                  <div style="margin-top: 20px;">
                    <p class="lh_15"><span >记录周期&nbsp;:&nbsp;</span><br></p>
                    <el-select style="width: 300px;" :disabled="accessEditAble" v-model="AccessLogPeriod" placeholder="请选择">
                      <el-option
                        v-for="item in AccessLogPeriodsData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <!--保留时间-->
                  <div style="margin-top: 20px;">
                    <p class="lh_15"><span >保留时间&nbsp;:&nbsp;</span><br></p>
                    <el-select style="width: 300px;" :disabled="accessEditAble" v-model.number="AccessLogSavedTime" placeholder="请选择">
                      <el-option
                        v-for="item in AccessLogSaveTimeData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <!--常用字段-->
                  <div style="margin-top: 20px;">
                    <p class="lh_15"><span >记录内容&nbsp;:&nbsp;</span><br></p>
                    <el-table
                      ref="RecordFieldsTable"
                      :data="fieldsData"
                      tooltip-effect="dark"
                      style="width: 100%"
                      @selection-change="handleSelectionChange">
                      <el-table-column
                        :selectable="handleSelectAble"
                        type="selection"
                        width="55">
                      </el-table-column>
                      <el-table-column
                        prop="field"
                        label="字段名"
                        width="120">
                      </el-table-column>
                      <el-table-column
                        prop="description"
                        label="描述"
                        show-overflow-tooltip>
                      </el-table-column>
                    </el-table>
                  </div>
                  <div style="margin-top: 25px;">
                    <p class="lh_25">
                      <el-row>
                        <el-button type="primary" @click="EditAccessLogSettings(isAccessSave)" >{{ this.isAccessSave ? '保存' : '编辑'}}</el-button>
                        <el-button type="info" :style="accessCancel" @click="CancelAccessLogSettings">取消</el-button>
                      </el-row>
                    </p>
                  </div>
                </div>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="运行日志" name="second">
              <el-card class="box-card">
                <div>
                  <!--日志名称-->
                  <div style="margin-top: 20px;">
                    <p class="lh_15"><span >运行日志名称&nbsp;:&nbsp;</span><br></p>
                    <el-input style="width: 300px;" v-model="RuntimeLogName" :disabled="runtimeEditAble"></el-input><span>.log</span>
                  </div>
                  <!--记录状态-->
                  <div style="margin-top: 20px;">
                    <p class="lh_15"><span >记录状态&nbsp;:&nbsp;</span><br></p>
                    <el-switch
                      v-model="RuntimeLogRecordStatus"
                      :disabled="runtimeEditAble"
                      active-color="#13ce66"
                      inactive-color="#ff4949">
                    </el-switch>
                  </div>
                  <!--日志存放路径-->
                  <div style="margin-top: 20px;">
                    <p class="lh_15"><span >日志存放路径&nbsp;:&nbsp;</span><br></p>
                    <el-input style="width: 300px;" v-model="RuntimeLogAddress" :disabled="runtimeEditAble"></el-input>
                  </div>
                  <!--记录周期-->
                  <div style="margin-top: 20px;">
                    <p class="lh_15"><span >记录周期&nbsp;:&nbsp;</span><br></p>
                    <el-select style="width: 300px;" :disabled="runtimeEditAble" v-model="RuntimeLogPeriod" >
                      <el-option
                        v-for="item in AccessLogPeriodsData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <!--保留时间-->
                  <div style="margin-top: 20px;">
                    <p class="lh_15"><span >保留时间&nbsp;:&nbsp;</span><br></p>
                    <el-select style="width: 300px;" :disabled="runtimeEditAble" v-model.number="RuntimeLogSavedTime">
                      <el-option
                        v-for="item in AccessLogSaveTimeData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <!--常用字段-->
                  <div style="margin-top: 20px;">
                    <p class="lh_15"><span >记录内容&nbsp;:&nbsp;</span><br></p>
                    <el-checkbox-group v-model="RuntimeLogRecordTypes" >
                      <el-checkbox-button v-for="type in RuntimeLogRecordTypesData" :label="type" :key="type" :disabled="runtimeEditAble">{{type}}</el-checkbox-button>
                    </el-checkbox-group>
                  </div>
                  <div style="margin-top: 25px;">
                    <div class="lh_25">
                      <el-row>
                        <el-button type="primary" @click="EditRuntimeLogSettings(isRuntimeSave)" >{{ this.isRuntimeSave ? '保存' : '编辑'}}</el-button>
                        <el-button type="info" :style="runtimeCancel" @click="CancelRuntimeLogSettings">取消</el-button>
                      </el-row>
                    </div>
                  </div>
                </div>
              </el-card>

            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'ApiManager',
  data () {
    return {
      // 初始化配置数据
      fieldsData: [{
        field: '$msec',
        description: '日志写入时间。单位为秒，精度是毫秒。'
      }, {
        field: '$request_id',
        description: '请求id'
      }, {
        field: '$time_local',
        description: '通用日志格式下的本地时间。'
      }, {
        field: '$api',
        description: 'API信息，包括 API名称和ID'
      }, {
        field: '$host',
        description: '主机信息'
      }, {
        field: '$request_method',
        description: '记录请求的方法、URL和协议（例如 POST /proxy HTTPS)'
      }, {
        field: '$status_code',
        description: '记录请求状态'
      }, {
        field: '$latency_time',
        description: '请求处理时间，单位为秒，精度毫秒； 从读入客户端的第一个字节开始，直到把最后一个字符发送给客户端后进行日志写入为止。'
      }, {
        field: '$retry',
        description: '重试信息'
      }
      ],
      AccessLogSaveTimeData: [{
        value: 3,
        label: '3天'
      }, {
        value: 7,
        label: '7天'
      },
      {
        value: 30,
        label: '30天'
      },
      {
        value: 90,
        label: '90天'
      },
      {
        value: 180,
        label: '180天'
      }
      ],
      AccessLogPeriodsData: [{
        value: 'hour',
        label: '小时'
      }, {
        value: 'day',
        label: '天'
      }],
      RuntimeLogRecordTypesData: ['Error', 'Warning', 'Info', 'Debug'],
      // 请求日志参数
      AccessLogName: 'access',
      AccessLogRecordStatus: true,
      AccessLogAddress: '/store/log/access',
      AccessLogPeriod: 'hour',
      AccessLogSavedTime: 3,
      AccessLogSelectedFields: [],
      // 运行日志参数
      RuntimeLogName: 'node',
      RuntimeLogRecordStatus: false,
      RuntimeLogAddress: '/store/log/runtime',
      RuntimeLogPeriod: 'hour',
      RuntimeLogSavedTime: 3,
      RuntimeLogRecordTypes: [],
      // 回退请求日志参数数据
      CopyAccessLogName: 'access',
      CopyAccessLogRecordStatus: true,
      CopyAccessLogAddress: '/store/log/access',
      CopyAccessLogPeriod: 'hour',
      CopyAccessLogSavedTime: '3',
      CopyAccessLogSelectedFields: [],
      // 回退运行日志参数数据
      CopyRuntimeLogName: 'node',
      CopyRuntimeLogRecordStatus: false,
      CopyRuntimeLogAddress: '/store/log/runtime',
      CopyRuntimeLogPeriod: 'hour',
      CopyRuntimeLogSavedTime: '3',
      CopyRuntimeLogRecordTypes: [],
      // 组件配置
      LogActiveName: 'first',
      accessEditAble: true,
      runtimeEditAble: true,
      runtimeCancel: 'display:none;',
      accessCancel: 'display:none;',
      isAccessSave: false,
      isRuntimeSave: false
    }
  },
  // 存放 方法
  methods: {
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.RecordFieldsTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.RecordFieldsTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.AccessLogSelectedFields = val
    },
    // 编辑请求日志设置
    async EditAccessLogSettings (isAccessSave) {
      if (!isAccessSave) {
        this.copyAccessData()
        this.accessEditAble = false
        this.accessCancel = 'display:inline-block;'
        this.isAccessSave = true
      } else {
        this.accessEditAble = true
        this.isAccessSave = false
        this.accessCancel = 'display:none;'
        // 上传表单
        const AccessLogSettingEditForm = {
          'LogType': 2,
          'LogName': this.AccessLogName,
          'LogRecordStatus': this.AccessLogRecordStatus,
          'LogAddress': this.AccessLogAddress,
          'LogPeriod': this.AccessLogPeriod,
          'LogSavedTime': this.AccessLogSavedTime,
          'LogRecordField': JSON.stringify(this.AccessLogSelectedFields)
        }
        console.log(AccessLogSettingEditForm)
        const response = await this.$http.post('/saveAccessLogSetting', AccessLogSettingEditForm)
        console.log(response)
        this.$message.success('修改请求日志配置成功!')
      }
    },
    // 取消编辑请求日志设置
    async CancelAccessLogSettings () {
      this.accessEditAble = true
      this.isAccessSave = false
      this.accessCancel = 'display:none;'
      this.toggleSelection()
      this.recopyAccessData()
      this.renderFieldTable(this.AccessLogSelectedFields)
    },
    copyAccessData () {
      this.CopyAccessLogName = this.AccessLogName
      this.CopyAccessLogRecordStatus = this.AccessLogRecordStatus
      this.CopyAccessLogAddress = this.AccessLogAddress
      this.CopyAccessLogPeriod = this.AccessLogPeriod
      this.CopyAccessLogSavedTime = this.AccessLogSavedTime
      this.CopyAccessLogSelectedFields = this.AccessLogSelectedFields
    },
    recopyAccessData () {
      this.AccessLogName = this.CopyAccessLogName
      this.AccessLogRecordStatus = this.CopyAccessLogRecordStatus
      this.AccessLogAddress = this.CopyAccessLogAddress
      this.AccessLogPeriod = this.CopyAccessLogPeriod
      this.AccessLogSavedTime = this.CopyAccessLogSavedTime
      this.AccessLogSelectedFields = this.CopyAccessLogSelectedFields
    },
    // 编辑运行日志设置
    async EditRuntimeLogSettings (isRuntimeSave) {
      if (!isRuntimeSave) {
        this.copyRuntimeData()
        this.runtimeEditAble = false
        this.runtimeCancel = 'display:inline-block;'
        this.isRuntimeSave = true
      } else {
        this.runtimeEditAble = true
        this.isRuntimeSave = false
        this.runtimeCancel = 'display:none;'
        // 上传表单
        const RuntimeLogSettingEditForm = {
          'LogType': 1,
          'LogName': this.RuntimeLogName,
          'LogRecordStatus': this.RuntimeLogRecordStatus,
          'LogAddress': this.RuntimeLogAddress,
          'LogPeriod': this.RuntimeLogPeriod,
          'LogSavedTime': this.RuntimeLogSavedTime,
          'LogRecordField': JSON.stringify(this.RuntimeLogRecordTypes)
        }
        console.log(RuntimeLogSettingEditForm)
        const response = await this.$http.post('/saveRuntimeLogSetting', RuntimeLogSettingEditForm)
        console.log(response)
        this.$message.success('修改运行日志配置成功!')
      }
    },
    async QueryLogSettings () {
      const response = await this.$http.get('/queryLogSetting')
      console.log(response)
      response.data['data'].forEach((item, index, array) => {
        if (item['LogType'] === 1) {
          this.RuntimeLogName = item['LogName']
          this.RuntimeLogRecordStatus = item['LogRecordStatus'] === 1
          this.RuntimeLogAddress = item['LogAddress']
          this.RuntimeLogPeriod = item['LogPeriod']
          this.RuntimeLogSavedTime = item['LogSavedTime']
          this.RuntimeLogRecordTypes = JSON.parse(item['LogRecordField'])
        } else if (item['LogType'] === 2) {
          this.AccessLogName = item['LogName']
          this.AccessLogRecordStatus = item['LogRecordStatus'] === 1
          this.AccessLogAddress = item['LogAddress']
          this.AccessLogPeriod = item['LogPeriod']
          this.AccessLogSavedTime = item['LogSavedTime']
          this.AccessLogSelectedFields = JSON.parse(item['LogRecordField'])
          this.renderFieldTable(this.AccessLogSelectedFields)
        }
      })
    },
    // 取消编辑运行日志设置
    async CancelRuntimeLogSettings () {
      this.runtimeEditAble = true
      this.isRuntimeSave = false
      this.runtimeCancel = 'display:none;'
      this.recopyRuntimeData()
    },
    copyRuntimeData () {
      this.CopyRuntimeLogName = this.RuntimeLogName
      this.CopyRuntimeLogRecordStatus = this.RuntimeLogRecordStatus
      this.CopyRuntimeLogAddress = this.RuntimeLogAddress
      this.CopyRuntimeLogPeriod = this.RuntimeLogPeriod
      this.CopyRuntimeLogSavedTime = this.RuntimeLogSavedTime
      this.CopyRuntimeLogRecordTypes = this.RuntimeLogRecordTypes
    },
    recopyRuntimeData () {
      this.RuntimeLogName = this.CopyRuntimeLogName
      this.RuntimeLogRecordStatus = this.CopyRuntimeLogRecordStatus
      this.RuntimeLogAddress = this.CopyRuntimeLogAddress
      this.RuntimeLogPeriod = this.CopyRuntimeLogPeriod
      this.RuntimeLogSavedTime = this.CopyRuntimeLogSavedTime
      this.RuntimeLogRecordTypes = this.CopyRuntimeLogRecordTypes
    },
    handleSelectAble (row, index) {
      return !this.accessEditAble
    },
    renderFieldTable (param) {
      console.log(param)
      let FieldParam = []
      param.forEach(field => {
        this.fieldsData.forEach(fieldAll => {
          if (fieldAll.field === field.field && fieldAll.description === field.description) {
            FieldParam.push(fieldAll)
          }
        })
      })
      this.toggleSelection(FieldParam)
    }
  },
  created: function () {
  },
  mounted: function () {
    this.QueryLogSettings()
    this.renderFieldTable(this.AccessLogSelectedFields)
  }
}
</script>

<style lang="less" scoped>
  .lh_15{
    line-height: 15px;
  }
  .lh_25{
    line-height: 25px;
  }
  .box-card{
    background-color: honeydew;
  }
</style>
