<script setup lang="ts">
const supabase = useSupabaseClient();
const $q = useQuasar();
type CurrencyCode = "USD" | "MLC" | "CUP" | "EUR";
type Product = {
  id?: string;
  title: string | null;
  description: string | null;
  price: number;
  currencyCode: CurrencyCode;
  image: File | null;
};

const newProduct = ref<Product>({
  title: null,
  description: null,
  price: 0,
  currencyCode: "USD",
  image: null,
});
const productImagesStorageUrl =
  "https://fzjnvxqonktjsuufeqwa.supabase.co/storage/v1/object/public/perversionis_assets/";

const addProductRequest = ref({
  status: "idle",
  message: "",
});
const addProductPending = computed(
  () => addProductRequest.value.status === "pending"
);
const handleFormSubmit = async () => {
  try {
    const image = newProduct.value.image;
    if (!image) {
      console.error("Image is null or undefined");
      return;
    }
    addProductRequest.value.status = "pending";

    addProductRequest.value.message = "Registrando producto...";

    // CREATE PRODUCT RECORD
    const { data: productData, error: productError } = await supabase
      .from("product")
      .insert([
        {
          title: newProduct.value.title,
          description: newProduct.value.description,
        },
      ])
      .select();

    type ProductDb = { title: string; description: string; id: string };

    let product: null | ProductDb = null;
    if (productError) {
      console.error("Product insert error:", productError);
      throw productError;
    } else {
      console.log("%csuccess: ", "color:green", productData);
      product = productData[0];
    }

    addProductRequest.value.message = "Registrando precio...";
    //CREATE PRICE RECORD
    const { error: priceError } = await supabase.from("product_price").insert([
      {
        product_id: product.id,
        price: newProduct.value.price,
        currency_code: newProduct.value.currencyCode,
      },
    ]);

    if (priceError) {
      console.error("Product price insert error:", priceError);
      throw priceError;
    }

    addProductRequest.value.message = "Subiendo imagen...";
    // UPLOAD AND SAVE IMAGE FILE
    const { data: file, error: uploadError } = await supabase.storage
      .from("perversionis_assets")
      .upload(`products/img/${product.id}/${image.name}`, image);

    if (uploadError) {
      console.error("Image upload error:", uploadError);
      throw uploadError;
    } else {
      console.table(file);
    }

    addProductRequest.value.message = "Registrando imagen...";
    // CREATE IMAGE RECORD
    const imageUrl = productImagesStorageUrl + file.path;
    const { error: imageError } = await supabase.from("product_image").insert([
      {
        product_id: product.id,
        image_url: imageUrl,
      },
    ]);

    if (imageError) {
      console.error("Product image insert error:", imageError);
      throw imageError;
    }

    addProductRequest.value.message = "";
    addProductRequest.value.status = "idle";

    // Reset the form fields
    newProduct.value = {
      title: "",
      description: "",
      price: 0,
      currencyCode: "USD",
      image: null,
    };

    // Refresh the product list
    await fetchProducts();
  } catch (error) {
    console.error("Form submission error:", error);
    addProductRequest.value.message = "😬 Ocurrió un error: " + error;
    addProductRequest.value.status = "error";

    throw error;
  }
};
const updateProduct = (p: Product) => {};
// const handleProductUpdate = async (updatedProduct: Product) => {
//   try {
//     await supabase
//       .from("product")
//       .update({
//         title: updatedProduct.title,
//         description: updatedProduct.description,
//       })
//       .eq("id", updatedProduct.id);

//     if (updatedProduct.image) {
//       const { data: file, error: uploadError } = await supabase.storage
//         .from("bucket_name")
//         .upload(
//           `products/img/${updatedProduct.image.name}`,
//           updatedProduct.image
//         );

//       if (uploadError) {
//         console.error("Image upload error:", uploadError);
//         throw uploadError;
//       }

//       const { error: imageUpdateError } = await supabase
//         .from("product_image")
//         .update({ image_url: file.path })
//         .eq("product_id", updatedProduct.id);

//       if (imageUpdateError) {
//         console.error("Image update error:", imageUpdateError);
//         throw imageUpdateError;
//       }
//     }

//     // Refresh the product list
//     await fetchProducts();
//   } catch (error) {
//     console.error("Product update error:", error);
//     throw error;
//   }
// };

const products = ref([]);
const fetchProducts = async () => {
  try {
    const { data } = await supabase
      .from("product")
      .select(
        "*, product_price(price,currency_code), product_image(image_url)"
      );

    products.value = data;
  } catch (error) {
    console.error("Product fetch error:", error);
    throw error;
  }
};

onMounted(fetchProducts);

// Function to handle file selection for the new product form
const handleFileSelect = (event) => {
  const file = event.target.files[0];
  newProduct.value.image = file;
};

const handleProductDelete = async (id: string) => {
  try {
    await supabase.from("product").delete().eq("id", id);
    await supabase.from("product_image").delete().eq("product_id", id);
    await supabase.from("product_price").delete().eq("product_id", id);

    // Refresh the product list
    await fetchProducts();
  } catch (error) {
    console.error("Product delete error:", error);
    throw error;
  }
};

const deleteProduct = async (p: Product) => {
  let n = Notify.create({
    timeout: 30000,
    type: "ongoing",
    message: `Esperando confirmación para eliminar ${p.title}`,
    actions: [{ label: "Ocultar", color: "white" }],
  });
  console.log($q);
  $q.dialog({
    title: `Confirmar eliminación`,
    message: `${p.title} se eliminará para siempre del catálogo.
    ¿Seguro? Esta acción no se puede deshacer.`,
    cancel: { label: "Cancelar", flat: true },
    persistent: true,

    ok: { color: "red", flat: true, label: "Eliminar" },
  })
    .onOk(async () => {
      n({ caption: "Eliminando", spinner: true });
      await handleProductDelete(p.id);
      n({ caption: "Eliminado, actualizando...", spinner: true });

      await fetchProducts();
      n({ caption: "Catálogo actualizado...", spinner: true });
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};
</script>

<template>
  <!-- New Product Form -->
  <section class="flex gap-12 p-8 pt-28 pb-40 w-full bg-red-500">
    <Title>Admin</Title>
    <keep-alive>
      <div class="flex justify-center w-full lg:w-fit lg:flex-1">
        <q-card class="p-4">
          <q-card-section class="flex flex-col gap-4">
            <q-file
              outlined
              v-model="newProduct.image"
              label="Imagen"
              @change="handleFileSelect"
              required
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="photo" />
              </template>
            </q-file>
            <q-input
              outlined
              v-model="newProduct.title"
              label="Título"
              required
            />
            <q-input
              outlined
              v-model="newProduct.description"
              label="Descripción"
              type="textarea"
              required
            />
            <div class="flex flex-col sm:flex-row gap-2 flex-wrap">
              <q-input
                outlined
                v-model="newProduct.price"
                label="Precio"
                type="number"
                min="0"
                required
                class="flex-1"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="paid" />
                </template>
              </q-input>
              <q-select
                outlined
                v-model="newProduct.currencyCode"
                label="Moneda"
                :options="['USD', 'MLC', 'CUP', 'EUR']"
                required
                class="flex-1 min-w-fit"
              >
                <template v-slot:prepend>
                  <q-icon color="primary" name="payments" /> </template
              ></q-select>
            </div>
          </q-card-section>
          <q-card-actions>
            <q-btn
              :loading="addProductPending"
              class="w-full"
              push
              color="primary"
              icon="add"
              @click="handleFormSubmit"
              label="Añadir producto"
            >
              <template v-slot:loading>
                <q-spinner-hourglass class="on-left" />
                <span>{{ addProductRequest.message }}...</span>
              </template>
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </keep-alive>
    <!-- Product List -->
    <div class="lg:flex-2">
      <div class="flex flex-wrap gap-8 justify-center">
        <template v-if="!products">
          <ProductSkeleton v-for="i in 4" />
        </template>
        <ProductCard v-for="(p, index) in products" :data="p">
          <div class="absolute top-0 right-0">
            <q-btn unelevated icon="more_vert" round>
              <q-menu>
                <q-list>
                  <q-item clickable @click="deleteProduct(p)">
                    <q-item-section avatar>
                      <q-icon color="negative" name="delete" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>Eliminar</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item disable clickable @click="updateProduct(p)">
                    <q-item-section avatar>
                      <q-icon color="orange" name="edit" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>Editar</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </ProductCard>
      </div>
    </div>
  </section>
</template>
