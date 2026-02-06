<script setup>
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

const gallery = ref(null);
const slots = useSlots();
const children = slots.default() ? slots.default()[0].children : false;
const childrenType = children ? children[0].type : false;
const galleryId = `gallery-${Math.random().toString(36).substr(2, 9)}`;

let lightbox;

onMounted(() => {
    if (!lightbox && childrenType) {
        lightbox = new PhotoSwipeLightbox({
            gallerySelector: `#${galleryId}`,
            childSelector: "a",
            pswpModule: () => import("photoswipe"),
        });
        lightbox.init();
    }
});

onUnmounted(() => {
    if (lightbox) {
        lightbox.destroy();
        lightbox = null;
    }
});
</script>

<template>
    <div ref="gallery" :id="galleryId">
        <slot />
    </div>
</template>
