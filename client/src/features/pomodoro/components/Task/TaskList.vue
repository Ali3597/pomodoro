
<script setup lang="ts">
import { useTask } from '@/shared/stores/TaskStore';
import TaskOne from './TaskOne.vue';


const taskStore = useTask()
function activeTask(id: string) {
    taskStore.activeTask(id)
}
function toggleDoneTask(id: string) {
    taskStore.toggleDoneTask(id)
}
</script>

<template >
    <div class="tasks">
        <TaskOne @active-task="activeTask" @toggle-task="toggleDoneTask" v-for="task in taskStore.tasksDay"
            :key="task._id" :task="task" :active="task._id==taskStore.activeTaskId" />
    </div>
</template>

<style lang="css">
.tasks {
    margin-top: 1%;
    height: fit-content;
}
</style>