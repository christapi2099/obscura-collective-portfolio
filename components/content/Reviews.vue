<script setup lang="ts">
const reviews = [
    {
        name: "Alec Magsombol",
        quote: "This New Year's eve I ordered pictures with my friends. Migz and Chris did such a great job taking candid pictures of us, plus he made me realize how photogenic I could be!",
        image: {
            src: "/img/galleries/portraits/img_6469.webp",
            alt: "Alec Magsombol",
            width: 160,
            height: 160,
        },
    },
];
</script>

<template>
    <div class="mt-24">
        <div class="text-center">
            <h2 class="text-4xl font-bold mb-4">What Our Clients Say</h2>
        </div>
        <div class="not-prose -mt-2 flex justify-center">
            <div class="max-w-2xl w-full">
                <div v-for="review in reviews" :key="review.name" class="pt-8">
                    <figure
                        class="rounded-2xl bg-zinc-50 dark:bg-zinc-800/5 p-8 text-sm leading-6 dark:border dark:border-zinc-800/50"
                    >
                        <blockquote
                            class="text-zinc-900 dark:text-zinc-400 text-base"
                        >
                            <p>"{{ review.quote }}"</p>
                        </blockquote>
                        <figcaption class="mt-6 flex items-center gap-x-4">
                            <NuxtImg
                                class="h-12 w-12 rounded-full bg-zinc-50 dark:bg-zinc-800 object-cover object-top"
                                :src="review.image.src"
                                :alt="review.image.alt"
                                :width="review.image.width"
                                :height="review.image.height"
                                loading="lazy"
                            />
                            <div
                                class="font-semibold text-zinc-900 dark:text-zinc-300"
                            >
                                {{ review.name }}
                            </div>
                        </figcaption>
                    </figure>
                </div>
            </div>
        </div>
    </div>
</template>
