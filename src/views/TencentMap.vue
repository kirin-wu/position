<!--  -->
<template>
  <div id="container"></div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        console.log(window)
        var map = new window.TMap.Map(document.getElementById('container'), {
          center: new window.TMap.LatLng(39.916527, 116.397128),
          zoom: 11,
          mapStyleId: 'style1',
        })
        console.log(map)
      },
    },
  }
</script>
<style scoped lang="less">
  #container {
    width: 100%;
    height: 800px;
  }
</style>
