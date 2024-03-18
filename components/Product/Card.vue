<template>
  <q-card
    class="my-card w-[clamp(64px,40vw,250px)] flex sm:flex-col"
    flat
    bordered
  >
    <!-- <q-img :src="images[0].image_url || '/isotype.svg'" /> -->
    <NuxtImg
      class="aspect-[4/3] max-h-44 object-cover"
      v-if="images[0]"
      format="avif,webp"
      :src="images[0].image_url"
      :placeholder="[50, 25, 75, 5]"
    />

    <q-card-section>
      <div class="-mx-2 -mt-1">
        <template v-for="tag in tags">
          <q-chip color="pink-1" text-color="secondary">{{ text(tag) }}</q-chip>
        </template>
      </div>
      <div class="text-overline text-orange-9">
        <!-- <span v-for="tag in tags">{{ tag }}&nbsp;</span> -->
      </div>

      <p
        class="text-lg text-primary brightness-[40%] font-bold q-mt-sm q-mb-xs"
      >
        {{ title }}
      </p>
      <p
        class="text-caption text-gray-500 max-h-24 overflow-y-scroll [scrollbar-width:none]"
      >
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
        <p v-if="pricing && pricing[0]" class="font-bold text-lg">
          {{
            pricing[0]?.currency_code == "USD"
              ? price(pricing[0]?.price * 1.15)
              : price(pricing[0]?.price)
          }}
          <small class="uppercase font-normal">
            {{ pricing[0]?.currency_code.toUpperCase() }}
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
          <template v-if="pricing">
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
                <small class="font-normal uppercase">{{
                  i.currency_code
                }}</small>
              </span>
            </q-chip>
          </template>
          <p class="text-gray-500 mt-2">
            Se acepta el pago en otras monedas no listadas aquí
          </p>
        </q-card-section>
      </div>
    </q-slide-transition>
    <slot />
  </q-card>
</template>
<script setup lang="ts">
import type { Product } from "types";
const props = defineProps<{
  data: Product;
}>();
const {
  title,
  description,
  product_price: pricing,
  product_image: images,
  category,
  tags,
} = props.data;
const showMore = ref(false);
const messageText = "Hola, tengo interés en el producto: " + props.data.title;
const whatsappURL =
  "https://wa.me/5359786011?text=" + encodeURIComponent(messageText);
const currentImage = ref();
</script>
