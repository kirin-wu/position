<!--  -->
<template>
  <div>
    <div id="pos-area">
      <p id="demo">点击下面的按钮，获得对应信息：<br /></p>
    </div>

    <div id="btn-area">
      <button @click="geolocation.getLocation(showPosition, showErr, options)">获取精确定位信息</button>
      <button @click="geolocation.getIpLocation(showPosition, showErr)">获取粗糙定位信息</button>
      <button @click="showWatchPosition">开始监听位置</button>
      <button @click="showClearWatch">停止监听位置</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        geolocation: null,
        options: { timeout: 8000 },
        positionNum: 0,
      }
    },
    mounted() {
      this.show()
    },
    methods: {
      show() {
        var geolocation = new window.qq.maps.Geolocation('NQ5BZ-N6ICW-UPFRE-O2UGM-P22AO-P3BYI', 'myapp')
        this.geolocation = geolocation

        document.getElementById('pos-area').style.height = document.body.clientHeight - 200 + 'px'
      },
      showPosition(position) {
        this.positionNum++
        document.getElementById('demo').innerHTML += '序号：' + this.positionNum
        document.getElementById('demo').appendChild(document.createElement('pre')).innerHTML = JSON.stringify(position, null, 4)
        document.getElementById('pos-area').scrollTop = document.getElementById('pos-area').scrollHeight
      },

      showErr() {
        this.positionNum++
        document.getElementById('demo').innerHTML += '序号：' + this.positionNum
        document.getElementById('demo').appendChild(document.createElement('p')).innerHTML = '定位失败！'
        document.getElementById('pos-area').scrollTop = document.getElementById('pos-area').scrollHeight
      },

      showWatchPosition() {
        document.getElementById('demo').innerHTML += '开始监听位置！<br /><br />'
        this.geolocation.watchPosition(this.showPosition)
        document.getElementById('pos-area').scrollTop = document.getElementById('pos-area').scrollHeight
      },

      showClearWatch() {
        this.geolocation.clearWatch()
        document.getElementById('demo').innerHTML += '停止监听位置！<br /><br />'
        document.getElementById('pos-area').scrollTop = document.getElementById('pos-area').scrollHeight
      },
    },
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    border: 0;
  }
  body {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
  }
  #pos-area {
    background-color: #009ddc;
    margin-bottom: 10px;
    width: 100%;
    overflow: scroll;
    text-align: left;
    color: white;
  }
  #demo {
    padding: 8px;
    font-size: small;
  }
  #btn-area {
    height: 100px;
  }
  button {
    margin-bottom: 10px;
    padding: 12px 8px;
    width: 42%;
    border-radius: 8px;
    background-color: #009ddc;
    color: white;
  }
</style>
