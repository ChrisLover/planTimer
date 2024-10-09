<template>
  <!-- <ScaleBox> -->
  <div class="container">
    <div class="planText"><el-icon><Grape /></el-icon>计划</div>
    <!-- 可以在这里添加添加新计划的按钮或表单 -->
    <div class="top">
      <el-input v-model="newPlanName" placeholder="新计划名称" style="width: 80%;" />
      <el-button size="small" @click="addNewPlan" icon="plus" circle />
    </div>
    <ul>
      <li v-for="plan in store.plans" :key="plan.id">
        <PlanItem :plan="plan" />
      </li>
    </ul>
  </div>
  <!-- </ScaleBox> -->
</template>

<script setup>
import { ref } from 'vue';
import { usePlansStore } from '../store/usePlansStore';
import PlanItem from './PlanItem.vue';
import ScaleBox from './ScaleBox.vue';

const plans = ref([]);
const store = usePlansStore();

// 用于输入新计划名称的响应式变量  
const newPlanName = ref('');


// 添加新计划的函数（这里只是一个示例，具体实现可能需要更复杂的表单）  
function addNewPlan() {
  // 这里只是一个示例，实际应用中你可能需要一个表单来收集计划的数据   
  if (newPlanName.value.trim() !== '') {
    // 假设使用时间戳作为唯一ID  
    const newId = Date.now();
    // 假设每个计划都有默认的持续时间，这里设为0分钟  
    const newPlan = { id: newId, name: newPlanName.value, duration: 0 };
    // 添加到Pinia store 
    store.addPlan(newPlan);
    // 清空输入框  
    newPlanName.value = '';
  }


  // 注意：由于我们已经假设PlanItem会处理更新，所以这里不需要手动更新plans.value  
  // 因为Pinia store的更新会自动反映到任何使用它的组件中  
}

// 注意：在真实应用中，你可能不需要将plans作为ref在PlanList组件中保存  
// 因为你可以直接从Pinia store中访问它，并通过计算属性或watcher来响应变化  
// 这里为了展示目的，我们仍然保留了plans ref  
</script>

<!-- 如果需要，可以在这里添加样式 -->
<style scoped>
.container {
  width: 375px;
  height: 667px;
  overflow: auto;
  background: pink;
}

.planText {
  color: antiquewhite;
  font-size: 22px;
  margin: 20px 0 20px 10px;
}

.top {
  display: flex;
  align-items: center;
  margin: 10px 0;
}
.top button {
  margin-top: 0;
  margin-left: 5px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

button {
  margin-top: 20px;
}
</style>