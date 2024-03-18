<template>
  <q-layout view="hHh lpR fFf" class="h-screen">
    <q-header
      class="bg-gray-900 backdrop-blur-xl"
      :class="{ 'bg-transparent': $route.name == 'index' }"
    >
      <q-toolbar>
        <q-avatar square>
          <img
            width="100px"
            class="object-contain"
            src="/isotype.svg"
            alt="P"
          />
        </q-avatar>
        <q-toolbar-title
          class="text-[#fffc] font-bold tracking-wider italic font-serif"
        >
          <nuxt-link to="/">Perversionis</nuxt-link>
        </q-toolbar-title>
        <!-- {
    label: "WhatsApp",
    key: "wa",
    href: "https://chat.whatsapp.com/KkaBYppzfYaCpXtdRKBDmC",
    icon: "ph:whatsapp-logo-duotone",
  } -->
        <q-btn
          href="https://chat.whatsapp.com/KkaBYppzfYaCpXtdRKBDmC"
          target="_blank"
          dense
          flat
          round
          class="mx-4"
        >
          <icon
            size="22"
            name="ph:whatsapp-logo-duotone"
            class="overflow-hidden"
          />
          <q-badge floating rounded>1</q-badge>
        </q-btn>
        <q-btn dense flat round icon="menu" @click="toggleMenu" />
      </q-toolbar>
    </q-header>
    <app-menu show-if-above v-model="menuOpen" side="right" bordered>
    </app-menu>
    <div>
      <nuxt-page />
    </div>
  </q-layout>
</template>

<script setup lang="ts">
const menuOpen = ref(false);

const toggleMenu = () => (menuOpen.value = !menuOpen.value);
</script>
<style>
:root {
  --color-whatsapp-1: #00a884;
  --color-whatsapp: #128c7e;
}
</style>
