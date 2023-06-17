<script setup lang="ts">
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';
import type { UserForm } from '@/shared/interfaces';
import { useUser } from '@/shared/stores/userStore';
import { ref } from 'vue'

const success = ref("")


const userStore = useUser();

let initialValues = {
    name: userStore.currentUser?.name,
    email: userStore.currentUser?.email,
}

const validationSchema = toTypedSchema(z.object({
    name: z.string({ required_error: 'Vous devez renseigner ce champ' }).min(2, 'Trop court'),
    email: z.string({ required_error: 'Vous devez renseigner ce champ' }).email('Format email incorrect'),
}));

const { handleSubmit, setErrors } = useForm({
    validationSchema,
    initialValues
});

const submit = handleSubmit(async (formValue: UserForm) => {
    userStore.resetErrors()
    await userStore.updateInfo(formValue);
    if (Object.keys(userStore.errors).length === 0 ){
       success.value = "Informations modifié"
    }
 
});

const { value: nameValue, errorMessage: nameError,handleChange: handleName } = useField('name',  {
  validateOnValueUpdate: false,
});
const { value: emailValue, errorMessage: emailError,handleChange: handleEmail} = useField('email',  {
  validateOnValueUpdate: false,
});

</script>

<template>
    <div class="container d-flex flex-row p-20 justify-content-center align-items-start">
        <form @submit="submit" class="card">
            <h2 class="mb-20">Changer ses infos  </h2>
            <div class="d-flex flex-column mb-10">
                <label for="name" class="mb-5">Nom*</label>
                <input @blur="handleName" v-model="nameValue" id="name" type="text">
                <p v-if="nameError" class="form-error">{{ nameError }}</p>
                <p v-if="userStore.errors.name" class="form-error">{{ userStore.errors.name }} </p>
                

            </div>
            <div class="d-flex flex-column mb-10">
                <label for="email" class="mb-5">Email*</label>
                <input @blur="handleEmail" v-model="emailValue" id="email" type="text">
                <p v-if="emailError" class="form-error">{{ emailError }} </p>
                <p v-if="userStore.errors.email" class="form-error">{{ userStore.errors.email }} </p>
                <p  class="form-success">{{ success }} </p>
            </div>
            <div>
                <button class="btn btn-primary">Modifier</button>
            </div>
        </form>
    </div>
</template>


<style scoped lang="css" >
.card {
    width: 100%;
    width: 500px;
    padding: 20px;
}
</style>