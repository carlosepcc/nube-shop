import { ref, computed } from "vue";
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
export const useProductStore = defineStore("product", () => {
  const products = ref<Product[] | null>(null);
  const fetching = ref(false);
  const supabase = useSupabaseClient();
  const error = ref<string | null>(null);
  const status = ref<number>();
  definePageMeta({
    keepalive: true,
  });
  const fetch = async () => {
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

      if (data) {
        products.value = data;
        error.value = fetchError;
        status.value = fetchStatus;
        fetching.value = false;
      }
    } catch (err) {
      if (error.value) {
        fetching.value = false;
        error.value = err;
      }
    }
  };
  return { products, fetch, fetching, error, status };
});
