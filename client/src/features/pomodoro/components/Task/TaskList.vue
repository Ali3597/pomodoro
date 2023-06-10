
<script setup lang="ts">
import { useTask } from '@/shared/stores/TaskStore';
import TaskOne from './TaskOne.vue';


const taskStore = useTask()
function activeTask(id: string) {
    taskStore.activeTask(id)
}
function toggleTask(id: string) {
    taskStore.toggleTask(id)
}
</script>

<template >
    <div class="tasks">
        <TaskOne @active-task="activeTask" @toggle-task="toggleTask" v-for="task in taskStore.tasks"
            :key="task._id" :task="task" :open="task._id==taskStore.openId" :active="task._id==taskStore.activeTaskId" />
    </div>
</template>

<style lang="css">
.tasks {
    margin-top: 1%;
    height: fit-content;
}
</style>