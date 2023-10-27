<template>
  <Title>Productos</Title>
  <main class="bg-gray-100 py-16 min-h-screen">
    <div class="text-center bg-gray-100 my-16">
      <h2 class="text-center text-h5 font-serif font-bold text-gray-500">
        Productos
      </h2>
      <div class="h-1 w-12 bg-primary mx-auto rounded-full"></div>
    </div>
    <section class="flex flex-wrap gap-10 justify-center">
      <dev-only>
        <pre
          class="w-80 h-80 overflow-auto"
          :class="{ 'text-red-600': error, 'text-green-600': status == 200 }"
        >
          Status: {{ status }}
          Error: {{ error ?? "No hay errores" }}
          {{ products }}
        </pre>
      </dev-only>
      <template v-if="!products">
        <ProductSkeleton v-for="i in 4" />
      </template>
      <ProductCard v-for="(p, index) in products" :data="p" />
    </section>
  </main>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();

const {
  data: products,
  error,
  status,
  statusText,
} = await supabase
  .from("product")
  .select("*, product_price(price,currency_code), product_image(image_url)");

watch([products], () => console.table(products));
</script>
