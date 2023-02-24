<script setup lang="ts">
defineProps<{
  isAuthenticated: boolean | null;
}>();
const emit = defineEmits<{
  (e: "logout"): void;
}>();
</script>

<template>
  <header class="px-20 d-flex flex-row align-items-center">
    <router-link to="/" class="d-flex flex-row align-items-center mr-20">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg"
      />
      <span class="logo">Pomodoro</span>
    </router-link>
    <div class="d-flex flex-row align-items-center flex-fill actions-container">
      <ul class="d-flex flex-row hide-xs">
        <template v-if="isAuthenticated">
          <li class="mr-20">
            <router-link to="/profil">Mon profil</router-link>
          </li>
          <li @click="emit('logout')">Déconnexion</li>
        </template>
        <template v-else-if="isAuthenticated === false">
          <li class="mr-10">
            <router-link to="/connexion">Connexion</router-link>
          </li>
          <li>
            <router-link to="/inscription">Inscription</router-link>
          </li>
        </template>
      </ul>
    </div>
  </header>
</template>

<style lang="css" scoped>
header {
  background-color: var(--primary-1);
}

header a {
  color: var(--text-primary-color);
}

header a img {
  width: 20px;
  margin-right: 5px;
}

header a .logo {
  font-weight: 700;
  font-size: 20px;
}

header a.router-link-active {
  text-decoration: underline;
}

header .menu-xs-container {
  position: relative;
}

header .menu {
  z-index: 2;
  position: absolute;
  top: 20px;
  right: 0px;
}

header .menu li {
  padding: 10px;
}

header .menu a {
  color: var(--text-color);
}
</style>
