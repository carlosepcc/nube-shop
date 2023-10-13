<template lang="pug">
.flex.items-center.justify-center.h-full.pt-20.bg-gradient-to-tr.from-gray-900.to-gray-800.text-gray-300
    Title Inicio
    .flex.flex-col.justify-between.items-center.pt-36(class="h-[calc(100vh-86px)]")
        AppLogo.flex-col
        q-btn(color="secondary" flat to="products") Comenzar
        q-icon(size="lg" class="text-[#fff2]" name="expand_more")
    SectionValues.py-24
</template>

<script setup lang="ts"></script>
