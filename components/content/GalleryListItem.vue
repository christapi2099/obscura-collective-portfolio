<script setup lang="ts">
import type { Image } from "~/../types/image";
type Gallery = {
    _path: string;
    title: string;
    description?: string;
    cover?: Image;
};

const props = defineProps({
    gallery: {
        type: Object as PropType<Gallery>,
        required: true,
        validator: (value: Gallery) => {
            if (value?._path && value.title) {
                return true;
            }
            return false;
        },
    },
});
</script>

<template>
    <NuxtLink :to="gallery._path" class="group block">
        <div
            class="relative w-full overflow-hidden rounded-xl aspect-[3/2] md:aspect-[2/3] dark:bg-zinc-800 shadow-md group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-[1.03]"
        >
            <NuxtImg
                :src="gallery.cover?.src || 'img/placeholder.jpg'"
                :alt="gallery.cover?.alt || gallery.title"
                :width="gallery.cover?.width"
                :height="gallery.cover?.height"
                class="h-full w-full object-cover object-center transition-all duration-700 group-hover:scale-110"
                sizes="sm:100vw md:50vw lg:30vw"
                loading="lazy"
                placeholder
                format="webp"
            />
            <!-- Gradient overlay on hover -->
            <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>
            <!-- Title overlay on hover -->
            <div
                class="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
            >
                <h3 class="text-white text-xl font-display font-semibold">
                    {{ gallery.title }}
                </h3>
                <p class="text-white/80 text-sm mt-1">View gallery</p>
            </div>
            <div
                class="absolute bottom-0 w-full p-4 grid grid-cols-4 gap-3 group-hover:opacity-0 transition-opacity duration-300"
                v-if="gallery?.images?.length"
            >
                <div
                    v-for="(thumbnail, index) in gallery.images.slice(0, 4)"
                    :key="index"
                    class="col-span-1 aspect-square w-full rounded-lg overflow-hidden dark:bg-zinc-800"
                >
                    <NuxtImg
                        :src="thumbnail.src"
                        :alt="thumbnail.alt || gallery.title"
                        class="h-full w-full object-cover object-center"
                        loading="lazy"
                        sizes="sm:70px md:75px"
                        placeholder
                        format="webp"
                    />
                </div>
            </div>
        </div>
        <div
            class="mt-4 flex items-center justify-between text-base font-medium dark:text-zinc-200"
        >
            <h3>{{ gallery.title }}</h3>
        </div>
    </NuxtLink>
</template>
