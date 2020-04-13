<template>
  <el-select v-model="chid" placeholder="请选择" clearable>
    <el-option v-for="item in channelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'ChannelCom',
  props: {
    cid: {
      default: 0
    }
  },
  watch: {
    cid: function (newV, oldV) {
      this.chid = newV
    },
    chid: function (newV, oldV) {
      this.$emit('slt', this.chid)
    }
  },
  data () {
    return {
      chid: '',
      channelList: []
    }
  },
  created () {
    this.getChannelList()
  },
  methods: {
    getChannelList () {
      const pro = this.$http.get('/channels')
      pro
        .then(result => {
          if (result.data.message === 'OK') {
            if (result.data.message === 'OK') {
              this.channelList = result.data.data.channels
            }
          }
        })
        .catch(err => {
          return this.$message.error('获得频道错误：' + err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
