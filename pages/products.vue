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
      <dev-only>
        <pre
          class="overflow-auto"
          :class="{
            'text-red-600': error,
            'text-green-600': status == 200,
          }"
        >
          Status: {{ status }}
          Error: {{ error ?? "No hay errores" }}
        </pre>
      </dev-only>
      <section class="flex flex-wrap gap-10 justify-center">
        <template v-if="!(products || error)">
          <ProductSkeleton v-for="i in 4" />
        </template>
        <ProductCard v-for="(p, index) in products" :data="p" />
      </section>
    </main>
    <dev-only>
      <pre>{{ products }}</pre>
    </dev-only>
  </q-pull-to-refresh>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const products = ref([]);
const error = ref(null);
const status = ref(null);

const fetchProducts = async () => {
  try {
    const {
      data,
      error: fetchError,
      status: fetchStatus,
    } = await supabase
      .from("product")
      .select(
        "*, product_price(price,currency_code), product_image(image_url)"
      );

    products.value = data;
    error.value = fetchError;
    status.value = fetchStatus;
  } catch (err) {
    error.value = err;
  }
};

onMounted(fetchProducts);

watch(products, () => console.table(products.value));
</script>
