<template>
  <q-layout
    view="hHh lpR fFf"
    class="h-screen"
  >
    <div>
      <q-header class="bg-gray-900 backdrop-blur-xl">
        <q-toolbar>
          <q-avatar>
            <img
              width="100px"
              class="object-contain"
              src="isotype.svg"
              alt="Perversionis logo"
            />
          </q-avatar>
          <q-toolbar-title
            class="text-[#fffc] font-bold tracking-wider italic font-serif"
          >
            <nuxt-link to="/">Perversionis</nuxt-link>
          </q-toolbar-title>
          <q-btn dense flat round icon="menu" @click="toggleMenu" />
        </q-toolbar>
      </q-header>
      <app-menu show-if-above v-model="menuOpen" side="right" bordered>
      </app-menu>
      <div>
        <nuxt-page />
      </div>
      <footer class="bg-gray-900 p-8 text-gray-400 text-center">
        <p>Perversionis<sup>©</sup> 2023 - Presente</p>
        <p>Todos los derechos reservados</p>
      </footer>
    </div>
  </q-layout>
</template>

<script setup lang="ts">
const menuOpen = ref(false);

const toggleMenu = () => (menuOpen.value = !menuOpen.value);
</script>
