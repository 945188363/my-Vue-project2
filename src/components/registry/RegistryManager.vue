<template>
  <div class="outSide">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>注册方式与负载</el-breadcrumb-item>
        <el-breadcrumb-item>服务注册方式</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="inSide">
      <div class="groupToolBar">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="showCreateRegistryDialog">新建服务注册方式</el-button>
        <div>
          <el-input
            placeholder="请输入服务注册方式名称，支持模糊搜索"
            v-model="searchRegistry"
            @clear="QueryRegistry"
            clearable
            style="width: 300px;">
          </el-input>
          <el-button type="primary" icon="el-icon-search" size="small" @click="SearchRegistryByName">搜索</el-button>
        </div>
      </div>
      <el-table
        :data="RegistrysData"
        height="100%"
        border
        stripe
        style="width: 100%">
        <el-table-column
          prop="Name"
          label="服务注册方式名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="RegistryType"
          label="注册中心选择"
          width="560">
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
              <el-button @click="showEditRegistryDialog(scope.row)" type="primary"  icon="el-icon-edit" circle></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-popconfirm
                title="确认删除吗？"
                @onConfirm="DeleteRegistry(scope.row)"
              >
                <el-button type="danger" slot="reference" icon="el-icon-delete" circle></el-button>
              </el-popconfirm>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--弹窗-->
    <el-dialog title="创建新的服务注册方式" :visible.sync="createRegistryDialogFormVisible">
      <el-form :model="registryCreateForm">
        <el-form-item label="服务注册方式名称" :label-width="formLabelWidth">
          <el-input v-model="registryCreateForm.Name" style="width: 300px" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="注册中心类型" :label-width="formLabelWidth">
          <el-select style="width: 300px;" clearable v-model="registryCreateForm.RegistryType" placeholder="请选择">
            <el-option
              v-for="item in registryCentersData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="接入地址" :label-width="formLabelWidth">
          <el-input v-model="registryCreateForm.Addr" style="width: 300px" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createRegistryDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="CreateRegistry">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑服务注册方式" :visible.sync="editRegistryDialogFormVisible">
      <el-form :model="registryEditForm">
        <el-form-item label="服务注册方式名称" :label-width="formLabelWidth">
          <el-input v-model="registryEditForm.Name" disabled style="width: 300px" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="注册中心类型" :label-width="formLabelWidth">
          <el-select style="width: 300px;" clearable disabled  v-model="registryEditForm.RegistryType" placeholder="请选择">
            <el-option
              v-for="item in registryCentersData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="接入地址" :label-width="formLabelWidth">
          <el-input v-model="registryEditForm.Addr" style="width: 300px" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editRegistryDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="UpdateRegistry">确 定</el-button>`*
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'RegistryManager',
  data: function () {
    return {
      RegistrysData: [
        {
          id: 1,
          Name: 'consul注册方式',
          RegistryType: 'Consul',
          Addr: '192.168.1.1:8888'
        },
        {
          id: 2,
          Name: 'etcd注册方式',
          RegistryType: 'Etcd',
          Addr: '192.168.1.1:8888'
        }
      ],
      registryCreateForm: {
        Name: 'consul注册方式',
        RegistryType: 'Consul',
        Addr: '192.168.1.1:8888'
      },
      registryEditForm: {
        id: 1,
        Name: 'consul注册方式',
        RegistryType: 'Consul',
        Addr: '192.168.1.1:8888'
      },
      registryCenter: '',
      registryCentersData: [
        {
          value: 'Eureka',
          label: 'Eureka'
        },
        {
          value: 'Consul',
          label: 'Consul'
        },
        {
          value: 'Zookeeper',
          label: 'Zookeeper'
        },
        {
          value: 'Etcd',
          label: 'Etcd'
        },
        {
          value: 'Nacos',
          label: 'Nacos'
        }
      ],
      createRegistryDialogFormVisible: false,
      editRegistryDialogFormVisible: false,
      searchRegistry: '',
      formLabelWidth: '180px'
    }
  },
  // 存放 方法
  methods: {
    showCreateRegistryDialog () {
      this.createRegistryDialogFormVisible = true
    },
    async SearchRegistryByName () {
      const regParam = {
        'Name': this.searchRegistry
      }
      const response = await this.$http.post('/queryRegistryByName', regParam)
      console.log(response)
      this.RegistrysData = response.data['data']
    },
    async CreateRegistry () {
      this.createRegistryDialogFormVisible = false
      const response = await this.$http.post('/createRegistry', this.registryCreateForm)
      console.log(response)
      this.$message.success('创建注册中心成功!')
      this.QueryRegistry()
    },
    async UpdateRegistry () {
      this.editRegistryDialogFormVisible = false
      console.log(this.registryEditForm)
      const response = await this.$http.post('/updateRegistry', this.registryEditForm)
      console.log(response)
      this.$message.success('修改注册中心成功!')
      this.QueryRegistry()
    },
    async QueryRegistry () {
      const response = await this.$http.get('/queryRegistry')
      console.log(response)
      this.RegistrysData = response.data['data']
    },
    async DeleteRegistry (row) {
      // 上传表单
      this.registryEditForm = row
      const response = await this.$http.post('/deleteRegistry', this.registryEditForm)
      console.log(response)
      this.QueryRegistry()
      this.$message.success('删除注册中心成功!')
    },
    showEditRegistryDialog (row) {
      this.editRegistryDialogFormVisible = true
      this.registryEditForm = row
    }
  },
  created: function () {
  },
  mounted: function () {
    this.QueryRegistry()
  }
}
</script>

<style scoped>
  .outSide{
    height: 85%;
  }
  .inSide{
    margin-top: 25px;
    margin-bottom: 20px;
    height: 100%;
  }
  .groupToolBar{
    margin-top: 5px;
    margin-bottom: 20px;
    justify-content: space-between;
    display: flex;
  }
</style>
