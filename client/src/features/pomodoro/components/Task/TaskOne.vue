
<script setup lang="ts">
import type { TaskInterface } from '@/shared/interfaces';
import { useTask } from '@/shared/stores/TaskStore';
import TaskNew from './TaskNew.vue';



defineProps<{
    task: TaskInterface;
    active: boolean
    // open:boolean
}>();

const taskStore = useTask()


function whoIsOpen(id:string|null) {
    taskStore.whoIsOpen(id)
}
function isItOpen(id: string){
    return taskStore.isItOpen(id)
}

const emit = defineEmits<{
    (e: 'activeTask', id: string): void;
    (e: 'toggleTask', id: string): void;
}>();



</script>

<template >

    <div v-if="!isItOpen(task._id)"  @click="emit('activeTask', task._id)" class="task d-flex">
        <div class="bordure" :class="active ? 'active' :'no'"></div>
        <p @click.stop="emit('toggleTask', task._id)" :style="{backgroundColor:task.done_at ? 'red':'#DFDFDF'}"
            class="check">
            <font-awesome-icon icon="fa-solid fa-check" color="white" />
        </p>
        <p :style="{textDecoration:task.done_at ? 'line-through':'none'}">{{task.title}}</p>
        <p>0/1</p>
        <div @click="whoIsOpen(task._id)" class="edit"><font-awesome-icon icon="fa-solid fa-pen" color="#868686" /></div>
    </div>
    <TaskNew :task="task"   v-else />




</template>

<style lang="css" scoped>
.task {
    height: 50px;
    border-radius: 5px;
    background-color: white;
    color: black;
    width: 100%;
    margin-bottom: 2%;
    cursor: pointer;
    align-items: center;
}

.bordure {
    width: 5%;
    height: 100%;
}

.bordure.active {
    background-color: black;
}

.task:hover .bordure.no {
    background-color: grey;
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
.edit{
    background-color: white;
    border: 0.5px solid #868686;
    height: 50%;
}
.edit:hover{
    background-color: #dfdfdf;
}


</style>