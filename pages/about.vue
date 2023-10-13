<template lang="pug">
div.flex.flex-col.items-center.justify-around.h-screen.pt-32  
    Title Acerca de    
    AppLogo.flex-col
    q-space
    p.text-h6.text-gray-600.mb-8 Póngase en contacto con nosotros
    template(v-for="i in contact.agents")
        q-btn( class="mb-[40vh]" target="_blank" flat color="green" :href="'https://wa.me/'+i.phone")
            icon.mr-2(name="ic:baseline-whatsapp" size="20" )
            
            span {{i.name}}
</template>
<script setup lang="ts">
const contact = {
  agents: [{ phone: 5359786011, name: "Nube" }],
};
</script>
