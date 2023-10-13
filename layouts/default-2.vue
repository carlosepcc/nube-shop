<template>
  <v-app>
    <v-layout>
      <v-navigation-drawer location="right" v-model="menuVisible">
        <v-list>
          <v-list-item to="lingerie">Lencería</v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar color="grey-darken-4">
        <v-app-bar-title>
          <img src="logotype.svg" width="120" height="64" />
        </v-app-bar-title>
        <v-app-bar-nav-icon
          @click="menuVisible = !menuVisible"
        ></v-app-bar-nav-icon>
      </v-app-bar>

      <v-main>
        <nuxt-page />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup lang="ts">
const menuVisible = ref(false);
</script>
