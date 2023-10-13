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
    class="bg-gray-900"
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-1'"
    dark
  >
    <q-scroll-area
      class="fit bg-gray-900"
      :horizontal-thumb-style="{ opacity: 0 }"
    >
      <q-list padding>
        <template v-for="i in menuItems" :key="i.label">
          <q-separator dark v-if="i.separate" />
          <q-item v-ripple :to="i.to">
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
  { label: "Productos", key: "products", to: "products", icon: "ic:twotone-shopping-bag" },
  { label: "About", key: "about", to: "about", icon: "ic:twotone-info", separate: true },
];
</script>
