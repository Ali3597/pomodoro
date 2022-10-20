
<script setup lang="ts">
import type { TaskFormInterface, TaskInterface } from '@/shared/interfaces';
import { useForm, useField } from 'vee-validate';
import { z } from 'zod';
import { toFormValidator } from '@vee-validate/zod';
import { useTask } from '@/shared/stores/TaskStore';


const state = defineProps<{
    task: TaskInterface | null;
}>();

let initialValues = {
    title: state.task? state.task.title : "",
    details: state.task ? state.task.details : "",
}

const taskStore = useTask()




function addTask(task:TaskFormInterface) {
    taskStore.addTask(task)
}

function editTask(id:string,task:TaskFormInterface) {
    taskStore.editTask(id,task)
}

function whoIsOpen(id:string|null) {
    taskStore.whoIsOpen(id)
}


const required = { required_error: 'Veuillez renseigner ce champ' };

const validationSchema = toFormValidator(
    z.object({
        title: z
            .string(required)
            .min(1, { message: 'Le titre doit faire au moins 1 caractère' })
            .max(50, { message: 'Le titre doit faire moins de 50 caractères' }),
        details: z.string(required),
    })
);

const { handleSubmit, isSubmitting } = useForm({
    validationSchema,
    initialValues
});
const title = useField('title');
const details = useField('details')




const trySubmit = handleSubmit((formValues,{ resetForm }) => {


    if (!state.task) {
        addTask(formValues as TaskFormInterface)
        } else {
        editTask(state.task._id,formValues as TaskFormInterface)
    }
    resetForm()
    whoIsOpen(null)
});
</script>

<template >
    <div class="new-task d-flex">
        <form class="d-flex flex-column" @submit="trySubmit">
            <div class="input d-flex flex-column mb-20">
                <input placeholder="Quelle est le titre de ta tâche ?" v-model="title.value.value" type="text" />
                <small class="form-error" v-if="title.errorMessage.value">{{
                title.errorMessage.value
                }}</small>
            </div>
            <div class="text d-flex flex-column mb-20">
                <textarea placeholder="Ajouter un detail ?" v-model="(details.value.value as string)"></textarea>

                <small class="form-error" v-if="details.errorMessage.value">{{
                details.errorMessage.value
                }}</small>
            </div>
            <div class="buttons d-flex">
                <button @click="whoIsOpen(null)" id="cancel">Fermer</button> <button id="save" type="submit">Sauvegarder</button>
            </div>
        </form>
    </div>

</template>

<style lang="css" scoped>
form {
    background-color: white;
    width: 100%;
    height: fit-content;
}

.input >input {
    width: 100%;
    border:0;
    outline:0;
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 6%;
    font-size:24px ;
    font-weight: bold;
    margin: 0;
  
}
.input >input::placeholder {
    font-size: 24px;
    opacity: .5;
    color: grey;
}
.input >input:focus {
    outline:none!important;
}

.text >textarea {
    margin: 0;

    padding-left: 5%;
    padding-right: 5%;
    padding-top: 3%;
    width: 100%;
    height:120px;
    border:0;
   
    font-size:24px ;
    font-weight: bold;
}
.text >textarea::placeholder {
    font-size: 24px;
    opacity: .5;
    color: grey;
}
.text >textarea:focus {
    outline:none!important;
}

.new-task {
    height: fit-content;
    border-radius: 5px;
    background-color: white;

}
.buttons{
    justify-content: flex-end;
    background-color: #EFEFEF;
    width: 100%;
    flex: 1;
    padding-top: 2% ;
    padding-bottom: 2%;
}
.buttons > button{
    margin-right: 4%;
    cursor: pointer;
    height: 40px;
    border-radius: 5px;
}
#cancel{
    background-color: #EFEFEF;
    border: 0;
    color: #888888;
}
#save{
    background-color: black;
    color: white;
}

</style>