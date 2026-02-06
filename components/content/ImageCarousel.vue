<script setup lang="ts">
import type { PropType } from "vue";
import type { Image } from "../../types/image";
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useSwipe } from "@vueuse/core";

const props = defineProps({
    image1: { type: Object as PropType<Image>, required: false },
    image2: { type: Object as PropType<Image>, required: false },
    image3: { type: Object as PropType<Image>, required: false },
    image4: { type: Object as PropType<Image>, required: false },
    image5: { type: Object as PropType<Image>, required: false },
    image6: { type: Object as PropType<Image>, required: false },
    image7: { type: Object as PropType<Image>, required: false },
    images: {
        type: Array as PropType<Image[]>,
        required: false,
        default: () => [],
    },
    title: { type: String, required: false, default: "Image Carousel" },
});

const defaultImage = "img/placeholder.jpg";
const currentIndex = ref(0);
const carouselRef = ref<HTMLElement | null>(null);
let intervalId: NodeJS.Timeout | null = null;

const carouselImages = computed(() => {
    if (props.images && props.images.length > 0) return props.images;
    return [
        props.image1,
        props.image2,
        props.image3,
        props.image4,
        props.image5,
        props.image6,
        props.image7,
    ].filter((img) => img);
});

const goToSlide = (index: number) => {
    currentIndex.value = index;
};
const prevSlide = () => {
    currentIndex.value =
        (currentIndex.value - 1 + carouselImages.value.length) %
        carouselImages.value.length;
};
const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % carouselImages.value.length;
};

// Touch/swipe support
onMounted(() => {
    intervalId = setInterval(() => {
        nextSlide();
    }, 5000);

    if (carouselRef.value) {
        useSwipe(carouselRef, {
            onSwipeEnd(_e, direction) {
                if (direction === "left") nextSlide();
                if (direction === "right") prevSlide();
            },
        });
    }
});

onBeforeUnmount(() => {
    if (intervalId) clearInterval(intervalId);
});
</script>

<template>
    <div
        class="not-prose mt-16 sm:mt-24 content-visibility-visible contain-intrinsic-size-[auto_600px]"
    >
        <div class="relative w-full max-w-4xl mx-auto">
            <!-- Main carousel container -->
            <div
                ref="carouselRef"
                class="relative overflow-hidden rounded-2xl h-[60vh] min-h-[300px] bg-zinc-100 dark:bg-zinc-800"
            >
                <!-- Slides -->
                <div
                    v-for="(image, index) in carouselImages"
                    :key="index"
                    class="carousel-slide absolute inset-0"
                    :class="
                        index === currentIndex
                            ? 'carousel-slide-active'
                            : 'carousel-slide-inactive'
                    "
                >
                    <NuxtImg
                        placeholder
                        sizes="sm:100vw md:80vw lg:70vw"
                        class="w-full h-full object-cover"
                        :class="index === currentIndex ? 'ken-burns' : ''"
                        :src="image?.src ? image.src : defaultImage"
                        :alt="image?.alt ? image.alt : 'Carousel image'"
                        :width="image?.width ? image.width : 1600"
                        :height="image?.height ? image.height : 2400"
                        format="webp"
                        loading="lazy"
                    />
                </div>

                <!-- Navigation arrows -->
                <button
                    @click="prevSlide"
                    class="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/60 dark:bg-zinc-700/60 text-zinc-800 dark:text-white z-10 hover:bg-white/90 dark:hover:bg-zinc-700/90 focus:outline-none backdrop-blur-sm transition-all duration-200 hover:scale-110"
                    aria-label="Previous slide"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-6 h-6"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>

                <button
                    @click="nextSlide"
                    class="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/60 dark:bg-zinc-700/60 text-zinc-800 dark:text-white z-10 hover:bg-white/90 dark:hover:bg-zinc-700/90 focus:outline-none backdrop-blur-sm transition-all duration-200 hover:scale-110"
                    aria-label="Next slide"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-6 h-6"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>

                <!-- Slide counter -->
                <div
                    class="absolute bottom-4 right-4 z-10 px-3 py-1 rounded-full bg-black/40 text-white text-sm backdrop-blur-sm"
                >
                    {{ currentIndex + 1 }} / {{ carouselImages.length }}
                </div>
            </div>

            <!-- Navigation dots -->
            <div class="flex justify-center mt-4 gap-2">
                <button
                    v-for="(_, index) in carouselImages"
                    :key="index"
                    @click="goToSlide(index)"
                    :aria-label="`Go to slide ${index + 1}`"
                    class="rounded-full focus:outline-none transition-all duration-300"
                    :class="
                        index === currentIndex
                            ? 'w-8 h-3 bg-zinc-800 dark:bg-white'
                            : 'w-3 h-3 bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400 dark:hover:bg-zinc-500'
                    "
                ></button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.carousel-slide {
    transition:
        opacity 800ms ease-in-out,
        transform 800ms ease-in-out;
}
.carousel-slide-active {
    opacity: 1;
    transform: scale(1);
}
.carousel-slide-inactive {
    opacity: 0;
    transform: scale(1.02);
    pointer-events: none;
}

@keyframes kenBurns {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(1.06);
    }
}
.ken-burns {
    animation: kenBurns 5s ease-in-out forwards;
}
</style>
