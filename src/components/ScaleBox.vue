<template>
  <div class="ScaleBox" ref="ScaleBox" :style="{
    width: width + 'px',
    height: height + 'px',
    '--sacle': scale
  }">
    <slot></slot>
  </div>
</template>

<script setup lang='ts'>

const width = ref(1920)
const height = ref(1080)
const scale = ref(1)  // 初始缩放比例

// 监听窗口大小变化，并防抖
const debounce = (fn: any, delay = 500) => {
  let timer: any
  return () => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn()
    }, delay)
  }
}

// 计算缩放比例
const getScale = () => {
  // 固定好16：9的宽高比，计算出最合适的缩放比
  const whRatio = window.innerHeight / height.value
  const wwRatio = window.innerWidth / width.value
  return wwRatio < whRatio ? wwRatio : whRatio  // 取较小的比例以保持内容完整
}
// 更新缩放比例
const updateScale = () => {
  scale.value = getScale()
}
const handleResize = debounce(updateScale)
// 组件挂载后设置初始缩放比例，并监听窗口大小变化
onMounted(() => {
  updateScale()
  window.addEventListener('resize', handleResize)
})
// 组件卸载时移除事件监听器
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

</script>

<style lang="scss" scoped>
.ScaleBox {
  position: absolute;
  transform: scale(var(--scale)) translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  transform-origin: top left;
  // left: 50%;
  // top: 50%;
  transition: transform 0.3s;
  z-index: 999;
  background: rgba(255, 0, 0, 0.3); // 红色半透明背景
}
</style>