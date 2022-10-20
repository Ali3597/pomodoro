
<script setup lang="ts">
import type { Section } from '@/shared/interfaces';


const props = defineProps<{
    section: Section,
    color: string
}>();

const emit = defineEmits<{
    (e: 'passToWork'): void;
    (e: 'passToShortBreak'): void;
    (e: 'passToLongBreak'): void;
}>();

</script>

<template >

    <div class="top-pomo d-flex p-5 align-items-center">
        <span @click="emit('passToWork')" class="p-10" :class="{ 'active': props.section === 'Work' }">Pomodoro</span>
        <span @click="emit('passToShortBreak')" :class="{ 'active': props.section === 'Short' }" class="p-10">Short
            break</span>
        <span @click="emit('passToLongBreak')" :class="{ 'active': props.section === 'Long' }" class="p-10">Long
            break</span>
    </div>

</template>

<style lang="css">
.top-pomo {
    width: 100%;
    height: 15%;
    justify-content: center;
    font-size: 21px;
    font-weight: 700;
    color: white;
}

.top-pomo>span {
    cursor: pointer;
    margin-left: 4%;
    margin-right: 4%;
}

.top-pomo>.active {
    background-color: v-bind('props.color');
}
</style>