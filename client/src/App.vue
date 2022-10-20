<script setup lang="ts">
import TheHeader from './components/Header.vue';
import TheFooter from './components/Footer.vue';
import { useRouter } from 'vue-router';
import { useUser } from './shared/stores/userStore';

const userStore = useUser();
const router = useRouter();

async function logout() {
  await userStore.logout();
  router.push('/connexion');
}

</script>

<template>
  <div class="app-container">
    <TheHeader :isAuthenticated="userStore.isAuthenticated" @logout="logout" class="header" />
    <div class="app-content">

      <router-view>

      </router-view>


    </div>
    <TheFooter class="footer hide-xs" />
  </div>
</template>

<style lang="css">
@import './assets/css/base.css';
@import './assets/css/debug.css';

.app-container {
  height: fit-content;
  display: grid;
  grid-template-areas: 'header' 'app-content' 'footer';
  grid-template-rows: 48px auto 48px;
}

.header {
  grid-area: header;
}

.app-content {
  grid-area: app-content;
}

.footer {
  grid-area: footer;
}
</style>