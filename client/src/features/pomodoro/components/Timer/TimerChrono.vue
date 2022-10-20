
<script setup lang="ts">
import type { Status } from '@/shared/interfaces';
const props = defineProps<{
    prettyTime: string,
    status: Status,
    brightColor: String
}>();

const emit = defineEmits<{
    (e: 'start'): void;
    (e: 'stop'): void;
}>();

</script>

<template >
    <div class="timer d-flex flex-column align-items-center justify-content-center">
        {{ props.prettyTime }}
        <button v-if="props.status === 'Pause'" @click="emit('start')" class="p-5">Start</button>
        <button v-if="props.status === 'Progress'" @click="emit('stop')" class="p-5">Stop</button>
    </div>


</template>

<style lang="css">
.timer {
    width: 100%;
    height: 80%;
    color: white;
    font-size: 90px;
}

.timer>button {
    background-color: white;
    color: v-bind('props.brightColor');
    font-size: 45px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
}
</style>