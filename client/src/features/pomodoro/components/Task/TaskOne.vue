<script setup lang="ts">
import type { TaskInterface } from "@/shared/interfaces";
import { useTask } from "@/shared/stores/TaskStore";
import TaskNew from "./TaskNew.vue";

defineProps<{
    task: TaskInterface;
    active: boolean;
    open: boolean;
}>();

const taskStore = useTask();

function setNewOpen(id: string | null) {
    taskStore.setNewOpen(id);
}

const emit = defineEmits<{
    (e: "activeTask", id: string): void;
    (e: "toggleTask", id: string): void;
    (e: "deleteTask", id: string): void;
}>();
</script>

<template>
    <div v-if="!open" class="task d-flex">
        <div @click="emit('activeTask', task._id)" class="bordure" :class="active ? 'active' : 'no'"></div>
        <p @click.stop="emit('toggleTask', task._id)" :style="{ backgroundColor: task.done_at ? 'red' : '#DFDFDF' }"
            class="check">
            <font-awesome-icon icon="fa-solid fa-check" color="white" />
        </p>
        <div @click="emit('activeTask', task._id)" class="middle-task">
            <p :style="{ textDecoration: task.done_at ? 'line-through' : 'none' }">
                {{ task.title }}
            </p>
        </div>
        <div class="end-task">
            <p @click="setNewOpen(task._id)" class="edit">
                <font-awesome-icon class="icon" icon="fa-solid fa-pen" color="#868686" />
            </p>
            <p @click="emit('deleteTask', task._id)">
                <font-awesome-icon class="icon" icon="fa-solid fa-trash" color="red" />
            </p>
        </div>
    </div>
    <TaskNew :task="task" v-else />
</template>

<style lang="css" scoped>
.task {
    height: 50px;
    border-radius: 5px;
    background-color: white;
    justify-content: space-around;
    color: black;
    width: 100%;
    margin-bottom: 2%;
    cursor: pointer;
    align-items: center;
}

.middle-task {
    flex: 1;
    height: 100%;
 
    
    padding-left: 5px;
    display: flex;
    align-items: center;
}

.end-task {
   
    height: 100%;
    display: flex;
    width: 50px;
    justify-content: center;
    align-items: center;
}

.end-task>p {
    margin-right: 5%;
}

.bordure {
    width: 50px;
    height: 100%;
}

.bordure.active {
    background-color: black;
}

.task .bordure.no {
    background-color: grey;
}

.bordure.no:hover {
    background-color: black;
}

.check {
    border-radius: 50%;
    margin-left: 2%;
    margin-right: 2%;
    padding: 1%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50%;
}

.check:hover {
    opacity: 0.5;
}

.icon:hover{
    scale: 1.2;
}



</style>
