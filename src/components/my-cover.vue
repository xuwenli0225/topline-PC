<template>
  <div class="my-cover">
    <div class="btn_img" @click="openDialog()">
      <img :src="value || coverImageUrl" />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="720px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <el-radio-group @change="changeCollect" v-model="reqParams.collect" size="small">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <div class="img_list">
            <div
              :class="{selected: item.url === selectedImageUrl}"
              @click="selectedImage(item.url)"
              class="img_item"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" />
            </div>
          </div>
          <el-pagination
            background
            layout="prev, pager, next"
            hide-on-single-page
            @current-change="changePager"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            :total="total"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            name="image"
            :headers="setToken"
            :show-file-list="false"
            :on-success="uploadSuccess"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import defaultImg from '@/assets/default.png'
export default {
  name: 'my-cover',
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      activeName: 'image',
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      images: [],
      total: 0,
      selectedImageUrl: null,
      uploadImageUrl: null,
      coverImageUrl: defaultImg
    }
  },
  computed: {
    setToken () {
      const token = JSON.parse(window.sessionStorage.getItem('userinfo')).token
      return { Authorization: 'Bearer ' + token }
    }
  },
  methods: {
    confirmImage () {
      if (this.activeName === 'image') {
        if (!this.selectedImageUrl) {
          return this.$message.warning('请先选中一张图片')
        }
        this.$emit('input', this.selectedImageUrl)
      }
      if (this.activeName === 'upload') {
        if (!this.uploadImageUrl) {
          return this.$message.warning('请先上传一张图片')
        }
        this.$emit('input', this.uploadImageUrl)
      }
      this.dialogVisible = false
    },
    uploadSuccess (res) {
      this.uploadImageUrl = res.data.url
      this.$message.success('上传图片成功')
    },
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    openDialog () {
      this.selectedImageUrl = null
      this.uploadImageUrl = null
      this.activeName = 'image'
      this.dialogVisible = true
      this.getImages()
    },
    changeCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
.btn_img {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.img_list {
  margin-top: 15px;
  .img_item {
    width: 150px;
    height: 120px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 15px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    // 给.img_item加上一个类.selected
    // 这个类上包含一个::after的伪元素
    // &在less中表示作用：连接符
    // .a{.b{}}  ===> .a .b{}  后代选择器
    // .a{&.b{}} ===> .a.b{} 交集选择器
    // 解析后：.img_list.selected::after{}  目标
    &.selected::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3) url(../assets/selected.png) no-repeat
        center / 50px 50px;
    }
  }
}
</style>
