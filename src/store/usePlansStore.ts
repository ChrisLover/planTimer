// src/stores/usePlansStore.ts  
import { defineStore } from 'pinia';  
  
interface Plan {  
  id: number;  
  // 假设计划还有其他属性，可以根据需要添加  
  name: string;  
  duration: number;
  // ... 其他属性  
}  
  
interface PlansState {  
  plans: Plan[];  
}  
  
export const usePlansStore = defineStore('plans', {  
  state: (): PlansState => ({  
    plans: []  
  }),  
  actions: {  
    addPlan(plan: Plan) {  
      this.plans.push(plan);  
      this.saveToLocalStorage();  
    },  
    updatePlan(id: number, updates: Partial<Plan>) {  
      const plan = this.plans.find((p: any) => p.id === id);  
      if (plan) {  
        Object.assign(plan, updates);  
        this.saveToLocalStorage();  
      }  
    },  
    deletePlan(id: number) {  
      this.plans = this.plans.filter(p => p.id !== id);  
      this.saveToLocalStorage();  
    },  
    saveToLocalStorage() {  
      localStorage.setItem('plans', JSON.stringify(this.plans));  
    },  
    loadFromLocalStorage() {  
      const plans = localStorage.getItem('plans');  
      if (plans) {  
        this.plans = JSON.parse(plans) as Plan[];  
      }  
    },
    updateDuration(planId: number, duration: number){
      const planToUpdate = this.plans.find(plan => plan.id === planId);  
      if (planToUpdate) {  
        planToUpdate.duration = duration; // 假设每个计划对象都有一个duration属性来存储时长  
      } else {  
        console.error(`No plan found with ID: ${planId}`);  
      }  
    }  
  },  
  getters: {  
    totalPlans: (state): number => state.plans.length  
  }  
});