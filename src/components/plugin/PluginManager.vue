<template>
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>插件设置</el-breadcrumb-item>
        <el-breadcrumb-item>扩展插件</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div  style="margin-top: 25px;margin-bottom: 20px">
      <div class="groupToolBar"
           style="margin-top: 5px;margin-bottom: 20px; justify-content: space-between; display: flex;"
      >
        <span class="pluginInfo">扩展插件</span>
        <div>
          <el-input
            placeholder="请输入插件名称，支持模糊搜索"
            v-model="searchPlugin"
            clearable style="width: 300px;">
          </el-input>
          <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
        </div>
      </div>
      <el-table
        :data="PluginsData"
        height="610"
        border
        stripe
        style="width: 100%">
        <el-table-column
          prop="name"
          label="插件名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          width="450">
        </el-table-column>
        <el-table-column
          prop="type"
          label="插件类型"
          width="200">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          :filters="[{ text: '开启', value: '开启' }, { text: '关闭', value: '关闭' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">close
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status === '开启' ? 'success' : 'warning'"
              disable-transitions>{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PluginManager',
  data () {
    return {
      PluginsData: [
        {
          id: 1,
          name: 'aksk_auth',
          description: 'APIKey,SecretKet鉴权',
          type: '策略',
          status: '开启'
        }, {
          id: 2,
          name: 'basic_auth',
          description: 'Basic鉴权',
          type: '策略',
          status: '开启'
        }, {
          id: 3,
          name: 'ip_restriction',
          description: 'IP黑白名单',
          type: '策略',
          status: '开启'
        }, {
          id: 4,
          name: 'params_transformer',
          description: '参数映射\t',
          type: 'API',
          status: '关闭'
        }, {
          id: 5,
          name: 'extra_params',
          description: '额外参数',
          type: 'API',
          status: '关闭'
        }
      ],
      searchPlugin: ''
    }
  },
  methods: {
    filterTag (value, row) {
      return row.status === value
    }
  }
}
</script>

<style scoped>
  .pluginInfo{
    font-size: 25px;
  }
  .pluginStatus{
    color: darkseagreen;
  }
</style>
