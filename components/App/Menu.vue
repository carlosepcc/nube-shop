<template>
  <q-drawer
    show-if-above
    overlay
    :mini="miniState"
    @mouseover="miniState = false"
    @mouseout="miniState = true"
    :width="200"
    :breakpoint="500"
    bordered
    dark
  >
    <q-scroll-area
      class="fit bg-gray-900"
      :class="{ 'bg-gray-800': $route.name == 'index' }"
    >
      <q-list padding>
        <template v-for="i in menuItems" :key="i.label">
          <q-separator dark v-if="i.separate" />
          <q-item
            v-ripple
            :to="i.to"
            :href="i.href"
            :target="i.href && '_blank'"
          >
            <q-item-section avatar>
              <icon size="22" :name="i.icon" />
            </q-item-section>
            <q-item-section> {{ i.label }} </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
<script setup lang="ts">
const miniState = ref(false);
const show = ref(false);
const menuItems = [
  { label: "Inicio", key: "home", to: "/", icon: "ic:twotone-home" },
  {
    label: "Productos",
    key: "products",
    to: "products",
    icon: "ic:twotone-shopping-bag",
  },
  {
    label: "Acerca de",
    key: "about",
    to: "about",
    icon: "ic:twotone-info",
    separate: true,
  },

  {
    label: "WhatsApp",
    key: "wa",
    href: "https://chat.whatsapp.com/KkaBYppzfYaCpXtdRKBDmC",
    icon: "ph:whatsapp-logo-duotone",
  },
];
</script>
