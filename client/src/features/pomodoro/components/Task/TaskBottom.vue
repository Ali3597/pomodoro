
<script setup lang="ts">
import { useTask } from '@/shared/stores/TaskStore';
import TaskNew from './TaskNew.vue';
const taskStore = useTask()


function setNewOpen(id:string|null) {
    taskStore.setNewOpen(id)
}

</script>

<template >
    <div v-if="!(taskStore.openId =='new')" @click="setNewOpen('new')" class="add-task d-flex">
        <font-awesome-icon icon="fa-solid fa-plus-circle" color="black" /> Rajoutez une tache
    </div>
    <TaskNew :task="null"   v-else />

</template>

<style lang="css">
.add-task {
    height: 50px;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.1);
    color: black;
    width: 100%;
    margin-bottom: 2%;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: 2%;
    border: 2px dashed rgba(255, 255, 255, 0.4);
    font-size: 16px;
    font-weight: bold;
    color: white;
}
</style>