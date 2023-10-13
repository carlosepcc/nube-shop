<template>
  <Title>Productos</Title>
  <div class="mb-16 mt-32 text-center">
    <h2 class="text-center text-h5 font-serif font-bold text-gray-500">
      Productos
    </h2>
    <div class="h-1 w-12 bg-primary mx-auto rounded-full"></div>
  </div>
  <section class="flex flex-wrap gap-10 justify-center">
    <template v-if="!products">
      <ProductSkeleton v-for="i in 4" />
    </template>
    <ProductCard v-for="(p, index) in products" :data="p" />
  </section>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();

let {
  data: products,
  error,
  status,
  statusText,
} = await supabase
  .from("product")
  .select("*, product_price(price,currency_code), product_image(image_url)");

const productsMock: Product[] = [
  {
    name: "Engatusadora floral",
    pricing: [
      { price: 20, currency: { code: "mlc" } },

      { price: 4500, currency: { code: "cup" } },
    ],
  },
  {
    name: "Traje de sirvienta",
    pricing: [{ price: 32, currency: { code: "mlc" } }],
  },
  {
    name: "Traje de policia",
    pricing: [{ price: 27, currency: { code: "mlc" } }],
  },
];
</script>
