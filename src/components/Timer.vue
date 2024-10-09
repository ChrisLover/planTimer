<template>
  <div class="container">
    <div class="time">
      <span>{{ time }}</span>
    </div>
    <div class="buttonBox">
      <el-button type="primary" @click="startOrResumeTimer" size="small">开始</el-button>
      <el-button type="danger" @click="pauseTimer" size="small">暂停</el-button>
      <el-button type="info" @click="resetTimer" size="small">重置</el-button>
      <el-button type="success" @click="completeTimer" size="small">完成计时</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { usePlansStore } from '../store/usePlansStore';

const store = usePlansStore();

const time = ref('00:00:00');
let timerId = null;
let seconds = ref(0); // 使用ref来存储秒数  
const { planId } = defineProps(['planId']);

function updateTime() {
  const hours = Math.floor(seconds.value / 3600);
  const minutes = Math.floor((seconds.value % 3600) / 60);
  const secs = seconds.value % 60;
  time.value = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function startOrResumeTimer() {
  if (timerId === null) {
    // 如果计时器未启动，则启动它  
    timerId = setInterval(() => {
      seconds.value++;
      updateTime();
    }, 1000);
  }
  // 如果计时器已经启动但被暂停，这里的代码不会执行新的start逻辑，因为timerId已存在  
}

function pauseTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null; // 重置timerId为null，表示计时器已暂停  
  }
}

function resetTimer() {
  pauseTimer(); // 停止计时器  
  seconds.value = 0; // 重置秒数  
  time.value = '00:00:00'; // 重置时间显示  
}

function completeTimer() {
  pauseTimer(); // 首先停止计时器  

  // 计算总时长（这里只是简单地转换为秒，没有考虑小时和分钟的进位，但您可以根据需要调整）  
  const duration = seconds.value;

  // 现在，将duration保存到与planId相匹配的计划对象中  
  // 在实际应用中，您可能需要使用store的action来更新状态  
  store.updateDuration(planId, duration)

  // 可选：重置秒数和时间显示（取决于您的需求）  
  // seconds.value = 0;  
  // time.value = '00:00:00';  
}

// 当组件卸载时，确保清除定时器  
onUnmounted(() => {
  pauseTimer();
});  
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.time {
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 28px;
}
</style>