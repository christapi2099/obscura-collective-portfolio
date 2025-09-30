<script setup lang="ts">
import type { PropType } from "vue";
import type { Image } from "../../types/image";
import { ref, onMounted, onBeforeUnmount, computed } from "vue";

const props = defineProps({
  // Support individual images (for homepage)
  image1: {
    type: Object as PropType<Image>,
    required: false,
  },
  image2: {
    type: Object as PropType<Image>,
    required: false,
  },
  image3: {
    type: Object as PropType<Image>,
    required: false,
  },
  image4: {
    type: Object as PropType<Image>,
    required: false,
  },
  image5: {
    type: Object as PropType<Image>,
    required: false,
  },
  image6: {
    type: Object as PropType<Image>,
    required: false,
  },
  image7: {
    type: Object as PropType<Image>,
    required: false,
  },
  // Support image array (for gallery pages)
  images: {
    type: Array as PropType<Image[]>,
    required: false,
    default: () => []
  },
  // Optional title
  title: {
    type: String,
    required: false,
    default: 'Image Carousel'
  }
});

const defaultImage = "img/placeholder.jpg";
const currentIndex = ref(0);
let intervalId: NodeJS.Timeout | null = null;

// Create an array of images from the props - combine individual images and array if both provided
const carouselImages = computed(() => {
  // If images array is provided, use it
  if (props.images && props.images.length > 0) {
    return props.images;
  }
  
  // Otherwise use individual image properties
  return [
    props.image1,
    props.image2,
    props.image3,
    props.image4,
    props.image5,
    props.image6,
    props.image7,
  ].filter(img => img); // Filter out any undefined images
});

// Navigation methods
const goToSlide = (index: number) => {
  currentIndex.value = index;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + carouselImages.value.length) % carouselImages.value.length;
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % carouselImages.value.length;
};

// Start auto-rotation
onMounted(() => {
  intervalId = setInterval(() => {
    nextSlide();
  }, 5000); // Change slide every 5 seconds
});

// Clean up interval
onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<template>
  <div class="not-prose mt-16 sm:mt-24 content-visibility-visible contain-intrinsic-size-[auto_600px]">
    <div class="relative w-full max-w-4xl mx-auto">
      <!-- Main carousel container -->
      <div class="relative overflow-hidden rounded-2xl h-[60vh] bg-zinc-100 dark:bg-zinc-800">
        <!-- Slides -->
        <div
          v-for="(image, index) in carouselImages"
          :key="index"
          class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          :class="index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'"
        >
          <NuxtImg
            placeholder
            sizes="sm:100vw md:80vw lg:70vw"
            class="w-full h-full object-cover"
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
          class="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/70 dark:bg-zinc-700/70 text-zinc-800 dark:text-white z-10 hover:bg-white/90 dark:hover:bg-zinc-700/90 focus:outline-none"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clip-rule="evenodd" />
          </svg>
        </button>
        
        <button
          @click="nextSlide"
          class="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/70 dark:bg-zinc-700/70 text-zinc-800 dark:text-white z-10 hover:bg-white/90 dark:hover:bg-zinc-700/90 focus:outline-none"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <!-- Navigation dots -->
      <div class="flex justify-center mt-4 gap-2">
        <button
          v-for="(_, index) in carouselImages"
          :key="index"
          @click="goToSlide(index)"
          :aria-label="`Go to slide ${index + 1}`"
          class="w-3 h-3 rounded-full focus:outline-none transition-colors"
          :class="index === currentIndex ? 'bg-zinc-800 dark:bg-white' : 'bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400 dark:hover:bg-zinc-500'"
        ></button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Additional styles can be added here if needed */
</style>