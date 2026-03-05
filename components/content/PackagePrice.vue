<template>
  <div class="not-prose">
    <div class="mx-auto max-w-2xl rounded-3xl ring-1 ring-zinc-200 dark:ring-zinc-50/5 lg:mx-0 lg:flex lg:max-w-none lg:items-stretch">
      <div class="p-6 sm:p-8 lg:p-10 lg:flex-auto">
        <h3 class="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-200">{{ title }}</h3>
        <p v-if="description" class="mt-4 sm:mt-6 text-sm sm:text-base leading-6 sm:leading-7 text-zinc-600 dark:text-zinc-500">{{ description }}</p>
        <ul role="list" class="mt-6 sm:mt-8 grid grid-cols-1 gap-3 sm:gap-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          <li v-for="feature in includedFeatures" :key="feature" class="flex gap-x-2">
            <Icon name="heroicons:check" class="h-6 w-5 flex-none text-yellow-600" />
            {{ feature }}
          </li>
        </ul>
      </div>
      <div class="p-2 lg:mt-0 lg:w-full lg:max-w-sm lg:flex-shrink-0">
        <div
          class="relative overflow-hidden rounded-2xl py-8 sm:py-10 text-center ring-1 ring-inset ring-zinc-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16 lg:h-full"
          :class="[image ? 'bg-zinc-200 dark:bg-zinc-800' : 'bg-zinc-100 dark:bg-zinc-800/30']"
        >
          <div v-if="image" class="absolute inset-0 mix-blend-overlay">
            <NuxtImg :src="image.src" :alt="image.alt" :width="image.width" :height="image.height" class="w-full h-full object-cover" />
          </div>
          <div class="mx-auto max-w-xs px-4 sm:px-8 z-10">
            <p class="flex items-baseline justify-center gap-x-2 flex-wrap">
              <span class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{{ price }}</span>
              <span class="text-xs sm:text-sm font-semibold leading-6 tracking-wide text-zinc-800 dark:text-zinc-200">{{ currency }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Image } from "~/../types/image";
interface Props {
  title: string;
  description?: string;
  includedFeatures: string[];
  price: string;
  currency?: string;
  image?: Image;
}

withDefaults(defineProps<Props>(), {
  description: "",
  currency: "USD",
});
</script>
