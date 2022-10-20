<script setup lang="ts">
import Timer from "./components/Timer/Timer.vue";
import { useStopWatch } from "@/shared/stores/StopWatchStore";
import Task from "./components/Task/Task.vue";

const stopTimeWatchStore = useStopWatch()
function start() {
    stopTimeWatchStore.start()
}
function stop() {
    stopTimeWatchStore.stop()
}
function reset() {
    stopTimeWatchStore.reset()
}
function passToShortBreak() {
    stopTimeWatchStore.passToShortBreak()
}
function passToLongBreak() {
    stopTimeWatchStore.passToLongBreak()
}
function passToWork() {
    stopTimeWatchStore.passToWork()
}


</script>

<template>
    <div class="contain-pomo flex-column d-flex justify-content-center align-items-center">

        <Timer :pretty-time="stopTimeWatchStore.prettyTime" :status="stopTimeWatchStore.status"
            :brightColor="stopTimeWatchStore.brighten" @start="start" @stop="stop" :color="stopTimeWatchStore.color"
            :section="stopTimeWatchStore.section" @pass-to-long-break="passToLongBreak"
            @pass-to-short-break="passToShortBreak" @pass-to-work="passToWork" />

        <Task />

    </div>
</template>

<style scoped lang="css">
.contain-pomo {
    height: fit-content;
    width: 100%;
    background-color: v-bind('stopTimeWatchStore.color');
}
</style>