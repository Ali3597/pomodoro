
<script setup lang="ts">
import type { TaskFormInterface, TaskInterface } from '@/shared/interfaces';
import { useForm, useField } from 'vee-validate';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useTask } from '@/shared/stores/TaskStore';


const state = defineProps<{
    task: TaskInterface | null;
}>();

let initialValues = {
    title: state.task? state.task.title : '',
    details: state.task ? state.task.details : '',
}

const taskStore = useTask()




async function addTask(task:TaskFormInterface) {
    await taskStore.addTask(task)
}
 
async function editTask(id:string,task:TaskFormInterface) {
   await  taskStore.editTask(id,task)
}

function setNewOpen(id:string|null) {
    taskStore.setNewOpen(id)
}


const required = { required_error: 'Veuillez renseigner ce champ' };

const validationSchema = toTypedSchema(
    z.object({
        title: z
            .string(required)
            .min(1, { message: 'Le titre doit faire au moins 1 caractère' })
            .max(100, { message: 'Le titre doit faire moins de 100 caractères' }),
        details: z.string(required)
        .min(1, { message: 'Les details doit faire au moins 1 caractère' }),
    })
);

const { handleSubmit, isSubmitting } = useForm({
    validationSchema,
    initialValues 
});
const title = useField('title');
const details = useField('details')



 const trySubmit =handleSubmit(async (formValues,{ resetForm }) => {
    taskStore.resetErrors()
    if (!state.task) {
        await addTask(formValues as TaskFormInterface)
        } else {
        await editTask(state.task._id,formValues as TaskFormInterface)
    }
    if (Object.keys(taskStore.errors).length === 0 ){
        resetForm()
        setNewOpen(null)   
    }
});
</script>

<template >
    <div class="new-task d-flex">
        <form class="d-flex flex-column" @submit="trySubmit">
            <div class="input d-flex flex-column mb-20">
                <textarea placeholder="Quelle est le titre de ta tâche ?" v-model="title.value.value as string" type="text" />
                <small class="form-error" v-if="title.errorMessage.value">{{
                title.errorMessage.value
                }}</small>
                <small class="form-error" v-if="taskStore.errors.title">{{
                taskStore.errors.title
                }}</small>
            </div>
            <div class="text d-flex flex-column mb-20">
                <textarea placeholder="Ajouter un detail ?" v-model="(details.value.value as string)"></textarea>

                <small class="form-error" v-if="details.errorMessage.value">{{
                details.errorMessage.value
                }}</small>
                <small class="form-error" v-if="taskStore.errors.details">{{
                taskStore.errors.details
                }}</small>
            </div>
            <div class="buttons d-flex">
                <button @click="setNewOpen(null)"   id="cancel">Fermer</button> <button id="save" type="submit">Sauvegarder</button>
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

.input >textarea {
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
.input >textarea::placeholder {
    font-size: 24px;
    opacity: .5;
    color: grey;
}
.input >textarea:focus {
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