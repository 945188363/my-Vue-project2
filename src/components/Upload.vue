<template>
  <div>
    <el-upload
      class="upload-select"
      action="http://localhost:8899/file/upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :on-change="handleChange"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-exceed="handleExceed"
      :before-upload="beforeUpload"
      multiple
      auto-upload
      :limit="5"
      :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>

    <el-upload
      class="upload-drop"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>
<script>
// import Vue from 'vue';
// import VueResource from 'vue-resource'
// Vue.use(VueResource)
// 如果我们通过全局配置了，请求的数据接口 根域名，则 ，在每次单独发起 http 请求的时候，请求的 url 路径，应该以相对路径开头，前面不能带 /  ，否则 不会启用根路径做拼接；
// Vue.http.options.root = '';
// 全局启用 emulateJSON 选项
// Vue.http.options.emulateJSON = true;
export default {
  name: 'Upload',
  // 存放 数据
  data: function () {
    return {
      fileList: []
    }
  },
  // 存放 方法
  methods: {
    handleChange (file, fileList) {
      console.log(fileList)
    },
    handleRemove (file, fileList) {
      let index = fileList.indexOf(file)
      fileList.splice(index, 1)
    },
    handlePreview (file) {
      return this.$alert(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制未上传 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'

      const isGIF = file.type === 'image/gif'

      const isPNG = file.type === 'image/png'

      const isBMP = file.type === 'image/bmp'

      const imgSizeLimit = file.size < 1 * 1024 * 1024

      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!')
      }
      if (!imgSizeLimit) {
        this.$message.error('上传图片大小不能超过 1MB!')
      }
      return (isJPG || isBMP || isGIF || isPNG) && imgSizeLimit
    },
    handleSuccess (response, file, fileList) {
      return this.$alert(`上传成功！ 文件名：` + file.name)
    },
    handleError (response, file, fileList) {
      return this.$alert(`上传失败，请重试！ 文件名：` + file.name)
    }
  },
  // 存放 过滤器
  filters: {},
  // 自定义 私有指令
  directives: {},
  // 存放 子组件
  // template: '',
  // 注意： 组件中的 所有 props 中的数据，都是通过 父组件传递给子组件的
  // props 中的数据，都是只读的，无法重新赋值
  // props: [], // 把父组件传递过来的 parentmsg 属性，先在 props 数组中，定义一下，这样，才能使用这个数据
  /*  生命周期函数  */
  // 创建期间
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () { },
  // 运行期间
  beforeUpdate () { },
  updated () { },
  // 销毁时期
  beforeDestroy () { },
  destroyed () { }

}
</script>
<style scoped>

</style>
