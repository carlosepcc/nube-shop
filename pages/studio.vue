<template>
  <div
    class="flex flex-col gap-8 p-4 pb-36 items-center h-full justify-center pt-20"
  >
    <Title>Productos</Title>
    <div>
      <h2 class="text-center text-h5 font-serif font-bold text-gray-500">
        Estudio
      </h2>
      <div class="h-1 w-12 bg-primary mx-auto rounded-full"></div>
    </div>
    <div>
      <input
        type="file"
        accept="image/*"
        @change="handleImageSelection"
        class="hidden"
        ref="imageInput"
      />
    </div>
    <div class="flex gap-4">
      <q-card
        ref="memeCard"
        class="bg-gray-900 text-gray-300 w-[clamp(40px,90vw,512px)] h-fit pt-2"
      >
        <q-item class="border-none border-gray-700">
          <!-- <q-item-section avatar> 
            <q-avatar square> 
              <img src="/isotype.svg" class="rounded max-h-[60vh]" /> 
            </q-avatar> 
          </q-item-section> -->
          <q-item-section>
            <q-item-label contenteditable class="font-bold">{{
              text
            }}</q-item-label>
            <q-item-label contenteditable caption class="text-secondary">{{
              caption
            }}</q-item-label>
          </q-item-section>
        </q-item>
        <img
          class="min-h-[300px] max-h-[50vh] h-[clamp(300px,100%,600px)] object-contain"
          contain
          :src="imageUrl || placeholderImg"
        />
        <div class="border-none border-gray-700 px-1 pl-2 py-2 xs:p-4">
          <div class="flex w-full justify-between gap-4 pr-2">
            <div class="flex gap-2">
              <q-avatar square size="sm">
                <img src="/isotype.svg" />
              </q-avatar>
              <q-item-section>
                <q-item-label contenteditable class="font-bold"
                  >Perversionis</q-item-label
                >
                <q-item-label contenteditable caption class="text-gray-400"
                  >Sex shop
                </q-item-label>
              </q-item-section>
            </div>
            <!-- <q-space /> -->
            <div>
              <q-item-section>
                <q-item-label contenteditable class="font-bold text-end"
                  >WhatsApp</q-item-label
                >
                <q-item-label contenteditable caption class="text-teal-500"
                  ><a href="https://chat.whatsapp.com/KkaBYppzfYaCpXtdRKBDmC"
                    >pvs.surge.sh/wa</a
                  ></q-item-label
                >
              </q-item-section>
            </div>
          </div>
        </div>
      </q-card>
      <!-- <q-btn @click="downloadViewAsImage(memeCard.innerHTML)">Descargar</q-btn> -->
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="imageInput.click()" fab icon="image" color="accent" />
    </q-page-sticky>
  </div>
</template>
<script setup lang="ts">
const imageUrl = ref<string | null>(null);
const text = ref("– La cómoda perefecta no existe");
const caption = ref("– ...");
const imageInput = ref();
const openImageInput = () => {
  imageInput.value.click();
};
const handleImageSelection = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]; // Get the selected file
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageUrl.value = e.target?.result as string;
    };
    reader.readAsDataURL(file); // Read the file as data URL
  }
};
const placeholderImg = "https://cdn.quasar.dev/img/parallax2.jpg";
const memeCard = ref();
</script>
<style>
/* Add your Tailwind CSS classes here */
</style>
