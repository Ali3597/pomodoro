
<script setup lang="ts">
import { reactive } from 'vue';
import { useTask } from '@/shared/stores/TaskStore';

const state = reactive<{
    open: boolean;
}>({
    open: false,
});

const taskStore = useTask()

function deleteAllTask() {
    taskStore.deleteAllTask()
}

function validAllTask() {
    taskStore.validAllTask()
}
function deleteAllValidTask() {
    taskStore.deleteAllValidTask()
}

function closeOptions() {
    state.open = false
}

window.addEventListener('click', closeOptions);

</script>

<template >

    <div class="d-flex options ">
        <p>Mes Taches</p>
        <p @click.stop="state.open = !state.open"><font-awesome-icon class="icon" icon="fa-solid fa-bars" color="white" /></p>
        <div :class="state.open ? 'active' :'' " class="options-open d-flex flex-column">
            <p @click.stop="closeOptions() , deleteAllTask()"><font-awesome-icon class="icon-opt" icon="fa-solid fa-trash" color="red" /> Surpprimer toutes les taches</p>
            <p @click.stop="closeOptions() , validAllTask()"> <font-awesome-icon class="icon-opt" icon="fa-solid fa-check" color="green" /> Valider toutes les taches</p>
            <p @click.stop="closeOptions() , deleteAllValidTask()"><font-awesome-icon class="icon-opt" icon="fa-solid fa-trash" color="red" /> Surpprimer toutes les taches terminés</p>
        </div>
    </div>
</template>

<style lang="css">
.options {
    justify-content: space-between;
    border-bottom: 3px solid white;
    position: relative;
}

.options> :nth-child(2) {
    cursor: pointer;
}

.options-open {
    color: black;
    position: absolute;
    display: none;
    top: 65%;
    right: 0;
    background-color: white;
}

.options-open>p {
    margin: 0;
    height: 45px;
    border: 1px solid black;
    justify-content: flex-start;
    cursor: pointer;
    align-items: center;
    display: flex;
    padding-left: 1px;

}
.options-open>p:hover {
    background-color: #f1eeee ;

}


.options-open.active {
    display: flex;
}
.icon-opt{
    margin-right: 2%;
    margin-left: 2%;
}
.icon:hover{
    scale: 1.2;
}
</style>