
<script setup lang="ts">
import TaskOptions from "./TaskOptions.vue";
import TaskList from "./TaskList.vue";
import TaskBottom from "./TaskBottom.vue";
import TaskActive from "./TaskActive.vue";



</script>

<template >
    <div class="task-container">
        <TaskActive />
        <TaskOptions />
        <TaskList />
        <TaskBottom />
    </div>
</template>

<style lang="css">
.task-container {
    color: white;
    margin-top: 1%;
    width: 35%;
    height: fit-content;
}
</style>