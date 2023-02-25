<script setup lang="ts">
import { z } from 'zod';
import { toFormValidator } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';
import type { UserForm ,ErrorApiInterface } from '@/shared/interfaces';
import { useRouter } from 'vue-router';
import { useUser } from '@/shared/stores/userStore';
import { errorFor } from '@/shared/services';

const router = useRouter();
const userStore = useUser();

const validationSchema = toFormValidator(z.object({
    name: z.string({ required_error: 'Vous devez renseigner ce champ' }).min(2, 'Trop court'),
    email: z.string({ required_error: 'Vous devez renseigner ce champ' }).email('Format email incorrect'),
    password: z.string({ required_error: 'Vous devez renseigner ce champ' }).min(5, 'Le mot de passe doit faire au moins 5 caractères'),
}));

const { handleSubmit, setErrors } = useForm({
    validationSchema
});

const submit = handleSubmit(async (formValue: UserForm) => {
    try {
        await userStore.signup(formValue);
        router.push('/profil');
    } catch (e) {
        if (<ErrorApiInterface[]>e ){
            setErrors(
            {"password":errorFor("password",<ErrorApiInterface[]>e ),
            "name":errorFor("name",<ErrorApiInterface[]>e ),
            "email":errorFor("email",<ErrorApiInterface[]>e ) }
            )
        }
    }
});

const { value: nameValue, errorMessage: nameError,handleChange: handleName } = useField('name',null,  {
  validateOnValueUpdate: false,
});
const { value: emailValue, errorMessage: emailError,handleChange: handleEmail} = useField('email',null,  {
  validateOnValueUpdate: false,
});
const { value: passwordValue, errorMessage: passwordError,handleChange: handlePassword } = useField('password',null,  {
  validateOnValueUpdate: false,
});
</script>

<template>
    <div class="container d-flex flex-row p-20 justify-content-center align-items-start">
        <form @submit="submit" class="card">
            <h2 class="mb-20">Inscription</h2>
            <div class="d-flex flex-column mb-10">
                <label for="name" class="mb-5">Nom*</label>
                <input @blur="handleName" v-model="nameValue" id="name" type="text">
                <p v-if="nameError" class="form-error">{{ nameError }}</p>
            </div>
            <div class="d-flex flex-column mb-10">
                <label for="email" class="mb-5">Email*</label>
                <input @blur="handleEmail" v-model="emailValue" id="email" type="text">
                <p v-if="emailError" class="form-error">{{ emailError }} </p>
            </div>
            <div class="d-flex flex-column mb-10">
                <label for="password" class="mb-5">Mot de passe</label>
                <input @blur="handlePassword" v-model="passwordValue" id="password" type="password">
                <p v-if="passwordError" class="form-error">{{ passwordError }}</p>
            </div>
            <div>
                <button class="btn btn-primary">Inscription</button>
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