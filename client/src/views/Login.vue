<script setup lang="ts">
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';
import type { LoginForm,ErrorApiInterface } from '@/shared/interfaces';
import { useRouter } from 'vue-router';
import { useUser } from '@/shared/stores/userStore';
import { watchEffect } from 'vue';
const router = useRouter();
const userStore = useUser();


watchEffect( () => {
    userStore.resetErrors()
})


const validationSchema = toTypedSchema(z.object({
    email: z.string({ required_error: 'Vous devez renseigner ce champ' }).email('Format email incorrect'),
    password: z.string({ required_error: 'Vous devez renseigner ce champ' }).min(5, 'Le mot de passe doit faire au moins 5 caractères'),
}));

const { handleSubmit, setErrors } = useForm<{ email: string, password: string }>({
    validationSchema,
});

const submit = handleSubmit(async (formValue: LoginForm) => {
    userStore.resetErrors()
    await userStore.login(formValue);
    if (Object.keys(userStore.errors).length === 0 ){
        router.push('/profil');
    }
    
   
});

const { value: emailValue, errorMessage: emailError ,handleChange: handleEmail } = useField('email',  {
  validateOnValueUpdate: false,
});
const { value: passwordValue, errorMessage: passwordError,handleChange: handlePassword } = useField('password', {
  validateOnValueUpdate: false,
});
</script>

<template>
    <div class="container d-flex flex-row p-20 justify-content-center align-items-start">
        <form @submit="submit" class="card">
            <h2 class="mb-20">Connexion</h2>
            <div class="d-flex flex-column mb-10">
                <label for="email" class="mb-5">Email*</label>
                <input @blur="handleEmail" v-model="emailValue" id="email" type="text">
                <p v-if="emailError" class="form-error">{{ emailError }} </p>
                
            </div>
            <div class="d-flex flex-column mb-10">
                <label for="password" class="mb-5">Mot de passe</label>
                <input @blur="handlePassword" v-model="passwordValue" id="password" type="password">
                <p v-if="passwordError" class="form-error">{{ passwordError }}</p>
                <p v-if="userStore.errors.password" class="form-error">{{ userStore.errors.password }}</p>
            </div>
            <div>
                <button class="btn btn-primary">Connexion</button>
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