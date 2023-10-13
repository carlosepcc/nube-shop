<template>
  <q-card class="my-card w-60 flex flex-col" flat bordered>
    <!-- <q-img :src="images[0].image_url || '/isotype.svg'" /> -->
    <q-carousel
      swipeable
      animated
      v-model="currentImage"
      infinite
      autoplay
      height="200px"
    >
      <q-carousel-slide v-for="i in images" :name="1" :img-src="i.image_url" />
    </q-carousel>
    <q-card-section>
      <div class="text-overline text-orange-9">{{ category ?? "" }}</div>
      <p
        class="text-lg text-primary brightness-[40%] font-bold q-mt-sm q-mb-xs"
      >
        {{ title }}
      </p>
      <p class="text-caption text-gray-500">
        {{ description }}
      </p>
    </q-card-section>
    <q-space />
    <q-card-actions>
      <q-btn
        :icon-right="'keyboard_arrow_' + (showMore ? 'up' : 'down')"
        color="primary"
        flat
        @click="showMore = !showMore"
      >
        <!-- <q-icon
          class="absolute top-1 right-0 transition"
          :class="{ 'opacity-0': showMore }"
          size="x-small"
          :nme="showMore ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          name="info_outline"
        /> -->
        <p v-if="pricing" class="font-bold text-lg">
          {{
            pricing[0]?.currency_code == "USD"
              ? (pricing[0]?.price * 1.15).toPrecision(4)
              : pricing[0]?.price.toPrecision(4)
          }}
          <small class="uppercase font-normal">
            MLC
            <!-- {{ pricing[0]?.currency_code }} -->
          </small>
        </p>
      </q-btn>
      <q-space />
      <q-btn :href="whatsappURL" target="_blank" flat color="green">
        <icon size="20" class="mr-2" name="ic:baseline-whatsapp" />
        Pedir
        <!-- <q-badge floating color="positive" rounded>2</q-badge> -->
      </q-btn>
    </q-card-actions>

    <q-slide-transition>
      <div v-show="showMore" @click="showMore = false">
        <q-separator />
        <!-- <q-card-section class="text-subtitle2">
          {{ description }}
        </q-card-section> -->
        <q-card-section class="text-center">
          <q-chip
            class="text-[#fffe] font-bold"
            v-for="i in pricing"
            :color="
              i.currency_code == 'MLC'
                ? 'primary'
                : i.currency_code == 'USD'
                ? 'teal'
                : 'brown'
            "
          >
            <span>
              {{ i.price.toPrecision(4) }}
              <small class="font-normal uppercase">{{ i.currency_code }}</small>
            </span>
          </q-chip>
          <p class="text-gray-500 mt-2">
            Se acepta el pago en otras monedas no listadas aquí
          </p>
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>
<script setup lang="ts">
import { Product } from "types";
const props = defineProps<{
  data: Product;
}>();
const {
  title,
  description,
  product_price: pricing,
  product_image: images,
  category,
} = props.data;
const showMore = ref(false);
const messageText = "Hola, tengo interés en el producto: " + props.data.title;
const whatsappURL =
  "https://wa.me/5359786011?text=" + encodeURIComponent(messageText);
const currentImage = ref();
</script>
