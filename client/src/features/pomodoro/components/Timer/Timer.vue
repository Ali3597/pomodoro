
<script setup lang="ts">
import type { Section, Status } from '@/shared/interfaces';
import TimerChrono from './TimerChrono.vue';
import TimerStatus from './TimerStatus.vue';
const props = defineProps<{
    prettyTime: string,
    status: Status,
    brightColor: String
    section: Section,
    color: string
}>();

const emit = defineEmits<{
    (e: 'start'): void;
    (e: 'stop'): void;
    (e: 'passToWork'): void;
    (e: 'passToShortBreak'): void;
    (e: 'passToLongBreak'): void;
}>();

</script>

<template >
    <div class="pomo d-flex flex-column ">
        <TimerStatus :color="props.color" :section="props.section" @pass-to-long-break="emit('passToLongBreak')"
            @pass-to-short-break="emit('passToShortBreak')" @pass-to-work="emit('passToWork')" />
        <TimerChrono :pretty-time="props.prettyTime" :status="props.status" :brightColor="props.brightColor"
            @start="emit('start')" @stop="emit('stop')" />
    </div>


</template>

<style lang="css">
.pomo {
    width: 35%;
    height: 50%;
    background-color: v-bind('props.brightColor');
}
</style>