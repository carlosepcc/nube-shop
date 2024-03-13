<template>
  <Title>Productos</Title>
  <q-pull-to-refresh
    @refresh="
      (done) => {
        fetchProducts();
        done();
      }
    "
  >
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
            :class="{
              'text-red-600': pr.error,
              'text-green-600': pr.status == 200,
            }"
          >
          Status: {{ pr.status }}
          Error: {{ pr.error ?? "No hay errores" }}
          {{ pr.products }}
        </pre
          >
        </dev-only>
        <template v-if="!(pr.products || pr.error)">
          <ProductSkeleton v-for="i in 4" />
        </template>
        <ProductCard v-for="(p, index) in pr.products" :data="p" />
      </section>
    </main>
    <dev-only>{{ pr }}</dev-only>
  </q-pull-to-refresh>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();

const pr = ref({});
const productsQuery = supabase
  .from("product")
  .select("*, product_price(price,currency_code), product_image(image_url)");

// const { data: products, error, status, statusText } = await productsQuery;

const fetchProducts = async () => {
  const { data, error, status } = await productsQuery;
  pr.value = {
    products: data,
    error,
    status,
  };
};
onMounted(fetchProducts);
watch([pr], () => console.table(pr.value.products));
</script>
