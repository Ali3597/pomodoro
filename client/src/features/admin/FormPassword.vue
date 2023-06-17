<script setup lang="ts">
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';
import { useUser } from '@/shared/stores/userStore';
import { ref } from 'vue'
import type { UserForm } from '@/shared/interfaces';



const userStore = useUser();
const success = ref("")

const validationSchema = toTypedSchema(z.object({

    password: z.string({ required_error: 'Vous devez renseigner ce champ' }).min(6, 'Le mot de passe doit faire au moins 6 caractères'),
    confirmPassword: z.string({ required_error: 'Vous devez renseigner ce champ' }).min(6, 'Le mot de passe doit faire au moins 6 caractères'),
}).refine(schema => (schema.password=== schema.confirmPassword ? true :false), 
{
    message: 'Les deux mots de passes de correspondent pas',
    path: ['confirmPassword'],
})


);

const { handleSubmit, setErrors } = useForm({
    validationSchema
});

const submit = handleSubmit(async (formValue: UserForm)  => {
    userStore.resetErrors()
    await userStore.updatePassword({"password":formValue.password});
    if (Object.keys(userStore.errors).length === 0 ){
       success.value = "Informations modifié"
    }
});


const { value: passwordValue, errorMessage: passwordError,handleChange: handlePassword } = useField('password',  {
  validateOnValueUpdate: false,
});
const { value: confirmPasswordValue, errorMessage: confirmPasswordError,handleChange: handleConfirmPassword } = useField('confirmPassword',  {
  validateOnValueUpdate: false,
});
</script>

<template>
    <div class="container d-flex flex-row p-20 justify-content-center align-items-start">
        <form @submit="submit" class="card">
            <h2 class="mb-20">Changer le mot de passe</h2>

            <div class="d-flex flex-column mb-10">
                <label for="password" class="mb-5">Mot de passe</label>
                <input @blur="handlePassword" v-model="passwordValue" id="password" type="password">
                <p v-if="passwordError" class="form-error">{{ passwordError }}</p>
                <p v-if="userStore.errors.password" class="form-error">{{ userStore.errors.password }}</p>
            </div>
            <div class="d-flex flex-column mb-10">
                <label for="password" class="mb-5">Confirmer le mot de passe</label>
                <input @blur="handleConfirmPassword" v-model="confirmPasswordValue" id="confirmPassword" type="password">
                <p v-if="confirmPasswordError" class="form-error">{{ confirmPasswordError }}</p>
                <p  class="form-success">{{ success }} </p>
            </div>
            <div>
                <button class="btn btn-primary">Modifier le mot de passe </button>
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