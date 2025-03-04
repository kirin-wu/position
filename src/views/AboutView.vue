<!-- 测试页面 -->
<template>
  <div class="test" data-module="myModule">
    <div class="text">Hello World</div>
  </div>
</template>

<script>
  import { pxToVw } from '@/utils/pxToViewport'
  export default {
    data() {
      return {}
    },
    mounted() {
      this.convertStylePxToVw()
    },
    methods: {
      convertStylePxToVw() {
        // 获取当前组件的根元素
        const module = this.$el

        // 获取组件内的所有 <style> 标签（通常为空，因为样式被提取到 <head>）
        const styleTags = module.querySelectorAll('style')
        console.log(styleTags) // 通常是空的 NodeList
        styleTags.forEach(styleTag => {
          let cssText = styleTag.innerHTML

          console.log(cssText)

          if (cssText.includes('.test') || cssText.includes('.text')) {
            pxToVw(cssText)
          }
        })
      },
    },
  }
</script>
<style scoped lang="less">
  .test {
    font-size: 20px;
    width: 200px;
    height: 199px;
  }
</style>
