<template lang="pug">
div.flex.flex-col.items-center.justify-around.h-screen.pt-32  
    Title Acerca de    
    AppLogo.flex-col
    q-space
    div.flex-col.flex.gap-4(class="mb-[40vh]")
        p.text-overline.text-gray-600.mb-8.m-4 Póngase en contacto con nosotros
        q-btn(class="bg-[var(--color-whatsapp)] text-white" rounded flat href="https://chat.whatsapp.com/KkaBYppzfYaCpXtdRKBDmC" target="_blank")
            icon.mr-2(name="ic:baseline-whatsapp" size="20" )
            span Perversionis en WhatsApp
        
        template(v-for="i in contact.agents")
            q-btn( class="bg-[var(--color-whatsapp)] text-white"  target="_blank" rounded  flat     :href="'https://wa.me/'+i.phone")
                icon.mr-2(name="ic:baseline-whatsapp" size="20" )
                span {{i.name}}
        
</template>
<script setup lang="ts">
const contact = {
  agents: [{ phone: 5359786011, name: "Nube" }],
};
</script>
