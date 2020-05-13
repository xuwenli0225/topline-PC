<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>粉丝统计</span>
    </div>
    <!--创建图像显示容器占位符-->
    <div id="main" ref="main3" style="width:750px;height:400px;"></div>
  </el-card>
</template>

<script>
// 引入echarts
import echarts from 'echarts'

export default {
  // 钩子函数created/mounted，使得页面加载过程中直接调用methods方法执行
  // 如果方法操作data，就通过created触发
  // 如果方法操作页面dom元素，就通过mounted触发
  // mounted: 代表页面内容被解析完成，并完成了页面回填操作
  mounted () {
    this.paintPic()
  },

  methods: {
    // 生成图像
    paintPic () {
      var myChart = echarts.init(this.$refs.main3)

      // 饼状图核心数据部分
      var option = {
        title: {
          text: '站点用户访问来源',
          subtext: '纯属虚构',
          x: 'right'
        },
        // 鼠标悬停显示效果
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // 图例
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        // 系列数据
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>
