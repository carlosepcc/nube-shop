<template lang="pug">
div.flex.flex-col.items-center.justify-center.h-full.pt-20.bg-gradient-to-tr.from-gray-900.to-gray-800.text-gray-300
    Title Inicio

    div.flex.flex-col.justify-between.items-center.pt-36(class="h-[calc(100vh-86px)]")
        AppLogo.flex-col
        q-btn(color="secondary" flat to="products") Comenzar
        q-icon(size="lg" class="text-[#fff2]" name="expand_more")
    SectionValues.py-24

    footer(class="bg-gray-900 p-8 text-gray-400 text-center w-full")
        p Perversionis
        sup ©
        | 2023 - Presente
        p Todos los derechos reservados
</template>

<script setup lang="ts"></script>
