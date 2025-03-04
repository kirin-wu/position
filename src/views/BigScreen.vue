<!-- 屏幕最大化 -->
<template>
  <div :class="{ fullMapWrapper: isFullScreen }">
    大屏
    <div style="cursor: pointer" class="fullMap" @click="fullMap">按钮</div>
    <div @click="dialogVisible = true">弹框</div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" append-to-body>
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        isFullScreen: false, // 是否全屏
      }
    },
    mounted() {
      // 监听全屏状态变化
      document.addEventListener('fullscreenchange', this.onFullScreenChange)
      document.addEventListener('webkitfullscreenchange', this.onFullScreenChange) // Safari
      document.addEventListener('mozfullscreenchange', this.onFullScreenChange) // Firefox
      document.addEventListener('msfullscreenchange', this.onFullScreenChange) // IE/Edge
    },
    beforeDestroy() {
      //   dateTimer && clearTimeout(dateTimer) // 大屏时间的定时器
      // window.removeEventListener('keydown', this.handleKeydown);
      document.removeEventListener('fullscreenchange', this.onFullScreenChange)
      document.removeEventListener('webkitfullscreenchange', this.onFullScreenChange)
      document.removeEventListener('mozfullscreenchange', this.onFullScreenChange)
      document.removeEventListener('msfullscreenchange', this.onFullScreenChange)
    },

    methods: {
      /** 全屏 */
      fullMap() {
        console.log('全屏')
        this.isFullScreen = !this.isFullScreen
        //判断是否处于全屏模式
        if (document.fullscreenElement) {
          //退出全屏
          document.exitFullscreen()
          this.isFullScreen = false
          //处于全屏模式的元素
          console.log(document.fullscreenElement) //null
        } else {
          //全屏显示， 让body全屏
          document.body.requestFullscreen()
          this.isFullScreen = true
          //处于全屏模式的元素
          console.log(document.fullscreenElement) //<html lang="en">......</html>
        }
      },
      onFullScreenChange() {
        if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
          this.isFullScreen = true
        } else {
          this.isFullScreen = false
        }
      },
    },
  }
</script>
<style scoped lang="less">
  .fullMapWrapper {
    position: fixed !important;
    width: 100vw !important;
    height: 100vh !important;
    z-index: 1500 !important;
    top: 0 !important;
    left: 0 !important;
  }
</style>
