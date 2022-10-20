
<script setup lang="ts">
import { useTask } from '@/shared/stores/TaskStore';


const taskStore = useTask()
</script>

<template class="actived" >
    <p v-if="taskStore.activedTask" class="actived">{{taskStore.activedTask.title}}</p>

</template>

<style lang="css">
.actived {
    text-align: center;
}
</style>