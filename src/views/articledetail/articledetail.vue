<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>文章详情</span>
      <el-button type="primary" size="mini" @click="back">返回</el-button>
    </div>
    <div class="text item" disabled>
      <el-form disabled :model="editForm" label-width="120px" :rules="editFormRules">
        <el-form-item label="标题" prop="title">
          <el-input type="text" v-model="editForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="text" v-model="editForm.content"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="editForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div style="margin-top:10px" v-if="editForm.cover.type===1">
            <my-cover v-model="editForm.cover.images[0]"></my-cover>
          </div>
          <div style="margin-top:10px" v-if="editForm.cover.type===3">
            <my-cover
              style="display:inline-block;margin-right:15px"
              v-model="editForm.cover.images[i-1]"
              v-for="i in 3"
              :key="i"
            ></my-cover>
          </div>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
          <channel-com :cid="editForm.channel_id"></channel-com>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>
<script>
// <quill-editor disabled v-model="editForm.content"></quill-editor>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// import { quillEditor } from 'vue-quill-editor'
import ChannelCom from '@/components/channel.vue'
import MyCover from '@/components/my-cover.vue'
export default {
  // name: 'ArticleEdit',
  components: { ChannelCom, MyCover },
  data () {
    return {
      editForm: {
        title: null,
        content: null,
        cover: {
          type: null,
          images: []
        },
        channel_id: null
      }
    }
  },
  computed: {
    aid () {
      return this.$route.params.aid
    }
  },
  created () {
    this.getArticleByAid()
  },
  methods: {
    back () {
      this.$router.back()
    },
    getArticleByAid () {
      const pro = this.$http.get(`/articles/${this.aid}`)
      pro
        .then(result => {
          if (result.data.message === 'OK') {
            this.editForm = result.data.data
            const len = this.editForm.content.split('').length - 4
            this.editForm.content = this.editForm.content
              .split('')
              .slice(3, len)
              .join('')
          }
        })
        .catch(err => {
          return this.$message.error('获得文章失败：' + err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.el-form /deep/ .ql-editor {
  height: 200px;
}
.box-card .clearfix .el-button {
  float: right;
}
</style>
