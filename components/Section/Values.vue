<template lang="pug">
.p-16.pb-36.flex.flex-col.items-center.gap-24
      .flex.flex-col.items-center.gap-6(v-for="item in items" :key="item.id" )
        .text-5xl.opacity-70(class="contrast-[85%]") {{ item.emoji }}
        p.text-center.text-gray-500.text-lg.max-w-sm {{ item.text }}
</template>

<script setup lang="ts">
import { ref } from "vue";
type ValueItem = {
  key: string;
  emoji?: string;
  description: string;
};
const items: ValueItem[] = [
  {
    key: "valueArr.2",
    emoji: "🔞",
    text: "Únete a nosotros para explorar un mundo de juguetes, lencería y más, diseñados para avivar tus pasiones.",
  },
  {
    key: "valueArr.3",
    emoji: "🛍️",
    text: "Utilizamos SHEIN, una plataforma confiable, para ofrecerte una amplia gama de productos.",
  },
  {
    key: "valueArr.4",
    emoji: "📝",
    text: "Actualizamos constantemente nuestra colección y nos adaptamos a tus preferencias únicas.",
  },
  {
    key: "valueArr.5",
    emoji: "🤐",
    text: "Tu privacidad es nuestra prioridad. Mantenemos una estricta confidencialidad.",
  },
  {
    key: "valueArr.6",
    emoji: "💰",
    text: "Se requieren pagos por adelantado y ofrecemos descuentos emocionantes según la cantidad de productos encargados.",
  },
];
</script>
