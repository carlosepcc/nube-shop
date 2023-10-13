
<template>
  <div class="py-4 flex flex-col items-center">
    <div v-if="productStore.fetching" class="flex flex-col items-center mb-8">
      <div
        class="shadow-red-500 shadow-2xl mr-4 my-2 border-r-green-600 bg-[#fff2] text-green-600 border-r-2 rounded-full w-6 h-6 animate-spin">
        O
      </div>
      <div class="font-thin animate-pulse">Updating products list..</div>

    </div>


    <div class="flex gap-10 justify-center flex-wrap">
      <!-- SKELETON -->
      <template v-if="!productStore.products">
        <ProductSkeleton :amount="4" />
      </template>
      <template v-for="product in productStore.products" v-bind:key="product.id">
        <ProductCard :product="product" />
      </template>
    </div>

  </div>
</template>

<script setup lang="ts">
import ProductSkeleton from "./ProductSkeleton.vue"
import { useProductStore } from "~/stores/product";
import ProductCard from "./ProductCard.vue";
const productStore = useProductStore();
productStore.refresh();

</script>
<style scoped>
.products-container {
  display: flex;
  justify-content: space-around;
  row-gap: 32px;
  margin-block: 32px;
  width: 100%;
  flex-wrap: wrap;
}
</style>