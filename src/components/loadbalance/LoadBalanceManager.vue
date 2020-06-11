<template>
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>注册方式与负载</el-breadcrumb-item>
        <el-breadcrumb-item>负载均衡</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div  style="margin-top: 25px;margin-bottom: 20px">
      <div class="groupToolBar"
           style="margin-top: 5px;margin-bottom: 20px; justify-content: space-between; display: flex;"
      >
        <el-button type="primary" icon="el-icon-plus" size="small" @click="showCreateLoadBalanceDialog">新建负载方式</el-button>
        <div>
          <el-input
            placeholder="请输入负载方式名称，支持模糊搜索"
            v-model="searchLoadBalance"
            clearable style="width: 300px;">
          </el-input>
          <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
        </div>
      </div>
      <el-table
        :data="LoadBalancesData"
        height="610"
        border
        stripe
        style="width: 100%">
        <el-table-column
          prop="Name"
          label="负载名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="RegistryName"
          label="服务注册方式"
          width="340">
        </el-table-column>
        <el-table-column
          prop="Strategy"
          label="负载方式"
          width="340">
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
              <el-button @click="showEditLoadBalanceDialog(scope.row)" type="primary"  icon="el-icon-edit" circle></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-popconfirm
                title="确认删除吗？"
                @onConfirm="DeleteLoadBalance(scope.row)"
              >
                <el-button type="danger" slot="reference" icon="el-icon-delete" circle></el-button>
              </el-popconfirm>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--弹窗-->
    <el-dialog title="创建新的服务负载方式" :visible.sync="createLoadBalanceDialogFormVisible">
      <el-form :model="loadBalanceCreateForm">
        <el-form-item label="负载名称" :label-width="formLabelWidth">
          <el-input v-model="loadBalanceCreateForm.Name" style="width: 300px" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="服务注册方式" :label-width="formLabelWidth">
          <el-select style="width: 300px;" clearable v-model="loadBalanceCreateForm.RegistryName" placeholder="请选择">
            <el-option
              v-for="item in registrysData"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负载均衡方式" :label-width="formLabelWidth">
          <el-select style="width: 300px;" clearable v-model="loadBalanceCreateForm.Strategy" placeholder="请选择">
            <el-option
              v-for="item in loadBalanceTypesData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务" :label-width="formLabelWidth">
          <el-input v-model="loadBalanceCreateForm.ServiceName" style="width: 300px" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createLoadBalanceDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="CreateLoadBalance">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑服务负载方式" :visible.sync="editLoadBalanceDialogFormVisible">
      <el-form :model="loadBalanceEditForm">
        <el-form-item label="负载名称" :label-width="formLabelWidth">
          <el-input v-model="loadBalanceEditForm.Name" disabled style="width: 300px" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="服务注册方式" :label-width="formLabelWidth">
          <el-select style="width: 300px;" clearable  v-model="loadBalanceEditForm.RegistryName" placeholder="请选择">
            <el-option
              v-for="item in registrysData"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负载均衡方式" :label-width="formLabelWidth">
          <el-select style="width: 300px;" clearable v-model="loadBalanceEditForm.Strategy" placeholder="请选择">
            <el-option
              v-for="item in loadBalanceTypesData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务" :label-width="formLabelWidth">
          <el-input v-model="loadBalanceEditForm.ServiceName" style="width: 300px" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editLoadBalanceDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditLoadBalance">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'LoadBalancer',
  data: function () {
    return {
      LoadBalancesData: [
        {
          id: 1,
          Name: '负载一',
          RegistryName: 'consul注册方式',
          Strategy: '轮询',
          ServiceName: 'ip1:1111 ; ip2:2222 10'
        },
        {
          id: 2,
          Name: '负载二',
          RegistryName: 'etcd注册方式',
          Strategy: '随机',
          ServiceName: 'ip1:1111 ; ip2:2222 10'
        }
      ],
      loadBalanceCreateForm: {
        id: 2,
        Name: '负载二',
        RegistryName: 'etcd注册方式',
        Strategy: '随机',
        ServiceName: 'ip1:1111 ; ip2:2222 10'
      },
      loadBalanceEditForm: {
        id: 2,
        Name: '负载二',
        RegistryName: 'etcd注册方式',
        Strategy: '随机',
        ServiceName: 'ip1:1111 ; ip2:2222 10'
      },
      registrysData: [{
        id: 1,
        name: 'consul注册方式'
      },
      {
        id: 2,
        name: 'etcd注册方式'
      }
      ],
      registryCenter: '',
      loadBalanceTypesData: [
        {
          value: 'random',
          label: '随机'
        },
        {
          value: 'roundRobin',
          label: '轮询'
        },
        {
          value: 'hash',
          label: '哈希'
        },
        {
          value: 'weightedRandom',
          label: '加权随机'
        },
        {
          value: 'weightedRoundRobin',
          label: '加权轮询'
        }
      ],
      createLoadBalanceDialogFormVisible: false,
      editLoadBalanceDialogFormVisible: false,
      searchLoadBalance: '',
      formLabelWidth: '180px'
    }
  },
  // 存放 方法
  methods: {
    showCreateLoadBalanceDialog () {
      this.createLoadBalanceDialogFormVisible = true
    },
    async CreateLoadBalance () {
      this.createLoadBalanceDialogFormVisible = false
      const response = await this.$http.post('/createLoadBalance', this.loadBalanceCreateForm)
      console.log(response)
      this.$message.success('创建注册中心成功!')
      this.QueryLoadBalance()
    },
    async QueryLoadBalance () {
      const response = await this.$http.get('/queryLoadBalance')
      console.log(response)
      this.LoadBalancesData = response.data['data']
    },
    showEditLoadBalanceDialog (row) {
      this.editLoadBalanceDialogFormVisible = true
      this.loadBalanceEditForm = row
    },
    async EditLoadBalance () {
      this.editLoadBalanceDialogFormVisible = false
      console.log(this.loadBalanceEditForm)
      const response = await this.$http.post('/updateLoadBalance', this.loadBalanceEditForm)
      console.log(response)
      this.$message.success('修改负载均衡配置成功!')
      this.QueryLoadBalance()
    },
    async DeleteLoadBalance (row) {
      this.loadBalanceEditForm = row
      const response = await this.$http.post('/deleteLoadBalance', this.loadBalanceEditForm)
      console.log(response)
      this.QueryLoadBalance()
      this.$message.success('删除负载均衡配置成功!')
    }
  },
  created: function () {
  },
  mounted: function () {
    this.QueryLoadBalance()
  }
}
</script>

<style scoped>

</style>
