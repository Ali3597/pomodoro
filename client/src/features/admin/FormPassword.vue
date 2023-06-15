<script setup lang="ts">
import { useUser } from '@/shared/stores/userStore';
const userStore = useUser()
</script>

<template>
    <div class="d-flex flex-column align-items-center justify-content-center">
        <div class="card d-flex flex-column">
            <pre>{{ userStore.currentUser }}</pre>
        </div>
        <div class="card">
            <pre>{{ userStore.currentUser }}</pre>
        </div>
    </div>
</template>


<style scoped lang="css" >
.card {
    width: 100%;
    max-width: 300px;
}
</style>