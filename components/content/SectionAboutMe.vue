<script setup lang="ts">
import type { Image } from "../../types/image";
defineProps({
    firstname: {
        type: String,
        required: false,
    },
    lastname: {
        type: String,
        required: false,
    },
    photo: {
        type: Object as PropType<Image>,
        required: false,
    },
    signature: {
        type: String,
        required: false,
        default: "/img/home/sign.png",
    },
});
</script>
<template>
    <div
        class="not-prose mt-16 md:mt-24 lg:mt-48 content-visibility-visible contain-intrinsic-size-[auto_750px]"
    >
        <div class="flex flex-col items-center gap-8">
            <div
                v-parallax
                v-bottom-up
                data-rellax-xs-speed="0"
                data-rellax-mobile-speed="0"
                data-rellax-tablet-speed="0"
                data-parallax-speed="-1"
                data-rellax-percentage="0.5"
            >
                <div
                    class="aspect-square sm:aspect-[2/3] flex-none overflow-hidden bg-zinc-100 dark:bg-zinc-800 w-40 sm:w-52 lg:w-72 rounded-2xl rotate-3 transition-opacity duration-1000"
                >
                    <NuxtImg
                        placeholder
                        :src="photo?.src ? photo.src : 'img/placeholder.jpg'"
                        :alt="
                            photo?.alt
                                ? photo.alt
                                : 'Obscura Collective photographer'
                        "
                        :width="photo?.width ? photo.width : 1"
                        :height="photo?.height ? photo.height : 1"
                        format="webp"
                        loading="lazy"
                        class="h-full w-full object-cover"
                        sizes="sm:50vw md:50vw lg:30vw"
                    />
                </div>
            </div>

            <div
                class="flex flex-col gap-4 items-center text-center max-w-2xl px-4 sm:px-0"
            >
                <h2
                    class="text-3xl sm:text-4xl lg:text-6xl font-display text-zinc-800 dark:text-zinc-200"
                >
                    {{ firstname }} {{ lastname }}
                </h2>
                <div class="dark:text-zinc-400 flex flex-col gap-4">
                    <slot name="description"></slot>
                </div>
                <span
                    class="font-signature text-3xl lg:text-4xl text-zinc-700 dark:text-zinc-300 opacity-75 select-none"
                    :aria-label="`${firstname} ${lastname} signature`"
                    >{{ firstname }} {{ lastname }}</span
                >
            </div>
        </div>

        <hr class="my-10 h-px border-0 bg-zinc-200 dark:bg-zinc-800" />
        <slot name="extra"></slot>
    </div>
</template>
