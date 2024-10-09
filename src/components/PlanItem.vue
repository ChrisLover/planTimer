<template>
  <div>
    <el-card style="max-width: 480px">
      <template #header>
        <div class="card-header">
          <span>{{ plan.name }}</span>
          <el-icon @click="deletePlan">
            <Delete />
          </el-icon>
        </div>
      </template>
      <!-- Timer component goes here -->
      <Timer :planId="plan.id"></Timer>
      <template #footer>做一个平凡快乐的人</template>
    </el-card>


  </div>
</template>

<script setup>
import { ref } from 'vue';
import { usePlansStore } from '../store/usePlansStore';
import Timer from './Timer.vue'


const store = usePlansStore();
const { plan } = defineProps(['plan']);

function deletePlan() {
  store.deletePlan(plan.id)
}

// Assume plan is passed as a prop  
</script>