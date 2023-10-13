<template>
  <q-card flat width="250px">
    <q-skeleton height="200px" width="250px" square />
    <q-card-section>
      <q-skeleton type="text" class="text-xl" animation="fade" />
      <q-skeleton type="text" width="50%" class="text-6xl" animation="fade" />
    </q-card-section>
    <q-card-actions align="right" class="q-gutter-md">
      <q-skeleton type="QBtn" width="100%" />
    </q-card-actions>
  </q-card>
</template>
