<template>
  <div>
    <el-scrollbar>
      <div style="height: 620px;">
        <div>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>API管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div style="margin-top: 30px;" >
          <el-tabs v-model="apiManagerActiveName" type="card">
            <el-tab-pane label="api创建" name="first">
              <!--卡片视图-->
              <el-card class="box-card">
                <div>
                  <!--api组-->
                  <div style="margin-top: 20px;">
                    <p class="lh_15"><span >api组&nbsp;:&nbsp;</span><br></p>
                    <el-select style="width: 300px;" clearable v-model="ApiGroup" placeholder="请选择">
                      <el-option
                        v-for="item in ApiGroupsDetailsData"
                        :key="item.ApiGroupName"
                        :label="item.ApiGroupName"
                        :value="item.ApiGroupName">
                      </el-option>
                    </el-select>
                  </div>
                  <!--api名称-->
                  <div style="margin-top: 20px;">
                    <p class="lh_15"><span >api名称&nbsp;:&nbsp;</span><br></p>
                    <el-input style="width: 300px;" v-model="ApiName" placeholder="请输入内容"></el-input>
                  </div>
                  <!--api服务端协议-->
                  <div style="margin-top: 20px;">
                    <p class="lh_15"><span>服务端协议&nbsp;:&nbsp;</span><br></p>
                    <el-select style="width: 300px;" v-model="ProtocolType" placeholder="请选择">
                      <el-option
                        v-for="item in ProtocolTypes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <!--api转发地址-->
                  <div style="margin-top: 20px;">
                    <p class="lh_15">
                      <span>转发地址&nbsp;:&nbsp;</span>
                      <el-tooltip class="item" effect="dark" content="目前你只支持Http协议接口" placement="top">
                        <span><i class="el-icon-info"></i></span>
                      </el-tooltip>
                      <br>
                    </p>
                    <el-input style="width: 500px;" placeholder="请输入内容" v-model="ApiUrl">
                      <template slot="prepend">Http://</template>
                    </el-input>
                  </div>
                  <!--api后端地址-->
                  <div style="margin-top: 20px;">
                    <p class="lh_15">
                      <span>后端地址&nbsp;:&nbsp;</span>
                      <br>
                    </p>
                    <el-input style="width: 500px;" placeholder="请输入内容" v-model="BackendUrl">
                    </el-input>
                  </div>
                  <!--api返回数据格式-->
                  <div style="margin-top: 20px;">
                    <p class="lh_15"><span>返回格式&nbsp;:&nbsp;</span><br></p>
                    <el-select style="width: 300px;" v-model="ApiReturnType" placeholder="请选择">
                      <el-option
                        v-for="item in ReturnTypes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <!--api请求方式-->
                  <div style="margin-top: 20px;">
                    <p class="lh_15"><span>请求方式&nbsp;:&nbsp;</span><br></p>
                    <el-radio v-model="ApiMethod" label="GET">GET</el-radio>
                    <el-radio v-model="ApiMethod" label="POST">POST</el-radio>
                    <el-radio v-model="ApiMethod" label="HEAD">HEAD</el-radio>
                    <el-radio v-model="ApiMethod" label="PATCH">PATCH</el-radio>
                    <el-radio v-model="ApiMethod" label="DELETE">DELETE</el-radio>
                    <el-radio v-model="ApiMethod" label="PUT">PUT</el-radio>
                    <el-radio v-model="ApiMethod" label="OPTIONS">OPTIONS</el-radio>
                  </div>
                  <!--api请求超时时间-->
                  <div style="margin-top: 20px;">
                    <p class="lh_15"><span >超时限制(ms)&nbsp;:&nbsp;</span>
                      <el-tooltip class="item" effect="dark" content="网关转发时若遇到后端超时未返回，此时网关会对客户端返回504表示超时" placement="top">
                        <span><i class="el-icon-info"></i></span>
                      </el-tooltip><br>
                    </p>
                    <el-input style="width: 300px;" v-model.number="ApiTimeout" placeholder="请输入内容"></el-input>
                  </div>
                  <!--api限流-->
                  <div style="margin-top: 20px;">
                    <p class="lh_15"><span >流量限制&nbsp;:&nbsp;</span>
                      <el-tooltip class="item" effect="dark" content="网关允许的最大并发数量" placement="top">
                        <span><i class="el-icon-info"></i></span>
                      </el-tooltip><br>
                    </p>
                    <el-input style="width: 300px;" v-model.number="RateLimitNum" placeholder="请输入内容"></el-input>
                  </div>
                  <!--api请求重试次数-->
                  <div style="margin-top: 20px;">
                    <p class="lh_15"><span >重试次数&nbsp;:&nbsp;</span>
                      <el-tooltip class="item" effect="dark" content="网关转发失败后，再次对后端发送请求的次数" placement="top">
                        <span><i class="el-icon-info"></i></span>
                      </el-tooltip><br>
                    </p>
                    <el-input style="width: 300px;" v-model.number="ApiRetry" placeholder="请输入内容"></el-input>
                  </div>
                  <!--api请求错误返回-->
                  <div style="margin-top: 20px;">
                    <p class="lh_15"><span >异常返回&nbsp;:&nbsp;</span>
                      <el-tooltip class="item" effect="dark" content="当API出现超时等异常时，网关会返回以下内容" placement="top">
                        <span><i class="el-icon-info"></i></span>
                      </el-tooltip><br>
                    </p>
                    <el-input
                      style="width: 300px;"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      placeholder="请输入内容"
                      v-model="ApiReturnContent">
                    </el-input>
                  </div>
                  <div style="margin-top: 25px;">
                    <p class="lh_25">
                      <el-button type="primary" @click="CreateApiDetail">保存</el-button>
                    </p>
                  </div>
                </div>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="api组管理" name="second">
              <div class="groupToolBar"
                   style="margin-top: 5px;margin-bottom: 20px; justify-content: space-between; display: flex;"
              >
                <el-button type="primary" icon="el-icon-plus" size="small" @click="showCreateApiGroupDetailDialog">新建</el-button>
                <div>
                  <el-input
                    placeholder="请输入组名，支持模糊搜索"
                    v-model="searchGroup"
                    clearable style="width: 300px;">
                  </el-input>
                  <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
                </div>
              </div>
              <el-table
                :data="ApiGroupsDetailsData"
                height="610"
                border
                stripe
                style="width: 100%">
                <el-table-column
                  prop="ApiGroupName"
                  label="组名称"
                  width="300">
                </el-table-column>
                <el-table-column
                  prop="Description"
                  label="组描述"
                  width="560">
                </el-table-column>
                <el-table-column
                  prop="operation"
                  label="操作">
                  <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                      <el-button @click="showEditApiGroupDetailDialog(scope.row)" type="primary"  icon="el-icon-edit" circle></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top">
                      <el-popconfirm
                        title="该操作会删除组内所有api，确认删除吗？"
                        @onConfirm="DeleteApiGroupDetail(scope.row)"
                      >
                        <el-button type="danger" slot="reference" icon="el-icon-delete" circle></el-button>
                      </el-popconfirm>
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="api详情列表" name="third">
              <div class="apiToolBar"
                   style="margin-top: 5px;margin-bottom: 20px; justify-content: space-between; display: flex;"
              >
                <div>
                  <el-input
                    placeholder="请输入api名称，支持模糊搜索"
                    v-model="searchGroup"
                    clearable style="width: 300px;">
                  </el-input>
                  <el-select style="width: 150px;" clearable v-model="ApiGroup" placeholder="请选择">
                    <el-option
                      v-for="item in ApiGroupsDetailsData"
                      :key="item.ApiGroupName"
                      :label="item.ApiGroupName"
                      :value="item.ApiGroupName">
                    </el-option>
                  </el-select>
                  <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
                </div>
              </div>
              <el-table
                :data="ApiDetailsData"
                height="610"
                border
                stripe
                style="width: 100%">
                <el-table-column
                  prop="ApiName"
                  label="API"
                  width="270">
                </el-table-column>
                <el-table-column
                  prop="ApiMethod"
                  label="请求方式"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="ApiGroup"
                  label="组"
                  width="110">
                </el-table-column>
                <el-table-column
                  prop="ApiUrl"
                  label="请求URL"
                  width="340">
                </el-table-column>
                <el-table-column
                    prop="BackendUrl"
                    label="后端URL"
                    width="340">
                </el-table-column>
                <el-table-column
                  prop="operation"
                  label="操作">
                  <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                      <el-button @click="showEditApiDetailDialog(scope.row)" type="primary"  icon="el-icon-edit" circle></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top">
                      <el-popconfirm
                        title="确认删除吗？"
                        @onConfirm="DeleteApiDetail(scope.row)"
                      >
                        <el-button type="danger" slot="reference" icon="el-icon-delete" circle></el-button>
                      </el-popconfirm>
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-scrollbar>
    <el-dialog title="编辑组内容" :visible.sync="editApiGroupDialogFormVisible">
      <el-form :model="ApiGroupDetailEditForm">
        <el-form-item label="组名称" :label-width="formLabelWidth">
          <el-input v-model="ApiGroupDetailEditForm.ApiGroupName" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="组描述" :label-width="formLabelWidth">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                    v-model="ApiGroupDetailEditForm.Description" autocomplete="off">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editApiGroupDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditApiGroupDetail">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="创建组" :visible.sync="createApiGroupDialogFormVisible">
      <el-form :model="ApiGroupDetailCreateForm">
        <el-form-item label="组名称" :label-width="formLabelWidth">
          <el-input v-model="ApiGroupDetailCreateForm.ApiGroupName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="组描述" :label-width="formLabelWidth">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                    v-model="ApiGroupDetailCreateForm.Description" autocomplete="off">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createApiGroupDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="CreateApiGroupDetail">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="api详情修改" :visible.sync="editApiDetailDialogFormVisible">
      <el-form :model="ApiDetailsEditForm">
        <el-form-item label="组名称" :label-width="formLabelWidth">
          <el-select style="width: 100px;" clearable v-model="ApiDetailsEditForm.ApiGroup">
            <el-option
              v-for="item in ApiGroupsDetailsData"
              :key="item.ApiGroupName"
              :label="item.ApiGroupName"
              :value="item.ApiGroupName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="api名称" :label-width="formLabelWidth">
          <el-input style="width: 300px;" disabled v-model="ApiDetailsEditForm.ApiName" ></el-input>
        </el-form-item>
        <!--api服务端协议-->
        <el-form-item label="服务端协议" :label-width="formLabelWidth">
          <el-select style="width: 300px;" v-model="ApiDetailsEditForm.ProtocolType">
            <el-option
              v-for="item in ProtocolTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转发地址" :label-width="formLabelWidth">
          <el-input style="width: 500px;" v-model="ApiDetailsEditForm.ApiUrl">
            <template slot="prepend">Http://</template>
          </el-input>
        </el-form-item>
        <el-form-item label="后端地址" :label-width="formLabelWidth">
          <el-input style="width: 500px;" v-model="ApiDetailsEditForm.BackendUrl"></el-input>
        </el-form-item>
        <el-form-item label="返回格式" :label-width="formLabelWidth">
          <el-select style="width: 300px;" v-model="ApiDetailsEditForm.ApiReturnType">
            <el-option
              v-for="item in ReturnTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请求方式" :label-width="formLabelWidth">
          <el-radio v-model="ApiDetailsEditForm.ApiMethod" label="GET">GET</el-radio>
          <el-radio v-model="ApiDetailsEditForm.ApiMethod" label="POST">POST</el-radio>
          <el-radio v-model="ApiDetailsEditForm.ApiMethod" label="HEAD">HEAD</el-radio>
          <el-radio v-model="ApiDetailsEditForm.ApiMethod" label="PATCH">PATCH</el-radio>
          <el-radio v-model="ApiDetailsEditForm.ApiMethod" label="DELETE">DELETE</el-radio>
          <el-radio v-model="ApiDetailsEditForm.ApiMethod" label="PUT">PUT</el-radio>
          <el-radio v-model="ApiDetailsEditForm.ApiMethod" label="OPTIONS">OPTIONS</el-radio>
        </el-form-item>
        <el-form-item label="流量限制" :label-width="formLabelWidth">
          <el-input style="width: 300px;" v-model.number="ApiDetailsEditForm.RateLimitNum"></el-input>
        </el-form-item>
        <el-form-item label="超时限制(ms)" :label-width="formLabelWidth">
          <el-input style="width: 300px;" v-model.number="ApiDetailsEditForm.ApiTimeout"></el-input>
        </el-form-item>
        <el-form-item label="重试次数" :label-width="formLabelWidth">
          <el-input style="width: 300px;" v-model.number="ApiDetailsEditForm.ApiRetry"></el-input>
        </el-form-item>
        <el-form-item label="异常返回" :label-width="formLabelWidth">
          <el-input
            style="width: 300px;"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="ApiDetailsEditForm.ApiReturnContent">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editApiDetailDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditApiDetail">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'ApiManager',
  data () {
    return {
      editApiGroupDialogFormVisible: false,
      createApiGroupDialogFormVisible: false,
      editApiDetailDialogFormVisible: false,
      ApiDetailsEditForm: {
        id: '1',
        ApiName: 'test',
        ApiMethod: 'POST',
        ProtocolType: 'http',
        ApiUrl: 'http://test.com/getApi',
        BackendUrl: '/api/v1/getApis',
        ApiGroup: '112',
        ApiReturnType: 'JSON',
        RateLimitNum: 2000,
        ApiTimeout: 3000,
        ApiRetry: 3,
        ApiReturnContent: ''
      },
      ApiDetailsData: [{
        id: '1',
        ApiName: 'test',
        ApiMethod: 'POST',
        ApiUrl: 'http://test.com/getApi',
        BackendUrl: '/api/v1/getApis',
        ApiGroup: '112',
        ApiReturnType: 'JSON',
        ApiTimeout: 3000,
        ApiRetry: 3,
        ApiReturnContent: ''
      }],
      ApiGroupDetailCreateForm: {
        id: '',
        ApiGroupName: '',
        Description: ''
      },
      ApiGroupDetailEditForm: {
        id: '',
        ApiGroupName: '',
        Description: ''
      },
      ApiGroupsDetailsData: [],
      ProtocolTypes: [{
        value: 'http',
        label: 'HTTP'
      }, {
        value: 'gRPC',
        label: 'gRPC'
      }],
      ReturnTypes: [{
        value: 'RAW',
        label: 'RAW'
      }, {
        value: 'JSON',
        label: 'JSON'
      }, {
        value: 'XML',
        label: 'XML'
      }],
      ApiGroup: '',
      ApiReturnType: 'JSON',
      ApiUrl: 'test.com/getApis',
      BackendUrl: '/api/v1/getApis',
      ApiName: 'test',
      ProtocolType: 'http',
      ApiMethod: 'POST',
      ApiTimeout: 3000,
      RateLimitNum: 2000,
      ApiRetry: 3,
      ApiReturnContent: '',
      formLabelWidth: '120px',
      searchGroup: '',
      apiManagerActiveName: 'first'
    }
  },
  // 存放 方法
  methods: {
    showEditApiGroupDetailDialog (row) {
      this.editApiGroupDialogFormVisible = true
      this.ApiGroupDetailEditForm = row
    },
    showCreateApiGroupDetailDialog () {
      this.createApiGroupDialogFormVisible = true
    },
    showEditApiDetailDialog (row) {
      this.editApiDetailDialogFormVisible = true
      this.ApiDetailsEditForm = row
    },
    // 创建ApiGroup详情，提交表单
    async CreateApiGroupDetail () {
      this.createApiGroupDialogFormVisible = false
      // 上传表单
      const response = await this.$http.post('/createApiGroupDetail', this.ApiGroupDetailCreateForm)
      console.log(response)
      this.$message.success('新增api group详情成功!')
      this.QueryApiGroupList()
    },
    // 修改ApiGroup详情，提交表单
    async EditApiGroupDetail () {
      this.editApiGroupDialogFormVisible = false
      // 上传表单
      const response = await this.$http.post('/updateApiGroupDetail', this.ApiGroupDetailEditForm)
      this.$message.success('修改api group详情成功!')
      console.log(response)
    },
    // 创建Api详情，提交表单
    async CreateApiDetail () {
      const ApiDetailsCreateForm = {
        'ApiName': this.ApiName,
        'ApiMethod': this.ApiMethod,
        'ProtocolType': this.ProtocolType,
        'ApiUrl': this.ApiUrl,
        'BackendUrl': this.BackendUrl,
        'ApiGroup': this.ApiGroup,
        'ApiReturnType': this.ApiReturnType,
        'RateLimitNum': this.RateLimitNum,
        'ApiTimeout': this.ApiTimeout,
        'ApiRetry': this.ApiRetry,
        'ApiReturnContent': this.ApiReturnContent
      }
      console.log(ApiDetailsCreateForm)
      // 上传表单
      const response = await this.$http.post('/createApiDetail', ApiDetailsCreateForm)
      console.log(response)
      this.$message.success('新增api详情成功!')
      this.QueryApiDetailList()
    },
    // 获取Api详情列表
    async QueryApiDetailList () {
      const response = await this.$http.get('/queryApiDetailList')
      console.log(response)
      this.ApiDetailsData = response.data['data']
    },
    // 获取ApiGroup详情列表
    async QueryApiGroupList () {
      const response = await this.$http.get('/queryApiGroupList')
      console.log(response)
      this.ApiGroupsDetailsData = response.data['data']
    },
    // 修改Api详情，提交表单
    async EditApiDetail () {
      this.editApiDetailDialogFormVisible = false
      // 上传表单
      console.log(this.ApiDetailsEditForm)
      const response = await this.$http.post('/updateApiDetail', this.ApiDetailsEditForm)
      console.log(response)
      this.$message.success('修改api详情成功!')
    },
    // 删除Api详情，提交表单
    async DeleteApiDetail (row) {
      // 上传表单
      const response = await this.$http.post('/deleteApiDetail', row)
      console.log(response)
      this.QueryApiDetailList()
      this.$message.success('删除api详情成功!')
    },
    // 删除Api group详情，提交表单
    async DeleteApiGroupDetail (row) {
      // 上传表单
      this.ApiGroupDetailEditForm = row
      console.log(row)
      console.log(this.ApiGroupDetailEditForm)
      const response = await this.$http.post('/deleteApiGroupDetail', this.ApiGroupDetailEditForm)
      console.log(response)
      this.QueryApiGroupList()
      this.$message.success('删除api group详情成功!')
    }
  },
  created: function () {
  },
  mounted: function () {
    this.QueryApiDetailList()
    this.QueryApiGroupList()
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
